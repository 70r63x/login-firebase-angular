import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  public dataAlert: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.dataAlert = data;
  }

  ngOnInit(): void {
  }

}
