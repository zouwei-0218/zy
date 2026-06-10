/**
 * ============================================
 * Foshan ZY Furniture - 项目案例页特有JavaScript
 * ============================================
 * 说明：此文件包含项目案例页特有的交互功能
 * 依赖：需要先引入 common.js
 * ============================================
 */

/**
 * ============================================
 * DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化案例页特有功能
    initFilter();
    initCaseCards();
    initStatsAnimation();
    
    // 动态加载分类和初始案例
    loadCategories();
    // 默认加载所有案例
    renderCases('all');
});


const projects = {
    "restaurant": [
        {
            name: 'Ocean View Restaurant',
            video_src: './video/restaurant-1.mp4',
            image_src: './img/restaurant-1.jpg',
            description: 'A contemporary seafood restaurant featuring ocean-inspired decor and premium dining furniture.',
            address: 'Marina Bay, Singapore',
            date: '2024-03-15'
        },
        {
            name: 'Golden Dragon Chinese',
            video_src: './video/restaurant-2.mp4',
            image_src: './img/restaurant-2.jpg',
            description: 'Traditional Chinese fine dining restaurant with custom-made wooden tables and chairs.',
            address: 'Shanghai, China',
            date: '2024-01-20'
        },
        {
            name: 'Tuscany Bistro',
            video_src: './video/restaurant-3.mp4',
            image_src: './img/restaurant-3.jpg',
            description: 'Italian countryside-themed bistro with rustic wooden furniture and warm lighting.',
            address: 'Florence, Italy',
            date: '2023-11-10'
        }
    ],
    "coffee shop": [
        {
            name: 'Morning Brew Cafe',
            video_src: './video/coffee-1.mp4',
            image_src: './img/coffee-1.jpg',
            description: 'Cozy neighborhood coffee shop with comfortable seating and minimalist design.',
            address: 'Portland, Oregon, USA',
            date: '2024-02-28'
        },
        {
            name: 'Bean There Coffee Co.',
            video_src: './video/coffee-2.mp4',
            image_src: './img/coffee-2.jpg',
            description: 'Industrial-style coffee shop with metal and wood furniture combinations.',
            address: 'Austin, Texas, USA',
            date: '2023-12-05'
        },
        {
            name: 'Tokyo Roasters',
            video_src: './video/coffee-3.mp4',
            image_src: './img/coffee-3.jpg',
            description: 'Japanese minimalist coffee shop with tatami seating areas.',
            address: 'Tokyo, Japan',
            date: '2024-04-12'
        }
    ],
    "bar": [
        {
            name: 'Sky Lounge Bar',
            video_src: './video/bar-1.mp4',
            image_src: './img/bar-1.jpg',
            description: 'Rooftop bar with panoramic city views and modern lounge furniture.',
            address: 'Dubai, UAE',
            date: '2024-01-15'
        },
        {
            name: 'Speakeasy Underground',
            video_src: './video/bar-2.mp4',
            image_src: './img/bar-2.jpg',
            description: 'Vintage speakeasy-style bar with leather booths and brass accents.',
            address: 'New York City, USA',
            date: '2023-10-20'
        },
        {
            name: 'Cocktail Lab',
            video_src: './video/bar-3.mp4',
            image_src: './img/bar-3.jpg',
            description: 'Modern mixology bar with experimental cocktail menu and futuristic design.',
            address: 'London, UK',
            date: '2024-03-01'
        }
    ],
    "fast-food restaurant": [
        {
            name: 'Burger Hub Express',
            video_src: './video/fast-food-1.mp4',
            image_src: './img/fast-food-1.jpg',
            description: 'Contemporary fast-food chain with modular seating and vibrant colors.',
            address: 'Los Angeles, USA',
            date: '2024-02-10'
        },
        {
            name: 'Pizza Palace',
            video_src: './video/fast-food-2.mp4',
            image_src: './img/fast-food-2.jpg',
            description: 'Casual pizza restaurant with industrial-chic decor and communal tables.',
            address: 'Chicago, USA',
            date: '2023-11-25'
        },
        {
            name: 'Asian Express',
            video_src: './video/fast-food-3.mp4',
            image_src: './img/fast-food-3.jpg',
            description: 'Quick-service Asian restaurant with sleek, modern interior design.',
            address: 'Sydney, Australia',
            date: '2024-04-05'
        }
    ]
};

/**
 * ============================================
 * 动态加载分类列表
 * ============================================
 * 从projects对象动态生成分类筛选按钮
 */
function loadCategories() {
    const filterList = document.querySelector('.filter-list');
    if (!filterList) return;
    
    // 清空现有筛选列表（保留"All Projects"）
    const allBtn = filterList.querySelector('[data-filter="all"]');
    filterList.innerHTML = '';
    
    // 添加"All Projects"按钮
    const allButton = document.createElement('button');
    allButton.className = 'filter-item active';
    allButton.setAttribute('data-filter', 'all');
    allButton.textContent = 'All Projects';
    
    // 为All Projects按钮添加点击事件
    allButton.addEventListener('click', function() {
        // 移除所有active状态
        document.querySelectorAll('.filter-item').forEach(function(filter) {
            filter.classList.remove('active');
        });
        // 添加active状态到当前项
        this.classList.add('active');
        // 渲染所有案例
        renderCases('all');
    });
    
    filterList.appendChild(allButton);
    
    // 获取projects对象的所有分类名称
    const categories = Object.keys(projects);
    
    categories.forEach(function(categoryName) {
        // 创建分类按钮
        const filterItem = document.createElement('button');
        filterItem.className = 'filter-item';
        filterItem.setAttribute('data-filter', categoryName);
        // 将分类名首字母大写
        filterItem.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        
        // 添加点击事件
        filterItem.addEventListener('click', function() {
            // 移除所有active状态
            document.querySelectorAll('.filter-item').forEach(function(filter) {
                filter.classList.remove('active');
            });
            // 添加active状态到当前项
            this.classList.add('active');
            // 渲染对应分类的案例
            renderCases(categoryName);
        });
        
        filterList.appendChild(filterItem);
    });
}

/**
 * ============================================
 * 根据分类渲染案例卡片
 * ============================================
 * 根据选中的分类动态渲染案例卡片
 */
function renderCases(categoryName) {
    const casesGrid = document.querySelector('.cases-grid');
    if (!casesGrid) return;
    
    // 获取需要显示的案例数据（包含分类信息）
    let caseDataList = [];
    if (categoryName === 'all') {
        // 获取所有分类的案例，同时记录每个案例所属的分类
        Object.keys(projects).forEach(function(cat) {
            projects[cat].forEach(function(project) {
                caseDataList.push({
                    project: project,
                    category: cat
                });
            });
        });
    } else {
        // 获取指定分类的案例
        (projects[categoryName] || []).forEach(function(project) {
            caseDataList.push({
                project: project,
                category: categoryName
            });
        });
    }
    
    // 清空现有案例卡片
    casesGrid.innerHTML = '';
    
    // 如果没有案例，显示提示
    if (caseDataList.length === 0) {
        casesGrid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666; grid-column: 1 / -1;">
                <p>No projects found in this category.</p>
            </div>
        `;
        return;
    }
    
    // 生成案例卡片
    caseDataList.forEach(function(item, index) {
        const project = item.project;
        const cat = item.category;
        
        // 创建案例卡片
        const caseCard = document.createElement('div');
        caseCard.className = 'case-card';
        caseCard.setAttribute('data-category', cat);
        caseCard.setAttribute('data-animate', '');
        
        // 生成图片URL（使用默认图片或数据中的图片）
        const imgSrc = project.image_src 
            ? project.image_src 
            : `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(project.name + ' ' + cat + ' interior design')}&image_size=landscape_16_9`;
        
        // 将分类名格式化（首字母大写）
        const formattedCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
        
        // 设置卡片内容
        caseCard.innerHTML = `
            <div class="case-image-wrapper">
                <img src="${imgSrc}" 
                     alt="${project.name}" 
                     class="case-image"
                     loading="lazy">
                <div class="case-overlay">
                    <span class="case-view-btn">
                        View Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="case-content">
                <span class="case-category">${formattedCategory}</span>
                <h3 class="case-title">${project.name}</h3>
                <p class="case-desc">${project.description}</p>
                <div class="case-meta">
                    <div class="case-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>${project.address}</span>
                    </div>
                    <div class="case-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>${project.date ? project.date.substring(0, 4) : 'N/A'}</span>
                    </div>
                </div>
            </div>
        `;
        
        // 设置初始样式（用于动画）
        caseCard.style.opacity = '0';
        caseCard.style.transform = 'translateY(30px)';
        caseCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // 添加到网格
        casesGrid.appendChild(caseCard);
        
        // 添加入场动画
        setTimeout(function() {
            caseCard.style.opacity = '1';
            caseCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // 重新绑定案例卡片的交互事件
    initCaseCards();
}

/**
 * ============================================
 * 筛选功能（保留原函数但已被动态加载功能替代）
 * ============================================
 * 处理案例分类筛选
 */
function initFilter() {
    // 此函数已被动态加载分类功能替代
    // 保留原函数以保持兼容性
}

/**
 * ============================================
 * 案例卡片交互
 * ============================================
 * 处理案例卡片的入场动画和点击事件
 */
function initCaseCards() {
    const caseCards = document.querySelectorAll('.case-card');
    const viewButtons = document.querySelectorAll('.case-view-btn');
    
    if (caseCards.length === 0) return;
    
    // 创建Intersection Observer用于入场动画
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // 添加延迟，使卡片依次出现
                setTimeout(function() {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 设置初始样式并观察卡片
    caseCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 查看项目按钮点击事件
    viewButtons.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // 获取案例标题
            const caseCard = this.closest('.case-card');
            const caseTitle = caseCard.querySelector('.case-title').textContent;
            
            // 显示提示
            showNotification('正在加载 ' + caseTitle + ' 的详细信息...');
        });
    });
}

/**
 * ============================================
 * 统计数据动画
 * ============================================
 * 数字从0滚动到目标值的动画效果
 */
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // 提取数字和单位
                const match = text.match(/(\d+)(.*)/);
                if (match) {
                    const targetNumber = parseInt(match[1], 10);
                    const suffix = match[2];
                    
                    // 执行数字滚动动画
                    animateNumber(element, 0, targetNumber, 1500, suffix);
                }
                
                // 动画完成后取消观察
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // 观察所有统计数字元素
    statNumbers.forEach(function(stat) {
        observer.observe(stat);
    });
}

/**
 * 数字滚动动画函数
 * @param {Element} element - 目标元素
 * @param {number} start - 起始值
 * @param {number} end - 目标值
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {string} suffix - 数字后缀（如"+"、"年"等）
 */
function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数使动画更自然
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * ============================================
 * 通知提示功能
 * ============================================
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 移除已有的通知
    const existingNotification = document.querySelector('.cases-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'cases-notification';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background-color: var(--text-dark);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    requestAnimationFrame(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // 自动隐藏
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 2000);
}