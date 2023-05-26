import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() tableHeader: string='';
  @Input() tableData: any[];
  @Output() tableDataChange: EventEmitter<any> = new EventEmitter<any>();

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
    this.tableData.push(newItem);
    this.emitTableDataValue();

       // Execute code after the view has been initialized
       setTimeout(() => {
        const lastIndex = this.tableData.length - 1;
        const newRow = $('#safetyMeasuresTableBody tr').eq(lastIndex);
        const labelCell = newRow.find('td').eq(0);

       // Remove the text content while preserving the <img> tag
        labelCell.contents().filter(function() {
          return this.nodeType === 3; // Text node
        }).remove();

        const labelInput = $('<input type="text">');
        labelInput.addClass('she-line-input table-input');
        labelInput.appendTo(labelCell);
      });
  }

  updateRadio(item: any, value: string): void {
    item.value = value;
    this.emitTableDataValue();
  }

  ngAfterViewInit(): void {
    $('.table').on('input', '.she-line-input', (event) => {
      const rowIndex = $(event.target).closest('tr').index();
      const label = $(event.target).val().toString();
      this.tableData[rowIndex].label = label;
      this.emitTableDataValue();
    });
   
  }

 emitTableDataValue(): void {
  this.tableDataChange.emit(this.tableData);
}
}

