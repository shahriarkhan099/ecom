import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  quantity = 0;
  private cartSubscription!: Subscription;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      const cartItem = items.find(item => item.id === this.product.id);
      this.quantity = cartItem ? cartItem.quantity : 0;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onAddToCart() {
    this.cartService.addToCart(this.product);
  }

  showDetails() {
    this.router.navigate(['/product', this.product.id]);
  }

  increaseQuantity() {
    this.cartService.addToCart(this.product);
  }

  decreaseQuantity() {
    this.cartService.updateQuantity(this.product.id, this.quantity - 1);
  }
}