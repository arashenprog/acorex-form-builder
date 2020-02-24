import { Component, HostListener, ViewChild, ElementRef, Input, Sanitizer, ViewEncapsulation } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { AXHtmlUtil, AXPopupService } from 'acorex-ui';
import { AXFTemplateService } from '../../widget/services/template/template.service';
import { AXFDataService } from '../../widget/services/data.service';
import { AXFConnectService } from '../../widget/services/connect.service';
import { ACFViewerPrintPopup } from './print.popup';


@Component({
    selector: "axf-viewer-frame",
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ACFViewerFrameComponent {

    url: SafeResourceUrl;
    @ViewChild('frame', { static: true })
    frame: ElementRef<HTMLIFrameElement>;
    isLoading = false;

    private uid: string = AXHtmlUtil.getUID();

    constructor(
        private widgetService: AXFWidgetService,
        private dataService: AXFDataService,
        private templateService: AXFTemplateService,
        private sanitizer: DomSanitizer,
        private connectService: AXFConnectService,
        private popupService: AXPopupService,
    ) {
        this.size = this.sizes[0].width;
        this.loadFrame();
    }

    @Input()
    page: WidgetConfig;

    widgets: WidgetConfig[] = [];





    sizes: any[] = [
        {
            title: 'Desktop',
            icon: 'fas fa-desktop',
            width: 'desktop',
            active: true,
            mode: 'view'
        },
        {
            title: 'Tablet',
            icon: 'fas fa-tablet-alt',
            width: 'tablet',
            active: false,
            mode: 'view'
        },
        {
            title: 'Mobile',
            icon: 'fas fa-mobile-alt',
            width: 'mobile',
            active: false,
            mode: 'view'
        },
        {
            title: 'Print',
            icon: 'fas fa-print',
            width: 'desktop',
            active: false,
            mode: 'print'
        }
    ];

    size: number;
    mode = 'view';
    orientation = 0;


    @HostListener('window:message', ['$event'])
    handleMessage(e) {
        if (!e.data || !e.data.action && e.data.uid != this.uid) {
            return;
        }
        const action = e.data.action;
        const reqId = e.data.reqId;
        const options = e.data.data ? JSON.parse(e.data.data) : {};
        switch (action) {
            case 'load':
                if (options.id == null) {
                    this.postMessage(action, reqId, {
                        widgets: this.widgetService.serialize(this.page)
                    });
                } else {
                    this.templateService.get(options.id).then(c => {
                        this.postMessage(action, reqId, {
                            widgets: c.template
                        });
                    });
                }
                break;
            case 'getModel':
                this.postMessage(action, reqId, this.dataService.getModel());
                break;
            case 'getList':
                if (options.name) {
                    this.dataService.getList(options.name, options.params).then(items => {
                        this.postMessage(action, reqId, {
                            items
                        });
                    });
                }
                break;
                // case 'sync':
                //     if (options.height && this.frame) {
                //         this.frame.nativeElement.style.height = options.height + 'px';
                //     }
                break;
        }

    }

    private postMessage(action: string, reqId: number, data: any) {
        this.frame.nativeElement.contentWindow.postMessage({
            uid: this.uid,
            action,
            reqId,
            data: data ? JSON.stringify(data) : null
        }, '*');
    }


    ngOnInit() {
        this.widgets.push(this.widgetService.parse(this.widgetService.serialize(this.page)));
        // this.frame.nativeElement.addEventListener("load", () => {
        //     this.frame.nativeElement.scrollTop = 0;
        // });
    }

    handleSetSize(e) {
        this.sizes.forEach(c => {
            c.active = false;
        });
        this.size = e.width;
        this.mode = e.mode;
        e.active = true;
        this.frame.nativeElement.parentElement.scrollTo({ left: 0, top: 0 });
        this.loadFrame();
    }


    private loadFrame(): void {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`view?mode=${this.mode}&uid=${this.uid}&rnd=${AXHtmlUtil.getUID()}`);
    }

    pdfGenerate() {

        this.popupService.open(ACFViewerPrintPopup, {
            title: 'Generate Pdf',
            closable: true,
            size: 'md'
        }).closed(c => {
            if (c.data) {
                const printbody = this.frame.nativeElement.contentDocument.querySelector('.theme-wrapper> ng-component >ng-component>div ').innerHTML;
                let result = '<html><head>' +
                    '<style>.realTable thead { display: table-header-group } .realTable tr { page-break-inside: avoid }</style>'
                    + '<title>SmartForms Api Sample</title></head><body style="font-family: Segoe UI;padding: 0px;margin: 0px;  ">';
                result = result + printbody + '</body></html>';
                this.isLoading = true;
                this.connectService.send('print', {
                    data: {
                        template: result,
                        pageSize: c.data.size
                    }
                }).then(() => {
                    this.isLoading = false;
                });
            }
        });

    }

}
