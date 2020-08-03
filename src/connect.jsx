import PropTypes from 'prop-types';
import React, {useContext, memo} from 'react';

import {getDisplayName} from './utils/generics';
import withForwardRef, {RefPropType} from './utils/withForwardRef';

/** HOC to consume and transform `ContextComponents[]` contexts to props. */
const connect = (WrappedComponent, ContextComponents, mapContextsToProps, options = {}) => {
    const wrappedComponentName = getDisplayName(WrappedComponent); // Cached before memo

    if (typeof options.memo === 'function') {
        WrappedComponent = memo(WrappedComponent, options.memo);
    } else if (options.memo !== false) {
        WrappedComponent = memo(WrappedComponent);
    }

    let ConnectComponent = ContextComponents.reduceRight(
        (PreviousComponent, ContextComponent, index) => {
            const ConsumeComponent = ({contexts = [], forwardedRef, ...props}) => {
                contexts[index] = useContext(ContextComponent.componentContext);

                if (PreviousComponent) {
                    return <PreviousComponent {...props} contexts={contexts} forwardedRef={forwardedRef} />;
                }

                return <WrappedComponent {...props} {...mapContextsToProps(contexts, props)} ref={forwardedRef} />;
            };
            ConsumeComponent.displayName = `connect[${getDisplayName(ContextComponent)}](${wrappedComponentName})`;
            ConsumeComponent.propTypes = {contexts: PropTypes.array, forwardedRef: RefPropType};

            return ConsumeComponent;
        },
        null
    );

    if (options.forwardRef) ConnectComponent = withForwardRef(ConnectComponent);

    return ConnectComponent;
};

export default connect;