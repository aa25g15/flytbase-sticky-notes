import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  saveInLocalStorage(key: string, value: string){
    window.localStorage.setItem(key, value);
  }

  getItemLocalStorage(key: string){
    return window.localStorage.getItem(key);
  }

  removeItemLocalStorage(key: string){
    window.localStorage.removeItem(key);
  }

  selectRandomFromArray(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
