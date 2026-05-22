
const banner = document.querySelector('.banner');
let imgElement= banner.querySelector(".banner-image");
const img_data = [
    "../static/img/Hotel-lobby-decoration-banner-scaled.jpg",
    "../static/img/Restaurant-decoration-banner-scaled.jpg",
];
let currentIndex = 0;
// 初始化
imgElement.src = img_data[currentIndex];
imgElement.classList.add('active');/* 默认显示第一张 */

// 切换
function nextSlide() {
    const nextIndex = (currentIndex + 1) % img_data.length;
    const nextImg = document.createElement('img');
    nextImg.src = img_data[nextIndex];
    nextImg.className = 'banner-image';

    banner.appendChild(nextImg);
    void nextImg.offsetWidth;
    
    imgElement.classList.add("exit");
    nextImg.classList.add("active");
    // 动画结束后清理
    setTimeout(() => {
        banner.removeChild(imgElement);
        imgElement = nextImg;
        currentIndex = nextIndex;
    }, 1000); // 对应 CSS transition 时间

}

// 自动轮播
// 每 5 秒切换
setInterval(nextSlide, 5000);

