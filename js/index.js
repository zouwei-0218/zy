/**
 * ============================================
 * Foshan Fly Equipment - 首页特有JavaScript
 * ============================================
 * 说明：此文件包含首页特有的交互功能
 * 依赖：需要先引入 common.js
 * ============================================
 */

/**
 * ============================================
 * DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化首页特有功能
    initHeroAnimations();
    initServiceCards();
    initProjectVideos();
    // initContactForm();
});

/**
 * ============================================
 * Hero区域动画效果
 * ============================================
 * 处理Hero区域的入场动画和交互效果
 */
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    // 获取所有需要动画的元素
    const badge = heroContent.querySelector('.hero-badge');
    const title = heroContent.querySelector('.hero-title');
    const description = heroContent.querySelector('.hero-description');
    const actions = heroContent.querySelector('.hero-actions');
    
    // 添加入场动画类
    const animatedElements = [badge, title, description, actions];
    
    animatedElements.forEach(function(element, index) {
        if (element) {
            // 添加初始样式
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // 延迟执行动画
            setTimeout(function() {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        }
    });
}

/**
 * ============================================
 * 服务卡片交互
 * ============================================
 * 处理服务卡片的悬停效果和点击事件
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card, .service-card-large');
    
    serviceCards.forEach(function(card) {
        // 添加点击事件（如果卡片需要跳转）
        card.addEventListener('click', function() {
            // 可以在这里添加跳转逻辑
            // 例如：window.location.href = 'services.html';
        });
        
        // 添加键盘支持
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.click();
            }
        });
    });
}

/**
 * ============================================
 * 项目视频卡片交互
 * ============================================
 * 处理项目卡片的视频播放/暂停功能
 */
function initProjectVideos() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(function(card) {
        const video = card.querySelector('video');
        const playBtn = card.querySelector('.video-play-btn');
        
        if (!video || !playBtn) return;
        
        // 点击播放按钮切换视频状态
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (video.paused) {
                // 暂停其他所有视频
                document.querySelectorAll('.project-card video').forEach(function(v) {
                    if (v !== video) {
                        v.pause();
                    }
                });
                video.play();
                playBtn.style.opacity = '0';
            } else {
                video.pause();
                playBtn.style.opacity = '1';
            }
        });
        
        // 鼠标悬停时显示/隐藏播放按钮
        card.addEventListener('mouseenter', function() {
            if (video.paused) {
                playBtn.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!video.paused) {
                playBtn.style.opacity = '0';
            }
        });
        
        // 视频播放结束时显示播放按钮
        video.addEventListener('ended', function() {
            playBtn.style.opacity = '1';
        });
    });
}

// 视差滚动效果函数已移除（未使用）


