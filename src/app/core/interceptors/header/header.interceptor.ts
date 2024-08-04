import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { KEY_STORAGE } from '../../../shared/constants/key-storage';

export const headerInterceptor: HttpInterceptorFn = (request, next) => {
  let headers = new HttpHeaders();
  const loginRequest = request.clone({ headers });
  if (request.url.includes('/auth') || request.url.includes('/users')) {
    return next(loginRequest);
  }

  const token = sessionStorage.getItem(KEY_STORAGE.token);

  headers = headers.append('Authorization', token as string);
  const authenticatedRequest = request.clone({ headers });
  return next(authenticatedRequest);
};
