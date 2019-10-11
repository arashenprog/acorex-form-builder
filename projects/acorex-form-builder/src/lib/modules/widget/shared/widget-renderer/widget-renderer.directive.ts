import { Directive, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';
import { AXHtmlUtil } from 'acorex-ui';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective {

    @Input()
    widget: WidgetConfig;

    constructor(
        private target: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    ngOnInit(): void {
        this.createComponent();
    }

    createComponent() {
        let factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.designerClass);
        let cmpRef = this.target.createComponent(factory)
        Object.assign(cmpRef.instance, this.widget.options);
        Object.assign(cmpRef.instance, { config: this.widget });
        let pp: any = {};
        this.widget.properties.forEach(p => {
            if (!cmpRef.instance[p.name] && p.defaultValue)
                pp[p.name] = p.defaultValue;
        });
        Object.assign(cmpRef.instance, pp);
        (cmpRef.location.nativeElement as HTMLElement).classList.add("widget-editor");
    }

}