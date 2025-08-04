import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GipyResponse } from '../interfaces/giphy.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifServiceService {

  private http_ = inject(HttpClient);

  constructor(){
    this.loadtrendingGifs();
  }

  loadtrendingGifs(){

    this.http_.get<GipyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key:environment.Giphyapikey,
        limit: 20
      }
    }).subscribe((resp)=>{

      console.log(resp);

    });

  }

}
