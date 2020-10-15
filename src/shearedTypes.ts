import type {ComponentType, ForwardRefExoticComponent, PropsWithChildren, PropsWithoutRef, Ref, RefAttributes} from 'react';

import type ContextComponent from './contextComponent';

export type Actions<CCProps, CCState> = Partial<ContextComponent<CCProps, CCState>>;
export type ContextValue<CCProps, CCState> = Actions<CCProps, CCState> & CCState;

export type CCInternalProps<CCProps = unknown, CCState = unknown, MappedProps = unknown> = {
    contexts?: ContextValue<CCProps, CCState>[],
    forwardedRef?: Ref<PropsWithChildren<CCProps & MappedProps>>
};
export type WithoutInternalProps<OwnProps> = Omit<OwnProps, keyof CCInternalProps>;
export type WrappedComponentType<OwnProps, MappedProps> = ComponentType<WithoutInternalProps<OwnProps> & MappedProps>;

export type IsEqual<Props> = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) => boolean;
export type ConnectOptions<OwnProps, MappedProps> = {
    forwardRef?: boolean;
    memo?: boolean | IsEqual<WithoutInternalProps<OwnProps> & MappedProps>;
};

type PropsWithComponentRef<Props> = PropsWithoutRef<Props> & RefAttributes<ComponentType<Props>>
export type ForwardRefComponentType<Props> = ForwardRefExoticComponent<PropsWithComponentRef<Props>>;