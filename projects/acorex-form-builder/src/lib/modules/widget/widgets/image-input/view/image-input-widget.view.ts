import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import {  AXFValueWidgetView } from '../../../config/widget';
import { AXFConnectService } from '../../../services/connect.service';

@Component({
    templateUrl: './image-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetView extends AXFValueWidgetView {

    height: number;
    width: number;
    alt: string;   
    @ViewChild("fileInput") fileInput: ElementRef<HTMLElement>;
    constructor(private el: ElementRef<HTMLElement>, protected cdr: ChangeDetectorRef,
         private connectService: AXFConnectService) {
        super(cdr)
    }

    openFile()
    {
        this.fileInput.nativeElement.click(); 
    }
 
    onRender(): void {
        //this.applyStyle(this.el.nativeElement.querySelector("img"));
    }

    
    async handleValueChange(evt) {
        let data = evt.data;
        let newDimension = await this.getImageDimensions(evt.data);
        this.value.orginalHeight = newDimension.h;
        this.value.orginalWidth = newDimension.w;
        if (this.value.modeSize == "auto") {
          this.value.height = this.value.orginalHeight;
          this.value.width = this.value.orginalWidth;
        }
        this.connectService.send('uploadFile', { data }).then((c) => {
          this.value.srcData = c;
          this.cdr.detectChanges(); 
        });
    }

    uploadImage(e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
          alert('invalid format');
          return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        let reader = e.target; 
        let data = reader.result;
        this.connectService.send('uploadFile', { data }).then((c) => {
            this.value={srcData :c};
            this.cdr.detectChanges(); 
        });
    }
    

    getImageDimensions(file): any {
        return new Promise(function (resolved, rejected) {
            var i = new Image()
            i.onload = function () {
            resolved({ w: i.width, h: i.height })
            };
            i.src = file
        })
    }
}