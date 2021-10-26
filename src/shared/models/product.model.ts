
import * as mongoose from 'mongoose';
import { Url } from 'url';
export interface Product {
    _id?:{type: mongoose.Types.ObjectId}
    title: string,
    price: number,
    description: string,
    category: string,
    image:Url,
}