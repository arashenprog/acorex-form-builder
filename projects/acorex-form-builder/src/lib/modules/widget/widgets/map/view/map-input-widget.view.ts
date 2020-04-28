import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { MouseEvent } from '@agm/core'; 
declare var ol: any;

@Component({
    templateUrl: './map-input-widget.view.html',
    //styleUrls: ['./map-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFMapInputWidgetView extends AXFValueWidgetView  {

    zoom: number = 8; 
    lat: number = 51.673858;
    lng: number = 7.815982;
    height: number;
    width: number;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }
    // map: any = { lat: 51.678418, lng: 7.809007 };
    
    // mapClicked($event: MouseEvent) {
    //     this.value={
    //     lat: $event.coords.lat,
    //     lng: $event.coords.lng,
    //     draggable: true
    //     }; 
    // }  
 

    map1: any;

    latitude: number = 32.663296
  longitude: number = 51.711054;

  ngAfterViewInit () {
    // this.map = new ol.Map({
    //   target: 'map1',
    //   layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.OSM()
    //     })
    //   ],
    //   view: new ol.View({
    //     center: ol.proj.fromLonLat([this.longitude, this.latitude]),
    //     zoom: 12
    //   })
    // });

    debugger;
    this.map1 = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View()
      });


    this.addPoint(this.latitude, this.longitude);
    
  }

//   setCenter() {
//     var view = this.map.getView();
//     view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
//     view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
//     view.setZoom(12);
//   }

    addPoint(lat: number, lng: number) {
        var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
            })]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "assets/img/my-icon.png"
            })
        })
        });
        this.map1.addLayer(vectorLayer);
    }
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
