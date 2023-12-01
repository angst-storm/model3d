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
