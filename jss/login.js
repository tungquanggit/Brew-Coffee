const adminUser = {
    username: "admin",
    password: "123456"
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("loginError");

    // Tài khoản mẫu
    const adminUser = "tuanadmin";
    const adminPass = "123456";

    if (username === adminUser && password === adminPass) {
        localStorage.setItem("loggedIn","true");
        // Đăng nhập thành công
        window.location.href = "quanly.html";
    } else {
        // Sai tài khoản hoặc mật khẩu
        error.textContent = "❌ Tài khoản hoặc mật khẩu sai!";
        error.style.color = "red";
    }
}
function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    location.reload();
}

window.onload = function(){

    if(
        localStorage.getItem("loggedIn")
        === "true"
    ){

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("mainApp")
            .classList.remove("hidden");

        loadDashboard();
    }
};