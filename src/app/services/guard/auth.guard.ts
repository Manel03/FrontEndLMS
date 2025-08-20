import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../keycloak/keycloack.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  if (tokenService.keycloak.isTokenExpired()) {
    router.navigate(['login']);
    return true;
  }
  return true;
};
