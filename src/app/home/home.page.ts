import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";
import { SensorService } from '../services/sensor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  temp: string;
  hum: string;
  escalaVal: number = 0;

  escalas = [
    'Celsius',
    'Fahrenheit',
    'Kelvin'
  ]

  constructor( private sensorService: SensorService,
               private pickerController: PickerController ) {}

  ngOnInit() {
    this.loadSensorData();
  }

  // Load data from sensor service
  async loadSensorData() {
    
    // Load data every second
    await setInterval( () => {
      this.sensorService.getSensorData().subscribe( resp => {
        console.log( resp );
        this.temp = `${ parseFloat( resp.temp ).toFixed( 2 ) } C`;
        this.hum = `${ parseFloat( resp.hum ).toFixed( 2 ) } %`;
      });
    } , 1000);
    
  }

  // Ionic picker settings
  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:( value: any ) => {
            this.escalaVal = value.escalas.value;
          }
        }
      ],
      columns:[{
        name: 'escalas',
        options: this.getColumnOptions()
      }],
      animated: true
    };

    let picker = await this.pickerController.create( options );
    picker.present()
  }

  getColumnOptions(){
    let options = [];
    this.escalas.forEach( ( x, index ) => {
      options.push( { text: x, value: index } );
    });
    return options;
  }

  // Convert to Fahrenheit
  toFahrenheit( t: string ) {
    const temp = parseFloat( t );
    return `${ ( ( temp * 9/5 ) + 32 ).toFixed( 2 ) } F`;
  }

  // Convert to Kelvin
  toKelvin( t: string ) {
    const temp = parseFloat( t );
    return `${ ( temp + 273.15 ).toFixed( 2 ) } K`;
  }
  

}
