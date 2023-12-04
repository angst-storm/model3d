from django.contrib import admin
from solo.admin import SingletonModelAdmin
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory

from .models import *


class FooterURLInline(admin.TabularInline):
    model = FooterURL


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia


class SiteSettingsAdmin(SingletonModelAdmin):
    inlines = [FooterURLInline, SocialMediaInline]


class CategoryAdmin(TreeAdmin):
    form = movenodeform_factory(Category)


admin.site.register(SiteSettings, SiteSettingsAdmin)
admin.site.register(Product)
admin.site.register(Format)
admin.site.register(Render)
admin.site.register(Style)
admin.site.register(Color)
admin.site.register(Material)
admin.site.register(ProductForm)
admin.site.register(Tag)
admin.site.register(Category, CategoryAdmin)
