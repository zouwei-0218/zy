// =========================
// JS - 滚动动画效果
// 选择需要动画的元素
const observerElements = document.querySelectorAll(
    '.banner h1, .service-item, .project-card, .why-choose-image, .why-choose-content'
);

// IntersectionObserver API 实现滚动动画
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate'); // 元素可见时添加动画类
            observer.unobserve(entry.target); // 一次性动画
        }
    });
}, {
    threshold: 0.2 // 元素进入 20% 可视区域时触发
});

// 为每个元素绑定观察
observerElements.forEach(el => {
    observer.observe(el);
});

// =========================











// =========================
// 跳转到contact us
// =========================
document.getElementById("scrollToContact").addEventListener("click", function() {
    const contactSection = document.getElementById("contact-us");
    contactSection.scrollIntoView({ behavior: "smooth" });
});
// =========================