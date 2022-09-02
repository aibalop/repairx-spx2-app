import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  @Output() search: EventEmitter<string> = new EventEmitter();

  searchText: string = '';

  constructor() { }

  ngOnInit() { }

  onChange(): void {
    this.search.emit(this.searchText);
  }

}
