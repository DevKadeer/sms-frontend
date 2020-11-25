import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {CityService} from "../services/city.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, map} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import {CitiesDataSource as CitiesDataSource} from "../services/cities.datasource";


@Component({
    selector: 'city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, AfterViewInit {

    pageLength=0; 

    dataSource: CitiesDataSource;

    displayedColumns= [ 'id', 'city', 'start_Date', 'end_Date', 'price', 'status', 'color',];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('input') input: ElementRef;

    constructor(private route: ActivatedRoute,
                private cityService: CityService) {

    }

    ngOnInit() {

        // this.city = this.route.snapshot.data["city"];

        this.dataSource = new CitiesDataSource(this.cityService);

        this.dataSource.loadCities('', 'asc', 0, 10);
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadCityPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadCityPage())
        )
        .subscribe();

    }

    loadCityPage() {
        this.dataSource.loadCities(
            this.input.nativeElement.value,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }


}
