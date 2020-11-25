


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {City} from "../model/city";
import {CityService} from "./city.service";
import {catchError, finalize} from "rxjs/operators";



export class LessonsDataSource implements DataSource<City> {

    private lessonsSubject = new BehaviorSubject<City[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public dataSourceLength: number;

    constructor(private cityService: CityService) {

    }

    loadLessons(filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.cityService.findLessons(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => this.lessonsSubject.next(lessons));

    }

    connect(collectionViewer: CollectionViewer): Observable<City[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}

