// Thực đơn lấy từ nguồn chung với trang quản lý (xem js/data.js)
// nên món thêm/sửa bên quản lý sẽ hiện ngay ngoài trang chủ.
let products = getMenuList();

let cart=[];

const menu=document.getElementById("menu");

// Icon minh họa theo loại món
const categoryIcons={
"Cà phê":"☕",
"Trà":"🍵",
"Sinh tố":"🥤",
"Nước ép":"🧃",
"Bánh":"🍰"
};

function renderMenu(list=products){

menu.innerHTML="";

list.forEach(product=>{

const div=document.createElement("div");

div.className="card";

const icon=categoryIcons[product.category]||"🍹";

div.innerHTML=`
<div class="item-icon">${icon}</div>
<h3>${product.name}</h3>
<span class="item-cat">${product.category}</span>
<p class="item-price">${product.price.toLocaleString()} VNĐ</p>

<button onclick="addToCart('${product.name}')">
🛒 Thêm
</button>
`;

menu.appendChild(div);

});
}

renderMenu();

function addToCart(name){

const item=products.find(p=>p.name===name);

const exist=cart.find(i=>i.name===name);

if(exist){
exist.qty++;
}
else{
cart.push({...item,qty:1});
}

renderCart();
}

function renderCart(){

const cartDiv=document.getElementById("cart");

cartDiv.innerHTML="";

let subtotal=0;

cart.forEach(item=>{

subtotal+=item.price*item.qty;

cartDiv.innerHTML+=`
<div class="cart-item">
${item.name}

<button class="qty-btn"
onclick="changeQty('${item.name}',-1)">-</button>

${item.qty}

<button class="qty-btn"
onclick="changeQty('${item.name}',1)">+</button>

= ${(item.price*item.qty).toLocaleString()} VNĐ
</div>
`;
});

const service=subtotal*0.05;
const total=subtotal+service;

document.getElementById("subtotal").innerText=
subtotal.toLocaleString();

document.getElementById("serviceFee").innerText=
service.toLocaleString();

document.getElementById("total").innerText=
total.toLocaleString();
}

function changeQty(name,value){

const item=cart.find(i=>i.name===name);

item.qty+=value;

if(item.qty<=0){
cart=cart.filter(i=>i.name!==name);
}

renderCart();
}

document.getElementById("search")
.addEventListener("input",filterProducts);

document.getElementById("categoryFilter")
.addEventListener("change",filterProducts);

function filterProducts(){

const keyword=
document.getElementById("search").value.toLowerCase();

const category=
document.getElementById("categoryFilter").value;

const filtered=products.filter(product=>{

const matchName=
product.name.toLowerCase().includes(keyword);

const matchCategory=
category==="all" ||
product.category===category;

return matchName && matchCategory;

});

renderMenu(filtered);
}
// ======================
// QUẢN LÝ BÀN
// ======================

// Dùng chung nguồn dữ liệu bàn với trang quản lý (xem js/data.js)
let tables = getTables();
// ======================
// ĐẶT BÀN
// ======================

const tableSelect =
document.getElementById("tableSelect");

function loadTableOptions(){

    tableSelect.innerHTML =
    '<option value="">Chọn bàn</option>';

    tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || tables;

    tables.forEach(table=>{

        tableSelect.innerHTML += `
        <option value="${table.id}">
            Bàn ${table.id}
            (${table.status})
        </option>
        `;
    });
}

loadTableOptions();

document
.getElementById("bookingForm")
.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const customerName =
    this.querySelector(
        'input[type="text"]'
    ).value.trim();

    const tableId =
    parseInt(
        tableSelect.value
    );

    const message =
    document.getElementById(
        "bookingMessage"
    );

    const table =
    tables.find(
        t => t.id === tableId
    );

    if(!table){

        message.innerHTML =
        "❌ Vui lòng chọn bàn";

        message.style.color =
        "red";

        return;
    }

    if(table.status==="Đang dùng"){

        message.innerHTML =
        "❌ Bàn đang sử dụng, vui lòng chọn bàn khác";

        message.style.color =
        "red";

        return;
    }

    table.status =
    "Đang dùng";

    table.customer =
    customerName;

    table.bookingTime =
    new Date()
    .toLocaleString();

    localStorage.setItem(
        "tables",
        JSON.stringify(tables)
    );

    message.innerHTML =
    `✅ Đặt Bàn ${table.id} thành công`;

    message.style.color =
    "green";

    this.reset();

    loadTableOptions();
});
/* THANH TOÁN */

document.getElementById("paymentMethod")
.addEventListener("change",function(){

const info=
document.getElementById("paymentInfo");

if(this.value==="MoMo"){
info.innerHTML=
"MoMo: 0867814474";
}
else if(this.value==="Chuyển khoản"){
info.innerHTML=
`
Ngân hàng ABC<br>
STK: 123456789
`;
}
else{
info.innerHTML="";
}
});
function checkout(){

    if(cart.length===0){

        alert(
            "Giỏ hàng đang trống!"
        );

        return;
    }

    // Tính tổng tiền (tạm tính + phí dịch vụ 5%)
    let subtotal = 0;

    cart.forEach(item=>{
        subtotal += item.price * item.qty;
    });

    const total = subtotal + subtotal * 0.05;

    // Tạo đơn hàng và LƯU vào localStorage "orders"
    // để báo doanh thu + lịch sử về dashboard quản lý
    const order = {
        id: "HD" + Date.now(),
        date: new Date().toISOString(),
        total: total,
        items: cart.map(i => ({
            name: i.name,
            price: i.price,
            qty: i.qty
        }))
    };

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    document.getElementById(
        "orderResult"
    ).innerHTML =

    `✅ Thanh toán thành công
    <br>Mã đơn: <b>${order.id}</b>
    <br>Tổng tiền: <b>${total.toLocaleString("vi-VN")} VNĐ</b>`;

    cart=[];

    renderCart();

    localStorage.removeItem(
        "cart"
    );
}

/* KHIẾU NẠI */

document.getElementById("complaintForm")
.addEventListener("submit",function(e){

e.preventDefault();

document.getElementById("complaintMessage")
.innerHTML=
"📩 Khiếu nại đã được ghi nhận. Chúng tôi sẽ phản hồi trong 24h.";
});

/* ĐÁNH GIÁ */

const reviewForm = document.getElementById("reviewForm");

if(reviewForm){

reviewForm.addEventListener("submit",function(e){

e.preventDefault();

const rating=
document.getElementById("rating").value;

const text=
document.getElementById("reviewText").value;

document.getElementById("reviews")
.innerHTML+=`
<div class="card">
<h4>${"⭐".repeat(rating)}</h4>
<p>${text}</p>
</div>
`;

this.reset();
});

}

/* ĐỒNG BỘ VỚI TRANG QUẢN LÝ */
// Khi quản lý thêm/sửa món hoặc bàn (tab khác), hoặc khi
// quay lại tab này, nạp lại dữ liệu chung và vẽ lại.
function syncFromStorage(){
    products = getMenuList();
    renderMenu();
    loadTableOptions();
}

window.addEventListener("storage", syncFromStorage);
window.addEventListener("focus", syncFromStorage);
