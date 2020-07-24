import PropTypes from 'prop-types';
import React, {ReactNode, PropsWithChildren} from 'react';
import {ContextComponentClass} from './contextComponent';

type ProvidedComponent = ContextComponentClass<PropsWithChildren<{}>, any>;
type ProviderProps = PropsWithChildren<{ContextComponents: Array<ProvidedComponent>}>;

function Provider(props: ProviderProps): ReactNode {
    return props.ContextComponents.reduceRight<ReactNode>(
        (childrenComponents: ReactNode, ContextComponent: ProvidedComponent) => (
            <ContextComponent>
                {childrenComponents}
            </ContextComponent>
        ),
        props.children
    );
}
Provider.propTypes = {
    ContextComponents: PropTypes.arrayOf(PropTypes.elementType).isRequired
};

export default Provider;