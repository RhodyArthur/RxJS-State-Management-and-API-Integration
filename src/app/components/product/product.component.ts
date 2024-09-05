import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  product$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product$ = this.productService.getProductData()
 
  }

}
