import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: string;

  constructor( private sensorService: SensorService ) {}

  ngOnInit() {
    console.log('Hola mundo');
    this.loadSensorData();
  }

  async loadSensorData() {
    
    await setInterval( () => {
      this.sensorService.getSensorData().subscribe( resp => {
        this.data = resp.data;
        console.log( resp );
      });
    } , 3000);
    
  }

}
