import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/Spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.verficiarTokenUrlCallback();
  }

  verficiarTokenUrlCallback() {
    const token = this.spotifyService.obterTokenUrlCallback();

    if (!!token) {
      this.spotifyService.definirAccessToken(token);
    }
  }

  abrirPaginaLogin() {
    window.location.href = this.spotifyService.obterUrlLogin();
  }
}
