import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { CartService } from 'src/app/core/services/cart.service';
import { of } from 'rxjs';
import { CartItem } from 'src/app/features/cart/models/cart-item.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  const mockCartItems: CartItem[] = [
    { product: { id: 1, productName: 'Test', price: 10, category: 'Food', quantity: 10, isImported: false }, quantity: 2, unitPriceHT: 10, unitPriceTTC: 12, totalTaxes: 2 },
    { product: { id: 2, productName: 'Test2', price: 15, category: 'Books', quantity: 5, isImported: false }, quantity: 1, unitPriceHT: 15, unitPriceTTC: 16.5, totalTaxes: 1.5 }
  ];

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', ['cart$'], { cart$: of(mockCartItems) });

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule], 
      providers: [{ provide: CartService, useValue: mockCartService }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total quantity correctly', (done) => {
    component.totalItems$.subscribe(total => {
      expect(total).toBe(3); 
      done();
    });
  });
});
