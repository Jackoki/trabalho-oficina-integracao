import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Workshop {
  id: number;
  name: string;
  code: string;
  numberClasses: number;
  actualNumberClasses: number;
  isFinished: number;
  description: string;
}

export interface User {
  id: number;
  name: string;
  code: string;
  userType?: {
    id: number;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  private readonly API_BASE_URL = 'http://localhost:8080/workshops';

  constructor(private http: HttpClient) {}

  getAllWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.API_BASE_URL, { withCredentials: true }).pipe(
      map(ws => ws.map(w => ({ ...w, actualNumberClasses: w.actualNumberClasses ?? 0 })))
    );
  }

  getWorkshopsByUser(userId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.API_BASE_URL}/user/${userId}`, { withCredentials: true }).pipe(
      map(ws => ws.map(w => ({ ...w, actualNumberClasses: w.actualNumberClasses ?? 0 })))
    );
  }

  getWorkshopsByUserPaginated(userId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/user/${userId}?page=${page}&size=${size}`, { withCredentials: true }).pipe(
      map(p => ({ ...p, content: p.content.map((w: Workshop) => ({ ...w, actualNumberClasses: w.actualNumberClasses ?? 0 })) }))
    );
  }

  getUsersWorkshops(workshopId: number, typeId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/${workshopId}/users/by-type/${typeId}?page=${page}&size=${size}`, { withCredentials: true });
  }

  getUsersNotLinked(workshopId: number, typeId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/${workshopId}/users/not-linked/${typeId}?page=${page}&size=${size}`, { withCredentials: true });
  }

  getClassesDone(workshopId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/workshops/${workshopId}/classes/count`, { withCredentials: true });
  }

  linkUserToWorkshop(workshopId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.API_BASE_URL}/${workshopId}/users/${userId}/link`, {}, { withCredentials: true });
  }

  finalizeWorkshop(id: number): Observable<void> {
    return this.http.put<void>(`${this.API_BASE_URL}/${id}/finalize`, {}, { withCredentials: true });
  }

  deleteWorkshop(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/${id}`, { withCredentials: true });
  }

  removeUserFromWorkshop(workshopId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}/${workshopId}/users/${userId}`, { withCredentials: true });
  }
}
