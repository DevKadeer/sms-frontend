


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {City} from "../model/city";
import {Observable} from "rxjs";
import {CityService} from "./city.service";



@Injectable()
export class CityResolver implements Resolve<City> {

    constructor(private cityService:CityService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<City> {
        return this.cityService.findCityById(1);
    }

}

