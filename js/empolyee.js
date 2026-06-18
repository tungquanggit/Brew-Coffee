let employees =
JSON.parse(
    localStorage.getItem("employees")
) || [

    {
        id:1,
        name:"Nguyễn Văn A",
        role:"Barista"
    },

    {
        id:2,
        name:"Trần Thị B",
        role:"Thu ngân"
    }

];

function saveEmployees(){

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    renderEmployees();
}

function renderEmployees(){

    const table =
    document.getElementById(
        "employeeTable"
    );

    if(!table) return;

    table.innerHTML="";

    employees.forEach(emp=>{

        table.innerHTML += `
        <tr>

            <td>${emp.name}</td>

            <td>${emp.role}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editEmployee(${emp.id})">

                    Sửa

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${emp.id})">

                    Xóa

                </button>

            </td>

        </tr>
        `;
    });
}

function openEmployeeModal(){

    openFormModal("➕ Thêm nhân viên", [
        { name:"name", label:"Họ tên",  type:"text" },
        { name:"role", label:"Chức vụ", type:"text" }
    ], function(d){

        if(!d.name){
            alert("Vui lòng nhập họ tên!");
            return false;
        }

        employees.push({
            id:Date.now(),
            name:d.name,
            role:d.role || "Nhân viên"
        });

        saveEmployees();
    });
}

function editEmployee(id){

    const emp =
    employees.find(
        e=>e.id===id
    );

    if(!emp) return;

    openFormModal("✏️ Sửa nhân viên", [
        { name:"name", label:"Họ tên",  type:"text", value:emp.name },
        { name:"role", label:"Chức vụ", type:"text", value:emp.role }
    ], function(d){

        if(!d.name){
            alert("Vui lòng nhập họ tên!");
            return false;
        }

        emp.name=d.name;
        emp.role=d.role || emp.role;

        saveEmployees();
    });
}

function deleteEmployee(id){

    if(
        confirm(
            "Xóa nhân viên?"
        )
    ){

        employees =
        employees.filter(
            e=>e.id!==id
        );

        saveEmployees();
    }
}

renderEmployees();