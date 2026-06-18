// ======================================================
// MODAL DÙNG CHUNG (thay cho prompt) — Thêm / Sửa
// openFormModal(title, fields, onSubmit)
//   fields: [{ name, label, type:'text'|'number'|'select',
//              options:[...], value }]
//   onSubmit(data): trả về false để giữ modal mở (lỗi nhập)
// ======================================================

function openFormModal(title, fields, onSubmit) {

    const container = document.getElementById("modalContainer");
    if (!container) return;

    const fieldsHtml = fields.map(f => {

        if (f.type === "select") {

            const opts = f.options.map(o =>
                `<option value="${o}" ${o === f.value ? "selected" : ""}>${o}</option>`
            ).join("");

            return `
                <label class="modal-field">
                    <span>${f.label}</span>
                    <select data-name="${f.name}">${opts}</select>
                </label>`;
        }

        return `
            <label class="modal-field">
                <span>${f.label}</span>
                <input
                    type="${f.type || "text"}"
                    data-name="${f.name}"
                    value="${f.value !== undefined ? f.value : ""}">
            </label>`;

    }).join("");

    container.innerHTML = `
        <div class="modal-overlay" onclick="if(event.target===this) closeModal()">
            <div class="modal">

                <div class="modal-header">
                    <h3>${title}</h3>
                    <button type="button" class="modal-close" onclick="closeModal()">×</button>
                </div>

                <form id="modalForm" class="modal-body">
                    ${fieldsHtml}
                    <div class="modal-actions">
                        <button type="button" class="btn-cancel" onclick="closeModal()">Hủy</button>
                        <button type="submit" class="btn-save">Lưu</button>
                    </div>
                </form>

            </div>
        </div>`;

    const form = document.getElementById("modalForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {};
        form.querySelectorAll("[data-name]").forEach(el => {
            data[el.dataset.name] = el.value.trim();
        });

        const result = onSubmit(data);
        if (result !== false) closeModal();
    });

    const first = form.querySelector("input, select");
    if (first) first.focus();
}

function closeModal() {
    const container = document.getElementById("modalContainer");
    if (container) container.innerHTML = "";
}

// Đóng modal bằng phím ESC
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});
