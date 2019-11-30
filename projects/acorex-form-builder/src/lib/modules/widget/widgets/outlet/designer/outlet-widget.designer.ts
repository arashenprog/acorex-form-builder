import { Component, OnInit } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.designer.html',
    styleUrls: ['./outlet-widget.designer.scss']
})
export class AXFOutletWidgetDesigner extends AXFWidgetDesigner {

    template: string;

    constructor() {
        super();
    }


    refresh() {
        console.log("refresh", this.template)
        if (this.template && this.template[0] == "1") {
            this.widgets = this.widgetService.parse(`[
            {
                "name": "row",
                "options": {
                    "bgColor": "inherit",
                    "boxStyle": {
                        "border": {
                            "left": "0",
                            "right": "0",
                            "top": "0",
                            "bottom": "0"
                        },
                        "padding": {
                            "left": "0",
                            "right": "0",
                            "top": "0",
                            "bottom": "0"
                        },
                        "margin": {
                            "left": "0",
                            "right": "0",
                            "top": "0",
                            "bottom": "0"
                        }
                    },
                    "widgets": [
                        {
                            "name": "col",
                            "options": {
                                "size": 2,
                                "bgColor": "inherit",
                                "boxStyle": {
                                    "border": {
                                        "left": "0",
                                        "right": "0",
                                        "top": "0",
                                        "bottom": "0"
                                    },
                                    "padding": {
                                        "left": "5",
                                        "right": "5",
                                        "top": "5",
                                        "bottom": "5"
                                    },
                                    "margin": {
                                        "left": "0",
                                        "right": "0",
                                        "top": "0",
                                        "bottom": "0"
                                    }
                                },
                                "textAlign": [
                                    "left"
                                ],
                                "verticalAlign": [
                                    "top"
                                ],
                                "widgets": [
                                    {
                                        "name": "text",
                                        "options": {
                                            "text": "Date:",
                                            "color": "#000000",
                                            "bgColor": "inherit",
                                            "fontSize": [
                                                "small"
                                            ],
                                            "textStyle": [
                                                "bold"
                                            ],
                                            "textDirection": [
                                                "inherit"
                                            ],
                                            "textAlign": [
                                                "right"
                                            ],
                                            "verticalAlign": [
                                                "top"
                                            ],
                                            "boxStyle": {
                                                "border": {
                                                    "left": "0",
                                                    "right": "0",
                                                    "top": "0",
                                                    "bottom": "0"
                                                },
                                                "padding": {
                                                    "left": "2",
                                                    "right": "2",
                                                    "top": "2",
                                                    "bottom": "2"
                                                },
                                                "margin": {
                                                    "left": "2",
                                                    "right": "2",
                                                    "top": "2",
                                                    "bottom": "2"
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "name": "col",
                            "options": {
                                "size": 10,
                                "bgColor": "inherit",
                                "boxStyle": {
                                    "border": {
                                        "left": "0",
                                        "right": "0",
                                        "top": "0",
                                        "bottom": "0"
                                    },
                                    "padding": {
                                        "left": "5",
                                        "right": "5",
                                        "top": "5",
                                        "bottom": "5"
                                    },
                                    "margin": {
                                        "left": "0",
                                        "right": "0",
                                        "top": "0",
                                        "bottom": "0"
                                    }
                                },
                                "textAlign": [
                                    "left"
                                ],
                                "verticalAlign": [
                                    "top"
                                ],
                                "widgets": [
                                    {
                                        "name": "textbox",
                                        "options": {
                                            "color": "#000000",
                                            "bgColor": "#FFFFFF",
                                            "fontSize": [
                                                "inherit"
                                            ],
                                            "textStyle": [],
                                            "textDirection": [
                                                "inherit"
                                            ],
                                            "textAlign": [
                                                "left"
                                            ],
                                            "verticalAlign": [
                                                "top"
                                            ],
                                            "boxStyle": {
                                                "border": {
                                                    "left": "1",
                                                    "right": "1",
                                                    "top": "1",
                                                    "bottom": "1"
                                                },
                                                "padding": {
                                                    "left": "2",
                                                    "right": "2",
                                                    "top": "2",
                                                    "bottom": "2"
                                                },
                                                "margin": {
                                                    "left": "1",
                                                    "right": "1",
                                                    "top": "1",
                                                    "bottom": "1"
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]`);
        }
        if(this.template && this.template[0]=="2")
        {
            this.widgets = this.widgetService.parse(` [
                {
                    "name": "text",
                    "options": {
                        "text": "Firstname:",
                        "color": "#000000",
                        "bgColor": "inherit",
                        "fontSize": [
                            "small"
                        ],
                        "textStyle": [
                            "bold"
                        ],
                        "textDirection": [
                            "inherit"
                        ],
                        "textAlign": [
                            "right"
                        ],
                        "verticalAlign": [
                            "top"
                        ],
                        "boxStyle": {
                            "border": {
                                "left": "0",
                                "right": "0",
                                "top": "0",
                                "bottom": "0"
                            },
                            "padding": {
                                "left": "2",
                                "right": "2",
                                "top": "2",
                                "bottom": "2"
                            },
                            "margin": {
                                "left": "2",
                                "right": "2",
                                "top": "2",
                                "bottom": "2"
                            }
                        }
                    }
                }
            ]`)
        }
        super.refresh();
    }
}

