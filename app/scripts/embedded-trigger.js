'use strict';

define('embedded-trigger', ['jquery'], function($) {
    var embedded_trigger = {
        on: function(body, selector, get_url) {
            body = $(body);
            var trigger = embedded_trigger.trigger;
            if (!embedded_trigger.trigger) { // FIXME I don't like this at all
                trigger = embedded_trigger.trigger = $('<div class="hovercards-embedded-trigger"></div>').appendTo(body);
                trigger.hide();
                trigger.mouseenter(function() {
                    trigger.show();
                });
                trigger.mouseleave(function() {
                    trigger.hide();
                });
                trigger.click(function() {
                    chrome.runtime.sendMessage({ msg: 'activate', url: trigger.data('hovercards-url') });
                });
            }
            body.on('mouseenter', selector, function() {
                var obj = $(this);
                var url = get_url(obj);
                if (!url) {
                    return;
                }
                trigger.show();
                trigger.offset(obj.offset());
                trigger.data('hovercards-url', url);
            });
            body.on('mouseleave', selector, function() {
                trigger.hide();
            });
        }
    };

    return embedded_trigger;
});
