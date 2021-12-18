import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { OwnerEntity } from '../types/owner-entity';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService extends InMemoryDbService {

  constructor() {
    super();
  }

  createDb(): { owners: OwnerEntity[] } {
    const owners = [
      {
        id: 1, firstName: 'Ivan', lastName: 'Ivanov', middleName: 'Ivanov', cars: [
          { carNumber: 'AX1111HP', brand: 'toyota', model: 'test', year: 2018 },
          { carNumber: 'AX2222HP', brand: 'toyota', model: 'test1', year: 2019 },
        ],
      },
      {
        id: 2, firstName: 'Olha', lastName: 'Ivanov', middleName: 'Anatolivna', cars: [
          { carNumber: 'AA1111PP', brand: 'toyota', model: 'test2', year: 2018 },
          { carNumber: 'AX2222HH', brand: 'toyota', model: 'test3', year: 2019 },
        ],
      },
    ];
    return { owners };
  }
}
