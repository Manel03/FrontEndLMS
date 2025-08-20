
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActualitemanagmentService } from '../../service/actualitemanagment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from '../../models/Formation';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addedit-actualite',
  templateUrl: './addedit-actualite.component.html',
  styleUrls: ['./addedit-actualite.component.scss']
})
export class AddeditActualiteComponent implements OnInit {
  displayModal: boolean = false;
  actualiteForm!: FormGroup;
  actualite: Formation | null = null;
  isEditMode: boolean = false;
  actualiteId: string | null = null;
  selectedFile: File | null = null;
  id: number | null = null;


  constructor(
    private fb: FormBuilder,
    private actualiteService: ActualitemanagmentService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.config.data) {
        this.isEditMode = true;
        this.populateForm(this.config.data);
    }

    this.actualiteId = this.route.snapshot.paramMap.get('id');
    console.log("Actualite ID from route:", this.actualiteId); // Add this line to log the ID

    if (this.actualiteId) {
        this.isEditMode = true;
        this.actualiteService.getFormationById(+this.actualiteId).subscribe({
            next: (data: Formation) => this.populateForm(data),
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors du chargement' });
            }
        });
    }
}

  createForm(): void {
    this.actualiteForm = this.fb.group(
      { 
        id : [''],
        formationNom: ['', Validators.required],
        image: [''],
        description: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required],
      },
      { validators: this.dateValidator.bind(this) } // Ajout du validateur ici
    );
  }
  

  
  populateForm(actualite: Formation): void {
    this.actualiteForm.patchValue({
      ...actualite,
      dateDebut: actualite.dateDebut ? this.datePipe.transform(actualite.dateDebut, 'yyyy-MM-dd') : null,
      dateFin: actualite.dateFin ? this.datePipe.transform(actualite.dateFin, 'yyyy-MM-dd') : null
    });
    
    
  }
  
  dateValidator(group: FormGroup): { [key: string]: any } | null {
    const dateDebut = new Date(group.get('dateDebut')?.value);
    const dateFin = new Date(group.get('dateFin')?.value);
  
    if (dateDebut && dateFin && dateDebut > dateFin) {
      return { dateInvalide: true };
    }
    return null;
  }
  
  saveActualite(): void {
    if (this.actualiteForm.invalid) return;

    const actualiteData = this.actualiteForm.value;
    const id = actualiteData.id;  // Ensure the ID is coming from the form

    console.log("Updating formation with ID:", id); // Add this line to log the ID

    if (this.isEditMode) {
        this.actualiteService.updateFormation(id, actualiteData).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Actualité mise à jour' });
                
                this.navigateToActualiteList();
                this.ref.close();
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour' });
            }
        });
    } else {
        this.actualiteService.createFormation(actualiteData).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Actualité ajoutée' });
                this.navigateToActualiteList();
                this.ref.close();
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'ajout' });
            }
        });
    }
}
  

  navigateToActualiteList(): void {
    this.router.navigate(['/back-office/actualite-list']); // Change to the actual route you want to navigate to
  }

  closeModal(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post('http://localhost:8085/api/micro-formation/img/uploadFile', formData, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            console.log("Uploaded Successfully:", response);
            let url = response.substring(41);
            this.actualiteForm.get('image')?.setValue(response);
          },
          error: (error) => console.error("Upload Error:", error)
        });
    }
  }
}