import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-showuserdetails',
  templateUrl: './showuserdetails.component.html',
  styleUrls: ['./showuserdetails.component.scss']
})
export class ShowuserdetailsComponent {
  @Input() user!: User; // Réception des données depuis le parent
  display: boolean = false;


  openModal(): void {
    console.log('Utilisateur reçu:', this.user); // Vérifier si les détails sont bien envoyés
    console.log('Détails utilisateur:', this.user?.details); // Vérifier les détails
    this.display = true;
  }
  
  closeModal(): void {
    this.display = false;
  }
}