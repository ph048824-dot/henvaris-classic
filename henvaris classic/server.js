import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const ACCESS_TOKEN = "APP_USR-8534504910057181-062817-113027c802a0047c88c56d2ce83db801-3502536640";

app.post("/create-payment", async (req, res) => {
try {
const cart = req.body.cart;

const items = cart.map(item => ({
title: item.name,
quantity: item.qty,
unit_price: Number(item.price)
}));

const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${ACCESS_TOKEN}`
},
body: JSON.stringify({
items,
back_urls: {
success: "https://seusite.com/sucesso.html",
failure: "https://seusite.com/erro.html"
},
auto_return: "approved"
})
});

const data = await response.json();

res.json({ url: data.init_point });

} catch (err) {
res.status(500).json(err);
}
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));