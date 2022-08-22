import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  @Output() blur: EventEmitter<string> = new EventEmitter();

  @Output() cancel: EventEmitter<void> = new EventEmitter();

  @Output() change: EventEmitter<string> = new EventEmitter();

  @Output() clear: EventEmitter<void> = new EventEmitter();

  @Output() focus: EventEmitter<void> = new EventEmitter();

  @Output() input: EventEmitter<string> = new EventEmitter();

  searchText: string = '';

  constructor() { }

  ngOnInit() { }

  onBlur(): void {
    this.blur.emit(this.searchText);
  }

  onCancel(): void {
    this.searchText = '';
    this.cancel.emit();
  }

  onChange(): void {
    this.change.emit(this.searchText);
  }

  onClear(): void {
    this.searchText = '';
    this.clear.emit();
  }

  onFocus(): void {
    this.focus.emit();
  }

  onInput(): void {
    this.input.emit(this.searchText);
  }

}
