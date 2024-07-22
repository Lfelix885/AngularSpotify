import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environments';
import Spotify from 'spotify-web-api-js';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyUserParaUsuario } from '../common/spotifyHelper';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private spotifyApi: Spotify.SpotifyWebApiJs = null;
  private usuario: IUsuario;

  constructor(private http: HttpClient) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario) {
      return true;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUser();

      return !!this.usuario;
      
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async obterSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scopes=${JSON.stringify(SpotifyConfiguration.scopes)}&`;
    const responseType = 'response_type=token&show_dialog=true';

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');
    console.log(params[0].split('=')[1]);
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}
