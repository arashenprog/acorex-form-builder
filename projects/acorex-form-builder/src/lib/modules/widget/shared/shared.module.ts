import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetPickerComponent } from './widget-picker/widget-picker.component';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetRendererDirective } from './widget-renderer/widget-renderer.directive';
import { AXFEditorsModule } from '../../property-editor/config/editors.module';
import { AXFWidgetPropPanelComponent } from './widget-prop-panel/widget-prop-panel.component';
import { AXFWordPipe } from '../pipes/word.pipe';
import { SafeUrlPipe } from '../pipes/safeurl.pipe';

@NgModule({
    declarations: [
        AXFWordPipe, 
        SafeUrlPipe,
        AXFWidgetPickerComponent, 
        AXFWidgetRendererDirective, 
        AXFWidgetPropPanelComponent,
    ],
    imports: [CommonModule, ACoreXUIModule, AXFEditorsModule],
    exports: [AXFWordPipe, 
        SafeUrlPipe,
        AXFWidgetPickerComponent, 
        AXFWidgetRendererDirective, 
        AXFWidgetPropPanelComponent, 
        AXFEditorsModule
    ],
    entryComponents: [AXFWidgetPickerComponent],
    providers: [AXFWordPipe],
})
export class AXFWidgetSharedModule { }