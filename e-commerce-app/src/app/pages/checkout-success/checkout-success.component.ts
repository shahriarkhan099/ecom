import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../interfaces/cart-item.interface';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  @ViewChild('receipt') receiptElement!: ElementRef;

  orderId: string = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  orderDate: Date = new Date();
  orderItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  grandTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadOrderItems();
    this.calculateTotals();
  }

  loadOrderItems(): void {
    this.cartService.cart$.subscribe(items => {
      this.orderItems = items;
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getTotal();
    this.tax = this.subtotal * 0.1;
    this.grandTotal = this.subtotal + this.tax;
  }

  downloadReceipt(): void {
    const doc = new jsPDF();
    const receiptContent = this.receiptElement.nativeElement;

    doc.html(receiptContent, {
      callback: (doc) => {
        doc.save('receipt.pdf');
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650
    });
  }
}