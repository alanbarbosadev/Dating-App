import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}
  //next is what comes as a result of the request
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      //catchError is a function of the rxjs that catches errors in the response of a request
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400: //the status code 400 is return for validation errors or bad requests
              //error.error.errors get the array of validation errors
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat(); //throws the array of validation errors to the user in the component that the error ocurred. The result is an array of arrays. So the flat function transforms this array of arrays into one array
              } else {
                this.toastr.error(error.error); //For the bad requests errors
              }
              break;
            case 401: //authentication Error
              this.toastr.error('Unauthorized', error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              //the user will be redict to de server-error page and the error in the request will be passed on to the page by the nagivationExtras
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something Went Wrong!'); //generic error
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
