import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { AuthenticationRequest } from 'src/app/services/models/authentication-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private ss: KeycloakService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.ss.init();
    await this.ss.login();
  }
}
