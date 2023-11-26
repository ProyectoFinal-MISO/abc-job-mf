import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Country } from './model/country';
import { HttpClient } from '@angular/common/http';
import { ProfessionalSector } from './model/professional-sector';
import { EducationLevel } from './model/education-level';
import { LanguageDto } from './model/languageDto';
import { environment } from 'src/environments/environment';
import { Role } from './model/role';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  site: string = '';
  siteEs: string = '';
  private urlUsers:string = environment.baseUrlUsers;
  private urlProjects:string = environment.baseUrlProjects;

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
    return this.http.get<Array<Country>>(`${this.urlUsers}/location/countries`);
  }

  getStatesByCountry(countryId:number): Observable<Array<Country>>{
    return this.http.get<Array<Country>>(`${this.urlUsers}/location/states/${countryId}`);
  }

  getCitiesByState(stateId:number): Observable<Array<Country>>{
    return this.http.get<Array<Country>>(`${this.urlUsers}/location/cities/${stateId}`);
  }

  getTypesIdentification(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${this.urlUsers}/types_documents`);
  }

  getGenres(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${this.urlUsers}/genders`);
  }

  getProfessionalSectors(): Observable<Array<ProfessionalSector>>{
    return this.http.get<Array<ProfessionalSector>>(`${this.urlUsers}/professional_sector`);
  }

  getEducationLevels(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${this.urlUsers}/education_levels`);
  }

  getLanguages(): Observable<Array<LanguageDto>>{
    return this.http.get<Array<LanguageDto>>(`${this.urlUsers}/language`);
  }

  getRoles(): Observable<Array<Role>>{
    return this.http.get<Array<Role>>(`${this.urlProjects}/role`);
  }
}
