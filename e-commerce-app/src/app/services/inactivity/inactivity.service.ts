import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FlashSaleModalComponent } from '../../components/flash-sale-modal/flash-sale-modal.component';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class InactivityService implements OnDestroy {
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;
  private isModalOpen = false;
  private cartSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.cartSubscription = this.cartService.cart$.subscribe(() => {
      this.resetInactivityTimer();
    });
  }

  startInactivityTimer(): void {
    this.resetInactivityTimer();
    document.addEventListener('mousemove', () => this.resetInactivityTimer());
    document.addEventListener('click', () => this.resetInactivityTimer());
  }

  private resetInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    this.inactivityTimer = setTimeout(() => this.showFlashSaleModal(), 60000);
  }

  private async showFlashSaleModal(): Promise<void> {
    if (this.isModalOpen) {
      return;
    }

    let product!: Product;
    this.cartService.cart$.subscribe((cartItems) => {
      if (cartItems.length > 0) {
        product = cartItems[cartItems.length - 1];
      } else {
        this.productService.getRandomProduct().then((randomProduct) => {
          product = randomProduct;
        });
      }
    });

    this.isModalOpen = true;
    const dialogRef = this.dialog.open(FlashSaleModalComponent, {
      data: { product },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isModalOpen = false;
      this.resetInactivityTimer();
    });
  }

  ngOnDestroy(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    this.cartSubscription.unsubscribe();
  }
}
