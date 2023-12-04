from django.contrib import admin
from solo.admin import SingletonModelAdmin
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory

from .models import *


class FooterURLInline(admin.TabularInline):
    model = FooterURL


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonModelAdmin):
    inlines = [FooterURLInline, SocialMediaInline]


@admin.register(Category)
class CategoryAdmin(TreeAdmin):
    form = movenodeform_factory(Category)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'articul', 'publicationDate', 'cost', 'isPopular', 'author')
    list_display_links = ('name',)
    list_filter = (
        'category', 'cost', 'isPopular', 'formats', 'render', 'style',
        'colors', 'materials', 'form', 'tags', 'platform', 'author'
    )
    search_fields = ('name', 'articul')
    ordering = ('id', 'publicationDate', 'cost', 'isPopular')


admin.site.register(Format)
admin.site.register(Render)
admin.site.register(Style)
admin.site.register(Color)
admin.site.register(Material)
admin.site.register(ProductForm)
admin.site.register(Tag)
