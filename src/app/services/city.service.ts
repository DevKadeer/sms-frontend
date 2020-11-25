

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../model/city";
import {map} from "rxjs/operators";


@Injectable()
export class CityService {
url="https://localhost:5111";
    constructor(private http:HttpClient) {

    }

    findCityById(cityId: number): Observable<City> {
        return this.http.get<City>(this.url+`/api/city/${cityId}`);
    }

    findAllCities(): Observable<City[]> {
        return this.http.get(this.url+'/api/city')
            .pipe(
                map(res => res['data'])
            );
    }

    getFilteredCities(filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<City[]> {

        return this.http.get(this.url+'/api/city/GetFilteredCities', {
            params: new HttpParams()
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["data"])
        );
    }

}
