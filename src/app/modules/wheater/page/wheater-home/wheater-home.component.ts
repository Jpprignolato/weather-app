import { faSearch } from './../../../../../../node_modules/@fortawesome/free-solid-svg-icons/faSearch.d';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';
import { WeatherService } from './../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wheater-home',
  templateUrl: './wheater-home.component.html',
  styleUrls: [],
})
export class WheaterHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject <void> = new Subject();
  initialCityName = 'Recife';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;


  constructor(private WeatherService: WeatherService) { }
  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.WeatherService.getWeatherDatas(cityName)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log(this.weatherDatas);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit(): void{
    this.getWeatherDatas(this.initialCityName);
    console.log('Chamou a função')
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
