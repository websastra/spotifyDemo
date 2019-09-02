import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from 'spotify-auth'
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Injectable()
export class InfoService {
  public albums: Array<any> = []; 
  private apiUserUrl: string = environment.apiUrl +  'me';
  private apiAlbumsUrl: string = environment.apiUrl + 'me/albums';
  private apiNewRelaseAlbumsUrl: string = environment.apiUrl + 'browse/new-releases?country=IT';
  private apiAlbumDetailUrl: string = environment.apiUrl +  'albums/';
  private apiArtist: string = environment.apiUrl +  'artists';
  private apiSearch: string = environment.apiUrl +  'search?query=';
  private apiGetPlayer: string = environment.apiUrl +  'me/player';

  private user: {} = {};
  private user$: BehaviorSubject<{}>;

  constructor(
    private http: HttpClient,
    private tokenSvc: TokenService,
    private router: Router) {
    this.user$ = new BehaviorSubject<{}>(this.user);
  }

  public fetchUserInfo(): Observable<{}> {
    let token = localStorage.getItem('token');    
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.apiUserUrl, {
      headers : headers_object
    }).pipe(
      tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelf'))
    );
  }

  public fetchUserAlbums(): Observable<{}>{
    let token = localStorage.getItem('token');    
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.apiAlbumsUrl, {
      headers : headers_object
    }).pipe(tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelfAlbums'))
    );
  }

  public fetchUserPlayer(): Observable<{}>{
    let token = localStorage.getItem('token');    
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.apiGetPlayer, {
      headers : headers_object
    }).pipe(tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelfAlbums'))
    );
  }

  public fetchNewAlbums(): Observable<{}>{
    let token = localStorage.getItem('token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.apiNewRelaseAlbumsUrl, {
      headers : headers_object
    }).pipe(tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelfNewAlbums'))
    );
  }

  public fetchArtist(): Observable<{}>{
    let token = localStorage.getItem('token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.apiArtist, {
      headers : headers_object
    }).pipe(tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelfArtist'))
    );
  }

  public fetchAlbumDetail(id): Observable<{}>{
    let token = localStorage.getItem('token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.apiAlbumDetailUrl + id + '/tracks', {
      headers : headers_object
    }).pipe(tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelfAlbumDetail'))
    );
  }

  getSearchStream(query: string, type = 'album'): Observable<{}> {
    let token = localStorage.getItem('token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(query ? this.apiSearch + query + '&offset=0&limit=20&type=' + type + '&market=IN' : this.apiNewRelaseAlbumsUrl, {
      headers : headers_object
    }).pipe(tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelfAlbumDetail'))
    );
  }
  public getUserStream(): Observable<{}> {
    return this.user$.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      (result as any) = error;
      return of(result as T);
    };
  }


}