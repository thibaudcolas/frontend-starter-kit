import React                from 'react';
import ReactDOM             from 'react-dom';

import Modal                from './Modal';
import FormField            from '../FormField';
import { querySelectArray } from '../../utils';


const LoginModal = React.createClass({

    propTypes: {
        isOpen: React.PropTypes.bool,
        onRequestClose: React.PropTypes.func,
        modalContainer: React.PropTypes.object
    },

    getDefaultProps () {
        return {
            isOpen: false,
            onRequestClose: function() { }
        };
    },

    getInitialState: function() {
        return {
            modalIsOpen: this.props.isOpen
        }
    },

    openModal: function() {
        this.setState({
            modalIsOpen: true
        });
    },

    closeModal: function() {
        this.setState({
            modalIsOpen: false
        });
    },

    updateField: function(name, newValue, error=null) {
        console.log("updating field value: " + newValue);
    },

    sendForm: function() {
        console.log("sending form");
    },

    destroyModal() {
        const { modalContainer } = this.props;
        if(modalContainer) {
            ReactDOM.unmountComponentAtNode(modalContainer);
        }
    },

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                onAfterClose={this.destroyModal}
                overlayClick={false}
                className="modal--form"
            >
                <h3>Some form field:</h3>
                <FormField
                    id="formField"
                    type="text"
                    value={null}
                    label="Enter data here"
                    onChange={this.updateField}
                    onEnterKey={this.sendForm}
                />
                <FormField
                    id="formField2"
                    type="text"
                    value={null}
                    label="Or here"
                    onChange={this.updateField}
                    onEnterKey={this.sendForm}
                />
            </Modal>
        );
    }
});

export default LoginModal;



