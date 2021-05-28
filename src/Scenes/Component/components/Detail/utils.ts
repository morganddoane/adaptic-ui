import { IComponent } from 'GraphQL/Component/Detail';
import { ComponentEdits } from './types';

export const getEdits = (component: IComponent): ComponentEdits => {
    const comp = new ComponentEdits(
        component.id,
        component.name,
        component.description,
        component.nodes.map((n) => {
            if (n.__typename === 'ComponentNode') {
                return { ...n, componentID: n.component.id };
            }
            if (n.__typename === 'ProductNode') {
                return {
                    ...n,
                    inputIDs: n.productInputIDs,
                    value: n.productValue,
                };
            }
            if (n.__typename === 'SumNode') {
                return { ...n, inputIDs: n.sumInputIDs, value: n.sumValue };
            }
            if (n.__typename === 'NumberNode') {
                return { ...n, value: n.numberValue };
            }
            if (n.__typename === 'StringNode') {
                return { ...n, value: n.value };
            }
            if (n.__typename === 'DeltaNode') {
                return { ...n, value: n.deltaValue };
            }
            return n;
        }),
        component.captures
    );

    return comp;
};
