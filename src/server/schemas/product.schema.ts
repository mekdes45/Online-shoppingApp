
import mongoose from 'mongoose';
import { Product } from './../../shared/models/product.model';
const {Schema, model} = mongoose

const productSchema = new Schema<Product>({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: { type: String, required: true },
    image: {}
});

export const ProductModel = model<Product>('Product',productSchema)
