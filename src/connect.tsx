import PropTypes, {Validator} from 'prop-types';
import React, {useContext, memo, ComponentType, MemoExoticComponent, FunctionComponent} from 'react';

import ContextComponent from './contextComponent';
import type {CCInternalProps, ConnectOptions, ContextValue, ForwardRefComponentType, OwnProps, WrappedComponentProps} from './types';
import {getDisplayName} from './utils/generics';
import withForwardRef, {ElementRefPropType} from './utils/withForwardRef';

type MapContextsToProps<CCProps, CCState, ConnectProps, ReturnsProps> =
    (context: ContextValue<CCProps, CCState>[], ownProps: OwnProps<ConnectProps>) => ReturnsProps;

type ComponentOrMemo<Props> = ComponentType<Props> | MemoExoticComponent<ComponentType<Props>>;
type ComponentOrRef<Props> = ComponentType<Props> | ForwardRefComponentType<Props>;

const consumeContexts = <CCProps, CCState, ConnectProps, ReturnsProps>(
    WrappedComponent: ComponentOrMemo<WrappedComponentProps<ConnectProps, ReturnsProps>>,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, ConnectProps, ReturnsProps>,
    wrappedComponentName: string
) =>
    (
        PreviousComponent: ComponentType<ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>> | null,
        contextComponent: typeof ContextComponent,
        index: number
    ): FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>> => {
        const ConsumeComponent: FunctionComponent<ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>> = (
            props: ConnectProps & CCInternalProps<CCProps, CCState, ReturnsProps>
        ) => {
            const {contexts = [], forwardedRef, ...ownProps} = props;

            contexts[index] = useContext(contextComponent.componentContext);

            if (PreviousComponent) {
                return <PreviousComponent {...props} />;
            }

            return <WrappedComponent {...ownProps} {...mapContextsToProps(contexts, ownProps)} ref={forwardedRef} />;
        };
        ConsumeComponent.displayName = `connect[${getDisplayName(contextComponent)}](${wrappedComponentName})`;
        ConsumeComponent.propTypes = {
            contexts: PropTypes.arrayOf(PropTypes.object as Validator<ContextValue<CCProps, CCState>>),
            forwardedRef: ElementRefPropType
        };

        return ConsumeComponent;
    };

/** HOC to consume and transform `ContextComponents[]` contexts to props. */
const connect = <CCProps, CCState, ReturnsProps, ConnectProps>(
    WrappedComponent: ComponentType<WrappedComponentProps<ConnectProps, ReturnsProps>>,
    ContextComponents: Array<typeof ContextComponent>,
    mapContextsToProps: MapContextsToProps<CCProps, CCState, ConnectProps, ReturnsProps>,
    options: ConnectOptions<WrappedComponentProps<ConnectProps, ReturnsProps>>
): ComponentOrRef<ConnectProps> | null => {
    const wrappedComponentName = getDisplayName(WrappedComponent); // Cached before memo

    let ComputedWrappedComponent: ComponentOrMemo<WrappedComponentProps<ConnectProps, ReturnsProps>> = WrappedComponent;

    if (typeof options.memo === 'function') {
        ComputedWrappedComponent = memo(WrappedComponent, options.memo);
    } else if (options.memo !== false) {
        ComputedWrappedComponent = memo(WrappedComponent);
    }

    const ConnectComponent = ContextComponents.reduceRight(
        consumeContexts(ComputedWrappedComponent, mapContextsToProps, wrappedComponentName),
        null
    )

    if (options.forwardRef && ConnectComponent) return withForwardRef(ConnectComponent);

    return ConnectComponent;
};

export default connect;