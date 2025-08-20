import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/backoffice/models/Notification';
import { NotificationService } from 'src/app/backoffice/service/notification.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  allNotifications: Notification[] = [];
  showFiller = false;
  user?: UserProfile;
  constructor(public dialog: MatDialog,private keycloakService: KeycloakService, private notificationService: NotificationService) {}

 ngOnInit(): void {
  this.user = this.keycloakService.profile;
  if (this.user?.id) {
    this.notificationService.getAllNotificationsForUser(this.user.id).subscribe({
      next: (data) => {
        // Filtrer uniquement les notifications non lues
        this.allNotifications = data.filter(n => !n.isRead);
      },
      error: (err) => console.error('Erreur chargement notifications', err)
    });
  }
}

  logout() {
    this.keycloakService.logout();
  }
}
