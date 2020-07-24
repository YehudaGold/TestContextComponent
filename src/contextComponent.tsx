import React, {Component, Context, ComponentType, Consumer, ComponentClass, ReactNode} from 'react';

import connect from './connect';
import {ConnectOptions} from './types';
import {getDisplayName} from './utils/generics';
import getActions from './utils/getActions';

type Actions<Props, State> = Partial<ContextComponent<Props, State>>;
type ContextValue<Props, State> = Actions<Props, State> & State | undefined;
type ComponentContext<Props, State> = Context<ContextValue<Props, State>>;

export type ContextComponentClass<Props, State> = ComponentClass<Props, State>;

class ContextComponent<Props, State> extends Component<Props, State> {

    static _componentContext: ComponentContext<any, any>;

    static get componentContext(): ComponentContext<any, any> {
        if (Object.prototype.hasOwnProperty.call(this, '_componentContext')) return this._componentContext;

        this._componentContext = React.createContext({});
        this._componentContext.displayName = getDisplayName(this);

        return this._componentContext;
    }

    static get Consumer(): Consumer<any> { return this.componentContext.Consumer; }

    static connect<Props, State, ReturnsProps, ConnectProps>(
        WrappedComponent: ComponentType,
        mapContextToProps: (context: ContextComponent<Props, State>, ownProps: ConnectProps) => ReturnsProps,
        options: ConnectOptions<Props>
    ): ReactNode {
        return connect<Props, State, ReturnsProps, ConnectProps>(
            WrappedComponent,
            [this],
            mapContextToProps && (([context]: Array<ContextComponent<Props, State>>, ownProps: ConnectProps): ReturnsProps => mapContextToProps(context, ownProps)),
            options
        );
    }

    componentContext: ComponentContext<Props, State>;

    lastState?: State;

    actions?: Actions<Props, State>;

    contextValue: ContextValue<Props, State> = {...this.actions, ...this.state};

    constructor(props: Readonly<Props>) {
        super(props);
        this.componentContext = (this.constructor as typeof ContextComponent).componentContext;
    }

    render(): JSX.Element {
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