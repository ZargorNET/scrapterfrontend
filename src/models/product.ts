import {ProductType} from "./productType";

export default interface Product {
    name: string;
    image: string | null;
    productType: ProductType
}
