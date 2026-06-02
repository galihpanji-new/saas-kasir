const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let products = [];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.json({
        message: 'Produk berhasil ditambahkan'
    });
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products.splice(id, 1);
    res.json({
        message: 'Produk berhasil dihapus'
    });
});

// ✅ Tetap bisa jalan di lokal
if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server berjalan di http://localhost:3000');
    });
}

// ✅ Wajib untuk Vercel
module.exports = app;