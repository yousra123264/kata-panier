import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from 'src/app/core/services/cart.service';
import { of } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { PrixTtcPipe } from 'src/app/shared/pipes/prix-ttc.pipe';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const mockCartItems: CartItem[] = [{
    product: { id: 1, productName: 'Book', price: 10, quantity: 5, category: 'Books', isImported: false },
    quantity: 2, unitPriceHT: 10, unitPriceTTC: 11, totalTaxes: 1
  }];

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['getTotalTTC', 'getTotalTaxes', 'removeProduct'], {
      cart$: of(mockCartItems)
    });

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [PrixTtcPipe],
      providers: [{ provide: CartService, useValue: cartServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items', () => {
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].product.productName).toBe('Book');
  });

  it('should get total TTC', () => {
    cartServiceSpy.getTotalTTC.and.returnValue(99);
    expect(component.getTotalTTC()).toBe(99);
  });

  it('should get total taxes', () => {
    cartServiceSpy.getTotalTaxes.and.returnValue(5);
    expect(component.getTotalTaxes()).toBe(5);
  });

  it('should call removeProduct()', () => {
    component.removeItem(1);
    expect(cartServiceSpy.removeProduct).toHaveBeenCalledWith(1);
  });
});
