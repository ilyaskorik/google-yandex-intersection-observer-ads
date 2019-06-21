// PolyFill for "isIntersecting"
// https://github.com/WICG/IntersectionObserver/issues/211#issuecomment-309144669
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
    !('isIntersecting' in IntersectionObserverEntry.prototype)) {

    Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function () {
            return this.intersectionRatio > 0
        }
    })
}

// Another for nodelist.foreach()
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Code
document.querySelectorAll('.lazy-ads').forEach(target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                let ins, externalScript, inlineScript = null;
                let sourse = entry.target;

                switch (sourse.getAttribute('data-type')) {
                    case 'adsbygoogle': // Google ADS

                        // Create ads container
                        ins = document.createElement("ins");
                        ins.setAttribute('class', 'adsbygoogle');
                        ins.setAttribute('style', sourse.getAttribute('data-style'));


                        // // Cycle over each attribute on the element
                        // for (var i = 0; i < element.attributes.length; i++) {
                        //     // Store reference to current attr
                        //     attr = element.attributes[i];
                        //     // If attribute nodeName starts with 'data-'
                        //     if (/^data-/.test(attr.nodeName)) {
                        //         // Log its name (minus the 'data-' part), and its value
                        //         console.log(
                        //             "Key: " + attr.nodeName.replace(/^data-/, ''),
                        //             "Val: " + attr.nodeValue
                        //         );
                        //     }
                        // }

                        if (sourse.hasAttribute('data-ad-client')) {
                            ins.setAttribute('data-ad-client', sourse.getAttribute('data-ad-client'));
                        }
                        if (sourse.hasAttribute('data-ad-slot')) {
                            ins.setAttribute('data-ad-slot', sourse.getAttribute('data-ad-slot'));
                        }
                        if (sourse.hasAttribute('data-ad-layout')) {
                            ins.setAttribute('data-ad-layout', sourse.getAttribute('data-ad-layout'));
                        }
                        if (sourse.hasAttribute('data-ad-format')) {
                            ins.setAttribute('data-ad-format', sourse.getAttribute('data-ad-format'));
                        }
                        if (sourse.hasAttribute('data-full-width-responsive')) {
                            ins.setAttribute('data-full-width-responsive', sourse.getAttribute('data-full-width-responsive'));
                        }
                        sourse.appendChild(ins);

                        // Create external script
                        externalScript = document.createElement("script");
                        externalScript.setAttribute('async', 'async');
                        externalScript.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
                        sourse.appendChild(externalScript);

                        // Create internal script
                        inlineScript = document.createElement("script");
                        inlineScript.text = '(adsbygoogle = window.adsbygoogle || []).push({});'
                        sourse.appendChild(inlineScript);

                        break;
                    case 'adsbyyandex': // Yandex ADS

                        // Create ads container
                        ins = document.createElement("div");
                        ins.setAttribute('id', sourse.getAttribute('data-block-id'));
                        sourse.appendChild(ins);

                        // Create ads callback
                        window['yandexContextAsyncCallbacks'] = window['yandexContextAsyncCallbacks'] || [];
                        window['yandexContextAsyncCallbacks'].push(function() {
                            Ya.Context.AdvManager.render({
                                blockId: sourse.getAttribute('data-block-id'),
                                renderTo: sourse.getAttribute('data-render-to'),
                                async: true
                            });
                        });

                        // Create external script
                        externalScript = document.createElement("script");
                        externalScript.setAttribute('async', 'async');
                        externalScript.src = "//an.yandex.ru/system/context.js";
                        sourse.appendChild(externalScript);

                        break;
                }


                observer.disconnect();

            }
        });
    });
    io.observe(target)
});
