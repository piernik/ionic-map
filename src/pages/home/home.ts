import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from '@ionic-native/google-maps';
import {Home2Page} from "../home2/home2";

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  show = false;

  constructor(public navCtrl: NavController,
              protected ref: ChangeDetectorRef) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                // alert('marker clicked');
                this.show = true;
                this.ref.detectChanges();
                setTimeout(() => {
                  cordova.fireDocumentEvent('plugin_touch', {});
                },100);
              });
          });
      });
  }

  onChangePage() {
    this.navCtrl.push(Home2Page, {}, {animate: true});
  }
}
