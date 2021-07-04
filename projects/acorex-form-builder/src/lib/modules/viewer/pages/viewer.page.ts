import { Component, HostListener, ElementRef, ViewEncapsulation, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AXBasePageComponent, EventService, AXRenderService } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { ActivatedRoute } from '@angular/router';
import { AXFTemplateService } from '../../widget/services/template/template.service';
import { Observable, Subscription } from 'rxjs';
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
    this.loadingSubscription = templateService.loadingEvent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(c => {
        this.isBusy = c;
      });
    //
    eventService.on('__submit', (data) => {
      if (localStorage.getItem("CreateHtml")) {
        this.dataService.validate().then(() => {
          var model = JSON.parse(JSON.stringify(this.dataService.getModel()));
          this.printRendering = true;
          this.isBusy = true;

          // setTimeout(() => {
          //   let body = ""; 
          //   const html = this.printDiv.nativeElement.innerHTML;
          //   body = '<html><head><meta charset="utf-8"/>' +
          //     '<style>.realTable thead { display: table-header-group } .realTable tr { page-break-inside: avoid }</style>'
          //     + '<title>SmartForms Api Sample</title></head><body style="font-family: Segoe UI;padding: 0px;margin: 0px;  ">';
          //   body = body + html + '</body></html>';  

            
          //   this.dataService.submit(model, body)
          //     .catch((e) => {
          //       if (e && e.target && e.target._rootElement) {
          //         (e.target._rootElement as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
          //       }
          //     })
          //     .finally(() => {
          //       this.isBusy = false;
          //       this.printRendering = false;
          //     });
          // }, 10000);
          
          const printFunc=() => {
            console.log("print", new Date());
            let body = ""; 
            const html = this.printDiv.nativeElement.innerHTML;
            body = '<html><head><meta charset="utf-8"/>' +
              '<style>.realTable thead { display: table-header-group } .realTable tr { page-break-inside: avoid }</style>'
              + '<title>SmartForms Api Sample</title></head><body style="font-family: Segoe UI;padding: 0px;margin: 0px;  ">';
            body = body + html + '</body></html>';  

            this.dataService.submit(model, body)
              .catch((e) => {
                if (e && e.target && e.target._rootElement) {
                  (e.target._rootElement as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
                }
              })
              .finally(() => {
                this.isBusy = false;
                this.printRendering = false;
              });
          };
  
          // timeout for print element visibility
          setTimeout(() => {
            console.log("start", new Date());
            let elementObserver:MutationObserver;
            //
            const observerable$ = new Observable<number>(observer => {
              elementObserver = new MutationObserver(()=>{
                console.log("length", this.printDiv.nativeElement.innerHTML.length);
                observer.next(new Date().getTime());
              });
              elementObserver.observe( this.printDiv.nativeElement,{ attributes: true, childList: true, characterData: true , subtree : true });
            });
  
            const subscription = observerable$
            .pipe(
              debounceTime(1000),
              distinctUntilChanged()
            )
            .subscribe(() => {
              console.log("finish", new Date());
              printFunc();
              if(elementObserver)
                elementObserver.disconnect();
              subscription.unsubscribe();
            });
          }, 500);


        }).catch((e) => {
          if (e && e.target && e.target._rootElement) {
            (e.target._rootElement as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
          }
        }).finally(() => {
          this.isBusy = false; 
          
        });
      } else {
        this.dataService.validate().then(() => {
          this.isBusy = true;
          this.dataService.submit()
            .catch((e) => {
              if (e && e.target && e.target._rootElement) {
                (e.target._rootElement as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
              }
            })
            .finally(() => {
              this.isBusy = false;
            });
        }).catch((e) => {
          if (e && e.target && e.target._rootElement) {
            (e.target._rootElement as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
          }
        }).finally(() => {
          this.isBusy = false;
        });
      }
    });
  }

  ngAfterViewInit() {
    this.templateService.load().then(data => {
      this.widgets = [this.widgetService.parse(data.template)];
    });

 
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalId);
    this.loadingSubscription.unsubscribe();
  }
}
