import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  product$!: Observable<Product[]>;

  constructor(private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.product$ = this.productService.getProductData()
  }


  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
}
