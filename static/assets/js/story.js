const btnStrLeft = document.querySelector(".middle .box-story .btn-str-left");
const btnStrRight = document.querySelector(".middle .box-story .btn-str-right");
const stories = document.querySelector(".stories");
const story = stories.querySelectorAll('.story');

let currentStory = 0;
let length = story.length;

// Ẩn nút btnStrLeft khi ở trạng thái ban đầu
btnStrLeft.style.display = 'none';

btnStrRight.addEventListener("click", () => {
    let width = story[0].offsetWidth;
    
    if (currentStory == length - 5) {
        currentStory = length - 5; // Đảm bảo không nhảy quá câu chuyện cuối
        btnStrRight.style.display = 'none'; // Ẩn nút phải khi đến cuối
    } else {
        currentStory++;
        stories.style.transform = `translateX(${width * -1 * currentStory}px)`;
        btnStrLeft.style.display = ''; // Hiển thị nút trái khi đã di chuyển
    }

    console.log(currentStory);
});

btnStrLeft.addEventListener("click", () => {
    let width = story[0].offsetWidth;

    if (currentStory == 0) {
        btnStrLeft.style.display = 'none'; // Ẩn nút trái khi về đầu
    } else {
        currentStory--;
        stories.style.transform = `translateX(${width * -1 * currentStory}px)`;
        btnStrRight.style.display = ''; // Hiển thị nút phải khi có thể đi tới
    }

    console.log(currentStory);
});

