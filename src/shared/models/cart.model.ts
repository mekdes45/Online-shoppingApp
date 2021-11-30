
import * as mongoose from 'mongoose';
import { Product } from './product.model.js';
import { User } from './user.model.js';
export interface Cart{
    _id?:{type: mongoose.Types.ObjectId}
    user?:User,
    items: {product:Product,quantity:number}[],
    total?: number,
    count:number
    

}