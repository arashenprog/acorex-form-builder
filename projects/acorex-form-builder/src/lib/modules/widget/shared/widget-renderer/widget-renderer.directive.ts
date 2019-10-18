import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';
import { AXFWidget } from '../../config/widget';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXFWidgetToolboxComponent } from '../widget-toolbox/widget-toolbox.component';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective {
    private renderChangeObserver: any;
    private widgetInst: any;

    @Input()
    widget: WidgetConfig;

    @Input()
    mode: "designer" | "view" | "print" = "designer";

    @Output()
    onRender: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();

    constructor(
        private target: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    ngOnInit(): void {
        this.render();
    }

    refresh() {
        if (!this.renderChangeObserver) {
            Observable.create(observer => {
                this.renderChangeObserver = observer;
            })
                .pipe(debounceTime(100))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    Object.assign(this.widgetInst, this.widget.options);
                    this.widgetInst.refresh();
                });
        }

        this.renderChangeObserver.next(new Date().getTime());
    }

    render() {
        this.target.clear();
        this.createComponent();
    }


    createComponent() {
        if (!this.widget)
            return;
        //
        let factory = null;
        switch (this.mode) {
            case "designer":
                factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.designerClass);
                break;
            case "view":
                factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.viewClass);
                break;
            default:
                factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.printClass);
        }
        //
        let cmpRef = this.target.createComponent(factory)
        this.widgetInst = (cmpRef.instance as AXFWidget);
        Object.assign(this.widgetInst, { config: this.widget });
        let pp: any = {};
        this.widget.properties.forEach(p => {
            if (!this.widgetInst[p.name] && p.defaultValue && !this.widget.options[p.name]) {
                pp[p.name] = p.defaultValue;
                this.widget.options[p.name] = p.defaultValue;
            }
        });

        Object.assign(this.widgetInst, pp);
        Object.assign(this.widgetInst, this.widget.options);

        this.widgetInst.onRefresh.subscribe(c => {
            Object.assign(this.widgetInst, c);
            this.onRender.emit(this.widgetInst);
        });
        if (!this.widget.toolbox)
            this.widget.toolbox = {};
        //(cmpRef.location.nativeElement as HTMLElement).style.position = "relative";
        if (this.mode == "designer" && this.widget.toolbox.visible != false) {
            let toolboxFactory = this.componentFactoryResolver.resolveComponentFactory(AXFWidgetToolboxComponent);
            let toolbox = this.target.createComponent(toolboxFactory);
            let toolboxInstance = toolbox.instance as AXFWidgetToolboxComponent;
            if (this.widget.toolbox.edite != false) {
                toolboxInstance.edit.subscribe(c => { this.widgetInst.edit(); });
            }
            else {
                toolboxInstance.allowEdit = false;
            }
            // delete
            if (this.widget.toolbox.delete != false) {
                toolboxInstance.delete.subscribe(c => { this.widgetInst.delete(); });
            }
            else {
                toolboxInstance.allowDelete = false;
            }
        }


    }

}