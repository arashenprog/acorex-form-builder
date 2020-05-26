
import { PromisResult } from 'acorex-ui';
import { AXFTemplateModel, AFXSaveTemplateModel } from '../db/database';
import { Observable } from 'rxjs';



export abstract class AXFTemplateService {

    abstract saveForm(model: AFXSaveTemplateModel): PromisResult<boolean>;

    abstract load(): PromisResult<AXFTemplateModel>;

    abstract get(id: string): PromisResult<AXFTemplateModel>;

    abstract getWidgetList(): PromisResult<AXFTemplateModel[]>;

    abstract loadingEvent(): Observable<boolean>;
}