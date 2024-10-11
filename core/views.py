from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import Profile, Post, likedPost, folowedPost
# Create your views here.
@login_required(login_url = 'signin')
def index(request):
    user_object = User.objects.get(username=request.user.username)
    user_profile = Profile.objects.get(user=user_object)
    posts = Post.objects.all()
    post_list = []
    for post in posts:
        # Lấy profile của người dùng đã đăng bài
        user_img = User.objects.get(username=post.user)
        user_profile_post = Profile.objects.get(user=user_img)
        post_list.append({
            'post': post,
            'profile_image': user_profile_post.profileimg,  # Lấy ảnh profile của người dùng
        })

    return render(request, 'index.html', {'user_profile': user_profile, 'posts': posts, 'post_list': post_list})
@login_required(login_url = 'signin')
def settings(request):
    user_profile = Profile.objects.get(user  = request.user)

    if request.method == 'POST':

        if request.FILES.get('image') == None:
            image = user_profile.profileimg
            bio = request.POST['bio']
            location = request.POST['location']

            user_profile.bio = bio
            user_profile.profileimg = image
            user_profile.location = location
            user_profile.save()
        if request.FILES.get('image') != None:
            image = request.FILES.get('image')
            bio = request.POST['bio']
            location = request.POST['location']

            user_profile.bio = bio
            user_profile.profileimg = image
            user_profile.location = location
            user_profile.save()
        return redirect('settings')
    return render(request, 'setting.html' , {'user_profile': user_profile})
@login_required(login_url = 'signin')
def profile(request, pk):
    user_object = User.objects.get(username=pk)
    user_profile = Profile.objects.get(user=user_object)
    user_posts = Post.objects.filter(user=pk)
    user_post_count = len(user_posts)

    follower = request.user.username
    user = pk

    if folowedPost.objects.filter(user=user, follower=follower).exists():
        button_text = 'Unfollow'
    else:
        button_text = 'Follow'


    context = {
        'user_object': user_object,
        'user_profile': user_profile,
        'user_posts': user_posts,
        'user_post_count': user_post_count,
        'button_text': button_text,
    }
    return render(request, 'profile.html', context)
@login_required(login_url = 'signin')
def follow(request):
    if request.method == 'POST':
        user = request.POST['user']
        follower = request.POST['follower']

        if folowedPost.objects.filter(user=user, follower=follower).first():
            delete_user = folowedPost.objects.get(user=user, follower=follower)
            delete_user.delete()
            return redirect('/profile/' + user)
        else:
            new_follower = folowedPost.objects.create(user=user, follower=follower)
            new_follower.save()
            return redirect('/profile/' + user)
    else:
        return redirect('/')
@login_required(login_url = 'signin')
def upload(request):
    if request.method == 'POST':
        user = request.user.username
        image = request.FILES.get('image_upload')
        caption = request.POST['caption']

        new_post = Post.objects.create(user = user, caption = caption, image = image)
        new_post.save()

        return redirect('/')
    else:    
        return redirect('signin')
@login_required(login_url = 'signin')
def liked_post(request):
    username = request.user.username
    post_id = request.GET.get('post_id')
    post = Post.objects.get(id=post_id)
    like_filter = likedPost.objects.filter(post_id=post_id, username=username).first()
    if like_filter == None:
        new_like = likedPost.objects.create(username=username, post_id=post_id)
        new_like.save()
        post.no_of_likes = post.no_of_likes + 1
        post.save()
        return redirect('/')
    else:
        like_filter.delete()
        post.no_of_likes = post.no_of_likes - 1
        post.save()
        return redirect('/')
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
                user_login = auth.authenticate(username=username, email=email, password=password)
                auth.login(request, user_login)


                #create a profile for the new user
                new_user = User.objects.get(username=username)
                new_profile = Profile.objects.create(user=new_user, id_user=new_user.id)
                new_profile.save()
                return redirect('settings')
        else:
            messages.info(request, 'Passwords do not match')
            return redirect('signup')        
    else:
        return render(request, 'signup.html')
def signin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'Username or password is incorrect')
            return redirect('signin')
    else:
        return render(request, 'signin.html')
@login_required(login_url = 'signin')
def logout(request):
    auth.logout(request)
    return redirect('signin')