// https://freecodez.com
//sidebar
const menuItems = document.querySelectorAll(".menu-item");
const messagesNotification = document.querySelector("#messages-notifications");
const messageBox = document.querySelector(".messages");
const messages = messageBox.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");
const notifications = document.querySelector("#notifications");
const notificationsPopup = document.querySelector('.nav-notifi .notifications-popup');

//remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach((item) => {
        item.classList.remove("active");
    });
};

menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        changeActiveItem();
        item.classList.add("active");
    });
});

const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    messages.forEach((chat) => {
        let name = chat.querySelector("h5").textContent.toLowerCase();
        if (name.indexOf(val) != -1) {
            chat.style.display = "flex";
        } else {
            chat.style.display = "none";
        }
    });
};

messageSearch.addEventListener("keyup", searchMessage);

messagesNotification.addEventListener("click", () => {

    if(messageBox.style.boxShadow == "0 0 1rem var(--color-primary)"){
        messageBox.style.boxShadow = "none";
        messagesNotification.style.boxShadow = "none";
    }else{
        messageBox.style.boxShadow = "0 0 1rem var(--color-primary)";
        messagesNotification.style.boxShadow = "0 0 1rem var(--color-primary)";
        messagesNotification.querySelector(".notification-count").style.display = "none";
        notifications.style.boxShadow = "none";
        notificationsPopup.style.display = 'none';
    }
});


notifications.addEventListener("click", () => {
    if(notificationsPopup.style.display == 'none'){
        messageBox.style.boxShadow = "none";
        messagesNotification.style.boxShadow = "none";
        notifications.style.boxShadow = "0 0 1rem var(--color-primary)";
        notificationsPopup.style.display = 'block';
    }
    else{
        notifications.style.boxShadow = "none";
        notificationsPopup.style.display = 'none';
    }
    notifications.querySelector('.notification-count').style.display = 'none'
});