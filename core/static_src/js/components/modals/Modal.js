import React                    from 'react';

import focusManager             from './utils/focusManager';
import scopeTab                 from './utils/scopeTab';
import {
            whichAnimationEvent,
            stopPropagation,
            getEventTarget
        }                       from '../../utils';


const bodyActiveClass = 'u-body-modal-active';
const animationEvent = whichAnimationEvent();

const Modal = React.createClass({

    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        onRequestClose: React.PropTypes.func,
        onAfterClose: React.PropTypes.func,
        overlayClick: React.PropTypes.bool,
        className: React.PropTypes.string,
        controls: React.PropTypes.object,
        ariaHideApp: React.PropTypes.bool
    },

    getDefaultProps () {
        return {
            isOpen: false,
            ariaHideApp: true,
            onRequestClose: function() {},
            onAfterClose: function() {},
            overlayClick: true,
            className: "",
            controls: null
        };
    },

    getInitialState: function() {
        return {
            afterOpen: false,
            beforeClose: false
        };
    },

    componentDidMount() {
        // Focus needs to be set when mounting and already open
        if (this.props.isOpen) {
            this.setFocusAfterRender(true);
            this.open();
            window.addEventListener('keydown', this.handleKeyDown);
        }
    },

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },

    componentWillReceiveProps(newProps) {
        // Focus only needs to be set once when the modal is being opened
        if (!this.props.isOpen && newProps.isOpen) {
            this.setFocusAfterRender(true);
            this.open();
        } else if (this.props.isOpen && !newProps.isOpen) {
            this.handleClose();
        }
    },

    componentDidUpdate: function () {
        if (this.focusAfterRender) {
            this.focusContent();
            this.setFocusAfterRender(false);
        }
    },

    setFocusAfterRender: function (focus) {
        this.focusAfterRender = focus;
    },

    focusContent() {
        this.refs.content.focus();
    },

    open() {
        document.body.classList.add(bodyActiveClass);
        focusManager.setupScopedFocus(this.refs.modal);
        focusManager.markForFocusLater();
        this.setState({isOpen: true}, function() {
            this.setState({afterOpen: true});
        }.bind(this));
    },

    handleClose() {
        document.body.classList.remove(bodyActiveClass);
        if (!this.ownerHandlesClose())
            return;

        if (animationEvent) {
            const modal = this.refs.modal;
            modal.addEventListener(animationEvent, this.close );
            modal.classList.remove('modal--active');
            modal.classList.add('modal--exit');
            // var repaint = this.el.offsetWidth; // TODO. do we need this?
            this.setState({beforeClose: true});
            return;
        }

        this.close();

    },

    close(e) {
        const { modal } = this.refs;

        // make sure we're listening to the modals animationEvent
        const target = getEventTarget(e);
        if (e && target !== modal) {
            return;
        }

        if (animationEvent) {
            modal.removeEventListener(animationEvent, this.close);
        }
        this.setState({
            afterOpen: false,
            beforeClose: false
        }, this.afterClose);
    },

    afterClose() {
        focusManager.returnFocus();
        focusManager.teardownScopedFocus();
        this.props.onAfterClose();
    },

    handleKeyDown(e) {
        if (e.keyCode == 9 /*tab*/) scopeTab(this.refs.content, e);
        if (e.keyCode == 27 /*esc*/) this.requestClose();
    },

    handleOverlayClick() {
        if(!this.props.overlayClick)
            return;

        if (this.ownerHandlesClose())
            this.requestClose();
        else
            this.focusContent();
    },

    requestClose() {
        if (this.ownerHandlesClose())
            this.props.onRequestClose();
    },

    ownerHandlesClose() {
        return this.props.onRequestClose;
    },

    shouldBeClosed() {
        return !this.props.isOpen && !this.state.beforeClose;
    },

    render() {

        let classList = ['modal', 'modal--active'];

        if (this.props.className) {
            classList.push(this.props.className);
        }
        return this.shouldBeClosed() ? null : (
            <div
                className={classList.join(' ')}
                ref="modal"
                onClick={this.handleOverlayClick}
            >

                <div className="modal__table">
                    <div className="modal__center">
                        <div
                            className="modal__content"
                            ref="content"
                            onClick={stopPropagation}
                            tabIndex="-1"
                        >
                            {this.props.children}
                        </div>
                    </div>
                </div>

                {this.props.controls ? this.props.controls : (
                    <div className="modal__control">
                        <div className="modal__control-item modal__close" onClick={this.requestClose}>×</div>
                    </div>
                )}

            </div>
        );
    }

});

export default Modal;
