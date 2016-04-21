export function createYoutubePlayer(videoId, options) {
    const src = 'https://www.youtube.com/embed/' + videoId + '?';
    const playerElement = document.createElement('iframe');
    const queryString = [];
    const params = {
        enablejsapi: 1,
        origin: window.location.origin,
    };

    playerElement.className = 'modal__video-wrapper';
    playerElement.setAttribute('frameborder', 0);
    playerElement.setAttribute('allowfullscreen', 1);
    playerElement.setAttribute('title', 'YouTube video player');
    playerElement.setAttribute('width', options.width);
    playerElement.setAttribute('height', options.height);

    const extraVars = options.playerVars;

    // Extend the params object
    if (extraVars) {
        let opt;
        for (opt in extraVars) {
            if (extraVars.hasOwnProperty(opt)) {
                params[opt] = extraVars[opt];
            }
        }
    }

    let key;
    for (key in params) {
        if (params.hasOwnProperty(key)) {
            const str = key + '=' + params[key];
            queryString.push(str);
        }
    }

    playerElement.setAttribute('src', src + queryString.join('&'));
    return playerElement;
}

// Very basic facebook link sharing
export function buildFacebookLink(url) {
    const facebook = 'https://www.facebook.com/sharer/sharer.php?u=';
    return `${facebook}${encodeURIComponent(url)}`;
}

// Extremely simple twitter sharing
export function buildTwitterLink(message, url, via = '') {
    const str = ['https://twitter.com/intent/tweet/?'];
    str.push(`text=${encodeURIComponent(message)}`);
    str.push(`url=${encodeURIComponent(url)}`);

    if (via) {
        str.push(`via=${encodeURIComponent(via)}`);
    }

    return str.join('&');
}
