const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const filePath = path.join(__dirname, 'orders.json');

function readOrders() {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return content ? JSON.parse(content) : [];
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.get('/api/admin/orders', (req, res) => {
    try { res.json(readOrders()); } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/bookings', (req, res) => {
    try {
        const orderData = req.body;
        let orders = readOrders();
        orders.push({
            ...orderData,
            orderId: "UKM-" + Date.now(),
            loggedAt: new Date().toLocaleString("en-IN")
        });
        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
        res.status(201).json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/orders/:id', (req, res) => {
    try {
        let orders = readOrders();
        const updated = orders.filter(o => o.orderId !== req.params.id);
        fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(5000, () => console.log('\n🚀 SYSTEM NETWORKS ARE FULLY LIVE ON http://localhost:5000 \n'));
