import mongoose  from "mongoose";
import type { Order } from "../../shared/models/order.model.js";

const { Schema, model } = mongoose

const orderSchema = new mongoose.Schema<Order>({
    products: {
        priceSalesTime: { type: Number, required: true },
        product: { type: mongoose.Types.ObjectId }
    },
    total: { type: Number, required: true },
});
export const OrderModel= model<Order>('Order',orderSchema)