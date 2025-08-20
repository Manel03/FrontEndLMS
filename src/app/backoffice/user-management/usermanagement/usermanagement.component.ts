import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { User } from '../../models/User';
import { UserManagementService } from '../../service/user-management.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ShowuserdetailsComponent } from '../showuserdetails/showuserdetails.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss'],
  providers: [DialogService] 
})

export class UsermanagementComponent implements OnInit {
  users: User[] = []; 
  filteredUsers: User[] = []; // Utilisateurs filtrés

  searchCriteria = {
    email: '',
    firstName: '',
    lastName: '',
    enabled: null
  };

  statusOptions = [
    { label: 'Tous', value: null },
    { label: 'Actif', value: true },
    { label: 'Désactivé', value: false }
  ];

  constructor(
    private userService: UserManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec du chargement des utilisateurs'
        });
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      (!this.searchCriteria.email || user.email.toLowerCase().includes(this.searchCriteria.email.toLowerCase())) &&
      (!this.searchCriteria.firstName || user.firstName.toLowerCase().includes(this.searchCriteria.firstName.toLowerCase())) &&
      (!this.searchCriteria.lastName || user.lastName.toLowerCase().includes(this.searchCriteria.lastName.toLowerCase())) &&
      (this.searchCriteria.enabled === null || user.enabled === this.searchCriteria.enabled)
    );
  }

  resetFilters(): void {
    this.searchCriteria = {
      email: '',
      firstName: '',
      lastName: '',
      enabled: null
    };
    this.filteredUsers = [...this.users];
  }

  
  addUser(): void {
    this.router.navigate(['/back-office/addedituser']);
  }

  editUser(user: User): void {
    this.router.navigate(['/back-office/addedituser', user.id]);
  }

  showUserDetails(user: User, modal: ShowuserdetailsComponent): void {
    this.userService.getUserById(user.id).subscribe({
      next: (data) => {
        modal.user = data;
        modal.openModal();
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec du chargement des détails de l\'utilisateur'
        });
      }
    });
  }

  confirmDelete(userId: string): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.loadUsers();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur supprimé avec succès'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la suppression de l\'utilisateur'
        });
      }
    });
  }
  

  
}
