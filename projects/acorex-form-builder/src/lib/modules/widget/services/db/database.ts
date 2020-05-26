import { WidgetConfig } from '../widget.service';

export interface AFXSaveTemplateModel{
    name: string, 
    type: 'form' | 'widget', 
    widget: WidgetConfig, 
    description?: string,
    printHtml?:string
}

export interface AXFTemplateModel {
    id: string;
    name: string,
    description?: string,
    template?: string,
    type: "form" | "widget";
}