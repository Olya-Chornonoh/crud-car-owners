import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarOwnersService } from '../services/car-owners.service';
import { OwnerEntity } from '../types/owner-entity';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.sass']
})
export class OwnersComponent implements OnInit {

  owners: OwnerEntity[] = [];
  selectedIndex?: number;

  constructor(private carOwners: CarOwnersService, private router: Router) { }

  ngOnInit(): void {
    this.fetchOwners();
  }

  private fetchOwners() {
    this.carOwners.getOwners().subscribe({
      next: (value) => {
        this.owners = value;
      }
    });
  }

  addNewOwner(): void {
    this.router.navigateByUrl('/new-owner');
  }

  deleteOwner() {
    if (!this.selectedIndex) return;

    this.carOwners.deleteOwner(this.owners[this.selectedIndex].id).subscribe({
      next: () => {
        this.fetchOwners();
        this.selectedIndex = undefined;
      }
    });
  }

  editOwner() {
    if(this.selectedIndex === undefined) return;

    this.router.navigateByUrl(`/owner/${this.owners[this.selectedIndex].id}`);
  }

  viewOwner() {
    if(this.selectedIndex === undefined) return;

    this.router.navigateByUrl(`/owner/${this.owners[this.selectedIndex].id}`);
  }
}
