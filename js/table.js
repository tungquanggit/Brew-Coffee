// ======================
// DỮ LIỆU BÀN
// ======================


// Dùng chung nguồn dữ liệu bàn với trang chủ (xem js/data.js)
let tables = getTables();

// ======================
// LOAD DANH SÁCH BÀN
// ======================

function loadTables() {

    const tableSelect =
    document.getElementById("tableSelect");

    if (!tableSelect) return;

    const tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || [];

    tableSelect.innerHTML =
    '<option value="">Chọn bàn</option>';

    tables.forEach(table => {

        tableSelect.innerHTML += `
        <option value="${table.id}">
            Bàn ${table.id}
            (${table.status})
        </option>
        `;
    });
}

loadTables();

const bookingForm=document.getElementById("bookingForm");
if(bookingForm) bookingForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    let tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || [];

    const customerName =
    document.getElementById(
        "customerName"
    ).value.trim();

    const phone =
    document.getElementById(
        "customerPhone"
    ).value.trim();

    const bookingTime =
    document.getElementById(
        "bookingTime"
    ).value;

    const tableId =
    parseInt(
        document.getElementById(
            "tableSelect"
        ).value
    );

    const table =
    tables.find(
        t => t.id === tableId
    );

    const message =
    document.getElementById(
        "bookingMessage"
    );

    if(!table){

        message.innerHTML =
        "❌ Vui lòng chọn bàn";

        return;
    }

    if(table.status === "Đang dùng"){

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

    table.phone =
    phone;

    table.bookingTime =
    bookingTime;

    localStorage.setItem(
        "tables",
        JSON.stringify(tables)
    );

    message.innerHTML =
    `✅ Đặt Bàn ${table.id} thành công`;

    message.style.color =
    "green";

    this.reset();

    loadTables();
});
// ======================
// LƯU DỮ LIỆU
// ======================

function saveTables(){

    localStorage.setItem(
        "tables",
        JSON.stringify(tables)
    );

    renderTables();
    renderStats();
}

// ======================
// HIỂN THỊ THỐNG KÊ
// ======================

function renderStats() {

    const stats =
    document.getElementById("tableStats");

    if (!stats) return;

    const available =
    tables.filter(
        table => table.status === "Trống"
    ).length;

    const busy =
    tables.filter(
        table => table.status === "Đang dùng"
    ).length;

    stats.innerHTML = `
        🟢 Bàn trống: <b>${available}</b>
        |
        🔴 Đang sử dụng: <b>${busy}</b>
    `;
}

// ======================
// HIỂN THỊ DANH SÁCH BÀN
// ======================

function renderTables() {

    const grid =
    document.getElementById("tableGrid");

    if (!grid) return;

    grid.innerHTML = "";

    tables.forEach(table => {

        const statusClass =
        table.status === "Trống"
        ? "available"
        : "busy";

        grid.innerHTML += `
        <div class="table-card ${statusClass}">

            <h3>🪑 Bàn ${table.id}</h3>

            <p>
                <strong>Trạng thái:</strong>
                ${table.status}
            </p>

            ${
                table.customer
                ?
                `
                <p>
                    <strong>👤 Khách:</strong>
                    ${table.customer}
                </p>

                <p>
                    <strong>📞 SĐT:</strong>
                    ${table.phone}
                </p>

                <p>
                    <strong>⏰ Đặt lúc:</strong>
                    ${table.bookingTime}
                </p>
                `
                :
                `
                <p>
                    <strong>👤 Khách:</strong>
                    Chưa có
                </p>
                `
            }

            <button
                onclick="toggleTable(${table.id})">

                ${
                    table.status === "Trống"
                    ? "📅 Đặt bàn"
                    : "✅ Trả bàn"
                }

            </button>

        </div>
        `;
    });
}

// ======================
// THÊM BÀN
// ======================

function addTable() {

    const newId =
    tables.length > 0
    ? Math.max(...tables.map(t => t.id)) + 1
    : 1;

    tables.push({

        id: newId,
        status: "Trống",
        customer: "",
        phone: "",
        bookingTime: ""

    });

    saveTables();

    alert(
        `✅ Đã thêm Bàn ${newId}`
    );
}

// ======================
// ĐẶT/TRẢ BÀN
// ======================

function toggleTable(id) {

    const table =
    tables.find(
        t => t.id === id
    );

    if (!table) return;

    // ĐẶT BÀN — mở modal nhập thông tin khách
    if (table.status === "Trống") {

        openFormModal("📅 Đặt Bàn " + table.id, [
            { name:"customer", label:"Tên khách",        type:"text" },
            { name:"phone",    label:"Số điện thoại",    type:"text" }
        ], function(d){

            if(!d.customer){
                alert("Vui lòng nhập tên khách!");
                return false;
            }

            table.status = "Đang dùng";
            table.customer = d.customer;
            table.phone = d.phone || "";
            table.bookingTime = new Date().toLocaleString("vi-VN");

            saveTables();
        });

    }

    // TRẢ BÀN
    else {

        const confirmCheckout =
        confirm(
            `Xác nhận trả Bàn ${table.id}?`
        );

        if (!confirmCheckout)
        return;

        table.status = "Trống";
        table.customer = "";
        table.phone = "";
        table.bookingTime = "";

        saveTables();
    }
}

// ======================
// ĐẾM BÀN TRỐNG
// ======================

function countAvailableTables() {

    return tables.filter(
        table =>
        table.status === "Trống"
    ).length;
}

// ======================
// ĐỒNG BỘ DỮ LIỆU
// ======================

window.addEventListener("storage", () => {

    tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || [];

    renderTables();
    renderStats();
});