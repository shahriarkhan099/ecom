import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private allProducts$!: Observable<Product[]>;
  products$!: Observable<Product[]>;
  cartItemCount$!: Observable<number>;
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.allProducts$ = this.productService.getProducts();
    this.cartItemCount$ = this.cartService.cart$.pipe(
      map((items) => items.reduce((count, item) => count + item.quantity, 0))
    );

    this.products$ = combineLatest([
      this.allProducts$,
      this.searchTerm$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([products, searchTerm]) =>
        products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  onSearch(term: string) {
    this.searchTerm$.next(term);
  }
}