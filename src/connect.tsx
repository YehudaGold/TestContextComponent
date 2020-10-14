/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React, {useContext, memo, FunctionComponent, WeakValidationMap} from 'react';

import ContextComponent from './contextComponent';
import type {CCInternalProps, ConnectOptions, ForwardRefComponentType, ContextValue, OwnProps, WrappedComponentType} from './shearedTypes';
import {getDisplayName} from './utils/generics';
import withForwardRef, {ElementRefPropType} from './utils/withForwardRef';

export type MapContextsToProps<CCProps, CCState, ConnectProps, MappedProps> =
    (context: ContextValue<CCProps, CCState>[], ownProps: OwnProps<ConnectProps>) => MappedProps;

const connectComponent = <CCProps, CCState, ConnectProps, MappedProps>(
    WrappedComponent: WrappedComponentType<ConnectProps, MappedProps>,
    wrappedComponentName: string,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, ConnectProps, MappedProps>,
    contextComponent: typeof ContextComponent,
    numberOfContexts: number
): FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, MappedProps>> => {
    const ConnectComponent = (props: ConnectProps & CCInternalProps<CCProps, CCState, MappedProps>) => {
        const {contexts = [], forwardedRef, ...ownProps} = props;
        contexts[numberOfContexts] = useContext(contextComponent.componentContext);

        return <WrappedComponent {...ownProps} {...mapContextsToProps(contexts, ownProps)} ref={forwardedRef} />;
    };
    ConnectComponent.displayName = `connect[${getDisplayName(contextComponent)}](${wrappedComponentName})`;
    ConnectComponent.propTypes = {
        contexts: PropTypes.arrayOf(PropTypes.object),
        forwardedRef: ElementRefPropType
    } as unknown as WeakValidationMap<ConnectProps & CCInternalProps<CCProps, CCState, MappedProps>>;

    return ConnectComponent;
};

const consumeContextComponent = <CCProps, CCState, ConnectProps, MappedProps>(
    PreviousComponent: FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, MappedProps>>,
    contextComponent: typeof ContextComponent,
    index: number,
    wrappedComponentName: string
): FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, MappedProps>> => {
    const ConsumeContextComponent = (props: ConnectProps & CCInternalProps<CCProps, CCState, MappedProps>) => {
        const {contexts = []} = props;
        contexts[index] = useContext(contextComponent.componentContext);

        return <PreviousComponent {...props} contexts={contexts} />;
    };
    ConsumeContextComponent.displayName = `connect[${getDisplayName(contextComponent)}](${wrappedComponentName})`;

    return ConsumeContextComponent;
};

/** HOC to consume and transform `ContextComponents[]` contexts to props. */
const connect = <CCProps, CCState, ConnectProps, MappedProps>(
    WrappedComponent: WrappedComponentType<ConnectProps, MappedProps>,
    ContextComponents: Array<typeof ContextComponent>,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, ConnectProps, MappedProps>,
    options: ConnectOptions<ConnectProps, MappedProps> = {}
): FunctionComponent<ConnectProps> | ForwardRefComponentType<ConnectProps> => {
    const wrappedComponentName = getDisplayName(WrappedComponent); // Cached before memo

    let ComputedWrappedComponent = WrappedComponent;
    if (typeof options.memo === 'function') {
        ComputedWrappedComponent = memo(WrappedComponent, options.memo) as unknown as WrappedComponentType<ConnectProps, MappedProps>;
    } else if (options.memo !== false) {
        ComputedWrappedComponent = memo(WrappedComponent) as unknown as WrappedComponentType<ConnectProps, MappedProps>;
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