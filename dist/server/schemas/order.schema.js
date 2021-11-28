import mongoose from "mongoose";
const { Schema, model } = mongoose;
const orderSchema = new mongoose.Schema({
    products: {
        priceSalesTime: { type: Number, required: true },
        product: { type: mongoose.Types.ObjectId }
    },
    total: { type: Number, required: true },
});
export const OrderModel = model('Order', orderSchema);
//# sourceMappingURL=order.schema.js.map