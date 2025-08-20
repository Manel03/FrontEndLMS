export interface Feedback {
  id?: number;
  commentaire: string;
  etoiles: number;
  inscritId?: number; // utile si tu veux l’envoyer séparément
}
