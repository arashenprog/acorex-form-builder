import { Directive, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective { 

    @Input()
    widget: WidgetConfig;

    constructor(
        private target:ViewContainerRef, 
        private componentFactoryResolver: ComponentFactoryResolver, 
        ) {}
    
    ngOnInit(): void {
      this.createComponent();
    }
    
    createComponent() {
        let factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.designerClass);
        let cmpRef = this.target.createComponent(factory)
        Object.assign(cmpRef.instance, this.widget.options);
    }

}