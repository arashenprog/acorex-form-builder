import { IValidationRuleResult, AXValidationRule } from 'acorex-ui';

export class AXFValidatorProp {
    items: AXValidationRule[] = [];
    enabled: boolean = true;
    validate(value: any): Promise<IValidationRuleResult> {
        return new Promise<IValidationRuleResult>(resolve => {
            Promise.all(
                this.items.map(c => {
                    const v: AXValidationRule = new AXValidationRule();
                    Object.assign(v, c);
                    c = v;
                    return c.validate(value);
                })
            ).then(d => {
                const error = d.find(c => c.result === false);
                if (error) {
                    resolve(error);
                } else {
                    resolve({ result: true });
                }
            });
        });
    }
}