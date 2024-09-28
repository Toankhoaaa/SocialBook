from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse
from .models import Profile
# Create your views here.
def index(request):
    return render(request, 'index.html')
def signup(request):
    if request.method == 'POST':
        # Process form data
        username = request.POST.get('username')
        email  = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')    

        if password == password2:
            # Check if username already exists
            if User.objects.filter(username=username).exists():
                messages.info(request, 'Username already exists')
                return redirect('signup')
            # Check if email already exists
            elif User.objects.filter(email=email).exists():
                messages.info(request, 'Email already exists')
                return redirect('signup')
            else:
                # Create new user
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                #Log user in and  redirect  to settings page

                #create a profile for the new user
                new_user = User.objects.get(username=username)
                new_profile = Profile.objects.create(user=new_user, id_user=new_user.id)
                new_profile.save()
                return redirect('index')
        else:
            messages.info(request, 'Passwords do not match')
            return redirect('signup')        
    else:
        return render(request, 'signup.html')