let currentOrder = [];

let orders =
JSON.parse(
    localStorage.getItem("orders")
) || [];

function renderOrderMenu(){

    const container =
    document.getElementById(
        "menuOrderList"
    );

    if(!container) return;

    container.innerHTML="";

    menuList.forEach(item=>{

        container.innerHTML += `
        <div
            class="menu-order-item"
            onclick="addToOrder(${item.id})">

            <h3>${item.name}</h3>

            <p>
                ${item.price.toLocaleString("vi-VN")}
                ₫
            </p>

        </div>
        `;
    });
}

function addToOrder(id){

    const item =
    menuList.find(
        m=>m.id===id
    );

    currentOrder.push(item);

    renderCurrentOrder();
}

function renderCurrentOrder(){

    const container =
    document.getElementById(
        "currentOrder"
    );

    if(!container) return;

    if(currentOrder.length === 0){

        container.innerHTML = `
            <h3>Đơn hàng hiện tại</h3>
            <p>Chưa có sản phẩm</p>
        `;

        return;
    }

    let total = 0;

    let html = `
        <h3>Đơn hàng hiện tại</h3>
        <ul>
    `;

    currentOrder.forEach(item=>{

        total += item.price;

        html += `
            <li>
                ${item.name}
                -
                ${item.price.toLocaleString("vi-VN")} ₫
            </li>
        `;
    });

    html += `
        </ul>

        <h2>
            Tổng:
            ${total.toLocaleString("vi-VN")} ₫
        </h2>
    `;

    container.innerHTML = html;
}
function checkout() {

    if(currentOrder.length === 0){

        alert("Chưa có món nào trong đơn hàng!");
        return;
    }

    let total = 0;

    currentOrder.forEach(item => {
        total += item.price;
    });

    const order = {

        id: "HD" + Date.now(),

        date: new Date().toISOString(),

        total: total,

        items: [...currentOrder]
    };

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    alert(
        `Thanh toán thành công!\nTổng tiền: ${total.toLocaleString("vi-VN")} ₫`
    );

    currentOrder = [];

    renderCurrentOrder();

    if(typeof loadDashboard === "function"){
        loadDashboard();
    }
}
// dashboard handled in dashboard.js
