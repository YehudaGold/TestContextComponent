# context-component

context-component is aimed at reducing the boilerplate of writing flexible centralized state management with React context.

context-component provides extendable React class that automatically assigns its state and methods to context and provides it to its children.
It also exposes api to easily consume contexts by `connect` HOC (high order component) or by React regular context api methods - `Consumer`, `contextType` and `useContext`.

To learn more about context visit - [react context documentation](https://reactjs.org/docs/context.html).

For example of context-component visit - [context-component/example](https://github.com/YehudaGold/context-component/tree/master/example/src).

## install

```
npm install context-component -S
```

## Usage

### Creating ContextComponent

In order to create a shared state create a component that extends `ContextComponent` with state and methods you want to share in your app:

ThemeContext.jsx
```jsx
import ContextComponent from 'context-component';

export default class ThemeContext extends ContextComponent {

    state = {theme: 'dark'}

    toggleTheme = () => {
        this.setState(state => (state.theme === 'dark' ? {theme: 'light'} : {theme: 'dark'}));
    }

}
```
The `ContextComponent` implements for you a `render` method that renders the `this.componentContext.Provider` with the component state and instance methods as value.

Methods defined on the `ContextComponent` are provided by the context automatically, except for React lifecycle methods and methods starting with '_'. You can override this behavior by adding `actions` property to the class with the methods you want to expose.

You can use React lifecycle methods in `ContextComponent` to initialize and manage the state.

### Providing ContextComponent

To provide the context to the React tree you render the component:

App.jsx
```jsx
import React from 'react';
import ThemeContext from './ThemeContext';

export const App = () => (
    <ThemeContext>
        <otherComponent />
    </ThemeContext>
);
```

### Consuming ContextComponent

To consume the context you can use the component static `connect` HOC method:

otherComponent.jsx
```jsx
import React from 'react';
import ThemeContext from './ThemeContext';

const otherComponent = ({toggleTheme, theme}) =>
    <div className={theme} onClick={toggleTheme} />;

const mapContextToProps = context =>
    ({theme: context.theme, toggleTheme: context.toggleTheme});

export default ThemeContext.connect(otherComponent, mapContextToProps);
```
The component `connect` HOC method takes three parameters:
* `WrappedComponent` - The component to connect.
* `mapContextsToProps` - Callback with two parameters `context` and `ownProps` (props assigned by the parent component), and returns new object of props, enabling you to transform, rename and pick the relevant values from the context.
* `options` - Optional object with the keys:
    * `memo` - Memorizes the `WrappedComponent` to not re-render if there aren't changes to the value returned from `mapContextsToProps`.
    Boolean type for whether or not to memorizes with shallow check, or function type for memorizes with a custom equality check, **defaulted to true.**
    * `forwardRef` - Forwards the ref prop to the `WrappedComponent` ref.
    Boolean value, defaulted to false.
---

Or consume the context by rendering the `ContextComponent.Consumer`:
```jsx
import React from 'react';
import ThemeContext from './ThemeContext';

export const otherComponent = () => (
    <ThemeContext.Consumer>
        {({theme, toggleTheme}) =>
            <div className={theme} onClick={toggleTheme} />}
    </ThemeContext.Consumer>
);
```
---

Or by using the React class component `contextType` property:
```jsx
import React, {Component} from 'react';
import ThemeContext from './ThemeContext';

export class otherComponent extends Component {

    static contextType = ThemeContext.componentContext;

    render() {
        const {theme, toggleTheme} = this.context;

        return <div className={theme} onClick={toggleTheme} />;
    }

};
```
---

Or by using the `useContext()` hook:
```jsx
import React, {useContext} from 'react';
import ThemeContext from './ThemeContext';

export const otherComponent = () => {
    const {theme, toggleTheme} = useContext(ThemeContext.componentContext);

    return <div className={theme} onClick={toggleTheme} />;
};
```

## Multiple contexts

You can use the `Provider` component to provide multiple contexts together:

App.jsx
```jsx
import React from 'react';
import {Provider} from 'context-component';
import ThemeContext from './ThemeContext';
import CounterContext from './CounterContext';

export const App = () => (
    <Provider ContextComponents={[CounterContext, ThemeContext]}>
        <otherComponent />
    </Provider>
);
```
The `Provider` requires `ContextComponents` prop - the ContextComponent classes array.

---

You can consume multiple contexts together with the `connect` HOC function:

otherComponent.js
```jsx
import React from 'react';
import {connect} from 'context-component';
import ThemeContext from './ThemeContext';
import CounterContext from './CounterContext';

const otherComponent = ({counter, increase, theme, toggleTheme}) =>
    <div>
        <div className={theme} onClick={toggleTheme} />
        <div onClick={increase}>{counter}</div>
    </div>;

const mapContextsToProps = ([counterContext, themeContext]) => ({
    counter: counterContext.counter,
    increase: counterContext.increase,
    theme: themeContext.theme,
    toggleTheme: themeContext.toggleTheme
});

export default connect(otherComponent, [CounterContext, ThemeContext], mapContextsToProps);
```
The `connect` HOC function takes four parameters:

* `WrappedComponent` - The component to connect.
* `ContextComponents` - Array of contextComponent classes.
* `mapContextsToProps` - Callback with two parameters `contexts[]` and `ownProps` (props assigned by the parent component), and returns new object of props, enabling you to transform, rename and pick the relevant values from the context.
* `options` - Optional object with the keys:
     * `memo` - Memorizes the `WrappedComponent` to not re-render if there aren't changes to the value returned from `mapContextsToProps`.
    Boolean type for whether or not to memorizes with shallow check, or function type for memorizes with a custom equality check, **defaulted to true.**
    * `forwardRef` - Forwards the ref prop to the `WrappedComponent` ref.
    Boolean value, defaulted to false.

## Optimization warning
In `connect` HOC the `mapContextToProps` callback shouldn't return new references for the same input (context and ownProps). If you compute a new value like this:
```js
const mapContextToProps = context =>
    ({theme: {color: context.theme}});
```
The `theme` value will always return a new object reference for every function call and the `React.memo` shallow equality check will fail, which means the component will re-render for the same props.

In order to solve this you can set a custom equality function on the memo option:
```js
const areEqual = (prevProps, nextProps) =>
    prevProps.theme.color === nextProps.theme.color;

export default ThemeContext.connect(otherComponent, mapContextToProps, {memo: areEqual});
```
or set the connect `options.memo` to 'false' and not memorize the component.
```js
export default ThemeContext.connect(otherComponent, mapContextToProps, {memo: false});
```