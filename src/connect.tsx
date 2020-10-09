import React, {useContext, memo, ComponentType, FunctionComponent} from 'react';

import ContextComponent from './contextComponent';
import type {CCInternalProps, ConnectOptions, MapContextsToProps, ComponentOrRef, WrappedComponentProps} from './types';
import {getDisplayName} from './utils/generics';
import withForwardRef from './utils/withForwardRef';

const consumeComponent = <CCProps, CCState, ConnectProps, ReturnsProps>(
    WrappedComponent: ComponentType<WrappedComponentProps<ConnectProps, ReturnsProps>>,
    wrappedComponentName: string,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, ConnectProps, ReturnsProps>,
    ContextComponents: Array<typeof ContextComponent>,
    index: number
): FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>> => {
    const ConsumeComponent = (props: ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>) => {
        const {contexts = [], forwardedRef, ...ownProps} = props;

        contexts[index] = useContext(ContextComponents[index].componentContext);

        if (index !== ContextComponents.length - 1) {
            return <ConsumeComponent {...props} />;
        }

        return <WrappedComponent {...ownProps} {...mapContextsToProps(contexts, ownProps)} ref={forwardedRef} />;
    };
    ConsumeComponent.displayName = `connect[${getDisplayName(ContextComponents[index])}](${wrappedComponentName})`;

    return ConsumeComponent;
};

/** HOC to consume and transform `ContextComponents[]` contexts to props. */
const connect = <CCProps, CCState, ReturnsProps, ConnectProps>(
    WrappedComponent: ComponentType<WrappedComponentProps<ConnectProps, ReturnsProps>>,
    ContextComponents: Array<typeof ContextComponent>,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, ConnectProps, ReturnsProps>,
    options: ConnectOptions<WrappedComponentProps<ConnectProps, ReturnsProps>> = {}
): ComponentOrRef<ConnectProps> => {
    const wrappedComponentName = getDisplayName(WrappedComponent); // Cached before memo

    let ComputedWrappedComponent = WrappedComponent;

    if (typeof options.memo === 'function') {
        ComputedWrappedComponent = memo(WrappedComponent, options.memo) as unknown as ComponentType<WrappedComponentProps<ConnectProps, ReturnsProps>>;
    } else if (options.memo !== false) {
        ComputedWrappedComponent = memo(WrappedComponent) as unknown as ComponentType<WrappedComponentProps<ConnectProps, ReturnsProps>>;
    }

    let ConsumeComponent: FunctionComponent< ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>>,
        index = ContextComponents.length - 1;

    do {
        ConsumeComponent = consumeComponent(
            ComputedWrappedComponent,
            wrappedComponentName,
            mapContextsToProps,
            ContextComponents,
            index
        )

        index--;
    } while (index >= 0);

    if (options.forwardRef) return withForwardRef(ConsumeComponent);

    return ConsumeComponent;
};

export default connect;