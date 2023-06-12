import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() tableHeader: string='';
  @Input() tableData: tableItem [];
  @Output() tableDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit(): void {
  }


  addRow(): void {
    const newItem = {
      label: '',
      imageSrc: 'https://media.istockphoto.com/id/943776434/vector/fire-extinguisher-icon-vector.jpg?s=612x612&w=0&k=20&c=KVaDxuV2TV7fdwn09Tg9HeF3MNyoJC5k2YqSAzpStDY=',
      altText: '',
      name: '',
      value: 'YES'
    };
    const updatedTableData = [...this.tableData, newItem];
    this.tableData = updatedTableData;
    this.emitTableDataValue(updatedTableData);
  }

  updateRadio(item: any, value: string): void {
    item.value = value;
    this.emitTableDataValue(this.tableData);
  }

  updateLabel(rowIndex: number, label: string): void {
    this.tableData[rowIndex].label = label;
    this.emitTableDataValue(this.tableData);
  }

  emitTableDataValue(updatedTableData: any[]): void {
    this.tableDataChange.emit(updatedTableData);
  }
  

 
}

export interface tableItem {
  label: string;
  imageSrc:string
  altText:string;
  name: string;
  value: string
}

