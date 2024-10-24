from django.urls import path
from . import views
urlpatterns = [
    path('',views.index, name='index'),
    path('settings/', views.settings, name='settings'),
    path('upload/', views.upload, name='upload'),
    path('profile/<str:pk>', views.profile, name='profile'),
    path('search/', views.search, name='search'),
    path('follow/', views.follow, name='follow'),
    path('liked-post/', views.liked_post, name='liked-post'),
    path('auth/', views.auth_page, name='auth_page'),
    path('logout/',views.logout, name='logout'),
    path('<str:sender>/<str:receiver>/', views.messageView, name='room'),
]
