import PropTypes from 'prop-types';
import React, {useContext, memo, ComponentType, RefAttributes, ReactNode, MemoExoticComponent, ForwardRefExoticComponent, PropsWithoutRef, Context} from 'react';

import ContextComponent from './contextComponent';
import {ConnectOptions} from './types';
import {getDisplayName} from './utils/generics';
import withForwardRef from './utils/withForwardRef';


type Actions<Props, State> = Partial<ContextComponent<Props, State>>;
type ContextValue<Props, State> = Actions<Props, State> & State | undefined;
type ComponentContext<Props, State> = Context<ContextValue<Props, State>>;

type ComponentOrMemo<ConnectProps> = ComponentType<ConnectProps> | MemoExoticComponent<ComponentType<ConnectProps>>;
type ComponentOrRef<Props, ConnectProps> = ComponentType<ConnectProps> | (ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<ConnectProps>>);

const connect = <Props, State, ReturnsProps, ConnectProps>(
    WrappedComponent: ComponentType<ConnectProps>,
    ContextComponents: Array<typeof ContextComponent>,
    mapContextsToProps: (context: Array<ContextValue<Props, State>>, ownProps: ConnectProps) => ReturnsProps,
    options: ConnectOptions<ConnectProps>
): ComponentType<ConnectProps> => {
    const finalOptions = {forwardRef: false, memo: true, ...options},
          wrappedComponentName = getDisplayName(WrappedComponent); // Cached before memo


    let ComputedWrappedComponent: ComponentOrMemo<ConnectProps> = WrappedComponent;

    if (finalOptions.memo) {
        if (typeof finalOptions.memo === 'function') {
            ComputedWrappedComponent = memo<ComponentType<ConnectProps>>(WrappedComponent, finalOptions.memo);
        } else {
            ComputedWrappedComponent = memo<ComponentType<ConnectProps>>(ComputedWrappedComponent);
        }
    }

    let ConnectComponent: ComponentOrRef<Props, ConnectProps> = ContextComponents.reduceRight<ContextComponent<Props, State>>(
        (PreviousValue: ContextType<Props, State>, CurrentValue: typeof ContextComponent, index: number) => {
            const ConsumeContext = ({contexts = [], forwardedRef, ...props}: {contexts: Array<ContextValue<Props, State>>; forwardedRef?: RefAttributes<ComponentType<ConnectProps>>} & ConnectProps): ReactNode => {
                contexts[index] = useContext(CurrentValue.componentContext);

                if (PreviousValue) {
                    return <PreviousValue {...props} contexts={contexts} forwardedRef={forwardedRef} />;
                }

                return (
                    <ComputedWrappedComponent
                        {...props}
                        {...mapContextsToProps(contexts, props)}
                        ref={forwardedRef}
                    />
                );
            };
            ConsumeContext.displayName = `connect[${getDisplayName<Props>(CurrentValue)}](${wrappedComponentName})`;
            ConsumeContext.propTypes = {
                contexts: PropTypes.array,
                forwardedRef: PropTypes.object
            };

            return ConsumeContext;
        },
        null
    );

    if (finalOptions.forwardRef && !!ConnectComponent) ConnectComponent = withForwardRef(ConnectComponent);
    if (finalOptions.memo && !!ConnectComponent) return memo<ComponentType<Props>>(ConnectComponent);

    return ConnectComponent;
};

export default connect;