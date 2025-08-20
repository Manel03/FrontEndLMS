import { InscritFormationUser } from "./InscritFormationUser";

export enum Categorie {
  FORMATIONS_TECHNIQUES = 'FORMATIONS_TECHNIQUES',
  NORMES_OUTILS_ET_STANDARDS = 'NORMES_OUTILS_ET_STANDARDS',
  FORMATIONS_EN_LANGUES = 'FORMATIONS_EN_LANGUES',
  FORMATIONS_EN_SOFT_SKILLS = 'FORMATIONS_EN_SOFT_SKILLS',
  GESTION_DE_PROJET_AGILITE = 'GESTION_DE_PROJET_AGILITE',
  AXE_TRANSVERSE = 'AXE_TRANSVERSE'
}

export enum Type {
  INTERNE = 'INTERNE',
  EXTERNE = 'EXTERNE'
}



export interface Formation {
  id: number;
  formationNom: string;
  image: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  reference:string;
  
  duree: number;
  categorie: Categorie;  // Utilisation de l'énumération Categorie
  formateur: string;
  placesDisponibles: number;
  certifiante: boolean;
  nbParticipants: number;
  heureDebut: string; // ex: "09:00:00"
  heureFin: string;   // ex: "17:00:00"
  endroit: string;
  type: Type;  // Utilisation de l'énumération Type
  inscriptions?: InscritFormationUser[];
}

