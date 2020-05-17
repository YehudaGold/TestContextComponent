import {ComponentType} from 'react';

/** Check if the object has that method (without running get property`s) */
const hasMethod = (object: object, methodName: string | number | symbol): boolean => {
    const descriptor = Object.getOwnPropertyDescriptor(object, methodName);

    return !!descriptor && typeof descriptor.value === 'function';
};

/** Get all method names from the object prototype, stopping on baseClass prototype if exist */
export const getAllMethodNames = <T extends object>(object: T, BaseClass?: ObjectConstructor): Array<keyof T> => {
    const uniqMethodNames = new Set<keyof T>(),
          BaseProto = BaseClass ? BaseClass.prototype : null;

    for (let proto = object; proto && proto !== BaseProto; proto = Object.getPrototypeOf(proto)) {
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
export const getDisplayName = (Component: ComponentType): string =>
    Component.displayName || Component.name || 'Component';