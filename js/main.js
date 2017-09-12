(function () {

    "use strict";

    var body = document.querySelector('body'),
        isMobile = false,
        browserYou,
        scrollTopPosition,
        _winWidth = $(window).outerWidth(),
        _winHeight = $(window).outerHeight();
    var genFunc = {

        initialized: false,

        initialize: function () {

            if (this.initialized) return;

            this.initialized = true;

            this.build();
        },

        build: function () {
            // browser
            browserYou = this.getBrowser();
            if (browserYou.platform == 'mobile') {
                isMobile = true;
                document.documentElement.classList.add('mobile');
            } else {
                document.documentElement.classList.add('desktop');
            }
            if ((browserYou.browser == 'ie')) {
                document.documentElement.classList.add('ie');
            }
            if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                alert('Please, will update your browser');
            }
            // allPlagins
            this.allPlagins();
            //copyright
            this.copyright();
        },
        getBrowser: function () {
            var ua = navigator.userAgent;
            var bName = function () {
                if (ua.search(/Edge/) > -1) return "edge";
                if (ua.search(/MSIE/) > -1) return "ie";
                if (ua.search(/Trident/) > -1) return "ie11";
                if (ua.search(/Firefox/) > -1) return "firefox";
                if (ua.search(/Opera/) > -1) return "opera";
                if (ua.search(/OPR/) > -1) return "operaWebkit";
                if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                if (ua.search(/Chrome/) > -1) return "chrome";
                if (ua.search(/Safari/) > -1) return "safari";
                if (ua.search(/maxHhon/) > -1) return "maxHhon";
            }();

            var version;
            switch (bName) {
                case "edge":
                    version = (ua.split("Edge")[1]).split("/")[1];
                    break;
                case "ie":
                    version = (ua.split("MSIE ")[1]).split(";")[0];
                    break;
                case "ie11":
                    bName = "ie";
                    version = (ua.split("; rv:")[1]).split(")")[0];
                    break;
                case "firefox":
                    version = ua.split("Firefox/")[1];
                    break;
                case "opera":
                    version = ua.split("Version/")[1];
                    break;
                case "operaWebkit":
                    bName = "opera";
                    version = ua.split("OPR/")[1];
                    break;
                case "yabrowser":
                    version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                    break;
                case "chrome":
                    version = (ua.split("Chrome/")[1]).split(" ")[0];
                    break;
                case "safari":
                    version = ua.split("Safari/")[1].split("")[0];
                    break;
                case "maxHhon":
                    version = ua.split("maxHhon/")[1];
                    break;
            }
            var platform = 'desktop';
            if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
            var browsrObj;
            try {
                browsrObj = {
                    platform: platform,
                    browser: bName,
                    versionFull: version,
                    versionShort: version.split(".")[0]
                };
            } catch (err) {
                browsrObj = {
                    platform: platform,
                    browser: 'unknown',
                    versionFull: 'unknown',
                    versionShort: 'unknown'
                };
            }
            return browsrObj;
        },
        copyright: function () {
            var yearBlock = document.querySelector('.yearN'),
                yearNow = new Date().getFullYear().toString();
            if (yearNow.length) {
                yearBlock.innerText = yearNow
            }
        },
        allPlagins: function () {
            // setTimeout(function(){$('.chat-box-over').addClass('step1')},400)
            // setTimeout(function(){$('.chat-box-over').addClass('step2')},1400)
            // setTimeout(function(){$('.chat-box-over').addClass('step3')},3000)
            // setTimeout(function(){$('.chat-box-over').addClass('step4')},5000)
            // setTimeout(function(){$('.chat-box-over').addClass('step5')},5500)
            // setTimeout(function(){$('.chat-box-over').addClass('step6')},6000)
            // setTimeout(function(){$('.chat-box-over').addClass('step7')},7800)
            // setTimeout(function(){$('.chat-box-over').addClass('step8')},9500)
            // setTimeout(function(){$('.chat-box-over').addClass('step9')},10000)
            // setTimeout(function(){$('.chat-box-over').addClass('step10')},12000)
            // setTimeout(function(){$('.chat-box-over').addClass('step11')},14000)
            // fullpage
            $('#fullpage').fullpage({
                anchors: ['section1', 'section2', 'section3', 'section4','section5','section6'],
                menu: '#menu',
                navigation: true,
                navigationPosition: 'right',
                easingcss3: 'cubic-bezier(0.22, 0.44, 0, 1)',
                responsiveWidth: 1023,
                responsiveHeight: 650,
                afterLoad: function(anchorLink, index){
                    $('#fullpage').addClass('active-animate');
                    $('.first-section').addClass('active-animate');
                },
                onLeave: function(index, nextIndex, direction){
                    $('[data-index="' + index +'"]').addClass('active-animate');
                    if(index === 1) {
                        for(var k = 1; k < 12;k++) {
                            (function(k){
                                setTimeout(function(){$('.chat-box-over').addClass('step' + k)},1500*k);
                            })(k);
                        }
                    }
                },
            });
            $('.next-section').on('click',function(){
                $.fn.fullpage.moveSectionDown();
                return false;
            });
            //type text
            // var typed = new Typed('.js_type ', {
            //     strings: ['chad'],
            //     typeSpeed: 50,
            //     // backSpeed: 0,
            //     fadeOut: true,
            //     loop: false
            // });
            //testimonials slider
            var swiper = new Swiper('.fourth-section .swiper-container', {
                effect: 'flip',
                loop:true,
                speed:1500,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.testimonials-slider .swiper-button-next',
                prevButton: '.testimonials-slider .swiper-button-prev',
            });
        },
    };

    genFunc.initialize();
    window.addEventListener('scroll', function () {
        scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        if(scrollTopPosition > 20) {
            document.querySelector('.header').classList.add('fix');
        } else {
            document.querySelector('.header').classList.remove('fix');
        }
    });
    window.addEventListener('load', function () {

    });
    window.addEventListener('resize', function () {

    });
})();

