import { Component, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { AXFUrlResolverService } from '../../services/url-resolver.service';

@Component({
    styleUrls: ['./imagemodal.page.scss'],
    templateUrl: './imagemodal.page.html'
})

export class ImageModalPage extends AXBasePageComponent {

    @ViewChild("el") el: ElementRef<HTMLElement>;
    constructor(private resolveService: AXFUrlResolverService) {
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


    async ngAfterViewInit() {
        let img = this.value["changingThisBreaksApplicationSecurity"];        
        let newval= await this.getImageDimensions(img);
        this.images = [newval.src];
    }
    
    getImageDimensions(file): any {
        return new Promise(function (resolved, rejected) {
            var i = new Image()
            i.onload = function () {
                let result = file;
                if (i.height > 500) {
                    debugger
                    var canvas = document.createElement("canvas");
                    var scale = 500 / i.height;
                    var iwScaled = i.width * scale;
                    var ihScaled = i.height * scale;
                    canvas.width = iwScaled;
                    canvas.height = ihScaled;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(i, 0, 0, iwScaled, ihScaled);
                    var dataURL1 = canvas.toDataURL("image/jpeg", 0.5);
                    result= dataURL1.replace(/^data:image\/(png|jpg);base64,/, "");
                }
                resolved({ w: i.width, h: i.height, src: result })
            };
            i.src = file
        })
    }
}
