'use strict';

import React            from 'react';
import ReactDOM         from 'react-dom';

import GA               from 'springload-analytics.js';

import VideoModal       from './components/modals/VideoModal';

import {
            querySelectArray,
            addYouTubePlayerAPI,
            tabFocus
        }               from './utils';



class Site {

    constructor(options) {
        GA.init();

        addYouTubePlayerAPI();
        this.initVideos();

        tabFocus();

        const name = 'World';
        console.log(`Hello ${name}!`);
    }


    initVideos() {
        const videos = querySelectArray('[data-video-id]');

        const videoClick = function(e) {

            const overlayContainer = document.querySelector('[data-overlay]');

            e.preventDefault();
            e.stopPropagation();
            const fullPath = e.currentTarget.getAttribute('data-video-id');
            let videoId;

            // Account for different video formats
            if (fullPath.match(/watch\?v=/)) {
                videoId = fullPath.split('v=', 2)[1];
            } else if (fullPath.match(/\.be\/.+/)) {
                videoId = fullPath.split('.be/')[1];
            }

            ReactDOM.render(
                <VideoModal
                    isOpen={true}
                    videoId={videoId}
                />, overlayContainer
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

}

var site = window.site = new Site({   });
