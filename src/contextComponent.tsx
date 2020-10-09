import React, {Component, Context, ComponentType, Consumer, ReactNode} from 'react';

import connect from './connect';
import {ConnectOptions, OwnProps, WrappedComponentProps} from './types';
import {getDisplayName} from './utils/generics';
import getActions from './utils/getActions';

type Actions<CCProps, CCState> = Partial<ContextComponent<CCProps, CCState>>;
type ContextValue<CCProps, CCState> = Actions<CCProps, CCState> & CCState | undefined;
type ComponentContext<CCProps, CCState> = Context<ContextValue<CCProps, CCState>>;

/**
 * Extend `ContextComponent` with state and methods you want to share in your app.
 * `ContextComponent` implements for you a `render` method that renders the `this.componentContext.Provider`
 * with the component state and instance methods as value.
 * Render the extended component to provide the context to the React tree.
 */
class ContextComponent<CCProps, CCState> extends Component<CCProps, CCState> {

    static _componentContext: ComponentContext<any, any>;

    /** Returns the `componentContext` context. */
    static get componentContext(): ComponentContext<any, any> {
        if (Object.prototype.hasOwnProperty.call(this, '_componentContext')) return this._componentContext;

        this._componentContext = React.createContext({});
        this._componentContext.displayName = getDisplayName(this);

        return this._componentContext;
    }

    /** Returns the `componentContext` context Consumer. */
    static get Consumer(): Consumer<any> {
        return this.componentContext.Consumer;
    }

    /** HOC to consume and transform the `ContextComponent` context to props. */
    static connect<CCProps, CCState, ReturnsProps, ConnectProps>(
        WrappedComponent: ComponentType<WrappedComponentProps<ConnectProps, ReturnsProps>>,
        mapContextToProps: (context: ContextValue<CCProps, CCState>, ownProps: OwnProps<ConnectProps>) => ReturnsProps,
        options: ConnectOptions<WrappedComponentProps<ConnectProps, ReturnsProps>> = {}
    ): ReactNode {
        return connect<CCProps, CCState, ReturnsProps, ConnectProps>(
            WrappedComponent,
            [this],
            ([context], ownProps) => mapContextToProps(context, ownProps),
            options
        );
    }

    actions?: Actions<CCProps, CCState>;

    componentContext: ComponentContext<CCProps, CCState>;

    contextValue: ContextValue<CCProps, CCState> = { ...this.state};

    lastState?: CCState;

    constructor(props: Readonly<CCProps>) {
        super(props);
        this.componentContext = (this.constructor as typeof ContextComponent).componentContext;
    }

    render(): ReactNode {
        const {componentContext: {Provider}, props: {children}} = this;

        if (this.state !== this.lastState) {
            this.actions = this.actions || getActions(this, ContextComponent);
            this.contextValue = {...this.actions, ...this.state};
            this.lastState = this.state;
        }

        return (
            <Provider value={this.contextValue}>
                { children }
            </Provider>
        );
    }

}

export default ContextComponent;