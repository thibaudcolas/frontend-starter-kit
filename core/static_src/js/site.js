'use strict';

import React            from 'react';
import ReactDOM         from 'react-dom';

import GA               from 'springload-analytics.js';

import VideoModal       from './components/modals/VideoModal';
import FormModal        from './components/modals/FormModal';

import {
            querySelectArray,
            addYouTubePlayerAPI,
            tabFocus
        }               from './utils';


if ('ontouchstart' in window) {
    document.documentElement.className = document.documentElement.className + " touch";
} else {
    document.documentElement.className = document.documentElement.className + " no-touch";
}


class Site {

    constructor(options) {

        // this is just some example stuff happening in here...
        GA.init();

        addYouTubePlayerAPI();
        this.initVideos();
        this.initForms();

        tabFocus();

        const name = 'World';
        console.log(`Hello ${name}!`);
    }


    initVideos() {
        const modalContainer = document.querySelector('[data-modal]');
        const videos = querySelectArray('[data-video-id]');

        const videoClick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            let videoId = e.currentTarget.getAttribute('data-video-id');

            // Account for different video formats
            if (videoId.match(/watch\?v=/)) {
                videoId = videoId.split('v=', 2)[1];
            } else if (videoId.match(/\.be\/.+/)) {
                videoId = videoId.split('.be/')[1];
            }

            ReactDOM.render(
                <VideoModal
                    isOpen={true}
                    videoId={videoId}
                    modalContainer={modalContainer}
                />, modalContainer
            );
        };

        const videoKeyDown = function(e) {
            if (e.keyCode == 13 /*enter*/) videoClick(e);
        };

        videos.forEach(function(item) {
            item.addEventListener('click', videoClick, false);
            item.addEventListener('keydown', videoKeyDown, false);
        });
    }

    initForms() {
        const modalContainer = document.querySelector('[data-modal]');
        const formModal = querySelectArray('[data-form-modal]');


        const formModalClick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            ReactDOM.render(
                <FormModal
                    isOpen={true}
                    modalContainer={modalContainer}
                />, modalContainer
            );
        };

        formModal.forEach(function(item) {
            item.addEventListener('click', formModalClick, false);
        });
    }

}

var site = window.site = new Site({ });
