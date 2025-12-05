import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StudentFrequency {
  id: number;
  frequency: number;
  isApproved: boolean;
  userId: number;
  workshopId: number;
}

@Injectable({
  providedIn: 'root'
})

export class FrequenciesStudentsService {
  private readonly API_BASE_URL = `${environment.apiBaseUrl}/workshops`;;

  constructor(private http: HttpClient) {}

  getStudentFrequency(workshopId: number, userId: number): Observable<StudentFrequency> {
    return this.http.get<StudentFrequency>(`${this.API_BASE_URL}/${workshopId}/frequency/students/${userId}`, {
      withCredentials: true
    });
  }
}
