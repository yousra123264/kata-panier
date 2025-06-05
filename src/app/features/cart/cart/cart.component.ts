import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
      });
  }

  /**
   * Retourne le montant total TTC du panier
   */
  getTotalTTC(): number {
    return this.cartService.getTotalTTC();
  }

  /**
   * Retourne le montant total des taxes
   */
  getTotalTaxes(): number {
    return this.cartService.getTotalTaxes();
  }

  /**
   * Supprime un article du panier
   */
  removeItem(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
