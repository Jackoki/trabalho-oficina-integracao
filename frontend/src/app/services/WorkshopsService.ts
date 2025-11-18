import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Workshop {
  id: number;
  name: string;
  code: string;
  numberClasses: number;
  isFinished: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  private readonly API_BASE_URL = 'http://localhost:8080/workshops';

  constructor(private http: HttpClient) {}

  getWorkshopsByUser(userId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.API_BASE_URL}/user/${userId}`, { withCredentials: true });
  }

  getAllWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.API_BASE_URL, { withCredentials: true });
  }

  deleteWorkshop(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`, { withCredentials: true });
  }

  finalizeWorkshop(id: number): Observable<void> {
    return this.http.put<void>(
      `${this.API_BASE_URL}/${id}/finalize`,
      {},
      { withCredentials: true }
    );
  }
}
