import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router, private toastrService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMesagge = '';
        let errorType = '';

        if (
          httpErrorResponse.status === 401 ||
          httpErrorResponse.status === 422
        ) {
          localStorage.removeItem('token');
          errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.error.msg}`;
          this.router.navigate(['/home']);
        } else if (httpErrorResponse.error instanceof ErrorEvent) {
          errorType = 'Client side error';
          errorMesagge = httpErrorResponse.error.error;
        } else {
          errorType = 'Server side error';
          if (httpErrorResponse.status === 0) {
            errorMesagge = 'error connection with server';
          } else {
            errorMesagge = `${httpErrorResponse.status}: ${
              httpErrorResponse.error.mensaje ||
              'Try to connect later'
            }`;
          }
        }
        this.toastrService.error(errorMesagge, errorType, {
          closeButton: true,
        });
        return throwError(() => new Error(errorMesagge));
      })
    );
  }
}
