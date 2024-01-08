import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MyWeatherService {

     myAPIKey = 'feb90cf4c8541b3eb7df70b0b12e9e97';

    constructor(private http: HttpClient) { }


    public getWeatherFor(cityName: string): Observable<any> {
        return this.http
            .get<{ lat: string, lon: string }[]>('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + this.myAPIKey)
            .pipe(
                mergeMap((geoData) =>
                    this.http.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + geoData[0]?.lat + '&lon=' + geoData[0]?.lon + '&appid=' + this.myAPIKey +'&units=metric')

                )
            );
    }
}