import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MyWeatherService } from './app.service';
import moment from 'moment';
import { LoaderService } from './loader.service';

export class ForecastData {
  description: string | undefined;
  temp: number | undefined;
  tempMax: number | undefined;
  tempMin: number | undefined;
  date: string | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  cityName: string | undefined;
  timeStamp: string | undefined;
  forecast: ForecastData[] = [];

  constructor(public translate: TranslateService, private service: MyWeatherService,

    public loaderService: LoaderService,) {
    translate.use('sl');
  }

  public ngOnInit() {
    const foreCastAsString = localStorage.getItem('forecast');
    this.forecast = JSON.parse(foreCastAsString!);

    this.getWeather();
  }

  getWeather() {

    this.service.getWeatherFor('Maribor').subscribe(result => {
      this.cityName = result.city?.name;
      this.timeStamp = moment().format('DD.MM.YYYY h:mm');
      this.forecast = [];
      for (var i = 0; i < result.list.length; i += 8) {
        var fData = new ForecastData();
        fData.description = result.list[i]?.weather[0]?.description;
        fData.temp = result.list[i]?.main?.temp;
        fData.tempMax = result.list[i]?.main?.temp_max;
        fData.tempMin = result.list[i]?.main?.temp_min;
        fData.date = moment(new Date(result.list[i]?.dt_txt)).format('DD.MM.YYYY')

        this.forecast.push(fData);
      }

      localStorage.setItem('forecast', JSON.stringify(this.forecast));

    });
  }

  onChange(e: Event, val: any) {
    this.translate.use(val.toLocaleLowerCase());
  }

}
