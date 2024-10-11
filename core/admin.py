from django.contrib import admin
from .models import Profile, Post, likedPost, folowedPost
# Register your models here.

admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(likedPost)
admin.site.register(folowedPost)