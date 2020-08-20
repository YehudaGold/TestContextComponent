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
 * stopping on `BaseClass` prototype if exist.
 */
const getActions = <T extends object>(componentInstance: T, BaseClass?: object['constructor']): Partial<T> => {
    const actions: Partial<T> = {};

    getAllMethodNames(componentInstance, BaseClass)
        .filter(componentMethodNames => !reactLifecycleMethods.includes(componentMethodNames as string))
        .filter(componentMethodNames => !componentMethodNames.toString().startsWith('_'))
        .forEach(contextActionNames => {
            actions[contextActionNames] = componentInstance[contextActionNames];
        });

    return actions;
};

export default getActions;