import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {City} from "../model/city";
import {CityService} from "./city.service";
import {catchError, finalize} from "rxjs/operators";



export class CitiesDataSource implements DataSource<City> {

    private citySubject = new BehaviorSubject<City[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public dataSourceLength: number;

    constructor(private cityService: CityService) {

    }

    loadCities(filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.cityService.getFilteredCities(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(city => this.citySubject.next(city));

    }

    connect(collectionViewer: CollectionViewer): Observable<City[]> {
        console.log("Connecting data source");
        return this.citySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.citySubject.complete();
        this.loadingSubject.complete();
    }

}

