import mongoose from 'mongoose';
import '../../shared/models/product.model.js';
const { Schema, model } = mongoose;
const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageurl: { type: String, required: true },
    quantity: { type: Number, required: true },
});
export const ProductModel = model('Product', productSchema);
//# sourceMappingURL=product.schema.js.map