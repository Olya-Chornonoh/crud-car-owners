import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarOwnersService } from '../services/car-owners.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.sass']
})
export class OwnerComponent implements OnInit {

  firstName = new FormControl('');
  lastName = new FormControl('');
  middleName = new FormControl('');
  cars = new FormArray([]);
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
                    carNumber: new FormControl(value.cars[i].carNumber),
                    brand: new FormControl(value.cars[i].brand),
                    model: new FormControl(value.cars[i].model),
                    year: new FormControl(value.cars[i].year),
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
          carNumber: new FormControl(''),
          brand: new FormControl(''),
          model: new FormControl(''),
          year: new FormControl(''),
        }
      ));
  }

  deleteCar(selectedIndex: number) {
    this.cars.removeAt(selectedIndex);
  }

}
