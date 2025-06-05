import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule] 
})
export class NavbarComponent implements OnInit {
 totalItems$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.totalItems$ = this.cartService.cart$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );

  }
}
