import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      productName: 'Sapiens',
      price: 12.61,
      quantity: 8,
      isImported: false,
      category: 'Books'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from the JSON URL', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(environment.productsUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should return an empty array when HTTP request fails', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual([]);
    });

    const req = httpMock.expectOne(environment.productsUrl);
    req.error(new ErrorEvent('Network error'));
  });
});
