import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const encodedCategory = encodeURIComponent(category);
    return this.http.get<Product[]>(`${this.apiUrl}/category/${encodedCategory}`);
  }

  async getRandomProduct(): Promise<Product> {
    this.products = (await this.getProducts().toPromise()) || [];
    const randomIndex = Math.floor(Math.random() * this.products.length);
    return this.products[randomIndex];
  }
}
