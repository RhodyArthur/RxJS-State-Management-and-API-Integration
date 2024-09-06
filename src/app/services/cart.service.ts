import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Product[] = [];

  constructor() { }

  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);

  // an observable to track cart item
  selectedCartItem$ = this.cartSubject.asObservable();
 

  // observable to track total items in cart
  totalItems$ = this.selectedCartItem$.pipe(
    map(item => item.reduce((total, current) => total + current.quantity, 0))
  )

  // get cart items
  getCartItems(): Observable<Product[]> {
    return this.selectedCartItem$;
  }

  // add to cart
  addToCart(product: Product) {
    // find existing item
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.addedToCart = true;
    }
    else {
      product.quantity = 1;
      product.addedToCart = false;
      this.cartItems.push(product)
    }

    this.cartSubject.next(this.cartItems);
  }

  // remove items from cart
  removeItemFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartSubject.next(this.cartItems);
  }

  // clear cart item
  clearCart() {
    this.cartItems = []
    this.cartSubject.next(this.cartItems)
  }
}
