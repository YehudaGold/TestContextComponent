import React, {Component} from 'react';

import IrrelevantContext from '../Contexts/IrrelevantContext';
import Button from './Generic/Button';
import IrrelevantConnect from './Irrelevant/IrrelevantConnect';
import IrrelevantConnectImpure from './Irrelevant/IrrelevantConnectImpure';
import IrrelevantUseContext from './Irrelevant/IrrelevantUseContext';

class TestRerenderContext extends Component {

    state = {themeProp: 'dark', irrelevant: 'a'};

    toggleTheme = () => {
        this.setState(state => (state.themeProp === 'dark' ? {themeProp: 'light'} : {themeProp: 'dark'}));
    };

    toggleIrrelevant = () => {
        this.setState(state => (state.irrelevant === 'a' ? {irrelevant: 'b'} : {irrelevant: 'a'}));
    };

    render() {
        const {themeProp} = this.state;

        return (
            <IrrelevantContext>
                <div className="list">
                    TestRerenderContext - test context consumers memorization:
                    <br />
                    context.connect is defaulted to memo and will not re-render on irrelevant changes
                    <br />
                    context.connect with options &#123;memo: false&#125; will re-render always
                    <br />
                    react.memo(UseContext) prop change will not re-render, context change will re-render
                    <div>
                        <Button
                            handelClick={this.toggleTheme}
                            text="toggle theme state"
                        />
                        <Button
                            handelClick={this.toggleIrrelevant}
                            text="toggle irrelevant state"
                        />
                    </div>
                    <IrrelevantConnect themeProp={themeProp} />
                    <IrrelevantConnectImpure themeProp={themeProp} />
                    <IrrelevantUseContext themeProp={themeProp} />
                </div>
            </IrrelevantContext>
        );
    }

}

export default TestRerenderContext;