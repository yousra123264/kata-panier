import { Product } from '../../products/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  unitPriceHT: number;
  unitPriceTTC: number;
  totalTaxes: number;
}
