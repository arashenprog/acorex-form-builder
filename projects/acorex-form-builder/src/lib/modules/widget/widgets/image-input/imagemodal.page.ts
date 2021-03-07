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
    changeVal:any;
    degree:number=0; 
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
            let that= this;
            document.querySelectorAll(".btn-container .default")        
            .forEach(f=>f.addEventListener('click',async function(event) {                    
                    if((event.target as any).className=="fa-undo fas" || (event.target as any).lastChild.className=="fa-undo fas")
                    { 
                        that.degree+=90;
                        if(that.degree==360) that.degree=0; 
                    }
                    that.changeVal= await that.rotateBase64Image(that.images[0],that.degree);
                })
            )
        }, 500); 
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
                    var canvas = document.createElement("canvas");
                    var scale = 500 / i.height;
                    var iwScaled = i.width * scale;
                    var ihScaled = i.height * scale;
                    canvas.width = iwScaled;
                    canvas.height = ihScaled;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(i, 0, 0, iwScaled, ihScaled);
                    var dataURL1 = canvas.toDataURL("image/jpeg",0.5);
                    result= dataURL1.replace(/^data:image\/(png|jpg);base64,/, "");
                }
                resolved({ w: i.width, h: i.height, src: result })
            };
            i.src = file
        })
    }

    rotateBase64Image(base64data,deg): any {
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
            canvas.height = ch;
            canvas.width = cw;
 
            i.onload = function() { 
                ctx.rotate(deg * Math.PI / 180);  
                ctx.drawImage(i, cx, cy);  
                resolved({ w: cw, h: ch, src: canvas.toDataURL() }) 
            };
        })
    }


    saveChanges()
    {
        this.close(this.changeVal?this.changeVal.src:undefined)
    } 
}
