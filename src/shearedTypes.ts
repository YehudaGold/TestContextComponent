import type {ComponentType, ForwardRefExoticComponent, PropsWithChildren, PropsWithoutRef, Ref, RefAttributes} from 'react';

import type ContextComponent from './contextComponent';

export type CCInternalProps<CCProps = unknown, CCState = unknown, MappedProps = unknown> = {
    contexts?: ContextValue<CCProps, CCState>[],
    forwardedRef?: Ref<PropsWithChildren<CCProps & MappedProps>>
};
export type OwnProps<ConnectProps> = Omit<ConnectProps, keyof CCInternalProps>;
export type WrappedComponentType<ConnectProps, MappedProps> = ComponentType<OwnProps<ConnectProps> & MappedProps>;

export type IsEqual<Props> = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) => boolean;
export type ConnectOptions<ConnectProps, MappedProps> = {
    forwardRef?: boolean;
    memo?: boolean | IsEqual<OwnProps<ConnectProps> & MappedProps>;
};

type PropsWithComponentRef<Props> = PropsWithoutRef<Props> & RefAttributes<ComponentType<Props>>
export type ForwardRefComponentType<Props> = ForwardRefExoticComponent<PropsWithComponentRef<Props>>;

export type Actions<CCProps, CCState> = Partial<ContextComponent<CCProps, CCState>>;
export type ContextValue<CCProps, CCState> = Actions<CCProps, CCState> & CCState;