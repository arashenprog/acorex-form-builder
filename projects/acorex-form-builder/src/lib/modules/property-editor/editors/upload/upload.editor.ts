import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { UploadStructure } from './upload.structure';
import { AXFConnectService } from '../../../widget/services/connect.service';

@Component({
  templateUrl: './upload.editor.html',
  styleUrls: ['./upload.editor.scss'],
})
export class AXFUploadEditorComponent extends AXFProperyEditor<UploadStructure> implements OnInit {

  modeItems: any[] = [{ value: "auto", title: "Auto Size" }, { value: "custom", title: "Custom Size" }]
  methods: any[] = [{ value: "url", title: "URL" }, { value: "upload", title: "Upload" }]
  mode: 'image' | 'video' = 'image';

  @ViewChild('fileVideoBox') fileVideoBox: ElementRef<HTMLElement>;
  constructor(protected cdr: ChangeDetectorRef, private connectService: AXFConnectService) {
    super(cdr);
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initiated = true;
  }



  modeSizeChange(e) {
    if (e && this.value.modeSize != e) {
      this.value.modeSize = e;
      if (e == "auto") {
        this.value.height = this.value.orginalHeight;
        this.value.width = this.value.orginalWidth;
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
    let data = evt.data;
    let newDimension = await this.getImageDimensions(evt.data);
    this.value.orginalHeight = newDimension.h;
    this.value.orginalWidth = newDimension.w;
    if (this.value.modeSize == "auto") {
      this.value.height = this.value.orginalHeight;
      this.value.width = this.value.orginalWidth;
    }
    this.connectService.send('uploadFile', { data }).then((c) => {
      if(c.data)
        this.value.srcData = c.data; 
      else
        this.value.srcData = c;
      this.cdr.detectChanges();
      super.handleValueChange(this.value);
    });
    // this.cdr.detectChanges();
    // super.handleValueChange(this.value);
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

  handleTextChange() {
    super.handleValueChange(this.value);
  }

  selectVideo()
  {
    this.fileVideoBox.nativeElement.click();
  }


  uploadVideo(e) {  
    this.cdr.detectChanges();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /video-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  async _handleReaderLoaded(e) {
    const reader = e.target; 
    let data=reader.result;
    this.connectService.send('uploadFile', { data }).then((c) => {
      if(c.data)
        this.value.srcData = c.data; 
      else
        this.value.srcData = c;
      this.cdr.detectChanges();
      super.handleValueChange(this.value);
    }); 
  }

}