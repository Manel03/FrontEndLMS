import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';
import { Notification } from 'src/app/backoffice/models/Notification';
import { NotificationService } from 'src/app/backoffice/service/notification.service';


@Component({
  selector: 'app-menufront',
  templateUrl: './menufront.component.html',
  styleUrls: ['./menufront.component.scss']
})
export class MenufrontComponent implements OnInit {
  showFiller = false;
  user?: UserProfile;
  notifications: Notification[] = [];
  constructor(private keycloakService: KeycloakService,private notificationService: NotificationService) { }
  openIndex: number | null = null;

  toggle(i: number): void {
    this.openIndex = this.openIndex === i ? null : i;
  }
  isOpen(i: number): boolean {
    return this.openIndex === i;
  }
  closeAll(): void {
    this.openIndex = null;
  }

 ngOnInit(): void {
  this.user = this.keycloakService.profile;
  console.log('Utilisateur connecté :', this.user);
  if (this.user?.id) {
    this.loadNotifications(this.user.id);
  }
}

loadNotifications(userId: string): void {
  console.log("userId",userId)
  this.notificationService.getUnreadNotifications(userId).subscribe({
    next: (notifs) => {
      
      this.notifications = notifs;
      console.log('Notifications chargées :', this.notifications);
    },
    error: (err) => console.error('Erreur lors du chargement des notifications', err)
  });
}


  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
    });
  }

  logout() {
    this.keycloakService.logout();
  }


  

}