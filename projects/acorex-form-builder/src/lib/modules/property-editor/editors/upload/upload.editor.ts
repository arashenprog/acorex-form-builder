import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { UploadStructure } from './upload.structure';

@Component({
  templateUrl: './upload.editor.html',
  styleUrls: ['./upload.editor.scss'],
})
export class AXFUploadEditorComponent extends AXFProperyEditor<UploadStructure> implements OnInit {

  modeItems: any[] = [{ value: "auto", title: "Auto Size" }, { value: "custom", title: "Custom Size" }]


  constructor(protected cdr: ChangeDetectorRef) {
    super();
  }


  ngOnInit(): void {
  }


  modeSizeChange(e) {
    if (e && this.value.modeSize != e) {
      this.value.modeSize = e;
      if(e=="auto")
      {
        this.value.height=this.value.orginalHeight;
        this.value.width=this.value.orginalWidth;
      }
      super.handleValueChange(this.value);
    }
  }

  widthChange(e) {
    if (e && this.value.width != e) {
      this.value.width = e;
      if (this.value.isAspectRatio) {
        this.value.height = ((parseInt(this.value.width) * parseInt(this.value.orginalHeight)) / parseInt(this.value.orginalWidth)).toString();
      }
      this.cdr.detectChanges();
      super.handleValueChange(this.value);
    }
  }

  heightChange(e) {
    if (e && this.value.height != e) {
      this.value.height = e;
      if (this.value.isAspectRatio) {
        this.value.width = ((parseInt(this.value.height) * parseInt(this.value.orginalWidth)) / parseInt(this.value.orginalHeight)).toString();
      }
      this.cdr.detectChanges();
      super.handleValueChange(this.value);
    }
  }

  async handleValueChange(evt) {
    this.value.srcData = evt.data;
    let newDimension = await this.getImageDimensions(evt.data);
    this.value.orginalHeight = newDimension.h;
    this.value.orginalWidth = newDimension.w;
    if (this.value.modeSize == "auto") {
      this.value.height = this.value.orginalHeight;
      this.value.width = this.value.orginalWidth;
    }
    this.cdr.detectChanges();
    super.handleValueChange(this.value);
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

  aspectRatioChange(e) {
    if (e != undefined) {
      this.value.isAspectRatio = e;
      if (e == true) {
        this.value.height = ((parseInt(this.value.width) * parseInt(this.value.orginalHeight)) / parseInt(this.value.orginalWidth)).toString();
        this.cdr.detectChanges();
      }
      super.handleValueChange(this.value);
    }
  }
}