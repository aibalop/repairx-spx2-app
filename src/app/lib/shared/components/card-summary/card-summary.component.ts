import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card-summary.component.html',
  styleUrls: ['./card-summary.component.scss'],
})
export class CardSummaryComponent implements OnInit {

  @Input() title: string;

  @Input() value: number;

  @Input() icon: string;

  @Input() isMoneyFormat: boolean = false;

  constructor() { }

  ngOnInit() { }

}
