import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  site: string = '';
  siteEs: string = '';

  constructor() { }

  setSite(newSite:string):void{
    this.site = newSite;
  }

  getSite():string {
    return this.site;
  }
  setSiteEs(newSite:string):void{
    this.siteEs = newSite;
  }

  getSiteEs():string {
    return this.siteEs;
  }
}
