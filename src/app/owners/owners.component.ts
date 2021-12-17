import { Component, OnInit } from '@angular/core';
import { CarOwnersService } from '../services/car-owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.sass']
})
export class OwnersComponent implements OnInit {

  constructor(private carOwners: CarOwnersService) { }

  ngOnInit(): void {
    this.carOwners.getOwners().subscribe({
      next: (value) => {
        console.log(value);
      }
    });
  }

  addNewOwner(){
    
  }

  

}
