import React, { PropTypes, Component } from 'react';

/**
 * An icon that's rendered using inline SVG.
 */
export default class Icon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        cssClass: PropTypes.string,
    };

    static defaultProps = {
        title: '',
        cssClass: '',
    };

    render() {
        const { name, title, cssClass } = this.props;
        const dangerousInnerSVG = {
            __html: `<use xlink:href="#i-${name}"/>`,
        };

        return (
            <svg
                className={`i-${name} ${cssClass}`}
                dangerouslySetInnerHTML={dangerousInnerSVG}
                title={title}
            />
        );
    }
}
