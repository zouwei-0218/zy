
// =========================
// 发送邮件
// =========================
function send_email() {
    const form = document.getElementById("contactForm");

    let isValid = true;
    form.querySelectorAll(".form-group").forEach(group => {
        const input = group.querySelector("input, textarea");
        const error = group.querySelector(".error-message");

        // 判断是否为空
        if (input.hasAttribute("required") && input.value.trim() === "") {
            error.textContent = "This field is required.";
            error.style.display = "block";
            isValid = false;
        } else {
            error.textContent = "";
            error.style.display = "none";
        }
    });
    if (isValid) {
        const templateParams = {
            user_name: form.user_name.value,
            user_email: form.user_email.value,
            user_country: form.user_country.value,
            user_phone: form.user_phone.value,
            message: form.message.value,
        };
        emailjs.init("zovN2ceDxO5PBgCrk"); // 替换为你在 EmailJS 创建的公钥
        emailjs.send("service_gq4unos", "template_saszc21", templateParams)    
        .then(function(response) {        
            alert("Email sent success!");
            form.reset(); // 清空表单
        }, function(error) {
            alert("Failed to send email: " + JSON.stringify(error));
        });
    }
};
