
import mongoose from 'mongoose';
import { Product } from '../../shared/models/product.model.js';
import { Cart } from './../../shared/models/cart.model.js';

const {Schema, model} = mongoose

const cartSchema = new mongoose.Schema<Cart>({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity:Number
    }]

    
});
cartSchema.virtual("count").get(function (this: Cart) {
    return this.items.reduce((acc, item) =>acc + item.quantity,0 )
  });
  
cartSchema.virtual('total').get(function (this: Cart) {
    return this.items.reduce((amount: number, item:{product:Product,quantity:number}) => {
        return ((item.product.price*item.quantity)) + amount
    },0).toFixed(2)
})
cartSchema.set(`toObject`, {virtuals:true});
cartSchema.set(`toJSON`, {virtuals:true});


export const CartModel = model<Cart>('Cart',cartSchema)
