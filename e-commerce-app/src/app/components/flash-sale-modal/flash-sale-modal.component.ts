import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-flash-sale-modal',
  templateUrl: './flash-sale-modal.component.html',
  styleUrls: ['./flash-sale-modal.component.scss']
})
export class FlashSaleModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Product },
  private cartService: CartService) {}

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    console.log('Cart:', this.cartService.cart$);
    this.cartService.addToCart(product);
  }
}