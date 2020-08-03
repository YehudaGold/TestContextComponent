import React, {useState, useCallback} from 'react';

import ThemeContext from '../Contexts/ThemeContext';
import Button from './Generic/Button';
import ThemeConnectWithProps from './Theme/ThemeConnectWithProps';

const TestOwnPropsConnect = () => {
    const [themeProp, setThemeProp] = useState('dark'),
          toggleThemeProp = useCallback(
              () => setThemeProp(themeProp === 'dark' ? 'light' : 'dark'),
              [themeProp]
          );

    return (
        <ThemeContext>
            <div className="list">
                TestOwnPropsConnect - test connect with callback (context, ownProp) =&gt; Object:
                <br />
                check theme dark only if both context theme and component theme prop dark
                <div>
                    {`theme prop: ${themeProp}`}
                    <Button
                        handelClick={toggleThemeProp}
                        text="toggle theme prop"
                    />
                </div>
                <ThemeConnectWithProps theme={themeProp} />
            </div>
        </ThemeContext>
    );
};

export default TestOwnPropsConnect;