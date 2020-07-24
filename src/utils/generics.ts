import {ComponentType} from 'react';

/** Check if `target` has its own method in `key` property (without running get property`s) */
const hasMethod = (target: object, key: string | number | symbol): boolean => {
    const descriptor = Object.getOwnPropertyDescriptor(target, key);

    return !!descriptor && typeof descriptor.value === 'function';
};

export type Constructor = new (...args: any[]) => any;

/** Get all method names from the `target` prototype, stopping on `baseClass` prototype if exist */
export const getAllMethodNames = <T extends object>(target: T, BaseClass?: Constructor): Array<keyof T> => {
    const uniqMethodNames = new Set<keyof T>(),
          BaseProto = BaseClass ? BaseClass.prototype : null;

    for (let proto = target; proto && proto !== BaseProto; proto = Object.getPrototypeOf(proto)) {
        (Object.getOwnPropertyNames(proto) as Array<keyof T>)
            .forEach(propertyName => {
                if (propertyName !== 'constructor' && hasMethod(proto, propertyName)) {
                    uniqMethodNames.add(propertyName);
                }
            });
    }

    return [...uniqMethodNames];
};

/** Get react component display name, from https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging */
export const getDisplayName = <Props>(Component: ComponentType<Props>): string =>
    Component.displayName || Component.name || 'Component';