import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSensor } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor( private http: HttpClient ) { }

  // Get data from local web server by IP
  getSensorData() {
    return this.http.get<RespuestaSensor>('http://192.168.1.64:8080/api/sensor');
  }

}
