/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React, {useContext, memo, FunctionComponent, WeakValidationMap} from 'react';

import ContextComponent from './contextComponent';
import type {CCInternalProps, ConnectOptions, ForwardRefComponentType, ContextValue, WithoutInternalProps, WrappedComponentType} from './shearedTypes';
import {getDisplayName} from './utils/generics';
import withForwardRef, {ElementRefPropType} from './utils/withForwardRef';

export type MapContextsToProps<CCProps, CCState, OwnProps, MappedProps> =
    (context: ContextValue<CCProps, CCState>[], ownProps: WithoutInternalProps<OwnProps>) => MappedProps;

const connectComponent = <CCProps, CCState, OwnProps, MappedProps>(
    WrappedComponent: WrappedComponentType<OwnProps, MappedProps>,
    wrappedComponentName: string,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, OwnProps, MappedProps>,
    contextComponent: typeof ContextComponent,
    numberOfContexts: number
): FunctionComponent<OwnProps & CCInternalProps<CCProps, CCState, MappedProps>> => {
    const ConnectComponent = (props: OwnProps & CCInternalProps<CCProps, CCState, MappedProps>) => {
        const {contexts = [], forwardedRef, ...ownProps} = props;
        contexts[numberOfContexts] = useContext(contextComponent.componentContext);

        return <WrappedComponent {...ownProps} {...mapContextsToProps(contexts, ownProps)} ref={forwardedRef} />;
    };
    ConnectComponent.displayName = `connect[${getDisplayName(contextComponent)}](${wrappedComponentName})`;
    ConnectComponent.propTypes = {
        contexts: PropTypes.arrayOf(PropTypes.object),
        forwardedRef: ElementRefPropType
    } as unknown as WeakValidationMap<OwnProps & CCInternalProps<CCProps, CCState, MappedProps>>;

    return ConnectComponent;
};

const consumeContextComponent = <CCProps, CCState, OwnProps, MappedProps>(
    PreviousComponent: FunctionComponent<OwnProps & CCInternalProps<CCProps, CCState, MappedProps>>,
    contextComponent: typeof ContextComponent,
    index: number,
    wrappedComponentName: string
): FunctionComponent<OwnProps & CCInternalProps<CCProps, CCState, MappedProps>> => {
    const ConsumeContextComponent = (props: OwnProps & CCInternalProps<CCProps, CCState, MappedProps>) => {
        const {contexts = []} = props;
        contexts[index] = useContext(contextComponent.componentContext);

        return <PreviousComponent {...props} contexts={contexts} />;
    };
    ConsumeContextComponent.displayName = `connect[${getDisplayName(contextComponent)}](${wrappedComponentName})`;

    return ConsumeContextComponent;
};

/** HOC to consume and transform `ContextComponents[]` contexts to props. */
const connect = <CCProps, CCState, OwnProps, MappedProps>(
    WrappedComponent: WrappedComponentType<OwnProps, MappedProps>,
    ContextComponents: Array<typeof ContextComponent>,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, OwnProps, MappedProps>,
    options: ConnectOptions<OwnProps, MappedProps> = {}
): FunctionComponent<OwnProps> | ForwardRefComponentType<OwnProps> => {
    const wrappedComponentName = getDisplayName(WrappedComponent); // Cached before memo

    let ComputedWrappedComponent = WrappedComponent;
    if (typeof options.memo === 'function') {
        ComputedWrappedComponent = memo(WrappedComponent, options.memo) as unknown as WrappedComponentType<OwnProps, MappedProps>;
    } else if (options.memo !== false) {
        ComputedWrappedComponent = memo(WrappedComponent) as unknown as WrappedComponentType<OwnProps, MappedProps>;
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