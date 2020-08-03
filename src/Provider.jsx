import PropTypes from 'prop-types';
import React from 'react';

/** Component for providing together multiple `ContextComponents` contexts to the React tree. */
const Provider = ({ContextComponents, children}) =>
    ContextComponents.reduceRight(
        (childrenComponents, ContextComponent) =>
            <ContextComponent>
                {childrenComponents}
            </ContextComponent>,
        children
    );
Provider.propTypes = {
    ContextComponents: PropTypes.arrayOf(PropTypes.elementType).isRequired
};

export default Provider;