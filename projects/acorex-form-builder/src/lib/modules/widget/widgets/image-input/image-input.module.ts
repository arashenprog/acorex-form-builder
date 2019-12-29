import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY, AXF_COLOR_PROPERTY, AXF_TEXT_SIZE_PROPERTY, AXF_TEXT_STYLE_PROPERTY } from '../../config/general-properties';

import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';
import { AXFImageInputWidgetDesigner } from './designer/image-input-widget.designer';
import { AXFImageInputWidgetPrint } from './print/image-input-widget.print';
import { AXFImageInputWidgetView } from './view/image-input-widget.view';
import { UploadStructure } from '../../../property-editor/editors/upload/upload.structure';

export const COMPONENTS = [AXFImageInputWidgetDesigner, AXFImageInputWidgetPrint, AXFImageInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFImageInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Image Input",
            hint: "Image input element",
            icon: "far fa-image",
            category: "Editors",
            visible: true,
            name: "image",
            designerClass: AXFImageInputWidgetDesigner,
            printClass: AXFImageInputWidgetPrint,
            viewClass: AXFImageInputWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("1"),
                    padding: new AXFBoxStyleBoxSizeValue("0"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                value: new UploadStructure({
                    srcData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAABIUSURBVHhe7d0FjCxFtwfwxt3d3YO7W5DgDsHCDe4eJFgICYEE1+AEglxcg0NwdxLc3d3hvferb+q+uk3PdPfM7N4Zvv0nnd3pnZmuOn5Onaod7X/+D9kQegajN34OoUcwxJAewxBDegxDDOkxDDGkxzDEkB5DX4a9hvzll19mP/zwQ7j++uuvcH/sscfOJpxwwmzSSScNVz+i5xny2muvZc8++2z2/vvvZ++99172wQcfZGONNVY25phjZqOPPno22mijhQtMxYVBf/75Z/g522yzZbPMMku4FllkkWyOOeYI7+1V9BxDvvjii+yxxx7Lnn766eyNN97I/v7772y88cbLxhhjjBFXHWBKZNCvv/4aPj/XXHNlSy65ZLbUUktlU089deOdvYGeYcg999yT3X333UETSP+4444biBelv1swXcz57bffws+ZZ545W3311bM11lij689qB6OcIeedd1720EMPBUJFTahDmPzw636W9tAcvy+//PLZ7rvv3vjrqMEoYQjJvPDCC7Pbb789m2KKKYIzLiMk02WoPuuKr6MfAa/d99p9muaKr1vBZ3///ffsq6++ytZaa61sp512CuMabAw6Q66//vrsmmuuycYZZ5ygEc1gWNG0INRkk02WjT/++MEpzzTTTIGRE0wwQfgeRAfvJ+0//vhjiMIEAO+++272888/Z998800gcHx/KwH45ZdfwnM32mijbMstt2zcHRwMGkPeeeed7JRTTgmEmnjiiZsSBFERhCmZZ555guNdeOGFs2mmmWYE4evCd3766afZSy+9lD355JPZq6++GjQGg5t9J7IIqSeZZJLswAMPHLTobFAYctFFF2V33XVXNtFEExUSwBD++OOP7Ouvvw4TX3fddbOVVlqpdkRVFczao48+mt10003Zm2++mU0++eQhlC4SEsz8/vvvszXXXDPbcccdG3cHDgPKEBPfc889gwlhXvIT9mimwSVHGDZsWDbVVFM1/jo4+O6774LACLOjSSsa508//RTmcPbZZ5f6o04wYAxhu4844ogQvpK+PEgek8AkkTymYVSC0GCMHAjhi8ZMi/mo4447Lpt11lkbd7uLAWHI448/np166qnBVxSZHVI53XTTZXvttVfIpHsJAoHTTz89+/DDDwvLL3wbE7bffvtlyyyzTONu99B1htx3333ZOeecE6KgvOqbDKe+7bbbZptssknjbm/illtuCRojk8+bKCQTHjPHq6yySuNud9BVhtx7771BuqaffvrGnf8HVQeaM6rNU1UIlQ844IAgWHxLHh9//HH4+8orr9y40zm65p1ELeeee24hM/iK2WefPbv44ov7hhkg9zFm5lUulIe5nnHGGdlTTz3VuNM5uqIhioBHHnlksLl5M0XK1Ip23nnnxp3+hPEXlXWQzxxPOOGErjj6jhki8hCuSrLyDpy/2HjjjbOtt966cac/sc8++4RsvyjyAr7R3y+99NKOc6eOGbLLLrsEKcknfN9++222/vrr9z0zdt111xCil9W1CCYaMNudoCMfokCozJFnhrBwtdVW63tmCG0RukqRkfZIHtGkE7TNELUp5RBJVAoMmn/++fveZ6hfyZeKoqtmQAs0eeuttxp36qNtkyWpU/JItYMtVS654IILGnf6EzQDM1QZWoH25P0K8+aeEks7aEtDrr766hBZ5E3V559/HvKMfgafweSWMUMozxJ4bwo0wczhw4c37tRDbYaIx2+88cZQuU2BQcyUro9+RfQZrcwUg4IJVhclheuss05gTgq0ue666wpzlzLUZghzRHrSeJyaWjRSNu9XVPUZmGFpIC71brPNNqF8jwYRaCMNaMd012II6bjzzjtHUucoMXzKYAIBBBCISDvzF6mVG5DSMkmlGdZiysyUUJ5mMGsp9t1330CD1B37LrSq66JrOfWzzjore+aZZ0aSIjWqhRZaKNt///0bdwYWiGdRSShKEuOVIp2S312Yc8ghh2Srrrpq4y//AeJWNVPLLbdcU8E7+eSTw4pkylRBz2KLLVZLWCszxNu222674CMiAeJAVXfbqVGpmD744IOhSAcWp5ZYYolQ9yrC/fffH7pU2u1K9ByrhBGYa/xlzKBtzFReM1J4z2677Rb8R0of6yyXXXbZP4SmGSqbLJVcSL+YZFnpa7dgqFQvkVKYdF111VWB4M3w+uuvt2yMKAOtYs6ARlfxGQi97LLLtmQGYMTiiy8eaBKBVi65SVVUZogmtjwxTG7YsGGNV/WhbL3VVluFn9YVyro8SFtVSSsChuiM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', 
                    height: 100,
                    width: 100,
                    modeSize: "auto", 
                    isAspectRatio: false
                })

            },
            properties: [
                {
                    name: "alt",
                    category: "General",
                    defaultValue: "",
                    title: "Alt",
                    editor: "TextEditor"
                },
                // {
                //     name: "width",
                //     category: "General",
                //     defaultValue: "100",
                //     title: "Width (px)",
                //     editor: "TextEditor"
                // },
                // {
                //     name: "height",
                //     category: "General",
                //     defaultValue: "100",
                //     title: "Height (px)",
                //     editor: "TextEditor"
                // },
                {
                    name: "value",
                    category: "General",
                    defaultValue: "",
                    title: "",
                    editor: "UploadEditor"
                },
                AXF_BOX_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
            ]
        })
    }
}