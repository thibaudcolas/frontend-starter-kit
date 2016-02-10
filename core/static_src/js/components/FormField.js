import React, {PropTypes, Component} from 'react';

export default class FormField extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        label: PropTypes.string,
        type: PropTypes.string,
        error: PropTypes.string,
        onChange: PropTypes.func,
        onEnterKey: PropTypes.func,
        autoCorrect: PropTypes.string,
        autoCapitalize: PropTypes.string,
        spellCheck: PropTypes.string,
        errorClass: PropTypes.string,
        defaultValue: PropTypes.string,
    };

    static defaultProps = {
        onEnter: null,
        name: null,
        type: 'text',
        autoCorrect: 'off',
        autoCapitalize: 'off',
        spellCheck: 'off',
        errorClass: 'theme__text-invert',
    };

    state = {};

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.id, e.target.value);
        }
    };

    handleKeyDown = (e) => {
        if (this.props.onEnterKey) {
            if (e.keyCode === 13) {
                this.props.onEnterKey(e);
            }
        }
    };

    render() {
        const className = ['theme__color', 'theme__border'];
        if (this.props.error) {
            className.push('error');
        }

        const classError = 'form-field__error ' + this.props.errorClass;

        return (
            <div className="form-field">
                <label
                    className="h6"
                    htmlFor={this.props.id}
                >
                    {this.props.label}
                </label>
                <input
                    className={className.join(' ')}
                    ref={this.props.id}
                    id={this.props.id}
                    name={this.props.name}
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleKeyDown}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    spellCheck={this.props.spellCheck}
                    defaultValue={this.props.defaultValue}
                />
                {this.props.error ? (<div className={classError}>{this.props.error}</div>) : null}
            </div>
        );
    }
}
