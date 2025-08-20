import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserManagementService } from '../../service/user-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.scss']
})
export class AddedituserComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId: string | null = null;
  users: User[] = []; 
  selectedFile: File | null = null;

  roles = [
    { label: 'ADMIN', value: 'ROLE_ADMIN' },
    { label: 'RH', value: 'ROLE_RH' },
    { label: 'MANAGER', value: 'ROLE_MANAGER' },
    { label: 'COLLABORATEUR', value: 'ROLE_COLLABORATEUR' },
    { label: 'FORMATEUR', value: 'ROLE_FORMATEUR' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUsers();
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      enabled: [true, Validators.required],
      details: this.fb.group({
        id: [''],
        userUuid: [''],
        departement: ['', Validators.required],
        telephone: ['', Validators.required],
        poste: ['', Validators.required],
        manager: [''],
        roles: [[""]]
      })
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.getUser();
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

  getUser(): void {
    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (data: User) => {
          this.populateForm(data);
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement de l\'utilisateur' });
        }
      });
    }
  }

  populateForm(user: User): void {
    const managerID = user.details?.manager?.id;
    const manager = managerID !== undefined
      ? this.users.find(u => String(u.details?.id) === String(managerID))
      : null;

    this.userForm.patchValue({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      enabled: user.enabled,
      details: {
        id: user.details?.id,
        userUuid: user.details?.userUuid,
        departement: user.details?.departement,
        telephone: user.details?.telephone,
        poste: user.details?.poste,
        manager: manager,
        roles: user.details?.roles?.[0] || ''
      }
    });
  }

  saveUser(): void {
    if (this.userForm.invalid) return;

    let userData = this.userForm.value;

    // Sécurisation : extraction de l'id du manager
    if (userData.details?.manager?.details?.id) {
      userData.details.manager = {
        id: userData.details.manager.details.id
      };
    } else {
      userData.details.manager = null;
    }

    // Sécurisation des rôles
    if (userData.details?.roles?.value) {
      userData.details.roles = [userData.details.roles.value];
    } else if (typeof userData.details.roles === 'string') {
      userData.details.roles = [userData.details.roles];
    } else {
      userData.details.roles = [];
    }

    console.log("userData final :", userData);

    if (this.isEditMode) {
      this.userService.updateUser(userData.id, userData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur modifié avec succès' });
          this.router.navigate(['/back-office/user-list']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la modification' });
        }
      });
    } else {
      this.userService.createUser({ ...userData, image: this.selectedFile?.name }).subscribe({
        next: () => {
          console.log('Utilisateur créé avec succès');
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur créé avec succès' });
          this.router.navigate(['/back-office/user-list']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création' });
        }
      });
    }
  }

  onSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      console.log("Fichier sélectionné:", this.selectedFile);
    }
  }

  navigateBack(): void {
    this.router.navigate(['/back-office/user-list']);
  }
}

