/** Check if there `methodName` on the `object` without running get properties */
export const hasMethod = (object, methodName) => {
    const descriptor = Object.getOwnPropertyDescriptor(object, methodName);

    return !!descriptor && typeof descriptor.value === 'function';
};

/** Collecting all method names from the `object` prototype, stopping on `baseClass` prototype if exist */
export const getAllMethodNames = (object, BaseClass) => {
    const uniqMethodNames = new Set(),
          BaseProto = BaseClass ? BaseClass.prototype : null;

    for (let proto = object; proto && proto !== BaseProto; proto = Object.getPrototypeOf(proto)) {
        Object.getOwnPropertyNames(proto).forEach((propertyName) => {
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
export const getDisplayName = Component =>
    Component.displayName || Component.name || 'Component';