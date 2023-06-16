import { Component, ElementRef, EventEmitter, NgModule, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
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
  address: string;
  private geoCoder;
 // public formGroup: FormGroup;
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  showModal: boolean = false;
  @Output() locationSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) { 
    // this.formGroup = this.formBuilder.group({
    //   location: [''] // Add any initial value or leave it empty
    // });

  }

  ngOnInit(): void {
      //load Places Autocomplete
      // this.mapsAPILoader.load().then(() => {
      //   this.geoCoder = new google.maps.Geocoder;
      //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //     types: []
      //   });
      //   autocomplete.addListener("place_changed", () => {
      //     this.ngZone.run(() => {
      //       //get the place result
      //       const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
      //       //verify result
      //       if (place.geometry === undefined || place.geometry === null) {
      //         return;
      //       }
  
      //       //set latitude, longitude and zoom
      //       this.latitude = place.geometry.location.lat();
      //       this.longitude = place.geometry.location.lng();
      //       this.zoom = 0;
      //       const ADDR_PART1 = place.formatted_address.split(',')[0];
      //       const addr = place.name === ADDR_PART1 ? place.formatted_address : place.name + ' ' + place.formatted_address;
      //     // this.formGroup.patchValue({
      //     //   location: addr,
      //     // });

      //       // this.getAddress(this.latitude, this.longitude);
      //     });
      //   });
      // });
  }

  openMap() {
    this.showModal = true;
   // $("#map").modal('show');
    console.log('lat-lan', typeof this.latitude, typeof this.longitude);
    if (!(this.latitude && this.longitude)) {
      this.setCurrentLocation();
    }
  }

  closeModal() {
    this.showModal = false;
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

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 18;
          this.address = results[0].formatted_address;
          this.locationSelected.emit(this.address);
        //  this.formGroup.patchValue({
        //  location: this.address,
        //  });
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

}
