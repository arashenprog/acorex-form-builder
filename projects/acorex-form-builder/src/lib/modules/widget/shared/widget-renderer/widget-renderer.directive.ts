import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';
import { AXFWidget } from '../../config/widget';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective {


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
        const widgetInst = (cmpRef.instance as AXFWidget);
        Object.assign(widgetInst, { config: this.widget });
        let pp: any = {};
        this.widget.properties.forEach(p => {
            if (!widgetInst[p.name] && p.defaultValue && !this.widget.options[p.name]) {
                pp[p.name] = p.defaultValue;
                this.widget.options[p.name] = p.defaultValue;
            }
        });
        
        Object.assign(widgetInst, pp);
        Object.assign(widgetInst, this.widget.options);
        
        widgetInst.onRefresh.subscribe(c => {
            Object.assign(widgetInst, c);
            this.onRender.emit(widgetInst);
        });
        (cmpRef.location.nativeElement as HTMLElement).style.position = "relative";
    }

}