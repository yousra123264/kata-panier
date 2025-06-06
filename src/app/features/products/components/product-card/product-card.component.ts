import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from 'src/app/core/services/cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;

  quantity = 1;

  constructor(private readonly cartService: CartService) {}

  /**
   * Vérifie si le produit est en rupture de stock.
   * @returns true si la quantité est à 0.
   */
  isOutOfStock(): boolean {
    return this.product.quantity === 0;
  }

  /**
   * Ajoute le produit au panier avec la quantité choisie.
   */
  addToCart(): void {
    this.cartService.addProduct(this.product, this.quantity);
  }
}
