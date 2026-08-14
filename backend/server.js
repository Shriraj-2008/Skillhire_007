import express from "express";

const app = express();
const PORT = 5000;

let products = [
    { id: 1, name: "Laptop", price: 10000 },
    { id: 2, name: "Headphones", price: 1500 }
];

app.get("/api/products", (req, res) => {
    res.status(200).json(products);
});

app.listen(PORT, () => {
    console.log(`Server is successfully running at http://localhost:${PORT}`);
});