// =======================
// LOGIN ADMIN
// =======================

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

let products = [];

function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (
        username === ADMIN_USER &&
        password === ADMIN_PASS
    ) {

        document.getElementById("loginPage")
            .style.display = "none";

        document.getElementById("dashboard")
            .style.display = "block";

    } else {

        alert("Username atau Password salah!");
    }
}

// =======================
// LOGOUT
// =======================

function logout() {

    location.reload();
}

// =======================
// DARK MODE
// =======================

function toggleDarkMode() {

    document.body.classList.toggle("dark");
}

// =======================
// FORMAT RUPIAH
// =======================

function rupiah(angka) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(angka);
}

// =======================
// TAMBAH PRODUK
// =======================

function addProduct() {

    const name =
        document.getElementById("productName").value;

    const price =
        document.getElementById("productPrice").value;

    const imageFile =
        document.getElementById("productImage")
        .files[0];

    if (
        name === "" ||
        price === ""
    ) {

        alert("Lengkapi data produk!");

        return;
    }

    let imageUrl =
        "https://via.placeholder.com/300x200?text=Produk";

    if (imageFile) {

        imageUrl =
            URL.createObjectURL(imageFile);
    }

    const product = {

        id: Date.now(),

        name: name,

        price: Number(price),

        image: imageUrl
    };

    products.push(product);

    document.getElementById("productName").value = "";

    document.getElementById("productPrice").value = "";

    document.getElementById("productImage").value = "";

    renderProducts();
}

// =======================
// TAMPILKAN PRODUK
// =======================

function renderProducts() {

    const grid =
        document.getElementById("productGrid");

    const table =
        document.getElementById("productTable");

    const totalHarga =
        document.getElementById("totalHarga");

    const jumlahProduk =
        document.getElementById("jumlahProduk");

    const totalPenjualan =
        document.getElementById("totalPenjualan");

    const jumlahTransaksi =
        document.getElementById("jumlahTransaksi");

    grid.innerHTML = "";

    table.innerHTML = "";

    let total = 0;

    products.forEach((product, index) => {

        total += product.price;

        // CARD PRODUK

        grid.innerHTML += `
        <div class="product-card">

            <img src="${product.image}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${rupiah(product.price)}</p>

            </div>

        </div>
        `;

        // TABLE

        table.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>
                <img
                    src="${product.image}"
                    width="60"
                >
            </td>

            <td>${product.name}</td>

            <td>${rupiah(product.price)}</td>

            <td>

                <button
                    onclick="deleteProduct(${product.id})"
                >
                    Hapus
                </button>

            </td>

        </tr>
        `;
    });

    totalHarga.innerHTML =
        rupiah(total);

    jumlahProduk.innerHTML =
        products.length;

    totalPenjualan.innerHTML =
        rupiah(total);

    jumlahTransaksi.innerHTML =
        products.length;
}

// =======================
// HAPUS PRODUK
// =======================

function deleteProduct(id) {

    products =
        products.filter(
            product => product.id !== id
        );

    renderProducts();
}

// =======================
// HAPUS SEMUA
// =======================

function clearAll() {

    if (
        confirm(
            "Hapus semua produk?"
        )
    ) {

        products = [];

        renderProducts();
    }
}

// =======================
// CETAK STRUK
// =======================

function printStruk() {

    let isi = `
    <h1>GALIH KASIR PRO</h1>
    <hr>
    `;

    let total = 0;

    products.forEach(product => {

        isi += `
        <p>
        ${product.name}
        -
        ${rupiah(product.price)}
        </p>
        `;

        total += product.price;
    });

    isi += `
    <hr>
    <h2>
    Total :
    ${rupiah(total)}
    </h2>
    `;

    const win =
        window.open(
            "",
            "",
            "width=600,height=600"
        );

    win.document.write(isi);

    win.print();
}

// =======================
// LOAD AWAL
// =======================

renderProducts();
require('dotenv').config();

