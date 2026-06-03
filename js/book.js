/**
 * ============================================
 * Foshan Fly Equipment - 预约参观页特有JavaScript
 * ============================================
 * 说明：此文件包含预约参观页特有的交互功能
 * 依赖：需要先引入 common.js
 * ============================================
 */

/**
 * ============================================
 * DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化预约页面特有功能
    initCalendar();
    initTimeSelection();
    initFormValidation();
});

/**
 * ============================================
 * 日历功能
 * ============================================
 * 处理日历的渲染、月份切换和日期选择
 */
function initCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const calendarTitle = document.getElementById('calendarTitle');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const selectedDateInput = document.getElementById('selectedDate');
    
    if (!calendarGrid || !calendarTitle) return;
    
    // 当前显示的月份
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // 默认选中10号（根据参考图）
    let selectedDay = 10;
    
    // 月份名称
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    /**
     * 渲染日历
     */
    function renderCalendar() {
        // 清空日历（保留星期标题）
        const dayHeaders = calendarGrid.querySelectorAll('.calendar-day-header');
        calendarGrid.innerHTML = '';
        dayHeaders.forEach(function(header) {
            calendarGrid.appendChild(header);
        });
        
        // 更新标题
        calendarTitle.textContent = monthNames[currentMonth] + ' ' + currentYear;
        
        // 获取当月第一天和最后一天
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // 获取今天的日期
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
        
        // 添加空白日期（上月）
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day disabled';
            calendarGrid.appendChild(emptyDay);
        }
        
        // 添加日期
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // 检查是否是今天
            if (isCurrentMonth && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // 检查是否是选中的日期（默认10号）
            if (day === selectedDay) {
                dayElement.classList.add('selected');
                updateSelectedDate(day);
            }
            
            // 禁用过去的日期
            const thisDate = new Date(currentYear, currentMonth, day);
            if (thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dayElement.classList.add('disabled');
            } else {
                // 添加点击事件
                dayElement.addEventListener('click', function() {
                    // 移除之前的选中状态
                    document.querySelectorAll('.calendar-day.selected').forEach(function(el) {
                        el.classList.remove('selected');
                    });
                    
                    // 添加选中状态
                    this.classList.add('selected');
                    selectedDay = day;
                    updateSelectedDate(day);
                });
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    /**
     * 更新选中的日期输入框
     */
    function updateSelectedDate(day) {
        const formattedDate = currentYear + '-' + 
                             String(currentMonth + 1).padStart(2, '0') + '-' + 
                             String(day).padStart(2, '0');
        selectedDateInput.value = formattedDate;
    }
    
    // 上个月按钮
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }
    
    // 下个月按钮
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    // 初始渲染
    renderCalendar();
}

/**
 * ============================================
 * 时间选择功能
 * ============================================
 */
function initTimeSelection() {
    const timeOptions = document.querySelectorAll('.time-option');
    const selectedTimeInput = document.getElementById('selectedTime');
    
    if (timeOptions.length === 0) return;
    
    timeOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            // 移除所有选中状态
            timeOptions.forEach(function(opt) {
                opt.classList.remove('selected');
            });
            
            // 添加选中状态
            this.classList.add('selected');
            
            // 更新隐藏字段
            if (selectedTimeInput) {
                selectedTimeInput.value = this.dataset.time;
            }
        });
    });
}

/**
 * ============================================
 * 表单验证和提交
 * ============================================
 */
function initFormValidation() {
    const form = document.getElementById('bookingForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // 获取表单数据
        let formData = new FormData(form);
        let data = Object.fromEntries(formData.entries());
        
        // 验证必填字段
        let isValid = true;
        const requiredFields = [ 'user_name', 'user_phone', 'user_email', 'user_people', 'user_day', 'user_time', 'user_message'];
        
        requiredFields.forEach(function(field) {
            if (!data[field] || data[field].trim() === '') {
                isValid = false;
                const input = form.querySelector('[name="' + field + '"]');
                if (input) {
                    input.style.borderColor = '#dc2626';
                    setTimeout(function() {
                        input.style.borderColor = '';
                    }, 3000);
                }
            }
        });
        
        // 验证邮箱格式
        if (data.user_email && !FoshanFlyUtils.FormValidator.isEmail(data.user_email)) {
            isValid = false;
            const emailInput = document.getElementById('user_email');   
            if (emailInput) {
                emailInput.style.borderColor = '#dc2626';
                setTimeout(function() {
                    emailInput.style.borderColor = '';
                }, 3000);
            }
        }
        
        if (!isValid) {
            showNotification('请填写所有必填字段');
            return;
        }
        data.user_from = "中亿家具";

        // 模拟提交
        // 1. 初始化 Public Key
        emailjs.init("zovN2ceDxO5PBgCrk"); 

        
        // 2. 调用 send 方法发送邮件
        emailjs.send(
            'service_gq4unos', 
            'template_efmvjfu', 
            data
        )
        .then(function(response) {
            // console.log('邮件发送成功！', response.status, response.text);
            form.reset();
            alert('感谢您的留言，我们将尽快回复！');
        }, function(error) {
            // console.error('邮件发送失败：', error);
            alert('发送失败，请稍后重试或检查网络。');
        });
        
        // 模拟API调用
        setTimeout(function() {
            // showNotification('预约请求已提交！我们将通过邮件确认。');
            form.reset();
            
        }, 1500);
    });
    
    // 输入时移除错误样式
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
}

/**
 * ============================================
 * 通知提示功能
 * ============================================
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 移除已有的通知
    const existingNotification = document.querySelector('.booking-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'booking-notification';
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
    }, 3000);
}