import {getAllMethodNames} from './generics';

const reactLifecycleMethods = [
    'componentDidCatch',
    'componentDidMount',
    'componentDidUpdate',
    'componentWillUnmount',
    'getSnapshotBeforeUpdate',
    'render',
    'shouldComponentUpdate'
];

/**
 * Collecting all method from the `componentInstance` prototype,
 * except for React lifecycle methods and methods starting with '_',
 * stopping on `baseClass` prototype if exist.
 */
const getActions = (componentInstance, BaseClass) => {
    const actions = {};

    getAllMethodNames(componentInstance, BaseClass)
        .filter(componentMethodNames => !reactLifecycleMethods.includes(componentMethodNames))
        .filter(componentMethodNames => !componentMethodNames.startsWith('_'))
        .forEach((contextActionNames) => {
            actions[contextActionNames] = componentInstance[contextActionNames];
        });

    return actions;
};

export default getActions;