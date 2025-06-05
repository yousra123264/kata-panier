import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PrixTtcPipe } from 'src/app/shared/pipes/prix-ttc.pipe';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    PrixTtcPipe
  ]
})
export class ProductsModule { }
