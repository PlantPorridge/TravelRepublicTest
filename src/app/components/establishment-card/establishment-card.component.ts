import { Component, OnInit, Input } from '@angular/core';
import { IEstablishment } from 'app/interfaces/establishment.interface';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.css'],
  host: {'class':'elevation'}
})
export class EstablishmentCardComponent implements OnInit {

  @Input() establishment: IEstablishment

  constructor() { }

  ngOnInit() {
  }

}
