import { Formation } from "./Formation";
import { User } from "./User";

export enum EtatInscription {
    EN_ATTENTE = 'EN_ATTENTE',
    ACCEPTE = 'ACCEPTE',
    REJETER = 'REJETER',
    // ajoute d'autres états si nécessaire
  }
  
  export interface InscritFormationUser {
    id?: number;
    dateInscription: Date;
    formation: Formation;
    etat: string;
    userId: string;
    validateurId: string;
    nextValidateurId: string;
    validateurs: string[];
    isValideRh: boolean;
    isValideManager: boolean;
    motif: string;
    isValidAvecCertif: boolean;
    user?: User;
  }