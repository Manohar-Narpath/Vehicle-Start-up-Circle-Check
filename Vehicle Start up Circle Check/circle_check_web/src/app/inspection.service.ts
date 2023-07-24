import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private url = 'http://localhost:3000/api/inspections';

  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get(this.url);
  }

  getAll() {
    return this.httpClient.get(this.url);
  }

  add(payload: Record<string, any>) {
    return this.httpClient.post(this.url, payload);
  }

  update(id: string, vehicle: Vehicle) {
    return this.httpClient.put(`${this.url}/${id}`, vehicle);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
