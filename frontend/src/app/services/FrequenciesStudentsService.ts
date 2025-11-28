import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly API_BASE_URL = 'http://localhost:8080/workshops';

  constructor(private http: HttpClient) {}

  getStudentFrequency(workshopId: number, userId: number): Observable<StudentFrequency> {
    return this.http.get<StudentFrequency>(`${this.API_BASE_URL}/${workshopId}/frequency/students/${userId}`, {
      withCredentials: true
    });
  }
}
