/* eslint-disable new-cap */
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';
import YouTubePlayer from 'react-youtube-player';

import {
    getWidth,
    getHeight,
} from '../../utils';

export default class VideoModal extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        videoId: PropTypes.string,
        playlistId: PropTypes.string,
        modalContainer: PropTypes.object,
    };

    static defaultProps = {
        isOpen: false,
        videoId: '',
        playlistId: '',
        modalContainer: null,
    };

    state = {
        modalIsOpen: this.props.isOpen,
        playbackState: 'unstarted',
        videoId: this.props.videoId,
    };

    openModal = () => {
        this.setState({
            modalIsOpen: true,
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
        });
    };

    destroyModal = () => {
        const { modalContainer } = this.props;
        if (modalContainer) {
            ReactDOM.unmountComponentAtNode(modalContainer);
        }
    };

    componentDidMount() {
        this.state.width = getWidth(this.refs.inner);
        this.state.height = getHeight(this.refs.inner);
    }

    render() {
        return (
            <Modal
                ref="videoModal"
                isOpen={this.state.modalIsOpen}
                label="a video modal"
                onRequestClose={this.closeModal}
                onAfterClose={this.destroyModal}
                className={"modal--video"}
            >
                <div className="modal__video-inner" ref="inner">
                    <div className="modal__video-wrapper" ref="wrapper">
                        <YouTubePlayer
                            videoId={this.state.videoId}
                            width={ this.state.width }
                            height={ this.state.height }
                            playbackState={this.state.playbackState}
                            configuration={
                                {
                                    autoplay: 1,
                                    origin: window.location.origin,
                                }
                            }
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}
