
import mongoose from 'mongoose';
import { Product } from '../../shared/models/product.model.js';
import { Cart } from './../../shared/models/cart.model.js';

const {Schema, model} = mongoose

const cartSchema = new mongoose.Schema<Cart>({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    items: [{ type: mongoose.Types.ObjectId, ref:'Product'}],
   
    
});
cartSchema.virtual('total').get(function (this: Cart) {
    return this.items.reduce((amount: number, item: Product) => {
        return item.price + amount
    },0)
})
cartSchema.set(`toObject`, {virtuals:true});
cartSchema.set(`toJSON`, {virtuals:true});


export const CartModel = model<Cart>('Cart',cartSchema)
