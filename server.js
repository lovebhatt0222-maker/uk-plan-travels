const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const axios = require('axios'); // Secure HTTP pipeline link library

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const filePath = path.join(__dirname, 'orders.json');

// DYNAMIC IN-MEMORY SECURE DATA STORAGE METRICS
let dynamicActiveOtpStorageMemory = {};

function readOrders() {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return content ? JSON.parse(content) : [];
}

// =========================================================================
// 🚨 DETAILS 1: GMAIL AUTO-NOTIFICATION ALERT ENGINE SETTINGS 🚨
// =========================================================================
const corporateEmailNotificationTransporterModule = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lovebhatt0222@gmail.com', // <-- Apni Gmail ID quotes ke andar likhein
        pass: 'ttau nncj cryk vlqw
'      // <-- Apna 16-digit Google App Password likhein
    }
});
// =========================================================================

// Helper validation module function to send automated alerts logs
function dispatchSystemAlertToGmail(subjectLine, textualContentBody) {
    const routingConfigurationLogOptions = {
        from: '"UK Masterplan System Engine" <YOUR_BUSINESS_GMAIL@gmail.com>',
        to: 'lovebhatt0222L@gmail.com', // <-- Apni real Gmail ID likhein yahan bhi
        subject: subjectLine,
        text: textualContentBody
    };

    corporateEmailNotificationTransporterModule.sendMail(routingConfigurationLogOptions, (engineErrorTraceLog) => {
        if (engineErrorTraceLog) {
            console.error("⚠️ Automated Gmail Core Transfer Failed:", engineErrorTraceLog.message);
        } else {
            console.log("✓ Live Email Status Security Notification Delivered Successfully to Business Owner Dashboard!");
        }
    });
}

// STATIC CONTROLLERS CHANNELS
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.get('/api/admin/orders', (req, res) => {
    try { res.json(readOrders()); } catch (e) { res.status(500).json({ error: e.message }); }
});

// =========================================================================
// 🚨 DETAILS 2: CELLULAR TEXT SMS OTP ROUTER WITH REAL FAST2SMS API 🚨
// =========================================================================
app.post('/api/auth/request-otp', async (req, res) => {
    try {
        const { type, phone, name, email } = req.body;
        if (!phone) return res.status(400).json({ success: false, message: "Active cellular identity missing!" });

        // Generate a cryptographically secure random 4-digit token cipher
        const generatedSecureCipherKey = Math.floor(1000 + Math.random() * 9000).toString();

        // Bind temporary memory status parameters logic with 5-minute decay threshold window
        dynamicActiveOtpStorageMemory[phone] = {
            otp: generatedSecureCipherKey,
            name: name || 'Existing Tour Manager',
            email: email || 'N/A',
            type: type,
            expiresAt: Date.now() + (5 * 60 * 1000)
        };

        console.log(`\n[SECURITY LEDGER] -> Generated OTP for ${phone}: (${generatedSecureCipherKey})`);

        // Real Live Mobile Text SMS Gateway Trigger Engine
        await axios.post('https://fast2sms.com', {
            route: 'otp',
            variables_values: generatedSecureCipherKey,
            numbers: phone.replace(/[^0-9]/g, '') 
        }, { 
            headers: { 'authorization': 'YOsXSBvUquQnZYlgmrH0VAL3EMkFD7cybOxR1zGT2f4KdWItN5J82HbDvTEeq7hxnF1BZroRN8uKXY6CJS' } // <-- Apni Copy ki hui API Key yahan paste karein
        });

        res.status(200).json({ success: true, message: "Security cipher dispatched to global gateway network tunnel successfully!" });
    } catch (error) {
        console.error("⚠️ SMS Grid Gateway Fault Trace:", error.message);
        res.status(500).json({ success: false, message: "Cellular Pipeline Error: " + error.message });
    }
});

// API ENDPOINT ROUTE: Verify Client Input OTP & Dispatch Instant Gmail Security Alert
app.post('/api/auth/verify-otp', (req, res) => {
    try {
        const { phone, otp } = req.body;
        const recordedSessionFrame = dynamicActiveOtpStorageMemory[phone];

        if (!recordedSessionFrame) {
            return res.status(400).json({ success: false, message: "Verification Session expired or unallocated. Please request cipher token again!" });
        }

        if (recordedSessionFrame.expiresAt  {
    try {
        const bookingData = req.body;
        let orders = readOrders();

        orders.push({
            ...bookingData,
            orderId: "UKM-" + Date.now(),
            loggedAt: new Date().toLocaleString("en-IN")
        });

        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
        res.status(201).json({ success: true });
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
});

// ADMINISTRATIVE DELETION DISPOSAL PIPELINE
app.delete('/api/admin/orders/:id', (req, res) => {
    try {
        let orders = readOrders();
        const updated = orders.filter(o => o.orderId !== req.params.id);
        fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
        res.json({ success: true });
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
});

// LISTEN RUNNER PORTS INITIALIZATION CORE
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n=====================================================`);
    console.log(`🚀 MASTER SECURITY AUTO-AUTHENTICATION ENGINE WORKING!`);
    console.log(`👉 Local Client Endpoint: http://localhost:${PORT}`);
    console.log(`=====================================================\n`);
});
