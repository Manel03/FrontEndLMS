import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/backoffice/models/User';
import { UserManagementService } from 'src/app/backoffice/service/user-management.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
  user?: UserProfile;

  constructor(private userManagementService: UserManagementService,
    private keycloakService: KeycloakService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.user = this.keycloakService.profile;
    console.log('Utilisateur connecté :', this.user);
    if (this.user?.id) {
      this.userManagementService.getUserById(this.user.id).subscribe({
        next: (user: User) => {
          const roles = user.details?.roles || [];
          if (Array.isArray(roles) && roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/back-office']); // Assure-toi que le routing est bien configuré
          }else {
            this.router.navigate(['/front-office/homepage']); // Assure-toi que le routing est bien configuré

          }
        },
        error: (err) => {
          console.log("err", err);
        }
      });
    }


  }


}
