import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RollCallRequest {
  userId: number;
  isPresent: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class RollCallService {
  private readonly API_BASE_URL = 'http://localhost:8080/classes';

  constructor(private http: HttpClient) {}

  saveRollCall(classId: number, attendances: RollCallRequest[]): Observable<void> {
    return this.http.post<void>(
      `${this.API_BASE_URL}/${classId}/frequencies/save-rollcall`,
      attendances,
      { withCredentials: true }
    );
  }
}
