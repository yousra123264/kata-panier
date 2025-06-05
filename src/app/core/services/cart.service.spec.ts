import { CartService } from './cart.service';
import { Product } from 'src/app/features/products/models/product.model';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    id: 1,
    productName: 'Book A',
    price: 10,
    quantity: 5,
    category: 'Books',
    isImported: false
  };

  beforeEach(() => {
    service = new CartService();
  });

  it('should add a product to the cart', () => {
    service.addProduct(mockProduct, 2);

    service.cart$.subscribe(cart => {
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toBe(2);
    });
  });

  it('should remove a product from the cart', () => {
    service.addProduct(mockProduct, 1);
    service.removeProduct(mockProduct.id);

    service.cart$.subscribe(cart => {
      expect(cart.length).toBe(0);
    });
  });

  it('should calculate total TTC correctly', () => {
    service.addProduct(mockProduct, 1);

    const total = service.getTotalTTC();
    expect(total).toBeGreaterThan(mockProduct.price);
  });
});
