// ======================
// DASHBOARD
// ======================

function loadDashboard() {

    refreshData();

    updateRevenue();
    updateTodayRevenue();

    updateOrderCount();
    updateTableCount();
    updateEmployeeCount();

    renderRecentOrders();
}

// ======================
// Load dữ liệu
// ======================

function refreshData() {

    orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    tables =
        JSON.parse(
            localStorage.getItem("tables")
        ) || [];

    employees =
        JSON.parse(
            localStorage.getItem("employees")
        ) || [];
}

// ======================
// Tổng doanh thu
// ======================

function updateRevenue() {

    const revenue = orders.reduce(
        (sum, order) =>
            sum + Number(order.total || 0),
        0
    );

    document.getElementById(
        "revenueValue"
    ).textContent =
        revenue.toLocaleString("vi-VN") + " ₫";
}
// ======================
// Doanh thu hôm nay
// ======================

function updateTodayRevenue() {

    const element =
        document.getElementById(
            "todayRevenue"
        );

    if (!element) return;

    const today =
        new Date().toLocaleDateString(
            "vi-VN"
        );

    const revenueToday = orders.reduce(

        (sum, order) => {

            const orderDate =
                new Date(order.date)
                .toLocaleDateString(
                    "vi-VN"
                );

            return orderDate === today
                ? sum + Number(order.total || 0)
                : sum;
        },

        0
    );

    element.textContent =
        revenueToday.toLocaleString("vi-VN")
        + " ₫";
}

// ======================
// Số đơn hàng
// ======================

function updateOrderCount() {

    const element =
        document.getElementById(
            "orderCount"
        );

    if (element) {

        element.textContent =
            orders.length;
    }
}

// ======================
// Số bàn
// ======================

function updateTableCount() {

    const element =
        document.getElementById(
            "tableCount"
        );

    if (element) {

        element.textContent =
            tables.length;
    }
}

// ======================
// Số nhân viên
// ======================

function updateEmployeeCount() {

    const element =
        document.getElementById(
            "employeeCount"
        );

    if (element) {

        element.textContent =
            employees.length;
    }
}

// ======================
// Lịch sử đơn hàng
// ======================

function renderRecentOrders() {

    const container =
        document.getElementById(
            "orderHistory"
        );

    if (!container) return;

    const recentOrders =
        [...orders]
        .reverse()
        .slice(0, 10);

    if (recentOrders.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="3">
                    Chưa có đơn hàng
                </td>
            </tr>
        `;

        return;
    }

    container.innerHTML =
        recentOrders.map(order => `

            <tr>

                <td>
                    ${order.id}
                </td>

                <td>
                    ${order.date}
                </td>

                <td>
                    ${Number(order.total || 0)
                        .toLocaleString("vi-VN")}
                    ₫
                </td>

            </tr>

        `).join("");
}

// ======================
// Reset thống kê
// ======================

function resetRevenue() {

    const confirmReset = confirm(
        "Bạn có chắc muốn xóa toàn bộ doanh thu và đơn hàng?"
    );

    if (!confirmReset) return;

    localStorage.removeItem("orders");

    orders = [];

    loadDashboard();

    alert(
        "Đã reset thành công!"
    );
}

// ======================
// Auto Refresh
// ======================

window.addEventListener(
    "load",
    loadDashboard
);

setInterval(
    loadDashboard,
    3000
);