import os

from colorfield.fields import ColorField
from django.contrib.auth.models import User
from django.db import models
from solo.models import SingletonModel
from treebeard.mp_tree import MP_Node


class SiteSettings(SingletonModel):
    contactsText = models.TextField()
    receiveDistributionUrl = models.URLField(max_length=255)
    privacyPolicyUrl = models.URLField(max_length=255)
    userAgreementUrl = models.URLField(max_length=255)
    contactInformationUrl = models.URLField(max_length=255)
    wideBanner = models.ImageField()
    narrowBanner = models.ImageField()

    def __str__(self):
        return "Site Settings"

    class Meta:
        verbose_name = "Site Settings"


class FooterURL(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255)


class SocialMedia(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE)
    image = models.ImageField()
    url = models.URLField(max_length=255)


class Format(models.Model):
    name = models.CharField()


class Render(models.Model):
    name = models.CharField()


class Style(models.Model):
    name = models.CharField()


class Color(models.Model):
    name = models.CharField()
    rgb = ColorField()


class Material(models.Model):
    name = models.CharField()


class ProductForm(models.Model):
    name = models.CharField()


class Tag(models.Model):
    name = models.CharField()


class Category(MP_Node):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f'Категория: {self.name}'


class Product(models.Model):
    name = models.CharField(max_length=255)
    cost = models.IntegerField()
    articul = models.CharField(max_length=255)
    formats = models.ManyToManyField(Format, blank=True)
    render = models.ForeignKey(Render, on_delete=models.SET_NULL, null=True)
    style = models.ForeignKey(Style, on_delete=models.SET_NULL, null=True)
    colors = models.ManyToManyField(Color, blank=True)
    materials = models.ManyToManyField(Material, blank=True)
    form = models.ForeignKey(ProductForm, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    platform = models.CharField(max_length=255)
    isPopular = models.BooleanField()
    sizeX = models.IntegerField()
    sizeY = models.IntegerField()
    sizeZ = models.IntegerField()
    polygonsCount = models.IntegerField()
    buyUrl = models.URLField(max_length=255)
    description = models.TextField()
    publicationDate = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name='author')
    owners = models.ManyToManyField(User, related_name='owners', blank=True)
    archive = models.FileField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    @property
    def isFree(self):
        return self.cost == 0

    @property
    def modelFileSizeBytes(self):
        return os.path.getsize(self.archive.path)
