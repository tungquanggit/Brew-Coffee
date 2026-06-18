const menuItems = [
    { id: 1, name: "Cà phê sữa", category: "Cà phê", price: 30000 },
    { id: 2, name: "Trà đào", category: "Trà", price: 35000 },
    { id: 3, name: "Sinh tố xoài", category: "Sinh tố", price: 45000 },
    { id: 4, name: "Nước ép cam", category: "Nước ép", price: 40000 },
    { id: 5, name: "Bánh tiramisu", category: "Bánh", price: 50000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let revenue =
    parseInt(localStorage.getItem("revenue")) || 0;

let totalOrders =
    parseInt(localStorage.getItem("totalOrders")) || 0;

// Hiển thị menu
function renderMenu() {
    const menu = document.getElementById("menu");

    menu.innerHTML = menuItems.map(item => `
        <div class="card">
            <h3>${item.name}</h3>
            <p>${item.price.toLocaleString()} VNĐ</p>
            <button onclick="addToCart(${item.id})">
                Thêm vào giỏ
            </button>
        </div>
    `).join("");
}

// Thêm sản phẩm
function addToCart(id) {
    const product = menuItems.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

// Tăng số lượng
function increaseQty(id) {
    const item = cart.find(i => i.id === id);
    item.quantity++;

    saveCart();
    renderCart();
}

// Giảm số lượng
function decreaseQty(id) {
    const item = cart.find(i => i.id === id);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    renderCart();
}

// Xóa sản phẩm
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);

    saveCart();
    renderCart();
}

// Xóa toàn bộ
function clearCart() {
    cart = [];

    saveCart();
    renderCart();
}
// Thanh toán
function checkout() {

    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const serviceFee = subtotal * 0.05;
    const total = subtotal + serviceFee;

    // Cập nhật doanh thu
    revenue += total;
    totalOrders++;

    localStorage.setItem(
        "revenue",
        revenue
    );

    localStorage.setItem(
        "totalOrders",
        totalOrders
    );

    alert(
        `Thanh toán thành công!\nTổng tiền: ${total.toLocaleString()} VNĐ`
    );

    // Xóa giỏ hàng sau thanh toán
    cart = [];

    saveCart();
    renderCart();
    updateDashboard();
}
// Lưu localStorage
function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

// Hiển thị giỏ hàng
function renderCart() {

    const cartDiv =
        document.getElementById("cart");

    let subtotal = 0;

    cartDiv.innerHTML = cart.map(item => {

        const total =
            item.price * item.quantity;

        subtotal += total;

        return `
            <div class="cart-item">
                <b>${item.name}</b>

                <p>
                    ${item.price.toLocaleString()}
                    VNĐ
                </p>

                <div>
                    <button onclick="decreaseQty(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${item.id})">+</button>

                    <button onclick="removeItem(${item.id})">
                        ❌
                    </button>
                </div>

                <p>
                    ${total.toLocaleString()} VNĐ
                </p>
            </div>
        `;
    }).join("");

    const serviceFee = subtotal * 0.05;
    const total = subtotal + serviceFee;

    document.getElementById("subtotal").innerText =
        subtotal.toLocaleString();

    document.getElementById("serviceFee").innerText =
        serviceFee.toLocaleString();

    document.getElementById("total").innerText =
        total.toLocaleString();
}
// Dashboard
function updateDashboard() {

    const revenue =
        parseInt(localStorage.getItem("revenue")) || 0;

    const orders =
        parseInt(localStorage.getItem("totalOrders")) || 0;

    const revenueEl =
        document.getElementById("revenueValue");

    const orderEl =
        document.getElementById("orderCount");

    if (revenueEl) {
        revenueEl.innerText =
            revenue.toLocaleString() + " VNĐ";
    }

    if (orderEl) {
        orderEl.innerText = orders;
    }
}
renderMenu();
renderCart();
updateDashboard();