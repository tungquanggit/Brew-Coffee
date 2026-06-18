// Dùng chung nguồn dữ liệu với trang chủ (xem js/data.js)
let menuList = getMenuList();

const MENU_CATEGORIES =
    ["Cà phê", "Trà", "Sinh tố", "Nước ép", "Bánh"];

function saveMenu(){

    localStorage.setItem(
        "menuList",
        JSON.stringify(menuList)
    );

    renderMenu();
}

function renderMenu(){

    const table =
    document.getElementById("menuTable");

    if(!table) return;

    table.innerHTML="";

    menuList.forEach(item=>{

        table.innerHTML += `
        <tr>

            <td>${item.name}</td>

            <td>
                <span class="cat-tag">${item.category || "Khác"}</span>
            </td>

            <td>
                ${item.price.toLocaleString("vi-VN")} ₫
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editMenu(${item.id})">

                    Sửa

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMenu(${item.id})">

                    Xóa

                </button>

            </td>

        </tr>
        `;
    });

    renderOrderMenu();
}

function openMenuModal(){

    openFormModal("➕ Thêm món", [
        { name:"name",     label:"Tên món",      type:"text" },
        { name:"price",    label:"Giá bán (₫)",  type:"number" },
        { name:"category", label:"Loại",         type:"select", options:MENU_CATEGORIES, value:"Cà phê" }
    ], function(d){

        if(!d.name || !d.price){
            alert("Vui lòng nhập tên và giá!");
            return false;
        }

        menuList.push({
            id:Date.now(),
            name:d.name,
            price:Number(d.price),
            category:d.category
        });

        saveMenu();
    });
}

function editMenu(id){

    const item =
    menuList.find(
        m=>m.id===id
    );

    if(!item) return;

    openFormModal("✏️ Sửa món", [
        { name:"name",     label:"Tên món",      type:"text",   value:item.name },
        { name:"price",    label:"Giá bán (₫)",  type:"number", value:item.price },
        { name:"category", label:"Loại",         type:"select", options:MENU_CATEGORIES, value:item.category }
    ], function(d){

        if(!d.name || !d.price){
            alert("Vui lòng nhập tên và giá!");
            return false;
        }

        item.name=d.name;
        item.price=Number(d.price);
        item.category=d.category;

        saveMenu();
    });
}

function deleteMenu(id){

    if(
        confirm(
            "Xóa món này?"
        )
    ){

        menuList =
        menuList.filter(
            m=>m.id!==id
        );

        saveMenu();
    }
}

function searchMenu(){

    const keyword =
    document
        .getElementById("menuSearch")
        .value
        .toLowerCase();

    const rows =
    document.querySelectorAll(
        "#menuTable tr"
    );

    rows.forEach(row=>{

        row.style.display =
        row.innerText
            .toLowerCase()
            .includes(keyword)

        ? ""

        : "none";
    });
}

renderMenu();