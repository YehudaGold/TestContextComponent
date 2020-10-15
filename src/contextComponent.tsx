import React, {Component, Context, Consumer, ReactNode, FunctionComponent} from 'react';

import connect from './connect';
import {Actions, ConnectOptions, ContextValue, ForwardRefComponentType, WithoutInternalProps, WrappedComponentType} from './shearedTypes';
import {getDisplayName} from './utils/generics';
import getActions from './utils/getActions';

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
    static connect<CCProps, CCState, OwnProps, MappedProps>(
        WrappedComponent: WrappedComponentType<OwnProps, MappedProps>,
        mapContextToProps: (context: ContextValue<CCProps, CCState>, ownProps: WithoutInternalProps<OwnProps>) => MappedProps,
        options: ConnectOptions<OwnProps, MappedProps> = {}
    ): FunctionComponent<OwnProps> | ForwardRefComponentType<OwnProps> {
        return connect<CCProps, CCState, OwnProps, MappedProps>(
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