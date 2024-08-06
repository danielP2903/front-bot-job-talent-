import { CanActivateFn } from '@angular/router';
import { KEY_STORAGE } from '../shared/constants/key-storage';

export const authGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem(KEY_STORAGE.token)){
    return true;
  }
  return false;
};
