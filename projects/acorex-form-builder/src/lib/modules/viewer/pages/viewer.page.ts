import { Component, HostListener, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { ActivatedRoute } from '@angular/router';
import { AXFTemplateService } from '../../widget/services/template/template.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ACFViewerPage extends AXBasePageComponent {

  mode = 'view';
  widgets: WidgetConfig[] = [];
  loadingSubscription: Subscription;
  intervalId: number;

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
