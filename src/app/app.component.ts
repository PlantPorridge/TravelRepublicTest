import { Component, OnInit } from '@angular/core';
import { IEstablishment } from 'app/interfaces/establishment.interface';
import * as establishmentsData from '../assets/New Front End Tech Test/hotels.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filteredAndOrderedEstablishments: IEstablishment[];
  establishments: IEstablishment[];

  ngOnInit(): void {
    this.filteredAndOrderedEstablishments = this.establishments = <IEstablishment[]>(<any>establishmentsData).Establishments;
    this.computeUserRatingRange(this.establishments);
    this.computePriceRange(this.establishments);
  }

  selectedOrder: OrderOption;
  orderOptions: OrderOption[] = [
    { name: "", ascending: true, property: null },    
    { name: "Distance (nearest)", ascending: true, property: 'Distance' },
    { name: "Distance (furthest)", ascending: false, property: 'Distance' },
    { name: "Stars (lowest first)", ascending: true, property: 'Stars' },
    { name: "Stars (highest first)", ascending: false, property: 'Stars' },
    { name: "Cost (lowest first)", ascending: true, property: 'MinCost' },
    { name: "Cost (highest first)", ascending: false, property: 'MinCost' },
    { name: "User Rating (lowest first)", ascending: true, property: 'UserRating' },
    { name: "User Rating (highest first)", ascending: false, property: 'UserRating' }
  ];

  selectedOrderChange($event: OrderOption) {
    this.selectedOrder = $event;
    this.filterAndOrderEstablishments();
  }

  filterText: string = '';
  filterTextChange($event: any) {
    this.filterText = $event;
    this.debounceFilterAndOrderEstablishments();
  }

  selectedStarFilter: FilterOption;
  starOptions: FilterOption[] = [
    { name: "", value: null },
    { name: "0 Stars", value: 0 },
    { name: "1 Star", value: 1 },
    { name: "2 Stars", value: 2 },
    { name: "3 Stars", value: 3 },
    { name: "4 Stars", value: 4 },
    { name: "5 Stars", value: 5 },
  ]
  selectedStarFilterChange($event: FilterOption) {
    this.selectedStarFilter = $event;
    this.filterAndOrderEstablishments();
  }

  userRatingRange: number[];
  minUserRating: number = 0;
  maxUserRating: number = 1;
  userRatingRangeChange(event: number[]) {
    this.userRatingRange = event;
    this.debounceFilterAndOrderEstablishments();
  }

  costRange: number[];
  minCost: number = 0;
  maxCost: number = 1;
  costRangeChange(event: number[]) {
    this.costRange = event;
    this.debounceFilterAndOrderEstablishments()
  }

  computeUserRatingRange(array: IEstablishment[]) {
    let range = this.computeRange(array, "UserRating");

    if (range) {
      this.minUserRating = range[0];
      this.maxUserRating = range[1];
    }

    if (!this.userRatingRange) {
      this.userRatingRange = [this.minUserRating, this.maxUserRating];
    }
  }

  computePriceRange(array: IEstablishment[]) {
    let range = this.computeRange(array, "MinCost");

    if (range) {
      this.minCost = range[0];
      this.maxCost = range[1];
    }

    if (!this.costRange) {
      this.costRange = [this.minCost, this.maxCost];
    }
  }

  computeRange(array: IEstablishment[], property: string): number[] {
    if (array.length < 1) {
      return null;
    }

    let initialValue = (<any>array[0])[property];
    let min = initialValue;
    let max = initialValue;
    array.forEach((v) => {
      let value = (<any>v)[property];
      if (value < min) { min = value; }
      else if (value > max) { max = value; }
    })

    return [min, max];
  }


  filterAndOrderEstablishments() {
    let filtered = this.filterOnText(this.establishments);
    filtered = this.filterOnStars(filtered);
    filtered = this.filterOnUserRating(filtered);
    filtered = this.filterOnCost(filtered);

    this.filteredAndOrderedEstablishments = this.order(filtered);
  }

  //Debounce for 400ms to allow users to settle on a value when using inputs that may change value quickly.
  //E.g. allows multiple characters to be typed before initiating a filter and order.
  timeout: any;  
  debounceFilterAndOrderEstablishments: () => void = () => {
    var later = () => {
      this.timeout = null;
      this.filterAndOrderEstablishments();
    };
    clearTimeout(this.timeout);
    this.timeout = setTimeout(later, 400);
  };

  filterOnText(array: IEstablishment[]): IEstablishment[] {
    if (this.filterText == null) return array;

    return array.filter((a, index) => {
      return a.Name.toLowerCase().includes(this.filterText.toLowerCase());
    });
  }

  filterOnStars(array: IEstablishment[]): IEstablishment[] {
    if (this.selectedStarFilter == null || this.selectedStarFilter.value == null) return array;

    return array.filter((a, index) => {
      return a.Stars == this.selectedStarFilter.value;
    })
  }

  filterOnUserRating(array: IEstablishment[]): IEstablishment[] {
    return array.filter((a, index) => {
      return a.UserRating >= this.userRatingRange[0] && a.UserRating <= this.userRatingRange[1];
    })
  }

  filterOnCost(array: IEstablishment[]): IEstablishment[] {
    return array.filter((a, index) => {
      return a.MinCost >= this.costRange[0] && a.MinCost <= this.costRange[1];
    })
  }

  order(array: IEstablishment[]): IEstablishment[] {
    if (!this.selectedOrder || this.selectedOrder.property == null) return array;

    array.sort((a, b) => {
      let aValue = (<any>a)[this.selectedOrder.property];
      let bValue = (<any>b)[this.selectedOrder.property];

      if (aValue == bValue) return 0;

      let n = aValue < bValue ? -1 : 1;

      return n * (this.selectedOrder.ascending ? 1 : -1);
    });

    return array;
  }





}

export class OrderOption {
  public name: string;
  public ascending: boolean;
  public property: string;
}

export class FilterOption {
  public name: string;
  public value: number;
}