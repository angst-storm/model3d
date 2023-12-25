from django.contrib.auth import authenticate
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema, no_body
from rest_framework import status, exceptions, mixins
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ReadOnlyModelViewSet

from .auth import JWTAuthentication, add_auth
from .filters import ProductFilter
from .serializers import *


@authentication_classes([])
@permission_classes([AllowAny])
class SiteSettingsView(GenericViewSet):
    @swagger_auto_schema(tags=['Настройки сайта'],
                         operation_summary="Настройки сайта",
                         responses={
                             200: SiteSettingsSerializer()
                         })
    @action(methods=['get'], detail=False, url_path='siteSettings')
    def register(self, request):
        serializer = SiteSettingsSerializer(SiteSettings.get_solo())
        return Response(serializer.data, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([AllowAny])
class RegistrationView(GenericViewSet):
    @swagger_auto_schema(tags=['Регистрация'],
                         operation_summary="Регистрирует пользователя",
                         request_body=RegDataSerializer,
                         responses={
                             201: "Пользователь зарегистрирован",
                             400: "Данные не прошли валидацию"
                         })
    @action(methods=['post'], detail=False, url_path='reg')
    def register(self, request):
        serializer = RegDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(tags=['Регистрация'],
                         operation_summary='Проверяет email на уникальность',
                         request_body=EmailSerializer,
                         responses={
                             200: 'Email проверен (результаты) { "unique" = true|false }',
                             400: "Данные не прошли валидацию"
                         })
    @action(methods=['post'], detail=False, url_path='unique-email', url_name='unique-email')
    def unique_email(self, request):
        serializer = EmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = True
        try:
            User.objects.get(username=serializer.data['email'])
            result = False
        except User.DoesNotExist:
            pass
        return Response({'unique': result}, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([AllowAny])
class AuthenticationView(GenericViewSet):
    @swagger_auto_schema(tags=['Аутентификация'],
                         operation_summary='Аутентифицирует пользователя',
                         request_body=AuthDataSerializer,
                         responses={
                             200: "Пользователь аутентифицирован",
                             400: "Данные не прошли валидацию",
                             401: "Пользователь не аутентифицирован"
                         })
    @action(methods=['post'], detail=False, url_path='login')
    def login(self, request):
        serializer = AuthDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            login = User.objects.get(email=request.data['email']).username
        except User.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        user = authenticate(username=login, password=request.data['password'])
        if user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        add_auth(request, user)

        return Response(status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=['Аутентификация'],
                         operation_summary="Отзывает данные о аутентификации у пользователя",
                         responses={
                             200: "Аутентификация пользователя отозвана"
                         })
    @action(methods=["get"], detail=False, url_path='logout', url_name='logout')
    def logout(self, request):
        request.session.flush()
        _next = request.GET.get('next', None)
        if _next is not None:
            return redirect(_next)
        return Response(status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=['Аутентификация'],
                         operation_summary='Проверяет наличие данных аутентификации пользователя',
                         responses={
                             200: 'Заголовки и токен проверены (результаты) {"authenticated": true|false }'
                         })
    @action(methods=['get'], detail=False, url_path='authenticated', url_name='authenticated')
    def authenticated(self, request):
        result = False
        try:
            auth_result = JWTAuthentication().authenticate(request)
            if auth_result is not None:
                result = True
        except exceptions.AuthenticationFailed:
            pass
        return Response({'authenticated': result}, status=status.HTTP_200_OK)


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Продукты'],
    operation_summary='Все продукты'))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    tags=['Продукты'],
    operation_summary='Продукт по его ID',
    responses={
        404: "Продукт не найден"
    }))
@method_decorator(name='create', decorator=swagger_auto_schema(
    tags=['Продукты'],
    operation_summary='Создать продукт'))
class ProductView(ReadOnlyModelViewSet, mixins.CreateModelMixin):
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['$name', '=articul']
    filterset_class = ProductFilter
    pagination_class = LimitOffsetPagination

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        else:
            return [IsAuthenticated()]

    def get_parsers(self):
        if 'docs' in self.request.path and self.action in ['create', 'add_file']:
            return [MultiPartParser]
        else:
            return super().get_parsers()

    def get_serializer_class(self):
        if self.action == 'create':
            return ProductCreateSerializer
        elif self.action == 'add_file':
            return ProductFileCreateSerializer
        else:
            return ProductSerializer

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary='Добавить файл с расширением к продукту'
    )
    @action(methods=['post'], detail=True, url_path='addFile', url_name='add-file')
    def add_file(self, request, *args, **kwargs):
        product = self.get_object()
        data = request.data.dict()
        data['product'] = product.id
        serializer = ProductFileCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(product=product)
        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary='Продукты, купленные текущим пользователем'
    )
    @action(methods=['get'], detail=False, url_path='purchasedByCurrentUser', url_name='purchased')
    def purchasedByCurrentUser(self, request, *args, **kwargs):
        res = [p.product for p in Purchase.objects.filter(purchaser=request.user)]
        return Response(ProductSerializer(res, many=True).data)

    @swagger_auto_schema(
        tags=['Продукты'],
        operation_summary='Купить список продуктов',
        request_body=PurchaseSerializer,
        responses={
            200: "Продукты куплены",
            400: "Данные не прошли валидацию"
        }
    )
    @action(methods=['post'], detail=False, url_path='purchase', url_name='purchase')
    def purchase(self, request, *args, **kwargs):
        serializer = PurchaseSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Все расширения'))
@permission_classes([AllowAny])
class FormatView(GenericViewSet, mixins.ListModelMixin):
    queryset = Format.objects.all()
    serializer_class = FormatSerializer


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Все рендеры'))
@permission_classes([AllowAny])
class RenderView(GenericViewSet, mixins.ListModelMixin):
    queryset = Render.objects.all()
    serializer_class = RenderSerializer


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Все стили'))
@permission_classes([AllowAny])
class StyleView(GenericViewSet, mixins.ListModelMixin):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Все цвета'))
@permission_classes([AllowAny])
class ColorView(GenericViewSet, mixins.ListModelMixin):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Все материалы'))
@permission_classes([AllowAny])
class MaterialView(GenericViewSet, mixins.ListModelMixin):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Все формы'))
@permission_classes([AllowAny])
class ProductFormView(GenericViewSet, mixins.ListModelMixin):
    queryset = ProductForm.objects.all()
    serializer_class = ProductFormSerializer


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Все теги'))
@permission_classes([AllowAny])
class TagView(GenericViewSet, mixins.ListModelMixin):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Фильтры'],
    operation_summary='Лес деревьев категорий'))
@permission_classes([AllowAny])
class CategoryTreeView(GenericViewSet, mixins.ListModelMixin):
    queryset = Category.get_root_nodes()
    serializer_class = TreeCategorySerializer


@permission_classes([AllowAny])
class FilterView(GenericViewSet):
    @swagger_auto_schema(tags=['Фильтры'],
                         operation_summary='Все фильтры',
                         responses={
                             200: "Успешно",
                         })
    @action(methods=['get'], detail=False, url_path='filters')
    def filters(self, request):
        return Response({
            "categoriesTree": TreeCategorySerializer(Category.get_root_nodes(), many=True).data,
            "tags": TagSerializer(Tag.objects.all(), many=True).data,
            "forms": ProductFormSerializer(ProductForm.objects.all(), many=True).data,
            "materials": MaterialSerializer(Material.objects.all(), many=True).data,
            "colors": ColorSerializer(Color.objects.all(), many=True).data,
            "styles": StyleSerializer(Style.objects.all(), many=True).data,
            "renders": RenderSerializer(Render.objects.all(), many=True).data,
            "formats": FormatSerializer(Format.objects.all(), many=True).data
        })


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Пользователи'],
    operation_summary='Все пользователи'))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    tags=['Пользователи'],
    operation_summary='Пользователь по его ID',
    responses={
        404: "Пользователь не найден"
    }))
class UserView(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        else:
            return [IsAuthenticated()]

    @swagger_auto_schema(tags=['Пользователи'],
                         operation_summary='Текущий пользователь',
                         responses={
                             200: UserSerializer(),
                         })
    @action(methods=['get'], detail=False, url_path='current')
    @permission_classes([IsAuthenticated])
    def current_user(self, request):
        return Response(UserSerializer(request.user).data)
