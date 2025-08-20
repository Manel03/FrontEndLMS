import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActualitemanagmentService } from '../../service/actualitemanagment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Categorie, Formation, Type } from '../../models/Formation';


@Component({
  selector: 'app-addedit-formation',
  templateUrl: './addedit-formation.component.html',
  styleUrls: ['./addedit-formation.component.scss']
})
export class AddeditFormationComponent implements OnInit {
  formationForm!: FormGroup;
  isEditMode: boolean = false;
  id: string | null = null;

  categorieOptions = Object.values(Categorie);
  typeOptions = Object.values(Type);

  constructor(
    private fb: FormBuilder,
    private actualiteService: ActualitemanagmentService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEditMode = true;
      this.actualiteService.getFormationById(+this.id).subscribe({
        next: (data: Formation) => this.populateForm(data),
        error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur chargement formation' })
      });
    }
  }

  createForm(): void {
    this.formationForm = this.fb.group({
      id: [''],
      formationNom: ['', Validators.required],
      image: [''],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      reference: ['', Validators.required],

      
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      
     
      duree: [0, Validators.required],
      categorie: ['', Validators.required],
      formateur: ['', Validators.required],
      placesDisponibles: [0, Validators.required],
      nbParticipants: [0],
      endroit: ['', Validators.required],
      certifiante: [false],
      type: ['', Validators.required],
      
    }, { validators: this.dateValidator });
  }

  populateForm(data: Formation): void {
    this.formationForm.patchValue({
      ...data,
      dateDebut: this.datePipe.transform(data.dateDebut, 'yyyy-MM-dd'),
      dateFin: this.datePipe.transform(data.dateFin, 'yyyy-MM-dd')
    });
  }

  dateValidator(group: FormGroup): { [key: string]: any } | null {
    const dateDebut = new Date(group.get('dateDebut')?.value);
    const dateFin = new Date(group.get('dateFin')?.value);
    return dateDebut && dateFin && dateDebut > dateFin ? { dateInvalide: true } : null;
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post('http://localhost:8085/api/micro-formation/img/uploadFile', formData, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            this.formationForm.get('image')?.setValue(response);
          },
          error: (err) => console.error("Erreur upload :", err)
        });
    }
  }

  saveFormation(): void {
    if (this.formationForm.invalid) return;

    const data = this.formationForm.value;

    if (this.isEditMode) {
      this.actualiteService.updateFormation(data.id, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Formation mise à jour' });
          this.router.navigate(['/back-office/formation-list']);
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour' })
      });
    } else {
      this.actualiteService.createFormation(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Formation ajoutée' });
          this.router.navigate(['/back-office/formation-list']);
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'ajout' })
      });
    }
  }
}
