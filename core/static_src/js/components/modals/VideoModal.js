import React                from 'react';
import ReactDOM             from 'react-dom';

import Modal                from './Modal';

import {
            querySelectArray,
            getWidth,
            getHeight
        }                   from '../../utils';


const VideoModal = React.createClass({

    propTypes: {
        isOpen: React.PropTypes.bool,
        videoId: React.PropTypes.string,
        playlistId: React.PropTypes.string
    },

    getDefaultProps () {
        return {
            isOpen: false,
            videoId: "",
            playlistId: ""
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

    componentDidMount() {
        const { videoId, playlistId } = this.props;
        const { inner, wrapper } = this.refs;

        const player = new YT.Player(wrapper, {
            width: getWidth(inner),
            height: getHeight(inner),
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                origin: window.location.origin
            },
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange
            }
        });
    },

    onPlayerReady(e) {
    },

    onPlayerStateChange(e) {
    },

    destroyModal() {
        //this.destroyPlayer();
        const overlay = document.querySelector('[data-overlay]');
        ReactDOM.unmountComponentAtNode(overlay);
    },

    destroyPlayer() {
        // IE8 Doesn't play very nicely with YouTube's API. You have to
        // explicitly remove the iframe and destroy the element, otherwise
        // the whole browser window blacks out.

        // For more information on this fine browser and the associated phenomenon, check out:
        // http://stackoverflow.com/questions/7452387/black-screen-when-removing-an-embedded-youtube-video-by-javascript-in-ie8
        const playerEl = this.refs.wrapper.querySelector('iframe');
        if (playerEl) {
            playerEl.style.display = 'none';
            playerEl.parentNode.removeChild(playerEl);
            this.player.destroy();
        }
    },

    render() {

        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                onAfterClose={this.destroyModal}
                className={"modal--video"}
            >
                <div className="modal__video-inner" ref="inner">
                    <div className="modal__video-wrapper" ref="wrapper"></div>
                </div>
            </Modal>
        );
    }
});

export default VideoModal;



