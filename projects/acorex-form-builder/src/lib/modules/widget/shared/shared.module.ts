import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetPickerComponent } from './widget-picker/widget-picker.component';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetRendererDirective } from './widget-renderer/widget-renderer.directive';
import { AXFEditorsModule } from '../../property-editor/config/editors.module';
import { AXFWidgetPropPanelComponent } from './widget-prop-panel/widget-prop-panel.component';
import { AXFWordPipe } from '../pipes/word.pipe';
import { SafeUrlPipe } from '../pipes/safeurl.pipe';
import { AXFDataItemPipe } from '../pipes/data-item.pipe';
import { ResolveUrlPipe } from '../pipes/resolveurlasync.pipe';

@NgModule({
    declarations: [
        AXFWordPipe, 
        SafeUrlPipe,
        ResolveUrlPipe,        
        AXFDataItemPipe,
        AXFWidgetPickerComponent, 
        AXFWidgetRendererDirective, 
        AXFWidgetPropPanelComponent,
    ],
    imports: [CommonModule, ACoreXUIModule, AXFEditorsModule],
    exports: [AXFWordPipe, 
        SafeUrlPipe,
        ResolveUrlPipe,
        AXFDataItemPipe,
        AXFWidgetPickerComponent, 
        AXFWidgetRendererDirective, 
        AXFWidgetPropPanelComponent, 
        AXFEditorsModule
    ],
    entryComponents: [AXFWidgetPickerComponent],
    providers: [AXFWordPipe],
})
export class AXFWidgetSharedModule { }