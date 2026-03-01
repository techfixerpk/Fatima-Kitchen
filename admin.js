/* FATIMA KITCHEN CORE OS - v11.0 (OMEGA EDITION)
   Lead Administrator: Fatimaskitchenpk92@gmail.com
   Security Protocol: Fatima61814@
   Features: Automated Revenue, Live System Logs, Catalog Deployment
*/

(function() {
    "use strict";

    // 1. HARDCODED SECURITY VAULT
    const ADMIN_CREDENTIALS = {
        email: "Fatimaskitchenpk92@gmail.com",
        pass: "Fatima61814@"
    };

    // 2. DATA STATES (Sync with LocalStorage)
    let CATALOG = JSON.parse(localStorage.getItem('fk_catalog')) || [
        { id: 1001, name: "Mutton Pulao (Titan)", price: 1250, img: "pulao.jpg" },
        { id: 1002, name: "Chicken Karahi (Omega)", price: 2400, img: "karahi.jpg" }
    ];

    let ORDERS = JSON.parse(localStorage.getItem('fk_orders')) || [];

    // 3. CORE DOM SELECTORS
    const DOM = {
        catalogList: document.getElementById('admin-menu-list'),
        orderFeed: document.getElementById('live-orders-feed'),
        revenueDisplay: document.getElementById('total-revenue'),
        orderCount: document.getElementById('active-count'),
        logTerminal: document.getElementById('admin-logs'),
        inputs: {
            name: document.getElementById('food-name'),
            price: document.getElementById('food-price'),
            img: document.getElementById('food-img')
        }
    };

    // 4. SECURITY SHIELD (Unauthorized Access Block)
    const secureTerminal = () => {
        const activeUser = localStorage.getItem('fk_active_user');
        const loginStatus = localStorage.getItem('isLoggedIn');

        if (activeUser !== ADMIN_CREDENTIALS.email || loginStatus !== 'true') {
            console.error("CRITICAL: UNAUTHORIZED_ACCESS_BLOCKED");
            alert("⚠️ SECURITY BREACH: Redirecting to Authentication...");
            window.location.href = "auth.html";
        }
    };

    // 5. ENGINE INITIALIZER
    const init = () => {
        secureTerminal();
        addLog("SYSTEM_BOOT: Fatima Kitchen Core v11.0 Active");
        addLog("UPLINK: Secure Database Connected");
        renderAll();
        startAutoSync();
    };

    // 6. LOGGING SYSTEM
    const addLog = (msg) => {
        if (!DOM.logTerminal) return;
        const time = new Date().toLocaleTimeString();
        DOM.logTerminal.innerHTML += `<div style="margin-bottom:5px;">[${time}] ${msg}</div>`;
        DOM.logTerminal.scrollTop = DOM.logTerminal.scrollHeight;
    };

    // 7. RENDERING CORE (Catalog & Orders)
    const renderAll = () => {
        renderCatalog();
        renderOrders();
        updateAnalytics();
    };

    // Catalog Rendering (Right Panel)
    const renderCatalog = () => {
        if (!DOM.catalogList) return;
        DOM.catalogList.innerHTML = CATALOG.map(item => `
            <div class="data-card" style="border-left: 2px solid var(--omega-gold);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:10px; color:#555;">ID: ${item.id}</span>
                    <i class="fas fa-trash" style="color:var(--omega-red); cursor:pointer;" onclick="Architect.deleteItem(${item.id})"></i>
                </div>
                <h4 style="margin:10px 0; letter-spacing:1px;">${item.name}</h4>
                <div style="display:flex; gap:10px; align-items:center;">
                    <span style="color:var(--omega-gold);">Rs.</span>
                    <input type="number" value="${item.price}" class="mega-input" 
                        style="margin:0; padding:5px; width:100px; font-size:12px;" 
                        onchange="Architect.updatePrice(${item.id}, this.value)">
                </div>
            </div>
        `).join('');
    };

    // Order Rendering (Center Panel)
    const renderOrders = () => {
        if (!DOM.orderFeed) return;
        if (ORDERS.length === 0) {
            DOM.orderFeed.innerHTML = `<p style="opacity:0.2; text-align:center; margin-top:50px;">NO_ACTIVE_STREAM</p>`;
            return;
        }

        DOM.orderFeed.innerHTML = ORDERS.map(order => `
            <div class="order-card-max">
                <div>
                    <span style="font-size:10px; color:var(--omega-gold);">#${order.id}</span>
                    <h4 style="margin-top:5px;">${order.customer || 'GUEST_USER'}</h4>
                </div>
                <div style="text-align:center;">
                    <p style="font-size:12px;">${order.item}</p>
                    <span style="font-size:10px; opacity:0.5;">STATUS: ${order.status}</span>
                </div>
                <div style="text-align:right;">
                    <button class="btn-titan" style="padding:5px 10px; font-size:10px; background:#00d2ff;" onclick="Architect.setStatus('${order.id}', 'Cooking')">PREPARE</button>
                    <button class="btn-titan" style="padding:5px 10px; font-size:10px; background:#2ecc71; margin-top:5px;" onclick="Architect.setStatus('${order.id}', 'Delivered')">FINISH</button>
                </div>
            </div>
        `).join('');
    };

    // 8. ANALYTICS ENGINE
    const updateAnalytics = () => {
        const totalRev = ORDERS.reduce((acc, curr) => curr.status === 'Delivered' ? acc + curr.price : acc, 0);
        const activeOrders = ORDERS.filter(o => o.status !== 'Delivered').length;

        if (DOM.revenueDisplay) DOM.revenueDisplay.innerText = `Rs. ${totalRev.toLocaleString()}`;
        if (DOM.orderCount) DOM.orderCount.innerText = activeOrders;
    };

    // 9. ARCHITECT ACTIONS (Global API)
    window.Architect = {
        // Add Food
        addItem: () => {
            const name = DOM.inputs.name.value;
            const price = parseInt(DOM.inputs.price.value);
            const img = DOM.inputs.img.value || "default.jpg";

            if (!name || !price) return addLog("ERROR: DATA_FIELD_EMPTY");

            const newItem = { id: Date.now(), name, price, img };
            CATALOG.unshift(newItem);
            save();
            addLog(`DEPLOYED: ${name} to Catalog`);
            DOM.inputs.name.value = ''; DOM.inputs.price.value = '';
            renderAll();
        },

        // Update Price
        updatePrice: (id, newPrice) => {
            const item = CATALOG.find(i => i.id === id);
            if (item) {
                item.price = parseInt(newPrice);
                save();
                addLog(`UPDATED: Price for ID ${id}`);
                updateAnalytics();
            }
        },

        // Set Order Status
        setStatus: (id, status) => {
            const order = ORDERS.find(o => o.id === id);
            if (order) {
                order.status = status;
                save();
                addLog(`ORDER_UPDATE: ${id} is now ${status}`);
                renderAll();
            }
        },

        // Delete Item
        deleteItem: (id) => {
            CATALOG = CATALOG.filter(i => i.id !== id);
            save();
            addLog(`DELETED: Item ID ${id} from Manifest`);
            renderAll();
        }
    };

    // 10. SYSTEM UTILS
    const save = () => {
        localStorage.setItem('fk_catalog', JSON.stringify(CATALOG));
        localStorage.setItem('fk_orders', JSON.stringify(ORDERS));
    };

    const startAutoSync = () => {
        setInterval(() => {
            const syncData = JSON.parse(localStorage.getItem('fk_orders')) || [];
            if (syncData.length !== ORDERS.length) {
                ORDERS = syncData;
                addLog("SYNC: Remote Order Data Updated");
                renderAll();
            }
        }, 5000);
    };

    window.logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('fk_active_user');
        window.location.href = "auth.html";
    };

    // BOOT SYSTEM
    document.addEventListener('DOMContentLoaded', init);

})();

