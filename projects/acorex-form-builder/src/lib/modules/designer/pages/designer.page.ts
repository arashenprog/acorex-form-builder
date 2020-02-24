import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ViewChild, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXPopupService, AXBasePageComponent, AXHtmlUtil, MenuItem, EventService, AXToastService, AXToolbarMenuComponent } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { AXFWidgetContainer, AXFWidgetDesigner } from '../../widget/config/widget';
import { AXFLoadTemplatePage } from './template/load-template.page';
import { AXFSaveTemplatePage } from './template/save-template.page';
import { AXFConnectService } from '../../widget/services/connect.service';
import { AXFTemplateService } from '../../widget/services/template/template.service';

@Component({
    templateUrl: './designer.page.html',
    styleUrls: ['./designer.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ACFDesignerPage extends AXBasePageComponent implements AXFWidgetContainer {

    @ViewChild('paper')
    paper: ElementRef<HTMLDivElement>;

    @ViewChild('actionToolbar')
    actionToolbar: AXToolbarMenuComponent;

    constructor(
        private popup: AXPopupService,
        private cdr: ChangeDetectorRef,
        private widgetService: AXFWidgetService,
        private toastService: AXToastService,
        private eventService: EventService,
        private templateService: AXFTemplateService,
        private connectService: AXFConnectService


    ) {
        super();
        eventService.on('SELECT', (c: AXFWidgetDesigner) => {
            setTimeout(() => {
                if (c) {
                    this.docTreeItems = [];
                    this.docTreeItems.push(c);
                    let parent: AXFWidgetDesigner = c.parent;
                    while (parent != null && parent.config) {
                        this.docTreeItems.push(parent);
                        parent = parent.parent;
                    }
                    this.docTreeItems.reverse();
                }
            }, 10);
        });
    }

    docTreeItems: AXFWidgetDesigner[] = [];

    widgets: WidgetConfig[] = [];
    mode = 'designer';
    view = 'designer';
    isSaving: boolean = false;

    viewModeItems: MenuItem[] = [
        {
            startIcon: 'fas fa-paint-brush',
            name: 'designer',
            text: ' Design View',
            groupName: 'mode',
            selected: true,
            style: 'light',
            data: 'designer'
        },
        {
            startIcon: 'fas fa-desktop',
            name: 'form',
            text: ' Preview',
            groupName: 'mode',
            style: 'light',
            data: 'view'
        }
    ];

    actionItems: MenuItem[] = [
        {
            startIcon: 'fas fa-save',
            name: 'save',
            text: 'Save',
            style: 'ax-success',
        },
    ];



    handleViewModeClick(e: MenuItem) {
        if (e.name === 'form' && (this.widgets == null || this.widgets.length === 0)) {
            this.toastService.error('The form is blank!');
            return;
        }
        this.view = e.name;
        this.mode = e.data;
    }

    handleActionClick(e: MenuItem) {
        if (this.widgets == null || this.widgets.length === 0) {
            this.toastService.error('The form is blank!');
            return;
        }
        switch (e.name) {
            case 'save':
                {
                    if (this.isSaving) {
                        return;
                    }
                    this.isSaving = true;
                    this.actionItems[0].startIcon = 'fas fa-spinner fa-pulse';
                    this.actionToolbar.update();
                    console.log(this.widgetService.serialize(this.widgets[0]));
                    this.templateService.saveForm('', 'form', this.widgets[0]).then(s => {
                        this.actionItems[0].startIcon = 'fas fa-save';
                        this.isSaving = false;
                        this.actionToolbar.update();
                        this.toastService.success('Saved successfuly!');
                    });
                    break;
                }
        }
    }

    handleStartClick() {
        const page = this.widgetService.resolve('page');
        Object.assign(page.options, { uid: AXHtmlUtil.getUID() });
        this.widgets.push(page);
    }

    handleLoadClick() {
        this.popup.open(AXFLoadTemplatePage, 'Load Template').closed(c => {
            if (c.data) {
                this.widgets.push(c.data);
            }
        });
    }

    handleBreadcrumbClick(item: AXFWidgetDesigner) {
        this.eventService.broadcast('SELECT', item);
    }

    ngAfterViewInit() {
        this.connectService.send('load').then(data => {
            if (data && data.widgets && data.widgets.length > 0) {
                this.widgets = [this.widgetService.parse(data.widgets)];
            } else {
                const page = this.widgetService.resolve('page');
                Object.assign(page.options, { uid: AXHtmlUtil.getUID() });
                this.widgets.push(page);
            }
        });
    }

    @HostListener('window:mousewheel', ['$event'])
    onWindowScroll(e: MouseWheelEvent) {
        if (!this.paper) {
            return;
        }
        if (AXHtmlUtil.isInRecPoint({
            x: e.clientX,
            y: e.clientY
        }, {
            height: this.paper.nativeElement.clientHeight,
            width: this.paper.nativeElement.clientWidth,
            left: this.paper.nativeElement.getBoundingClientRect().left,
            top: this.paper.nativeElement.getBoundingClientRect().top,
        })) {
            this.paper.nativeElement.scrollBy({
                top: e.deltaY / 1.5,
                left: 0
            });
        }
    }
}
