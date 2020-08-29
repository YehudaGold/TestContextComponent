import {ComponentType, Context, ForwardRefExoticComponent, MemoExoticComponent} from 'react';

type IsEqual<Props> = (prevProps: Props, nextProps: Props) => boolean;

type ConnectOptions<Props> = {
    forwardRef?: boolean;
    memo?: boolean | IsEqual<Props>;
};

type ContextComponentType<Props> = ComponentType<Props> & { _componentContext: Context<Props> };

type ComponentOrMemo<Props> = ComponentType<Props> | MemoExoticComponent<ComponentType<Props>>;

type ReactNodeType<Props> =
    ComponentType<Props>
    | MemoExoticComponent<ComponentType<Props>>
    | ForwardRefExoticComponent<Props>;

export {ComponentOrMemo, ConnectOptions, ContextComponentType, IsEqual, ReactNodeType};