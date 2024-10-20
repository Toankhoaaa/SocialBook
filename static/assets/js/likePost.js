const likeBtns = document.querySelectorAll('.interaction-button span:first-child');

// Duyệt qua từng nút like tương ứng với các bài viết
likeBtns.forEach((likeBtn) => {
    likeBtn.addEventListener('click', (event) => {
        const interaction = likeBtn.parentNode;
        const typeOfLike = interaction.querySelector('.type-of-likes');
        const icon = likeBtn.querySelector('.icon-like');
        const tag = likeBtn.querySelector('.tag-like');
        const typeOf = interaction.querySelectorAll('.type-of-likes li');
        
        // Kiểm tra nếu phần tử icon có class 'uil-thumbs-up'
        const isThumbsUp = icon.innerHTML.trim() == '<i class="uil uil-thumbs-up"></i>';

        // Thay đổi trạng thái hiển thị của loại cảm xúc
        if (isThumbsUp) {
            typeOfLike.style.display = ''; // Hiện danh sách cảm xúc
            likeBtn.style.color = 'var(--color-primary)'; // Đổi màu nút Like
        } else {
            typeOfLike.style.display = 'none'; // Ẩn danh sách cảm xúc
            likeBtn.style.color = ''; // Đặt lại màu nút Like
            
            // Tạo lại biểu tượng thumbs-up khi chuyển lại trạng thái 'Like'
            const iconNoLike = document.createElement('i');
            iconNoLike.classList.add('uil', 'uil-thumbs-up');
            icon.textContent = '';
            icon.appendChild(iconNoLike);
            tag.textContent = 'Thích';
            tag.style.color = ''; // Đặt lại màu của nhãn
        }

        // Duyệt qua từng kiểu cảm xúc trong typeOfLike (❤️, 😘, 😂, 😢, 😡)
        typeOf.forEach((reaction) => {
            reaction.addEventListener('click', () => {
                // Cập nhật nhãn và biểu tượng dựa trên cảm xúc đã chọn
                switch (reaction.textContent) {
                    case '❤️':
                        tag.textContent = 'Yêu Thích';
                        tag.style.color = 'rgb(243, 62, 88)';
                        icon.textContent = reaction.textContent;
                        break;
                    case '😘':
                        tag.textContent = 'Thương Thương';
                        tag.style.color = 'rgb(247, 177, 37)';
                        icon.textContent = reaction.textContent;
                        break;
                    case '😂':
                        tag.textContent = 'HaHa';
                        tag.style.color = 'rgb(247, 177, 37)';
                        icon.textContent = reaction.textContent;
                        break;
                    case '😯':
                        tag.textContent = 'Wow';
                        tag.style.color = 'rgb(247, 177, 37)';
                        icon.textContent = reaction.textContent;
                    case '😢':
                        tag.textContent = 'Buồn';
                        tag.style.color = 'rgb(247, 177, 37)';
                        icon.textContent = reaction.textContent;
                        break;
                    case '😡':
                        tag.textContent = 'Tức Giận';
                        tag.style.color = 'rgb(233, 113, 15)';
                        icon.textContent = reaction.textContent;
                        break;
                    default:
                        // Đặt lại trạng thái Thích
                        const like = document.createElement('i');
                        like.classList.add('fa-solid', 'fa-thumbs-up');
                        like.style.color = 'var(--color-primary)';
                        icon.textContent = '';
                        icon.appendChild(like);
                        tag.textContent = 'Thích';
                        tag.style.color = 'var(--color-primary)';
                }

                // Ẩn danh sách typeOfLike sau khi chọn cảm xúc
                typeOfLike.style.display = 'none';
            });
        });
    });
});
