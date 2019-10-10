import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFRowWidgetModule } from './row/row.module';
import { AXFColWidgetModule } from './col/col.module';
import { WidgetInjector } from './widget';

const MODULES = [CommonModule, AXFRowWidgetModule, AXFColWidgetModule];

@NgModule({
    declarations: [],
    imports: [...MODULES],
    exports: [...MODULES],
    providers: [],
})
export class AXFGenericWidgetsModule {
    constructor(injector: Injector) {
        WidgetInjector.instance = injector;
    }
}