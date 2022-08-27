import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.page.html',
  styleUrls: ['./charges.page.scss'],
})
export class ChargesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onAdd(): void {
    console.log('Se dio click en agregar');
  }

  onSearch($event: string): void {
    console.log($event);
  }

  onUpdate(): void {
    console.log('OnUpdate');
  }

  onDelete(): void {
    console.log('OnDelete');
  }

}
