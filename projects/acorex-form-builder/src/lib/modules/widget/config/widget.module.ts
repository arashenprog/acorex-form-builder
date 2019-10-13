import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFRowWidgetModule } from '../widgets/row/row.module';
import { AXFColWidgetModule } from '../widgets/col/col.module';
import { WidgetInjector } from './widget';
import { AXFWidgetSharedModule } from '../shared/shared.module';
import { AXFTextBlockWidgetModule } from '../widgets/text-block/text-block.module';
import { AXFContainerWidgetModule } from '../widgets/container/container.module';


const MODULES = [
    CommonModule,
    AXFWidgetSharedModule,
    AXFRowWidgetModule,
    AXFColWidgetModule,
    AXFTextBlockWidgetModule,
    AXFContainerWidgetModule
];

@NgModule({
    declarations: [],
    imports: [...MODULES],
    exports: [...MODULES],
    providers: [],
})
export class AXFWidgetModule {
    constructor(injector: Injector) {
        WidgetInjector.instance = injector;
    }
}