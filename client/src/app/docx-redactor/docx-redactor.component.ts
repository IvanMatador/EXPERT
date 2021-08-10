import { dataObject } from './../interfaces/data-object.interface';
import { MkDocService } from './../services/mkdoc.service';
import { Component, OnInit } from '@angular/core';

/* export interface dataObject {
  EDRPOU: string;
  shortName: string;
  typeOfEO: string;
} */ 

@Component({
  selector: 'app-docx-redactor',
  templateUrl: './docx-redactor.component.html',
  styleUrls: ['./docx-redactor.component.scss']
})
export class DocxRedactorComponent implements OnInit {

  shortName: string = 'ПрАТ "МЕТЦ"';
  typeOfEO: string = 'роботи';
  dataArray: dataObject = {
    EDRPOU: '34534582',
    shortName: 'ПрАТ "МЕТЦ"',
    typeOfEO: 'роботи',
    head: 'Полякова Олена Анатоліївна'
  };

  constructor(public mkDocService: MkDocService) { }

  ngOnInit(): void {
    //console.log(docx)
    
  }

  generateDocFile() {    
    this.mkDocService.mkDocxFile(this.dataArray).subscribe(item => {
      const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {type: contentType});
      };

      const blob = b64toBlob(item, 'attachment');
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = URL.createObjectURL(blob);
      a.download = `ЕО ${this.shortName} (${this.typeOfEO}).docx`;
      //a.click();
      alert('file is downloaded')
    });
  }


}
