import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly dataUrl = environment.productsUrl;

  constructor(private readonly http: HttpClient) {}

  /**
   * Charge les produits à partir du fichier JSON local.
   * @returns Observable contenant la liste des produits ou une liste vide en cas d'erreur
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl).pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des produits :', error);
        return of([]); 
      })
    );
  }
}
