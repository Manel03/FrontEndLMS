import { Injectable } from '@angular/core';
import { Presence } from '../models/Presence';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/Formation';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private apiUrl = 'http://localhost:8085/api/micro-formation/presences';
  private apiUrl2 = 'http://localhost:8085/api/micro-formation/inscriptions';  // adapte selon ton backend

  constructor(private http: HttpClient) {}

  // 👉 Enregistrer une nouvelle présence
  enregistrerPresence(presence: Presence): Observable<Presence> {
    return this.http.post<Presence>(this.apiUrl, presence);
  }

  // 👉 Récupérer toutes les présences d’un inscrit
  getPresencesByInscrit(inscritId: number): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${this.apiUrl}/inscrit/${inscritId}`);
  }

  // 👉 Calculer la progression d’un inscrit
  getProgression(inscritId: number, totalJours: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/progression/${inscritId}/${totalJours}`);
  }
  // 👉 Récupérer les présences par formation et date
getPresencesByFormationAndDate(formationId: number, date: string): Observable<Presence[]> {
  return this.http.get<Presence[]>(`${this.apiUrl}/formation/${formationId}/date/${date}`);
}


// estFormationTerminee(inscritId: number, totalJours: number): Observable<boolean> {
//   return this.http.get<boolean>(`${this.apiUrl}/terminees/${inscritId}/${totalJours}`);
// }
estFormationTerminee(userId: string): Observable<Formation[]> {
  const url = `${this.apiUrl2}/terminees/${userId}`;
  return this.http.get<Formation[]>(url);
}



}