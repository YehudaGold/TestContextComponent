import {ComponentType} from 'react';

/** Check if there `methodName` on the `target` without running get properties */
const hasMethod = (target: object, key: PropertyKey): boolean => {
    const descriptor = Object.getOwnPropertyDescriptor(target, key);

    return !!descriptor && typeof descriptor.value === 'function';
};

/** Collecting all method names from the `target` prototype, stopping on `BaseClass` prototype if exist */
export const getAllMethodNames = <T extends object>(target: T, BaseClass?: ObjectConstructor): Array<keyof T> => {
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

/**
 * Get component displayName.
 * [react-docs:higher-order-components](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)
 */
export const getDisplayName = (Component: ComponentType<unknown>): string =>
    Component.displayName || Component.name || 'Component';