import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarEntity } from '../types/car-entity';
import { OwnerEntity } from '../types/owner-entity';

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;
  getOwnerById(aId: number): Observable<OwnerEntity>;
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<OwnerEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements ICarOwnersService {

  constructor(private http: HttpClient) { }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>('/api/owners');
  }
  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(`/api/owners/${aId}`)
  }
  createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    return this.http.post<OwnerEntity>('/api/owners', {
      firstName: aFirstName,
      lastName: aLastName,
      middleName: aMiddleName,
      cars: aCars,
    });
  }
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(`/api/owners/${aOwner.id}`, aOwner);
  }
  deleteOwner(aOwnerId: number): Observable<OwnerEntity> {
    return this.http.delete<OwnerEntity>(`/api/owners/${aOwnerId}`);
  }

}
