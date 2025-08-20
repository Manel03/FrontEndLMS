import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  user?: UserProfile;
  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.user = this.keycloakService.profile;
  }

  logout() {
    this.keycloakService.logout();
  }

}
