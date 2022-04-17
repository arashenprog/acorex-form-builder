import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, HostBinding } from '@angular/core';
import { AXFValueWidgetView } from '../../../config/widget';
import { AXFConnectService } from '../../../services/connect.service'; 
import { AXPopupService, AXToastService } from 'acorex-ui';
import { AXFUrlResolverService } from '../../../services/url-resolver.service';

@Component({
    selector: '[axf-video-input]',
    templateUrl: './video-input-widget.view.html',
    styleUrls: ['./video-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { style: 'display: flex;justify-content: center;align-items: center;', tabIndex: "0" }
})
export class AXFVideoInputWidgetView extends AXFValueWidgetView {

    height: number;
    width: number;
    isLoading = false;


    @ViewChild('fileInputV') fileInputV: ElementRef<HTMLElement>;
    constructor(
        protected cdr: ChangeDetectorRef,
        private connectService: AXFConnectService,
        private resolverService: AXFUrlResolverService,
        private toastService: AXToastService,
        private ref: ElementRef<HTMLDivElement>,
        private popupService: AXPopupService) {
        super(cdr);
        document.addEventListener("paste", this.onDocPaste.bind(this));
    }

    openFile() {
        if (!this.readonly) {
            this.connectService.send('getMedia').then(async (data) => {
                if (data) {
                    await this.bindData(data);
                }
            }).catch(() => {
                this.fileInputV.nativeElement.click();
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
        this.isLoading = true;  
        this.cdr.detectChanges();
        this.connectService.send('uploadFile', { data }).then((c) => {
            this.value =  { orginalHeight: this.height, orginalWidth: this.width, srcData: c } ;
        }).finally(() => {
            this.isLoading = false;
            this.ref.nativeElement.scrollIntoView();
            this.cdr.detectChanges();
        });
    }

    uploadVideo(e) { 
        this.isLoading = true;
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

    remove()
    {
        this.value = null;
    }

    async _handleReaderLoaded(e) {
        const reader = e.target;
        this.bindData(reader.result);
    }

  
    ngOnDestroy() {
        super.ngOnDestroy();
        document.removeEventListener("paste", this.onDocPaste.bind(this));
    }

    private onDocPaste(event: ClipboardEvent) {
        if (this.ref.nativeElement == document.activeElement) {
            var items = event.clipboardData.items;
            var blob = items[0].getAsFile();
            if (blob) {
                var reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsDataURL(blob);
            }
        }
    }

    onClickPaste(e: MouseEvent) {
        e.stopPropagation();
        this.ref.nativeElement.focus();
        setTimeout(() => {
            this.toastService.success("Now press (Ctrl + V) to paste video", { timeOut: 3000 });
        }, 200);
    }
}
