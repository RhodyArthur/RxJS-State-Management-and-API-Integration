import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // api url
  private apiUrl = 'assets/data.json'

  // fetch data from api
  getProductData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
            .pipe(
              catchError(err => {
                console.error(err);
                return throwError('An error occured');
              })
            )
  }
}
