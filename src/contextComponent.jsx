import React, {Component} from 'react';

import connect from './connect';
import {getDisplayName} from './utils/generics';
import getActions from './utils/getActions';

/**
 * Extend `ContextComponent` with state and methods you want to share in your app.
 * `ContextComponent` implements for you a `render` method that renders the `this.componentContext.Provider`
 * with the component state and instance methods as value.
 * Render the extended component to provide the context to the React tree.
 */
class ContextComponent extends Component {

    /** Returns the `componentContext` context. */
    static get componentContext() {
        if (Object.prototype.hasOwnProperty.call(this, '_componentContext')) return this._componentContext;

        this._componentContext = React.createContext();
        this._componentContext.displayName = getDisplayName(this);

        return this._componentContext;
    }

    /** Returns the `componentContext` context Consumer. */
    static get Consumer() {
        return this.componentContext.Consumer;
    }

    /** HOC to consume and transform the `ContextComponent` context to props. */
    static connect(WrappedComponent, mapContextToProps, options) {
        return connect(
            WrappedComponent,
            [this],
            mapContextToProps && (([context], ownProps) => mapContextToProps(context, ownProps)),
            options
        );
    }

    constructor(props) {
        super(props);
        this.componentContext = this.constructor.componentContext;
    }

    render() {
        const {componentContext: {Provider}, props: {children}} = this;

        if (this.state !== this.lastState) {
            this.actions = this.actions || getActions(this, ContextComponent);
            this.contextValue = {...this.actions, ...this.state};
            this.lastState = this.state;
        }

        return (
            <Provider value={this.contextValue}>
                {children}
            </Provider>
        );
    }

}

export default ContextComponent;