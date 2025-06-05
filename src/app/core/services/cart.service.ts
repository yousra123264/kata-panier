import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from 'src/app/features/cart/models/cart-item.model';
import { Product } from 'src/app/features/products/models/product.model';
import { calculateTaxes } from 'src/app/shared/utils/tax.utils';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject  = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartItemsSubject .asObservable();

  /**
   * Ajoute un produit au panier avec la quantité souhaitée.
   * Si le produit existe déjà, la quantité est incrémentée.
   */
  addProduct(product: Product, quantity: number) {
    const taxes = calculateTaxes(product);
    const unitPriceTTC = +(product.price + taxes).toFixed(2);

    const itemExist = this.cartItems.find(item => item.product.id === product.id);
    if (itemExist) {
      itemExist.quantity += quantity;
    } else {
      this.cartItems.push({
        product,
        quantity,
        unitPriceHT: product.price,
        unitPriceTTC,
        totalTaxes: taxes,
      });
    }

    this.cartItemsSubject .next([...this.cartItems]);
  }
  /**
   * Supprime un produit du panier selon son ID.
   */
  removeProduct(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartItemsSubject .next([...this.cartItems]);
  }

    /**
   * Retourne le montant total TTC du panier.
   */
  getTotalTTC(): number {
    return this.cartItems.reduce((total, item) => total + (item.unitPriceTTC * item.quantity), 0);
  }

  /**
   * Retourne le montant total des taxes dans le panier.
   */
  getTotalTaxes(): number {
    return this.cartItems.reduce((total, item) => total + (item.totalTaxes * item.quantity), 0);
  }
}
