import { AbstractControl } from "@angular/forms"
import { map } from "rxjs/operators"
import { OwnerEntity } from "../types/owner-entity"

export function carNumberValidator(this: any, 
  control: AbstractControl
) {
  return this.getOwners().pipe(
    map((owners: OwnerEntity[]) => {
      const carNumbers = owners.flatMap((owner) => owner.cars).map((car) => car.carNumber);

      return carNumbers.includes(control.value) ? { carNumber: true } : null
    })
  )
}