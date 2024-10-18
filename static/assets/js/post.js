const modalPost = document.querySelector('.modal-post');
const postImgPopup = document.querySelector('.post-image-popup');
const boxAddImage = document.querySelector('.box-add-image');
const inputImage = document.querySelector('.input-image');
const addImageBtn = document.querySelector('.add-image');
const removeImageBtn = document.querySelector('.btn-remove-img');
const btnPostImage = document.querySelector('.btn-post-image');
const inputCaption = document.getElementById('create-post');
const captionTextarea = document.querySelector('.caption textarea');

addImageBtn.addEventListener('click', () =>{
    inputImage.click();
})

//Add the image image from the element
inputImage.addEventListener('change', () =>{
    var file = inputImage.files[0];
    if(file){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            var imageUrl = e.target.result;
            postImgPopup.src = imageUrl;
            boxAddImage.style.backgroundImage = "url('" + imageUrl + "')";
            boxAddImage.style.backgroundPosition = "top center";
            boxAddImage.style.backgroundSize = "cover";
            boxAddImage.style.backgroundRepeat = "no-repeat";
            boxAddImage.style.objectFit = 'fill';
            boxAddImage.querySelector('span').style.display = 'none'
            addImageBtn.style.display = 'none';
            removeImageBtn.style.display = 'block';
        }
        reader.onerror = function(e) {
            console.error("Error reading file:", e.target.error);
        }
    }
})


//Remove the image from the element
removeImageBtn.addEventListener('click', () =>{
    boxAddImage.style.backgroundImage = "";
    boxAddImage.style.backgroundPosition = "";
    boxAddImage.style.backgroundSize = "";
    boxAddImage.style.backgroundRepeat = "";
    boxAddImage.style.objectFit = '';
    boxAddImage.querySelector('span').style.display = ''
    addImageBtn.style.display = '';
    removeImageBtn.style.display = 'none';
})

modalPost.addEventListener('click', () =>{
    modalPost.style.display = 'none';
});

//Open the modal post when clicking on the post image
postImgPopup.addEventListener('click', (event) =>{
    event.stopPropagation();
});

btnPostImage.addEventListener('click', () =>{
    if (inputCaption.value !== ""){
        captionTextarea.value = inputCaption.value;
    }
    modalPost.style.display = '';
});

