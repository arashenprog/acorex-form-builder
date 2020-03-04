import { Component, HostListener, ElementRef, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { AXBasePageComponent, EventService, AXRenderService } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { ActivatedRoute } from '@angular/router';
import { AXFTemplateService } from '../../widget/services/template/template.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXFDataService } from '../../widget/services/data.service';

@Component({
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ACFViewerPage extends AXBasePageComponent {


  @ViewChild('print')
  printDiv: ElementRef<HTMLDivElement>;

  mode = 'view';
  widgets: WidgetConfig[] = [];
  loadingSubscription: Subscription;
  intervalId: number;
  printRendering: boolean = false;

  @Output()
  isBusyChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  private _isBusy: boolean = true;
  public get isBusy(): boolean {
    return this._isBusy;
  }
  public set isBusy(v: boolean) {
    if (v != this._isBusy) {
      this._isBusy = v;
      this.isBusyChange.emit(v);
    }
  }


  constructor(
    private widgetService: AXFWidgetService,
    private router: ActivatedRoute,
    private templateService: AXFTemplateService,
    private dataService: AXFDataService,
    private eventService: EventService,
    private renderService: AXRenderService
  ) {
    super();
    this.mode = this.router.snapshot.queryParams.mode;
    //
    debugger;
    this.loadingSubscription = templateService.loadingEvent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(c => {
        //debugger;
        this.isBusy = c;
        // if (this.printRendering && c) {
        //   debugger;
        //   // const html = 'test';
        //   // this.dataService.submit(html).then(() => {

        //   // });
        // }
      });
    //
    eventService.on('__submit', (data) => {
      this.dataService.validate().then(() => {
        debugger;
        this.printRendering = true;
        this.isBusy = true;
        setTimeout(() => {
          const html = this.printDiv.nativeElement.innerHTML;
          let body = '<html><head><meta charset="utf-8"/>' +
            '<style>.realTable thead { display: table-header-group } .realTable tr { page-break-inside: avoid }</style>'
            + '<title>SmartForms Api Sample</title></head><body style="font-family: Segoe UI;padding: 0px;margin: 0px;  ">';
          body = body + html + '</body></html>';

          this.dataService.submit(body).then(() => {
            this.printRendering = false;
            this.isBusy = false;
          });
        }, 2000);

      });
    });

  }

  ngAfterViewInit() {
    this.templateService.load().then(data => {
      this.widgets = [this.widgetService.parse(data.template)];
      // this.intervalId = window.setInterval(() => {
      //   this.connectService.send("sync", { height: document.documentElement.offsetHeight }).then(data => {
      //   })
      // }, 300)
    });
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalId);
    this.loadingSubscription.unsubscribe();
  }
}
