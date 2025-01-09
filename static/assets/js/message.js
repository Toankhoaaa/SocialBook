//============================================================================
let dynamicImageSrc = '';
let dynamicLinkHref = "https://www.facebook.com/sadmia.page";

//============================================================================
let mess_list = []; // Mảng để lưu trữ dữ liệu từ API
// URL của API
const apiUrl = 'http://localhost:8000/api/messages/';

// Gửi yêu cầu GET để lấy dữ liệu từ API
$('.right .messages .message').on('click', function (e) {
    var room_name = $(this).data('type');
    var url = '/api/messages/';
    var clickedMessage = $(this); // Store the clicked element

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            room_name: room_name,
        },
        success: function(data) {
            // Lưu dữ liệu vào mảng mess_list
            mess_list = data;

            var modalMessages = $('.modals-message .modal-message');
            var imgProfile = clickedMessage.find('.profile-pic img'); // Use clickedMessage here
            var usernameMess = clickedMessage.find('.message-body h5'); // Use clickedMessage here
            clickedMessage.css('pointer-events', 'none');
            if (modalMessages.length > 1) {
                var imgSrc = modalMessages.eq(0).find('.profileLink img').attr('src');
                var username = modalMessages.eq(0).find('.nameText a').text();
                modalMessages.eq(0).remove();
                createModalMinimize(imgSrc, username);
            }

            dynamicImageSrc = imgProfile.attr('src'); // Get image src from clickedMessage
            username = usernameMess.text(); // Get username from clickedMessage

            createMessageModal(dynamicImageSrc, username, mess_list);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching messages:', error);
            if (xhr.status === 500) {
                console.error('Internal Server Error: Something went wrong on the server.');
            } else if (xhr.status === 404) {
                console.error('Not Found: The requested resource was not found.');
            } else if (xhr.status === 400) {
                console.error('Bad Request: There was an error with your request.');
            }
        }
    });
});

//======================================================================================================================

let createMessageModal = function(imgSrc, username, messList) {
    // Locate the parent element where we'll add this modal
    var modalsContainer = document.querySelector('.modals-message');
    var modals = document.querySelectorAll('.modals-message .modal-message');

    // Create the modal-message div
    var modalMessage = document.createElement('div');
    modalMessage.classList.add('modal-message');

    // Create the form element
    var form = document.createElement('form');
    form.classList.add('mobileSection');
    modalMessage.appendChild(form);

    // Header section creation...
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
                    const filename_profile = imgProfile.split('/').pop(); // Lấy phần tử cuối cùng sau khi tách chuỗi
                    const linkProfile = imgSrc.split('/').pop();
                    if (linkProfile === filename_profile && username === usernameMess.textContent){
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

    // Create mainContent section
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
    name.textContent = username;

    profileImgBasic.appendChild(img);
    profileImgBasic.appendChild(name);

    var infor = document.createElement('div');
    infor.classList.add('infor');

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

    // Create messageContainer to hold messages
    var messageContainer = document.createElement('div');
    messageContainer.classList.add('messageContainer');

    // Populate messageContainer with existing messages
    for (var message of messList) {
        let messageElement;
        if (message.sender === username) {
            messageElement = youPostCreate(message.message);
        } else {
            messageElement = createText(message.message);
        }
        messageContainer.appendChild(messageElement);
    }

    mainContent.appendChild(messageContainer);
    form.appendChild(mainContent);

    // Footer section creation...
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

    inputField.addEventListener('input', (event) => {
        var inputTextDiv = event.target.parentNode;
        var textSubmit = inputTextDiv.parentNode.querySelector('#textSubmit');
        var likePost = inputTextDiv.parentNode.querySelector('#likePost');

        if (inputField.value !== "") {
            textSubmit.classList.remove("disNone");
            likePost.classList.add("disNone");
        } else {
            textSubmit.classList.add("disNone");
            likePost.classList.remove("disNone");
        }
    });

    var smileIcon = document.createElement('i');
    smileIcon.classList.add('fa-solid', 'fa-face-smile');

    inputTextDiv.appendChild(inputField);
    inputTextDiv.appendChild(smileIcon);

    var likeBtn = document.createElement('i');
    likeBtn.id = 'likePost';
    likeBtn.classList.add('fa-solid', 'fa-thumbs-up', 'likeBtn');

    likeBtn.addEventListener('click', function() {
        addLikePost(event, messageContainer);
        mainContent.scrollTop = mainContent.scrollHeight;
    });

    var textSubmit = document.createElement('i');
    textSubmit.id = 'textSubmit';
    textSubmit.classList.add('fa-solid', 'fa-circle-chevron-right', 'likeBtn', 'disNone');

    // Add event listener to textSubmit to send message
    textSubmit.addEventListener('click', function() {
        console.log("completer")
        var message = inputField.value;
        if (message) {
            event.preventDefault();
            let newMessage = createText(message);
            messageContainer.appendChild(newMessage);  // Append the new message to messageContainer
            inputField.value = "";  // Clear the input
            textSubmit.classList.add("disNone");
            likeBtn.classList.remove("disNone");
            // Form submit listener
            const message = document.getElementById('inputPostText').value;
            // Determine the WebSocket protocol based on the application's URL
            const websocketProtocol = window.location.protocol === "https:" ? "wss" : "ws";
            const wsEndpoint = `${websocketProtocol}://${window.location.host}/ws/notification/${messList.room_name}/`;

            // Create a new WebSocket connection
            const socket = new WebSocket(wsEndpoint);

            // Successful connection event
            socket.onopen = (event) => {
                console.log("WebSocket connection opened!");
            };

            // Socket disconnect event
            socket.onclose = (event) => {
                console.log("WebSocket connection closed!");
            };
            event.preventDefault();
            socket.send(
                JSON.stringify({
                    'message': message,
                    'room_name': messList.room_name,
                    'receiver': username,
                    'sender': messList.sender,
                })
            );
            // Auto-scroll to the bottom of messageContainer
            mainContent.scrollTop = mainContent.scrollHeight;
        }
    });



    inputText.appendChild(inputTextDiv);
    inputText.appendChild(likeBtn);
    inputText.appendChild(textSubmit);

    footerSection.appendChild(iconSite);
    footerSection.appendChild(inputText);

    form.appendChild(footerSection);

    // Append modalMessage to modalsContainer
    modalsContainer.appendChild(modalMessage);
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
            const filename_profile = imgProfile.src.split('/').pop(); // Lấy phần tử cuối cùng sau khi tách chuỗi

            const linkProfile = imgSrc.split('/').pop();
            if (linkProfile === filename_profile && username === usernameMess.textContent) {
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
}


