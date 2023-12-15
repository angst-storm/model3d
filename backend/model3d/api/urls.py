from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.routers import DefaultRouter

from .views import *

schema_view = get_schema_view(
    openapi.Info(
        title='Model3D API',
        default_version=os.environ['VERSION']
    ),
    public=True,
    permission_classes=[AllowAny]
)

router = DefaultRouter()
router.register('', SiteSettingsView, basename='site-settings')
router.register('', RegistrationView, basename='reg')
router.register('', AuthenticationView, basename='auth')
router.register('', FilterView, basename='filter')
router.register('products', ProductView, basename='product')
router.register('formats', FormatView, basename='format')
router.register('styles', StyleView, basename='style')
router.register('colors', ColorView, basename='color')
router.register('materials', MaterialView, basename='material')
router.register('forms', ProductFormView, basename='form')
router.register('tags', TagView, basename='tag')
router.register('categoriesTree', CategoryTreeView, basename='category')

urlpatterns = router.urls + [path('docs/', schema_view.with_ui('swagger'), name='swagger')]
