let replayTextHello = "Hello...";
let replayTextHi = "Hiii";
let replayTextHAY = "I am fine, Thank You...";
let replayTextNice = "Thank You...";
let replayTextLove = "I Love You Too";
let replayTextName = '';
let replayTextSadmiaSM = "Good";
let replayTextSadmia = "অনলাইন টিউটোরিয়ালগুলি সম্পূর্ণ প্রতিক্রিয়াশীল ওয়েবসাইট ডিজাইন এবং টিউটারিয়াল, ক্রিয়েটিভ সিএসএস অ্যানিমেশন এবং হোভার এফেক্টস, সৃজনশীল ইউএক্স এবং ইউআই ডিজাইন এইচটিএমএল এবং সিএসএস ব্যবহার করে এবং আরও অনেক কিছু শেখার জন্য একটি চ্যানেল | এইচটিএম 5, সিএসএস 3, জাভাস্ক্রিপ্ট, JQuery, বুটস্ট্র্যাপ, ফটোশপ, ওয়েবসাইট ডিজাইন এবং টিউটরিয়াল ভিডিও আপলোড।";
let replayTextSadmiaVL = `https://youtu.be/8yj1Qs-l61o`;
let replayTextSadmiaGH = `https://github.com/sadmia`;

//============================================================================
let dynamicImageSrc = '';
let dynamicLinkHref = "https://www.facebook.com/sadmia.page";

// var audioTon;
// var postSection;
// var likePost;
// var textSubmit;
// var mainContent;


for (let i = 0; i < messages.length; i++){
    messages[i].addEventListener('click', function(event) {
        messages[i].style.pointerEvents = 'none';
        var modalMessages = document.querySelectorAll('.modals-message .modal-message')
        var imgProfile = messages[i].querySelector('.profile-pic img');
        var usernameMess = messages[i].querySelector('.message-body h5');
     
        if(modalMessages.length > 1){
            var imgSrc = modalMessages[0].querySelector('.profileLink img').src;
            var username = modalMessages[0].querySelector('.nameText a').textContent;
            modalMessages[0].remove();
            createModalMinimize(imgSrc, username);
        }
        dynamicImageSrc = imgProfile.src;
        username = usernameMess.textContent;
        createMessageModal(dynamicImageSrc, username);
        replayTextName = 'My name is ' + username;
        
    });
}

let createMessageModal = function(imgSrc, username){
    // Tìm phần tử cha nơi chúng ta sẽ thêm modal này
    var modalsContainer = document.querySelector('.modals-message');
    var modals = document.querySelectorAll('.modals-message .modal-message');

    // Tạo phần tử 'div' với class 'modal-message'
    var modalMessage = document.createElement('div');
    modalMessage.classList.add('modal-message');

    // Tạo phần tử form
    var form = document.createElement('form');
    form.classList.add('mobileSection');
    modalMessage.appendChild(form);

    // Tạo header section
    var header = document.createElement('header');
    header.classList.add('haderSection');
    
    // Tạo imageAndText div
    var imageAndText = document.createElement('div');
    imageAndText.classList.add('imageAndText');

    var imagesDiv = document.createElement('div');
    imagesDiv.classList.add('imagesDiv');
    
    var profileLink = document.createElement('a');
    profileLink.classList.add('profileLink');
    profileLink.href = "#";

    var profileImage = document.createElement('img');
    profileImage.classList.add('profileImages');
    profileImage.src = imgSrc;
    profileImage.alt = 'Profile Image';
    profileLink.appendChild(profileImage);

    var nameText = document.createElement('h1');
    nameText.classList.add('nameText');
    var profileNameShow = document.createElement('a');
    profileNameShow.id = 'profileNameShow';
    profileNameShow.classList.add('profileLink');
    profileNameShow.href = "#";
    profileNameShow.textContent = username; // Tên có thể tuỳ chỉnh
    nameText.appendChild(profileNameShow);

    imagesDiv.appendChild(profileLink);
    imagesDiv.appendChild(nameText);
    imageAndText.appendChild(imagesDiv);
    
    // Thêm imageAndText vào header
    header.appendChild(imageAndText);

    // Tạo collIcon div
    var collIcon = document.createElement('div');
    collIcon.classList.add('collIcon');

    var iconList = document.createElement('ul');
    
    // Thêm các icon vào danh sách
    var icons = ['fa-phone', 'fa-video', 'fa-minus', 'fa-xmark'];
    icons.forEach(function(iconClass, index) {
        var li = document.createElement('li');
        var icon = document.createElement('i');
        icon.classList.add('fa-solid', iconClass);
        li.appendChild(icon);

        // Thêm sự kiện cho nút minimize và close
        if (iconClass === 'fa-minus') {
            li.classList.add('btn-minimize');
            li.addEventListener('click', function() {
                modalMessage.remove();
                createModalMinimize(imgSrc, username);
            });
        } else if (iconClass === 'fa-xmark') {
            li.classList.add('btn-close');
            li.addEventListener('click', function() {
                //Bật click cho message ở list-message
                for (var j = 0; j < messages.length; j++){
                    var imgProfile = messages[j].querySelector('.profile-pic img');
                    var usernameMess = messages[j].querySelector('.message-body h5');
                    if (imgSrc == imgProfile.src && username == usernameMess.textContent){
                        messages[j].style.pointerEvents = '';
                        break;
                    }
                }
                modalMessage.remove(); // Đóng và xoá modal
            });
        }

        iconList.appendChild(li);
    });

    collIcon.appendChild(iconList);
    header.appendChild(collIcon);

    // Thêm header vào form
    form.appendChild(header);

    // Tạo mainContent section
    var mainContent = document.createElement('section');
    mainContent.classList.add('mainContent');

    var meText = document.createElement('div');
    meText.classList.add('meText');

    var basicInfor = document.createElement('div');
    basicInfor.classList.add('basic-infor');

    var profileImgBasic = document.createElement('div');
    profileImgBasic.classList.add('profile-img-basic');
    
    var img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Profile Image';
    
    var name = document.createElement('h2');
    name.textContent = username; // Tên hiển thị

    profileImgBasic.appendChild(img);
    profileImgBasic.appendChild(name);

    var infor = document.createElement('div');
    infor.classList.add('infor');
    infor.style.color = 'var(--textColorLightHigh)';

    var postInfo = document.createElement('span');
    postInfo.textContent = '1 Post - 2 mutual friends - 3 Followers';

    var locationInfo = document.createElement('p');
    locationInfo.textContent = 'Live in Da Nang';

    infor.appendChild(postInfo);
    infor.appendChild(locationInfo);

    basicInfor.appendChild(profileImgBasic);
    basicInfor.appendChild(infor);
    meText.appendChild(basicInfor);

    mainContent.appendChild(meText);

    // Thêm mainContent vào form
    form.appendChild(mainContent);

    // Tạo footerSection section
    var footerSection = document.createElement('footer');
    footerSection.classList.add('footerSection');

    var iconSite = document.createElement('div');
    iconSite.classList.add('iconSite');

    var footerIconList = document.createElement('ul');
    var footerIcons = ['fa-circle-plus', 'fa-camera', 'fa-image', 'fa-microphone'];
    
    footerIcons.forEach(function(iconClass) {
        var li = document.createElement('li');
        var icon = document.createElement('i');
        icon.classList.add('fa-solid', iconClass);
        li.appendChild(icon);
        footerIconList.appendChild(li);
    });

    iconSite.appendChild(footerIconList);

    var inputText = document.createElement('div');
    inputText.classList.add('inputText');

    var inputTextDiv = document.createElement('div');
    inputTextDiv.classList.add('inputTextDiv');

    var inputField = document.createElement('input');
    inputField.id = 'inputPostText';
    inputField.type = 'text';
    inputField.placeholder = 'Aa';

    inputField.addEventListener('input', (event) =>{
        var inputTextDiv = event.target.parentNode;
        var inputText = inputTextDiv.parentNode;
        var textSubmit = inputText.querySelector('#textSubmit');
        var likePost = inputText.querySelector('#likePost');
        
        if (inputPostText.value !== "") {
            textSubmit.classList.remove("disNone");
            likePost.classList.add("disNone");
        } else {
            textSubmit.classList.add("disNone");
            likePost.classList.remove("disNone");
        }
    })

    
    var smileIcon = document.createElement('i');
    smileIcon.classList.add('fa-solid', 'fa-face-smile');
    
    inputTextDiv.appendChild(inputField);
    inputTextDiv.appendChild(smileIcon);
    var likeBtn = document.createElement('i');
    likeBtn.id = 'likePost';
    likeBtn.classList.add('fa-solid', 'fa-thumbs-up', 'likeBtn');
    
    var mainContent = document.querySelector('.mainContent');
    likeBtn.addEventListener('click', function(event) {
        var inputText = event.target.parentNode;
        var footerSection = inputText.parentNode;
        var mobileSection = footerSection.parentNode;
        var mainContent = mobileSection.querySelector('.mainContent');
        var postSection = mobileSection.querySelector('.mainContent .meText');
        addLikePost(event, postSection);
        mainContent.scrollTop = mainContent.scrollHeight;
    })
    
    var textSubmit = document.createElement('i');
    textSubmit.id = 'textSubmit';
    textSubmit.classList.add('fa-solid', 'fa-circle-chevron-right', 'likeBtn', 'disNone');
    
    textSubmit.addEventListener('click', (event)=>{
        var inputText = event.target.parentNode;
        var textSubmit = inputText.querySelector('#textSubmit');
        var likeBtn = inputText.querySelector('#likePost');
        var inputPostText = inputText.querySelector('#inputPostText');
        var footerSection = inputText.parentNode;
        var mobileSection = footerSection.parentNode;
        var mainContent = mobileSection.querySelector('.mainContent');
        var postSection = mobileSection.querySelector('.mainContent .meText');
    
        event.preventDefault();
        let submit = createText(inputPostText.value);
        postSection.appendChild(submit);
        
        condotionFonction(inputPostText.value, postSection);
        
        inputPostText.value = "";
        textSubmit.classList.add("disNone");
        likeBtn.classList.remove("disNone");
        mainContent.scrollTop = mainContent.scrollHeight;
    })
    
    inputText.appendChild(inputTextDiv);
    inputText.appendChild(likeBtn);
    inputText.appendChild(textSubmit);

    footerSection.appendChild(iconSite);
    footerSection.appendChild(inputText);

    // Thêm footer vào form
    form.appendChild(footerSection);

    // Tạo phần tử audio
    var audio = document.createElement('audio');
    audio.id = 'audioTon';
    var source = document.createElement('source');
    source.src = "{% static './assets/audio/audio_messenger.mp3' %}";
    source.type = 'audio/mp3';
    audio.appendChild(source);

    // Thêm audio vào modal
    modalMessage.appendChild(audio);
    modalMessage.setAttribute('data-id', modals.length + 1);
    // Thêm modalMessage vào modalsContainer
    modalsContainer.appendChild(modalMessage);
    audioTon = document.getElementById("audioTon");

    // postSection = document.querySelector('.meText');
    // likePost = document.getElementById("likePost");
    // textSubmit = document.getElementById("textSubmit");
    // mainContent = document.querySelector('.mainContent');
}


let createModalMinimize = function(imgSrc, username){
    let modals = document.querySelector('.modals-minimize');
    // Tạo phần tử div chính với class modal-minimize
    var modalMinimize = document.createElement('div');
    modalMinimize.classList.add('modal-minimize');

    // Tạo phần tử div con với class pic-minimize
    var picMinimize = document.createElement('div');
    picMinimize.classList.add('pic-minimize');
    modalMinimize.appendChild(picMinimize);

    // Tạo nút đóng minimize
    var closeButton = document.createElement('button');
    closeButton.classList.add('btn-close-minimize');
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

     // Thêm sự kiện cho nút đóng
    closeButton.addEventListener('click', function() {
        //Bật click cho message ở list-message
        for (var j = 0; j < messages.length; j++){
            var imgProfile = messages[j].querySelector('.profile-pic img');
            var usernameMess = messages[j].querySelector('.message-body h5');
            if (imgSrc == imgProfile.src && username == usernameMess.textContent){
                messages[j].style.pointerEvents = '';
                break;
            }
        }
        modalMinimize.style.display = 'none';

    });
    picMinimize.appendChild(closeButton);

    // Tạo phần tử hình ảnh
    var image = document.createElement('img');
    image.src = imgSrc;
    image.alt = 'Minimized image';
    
    image.addEventListener('click', () =>{
        createMessageModal(imgSrc, username);
        modalMinimize.remove();
    });
    picMinimize.appendChild(image);

    modals.appendChild(modalMinimize);
}

let openMinimizeModal = function() {
    modalMinimize.style.display = "";
    imgMinimize.src = dynamicImageSrc;
}

//Dọn sạch input khi được gửi đi và trả về trạng thái ban đầu
let postText = function(event) {
    event.preventDefault();
    
	let submit = createText(inputPostText.value);
	postSection.appendChild(submit);

    condotionFonction(inputPostText.value, postSection);

	inputPostText.value = "";
	textSubmit.classList.add("disNone");
	likePost.classList.remove("disNone");
}


//Tạo element cho tin nhắn gửi đi
let createText = function(text) {
	let ptag = document.createElement("p");
	ptag.innerText = text;

	let mePostDiv = document.createElement("div");
	mePostDiv.className = "postMe";
	let blankDiv = document.createElement("div");
	let textDiv = document.createElement("div");
	textDiv.className = "textDiv";

	mePostDiv.appendChild(blankDiv);
	mePostDiv.appendChild(textDiv);
	textDiv.appendChild(ptag);

	return mePostDiv;
} 

//tạo element cho nút Like
let createLikePost = function() {
	let ptag = document.createElement("p");
	ptag.className = "likeiconPost";

	let mePostDiv = document.createElement("div");
	mePostDiv.className = "postMe";
	let blankDiv = document.createElement("div");
	let textDiv = document.createElement("div");
	textDiv.className = "textDiv";
	let itag = document.createElement("i");
	itag.className = "fa-solid fa-thumbs-up likePost";

	mePostDiv.appendChild(blankDiv);
	mePostDiv.appendChild(textDiv);
	textDiv.appendChild(ptag);
	ptag.appendChild(itag);

	return mePostDiv;
}
let addLikePost = function(event, postSection) {
	event.preventDefault();
	let submit = createLikePost();
	postSection.appendChild(submit);
}


//Tạo element cho tin nhắn gửi đến
let youPostCreate = function(text) {

	let mePostDiv = document.createElement("div");
	mePostDiv.className = "postYour";
	let textDiv = document.createElement("div");
	textDiv.className = "textDiv";
	let ptag = document.createElement("p");
	ptag.innerText = text;

	let imageDiv = document.createElement("div");
	imageDiv.className = "imagesDivMini";
	let aTag = document.createElement("a");
	aTag.className = "profileLink";
	let imgTag = document.createElement("img");
	imgTag.className = "profileImages";
	imgTag.src = dynamicImageSrc;

	mePostDiv.appendChild(textDiv);
	textDiv.appendChild(ptag);
	textDiv.appendChild(imageDiv);
	imageDiv.appendChild(aTag);
	aTag.appendChild(imgTag);

	return mePostDiv;
}

//Xử lý tin nhắn được gửi đến
let addYouPost = function(event,replayText, postSection) {
	event.preventDefault();
	let submit = youPostCreate(replayText);
	postSection.appendChild(submit);
	audioTon.play();
}


let condotionFonction = function(inVlu, postSection) {
	if (inVlu == "hello" || inVlu == "Hello" || inVlu == "hlw" || inVlu == "Hlw") {
		addYouPost(event, replayTextHello, postSection);
	} else if (inVlu == "Hi" || inVlu == "hi" || inVlu == "Hii" || inVlu == "hii") {
		addYouPost(event, replayTextHi, postSection);
	} else if (inVlu == "how are you" || inVlu == "How Are You" || inVlu == "How are you" || inVlu == "how are you?") {
		addYouPost(event, replayTextHAY, postSection);
		addYouPost(event, "And You...", postSection);
	} else if (inVlu == "nice" || inVlu == "Nice" || inVlu == "Good" || inVlu == "good" || inVlu == "beautiful" || inVlu == "Beautiful" || inVlu == "So Beautiful" || inVlu == "So beautiful" || inVlu == "so beautiful") {
		addYouPost(event, replayTextNice, postSection);
	} else if (inVlu == "I Love you" || inVlu == "i love you" || inVlu == "I love you" || inVlu == "love me") {
		addYouPost(event, replayTextLove, postSection);
	} else if (inVlu == "Your Name" || inVlu == "your name" || inVlu == "What is your name?" || inVlu == "What is your name") {
		addYouPost(event, replayTextName, postSection);
	} else if (inVlu == "sadmia" || inVlu == "Sadmia" || inVlu == "Sad Mia" || inVlu == "SadMia") {
		addYouPost(event, replayTextSadmia, postSection);;
	} else if (inVlu == "Video" || inVlu == "video" || inVlu == "vido link" || inVlu == "Video Link") {
		addYouPost(event, replayTextSadmiaVL, postSection);
	} else if (inVlu == "Github" || inVlu == "GitHub" || inVlu == "github" || inVlu == "Github Link") {
		addYouPost(event, replayTextSadmiaGH, postSection);
	} else if (inVlu == "আমিও" || inVlu == "I am fine" || inVlu == "i am fine" || inVlu == "fine" || inVlu == "yes") {
		addYouPost(event, replayTextSadmiaSM, postSection);
	}
}
