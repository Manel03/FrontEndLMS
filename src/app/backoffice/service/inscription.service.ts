import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InscritFormationUser } from '../models/InscritFormationUser';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private apiUrl = 'http://localhost:8085/api/micro-formation/inscriptions'; // change le port si nécessaire

  constructor(private http: HttpClient) {}

  // Récupérer toutes les inscriptions (optionnellement avec des filtres)
  getInscriptions(userId?: string, validateurId?: string, formationId?: number): Observable<any[]> {
    let params = new HttpParams();
    if (userId) params = params.set('userId', userId);
    if (validateurId) params = params.set('validateurId', validateurId);
    if (formationId !== undefined && formationId !== null) params = params.set('formationId', formationId.toString());

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // Récupérer une inscription par ID
  getInscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle inscription
  createInscription(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Mettre à jour une inscription
  updateInscription(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Supprimer une inscription
  deleteInscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAllInscriptions(params : any): Observable<InscritFormationUser[]> {
    return this.http.get<InscritFormationUser[]>(`${this.apiUrl}`,{params });
  }

  // Inscription directe par RH
inscrireDirectementParRH(inscription: InscritFormationUser): Observable<InscritFormationUser> {
  return this.http.post<InscritFormationUser>(
    `${this.apiUrl}/inscription-directe-rh`, 
    inscription
  );
}

 // Nouvelle méthode pour récupérer la progression d'une inscription par son ID
  getProgressionPourInscrit(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/progression`);
  }

 
getProgressionParUtilisateur(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
}

}