import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { AppConfig } from '../constants/appConfig';
import { HelperService } from './helper.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Urls } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  wallpapersData: any;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService
  ) { }

  getSearchQueryWallpapers(searchquery: string) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', environment.PEXELS_API_KEY);
      let params = new HttpParams()
        .set("query", searchquery)
        .set("orientation", AppConfig.BACKGROUND_IMAGE_ORIENTATION)
        .set("size", AppConfig.BACKGROUND_IMAGE_SIZE)
        .set("per_page", AppConfig.BACKGROUND_IMAGE_PAGE_SIZE)

      this.httpService.getRequestObservable(Urls.PEXELS_IMAGE_SEARCH, params, headers).subscribe((data: any) => {
        this.wallpapersData = data;
        this.helperService.saveInLocalStorage("wallpapersData", JSON.stringify(data));
        resolve(data);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  changeWallpaper() {
    const wallpaperDataLocalStorage = this.helperService.getItemLocalStorage("wallpapersData");
    const mainContainer: HTMLElement | null = document.getElementById("main-container-id");

    if (mainContainer) {
      if (this.wallpapersData) {
        mainContainer.style.backgroundImage = `url(${this.selectRandomFromArray(this.wallpapersData.photos).src.original})`;
      }
      else if (wallpaperDataLocalStorage) {
        this.wallpapersData = JSON.parse(wallpaperDataLocalStorage);
        mainContainer.style.backgroundImage = `url(${this.selectRandomFromArray(this.wallpapersData.photos).src.original})`;
      }
      else {
        this.getSearchQueryWallpapers(AppConfig.BACKGROUND_WALLPAPER_SEARCH_QUERY).then(() => {
          mainContainer.style.backgroundImage = `url(${this.selectRandomFromArray(this.wallpapersData.photos).src.original})`;
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

  selectRandomFromArray(array: any[]) {
    return this.helperService.selectRandomFromArray(array);
  }
}
