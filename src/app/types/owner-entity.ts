import { CarEntity } from "./car-entity";

export interface OwnerEntity {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  cars: CarEntity[];
}
