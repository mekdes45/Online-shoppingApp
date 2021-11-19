
import * as mongoose from 'mongoose';
import { Product } from './product.model.js';
import { User } from './user.model.js';
export interface Cart{
    id?: any;
    user?:User,
    items: {product:Product,quantity:number}[],
    total?: number,
    count:number
    

}