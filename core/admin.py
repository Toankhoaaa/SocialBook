from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(likedPost)
admin.site.register(folowedPost)
admin.site.register(Room)
admin.site.register(Message)