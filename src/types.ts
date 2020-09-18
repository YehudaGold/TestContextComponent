import type {ComponentType, Context, ForwardRefExoticComponent, MemoExoticComponent, PropsWithChildren, PropsWithoutRef, Ref, RefAttributes} from 'react';

import type ContextComponent from './contextComponent';

export type IsEqual<Props> = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) => boolean;

export type ConnectOptions<Props> = {
    forwardRef?: boolean;
    memo?: boolean | IsEqual<Props>;
};

export type ContextComponentType<Props> = ComponentType<Props> & { _componentContext: Context<Props> };

export type ComponentOrMemo<Props> = ComponentType<Props> | MemoExoticComponent<ComponentType<Props>>;

type WithRefToComponentOrMemo<Props> = PropsWithoutRef<Props> & RefAttributes<ComponentOrMemo<Props>>
export type ForwardRefComponentType<Props> = ForwardRefExoticComponent<WithRefToComponentOrMemo<Props>>;

export type Actions<CCProps, CCState> = Partial<ContextComponent<CCProps, CCState>>;
export type ContextValue<CCProps, CCState> = Actions<CCProps, CCState> & CCState | undefined;

export type CCInternalProps<CCProps = unknown, CCState = unknown, ReturnsProps = unknown> = {
    contexts?: ContextValue<CCProps, CCState>[],
    forwardedRef?: Ref<PropsWithChildren<CCProps & ReturnsProps>>
};
export type OwnProps<ConnectProps> = Omit<ConnectProps, keyof CCInternalProps>;
export type WrappedComponentProps<ConnectProps, ReturnsProps> = OwnProps<ConnectProps> & ReturnsProps;