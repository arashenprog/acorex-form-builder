import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, HostBinding } from '@angular/core';
import { AXFValueWidgetView } from '../../../config/widget';
import { AXFConnectService } from '../../../services/connect.service';
//import { ImageModalPage } from '../imagemodal.page';
import { AXPopupService } from 'acorex-ui';
import { AXFUrlResolverService } from '../../../services/url-resolver.service';

@Component({
    selector: '[axf-file-upload]',
    templateUrl: './file-upload-widget.view.html',
    styleUrls: ['./file-upload-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush, 
    //host: { style: 'display: flex;justify-content: center;align-items: center;' }
})
export class AXFFileUploadWidgetView extends AXFValueWidgetView {
  


    @ViewChild('fileInput') fileInput: ElementRef<HTMLElement>;
    constructor(
        protected cdr: ChangeDetectorRef,
        private connectService: AXFConnectService,
        private resolverService: AXFUrlResolverService,
        private ref: ElementRef<HTMLDivElement>,
        private popupService: AXPopupService) {
        super(cdr);
        
    }

    openFile() { 
        if (!this.readonly) {
            this.connectService.send('getFile').then(async (data) => { 
                if (data) {
                    await this.bindData(data);
                }
            }).catch(() => { 
                this.fileInput.nativeElement.click();
            });
        }
    }

    onRender(): void {
        this.cdr.markForCheck();
    }


    async handleValueChange(evt) {
        const data = evt.data;
        await this.bindData(data);
    }

    private async bindData(data) {     
        if(this.value==null)
            this.value=[]; 
        let lengt=Array.from(this.value).length; 
        this.value.push({ index:lengt+1, createDate:new Date().toISOString().split('.')[0].replace(/T/g,' '),isLoading:true,
            name:new Date().toISOString().split('.')[0].replace(/-/g,'').replace(/:/g,'').replace(/T/g,'')}); 
        this.cdr.detectChanges();
        this.connectService.send('uploadFile', { data })
        .then((c) => { 
            
            this.value[lengt] = Object.assign(this.value[lengt], { srcData: c ,isLoading:false});
        }) 
        .finally(() => {
            this.ref.nativeElement.scrollIntoView();
            this.cdr.detectChanges();
        });

    }

    uploadImage(e) { 
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    async _handleReaderLoaded(e) {
        const reader = e.target;
        this.bindData(reader.result);
    }


    getImageDimensions(file): any {
        return new Promise((resolved, rejected) => {
            const i = new Image();
            i.onload = () => {
                resolved({ w: i.width, h: i.height });
            };
            i.src = file;
        });
    }
   
    deleteClick(i)
    {
        this.value=this.value.filter(d=>d.index!=i);
        this.cdr.detectChanges();
    }

    viewClick(fileName) {
        this.connectService.send('openFile',{fileName}).then((data) => { 
            if(data!=true)
            {
                this.resolverService.resolve(fileName).then(c => { 
                    const linkSource = c["changingThisBreaksApplicationSecurity"];
                    const downloadLink = document.createElement("a");
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                });
            }
        }).catch(() => {  
        });
    }
}
