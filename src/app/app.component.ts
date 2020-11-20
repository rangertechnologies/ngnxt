import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Questionaire App';
  qbId = 'a033t00000Ta1FjAAJ123';

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      //console.log('App params', params);
      //console.log('id', params['id']);
      this.qbId = params['id'];
    });
  }
}
