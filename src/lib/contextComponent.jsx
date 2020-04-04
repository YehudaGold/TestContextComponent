import React, {Component} from 'react';

import connect from './connect';
import {getDisplayName} from './utils/generics';
import getActions from './utils/getActions';

class ContextComponent extends Component {

    static get componentContext() {
        if (Object.getOwnPropertyDescriptor(this, '_componentContext')) return this._componentContext;

        this._componentContext = React.createContext();
        this._componentContext.displayName = getDisplayName(this);

        return this._componentContext;
    }

    static get Consumer() { return this.componentContext.Consumer; }

    static connect(mapStateToProps, mapActionsToProps, options) {
        return connect(
            [this],
            mapStateToProps && (([state], ownProps) => mapStateToProps(state, ownProps)),
            mapActionsToProps && (([actions], ownProps) => mapActionsToProps(actions, ownProps)),
            options
        );
    }

    constructor(props) {
        super(props);
        this.componentContext = this.constructor.componentContext;
        this._contextValue = {};
    }

    get contextValue() {
        if (this._contextValue.state !== this.state) {
            this._contextValue = {
                state: this.state,
                actions: this.actions || (this.actions = getActions(this, ContextComponent))
            };
        }

        return this._contextValue;
    }

    render() {
        const {componentContext: {Provider}, props: {children}} = this;

        return (
            <Provider value={this.contextValue}>
                {children}
            </Provider>
        );
    }

}

export default ContextComponent;