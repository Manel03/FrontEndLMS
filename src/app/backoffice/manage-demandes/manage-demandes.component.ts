import { Component } from '@angular/core';
import { InscritFormationUser } from '../models/InscritFormationUser';
import { InscriptionService } from '../service/inscription.service';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';
import { UserManagementService } from '../service/user-management.service';
import { User, UserDetails } from '../models/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-manage-demandes',
  templateUrl: './manage-demandes.component.html',
  styleUrls: ['./manage-demandes.component.scss']
})
export class ManageDemandesComponent {
  inscriptions: InscritFormationUser[] = [];

  demandesAValider: InscritFormationUser[] = [];
  demandesValidees: InscritFormationUser[] = [];

  user!: UserProfile;
  manager!: UserDetails;
  // Pour la gestion du modal de motif
  displayMotifDialog: boolean = false;
  motif: string = '';
  selectedInscription!: InscritFormationUser;
  displayDetailsDialog: boolean = false;
  demandeForm!: FormGroup;
  isRejet = false;
  roles?: String[];



  constructor(private inscriptionService: InscriptionService,
    private keycloakService: KeycloakService,
    private userManagementService: UserManagementService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.user = this.keycloakService.profile!;
    this.loadInscriptions();
    this.getManager()
    this.demandeForm = this.fb.group({
    userId: [''],
    formationNom: [''],
    dateInscription: [''],
    etat: [''],
    validateurId: [''],
    motif: [''],
    isValidAvecCertif: [],
    isValideRh: [],
    isValideManager: []
  });
  }


  loadInscriptions(): void {
    if(this.user && this.user.id){
      this.userManagementService.getUserById(this.user.id).subscribe({
        next: (res:User) => {
          this.roles = res.details?.roles;
          const toValide = this.roles?.includes('ROLE_RH') ? {
            etat: ["EN_ATTENTE_RH"]
          } : {
            validateurId: this.user.id,
            etat: ["EN_ATTENTE_MANAGER", "EN_ATTENTE_SUPERIEUR"]
          }

          const alreadyValidated = {
            validateurs: this.user.id
          };

          // Demandes à valider maintenant
          this.inscriptionService.getAllInscriptions(toValide).subscribe(data => {
            this.demandesAValider = data;
          });

          // Demandes déjà validées
          this.inscriptionService.getAllInscriptions(alreadyValidated).subscribe(data => {
            this.demandesValidees = data;
          });
              
        }
      });
    }
    
  }







  valider(inscription: InscritFormationUser) {



    inscription.etat = "VALIDEE_PARTIELLEMENT";
    inscription.validateurId = this.user.id!;
    inscription.nextValidateurId = this.manager?.userUuid;
    inscription.isValidAvecCertif = true;
    this.inscriptionService.updateInscription(inscription.id!, inscription).subscribe(data => {
      this.loadInscriptions();
    });


    console.log('Validation de:', inscription);

  }

  confirmerRejet() {
    if (!this.motif.trim()) {
      alert("Le motif est requis !");
      return;
    }

    this.selectedInscription.etat = 'REJETER';
    this.selectedInscription.motif = this.motif;
    this.selectedInscription.validateurId = this.user.id!;
    this.selectedInscription.isValideRh = false;
    this.selectedInscription.isValideManager = false;

    this.inscriptionService.updateInscription(this.selectedInscription.id!, this.selectedInscription).subscribe({
      next: () => {
        this.loadInscriptions();
        this.displayMotifDialog = false;
      },
      error: (err) => {
        console.error('Erreur lors du rejet de la demande :', err);
      }
    });
  }

  rejeter(inscription: InscritFormationUser) {
    this.selectedInscription = inscription;
    this.motif = '';
    this.displayMotifDialog = true; // Ouvre le modal
  }




  getManager() {
    this.userManagementService.getMangersByUser(this.user.id!).subscribe({
      next: (res: UserDetails[]) => {
        if (res && res.length > 0) {
          this.manager = res[0];
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des managers:', err);
      }
    });
  }
  showDetails(inscription: InscritFormationUser) {
  this.selectedInscription = inscription;
  this.displayDetailsDialog = true;

  this.demandeForm?.patchValue({
    userId: inscription.userId,
    formationNom: inscription.formation?.formationNom || '',
    dateInscription: inscription.dateInscription,
    etat: inscription.etat,
    validateurId: inscription.validateurId,
  });
}
onSubmitDemande() {
  // Traitez la soumission du formulaire ici
  console.log('Formulaire soumis avec les données:', this.demandeForm?.value);
  // Vous pouvez également effectuer d'autres actions, comme envoyer les données à un service
  let demande ;
  if(this.selectedInscription.etat === "EN_ATTENTE_RH" && this.demandeForm.value.isValideRh === false ){
    demande = {
      etat : "REJETEE_PAR_RH",
      validateurId : this.user.id,
      motif : this.demandeForm.value.motif,
    }
  }
  if(this.selectedInscription.etat === "EN_ATTENTE_MANAGER" && this.demandeForm.value.isValideManager === false ){
    demande = {
      etat : "REJETEE_PAR_MANAGER",
      validateurId : this.user.id,
      motif : this.demandeForm.value.motif,
    }
  }
  if(this.selectedInscription.etat === "EN_ATTENTE_RH" && this.demandeForm.value.isValideRh === true ){
    demande = {
      etat : "EN_ATTENTE_MANAGER",
      isValidAvecCertif : this.demandeForm.value.isValidAvecCertif,
      nextValidateurId : this.selectedInscription.validateurId,
      validateurId : this.user.id,
    }
  }
  if(this.selectedInscription.etat === "EN_ATTENTE_MANAGER" && this.demandeForm.value.isValideManager === true ){
    if(this.manager == null){
      demande = {
        etat : "APPROUVEE",
        validateurId : this.user.id,
        isValidAvecCertif : this.demandeForm.value.isValidAvecCertif,
      }
    }
    else{
      demande = {
        etat : "EN_ATTENTE_SUPERIEUR",
        isValidAvecCertif : this.demandeForm.value.isValidAvecCertif,
        nextValidateurId : this.manager.userUuid,
        validateurId : this.user.id
      }
    }
  }
  if(this.selectedInscription.etat === "EN_ATTENTE_SUPERIEUR" && this.demandeForm.value.isValideManager === false ){
    demande = {
      etat : "REJETEE_PAR_SUPERIEUR",
      validateurId : this.user.id,
      motif : this.demandeForm.value.motif,
    }
  }
  if(this.selectedInscription.etat === "EN_ATTENTE_SUPERIEUR" && this.demandeForm.value.isValideManager === true ){
    if(this.manager == null){
      demande = {
        etat : "APPROUVEE",
        validateurId : this.user.id,
        isValidAvecCertif : this.demandeForm.value.isValidAvecCertif,
      }
    }else{
      demande = {
        etat : "EN_ATTENTE_SUPERIEUR",
        isValidAvecCertif : this.demandeForm.value.isValidAvecCertif,
        nextValidateurId : this.manager.userUuid,
        validateurId : this.user.id
      }
    }
  }
  this.inscriptionService.updateInscription(this.selectedInscription.id!, demande).subscribe({
    next: () => {
      this.loadInscriptions();
      this.displayDetailsDialog = false; // Ferme le modal après la soumission
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour de la demande :', err);
    }
  });
  this.displayDetailsDialog = false; // Ferme le modal après la soumission

}





}
