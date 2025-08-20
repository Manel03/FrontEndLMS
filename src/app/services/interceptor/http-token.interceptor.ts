import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from '../keycloak/keycloack.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private keycloakService: KeycloakService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.keycloakService.keycloak.token;
    //console.log("TOKEN",token);
    if (token) {
    
      let headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      
      // Ajouter le Content-Type uniquement si l'URL ne contient pas 'uploadFile'
      if (!request.url.includes('uploadFile') && !request.url.includes('downloadFile')) {
        headers = headers.set('Content-Type', 'application/json');
      }
      
      
      const authReq = request.clone({ headers });
      
      console.log("AuthReq", authReq);
      
      return next.handle(authReq);
      
    }
    return next.handle(request);
  }
}