import PropTypes from 'prop-types';
import React, {useContext, memo, ComponentType, Ref, ReactNode, MemoExoticComponent, Context} from 'react';

import ContextComponent from './contextComponent';
import {ConnectOptions} from './types';
import {getDisplayName} from './utils/generics';
import withForwardRef, {PropsWithRef, ElementRefPropType} from './utils/withForwardRef';

type Actions<Props, State> = Partial<ContextComponent<Props, State>>;
type ContextValue<Props, State> = Actions<Props, State> & State | undefined;
type ComponentContext<Props, State> = Context<ContextValue<Props, State>>;

type ComponentOrMemo<ownProps> = ComponentType<ownProps> | MemoExoticComponent<ComponentType<ownProps>>;
type ComponentOrRef<Props> =
    ComponentType<Props> | (ComponentType<PropsWithRef<Props>>);

function s<Props, State, ReturnsProps, ownProps>(
    ContextComponents: (typeof ContextComponent)[],
    WrappedComponent: ComponentOrMemo<ownProps>,
    mapContextsToProps: (context: ContextValue<Props, State>[], ownProps: ownProps) => ReturnsProps,
    wrappedComponentName: string
): ComponentOrRef<ownProps> {
    return ContextComponents.reduceRight<ContextComponent<Props, State>>(
        (PreviousComponent: ComponentContext<Props, State>, ContextComponent: typeof ContextComponent, index: number) => {
            const ConsumeContext = (
                {contexts = [], forwardedRef, ...props }: { contexts: Array<ContextValue<Props, State>>; forwardedRef?: Ref<Props>; } & ownProps
            ): ReactNode => {
                contexts[index] = useContext(ContextComponent.componentContext);

                if (PreviousComponent) {
                    return <PreviousComponent {...props} contexts={contexts} forwardedRef={forwardedRef} />;
                }

                return <WrappedComponent {...props} {...mapContextsToProps(contexts, props)} ref={forwardedRef} />;
            };
            ConsumeContext.displayName = `connect[${getDisplayName(ContextComponent)}](${wrappedComponentName})`;
            ConsumeContext.propTypes = {contexts: PropTypes.array, forwardedRef: ElementRefPropType};

            return ConsumeContext;
        },
        null
    );
}

/** HOC to consume and transform `ContextComponents[]` contexts to props. */
const connect = <Props, State, ReturnsProps, ownProps>(
    WrappedComponent: ComponentType<ownProps>,
    ContextComponents: Array<typeof ContextComponent>,
    mapContextsToProps: (context: Array<ContextValue<Props, State>>, ownProps: ownProps) => ReturnsProps,
    options: ConnectOptions<ownProps>
): ComponentOrRef<Props> => {
    const wrappedComponentName = getDisplayName(WrappedComponent); // Cached before memo

    let ComputedWrappedComponent: ComponentOrMemo<ownProps> = WrappedComponent;

    if (typeof options.memo === 'function') {
        ComputedWrappedComponent = memo(WrappedComponent, options.memo);
    } else if (options.memo !== false) {
        ComputedWrappedComponent = memo(WrappedComponent);
    }

    let ConnectComponent = s<Props, State, ReturnsProps, ownProps>(
        ContextComponents,
        ComputedWrappedComponent,
        mapContextsToProps,
        wrappedComponentName
    );

    if (options.forwardRef) ConnectComponent = withForwardRef(ConnectComponent);

    return ConnectComponent;
};

export default connect;