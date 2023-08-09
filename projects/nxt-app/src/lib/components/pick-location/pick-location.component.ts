import { Component, ElementRef, EventEmitter, Input, NgModule, NgZone, OnInit, Output, ViewChild } from '@angular/core';
//import { MapsAPILoader } from '@agm/core';
import { GoogleMap } from '@angular/google-maps';
declare var $: any;

@Component({
  selector: 'app-pick-location',
  templateUrl: './pick-location.component.html',
  styleUrls: ['./pick-location.component.css']
})
export class PickLocationComponent implements OnInit {
  latitude = null;
  longitude = null;
  zoom: number = 10;
  private geoCoder;
 // public formGroup: FormGroup;
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  showModal: boolean = false;
  @Input() address:string;
  @Output() locationSelected: EventEmitter<any> = new EventEmitter<any>();
 // center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };

  constructor(
   // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 
      this.geoCoder = new google.maps.Geocoder();
    // this.formGroup = this.formBuilder.group({
    //   location: [''] // Add any initial value or leave it empty
    // });

  }

  ngOnInit(): void {
      this.initAutocomplete();
  }

  initAutocomplete(): void {
    if (this.geoCoder) {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 18;
          this.address = place.formatted_address;
          this.locationSelected.emit(this.address);
        });
      });
    }
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent): void {
    console.log('onMarkerDragEnd',event);
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    console.log('onMapClick',event);
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 0;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude: number, longitude: number) {
    if (this.geoCoder) {
      this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        console.log('results',results);
        console.log('status',status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 18;
            this.address = results[0].formatted_address;
            this.locationSelected.emit(this.address);
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }
  }

  openMap() {
    this.showModal = true;
    if (!(this.latitude && this.longitude)) {
      this.setCurrentLocation();
    }
   // $("#map").modal('show');
  //  console.log('lat-lan', typeof this.latitude, typeof this.longitude);
    // if (!(this.latitude && this.longitude)) {
    //   this.setCurrentLocation();
    // }
  }

  closeModal() {
    this.showModal = false;
  }


}
