from django.contrib import admin
from solo.admin import SingletonModelAdmin

from .models import *


class FooterURLInline(admin.TabularInline):
    model = FooterURL


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia


class SiteSettingsAdmin(SingletonModelAdmin):
    inlines = [FooterURLInline, SocialMediaInline]


admin.site.register(SiteSettings, SiteSettingsAdmin)
