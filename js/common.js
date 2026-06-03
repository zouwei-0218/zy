/**
 * ============================================
 * Foshan Fly Equipment - 公共JavaScript
 * ============================================
 * 说明：此文件包含网站所有页面共享的JavaScript功能
 * 功能：导航栏交互、移动端菜单、滚动效果等
 * 维护：修改此文件会影响所有页面，请谨慎操作
 * ============================================
 */

/**
 * ============================================
 * 1. DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有公共功能
    initNavbar();
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
});

/**
 * ============================================
 * 2. 导航栏功能
 * ============================================
 * 处理导航栏的滚动效果和状态变化
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // 监听滚动事件，添加/移除scrolled类
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 初始化时检查滚动位置
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    }
}

function toWhatsApp(){
    window.open('https://wa.me/message/5Z5VATVJXTD2C1', '_blank')
}


/**
 * ============================================
 * 3. 移动端菜单功能
 * ============================================
 * 处理移动端汉堡菜单的展开/收起
 */
function initMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    if (!toggle || !nav) return;
    
    // 点击菜单按钮切换菜单状态
    toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        toggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });
    
    // 点击导航链接后自动关闭菜单
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(event) {
        if (!toggle.contains(event.target) && !nav.contains(event.target)) {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * ============================================
 * 4. 滚动效果
 * ============================================
 * 处理页面滚动时的各种动画和效果
 */
function initScrollEffects() {
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;
    
    // 创建Intersection Observer实例
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // 动画只触发一次，取消观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有需要动画的元素
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * ============================================
 * 5. 平滑滚动
 * ============================================
 * 处理锚点链接的平滑滚动效果
 */
function initSmoothScroll() {
    // 获取所有锚点链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // 忽略空锚点
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                
                // 计算目标位置（考虑固定导航栏高度）
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // 执行平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ============================================
 * 6. 工具函数
 * ============================================
 * 常用的JavaScript工具函数
 */

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 限制时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * 检查元素是否在视口内
 * @param {Element} element - 要检查的元素
 * @returns {boolean} 是否在视口内
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 格式化数字（添加千位分隔符）
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否复制成功
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('复制失败:', err);
        return false;
    }
}

/**
 * ============================================
 * 7. 表单验证工具
 * ============================================
 * 常用的表单验证函数
 */
const FormValidator = {
    /**
     * 验证邮箱格式
     * @param {string} email - 邮箱地址
     * @returns {boolean} 是否有效
     */
    isEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    /**
     * 验证手机号（中国大陆）
     * @param {string} phone - 手机号
     * @returns {boolean} 是否有效
     */
    isPhone: function(phone) {
        const regex = /^1[3-9]\d{9}$/;
        return regex.test(phone);
    },
    
    /**
     * 验证是否为空
     * @param {string} value - 要验证的值
     * @returns {boolean} 是否为空
     */
    isEmpty: function(value) {
        return !value || value.trim() === '';
    },
    
    /**
     * 验证最小长度
     * @param {string} value - 要验证的值
     * @param {number} min - 最小长度
     * @returns {boolean} 是否符合要求
     */
    minLength: function(value, min) {
        return value && value.length >= min;
    },
    
    /**
     * 显示错误信息
     * @param {Element} element - 表单元素
     * @param {string} message - 错误信息
     */
    showError: function(element, message) {
        // 移除已有的错误信息
        this.clearError(element);
        
        // 添加错误样式
        element.classList.add('error');
        
        // 创建错误信息元素
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // 插入到元素后面
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    },
    
    /**
     * 清除错误信息
     * @param {Element} element - 表单元素
     */
    clearError: function(element) {
        element.classList.remove('error');
        const errorElement = element.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
};

// 导出工具函数供其他脚本使用
window.FoshanFlyUtils = {
    debounce: debounce,
    throttle: throttle,
    isInViewport: isInViewport,
    formatNumber: formatNumber,
    copyToClipboard: copyToClipboard,
    FormValidator: FormValidator
};