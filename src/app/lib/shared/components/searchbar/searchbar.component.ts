import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  @ViewChild('inputSearch', { static: false }) inputSearch;

  @Input() placeholder: string = 'Buscar';

  @Input() autofocus: boolean = false;

  @Output() search: EventEmitter<string> = new EventEmitter();

  @Output() searchOnEnter: EventEmitter<string> = new EventEmitter();

  @Output() cancelSearch: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.autofocus) {
      setTimeout(() => {
        this.inputSearch.setFocus();
      }, 300);
    }
  }

  onChange($event): void {
    this.search.emit($event.target.value);
  }

  onChangeOnEnter($event): void {
    this.searchOnEnter.emit($event.target.value);
  }

}
