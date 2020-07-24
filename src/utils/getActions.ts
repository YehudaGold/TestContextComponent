import {getAllMethodNames, Constructor} from './generics';

const reactLifecycleMethods = [
    'componentDidMount',
    'shouldComponentUpdate',
    'render',
    'getSnapshotBeforeUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
    'componentDidCatch'
];

/** Return partial of `componentInstance`  with all method's except for React lifecycle method's and method's starting with '_'. */
export default <T extends object>(componentInstance: T, BaseClass?: Constructor): Partial<T> => {
    const actions: Partial<T> = {};

    getAllMethodNames(componentInstance, BaseClass)
        .filter(componentMethodNames => !reactLifecycleMethods.includes(componentMethodNames as string))
        .filter(componentMethodNames => !(componentMethodNames as string).startsWith('_'))
        .forEach(contextActionNames => {
            actions[contextActionNames] = componentInstance[contextActionNames];
        });

    return actions;
};