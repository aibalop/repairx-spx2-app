import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/lib/core/services/session.service';
import { ThemeService } from 'src/app/lib/core/services/theme.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  darkMode: boolean = false;

  constructor(
    private readonly _themeService: ThemeService,
    public sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.darkMode = this._themeService.isDarkMode;
  }

  onToggleTheme(): void {
    if (this.darkMode === this._themeService.isDarkMode) {
      return;
    }
    this._themeService.isDarkMode = this.darkMode;
  }

}
