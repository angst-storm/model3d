import django_filters as filters
from django.db.models import Q

from .models import *


class ProductFilter(filters.FilterSet):
    colors = filters.CharFilter(method="comma_separated_model_filter_coinjected")
    materials = filters.CharFilter(method="comma_separated_model_filter_coinjected")
    formats = filters.CharFilter(field_name='productfile__format', method="comma_separated_model_filter")
    render = filters.CharFilter(method="comma_separated_model_filter")
    style = filters.CharFilter(method="comma_separated_model_filter")
    form = filters.CharFilter(method="comma_separated_model_filter")

    def comma_separated_model_filter(self, queryset, name, value):
        ids = [int(ID) for ID in value.split(',') if ID.isnumeric()]
        return queryset.filter(**{
            f"{name}__id__in": ids
        }).distinct()

    def comma_separated_model_filter_coinjected(self, queryset, name, value):
        qs = queryset
        for ID in (int(ID) for ID in value.split(',') if ID.isnumeric()):
            qs = qs.filter(**{f"{name}__id__contains": ID})
        return qs

    category = filters.ModelChoiceFilter(queryset=Category.objects.all(), method='belongs_to_category')

    ordering = filters.OrderingFilter(fields=[
        ('isPopular', 'standard'),
        ('publicationDate', 'date'),
        ('cost', 'cost')
    ])

    def belongs_to_category(self, queryset, name, value):
        return queryset.filter(Q(category=value) | Q(category__in=value.get_descendants()))

    class Meta:
        model = Product
        fields = {
            'isPopular': ['exact'],
            'cost': ['lte', 'gte'],
            'category': ['exact'],
            'author': ['exact']
        }
