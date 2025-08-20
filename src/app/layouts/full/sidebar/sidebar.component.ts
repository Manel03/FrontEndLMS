import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';
import { UserManagementService } from 'src/app/backoffice/service/user-management.service';
import { User } from 'src/app/backoffice/models/User';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  allNavItems = navItems ;
  navItems?: NavItem[];
  user?: UserProfile;
  roles?: string[];

  constructor(
    public navService: NavService,private keycloakService: KeycloakService,
    private userManagementService: UserManagementService

  ) {}

    ngOnInit(): void {
    this.user = this.keycloakService.profile;

    // Affiche tous les éléments de navigation, sans filtrage par rôle
    this.navItems = this.allNavItems;
  }
}
