import { Component, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { AXFUrlResolverService } from '../../services/url-resolver.service';
import { CustomImageEvent } from '@hreimer/angular-image-viewer';
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
    changeVal: any;
    degree: number = 0;
    scale: number = 1;
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

        setTimeout(() => {
            let that = this;
            document.querySelectorAll(".btn-container .default")
                .forEach(f => f.addEventListener('click', async function (event) {
                    if ((event.target as any).className == "fa-undo fas" || ((event.target as any).lastChild != null && (event.target as any).lastChild.className == "fa-undo fas")) {
                        that.degree += 90;
                        if (that.degree == 360) that.degree = 0;
                        that.scale=1;
                    }
                    if ((event.target as any).className == "fa-plus fas" || ((event.target as any).lastChild != null && (event.target as any).lastChild.className == "fa-plus fas")) {
                        that.scale = that.scale * 1.1; 
                    }
                    if ((event.target as any).className == "fa-minus fas" || ((event.target as any).lastChild != null && (event.target as any).lastChild.className == "fa-minus fas")) {
                        that.scale = that.scale / 1.1; 
                    }
                    that.changeVal= await that.rotateBase64Image(that.images[0],that.degree,that.scale);
                    console.log(that.changeVal);
                })
                )
        }, 500);
    }

    async ngAfterViewInit() {
        let img = this.value["changingThisBreaksApplicationSecurity"];
        let newval = await this.getImageDimensions(img);
        this.images = [newval.src];
    }

    getImageDimensions(file): any {
        return new Promise(function (resolved, rejected) {
            var i = new Image()
            i.onload = function () {
                let result = file;
                // if (i.height > 500) {
                //     var canvas = document.createElement("canvas");
                //     var scale = 500 / i.height;
                //     var iwScaled = i.width * scale;
                //     var ihScaled = i.height * scale;
                //     canvas.width = iwScaled;
                //     canvas.height = ihScaled;
                //     var ctx = canvas.getContext("2d");
                //     ctx.imageSmoothingEnabled = false;
                //     ctx.imageSmoothingQuality="high";
                //     ctx.drawImage(i, 0, 0, iwScaled, ihScaled);
                //     var dataURL1 = canvas.toDataURL("image/jpeg", 0.5);
                //     result = dataURL1.replace(/^data:image\/(png|jpg);base64,/, "");
                // }
                resolved({ w: i.width, h: i.height, src: result })
            };
            i.src = file
        })
    }

    rotateBase64Image(base64data, deg,scl): any {
        return new Promise(function (resolved, rejected) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");

            var i = new Image();
            i.src = base64data;

            var cw = i.width, ch = i.height, cx = 0, cy = 0;
            switch (deg) {
                case 90:
                    cw = i.height;
                    ch = i.width;
                    cy = i.height * (-1);
                    break;
                case 180:
                    cx = i.width * (-1);
                    cy = i.height * (-1);
                    break;
                case 270:
                    cw = i.height;
                    ch = i.width;
                    cx = i.width * (-1);
                    break;
            }
 
            i.onload = function () {
                let dx = cx;
                let dy = cy;
                if (scl != 1) {
                    if(cx==0)cx=cw;
                    if(cy==0)cy=ch;
                    dx = (cx - (cx * scl)) /4;
                    dy = (cy - (cy * scl)) / 4;  
                    ch = ch * scl;
                    cw = cw * scl;
                    
                }
                canvas.height = ch;
                canvas.width = cw;
                ctx.imageSmoothingEnabled = false;
                ctx.imageSmoothingQuality="high";

                ctx.rotate(deg * Math.PI / 180);
                if (scl != 1)
                {
                    ctx.scale(scl - 0.15, scl - 0.15 ); 
                    ctx.drawImage(i, dx, dy, cw, ch);
                }
                else
                    ctx.drawImage(i, cx, cy); 
                resolved({ w: cw, h: ch, src: canvas.toDataURL() })
            };
        })
    }


    handleFiles(base64data) {
        var img = new Image();
        img.src = base64data;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        let that = this;
        img.onload = function () {
            var iw = img.width;
            var ih = img.height;
            var iwScaled = iw * that.scale;
            var ihScaled = ih * that.scale;
            debugger
            var canvas = document.createElement("canvas");
            canvas.width = iwScaled;
            canvas.height = ihScaled;
            canvas.getContext("2d").scale(that.scale - 0.15, that.scale - 0.15);
            canvas.getContext("2d").drawImage(img, (img.width - canvas.width) / 3, (img.height - canvas.height) / 3, iwScaled, ihScaled);

            console.log(canvas.toDataURL());
        }
    }

    saveChanges() {
        this.close(this.changeVal ? this.changeVal.src : undefined)
    }
}
