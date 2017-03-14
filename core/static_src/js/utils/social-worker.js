export function createYoutubePlayer(videoId, options) {
    const params = Object.assign({
        enablejsapi: 1,
        origin: window.location.origin,
    }, options.playerVars);

    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    const playerElement = document.createElement('iframe');

    playerElement.className = 'modal__video-wrapper';
    playerElement.setAttribute('frameborder', 0);
    playerElement.setAttribute('allowfullscreen', 1);
    playerElement.setAttribute('title', 'YouTube video player');
    playerElement.setAttribute('width', options.width);
    playerElement.setAttribute('height', options.height);
    playerElement.setAttribute('src', `https://www.youtube.com/embed/${videoId}?${queryString}`);

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

export function buildMailtoLink(email = '', subject = '', body = '') {
    const fields = [`subject=${encodeURIComponent(subject)}`, `body=${encodeURIComponent(body)}`];

    return `mailto:${encodeURIComponent(email)}?${fields.join('&')}`;
}
