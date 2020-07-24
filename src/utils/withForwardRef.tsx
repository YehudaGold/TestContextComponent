import React, {forwardRef, ForwardRefRenderFunction, FunctionComponent, ComponentType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes} from 'react';

const withForwardRef = <RefType extends FunctionComponent, Props>(
    WrappedComponent: ComponentType<Props>
): ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<RefType>> => {
    const ForwardRef: ForwardRefRenderFunction<RefType, Props> = (props, ref) =>
        <WrappedComponent {...props} forwardedRef={ref} />;
    ForwardRef.displayName = WrappedComponent.displayName;

    return forwardRef<RefType, Props>(ForwardRef);
};

export default withForwardRef;