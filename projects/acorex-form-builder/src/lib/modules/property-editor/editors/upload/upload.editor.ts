import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-upload-file type ="inline" (onLoad)="handleValueChange($event)" >
        </ax-upload-file>
    `,
})
export class AXFUploadEditorComponent extends AXFProperyEditor<string> implements OnInit {

    dimension:any; 

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }


    ngOnInit(): void {
    }

    handleValueChange(evt) {
        this.dimension= this.getImageDimensions(evt.data);
        this.value = evt.data;
    }

    getImageDimensions(file) {
        return new Promise (function (resolved, rejected) {
          var i = new Image()
          i.onload = function(){
            resolved({w: i.width, h: i.height})
          };
          i.src = file
        })
      }
}