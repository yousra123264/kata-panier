import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { CartService } from 'src/app/core/services/cart.service';
import { PrixTtcPipe } from 'src/app/shared/pipes/prix-ttc.pipe';
import { FormsModule } from '@angular/forms';

describe('ProductCardComponent ', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['addProduct']);

    await TestBed.configureTestingModule({
      imports: [FormsModule,PrixTtcPipe],
      declarations: [ProductCardComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = {
      id: 1,
      productName: 'Test',
      price: 10,
      quantity: 5,
      category: 'Books',
      isImported: false
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addProduct on addToCart()', () => {
    component.quantity = 2;
    component.addToCart();
    expect(cartServiceSpy.addProduct).toHaveBeenCalledWith(component.product, 2);
  });

  it('should return false if product is in stock', () => {
    expect(component.isOutOfStock()).toBeFalse();
  });

  it('should return true if product quantity is 0', () => {
    component.product.quantity = 0;
    expect(component.isOutOfStock()).toBeTrue();
  });
});
