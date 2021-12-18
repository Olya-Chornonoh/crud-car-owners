import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarOwnersService } from '../services/car-owners.service';
import { carNumberValidator } from '../validators/car-number.validator';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.sass']
})
export class OwnerComponent implements OnInit {

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  middleName = new FormControl('', [Validators.required]);
  cars = new FormArray([], [Validators.required]);
  id?: number;

  constructor(private carsOwner: CarOwnersService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.id = parseInt(params['id']);
          this.carsOwner.getOwnerById(params['id']).subscribe({
            next: (value) => {
              this.lastName.setValue(value.lastName);
              this.firstName.setValue(value.firstName);
              this.middleName.setValue(value.middleName);

              for (let i = 0; i < value.cars.length; i++) {
                this.cars.push(new FormGroup(
                  {
                    carNumber: new FormControl(value.cars[i].carNumber, [
                      Validators.required,
                      Validators.pattern(/[A-Z]{2}[0-9]{4}[A-Z]{2}/),
                    ], [carNumberValidator.bind(this.carsOwner)]),
                    brand: new FormControl(value.cars[i].brand, [Validators.required]),
                    model: new FormControl(value.cars[i].model, [Validators.required]),
                    year: new FormControl(value.cars[i].year, [
                      Validators.required,
                      Validators.min(1990),
                      Validators.max(new Date().getFullYear())
                    ]),
                  }
                ));
              }
            }
          });
        }
        else {
          this.addNewCar();
        }
      }
    });
  }

  back(): void {
    this.location.back();
  }

  addNewOwner() {
    if (this.id !== undefined) {
      this.carsOwner.editOwner({
        id: this.id,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        middleName: this.middleName.value,
        cars: this.cars.value,
      }).subscribe({
        next: () => {
          this.back();
        }
      })
    } else {
      this.carsOwner.createOwner(this.lastName.value,
        this.firstName.value,
        this.middleName.value,
        this.cars.value).subscribe({
          next: () => {
            this.back();
          }
        });
    }
  }

  addNewCar() {
    this.cars.push(
      new FormGroup(
        {
          carNumber: new FormControl('', [
            Validators.required,
            Validators.pattern(/[A-Z]{2}[0-9]{4}[A-Z]{2}/)
          ], [carNumberValidator.bind(this.carsOwner)]),
          brand: new FormControl('', [Validators.required]),
          model: new FormControl('', [Validators.required]),
          year: new FormControl('', [
            Validators.required,
            Validators.min(1990),
            Validators.max(new Date().getFullYear())
          ]),
        }
      ));
  }

  deleteCar(selectedIndex: number) {
    this.cars.removeAt(selectedIndex);
  }

}
