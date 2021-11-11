
import mongoose from 'mongoose';
import { Cart } from './../../shared/models/cart.model.js';

const {Schema, model} = mongoose

const cartSchema = new mongoose.Schema<Cart>({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    items: [{ type: mongoose.Types.ObjectId, ref:'Product'}],
    total:{type:Number,default:0}
   
    
});

export const CartModel = model<Cart>('Cart',cartSchema)
