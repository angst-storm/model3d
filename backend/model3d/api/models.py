import os

from colorfield.fields import ColorField
from django.contrib.auth.models import User
from django.db import models
from solo.models import SingletonModel
from treebeard.mp_tree import MP_Node


class SiteSettings(SingletonModel):
    contactsText = models.TextField(verbose_name='Текст с контактами')
    receiveDistributionUrl = models.URLField(max_length=255, verbose_name='Ссылка на форму с получением рассылки')
    privacyPolicyUrl = models.URLField(max_length=255, verbose_name='Ссылка на политику конфиденциальности')
    userAgreementUrl = models.URLField(max_length=255, verbose_name='Ссылка на пользовательское соглашение')
    contactInformationUrl = models.URLField(max_length=255, verbose_name='Ссылка на контактную информацию')
    wideBanner = models.ImageField(verbose_name='Широкий рекламный баннер')
    narrowBanner = models.ImageField(verbose_name='Узкий рекламный баннер')

    def __str__(self):
        return 'Настройки сайта'

    class Meta:
        verbose_name = 'Настройки сайта'


class FooterURL(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, verbose_name='Отображаемое название')
    url = models.URLField(max_length=255, verbose_name='Ссылка')

    def __str__(self):
        return f'Ссылка (подвал): {self.name}'

    class Meta:
        verbose_name = 'Ссылка в подвале'
        verbose_name_plural = 'Ссылки в подвале'


class SocialMedia(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE)
    image = models.ImageField(verbose_name='Логотип')
    url = models.URLField(max_length=255, verbose_name='Ссылка')

    def __str__(self):
        return f'Соц. сеть: {self.url}'

    class Meta:
        verbose_name = 'Социальная сеть'
        verbose_name_plural = 'Социальные сети'


class Format(models.Model):
    name = models.CharField()

    def __str__(self):
        return f'Расширение: {self.name}'

    class Meta:
        verbose_name = "Расширение"
        verbose_name_plural = "Расширения"


class Render(models.Model):
    name = models.CharField()

    def __str__(self):
        return f'Рендер: {self.name}'

    class Meta:
        verbose_name = "Рендер"
        verbose_name_plural = "Рендеры"


class Style(models.Model):
    name = models.CharField()

    def __str__(self):
        return f'Стиль: {self.name}'

    class Meta:
        verbose_name = "Стиль"
        verbose_name_plural = "Стили"


class Color(models.Model):
    name = models.CharField()
    rgb = ColorField()

    def __str__(self):
        return f'Цвет: {self.name}'

    class Meta:
        verbose_name = "Цвет"
        verbose_name_plural = "Цвета"


class Material(models.Model):
    name = models.CharField()

    def __str__(self):
        return f'Материал: {self.name}'

    class Meta:
        verbose_name = "Материал"
        verbose_name_plural = "Материалы"


class ProductForm(models.Model):
    name = models.CharField()

    def __str__(self):
        return f'Форма: {self.name}'

    class Meta:
        verbose_name = "Форма"
        verbose_name_plural = "Формы"


class Tag(models.Model):
    name = models.CharField()

    def __str__(self):
        return f'Тег: {self.name}'

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"


class Category(MP_Node):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f'Категория: {self.name}'

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name='Имя')
    cost = models.IntegerField(verbose_name='Цена')
    articul = models.CharField(max_length=255, verbose_name='Артикул')
    formats = models.ManyToManyField(Format, blank=True, verbose_name='Расширения')
    render = models.ForeignKey(Render, on_delete=models.SET_NULL, null=True, verbose_name='Рендер')
    style = models.ForeignKey(Style, on_delete=models.SET_NULL, null=True, verbose_name='Стиль')
    colors = models.ManyToManyField(Color, blank=True, verbose_name='Цвета')
    materials = models.ManyToManyField(Material, blank=True, verbose_name='Материалы')
    form = models.ForeignKey(ProductForm, on_delete=models.SET_NULL, null=True, verbose_name='Форма')
    tags = models.ManyToManyField(Tag, blank=True, verbose_name='Тэги')
    platform = models.CharField(max_length=255, verbose_name='Платформа моделирования')
    isPopular = models.BooleanField(verbose_name='Популярная модель')
    sizeX = models.IntegerField(verbose_name='Размер по оси X')
    sizeY = models.IntegerField(verbose_name='Размер по оси Y')
    sizeZ = models.IntegerField(verbose_name='Размер по оси Z')
    polygonsCount = models.IntegerField(verbose_name='Количество полигонов')
    buyUrl = models.URLField(max_length=255, verbose_name='Ссылка на покупку')
    description = models.TextField(verbose_name='Описание')
    publicationDate = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name='author', verbose_name='Автор')
    owners = models.ManyToManyField(User, related_name='owners', blank=True, verbose_name='Покупатели')
    archive = models.FileField(verbose_name='Архив с моделью')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, verbose_name='Категория')
    preview = models.ImageField(verbose_name='Изображение-превью')

    @property
    def isFree(self):
        return self.cost == 0

    @property
    def modelFileSizeBytes(self):
        return os.path.getsize(self.archive.path)

    def __str__(self):
        return f'Продукт: "{self.name}" ({self.articul}) - {self.category.name}'

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"
