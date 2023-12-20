from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from solo.admin import SingletonModelAdmin
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory

from .models import *


class FooterURLInline(admin.TabularInline):
    model = FooterURL


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia


class ProductFileInline(admin.TabularInline):
    model = ProductFile


class UserProfileInline(admin.StackedInline):
    model = UserProfile


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
        'category', 'cost', 'isPopular', 'render', 'style',
        'colors', 'materials', 'form', 'tags', 'platform', 'author', 'productfile__format'
    )
    search_fields = ('name', 'articul')
    ordering = ('id', 'publicationDate', 'cost', 'isPopular')
    inlines = [ProductFileInline]


admin.site.unregister(User)


@admin.register(User)
class UserWithProfileAdmin(UserAdmin):
    inlines = [UserProfileInline]


admin.site.register(Format)
admin.site.register(Render)
admin.site.register(Style)
admin.site.register(Color)
admin.site.register(Material)
admin.site.register(ProductForm)
admin.site.register(Tag)
