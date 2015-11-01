import { whichTransitionEvent } from '../utils';

export default class {
    constructor(options) {
        const { trigger, el } = options;

        this.trigger = trigger;
        this.el = el;
        this.event = whichTransitionEvent();
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        trigger.forEach(function(item) {
            item.addEventListener('click', this.toggleMenu, false);
        }, this);

    }

    sandbox(e) {
        e.stopPropagation();
    }

    closeMenu() {

        this.trigger.forEach(function(item){
            item.classList.remove('-active');
            item.setAttribute('aria-expanded', 'false');
        });

        this.el.classList.remove('-active');
        this.el.setAttribute('aria-hidden', 'true');

        document.body.classList.remove('overlay--is-active');
        this.el.classList.add('-closing');

        var onEndTransition = function() {
            if (this.event) {
                this.removeEventListener( this.event, onEndTransition, false );
            }
            this.classList.remove('-closing');
        };

        if (this.event) {
            this.el.addEventListener( this.event, onEndTransition, false );
        } else {
            onEndTransition();
        }

        window.removeEventListener('keydown', this.handleKeyDown);

    }

    openMenu() {

        this.trigger.forEach(function(item){
            item.classList.add('-active');
            item.setAttribute('aria-expanded', 'true');
        });

        this.el.classList.add('-active');
        this.el.setAttribute('aria-hidden', 'false');

        document.body.classList.add('overlay--is-active');

        window.addEventListener('keydown', this.handleKeyDown, false);

        // focus on first element
        var firstEl = this.el.querySelector("a");
        setTimeout( function() {
            firstEl.focus();
        }, 150);

    }

    handleKeyDown(e) {
        if(e.keyCode == 27) {
            this.closeMenu();
        }
    }


    menuClick(e) {
        const reg = /(INPUT|BUTTON|A|SPAN)/;

        if (e.target.tagName.match(reg)) {
            return;
        }

        this.closeMenu();
    }

    toggleMenu(e) {
        e.preventDefault();

        if (this.el.classList.contains('-active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

}
