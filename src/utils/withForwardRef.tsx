import PropTypes from 'prop-types';
import React, {ComponentType, forwardRef, Ref, PropsWithoutRef, RefAttributes} from 'react';

/** `propType` for ref of react element */
export const ElementRefPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.elementType})
]);

export type PropsWithRef<Props> = PropsWithoutRef<Props> & RefAttributes<ComponentType<Props>>;

/** Wraps the `WrappedComponent` with `React.forwardRef` and provide `forwardedRef` prop. */
const withForwardRef = <Props, >(WrappedComponent: ComponentType<Props>): ComponentType<PropsWithRef<Props>> => {
    const ForwardRefComponent = (props: Props, ref: Ref<ComponentType<Props>>) =>
        <WrappedComponent {...props} forwardedRef={ref} />;
    ForwardRefComponent.displayName = WrappedComponent.displayName;

    return forwardRef(ForwardRefComponent);
};

export default withForwardRef;