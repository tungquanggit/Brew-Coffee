// ======================================================
// NGUỒN DỮ LIỆU CHUNG (trang chủ + trang quản lý)
// Cả index.html và quanly.html cùng đọc/ghi vào đây
// nên thêm/sửa món hay bàn ở quản lý sẽ hiện ngay
// ngoài trang chủ và ngược lại.
// ======================================================

// --- THỰC ĐƠN MẶC ĐỊNH ---
const DEFAULT_MENU = [
    { id: 1,  name: "Cà phê đen",     price: 25000, category: "Cà phê" },
    { id: 2,  name: "Cà phê sữa",     price: 30000, category: "Cà phê" },
    { id: 3,  name: "Bạc xỉu",        price: 35000, category: "Cà phê" },

    { id: 4,  name: "Trà đào",        price: 35000, category: "Trà" },
    { id: 5,  name: "Trà vải",        price: 35000, category: "Trà" },
    { id: 6,  name: "Trà chanh",      price: 25000, category: "Trà" },

    { id: 7,  name: "Sinh tố xoài",   price: 45000, category: "Sinh tố" },
    { id: 8,  name: "Sinh tố bơ",     price: 50000, category: "Sinh tố" },
    { id: 9,  name: "Sinh tố dâu",    price: 48000, category: "Sinh tố" },

    { id: 10, name: "Nước ép cam",    price: 40000, category: "Nước ép" },
    { id: 11, name: "Nước ép táo",    price: 42000, category: "Nước ép" },
    { id: 12, name: "Nước ép dứa",    price: 38000, category: "Nước ép" },

    { id: 13, name: "Bánh tiramisu",  price: 45000, category: "Bánh" },
    { id: 14, name: "Bánh mousse",    price: 40000, category: "Bánh" },
    { id: 15, name: "Bánh croissant", price: 35000, category: "Bánh" }
];

// --- BÀN MẶC ĐỊNH ---
const DEFAULT_TABLES = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    status: "Trống",
    customer: "",
    phone: "",
    bookingTime: ""
}));

// Lấy danh sách món (tự seed/migrate nếu thiếu hoặc dữ liệu cũ chưa có "category")
function getMenuList() {
    let list = JSON.parse(localStorage.getItem("menuList"));

    const invalid =
        !Array.isArray(list) ||
        list.length === 0 ||
        list[0].category === undefined;

    if (invalid) {
        list = DEFAULT_MENU;
        localStorage.setItem("menuList", JSON.stringify(list));
    }

    return list;
}

// Lấy danh sách bàn (tự seed nếu chưa có)
function getTables() {
    let list = JSON.parse(localStorage.getItem("tables"));

    if (!Array.isArray(list) || list.length === 0) {
        list = DEFAULT_TABLES;
        localStorage.setItem("tables", JSON.stringify(list));
    }

    return list;
}
