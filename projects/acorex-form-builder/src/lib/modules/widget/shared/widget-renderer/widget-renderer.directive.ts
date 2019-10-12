import { Directive, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';
import { AXHtmlUtil } from 'acorex-ui';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective {
    

    @Input()
    widget: WidgetConfig;

    @Input()
    mode: "designer" | "view" | "print" = "designer";

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
        Object.assign(cmpRef.instance, this.widget.options);
        Object.assign(cmpRef.instance, { config: this.widget });
        let pp: any = {};
        this.widget.properties.forEach(p => {
            if (!cmpRef.instance[p.name] && p.defaultValue) {
                pp[p.name] = p.defaultValue;
                this.widget.options[p.name] = p.defaultValue;
            }
        });
        Object.assign(cmpRef.instance, pp);
        (cmpRef.location.nativeElement as HTMLElement).style.position = "relative";
    }

}