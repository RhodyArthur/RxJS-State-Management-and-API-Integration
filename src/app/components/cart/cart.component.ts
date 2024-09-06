import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
constructor(public cartService: CartService) {}

cartItems: Product[] = [];
totalItems:number = 0;


ngOnInit() {
  this.cartService.getCartItems()
  .subscribe({
    next: items => this.cartItems = items,
    error: err => console.error(err)
  })
}

removeItem(item: Product) {
  this.cartService.removeItemFromCart(item);
}

clearCart() {
  this.cartService.clearCart()
}

}
