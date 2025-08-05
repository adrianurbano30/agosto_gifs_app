import { Gif } from './../interfaces/gif.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GipyResponse } from '../interfaces/giphy.interfaces';
import { Gifmapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


const loadfromLocalSTORAGE = ()=>{



   if (typeof window !== 'undefined' && localStorage) {
    const giffromlocalstorage = localStorage.getItem('gifs') ?? '{}';
    const gifs = JSON.parse(giffromlocalstorage)
    return gifs;
    // const data = localStorage.getItem('mis-gifs');
    // return data ? JSON.parse(data) : [];
  }

  return [];
};




@Injectable({
  providedIn: 'root'
})
export class GifServiceService {

  private http_ = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsloading = signal<boolean>(true);

  searchHistory = signal<Record<string,Gif[]>>(loadfromLocalSTORAGE());
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

  constructor(){
    this.loadtrendingGifs();
  }

  saveGisToLocalStorage = effect(()=>{
      const historyString = JSON.stringify(this.searchHistory());



        localStorage.setItem('gifs',historyString);


    });

  loadtrendingGifs(){

    this.http_.get<GipyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key:environment.Giphyapikey,
        limit: 20
      }
    }).subscribe((resp)=>{

      const gifs = Gifmapper.mapGiphyItemsArrToGifArr(resp.data);

      this.trendingGifs.set(gifs);
      this.trendingGifsloading.set(false);
    });

  }

  searchGifs(busqueda:string):Observable<Gif[]> {

   return this.http_.get<GipyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params:{
        api_key:environment.Giphyapikey,
        limit: 20,
        q:busqueda
      }
    }).pipe(
      map(({data})=> Gifmapper.mapGiphyItemsArrToGifArr(data)),
      tap((items)=>{
        this.searchHistory.update((history)=>({
          ...history,
          [busqueda.toLowerCase()]:items,
        }) )
      })
    );
  }

  getHistoryGifs(buscado:string):Gif[] {
    return this.searchHistory()[buscado] ?? [];
  }


}
