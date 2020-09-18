import PropTypes from 'prop-types';
import React, {ReactNode, PropsWithChildren, ComponentClass} from 'react';

type ProvidedComponent = ComponentClass<PropsWithChildren<unknown>>;
type ProviderProps = PropsWithChildren<{ContextComponents: Array<ProvidedComponent>}>;

/** Component for providing together multiple `ContextComponents` contexts to the React tree. */
const Provider = ({ContextComponents, children}: ProviderProps): ReactNode =>
    ContextComponents.reduceRight(
        (componentChildren: ReactNode, Component: ProvidedComponent) => <Component>{componentChildren}</Component>,
        children
    );
Provider.propTypes = {
    ContextComponents: PropTypes.arrayOf(PropTypes.elementType).isRequired
};

export default Provider;