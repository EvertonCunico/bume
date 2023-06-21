import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public autenticacaoService: AutenticacaoService, private router: Router) {}

  /*intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.interceptarURL(request.url)) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `${this.autenticacaoService.authorization}`
        }
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }*/
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.interceptarURL(request.url)) {
      const clonedRequest = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention, max-len
          Authorization: `Bearer ${this.autenticacaoService.authorization}`,
        },
      });
      //return next.handle(clonedRequest);
      return next.handle(clonedRequest).pipe(
        tap(
          () => {},
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['login']);
              } else if (err.status === 404) {
                this.router.navigate(['']);
              }
              return;
            }
          }
        )
      );
    } else {
      return next.handle(request);
    }
  }

  /**
   * Filtra as URLs que devem ser interceptadas para injetar o header Authorization com o token
   */
  interceptarURL(url: string): boolean {
    return !(
      url.endsWith('/login/autenticar') ||
      url.endsWith('/secured/renew_token') ||
      url.endsWith('/recuperacao_senha') ||
      url.endsWith('/recuperacao_senha/validar') ||
      url.endsWith('/recuperacao_senha/novaSenha')
    );
  }
}
