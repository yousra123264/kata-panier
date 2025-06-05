import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ButtonModule } from 'primeng/button';
import { PrixTtcPipe } from 'src/app/shared/pipes/prix-ttc.pipe';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    ButtonModule,
    PrixTtcPipe
    
  ]
})
export class CartModule {}
