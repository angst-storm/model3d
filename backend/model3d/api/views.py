from rest_framework import status
from rest_framework.decorators import action
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from drf_yasg.utils import swagger_auto_schema

from .models import SiteSettings
from .serializers import SiteSettingsSerializer


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
