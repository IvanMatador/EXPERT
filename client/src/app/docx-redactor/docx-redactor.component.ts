import { dataObject } from './../interfaces/data-object.interface';
import { MkDocService } from './../services/mkdoc.service';
import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import * as docx from 'docx';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

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
  noTypeSelected = true;

  shortName: string = 'ПрАТ "МЕТЦ"';
  typeOfEO: string = 'роботи';
  testData = new docx.Document({
    sections: [{
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun("УСПЕХ"),
            new docx.TextRun({
              text: "В МЕЛОЧАХ",
              bold: true,
            }),
          new docx.TextRun({
            text: "А МОЖЕТ И В БОЛЬШИХ ДЕЛАХ",
            bold: true,
          }),
        ],
            }),
        ],
    }],
  });
  dataArray: dataObject = {
    EDRPOU: '34534582',
    shortName: 'ПрАТ "МЕТЦ"',
    typeOfEO: 'роботи',
    head: 'Полякова Олена Анатоліївна'
  };
  eoFormGroup = new FormGroup({
    edrpou: new FormControl(null, [Validators.required]),
    type: new FormControl(),
  });
  
  typesEO = [{type: 'roboti', id: 'eo_rob'}, {type: 'expluatation', id: 'eo_ex'}];

  @ViewChild('firstForm') firstForm;

  constructor(public mkDocService: MkDocService, private fb: FormBuilder) { }

  ngOnInit(): void {
    //console.log(docx)
    
  }

  generateDocFile() {    
    /* this.mkDocService.mkDocxFile(this.dataArray).subscribe(item => {
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
    }); */

    
    this.generateDocxFile(this.testData)
  }



  generateDocxFile(doc) {
    docx.Packer.toBlob(doc).then(blob => {
      //saveAs(blob, "example.docx");
      let filename = prompt('Введите имя файла', `ЕО ${this.shortName} (${this.typeOfEO})`); // need to add popup window
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = URL.createObjectURL(blob);
      a.download = filename !== null ? filename + '.docx' : `ЕО ${this.shortName} (${this.typeOfEO})`;
      a.click();
      //alert('file is downloaded')
    });
  }

  checkSelection() {
    this.noTypeSelected = false;
  }


}
