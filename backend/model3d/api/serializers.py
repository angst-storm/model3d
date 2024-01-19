from django.contrib.auth.models import User
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
