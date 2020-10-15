import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';

@Component({
    styleUrls: ['./imagemodal.page.scss'],
    templateUrl: './imagemodal.page.html'
})

export class ImageModalPage extends AXBasePageComponent {

    constructor() {
        super();
    }

    @Input()
    public value: string;

    images: string[] = [];


    config: any = {
        btnContainerClass: '',
        btnClass: 'default',
        btnSubClass: 'default',
        zoomFactor: 0.1,
        containerBackgroundColor: '#ccc',
        wheelZoom: true,
        allowFullscreen: false,
        btnShow: {
            zoomIn: true,
            zoomOut: true,
            rotateClockwise: true,
            rotateCounterClockwise: false,
            next: false,
            prev: false,
            reset: false,
            fullscreen: false
        },
        btnIcons: {
            zoomIn: {
                classes: 'fas fa-plus',
            },
            zoomOut: {
                classes: 'fas fa-minus',
            },
            rotateClockwise: {
                classes: 'fas fa-undo',
            },
            rotateCounterClockwise: {
                classes: 'fas fa-undo',
            },
            reset: {
                classes: 'fas fa-undo',
            }
        }
    };

    ngOnInit() {
        this.images = [this.value];
    }
}
