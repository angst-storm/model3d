from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter

from .views import SiteSettingsView, RegistrationView, AuthenticationView

schema_view = get_schema_view(
    openapi.Info(
        title='Model3D API',
        default_version='v1.0'
    ),
    public=True,
    permission_classes=[AllowAny]
)

router = DefaultRouter()
router.register('', SiteSettingsView, basename='site-settings')
router.register('', RegistrationView, basename='reg')
router.register('', AuthenticationView, basename='auth')

urlpatterns = router.urls + [path('docs/', schema_view.with_ui('swagger'), name='swagger')]
