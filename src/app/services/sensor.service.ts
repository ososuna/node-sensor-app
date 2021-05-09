import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSensor } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor( private http: HttpClient ) { }

  getSensorData() {
    return this.http.get<RespuestaSensor>('http://localhost:8080/api/sensor');
  }

}
