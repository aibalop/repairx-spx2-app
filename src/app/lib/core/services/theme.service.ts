import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _darkMode = new BehaviorSubject<string>('');

  constructor(
    private _store: LocalStoreService
  ) { }

  set isDarkMode(active: boolean) {
    if (active) {
      this._store.setItem('theme', 'dark');
    } else {
      this._store.removeItem('theme');
    }
    this._darkMode.next(active ? 'dark' : '');
    this._toggleDarkMode();
  }

  get isDarkMode(): boolean {
    return this._darkMode.getValue() ? true : false;
  }

  async checkTheme(): Promise<void> {
    const theme = await this._store.getItem('theme');
    this._darkMode.next(theme ?? '');
    if (this.isDarkMode) {
      this._toggleDarkMode();
    }
  }

  private _toggleDarkMode(): void {
    const bodyTag = document.body;
    bodyTag.classList.toggle('dark');
  }
}
