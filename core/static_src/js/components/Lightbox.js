import { whichAnimationEvent } from '../utils';

class Lightbox {
    constructor() {
        const closeButton = document.createElement('div');
        const contentContainer = document.createElement('div');
        const modalCenter = document.createElement('div');
        const contentNode = document.createElement('div');
        const event = whichAnimationEvent();
        this.event = event;

        // DOM
        this.bodyActiveClass = 'body-modal-active';

        this.el = document.createElement('div');
        this.el.className = 'modal modal--active';

        closeButton.className = 'modal__close';
        closeButton.innerHTML = '×';

        contentContainer.className = 'modal__center';
        modalCenter.className = 'modal__table';

        contentContainer.appendChild(contentNode);
        modalCenter.appendChild(contentContainer);

        this.el.appendChild(modalCenter);
        this.el.appendChild(closeButton);

        this.closeButton = closeButton;
        this.contentContainer = contentContainer;
        this.contentNode = contentNode;

        // Bindings
        this.handleClose = this.handleClose.bind(this);
        this.componentDidShow = this.componentDidShow.bind(this);
        this.remove = this.remove.bind(this);

        // Events
        this.closeButton.addEventListener('click', this.handleClose, false);
        this.el.addEventListener('click', this.handleClose, false);
        contentNode.addEventListener('click', this.sandboxClick, false);
    }

    show() {
        const { event } = this;
        const contentNode = this.contentNode;

        contentNode.className = 'modal__content';

        if (document.documentElement.className.match(/ie8/)) {
            const matte = document.createElement('div');
            matte.className = 'matte-opaque';
            this.el.insertBefore(matte, this.el.firstChild);
        }

        document.body.appendChild(this.el);

        if (!document.body.className.match(this.bodyActiveClass)) {
            document.body.className += ' ' + this.bodyActiveClass;
        }

        this.componentDidMount();

        if (event) {
            contentNode.addEventListener(event, this.componentDidShow, false);
        } else {
            this.componentDidShow();
        }
    }

    componentDidShow(e) {
        const self = this;
        const event = self.event;

        if (e && event) {
            if (e.target === self.contentNode) {
                self.renderContent();
            }

            return;
        }

        this.renderContent();
    }

    // Thanks React for this awesome concept.
    componentDidMount() {

    }

    handleClose(e) {
        e.preventDefault();
        const event = whichAnimationEvent();
        document.body.className = document.body.className.replace(' ' + this.bodyActiveClass, '');

        if (event) {
            this.el.addEventListener(event, this.remove);
            this.el.className = this.el.className.replace('modal--active', 'modal--exit');
            return;
        }

        this.remove();
    }

    // By default this doesn't do anything. You should subclass the Lightbox
    // to make it append some content. See VideoLightbox for an example
    renderContent() {

    }

    sandboxClick(e) {
        e.stopPropagation();
    }

    remove(e) {
        const event = whichAnimationEvent();

        if (e.target !== this.el) {
            return;
        }

        this.componentWillUnmount();

        this.el.parentNode.removeChild(this.el);
        this.contentNode.removeEventListener(event, this.componentDidShow, false);
        this.closeButton.removeEventListener('click', this.handleClose, false);

        this.el = null;
        this.closeButton = null;
        this.videoContainer = null;
    }
}

export default Lightbox;

