import PropTypes from 'prop-types';
import React, {forwardRef, FunctionComponent, Ref} from 'react';

import type {ComponentOrMemo, ForwardRefComponentType} from '../types';

/** `propType` for ref of react element */
export const ElementRefPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.elementType})
]);

/** Wraps the `WrappedComponent` with `React.forwardRef` and provide `forwardedRef` prop. */
const withForwardRef = <Props, >(WrappedComponent: FunctionComponent<Props>): ForwardRefComponentType<Props> => {
    const ForwardRefComponent = (props: Props, ref: Ref<ComponentOrMemo<Props>>) =>
        <WrappedComponent {...props} forwardedRef={ref} />;
    ForwardRefComponent.displayName = WrappedComponent.displayName;

    return forwardRef(ForwardRefComponent);
};

export default withForwardRef;