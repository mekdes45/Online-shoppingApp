import type mongoose from 'mongoose';
import type { Product } from './product.model';


export interface Order{
    _id: string;
    products: {
        priceSalesTime: number,
        product: Product;
    };
    total: number;
}