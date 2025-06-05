import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  selectedCategory = 'all';
  private selectedCategory$ = new BehaviorSubject<string>('all');

  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;
  filteredProducts$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts().pipe(
      catchError(err => {
        console.error('Erreur chargement produits', err);
        return of([]);
      })
    );

    this.categories$ = this.products$.pipe(
      map(products => ['all', ...new Set(products.map(p => p.category))])
    );

    this.filteredProducts$ = combineLatest([
      this.products$,
      this.selectedCategory$
    ]).pipe(
      map(([products, selected]) =>
        selected === 'all'
          ? products
          : products.filter(p => p.category === selected)
      )
    );
  }


  onCategoryChange(): void {
    this.selectedCategory$.next(this.selectedCategory);
  }
}
