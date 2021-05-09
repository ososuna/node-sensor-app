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

  animals = [
    'Dog',
    'Cat',
    'Bird',
    'Lizard',
    'Chinchilla'
  ]
  

  constructor( private sensorService: SensorService,
               private pickerController: PickerController ) {}

  ngOnInit() {
    console.log('Hola mundo');
    this.loadSensorData();
  }

  async loadSensorData() {
    
    await setInterval( () => {
      this.sensorService.getSensorData().subscribe( resp => {
        this.temp = `${ resp.temp } C`;
        this.hum = `${ resp.hum } %`;
      });
    } , 1000);
    
  }

  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            console.log( value );
          }
        }
      ],
      columns:[{
        name:'Animals',
        options:this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }

  getColumnOptions(){
    let options = [];
    this.animals.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }

}
