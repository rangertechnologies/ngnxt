import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-lookup',
  templateUrl: './lookup.component.html',
              
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
    @Input() public parentData;
      @Output() public childEvent= new EventEmitter();
    //search component
    public sampleAddress :any [] = 
    [{
      "townId": 1255360639,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A ALBERGUERIA (LAZA)",
      "zipCode": "32622"
    },
    {
      "townId": 1429520775,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A ALBERGUERIA (VILAR DE BARRIO)",
      "zipCode": "32705"
    },
    {
      "townId": 1366720421,
      "countryId": 108,
      "provinceId": 36,
      "language": null,
      "country": "ESPAÑA",
      "province": "PONTEVEDRA",
      "town": "A ALDEA (CEDEIRA)",
      "zipCode": "36812"
    },
    {
      "townId": 134118130,
      "countryId": 108,
      "provinceId": 27,
      "language": null,
      "country": "ESPAÑA",
      "province": "LUGO",
      "town": "A ALENCE (SANTA LUCIA)",
      "zipCode": "27677"
    },
    {
      "townId": 1061318571,
      "countryId": 108,
      "provinceId": 15,
      "language": null,
      "country": "ESPAÑA",
      "province": "A CORUÑA",
      "town": "A AMEIXENDA (CEE)",
      "zipCode": "15298"
    },
    {
      "townId": 933339845,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A ASPRA",
      "zipCode": "32634"
    },
    {
      "townId": 1368030355,
      "countryId": 108,
      "provinceId": 15,
      "language": null,
      "country": "ESPAÑA",
      "province": "A CORUÑA",
      "town": "A ATALAIA (ASADOS)",
      "zipCode": "15984"
    },
    {
      "townId": 1972445078,
      "countryId": 108,
      "provinceId": 27,
      "language": null,
      "country": "ESPAÑA",
      "province": "LUGO",
      "town": "A BALSA (SANTA MARIA) (MURAS)",
      "zipCode": "27817"
    },
    {
      "townId": 2051563661,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A BARCA DE BARBANTES",
      "zipCode": "32450"
    },
    {
      "townId": 1064234582,
      "countryId": 108,
      "provinceId": 15,
      "language": null,
      "country": "ESPAÑA",
      "province": "A CORUÑA",
      "town": "A BARCALA (CAMBRE)",
      "zipCode": "15660"
    },
    {
      "townId": 690098211,
      "countryId": 108,
      "provinceId": 36,
      "language": null,
      "country": "ESPAÑA",
      "province": "PONTEVEDRA",
      "town": "A BARCIA (MARCON)",
      "zipCode": "36158"
    },
    {
      "townId": 1699522641,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A BARRA",
      "zipCode": "32152"
    },
    {
      "townId": 87846084,
      "countryId": 108,
      "provinceId": 27,
      "language": null,
      "country": "ESPAÑA",
      "province": "LUGO",
      "town": "A BASTIDA (SAN MIGUEL)",
      "zipCode": "27112"
    },
    {
      "townId": 1936403132,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A BOGA",
      "zipCode": "32764"
    },
    {
      "townId": 1539222175,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A BOLA (CAPITAL)",
      "zipCode": "32812"
    },
    {
      "townId": 1506169287,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A BRANDELA",
      "zipCode": "32678"
    },
    {
      "townId": 387113846,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A CAL (ALLARIZ)",
      "zipCode": "32669"
    },
    {
      "townId": 1056316633,
      "countryId": 108,
      "provinceId": 15,
      "language": null,
      "country": "ESPAÑA",
      "province": "A CORUÑA",
      "town": "A CAMUZA",
      "zipCode": "15113"
    },
    {
      "townId": 490413785,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A CANLE",
      "zipCode": "32850"
    },
    {
      "townId": 1590159433,
      "countryId": 108,
      "provinceId": 15,
      "language": null,
      "country": "ESPAÑA",
      "province": "A CORUÑA",
      "town": "A CAPELA (SANTIAGO)",
      "zipCode": "15613"
    },
    {
      "townId": 1154101627,
      "countryId": 108,
      "provinceId": 36,
      "language": null,
      "country": "ESPAÑA",
      "province": "PONTEVEDRA",
      "town": "A CARBALLEIRA (LOURIZAN)",
      "zipCode": "36910"
    },
    {
      "townId": 1798804971,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A CARBALLEIRA (NOGUEIRA DE RAMUIN)",
      "zipCode": "32448"
    },
    {
      "townId": 373795861,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A CARBALLEIRA (SAN CIBRAO DAS VIÑAS)",
      "zipCode": "32901"
    },
    {
      "townId": 1813158371,
      "countryId": 108,
      "provinceId": 32,
      "language": null,
      "country": "ESPAÑA",
      "province": "OURENSE",
      "town": "A CARIDADE",
      "zipCode": "32618"
    },
    {
      "townId": 1950458200,
      "countryId": 108,
      "provinceId": 36,
      "language": null,
      "country": "ESPAÑA",
      "province": "PONTEVEDRA",
      "town": "A CARRASQUEIRA (BUEU)",
      "zipCode": "36939"
    }]
    public tempoAddress:any[] = [];
    public selectedValue:string;
    public selectedArea:string;
    public localaddress :any [] = [];
    public errorMessage = ''
  constructor() { }

  ngOnInit(): void {
    this.childEvent.emit(this.selectedValue);
    this.localaddress = JSON.parse(localStorage.getItem('address'));

  }
  townName(area){
var count=0;
    this.childEvent.emit(area.town);
    
    this.selectedValue=area.town;
    console.log('fd')
  /*else if(count == this.localaddress.length -1){
    console.log(count)
    this.errorMessage = 'El código postal no es válido';
  }*/
    console.log('1456'+this.selectedValue)
    //this.inpValue = this.selectedValue;
    //console.log('abdul'+this.selectedValue.length)
    this.tempoAddress=[];		
    console.log('abdul'+this.tempoAddress)
  }
  
    getTownLocal(){
      this.tempoAddress=[];
      //console.log('1258'+this.selectedValue)
       if(this.selectedValue.length >0){

        //console.log(this.localaddress)
        
      for(var val of this.localaddress ){
        //console.log('local address'+val.town);
        if(val.town.substring(0,this.selectedValue.length) == this.selectedValue){
          //console.log('78'+val.town)
        this.tempoAddress.push(val)
        if(this.tempoAddress.length == 6 ){
          break;
          }
      } 
    }
      
     }
     document.getElementById('selectList').style.display = "block";
     this.setSearchListWidth();
  
    }
  
    clearList(){
      setTimeout(()=> {
        this.tempoAddress = [];
      }, 500);
      }
  
    setSearchListWidth() { //to resize search list based on the screen size
      const searchBoxWidth = window.document.getElementById('autocomplete-input').offsetWidth;
      document.getElementById('selectList').style.width = searchBoxWidth+"px";
    }

}
