import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Frequency {
  id: number;
  isPresent: boolean;
  userId: number;
  classId: number;
}

@Injectable({
  providedIn: 'root'
})

export class FrequenciesService {
  private readonly API_BASE_URL = 'http://localhost:8080/classes';

  constructor(private http: HttpClient) {}

  getFrequenciesByClass(classId: number): Observable<Frequency[]> {
    return this.http.get<Frequency[]>(`${this.API_BASE_URL}/${classId}/frequencies`, {
      withCredentials: true
    });
  }

  saveOrUpdateFrequency(classId: number, userId: number, isPresent: boolean): Observable<Frequency> {
    return this.http.post<Frequency>(`${this.API_BASE_URL}/${classId}/frequencies`, null, {
      params: {
        userId,
        isPresent
      },
      withCredentials: true
    });
  }

  deleteFrequency(classId: number, frequencyId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${classId}/frequencies/${frequencyId}`, {
      withCredentials: true
    });
  }
}
