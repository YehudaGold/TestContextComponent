import {getAllMethodNames} from './generics';

const reactLifecycleMethods = [
    'componentDidMount',
    'shouldComponentUpdate',
    'render',
    'getSnapshotBeforeUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
    'componentDidCatch'
];

export default <T extends object>(componentInstance: T, BaseClass?: ObjectConstructor): Partial<T> => {
    const actions: Partial<T> = {};

    getAllMethodNames(componentInstance, BaseClass)
        .filter(componentMethodNames => !reactLifecycleMethods.includes(componentMethodNames as string))
        .filter(componentMethodNames => !(componentMethodNames as string).startsWith('_'))
        .forEach(contextActionNames => {
            actions[contextActionNames] = componentInstance[contextActionNames];
        });

    return actions;
};