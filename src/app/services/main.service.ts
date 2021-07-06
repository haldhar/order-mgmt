import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Product } from '../models';
import { Order } from '../models';
import { AuthenticationService } from '.';

@Injectable({ providedIn: 'root' })
export class MainService {
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    getAllProduct() {
        let currentUser = this.authenticationService.currentUserValue;
        let header = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', "Bearer " + currentUser.jwtToken)
            .set('Access-Control-Allow-Origin', '*');
        return this.http.get<Product[]>(`${environment.apiUrl}/products`, { 'headers': header });
    }

    getAllOrder() {
        let currentUser = this.authenticationService.currentUserValue;
        let header = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', "Bearer " + currentUser.jwtToken)
            .set('Access-Control-Allow-Origin', '*');
        return this.http.get<Order[]>(`${environment.apiUrl}/order`, { 'headers': header });
    }

    placeOrder(orderForm) {
        let currentUser = this.authenticationService.currentUserValue;
        let header = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', "Bearer " + currentUser.jwtToken)
            .set('Access-Control-Allow-Origin', '*');
        return this.http.post<any>(`${environment.apiUrl}/order`, orderForm, { 'headers': header })
            .pipe(map(user => {
                return user;
            }));
    }

}