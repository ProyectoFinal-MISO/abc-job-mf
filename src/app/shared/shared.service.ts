import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Country } from './model/country';
import { HttpClient } from '@angular/common/http';
import { ProfessionalSector } from './model/professional-sector';
import { EducationLevel } from './model/education-level';
import { LanguageDto } from './model/languageDto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  site: string = '';
  siteEs: string = '';

  constructor(private http: HttpClient) { }

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

  getCountries(): Observable<Array<Country>>{
    return this.http.get<Array<Country>>(`/api/users/location/countries`);
  }

  getStatesByCountry(countryId:number): Observable<Array<Country>>{
    return this.http.get<Array<Country>>(`/api/users/location/states/${countryId}`);
  }

  getCitiesByState(stateId:number): Observable<Array<Country>>{
    return this.http.get<Array<Country>>(`/api/users/location/cities/${stateId}`);
  }

  getTypesIdentification(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`/api/users/types_documents`);
  }

  getGenres(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`/api/users/genders`);
  }

  getProfessionalSectors(): Observable<Array<ProfessionalSector>>{
    return this.http.get<Array<ProfessionalSector>>(`/api/users/professional_sector`);
  }

  getEducationLevels(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`/api/users/education_levels`);
  }

  getLanguages(): Observable<Array<LanguageDto>>{
    return this.http.get<Array<LanguageDto>>(`/api/users/language`);
  }
}
