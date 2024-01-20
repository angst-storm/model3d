from rest_framework import serializers

from .models import *


class FooterURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterURL
        fields = ('name', 'url')


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ('image', 'url')


class SiteSettingsSerializer(serializers.ModelSerializer):
    footerUrls = FooterURLSerializer(many=True, read_only=True, source='footerurl_set')
    socialMedias = SocialMediaSerializer(many=True, read_only=True, source='socialmedia_set')

    class Meta:
        model = SiteSettings
        fields = [
            'contactsText',
            'receiveDistributionUrl',
            'privacyPolicyUrl',
            'userAgreementUrl',
            'contactInformationUrl',
            'wideBanner',
            'narrowBanner',
            'footerUrls',
            'socialMedias'
        ]


class RegDataSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = [
            'email',
            'password'
        ]

    def create(self, validated_data):
        return User.objects.create_user(username=validated_data['email'], password=validated_data['password'])


class AuthDataSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=254)


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name'
        ]


class RenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Render
        fields = [
            'id',
            'name'
        ]


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = [
            'id',
            'name'
        ]


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = [
            'id',
            'name',
            'rgb'
        ]


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = [
            'id',
            'name'
        ]


class ProductFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductForm
        fields = [
            'id',
            'name'
        ]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            'id',
            'name'
        ]


class ShortCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id',
            'name',
        ]


class CategorySerializer(serializers.ModelSerializer):
    parents = serializers.SerializerMethodField()

    def get_parents(self, obj):
        return [ShortCategorySerializer(c).data for c in obj.get_ancestors()]

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'parents'
        ]


class ProductSerializer(serializers.ModelSerializer):
    formats = FormatSerializer(many=True, read_only=True)
    render = RenderSerializer(read_only=True)
    style = StyleSerializer(read_only=True)
    colors = ColorSerializer(many=True, read_only=True)
    materials = MaterialSerializer(many=True, read_only=True)
    form = ProductFormSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    size = serializers.SerializerMethodField()
    category = CategorySerializer(read_only=True)

    def get_size(self, obj):
        return {'x': obj.sizeX, 'y': obj.sizeY, 'z': obj.sizeZ}

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'cost',
            'articul',
            'formats',
            'render',
            'style',
            'colors',
            'materials',
            'form',
            'tags',
            'platform',
            'isPopular',
            'size',
            'polygonsCount',
            'buyUrl',
            'description',
            'publicationDate',
            'author',
            'owners',
            'archive',
            'category',
            'isFree',
            'modelFileSizeBytes'
        ]
