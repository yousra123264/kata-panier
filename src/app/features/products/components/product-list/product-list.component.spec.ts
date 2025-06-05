import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductListComponent ', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    { id: 1, productName: 'Apple', price: 2, quantity: 5, isImported: false, category: 'Food' },
    { id: 2, productName: 'Book', price: 10, quantity: 3, isImported: false, category: 'Books' }
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [CommonModule, FormsModule],
      providers: [{ provide: ProductService, useValue: mockProductService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and categories', (done) => {
    component.products$.subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].productName).toBe('Apple');
      done();
    });

    component.categories$.subscribe(categories => {
      expect(categories).toEqual(['all', 'Food', 'Books']);
    });
  });

  it('should filter products by selected category', (done) => {
    component.selectedCategory = 'Books';
    component.onCategoryChange();

    component.filteredProducts$.subscribe(filtered => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].category).toBe('Books');
      done();
    });
  });
});
