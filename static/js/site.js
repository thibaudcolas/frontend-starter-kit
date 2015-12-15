(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/VincentAudebert/Development/sites/frontend-starter-kit/node_modules/springload-analytics.js/analytics.js":[function(require,module,exports){
(function (global){
/**
 * Analytics.js
 * http://springload.co.nz/
 *
 * Copyright 2015, Springload
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return (root.GA = factory());
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = (root.GA = factory());
    } else {
        // Browser globals
        root.GA = factory();
    }
}(typeof global !== 'undefined' ? global : this.window || this.global, function () {
    "use strict";

    var GA = {
        // Modifiable options
        options: {
            // The default category - the document uri
            default_category: "/" + document.location.pathname.substr(1),
            // The default action
            default_action: "Click",
            // The default attribute, event and element that will be used for the trackable events
            default_trackable_attribute: "analytics",
            default_trackable_event: "click",
            default_trackable_element: "a",
            // The default label attribute
            default_label_attribute: "href",
            // The default separator to use within the analytics attribute
            default_separator: "|",
            // Available default categories
            categories: {
                footer: "Footer",
                nav: "Navigation",
                ui_element: "UI element"
            },
            // Available default actions
            actions: {
                interaction: "Interaction"
            }
        },
        /**
         * Track an event with Google Analytics
         * @param category - The category for GA
         * @param action - The action for GA
         * @param label - The label for GA
         * @param value - The value for GA
         */
        event: function (category, action, label, value) {
            var self = this;
            category = category || self.options.default_category;
            action = action || self.options.default_action;
            if (typeof window._gaq === "object") {
                window._gaq.push(["_trackEvent", category, action, label, value]);
            } else if (typeof window.ga === "function") {
                window.ga('send', 'event', category, action, label, value);
            }
        },
        /**
         * Initialise the analytics module.
         * @param options
         */
        init: function (options) {
            var self = this;
            self.options = self.extend(self.options, options);
            self.setupTrackables(self.options.default_trackable_attribute, self.options.default_trackable_event, self.options.default_trackable_element, self.options.default_label_attribute);
        },
        /**
         * Deep extend object
         * @param out
         * @returns {*}
         */
        extend: function(out) {
            out = out || {};
            for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];
                if (!obj) {
                    continue;
                }
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            this.extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
            return out;
        },
        /**
         * on event handler
         * @param element
         * @param name
         * @param callback
         */
        on:  function (element, name, callback) {
            if ("addEventListener" in window) {
                element.addEventListener(name, callback, false);
            } else if ("attachEvent" in window){
                element.attachEvent("on" + name, function anon() {
                    callback.call(element);
                });
            } else {
                element["on" + name] = function anon() {
                    callback.call(element);
                };
            }
        },
        /**
         * Select any elements that match the selectors
         * @param trackable_attribute
         * @param trackable_element
         * @returns {NodeList}
         */
        selectElements: function(trackable_attribute, trackable_element) {
            return document.querySelectorAll("[data-" + trackable_attribute + "] " + trackable_element + ", " + trackable_element + "[data-" + trackable_attribute + "]");
        },
        /**
         * Find the closest parent element with an trackable attribute set on it and return the value of that attribute
         * @param element
         * @param trackable_attribute
         * @returns {string}
         */
        getParentElementTrackingData: function(element, trackable_attribute) {
            var parent = element.parentNode,
                tracking_data = "",
                parent_tracking_data;
            while (parent !== null) {
                var current_parent = parent;
                if (current_parent.hasAttribute("data-" + trackable_attribute)) {
                    parent_tracking_data = current_parent.getAttribute("data-" + trackable_attribute);
                    if (parent_tracking_data !== null) {
                        tracking_data = parent_tracking_data;
                    }
                    parent = null;
                } else {
                    parent = current_parent.parentNode;
                }
            }
            return tracking_data;
        },
        /**
         * Define the trackable elements and set the event handlers on them
         * @param trackable_attribute
         * @param trackable_event
         * @param trackable_element
         * @param label_attribute
         */
        setupTrackables: function (trackable_attribute, trackable_event, trackable_element, label_attribute) {
            // Only supporting modern browsers for selection
            if (document.querySelectorAll) {
                var self = this,
                    elements = self.selectElements(trackable_attribute, trackable_element),
                    i = 0;
                for (i; i < elements.length; i++) {
                    (function(el) {
                        var params = el.getAttribute("data-" + trackable_attribute),
                            category = null,
                            action = null,
                            label = el.getAttribute(label_attribute),
                            value = null;
                        // Check for a category on a parent element
                        if (params === null) {
                            params = self.getParentElementTrackingData(el, trackable_attribute);
                        }
                        // Grab the values from the data attribute
                        params = params.split(self.options.default_separator);
                        // Set the event tracking variables
                        category = params[0] !== undefined && params[0] !== '' ? params[0] : undefined;
                        action = params[1] !== undefined && params[1] !== '' ? params[1] : undefined;
                        label = params[2] !== undefined && params[2] !== '' ? params[2] : label;
                        value = params[3] !== undefined && params[3] !== '' ? params[3] : undefined;
                        self.on(el, trackable_event, function() {
                            // Fire off the event
                            self.event(category, action, label, value);
                        });
                    })(elements[i]);
                }
            }
        }
    };

    return {
        /**
         * Track an event.
         * @param label
         * @param category
         * @param action
         * @param value
         */
        track: function (label, category, action, value) {
            GA.event(category, action, label, value);
        },
        /**
         * Initialise the module
         * @param options
         */
        init: function (options) {
            GA.init(options);
        },
        /**
         * Setup additional trackable elements on the fly after initialisation
         * @param trackable_attribute data attribute
         * @param trackable_event event type. e.g. mouseenter
         * @param trackable_element - e.g. span
         * @param label_attribute - where the default label is ready from. e.g. data-label
         */
        setupTrackables: function (trackable_attribute, trackable_event, trackable_element, label_attribute) {
            GA.setupTrackables(trackable_attribute, trackable_event, trackable_element, label_attribute);
        },
        // Categories
        cat: GA.options.categories,
        // Actions
        act: GA.options.actions
    };
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/Users/VincentAudebert/Development/sites/frontend-starter-kit/static_src/js/site.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _springloadAnalyticsJs = require('springload-analytics.js');

var _springloadAnalyticsJs2 = _interopRequireDefault(_springloadAnalyticsJs);

var name = 'World';

console.log('Hello ' + name + '!');

_springloadAnalyticsJs2['default'].init();

},{"springload-analytics.js":"/Users/VincentAudebert/Development/sites/frontend-starter-kit/node_modules/springload-analytics.js/analytics.js"}]},{},["/Users/VincentAudebert/Development/sites/frontend-starter-kit/static_src/js/site.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc3ByaW5nbG9hZC1hbmFseXRpY3MuanMvYW5hbHl0aWNzLmpzIiwiL1VzZXJzL1ZpbmNlbnRBdWRlYmVydC9EZXZlbG9wbWVudC9zaXRlcy9mcm9udGVuZC1zdGFydGVyLWtpdC9zdGF0aWNfc3JjL2pzL3NpdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7cUNDck9lLHlCQUF5Qjs7OztBQUV4QyxJQUFNLElBQUksR0FBRyxPQUFPLENBQUM7O0FBRXJCLE9BQU8sQ0FBQyxHQUFHLFlBQVUsSUFBSSxPQUFJLENBQUM7O0FBRTlCLG1DQUFHLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQW5hbHl0aWNzLmpzXG4gKiBodHRwOi8vc3ByaW5nbG9hZC5jby5uei9cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSwgU3ByaW5nbG9hZFxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChyb290LkdBID0gZmFjdG9yeSgpKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IChyb290LkdBID0gZmFjdG9yeSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICAgICAgcm9vdC5HQSA9IGZhY3RvcnkoKTtcbiAgICB9XG59KHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcy53aW5kb3cgfHwgdGhpcy5nbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBHQSA9IHtcbiAgICAgICAgLy8gTW9kaWZpYWJsZSBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIC8vIFRoZSBkZWZhdWx0IGNhdGVnb3J5IC0gdGhlIGRvY3VtZW50IHVyaVxuICAgICAgICAgICAgZGVmYXVsdF9jYXRlZ29yeTogXCIvXCIgKyBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zdWJzdHIoMSksXG4gICAgICAgICAgICAvLyBUaGUgZGVmYXVsdCBhY3Rpb25cbiAgICAgICAgICAgIGRlZmF1bHRfYWN0aW9uOiBcIkNsaWNrXCIsXG4gICAgICAgICAgICAvLyBUaGUgZGVmYXVsdCBhdHRyaWJ1dGUsIGV2ZW50IGFuZCBlbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgdHJhY2thYmxlIGV2ZW50c1xuICAgICAgICAgICAgZGVmYXVsdF90cmFja2FibGVfYXR0cmlidXRlOiBcImFuYWx5dGljc1wiLFxuICAgICAgICAgICAgZGVmYXVsdF90cmFja2FibGVfZXZlbnQ6IFwiY2xpY2tcIixcbiAgICAgICAgICAgIGRlZmF1bHRfdHJhY2thYmxlX2VsZW1lbnQ6IFwiYVwiLFxuICAgICAgICAgICAgLy8gVGhlIGRlZmF1bHQgbGFiZWwgYXR0cmlidXRlXG4gICAgICAgICAgICBkZWZhdWx0X2xhYmVsX2F0dHJpYnV0ZTogXCJocmVmXCIsXG4gICAgICAgICAgICAvLyBUaGUgZGVmYXVsdCBzZXBhcmF0b3IgdG8gdXNlIHdpdGhpbiB0aGUgYW5hbHl0aWNzIGF0dHJpYnV0ZVxuICAgICAgICAgICAgZGVmYXVsdF9zZXBhcmF0b3I6IFwifFwiLFxuICAgICAgICAgICAgLy8gQXZhaWxhYmxlIGRlZmF1bHQgY2F0ZWdvcmllc1xuICAgICAgICAgICAgY2F0ZWdvcmllczoge1xuICAgICAgICAgICAgICAgIGZvb3RlcjogXCJGb290ZXJcIixcbiAgICAgICAgICAgICAgICBuYXY6IFwiTmF2aWdhdGlvblwiLFxuICAgICAgICAgICAgICAgIHVpX2VsZW1lbnQ6IFwiVUkgZWxlbWVudFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQXZhaWxhYmxlIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICAgICAgYWN0aW9uczoge1xuICAgICAgICAgICAgICAgIGludGVyYWN0aW9uOiBcIkludGVyYWN0aW9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyYWNrIGFuIGV2ZW50IHdpdGggR29vZ2xlIEFuYWx5dGljc1xuICAgICAgICAgKiBAcGFyYW0gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgZm9yIEdBXG4gICAgICAgICAqIEBwYXJhbSBhY3Rpb24gLSBUaGUgYWN0aW9uIGZvciBHQVxuICAgICAgICAgKiBAcGFyYW0gbGFiZWwgLSBUaGUgbGFiZWwgZm9yIEdBXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSBmb3IgR0FcbiAgICAgICAgICovXG4gICAgICAgIGV2ZW50OiBmdW5jdGlvbiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjYXRlZ29yeSA9IGNhdGVnb3J5IHx8IHNlbGYub3B0aW9ucy5kZWZhdWx0X2NhdGVnb3J5O1xuICAgICAgICAgICAgYWN0aW9uID0gYWN0aW9uIHx8IHNlbGYub3B0aW9ucy5kZWZhdWx0X2FjdGlvbjtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9nYXEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuX2dhcS5wdXNoKFtcIl90cmFja0V2ZW50XCIsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmdhID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAnZXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhbGlzZSB0aGUgYW5hbHl0aWNzIG1vZHVsZS5cbiAgICAgICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZWxmLm9wdGlvbnMgPSBzZWxmLmV4dGVuZChzZWxmLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgc2VsZi5zZXR1cFRyYWNrYWJsZXMoc2VsZi5vcHRpb25zLmRlZmF1bHRfdHJhY2thYmxlX2F0dHJpYnV0ZSwgc2VsZi5vcHRpb25zLmRlZmF1bHRfdHJhY2thYmxlX2V2ZW50LCBzZWxmLm9wdGlvbnMuZGVmYXVsdF90cmFja2FibGVfZWxlbWVudCwgc2VsZi5vcHRpb25zLmRlZmF1bHRfbGFiZWxfYXR0cmlidXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZXAgZXh0ZW5kIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gb3V0XG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgKi9cbiAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbihvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IG91dCB8fCB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHRlbmQob3V0W2tleV0sIG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbiBldmVudCBoYW5kbGVyXG4gICAgICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAgICAgKi9cbiAgICAgICAgb246ICBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChcImFkZEV2ZW50TGlzdGVuZXJcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJhdHRhY2hFdmVudFwiIGluIHdpbmRvdyl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hdHRhY2hFdmVudChcIm9uXCIgKyBuYW1lLCBmdW5jdGlvbiBhbm9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W1wib25cIiArIG5hbWVdID0gZnVuY3Rpb24gYW5vbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2VsZWN0IGFueSBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvcnNcbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9hdHRyaWJ1dGVcbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9lbGVtZW50XG4gICAgICAgICAqIEByZXR1cm5zIHtOb2RlTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGVjdEVsZW1lbnRzOiBmdW5jdGlvbih0cmFja2FibGVfYXR0cmlidXRlLCB0cmFja2FibGVfZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1cIiArIHRyYWNrYWJsZV9hdHRyaWJ1dGUgKyBcIl0gXCIgKyB0cmFja2FibGVfZWxlbWVudCArIFwiLCBcIiArIHRyYWNrYWJsZV9lbGVtZW50ICsgXCJbZGF0YS1cIiArIHRyYWNrYWJsZV9hdHRyaWJ1dGUgKyBcIl1cIik7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IHdpdGggYW4gdHJhY2thYmxlIGF0dHJpYnV0ZSBzZXQgb24gaXQgYW5kIHJldHVybiB0aGUgdmFsdWUgb2YgdGhhdCBhdHRyaWJ1dGVcbiAgICAgICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9hdHRyaWJ1dGVcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGdldFBhcmVudEVsZW1lbnRUcmFja2luZ0RhdGE6IGZ1bmN0aW9uKGVsZW1lbnQsIHRyYWNrYWJsZV9hdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgdHJhY2tpbmdfZGF0YSA9IFwiXCIsXG4gICAgICAgICAgICAgICAgcGFyZW50X3RyYWNraW5nX2RhdGE7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfcGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50X3BhcmVudC5oYXNBdHRyaWJ1dGUoXCJkYXRhLVwiICsgdHJhY2thYmxlX2F0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50X3RyYWNraW5nX2RhdGEgPSBjdXJyZW50X3BhcmVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgdHJhY2thYmxlX2F0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRfdHJhY2tpbmdfZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tpbmdfZGF0YSA9IHBhcmVudF90cmFja2luZ19kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gY3VycmVudF9wYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tpbmdfZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSB0aGUgdHJhY2thYmxlIGVsZW1lbnRzIGFuZCBzZXQgdGhlIGV2ZW50IGhhbmRsZXJzIG9uIHRoZW1cbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9hdHRyaWJ1dGVcbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9ldmVudFxuICAgICAgICAgKiBAcGFyYW0gdHJhY2thYmxlX2VsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIGxhYmVsX2F0dHJpYnV0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0dXBUcmFja2FibGVzOiBmdW5jdGlvbiAodHJhY2thYmxlX2F0dHJpYnV0ZSwgdHJhY2thYmxlX2V2ZW50LCB0cmFja2FibGVfZWxlbWVudCwgbGFiZWxfYXR0cmlidXRlKSB7XG4gICAgICAgICAgICAvLyBPbmx5IHN1cHBvcnRpbmcgbW9kZXJuIGJyb3dzZXJzIGZvciBzZWxlY3Rpb25cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHNlbGYuc2VsZWN0RWxlbWVudHModHJhY2thYmxlX2F0dHJpYnV0ZSwgdHJhY2thYmxlX2VsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGk7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgdHJhY2thYmxlX2F0dHJpYnV0ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBlbC5nZXRBdHRyaWJ1dGUobGFiZWxfYXR0cmlidXRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgYSBjYXRlZ29yeSBvbiBhIHBhcmVudCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gc2VsZi5nZXRQYXJlbnRFbGVtZW50VHJhY2tpbmdEYXRhKGVsLCB0cmFja2FibGVfYXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgdGhlIHZhbHVlcyBmcm9tIHRoZSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNwbGl0KHNlbGYub3B0aW9ucy5kZWZhdWx0X3NlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGV2ZW50IHRyYWNraW5nIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkgPSBwYXJhbXNbMF0gIT09IHVuZGVmaW5lZCAmJiBwYXJhbXNbMF0gIT09ICcnID8gcGFyYW1zWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gcGFyYW1zWzFdICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zWzFdICE9PSAnJyA/IHBhcmFtc1sxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gcGFyYW1zWzJdICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zWzJdICE9PSAnJyA/IHBhcmFtc1syXSA6IGxhYmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJhbXNbM10gIT09IHVuZGVmaW5lZCAmJiBwYXJhbXNbM10gIT09ICcnID8gcGFyYW1zWzNdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vbihlbCwgdHJhY2thYmxlX2V2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJlIG9mZiB0aGUgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV2ZW50KGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkoZWxlbWVudHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVHJhY2sgYW4gZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBsYWJlbFxuICAgICAgICAgKiBAcGFyYW0gY2F0ZWdvcnlcbiAgICAgICAgICogQHBhcmFtIGFjdGlvblxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIHRyYWNrOiBmdW5jdGlvbiAobGFiZWwsIGNhdGVnb3J5LCBhY3Rpb24sIHZhbHVlKSB7XG4gICAgICAgICAgICBHQS5ldmVudChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhbGlzZSB0aGUgbW9kdWxlXG4gICAgICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgR0EuaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHVwIGFkZGl0aW9uYWwgdHJhY2thYmxlIGVsZW1lbnRzIG9uIHRoZSBmbHkgYWZ0ZXIgaW5pdGlhbGlzYXRpb25cbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9hdHRyaWJ1dGUgZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9ldmVudCBldmVudCB0eXBlLiBlLmcuIG1vdXNlZW50ZXJcbiAgICAgICAgICogQHBhcmFtIHRyYWNrYWJsZV9lbGVtZW50IC0gZS5nLiBzcGFuXG4gICAgICAgICAqIEBwYXJhbSBsYWJlbF9hdHRyaWJ1dGUgLSB3aGVyZSB0aGUgZGVmYXVsdCBsYWJlbCBpcyByZWFkeSBmcm9tLiBlLmcuIGRhdGEtbGFiZWxcbiAgICAgICAgICovXG4gICAgICAgIHNldHVwVHJhY2thYmxlczogZnVuY3Rpb24gKHRyYWNrYWJsZV9hdHRyaWJ1dGUsIHRyYWNrYWJsZV9ldmVudCwgdHJhY2thYmxlX2VsZW1lbnQsIGxhYmVsX2F0dHJpYnV0ZSkge1xuICAgICAgICAgICAgR0Euc2V0dXBUcmFja2FibGVzKHRyYWNrYWJsZV9hdHRyaWJ1dGUsIHRyYWNrYWJsZV9ldmVudCwgdHJhY2thYmxlX2VsZW1lbnQsIGxhYmVsX2F0dHJpYnV0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIENhdGVnb3JpZXNcbiAgICAgICAgY2F0OiBHQS5vcHRpb25zLmNhdGVnb3JpZXMsXG4gICAgICAgIC8vIEFjdGlvbnNcbiAgICAgICAgYWN0OiBHQS5vcHRpb25zLmFjdGlvbnNcbiAgICB9O1xufSkpO1xuIiwiaW1wb3J0IEdBIGZyb20gJ3NwcmluZ2xvYWQtYW5hbHl0aWNzLmpzJztcblxuY29uc3QgbmFtZSA9ICdXb3JsZCc7XG5cbmNvbnNvbGUubG9nKGBIZWxsbyAke25hbWV9IWApO1xuXG5HQS5pbml0KCk7XG4iXX0=
