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
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = 'Recife';
  weatherDatas!: WeatherDatas;
  isLoading = false;  // Variável de controle de carregamento
  searchIcon = faMagnifyingGlass;

  constructor(private WeatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.isLoading = true; // Ativa o carregamento
    this.WeatherService.getWeatherDatas(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false; // Desativa o carregamento
          response && (this.weatherDatas = response);
          console.log(this.weatherDatas);
        },
        error: (error) => {
          this.isLoading = false; // Desativa o carregamento em caso de erro
          console.log(error);
        }
      });
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    console.log('Chamou a função');
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
