
import { PromisResult } from 'acorex-ui';
import { WidgetConfig } from '../widget.service';
import { AXFTemplateModel } from '../db/database';
import { Observable } from 'rxjs';



export abstract class AXFTemplateService {

    abstract checkExists(name: string): PromisResult<boolean>;

    abstract saveForm(name: string, type: 'form' | 'widget', widget: WidgetConfig, description?: string): PromisResult<boolean>;

    abstract load(): PromisResult<AXFTemplateModel>;

    abstract get(id: string, findName?: boolean): PromisResult<AXFTemplateModel>;

    abstract getFormList(): PromisResult<AXFTemplateModel[]>;

    abstract getWidgetList(): PromisResult<AXFTemplateModel[]>;

    abstract loadingEvent(): Observable<boolean>;
}