import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap, Subscription } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product$!: Observable<Product>;
  recommendedProducts$!: Observable<Product[]>;
  quantity = 0;
  private cartSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.productService.getProduct(id);
      }),
      tap((product) => {
        this.recommendedProducts$ = this.productService.getProductsByCategory(product.category);
        this.updateQuantity(product.id);
      })
    );
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateQuantity(productId: number) {
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      const cartItem = items.find(item => item.id === productId);
      this.quantity = cartItem ? cartItem.quantity : 0;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  increaseQuantity(product: Product) {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, this.quantity - 1);
  }
}