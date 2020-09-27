import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXFValueWidgetView } from '../../../config/widget';
import { AXFConnectService } from '../../../services/connect.service';

@Component({
    templateUrl: './image-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetView extends AXFValueWidgetView {

    height: number;
    width: number;
    alt: string;
    isLoading: boolean = false;


    @ViewChild('fileInput') fileInput: ElementRef<HTMLElement>;
    constructor(private el: ElementRef<HTMLElement>, protected cdr: ChangeDetectorRef,
        private connectService: AXFConnectService) {
        super(cdr);
    }

    openFile() {
        if (!this.readonly) {
            this.fileInput.nativeElement.click();
        }
    }

    onRender(): void {
        this.cdr.markForCheck();
    }


    async handleValueChange(evt) {
        const data = evt.data;
        this.isLoading = true;
        const newDimension = await this.getImageDimensions(evt.data);
        this.value.orginalHeight = newDimension.h;
        this.value.orginalWidth = newDimension.w;
        if (this.value.modeSize === 'auto') {
            this.value.height = this.value.orginalHeight;
            this.value.width = this.value.orginalWidth;
        }
        this.connectService.send('uploadFile', { data }).then((c) => {
            this.value = Object.assign(this.value, { srcData: c });
        }).finally(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    uploadImage(e) {
        this.isLoading = true;

        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        const pattern = /image-*/;
        const reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        const reader = e.target;
        const data = reader.result;
        this.connectService.send('uploadFile', { data }).then((c) => {
            this.value = { srcData: c };
        }).finally(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        });
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
}
