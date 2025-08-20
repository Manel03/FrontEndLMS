import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'actia-lms-network',
        clientId: 'lms'
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
    }
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout();
  }

  getCookieValue(name: string): string | null {
    const value = `; ${document.cookie}`;
    console.log("value",value);

    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Failed to decode JWT:', e);
      return null;
    }
  }

  getUserUuid(): string {
    const keycloakIdentity = this.getCookieValue('KEYCLOAK_IDENTITY');
    console.log("keycloakIdentity",keycloakIdentity);
    if (keycloakIdentity) {
      const jwtPayload = this.decodeJWT(keycloakIdentity);
      console.log("jwtPayload",jwtPayload);
      return jwtPayload?.sub ;
    }
    return "";
  }
}
