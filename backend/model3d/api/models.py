from django.db import models
from solo.models import SingletonModel


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
