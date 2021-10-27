
import mongoose from 'mongoose';
import { Product } from '../../shared/models/product.model.js';
const {Schema, model} = mongoose

const productSchema = new Schema<Product>({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true}
    
});

export const ProductModel = model<Product>('Product',productSchema)
