import django_filters
from django.db.models import Q

from .models import *


class ProductFilter(django_filters.FilterSet):
    colors = django_filters.ModelMultipleChoiceFilter(queryset=Color.objects.all(), conjoined=True)
    materials = django_filters.ModelMultipleChoiceFilter(queryset=Material.objects.all(), conjoined=True)
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.all(), method='belongs_to_category')
    ordering = django_filters.OrderingFilter(fields=[
        ('isPopular', 'standard'),
        ('publicationDate', 'date'),
        ('cost', 'cost')
    ])
    formats = django_filters.ModelMultipleChoiceFilter(field_name='productfile__format',
                                                       queryset=Format.objects.all())

    def belongs_to_category(self, queryset, name, value):
        return queryset.filter(Q(category=value) | Q(category__in=value.get_descendants()))

    class Meta:
        model = Product
        fields = {
            'colors': ['exact'],
            'materials': ['exact'],
            'render': ['exact'],
            'style': ['exact'],
            'form': ['exact'],
            'isPopular': ['exact'],
            'cost': ['lte', 'gte'],
            'category': ['exact'],
            'author': ['exact']
        }
