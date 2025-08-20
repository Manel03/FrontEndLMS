import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/Feedback';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8085/api/micro-formation/feedbacks';

  constructor(private http: HttpClient) {}

  ajouterFeedback(inscritId: number, feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/${inscritId}`, feedback);
  }
}