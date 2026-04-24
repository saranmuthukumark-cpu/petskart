import Order from "../models/order.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { name, phone, address, city, items, totalAmount, paymentMethod } = req.body;

        const newOrder = new Order({
            name,
            phone,
            address,
            city,
            items,
            totalAmount,
            paymentMethod
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: savedOrder });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to place order." });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch orders." });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch order details." });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to update status." });
    }
}