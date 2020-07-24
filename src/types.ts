import {PropsWithChildren, ComponentType, Context} from 'react';

type IsEqual<PropsWithChildren> = (prevProps: PropsWithChildren, nextProps: PropsWithChildren) => boolean;

type ConnectOptions<Props> = {
    forwardRef?: boolean;
    memo?: boolean | IsEqual<PropsWithChildren<Props>>;
};

type ContextComponentType<Props> = ComponentType<Props> & { _componentContext: Context<Props> };

export {ConnectOptions, ContextComponentType, IsEqual};