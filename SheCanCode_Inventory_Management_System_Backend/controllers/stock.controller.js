const stockModel = require("./../models/sockModel");

const getAll = async (req, res) => {
    try {
        const data = await stockModel.find();
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

const updateStock = async (req, res) => {
    const updates = req.body;
    const productId = req.params.id;
    try {
        const existingProduct = await stockModel.findOne({ _id: productId });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (existingProduct.quantity === 0 || existingProduct.status === "rejected" || existingProduct.status === "pending") {
            return res.status(403).json({ message: "failed check if stock is not out or check status" });
        }
        if ('quantity' in updates && updates.quantity > existingProduct.quantity) {
            return res.status(400).json({ message: "Requested quantity exceeds available quantity" });
        }
        if ('quantity' in updates) {
            const quantityDifference = existingProduct.quantity - updates.quantity;
            existingProduct.quantity = quantityDifference;
            existingProduct.totalPrice = existingProduct.totalPrice - (updates.quantity * existingProduct.unitPrice);
        }
        for (const key in updates) {
            if (key !== 'quantity') {
                existingProduct[key] = updates[key];
            }
        }
        const updatedProduct = await existingProduct.save();
        return res.status(200).json({ message: "data updated successfully", data: updatedProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};





const deleteStock = async (req, res) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await stockModel.findOneAndDelete({ id: productId });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAll,
    updateStock,
    deleteStock
};
