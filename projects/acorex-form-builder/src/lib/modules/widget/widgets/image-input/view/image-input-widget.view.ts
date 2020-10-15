import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, HostBinding } from '@angular/core';
import { AXFValueWidgetView } from '../../../config/widget';
import { AXFConnectService } from '../../../services/connect.service';
import { ImageModalPage } from '../imagemodal.page';
import { AXPopupService } from 'acorex-ui';
import { AXFUrlResolverService } from '../../../services/url-resolver.service';

@Component({
    selector: '[axf-image-input]',
    templateUrl: './image-input-widget.view.html',
    styleUrls: ['./image-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { style: 'display: flex;justify-content: center;align-items: center;' }
})
export class AXFImageInputWidgetView extends AXFValueWidgetView {

    height: number;
    width: number;
    isLoading = false;


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
            this.connectService.send('getMedia').then(async (data) => {
                debugger;
                if (data) {
                    await this.bindData(data);
                }
            }).catch(() => {
                debugger;
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
        this.isLoading = true;
        const newDimension = await this.getImageDimensions(data);
        this.value = { orginalHeight: newDimension.h, orginalWidth: newDimension.w };
        this.connectService.send('uploadFile', { data }).then((c) => {
            this.value = Object.assign(this.value, { srcData: c });
        }).finally(() => {
            this.isLoading = false;
            this.ref.nativeElement.scrollIntoView();
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

    search() {
        this.resolverService.resolve(this.value.srcData).then(c => {
            this.popupService.open(ImageModalPage, {
                title: 'View Image',
                size: 'lg',
                data: {
                    value: c
                }
            });
        });
    }
}
