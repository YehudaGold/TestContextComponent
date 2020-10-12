/* eslint-disable react/no-multi-comp */
import React, {useContext, memo, ComponentType, FunctionComponent} from 'react';

import ContextComponent from './contextComponent';
import type {CCInternalProps, ConnectOptions, MapContextsToProps, ComponentOrRef, WrappedComponentProps} from './types';
import {getDisplayName} from './utils/generics';
import withForwardRef, {ElementRefPropType} from './utils/withForwardRef';

const connectComponent = <CCProps, CCState, ConnectProps, ReturnsProps>(
    WrappedComponent: ComponentType<WrappedComponentProps<ConnectProps, ReturnsProps>>,
    wrappedComponentName: string,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, ConnectProps, ReturnsProps>,
    contextComponent: typeof ContextComponent,
    numberOfContexts: number
): FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>> => {
    const ConnectComponent = (props: ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>) => {
        const {contexts = [], forwardedRef, ...ownProps} = props;
        contexts[numberOfContexts] = useContext(contextComponent.componentContext);

        return <WrappedComponent {...ownProps} {...mapContextsToProps(contexts, ownProps)} ref={forwardedRef} />;
    };
    ConnectComponent.displayName = `connect[${getDisplayName(contextComponent)}](${wrappedComponentName})`;
    ConnectComponent.propTypes = {
        /*
         * Contexts: PropTypes.arrayOf(PropTypes.object),
         * forwardedRef: ElementRefPropType
         */
    };

    return ConnectComponent;
};

const consumeContextComponent = <CCProps, CCState, ConnectProps, ReturnsProps>(
    PreviousComponent: FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>>,
    contextComponent: typeof ContextComponent,
    index: number,
    wrappedComponentName: string
): FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>> => {
    const ConsumeContextComponent = (props: ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>) => {
        const {contexts = []} = props;
        contexts[index] = useContext(contextComponent.componentContext);

        return <PreviousComponent {...props} contexts={contexts} />;
    };
    ConsumeContextComponent.displayName = `connect[${getDisplayName(contextComponent)}](${wrappedComponentName})`;

    return ConsumeContextComponent;
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

    const lastContextComponent = ContextComponents.pop();
    if (!lastContextComponent) throw new Error("No contextComponent supplied to the connect function");

    let ConnectComponent = connectComponent(
        ComputedWrappedComponent,
        wrappedComponentName,
        mapContextsToProps,
        lastContextComponent,
        ContextComponents.length
    )

    ConnectComponent = ContextComponents.reduceRight(
        (PreviousComponent, contextComponent, index) =>
            consumeContextComponent(PreviousComponent, contextComponent, index, wrappedComponentName),
        ConnectComponent
    )

    if (options.forwardRef) return withForwardRef(ConnectComponent);

    return ConnectComponent;
};

export default connect;