import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-data',
  templateUrl: './not-found-data.component.html',
  styleUrls: ['./not-found-data.component.scss'],
})
export class NotFoundDataComponent implements OnInit {

  @Input() infoText: string = 'No se encontraron resultados...';

  constructor() { }

  ngOnInit() { }

}
