!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        function t(t, o) {
            var n, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(t),
                appendDots: e(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            e.extend(s, s.initials),
            s.activeBreakpoint = null,
            s.animType = null,
            s.animProp = null,
            s.breakpoints = [],
            s.breakpointSettings = [],
            s.cssTransitions = !1,
            s.focussed = !1,
            s.interrupted = !1,
            s.hidden = "hidden",
            s.paused = !0,
            s.positionProp = null,
            s.respondTo = null,
            s.rowCount = 1,
            s.shouldClick = !0,
            s.$slider = e(t),
            s.$slidesCache = null,
            s.transformType = null,
            s.transitionType = null,
            s.visibilityChange = "visibilitychange",
            s.windowWidth = 0,
            s.windowTimer = null,
            n = e(t).data("slick") || {},
            s.options = e.extend({}, s.defaults, o, n),
            s.currentSlide = s.options.initialSlide,
            s.originalSettings = s.options,
            "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden",
            s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden",
            s.visibilityChange = "webkitvisibilitychange"),
            s.autoPlay = e.proxy(s.autoPlay, s),
            s.autoPlayClear = e.proxy(s.autoPlayClear, s),
            s.autoPlayIterator = e.proxy(s.autoPlayIterator, s),
            s.changeSlide = e.proxy(s.changeSlide, s),
            s.clickHandler = e.proxy(s.clickHandler, s),
            s.selectHandler = e.proxy(s.selectHandler, s),
            s.setPosition = e.proxy(s.setPosition, s),
            s.swipeHandler = e.proxy(s.swipeHandler, s),
            s.dragHandler = e.proxy(s.dragHandler, s),
            s.keyHandler = e.proxy(s.keyHandler, s),
            s.instanceUid = i++,
            s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            s.registerBreakpoints(),
            s.init(!0)
        }
        var i = 0;
        return t
    }(),
    t.prototype.activateADA = function() {
        var e = this;
        e.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    t.prototype.addSlide = t.prototype.slickAdd = function(t, i, o) {
        var n = this;
        if ("boolean" == typeof i)
            o = i,
            i = null;
        else if (0 > i || i >= n.slideCount)
            return !1;
        n.unload(),
        "number" == typeof i ? 0 === i && 0 === n.$slides.length ? e(t).appendTo(n.$slideTrack) : o ? e(t).insertBefore(n.$slides.eq(i)) : e(t).insertAfter(n.$slides.eq(i)) : o === !0 ? e(t).prependTo(n.$slideTrack) : e(t).appendTo(n.$slideTrack),
        n.$slides = n.$slideTrack.children(this.options.slide),
        n.$slideTrack.children(this.options.slide).detach(),
        n.$slideTrack.append(n.$slides),
        n.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t)
        }),
        n.$slidesCache = n.$slides,
        n.reinit()
    }
    ,
    t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }
    ,
    t.prototype.animateSlide = function(t, i) {
        var o = {}
          , n = this;
        n.animateHeight(),
        n.options.rtl === !0 && n.options.vertical === !1 && (t = -t),
        n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({
            left: t
        }, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({
            top: t
        }, n.options.speed, n.options.easing, i) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft),
        e({
            animStart: n.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function(e) {
                e = Math.ceil(e),
                n.options.vertical === !1 ? (o[n.animType] = "translate(" + e + "px, 0px)",
                n.$slideTrack.css(o)) : (o[n.animType] = "translate(0px," + e + "px)",
                n.$slideTrack.css(o))
            },
            complete: function() {
                i && i.call()
            }
        })) : (n.applyTransition(),
        t = Math.ceil(t),
        n.options.vertical === !1 ? o[n.animType] = "translate3d(" + t + "px, 0px, 0px)" : o[n.animType] = "translate3d(0px," + t + "px, 0px)",
        n.$slideTrack.css(o),
        i && setTimeout(function() {
            n.disableTransition(),
            i.call()
        }, n.options.speed))
    }
    ,
    t.prototype.getNavTarget = function() {
        var t = this
          , i = t.options.asNavFor;
        return i && null !== i && (i = e(i).not(t.$slider)),
        i
    }
    ,
    t.prototype.asNavFor = function(t) {
        var i = this
          , o = i.getNavTarget();
        null !== o && "object" == typeof o && o.each(function() {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    }
    ,
    t.prototype.applyTransition = function(e) {
        var t = this
          , i = {};
        t.options.fade === !1 ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase,
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }
    ,
    t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(),
        e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }
    ,
    t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }
    ,
    t.prototype.autoPlayIterator = function() {
        var e = this
          , t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (e.options.infinite === !1 && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll,
        e.currentSlide - 1 === 0 && (e.direction = 1))),
        e.slideHandler(t))
    }
    ,
    t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows === !0 && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"),
        t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"),
        t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows),
        t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    t.prototype.buildDots = function() {
        var t, i, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"),
            i = e("<ul />").addClass(o.options.dotsClass),
            t = 0; t <= o.getDotCount(); t += 1)
                i.append(e("<li />").append(o.options.customPaging.call(this, o, t)));
            o.$dots = i.appendTo(o.options.appendDots),
            o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }
    ,
    t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
        }),
        t.$slider.addClass("slick-slider"),
        t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(),
        t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
        t.$slideTrack.css("opacity", 0),
        (t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1),
        e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
        t.setupInfinite(),
        t.buildArrows(),
        t.buildDots(),
        t.updateDots(),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        t.options.draggable === !0 && t.$list.addClass("draggable")
    }
    ,
    t.prototype.buildRows = function() {
        var e, t, i, o, n, s, r, a = this;
        if (o = document.createDocumentFragment(),
        s = a.$slider.children(),
        a.options.rows > 1) {
            for (r = a.options.slidesPerRow * a.options.rows,
            n = Math.ceil(s.length / r),
            e = 0; n > e; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var d = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var c = e * r + (t * a.options.slidesPerRow + i);
                        s.get(c) && d.appendChild(s.get(c))
                    }
                    l.appendChild(d)
                }
                o.appendChild(l)
            }
            a.$slider.empty().append(o),
            a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    t.prototype.checkResponsive = function(t, i) {
        var o, n, s, r = this, a = !1, l = r.$slider.width(), d = window.innerWidth || e(window).width();
        if ("window" === r.respondTo ? s = d : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(d, l)),
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            n = null;
            for (o in r.breakpoints)
                r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? s < r.breakpoints[o] && (n = r.breakpoints[o]) : s > r.breakpoints[o] && (n = r.breakpoints[o]));
            null !== n ? null !== r.activeBreakpoint ? (n !== r.activeBreakpoint || i) && (r.activeBreakpoint = n,
            "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[n]),
            t === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(t)),
            a = n) : (r.activeBreakpoint = n,
            "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[n]),
            t === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(t)),
            a = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
            r.options = r.originalSettings,
            t === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(t),
            a = n),
            t || a === !1 || r.$slider.trigger("breakpoint", [r, a])
        }
    }
    ,
    t.prototype.changeSlide = function(t, i) {
        var o, n, s, r = this, a = e(t.currentTarget);
        switch (a.is("a") && t.preventDefault(),
        a.is("li") || (a = a.closest("li")),
        s = r.slideCount % r.options.slidesToScroll !== 0,
        o = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
        t.data.message) {
        case "previous":
            n = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - n, !1, i);
            break;
        case "next":
            n = 0 === o ? r.options.slidesToScroll : o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + n, !1, i);
            break;
        case "index":
            var l = 0 === t.data.index ? 0 : t.data.index || a.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(l), !1, i),
            a.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    t.prototype.checkNavigable = function(e) {
        var t, i, o = this;
        if (t = o.getNavigableIndexes(),
        i = 0,
        e > t[t.length - 1])
            e = t[t.length - 1];
        else
            for (var n in t) {
                if (e < t[n]) {
                    e = i;
                    break
                }
                i = t[n]
            }
        return e
    }
    ,
    t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)),
        t.$slider.off("focus.slick blur.slick"),
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
        t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)),
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
        t.$list.off("click.slick", t.clickHandler),
        e(document).off(t.visibilityChange, t.visibility),
        t.cleanUpSlideEvents(),
        t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler),
        t.options.focusOnSelect === !0 && e(t.$slideTrack).children().off("click.slick", t.selectHandler),
        e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
        e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
        e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
        e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition),
        e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }
    ,
    t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }
    ,
    t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && (e = t.$slides.children().children(),
        e.removeAttr("style"),
        t.$slider.empty().append(e))
    }
    ,
    t.prototype.clickHandler = function(e) {
        var t = this;
        t.shouldClick === !1 && (e.stopImmediatePropagation(),
        e.stopPropagation(),
        e.preventDefault())
    }
    ,
    t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear(),
        i.touchObject = {},
        i.cleanUpEvents(),
        e(".slick-cloned", i.$slider).detach(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
        i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
        i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slideTrack.detach(),
        i.$list.detach(),
        i.$slider.append(i.$slides)),
        i.cleanUpRows(),
        i.$slider.removeClass("slick-slider"),
        i.$slider.removeClass("slick-initialized"),
        i.$slider.removeClass("slick-dotted"),
        i.unslicked = !0,
        t || i.$slider.trigger("destroy", [i])
    }
    ,
    t.prototype.disableTransition = function(e) {
        var t = this
          , i = {};
        i[t.transitionType] = "",
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }
    ,
    t.prototype.fadeSlide = function(e, t) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }),
        i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e),
        i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }),
        t && setTimeout(function() {
            i.disableTransition(e),
            t.call()
        }, i.options.speed))
    }
    ,
    t.prototype.fadeSlideOut = function(e) {
        var t = this;
        t.cssTransitions === !1 ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e),
        t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }
    ,
    t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides,
        t.unload(),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slidesCache.filter(e).appendTo(t.$slideTrack),
        t.reinit())
    }
    ,
    t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
            i.stopImmediatePropagation();
            var o = e(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = o.is(":focus"),
                t.autoPlay())
            }, 0)
        })
    }
    ,
    t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        var e = this;
        return e.currentSlide
    }
    ,
    t.prototype.getDotCount = function() {
        var e = this
          , t = 0
          , i = 0
          , o = 0;
        if (e.options.infinite === !0)
            for (; t < e.slideCount; )
                ++o,
                t = i + e.options.slidesToScroll,
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (e.options.centerMode === !0)
            o = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount; )
                ++o,
                t = i + e.options.slidesToScroll,
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else
            o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return o - 1
    }
    ,
    t.prototype.getLeft = function(e) {
        var t, i, o, n = this, s = 0;
        return n.slideOffset = 0,
        i = n.$slides.first().outerHeight(!0),
        n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
        s = i * n.options.slidesToShow * -1),
        n.slideCount % n.options.slidesToScroll !== 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1,
        s = (n.options.slidesToShow - (e - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
        s = n.slideCount % n.options.slidesToScroll * i * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth,
        s = (e + n.options.slidesToShow - n.slideCount) * i),
        n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0,
        s = 0),
        n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0,
        n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
        t = n.options.vertical === !1 ? e * n.slideWidth * -1 + n.slideOffset : e * i * -1 + s,
        n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow),
        t = n.options.rtl === !0 ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1),
        t = n.options.rtl === !0 ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        t += (n.$list.width() - o.outerWidth()) / 2)),
        t
    }
    ,
    t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        var t = this;
        return t.options[e]
    }
    ,
    t.prototype.getNavigableIndexes = function() {
        var e, t = this, i = 0, o = 0, n = [];
        for (t.options.infinite === !1 ? e = t.slideCount : (i = -1 * t.options.slidesToScroll,
        o = -1 * t.options.slidesToScroll,
        e = 2 * t.slideCount); e > i; )
            n.push(i),
            i = o + t.options.slidesToScroll,
            o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return n
    }
    ,
    t.prototype.getSlick = function() {
        return this
    }
    ,
    t.prototype.getSlideCount = function() {
        var t, i, o, n = this;
        return o = n.options.centerMode === !0 ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0,
        n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(t, s) {
            return s.offsetLeft - o + e(s).outerWidth() / 2 > -1 * n.swipeLeft ? (i = s,
            !1) : void 0
        }),
        t = Math.abs(e(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }
    ,
    t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        var i = this;
        i.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }
    ,
    t.prototype.init = function(t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"),
        i.buildRows(),
        i.buildOut(),
        i.setProps(),
        i.startLoad(),
        i.loadSlider(),
        i.initializeEvents(),
        i.updateArrows(),
        i.updateDots(),
        i.checkResponsive(!0),
        i.focusHandler()),
        t && i.$slider.trigger("init", [i]),
        i.options.accessibility === !0 && i.initADA(),
        i.options.autoplay && (i.paused = !1,
        i.autoPlay())
    }
    ,
    t.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        t.$slideTrack.attr("role", "listbox"),
        t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            e(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + t.instanceUid + i
            })
        }),
        null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(i) {
            e(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + t.instanceUid + i,
                id: "slick-slide" + t.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
        t.activateADA()
    }
    ,
    t.prototype.initArrowEvents = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide),
        e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide))
    }
    ,
    t.prototype.initDotEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide),
        t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }
    ,
    t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }
    ,
    t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(),
        t.initDotEvents(),
        t.initSlideEvents(),
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler),
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler),
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("click.slick", t.clickHandler),
        e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
        t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler),
        t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)),
        e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)),
        e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
        e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
        e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }
    ,
    t.prototype.initUI = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(),
        e.$nextArrow.show()),
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }
    ,
    t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
            data: {
                message: t.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
            data: {
                message: t.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }
    ,
    t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this)
                  , i = e(this).attr("data-lazy")
                  , o = document.createElement("img");
                o.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        t.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy").removeClass("slick-loading")
                        }),
                        r.$slider.trigger("lazyLoaded", [r, t, i])
                    })
                }
                ,
                o.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    r.$slider.trigger("lazyLoadError", [r, t, i])
                }
                ,
                o.src = i
            })
        }
        var i, o, n, s, r = this;
        r.options.centerMode === !0 ? r.options.infinite === !0 ? (n = r.currentSlide + (r.options.slidesToShow / 2 + 1),
        s = n + r.options.slidesToShow + 2) : (n = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)),
        s = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (n = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide,
        s = Math.ceil(n + r.options.slidesToShow),
        r.options.fade === !0 && (n > 0 && n--,
        s <= r.slideCount && s++)),
        i = r.$slider.find(".slick-slide").slice(n, s),
        t(i),
        r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"),
        t(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow),
        t(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow),
        t(o))
    }
    ,
    t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(),
        e.$slideTrack.css({
            opacity: 1
        }),
        e.$slider.removeClass("slick-loading"),
        e.initUI(),
        "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }
    ,
    t.prototype.next = t.prototype.slickNext = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(),
        e.setPosition()
    }
    ,
    t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(),
        e.paused = !0
    }
    ,
    t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(),
        e.options.autoplay = !0,
        e.paused = !1,
        e.focussed = !1,
        e.interrupted = !1
    }
    ,
    t.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
        t.animating = !1,
        t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay && t.autoPlay(),
        t.options.accessibility === !0 && t.initADA())
    }
    ,
    t.prototype.prev = t.prototype.slickPrev = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }
    ,
    t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var i, o, n, s = this, r = e("img[data-lazy]", s.$slider);
        r.length ? (i = r.first(),
        o = i.attr("data-lazy"),
        n = document.createElement("img"),
        n.onload = function() {
            i.attr("src", o).removeAttr("data-lazy").removeClass("slick-loading"),
            s.options.adaptiveHeight === !0 && s.setPosition(),
            s.$slider.trigger("lazyLoaded", [s, i, o]),
            s.progressiveLazyLoad()
        }
        ,
        n.onerror = function() {
            3 > t ? setTimeout(function() {
                s.progressiveLazyLoad(t + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            s.$slider.trigger("lazyLoadError", [s, i, o]),
            s.progressiveLazyLoad())
        }
        ,
        n.src = o) : s.$slider.trigger("allImagesLoaded", [s])
    }
    ,
    t.prototype.refresh = function(t) {
        var i, o, n = this;
        o = n.slideCount - n.options.slidesToShow,
        !n.options.infinite && n.currentSlide > o && (n.currentSlide = o),
        n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0),
        i = n.currentSlide,
        n.destroy(!0),
        e.extend(n, n.initials, {
            currentSlide: i
        }),
        n.init(),
        t || n.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }
    ,
    t.prototype.registerBreakpoints = function() {
        var t, i, o, n = this, s = n.options.responsive || null;
        if ("array" === e.type(s) && s.length) {
            n.respondTo = n.options.respondTo || "window";
            for (t in s)
                if (o = n.breakpoints.length - 1,
                i = s[t].breakpoint,
                s.hasOwnProperty(t)) {
                    for (; o >= 0; )
                        n.breakpoints[o] && n.breakpoints[o] === i && n.breakpoints.splice(o, 1),
                        o--;
                    n.breakpoints.push(i),
                    n.breakpointSettings[i] = s[t].settings
                }
            n.breakpoints.sort(function(e, t) {
                return n.options.mobileFirst ? e - t : t - e
            })
        }
    }
    ,
    t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
        t.registerBreakpoints(),
        t.setProps(),
        t.setupInfinite(),
        t.buildArrows(),
        t.updateArrows(),
        t.initArrowEvents(),
        t.buildDots(),
        t.updateDots(),
        t.initDotEvents(),
        t.cleanUpSlideEvents(),
        t.initSlideEvents(),
        t.checkResponsive(!1, !0),
        t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        t.setPosition(),
        t.focusHandler(),
        t.paused = !t.options.autoplay,
        t.autoPlay(),
        t.$slider.trigger("reInit", [t])
    }
    ,
    t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay),
        t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(),
            t.checkResponsive(),
            t.unslicked || t.setPosition()
        }, 50))
    }
    ,
    t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
        var o = this;
        return "boolean" == typeof e ? (t = e,
        e = t === !0 ? 0 : o.slideCount - 1) : e = t === !0 ? --e : e,
        !(o.slideCount < 1 || 0 > e || e > o.slideCount - 1) && (o.unload(),
        i === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slidesCache = o.$slides,
        void o.reinit())
    }
    ,
    t.prototype.setCSS = function(e) {
        var t, i, o = this, n = {};
        o.options.rtl === !0 && (e = -e),
        t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px",
        i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px",
        n[o.positionProp] = e,
        o.transformsEnabled === !1 ? o.$slideTrack.css(n) : (n = {},
        o.cssTransitions === !1 ? (n[o.animType] = "translate(" + t + ", " + i + ")",
        o.$slideTrack.css(n)) : (n[o.animType] = "translate3d(" + t + ", " + i + ", 0px)",
        o.$slideTrack.css(n)))
    }
    ,
    t.prototype.setDimensions = function() {
        var e = this;
        e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow),
        e.options.centerMode === !0 && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })),
        e.listWidth = e.$list.width(),
        e.listHeight = e.$list.height(),
        e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow),
        e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth),
        e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }
    ,
    t.prototype.setFade = function() {
        var t, i = this;
        i.$slides.each(function(o, n) {
            t = i.slideWidth * o * -1,
            i.options.rtl === !0 ? e(n).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : e(n).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }),
        i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }
    ,
    t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, i, o, n, s, r = this, a = !1;
        if ("object" === e.type(arguments[0]) ? (o = arguments[0],
        a = arguments[1],
        s = "multiple") : "string" === e.type(arguments[0]) && (o = arguments[0],
        n = arguments[1],
        a = arguments[2],
        "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? s = "responsive" : "undefined" != typeof arguments[1] && (s = "single")),
        "single" === s)
            r.options[o] = n;
        else if ("multiple" === s)
            e.each(o, function(e, t) {
                r.options[e] = t
            });
        else if ("responsive" === s)
            for (i in n)
                if ("array" !== e.type(r.options.responsive))
                    r.options.responsive = [n[i]];
                else {
                    for (t = r.options.responsive.length - 1; t >= 0; )
                        r.options.responsive[t].breakpoint === n[i].breakpoint && r.options.responsive.splice(t, 1),
                        t--;
                    r.options.responsive.push(n[i])
                }
        a && (r.unload(),
        r.reinit())
    }
    ,
    t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(),
        e.setHeight(),
        e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(),
        e.$slider.trigger("setPosition", [e])
    }
    ,
    t.prototype.setProps = function() {
        var e = this
          , t = document.body.style;
        e.positionProp = e.options.vertical === !0 ? "top" : "left",
        "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
        (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && e.options.useCSS === !0 && (e.cssTransitions = !0),
        e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex),
        void 0 !== t.OTransform && (e.animType = "OTransform",
        e.transformType = "-o-transform",
        e.transitionType = "OTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.MozTransform && (e.animType = "MozTransform",
        e.transformType = "-moz-transform",
        e.transitionType = "MozTransition",
        void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)),
        void 0 !== t.webkitTransform && (e.animType = "webkitTransform",
        e.transformType = "-webkit-transform",
        e.transitionType = "webkitTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.msTransform && (e.animType = "msTransform",
        e.transformType = "-ms-transform",
        e.transitionType = "msTransition",
        void 0 === t.msTransform && (e.animType = !1)),
        void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform",
        e.transformType = "transform",
        e.transitionType = "transition"),
        e.transformsEnabled = e.options.useTransform && null !== e.animType && e.animType !== !1
    }
    ,
    t.prototype.setSlideClasses = function(e) {
        var t, i, o, n, s = this;
        i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        s.$slides.eq(e).addClass("slick-current"),
        s.options.centerMode === !0 ? (t = Math.floor(s.options.slidesToShow / 2),
        s.options.infinite === !0 && (e >= t && e <= s.slideCount - 1 - t ? s.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = s.options.slidesToShow + e,
        i.slice(o - t + 1, o + t + 2).addClass("slick-active").attr("aria-hidden", "false")),
        0 === e ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : e === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")),
        s.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(e, e + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = s.slideCount % s.options.slidesToShow,
        o = s.options.infinite === !0 ? s.options.slidesToShow + e : e,
        s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - e < s.options.slidesToShow ? i.slice(o - (s.options.slidesToShow - n), o + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
        "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }
    ,
    t.prototype.setupInfinite = function() {
        var t, i, o, n = this;
        if (n.options.fade === !0 && (n.options.centerMode = !1),
        n.options.infinite === !0 && n.options.fade === !1 && (i = null,
        n.slideCount > n.options.slidesToShow)) {
            for (o = n.options.centerMode === !0 ? n.options.slidesToShow + 1 : n.options.slidesToShow,
            t = n.slideCount; t > n.slideCount - o; t -= 1)
                i = t - 1,
                e(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (t = 0; o > t; t += 1)
                i = t,
                e(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }
    ,
    t.prototype.interrupt = function(e) {
        var t = this;
        e || t.autoPlay(),
        t.interrupted = e
    }
    ,
    t.prototype.selectHandler = function(t) {
        var i = this
          , o = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide")
          , n = parseInt(o.attr("data-slick-index"));
        return n || (n = 0),
        i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(n),
        void i.asNavFor(n)) : void i.slideHandler(n)
    }
    ,
    t.prototype.slideHandler = function(e, t, i) {
        var o, n, s, r, a, l = null, d = this;
        return t = t || !1,
        d.animating === !0 && d.options.waitForAnimate === !0 || d.options.fade === !0 && d.currentSlide === e || d.slideCount <= d.options.slidesToShow ? void 0 : (t === !1 && d.asNavFor(e),
        o = e,
        l = d.getLeft(o),
        r = d.getLeft(d.currentSlide),
        d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft,
        d.options.infinite === !1 && d.options.centerMode === !1 && (0 > e || e > d.getDotCount() * d.options.slidesToScroll) ? void (d.options.fade === !1 && (o = d.currentSlide,
        i !== !0 ? d.animateSlide(r, function() {
            d.postSlide(o)
        }) : d.postSlide(o))) : d.options.infinite === !1 && d.options.centerMode === !0 && (0 > e || e > d.slideCount - d.options.slidesToScroll) ? void (d.options.fade === !1 && (o = d.currentSlide,
        i !== !0 ? d.animateSlide(r, function() {
            d.postSlide(o)
        }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer),
        n = 0 > o ? d.slideCount % d.options.slidesToScroll !== 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll !== 0 ? 0 : o - d.slideCount : o,
        d.animating = !0,
        d.$slider.trigger("beforeChange", [d, d.currentSlide, n]),
        s = d.currentSlide,
        d.currentSlide = n,
        d.setSlideClasses(d.currentSlide),
        d.options.asNavFor && (a = d.getNavTarget(),
        a = a.slick("getSlick"),
        a.slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide)),
        d.updateDots(),
        d.updateArrows(),
        d.options.fade === !0 ? (i !== !0 ? (d.fadeSlideOut(s),
        d.fadeSlide(n, function() {
            d.postSlide(n)
        })) : d.postSlide(n),
        void d.animateHeight()) : void (i !== !0 ? d.animateSlide(l, function() {
            d.postSlide(n)
        }) : d.postSlide(n))))
    }
    ,
    t.prototype.startLoad = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(),
        e.$nextArrow.hide()),
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
        e.$slider.addClass("slick-loading")
    }
    ,
    t.prototype.swipeDirection = function() {
        var e, t, i, o, n = this;
        return e = n.touchObject.startX - n.touchObject.curX,
        t = n.touchObject.startY - n.touchObject.curY,
        i = Math.atan2(t, e),
        o = Math.round(180 * i / Math.PI),
        0 > o && (o = 360 - Math.abs(o)),
        45 >= o && o >= 0 ? n.options.rtl === !1 ? "left" : "right" : 360 >= o && o >= 315 ? n.options.rtl === !1 ? "left" : "right" : o >= 135 && 225 >= o ? n.options.rtl === !1 ? "right" : "left" : n.options.verticalSwiping === !0 ? o >= 35 && 135 >= o ? "down" : "up" : "vertical"
    }
    ,
    t.prototype.swipeEnd = function(e) {
        var t, i, o = this;
        if (o.dragging = !1,
        o.interrupted = !1,
        o.shouldClick = !(o.touchObject.swipeLength > 10),
        void 0 === o.touchObject.curX)
            return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (i = o.swipeDirection()) {
            case "left":
            case "down":
                t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                o.currentDirection = 0;
                break;
            case "right":
            case "up":
                t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                o.currentDirection = 1
            }
            "vertical" != i && (o.slideHandler(t),
            o.touchObject = {},
            o.$slider.trigger("swipe", [o, i]))
        } else
            o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
            o.touchObject = {})
    }
    ,
    t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(t.options.swipe === !1 || "ontouchend"in document && t.options.swipe === !1 || t.options.draggable === !1 && -1 !== e.type.indexOf("mouse")))
            switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1,
            t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold,
            t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
            e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
            }
    }
    ,
    t.prototype.swipeMove = function(e) {
        var t, i, o, n, s, r = this;
        return s = void 0 !== e.originalEvent ? e.originalEvent.touches : null,
        !(!r.dragging || s && 1 !== s.length) && (t = r.getLeft(r.currentSlide),
        r.touchObject.curX = void 0 !== s ? s[0].pageX : e.clientX,
        r.touchObject.curY = void 0 !== s ? s[0].pageY : e.clientY,
        r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))),
        r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))),
        i = r.swipeDirection(),
        "vertical" !== i ? (void 0 !== e.originalEvent && r.touchObject.swipeLength > 4 && e.preventDefault(),
        n = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1),
        r.options.verticalSwiping === !0 && (n = r.touchObject.curY > r.touchObject.startY ? 1 : -1),
        o = r.touchObject.swipeLength,
        r.touchObject.edgeHit = !1,
        r.options.infinite === !1 && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction,
        r.touchObject.edgeHit = !0),
        r.options.vertical === !1 ? r.swipeLeft = t + o * n : r.swipeLeft = t + o * (r.$list.height() / r.listWidth) * n,
        r.options.verticalSwiping === !0 && (r.swipeLeft = t + o * n),
        r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null,
        !1) : void r.setCSS(r.swipeLeft))) : void 0)
    }
    ,
    t.prototype.swipeStart = function(e) {
        var t, i = this;
        return i.interrupted = !0,
        1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {},
        !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]),
        i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX,
        i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY,
        void (i.dragging = !0))
    }
    ,
    t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]),
        t.destroy()
    }
    ,
    t.prototype.updateArrows = function() {
        var e, t = this;
        e = Math.floor(t.options.slidesToShow / 2),
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0 && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
        e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"));
    }
    ,
    t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }
    ,
    e.fn.slick = function() {
        var e, i, o = this, n = arguments[0], s = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (e = 0; r > e; e++)
            if ("object" == typeof n || "undefined" == typeof n ? o[e].slick = new t(o[e],n) : i = o[e].slick[n].apply(o[e].slick, s),
            "undefined" != typeof i)
                return i;
        return o
    }
}),
function() {
    var e, t, i, o, n, s, r, a, l;
    window.device = {},
    t = window.document.documentElement,
    l = window.navigator.userAgent.toLowerCase(),
    device.ios = function() {
        return device.iphone() || device.ipod() || device.ipad()
    }
    ,
    device.iphone = function() {
        return i("iphone")
    }
    ,
    device.ipod = function() {
        return i("ipod")
    }
    ,
    device.ipad = function() {
        return i("ipad")
    }
    ,
    device.android = function() {
        return i("android")
    }
    ,
    device.androidPhone = function() {
        return device.android() && i("mobile")
    }
    ,
    device.androidTablet = function() {
        return device.android() && !i("mobile")
    }
    ,
    device.blackberry = function() {
        return i("blackberry") || i("bb10") || i("rim")
    }
    ,
    device.blackberryPhone = function() {
        return device.blackberry() && !i("tablet")
    }
    ,
    device.blackberryTablet = function() {
        return device.blackberry() && i("tablet")
    }
    ,
    device.windows = function() {
        return i("windows")
    }
    ,
    device.windowsPhone = function() {
        return device.windows() && i("phone")
    }
    ,
    device.windowsTablet = function() {
        return device.windows() && i("touch")
    }
    ,
    device.fxos = function() {
        return i("(mobile; rv:") || i("(tablet; rv:")
    }
    ,
    device.fxosPhone = function() {
        return device.fxos() && i("mobile")
    }
    ,
    device.fxosTablet = function() {
        return device.fxos() && i("tablet")
    }
    ,
    device.mobile = function() {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone()
    }
    ,
    device.tablet = function() {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet()
    }
    ,
    device.portrait = function() {
        return 90 !== Math.abs(window.orientation)
    }
    ,
    device.landscape = function() {
        return 90 === Math.abs(window.orientation)
    }
    ,
    i = function(e) {
        return -1 !== l.indexOf(e)
    }
    ,
    n = function(e) {
        var i;
        return i = new RegExp(e,"i"),
        t.className.match(i)
    }
    ,
    e = function(e) {
        return n(e) ? void 0 : t.className += " " + e
    }
    ,
    r = function(e) {
        return n(e) ? t.className = t.className.replace(e, "") : void 0
    }
    ,
    device.ios() ? device.ipad() ? e("ios ipad tablet") : device.iphone() ? e("ios iphone mobile") : device.ipod() && e("ios ipod mobile") : e(device.android() ? device.androidTablet() ? "android tablet" : "android mobile" : device.blackberry() ? device.blackberryTablet() ? "blackberry tablet" : "blackberry mobile" : device.windows() ? device.windowsTablet() ? "windows tablet" : device.windowsPhone() ? "windows mobile" : "desktop" : device.fxos() ? device.fxosTablet() ? "fxos tablet" : "fxos mobile" : "desktop"),
    o = function() {
        return device.landscape() ? (r("portrait"),
        e("landscape")) : (r("landscape"),
        e("portrait"))
    }
    ,
    a = "onorientationchange"in window,
    s = a ? "orientationchange" : "resize",
    window.addEventListener ? window.addEventListener(s, o, !1) : window.attachEvent ? window.attachEvent(s, o) : window[s] = o,
    o()
}
.call(this),
!function(e) {
    var t = {}
      , o = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {},
        onSliderResize: function() {}
    };
    e.fn.bxSlider = function(n) {
        if (0 == this.length)
            return this;
        if (this.length > 1)
            return this.each(function() {
                e(this).bxSlider(n)
            }),
            this;
        var s = {}
          , r = this;
        t.el = this;
        var a = e(window).width()
          , l = e(window).height()
          , d = function() {
            s.settings = e.extend({}, o, n),
            s.settings.slideWidth = parseInt(s.settings.slideWidth),
            s.children = r.children(s.settings.slideSelector),
            s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length),
            s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length),
            s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)),
            s.active = {
                index: s.settings.startSlide
            },
            s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1,
            s.carousel && (s.settings.preloadImages = "all"),
            s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin,
            s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin,
            s.working = !1,
            s.controls = {},
            s.interval = null,
            s.animProp = "vertical" == s.settings.mode ? "top" : "left",
            s.usingCSS = s.settings.useCSS && "fade" != s.settings.mode && function() {
                var e = document.createElement("div")
                  , t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var i in t)
                    if (void 0 !== e.style[t[i]])
                        return s.cssPrefix = t[i].replace("Perspective", "").toLowerCase(),
                        s.animProp = "-" + s.cssPrefix + "-transform",
                        !0;
                return !1
            }(),
            "vertical" == s.settings.mode && (s.settings.maxSlides = s.settings.minSlides),
            r.data("origStyle", r.attr("style")),
            r.children(s.settings.slideSelector).each(function() {
                e(this).data("origStyle", e(this).attr("style"))
            }),
            c()
        }
          , c = function() {
            r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),
            s.viewport = r.parent(),
            s.loader = e('<div class="bx-loading" />'),
            s.viewport.prepend(s.loader),
            r.css({
                width: "horizontal" == s.settings.mode ? 100 * s.children.length + 215 + "%" : "auto",
                position: "relative"
            }),
            s.usingCSS && s.settings.easing ? r.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing"),
            v(),
            s.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }),
            s.viewport.parent().css({
                maxWidth: f()
            }),
            s.settings.pager || s.viewport.parent().css({
                margin: "0 auto 0px"
            }),
            s.children.css({
                "float": "horizontal" == s.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }),
            s.children.css("width", g()),
            "horizontal" == s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin),
            "vertical" == s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin),
            "fade" == s.settings.mode && (s.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }),
            s.children.eq(s.settings.startSlide).css({
                zIndex: s.settings.slideZIndex,
                display: "block"
            })),
            s.controls.el = e('<div class="bx-controls" />'),
            s.settings.captions && C(),
            s.active.last = s.settings.startSlide == m() - 1,
            s.settings.video && r.fitVids();
            var t = s.children.eq(s.settings.startSlide);
            "all" == s.settings.preloadImages && (t = s.children),
            s.settings.ticker ? s.settings.pager = !1 : (s.settings.pager && k(),
            s.settings.controls && S(),
            s.settings.auto && s.settings.autoControls && T(),
            (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)),
            p(t, u)
        }
          , p = function(t, i) {
            var o = t.find("img, iframe").length;
            if (0 == o)
                return void i();
            var n = 0;
            t.find("img, iframe").each(function() {
                e(this).one("load", function() {
                    ++n == o && i()
                }).each(function() {
                    this.complete && e(this).load()
                })
            })
        }
          , u = function() {
            if (s.settings.infiniteLoop && "fade" != s.settings.mode && !s.settings.ticker) {
                var t = "vertical" == s.settings.mode ? s.settings.minSlides : s.settings.maxSlides
                  , i = s.children.slice(0, t).clone().addClass("bx-clone")
                  , o = s.children.slice(-t).clone().addClass("bx-clone");
                r.append(i).prepend(o)
            }
            s.loader.remove(),
            y(),
            "vertical" == s.settings.mode && (s.settings.adaptiveHeight = !0),
            s.viewport.height(h()),
            r.redrawSlider(),
            s.settings.onSliderLoad(s.active.index),
            s.initialized = !0,
            s.settings.responsive && e(window).bind("resize", _),
            s.settings.auto && s.settings.autoStart && I(),
            s.settings.ticker && W(),
            s.settings.pager && O(s.settings.startSlide),
            s.settings.controls && L(),
            s.settings.touchEnabled && !s.settings.ticker && D()
        }
          , h = function() {
            var t = 0
              , o = e();
            if ("vertical" == s.settings.mode || s.settings.adaptiveHeight)
                if (s.carousel) {
                    var n = 1 == s.settings.moveSlides ? s.active.index : s.active.index * w();
                    for (o = s.children.eq(n),
                    i = 1; i <= s.settings.maxSlides - 1; i++)
                        o = n + i >= s.children.length ? o.add(s.children.eq(i - 1)) : o.add(s.children.eq(n + i))
                } else
                    o = s.children.eq(s.active.index);
            else
                o = s.children;
            return "vertical" == s.settings.mode ? (o.each(function() {
                t += e(this).outerHeight()
            }),
            s.settings.slideMargin > 0 && (t += s.settings.slideMargin * (s.settings.minSlides - 1))) : t = Math.max.apply(Math, o.map(function() {
                return e(this).outerHeight(!1)
            }).get()),
            t
        }
          , f = function() {
            var e = "100%";
            return s.settings.slideWidth > 0 && (e = "horizontal" == s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth),
            e
        }
          , g = function() {
            var e = s.settings.slideWidth
              , t = s.viewport.width();
            return 0 == s.settings.slideWidth || s.settings.slideWidth > t && !s.carousel || "vertical" == s.settings.mode ? e = t : s.settings.maxSlides > 1 && "horizontal" == s.settings.mode && (t > s.maxThreshold || t < s.minThreshold && (e = (t - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides)),
            e
        }
          , v = function() {
            var e = 1;
            if ("horizontal" == s.settings.mode && s.settings.slideWidth > 0)
                if (s.viewport.width() < s.minThreshold)
                    e = s.settings.minSlides;
                else if (s.viewport.width() > s.maxThreshold)
                    e = s.settings.maxSlides;
                else {
                    var t = s.children.first().width();
                    e = Math.floor(s.viewport.width() / t)
                }
            else
                "vertical" == s.settings.mode && (e = s.settings.minSlides);
            return e
        }
          , m = function() {
            var e = 0;
            if (s.settings.moveSlides > 0)
                if (s.settings.infiniteLoop)
                    e = s.children.length / w();
                else
                    for (var t = 0, i = 0; t < s.children.length; )
                        ++e,
                        t = i + v(),
                        i += s.settings.moveSlides <= v() ? s.settings.moveSlides : v();
            else
                e = Math.ceil(s.children.length / v());
            return e
        }
          , w = function() {
            return s.settings.moveSlides > 0 && s.settings.moveSlides <= v() ? s.settings.moveSlides : v()
        }
          , y = function() {
            if (s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop) {
                if ("horizontal" == s.settings.mode) {
                    var e = s.children.last()
                      , t = e.position();
                    b(-(t.left - (s.viewport.width() - e.width())), "reset", 0)
                } else if ("vertical" == s.settings.mode) {
                    var i = s.children.length - s.settings.minSlides
                      , t = s.children.eq(i).position();
                    b(-t.top, "reset", 0)
                }
            } else {
                var t = s.children.eq(s.active.index * w()).position();
                s.active.index == m() - 1 && (s.active.last = !0),
                void 0 != t && ("horizontal" == s.settings.mode ? b(-t.left, "reset", 0) : "vertical" == s.settings.mode && b(-t.top, "reset", 0))
            }
        }
          , b = function(e, t, i, o) {
            if (s.usingCSS) {
                var n = "vertical" == s.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                r.css("-" + s.cssPrefix + "-transition-duration", i / 1e3 + "s"),
                "slide" == t ? (r.css(s.animProp, n),
                r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    H()
                })) : "reset" == t ? r.css(s.animProp, n) : "ticker" == t && (r.css("-" + s.cssPrefix + "-transition-timing-function", "linear"),
                r.css(s.animProp, n),
                r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    b(o.resetValue, "reset", 0),
                    j()
                }))
            } else {
                var a = {};
                a[s.animProp] = e,
                "slide" == t ? r.animate(a, i, s.settings.easing, function() {
                    H()
                }) : "reset" == t ? r.css(s.animProp, e) : "ticker" == t && r.animate(a, speed, "linear", function() {
                    b(o.resetValue, "reset", 0),
                    j()
                })
            }
        }
          , x = function() {
            for (var t = "", i = m(), o = 0; i > o; o++) {
                var n = "";
                s.settings.buildPager && e.isFunction(s.settings.buildPager) ? (n = s.settings.buildPager(o),
                s.pagerEl.addClass("bx-custom-pager")) : (n = o + 1,
                s.pagerEl.addClass("bx-default-pager")),
                t += '<div class="bx-pager-item"><a href="" data-slide-index="' + o + '" class="bx-pager-link">' + n + "</a></div>"
            }
            s.pagerEl.html(t)
        }
          , k = function() {
            s.settings.pagerCustom ? s.pagerEl = e(s.settings.pagerCustom) : (s.pagerEl = e('<div class="bx-pager" />'),
            s.settings.pagerSelector ? e(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl),
            x()),
            s.pagerEl.on("click", "a", A)
        }
          , S = function() {
            s.controls.next = e('<a class="bx-next" href="">' + s.settings.nextText + "</a>"),
            s.controls.prev = e('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"),
            s.controls.next.bind("click", $),
            s.controls.prev.bind("click", P),
            s.settings.nextSelector && e(s.settings.nextSelector).append(s.controls.next),
            s.settings.prevSelector && e(s.settings.prevSelector).append(s.controls.prev),
            s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = e('<div class="bx-controls-direction" />'),
            s.controls.directionEl.append(s.controls.prev).append(s.controls.next),
            s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))
        }
          , T = function() {
            s.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"),
            s.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"),
            s.controls.autoEl = e('<div class="bx-controls-auto" />'),
            s.controls.autoEl.on("click", ".bx-start", M),
            s.controls.autoEl.on("click", ".bx-stop", E),
            s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop),
            s.settings.autoControlsSelector ? e(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl),
            z(s.settings.autoStart ? "stop" : "start")
        }
          , C = function() {
            s.children.each(function() {
                var t = e(this).find("img:first").attr("title");
                void 0 != t && ("" + t).length && e(this).append('<div class="bx-caption"><span>' + t + "</span></div>")
            })
        }
          , $ = function(e) {
            s.settings.auto && r.stopAuto(),
            r.goToNextSlide(),
            e.preventDefault()
        }
          , P = function(e) {
            s.settings.auto && r.stopAuto(),
            r.goToPrevSlide(),
            e.preventDefault()
        }
          , M = function(e) {
            r.startAuto(),
            e.preventDefault()
        }
          , E = function(e) {
            r.stopAuto(),
            e.preventDefault()
        }
          , A = function(t) {
            s.settings.auto && r.stopAuto();
            var i = e(t.currentTarget)
              , o = parseInt(i.attr("data-slide-index"));
            o != s.active.index && r.goToSlide(o),
            t.preventDefault()
        }
          , O = function(t) {
            var i = s.children.length;
            return "short" == s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)),
            void s.pagerEl.html(t + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"),
            void s.pagerEl.each(function(i, o) {
                e(o).find("a").eq(t).addClass("active")
            }))
        }
          , H = function() {
            if (s.settings.infiniteLoop) {
                var e = "";
                0 == s.active.index ? e = s.children.eq(0).position() : s.active.index == m() - 1 && s.carousel ? e = s.children.eq((m() - 1) * w()).position() : s.active.index == s.children.length - 1 && (e = s.children.eq(s.children.length - 1).position()),
                e && ("horizontal" == s.settings.mode ? b(-e.left, "reset", 0) : "vertical" == s.settings.mode && b(-e.top, "reset", 0))
            }
            s.working = !1,
            s.settings.onSlideAfter(s.children.eq(s.active.index), s.oldIndex, s.active.index)
        }
          , z = function(e) {
            s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[e]) : (s.controls.autoEl.find("a").removeClass("active"),
            s.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
        }
          , L = function() {
            1 == m() ? (s.controls.prev.addClass("disabled"),
            s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 == s.active.index ? (s.controls.prev.addClass("disabled"),
            s.controls.next.removeClass("disabled")) : s.active.index == m() - 1 ? (s.controls.next.addClass("disabled"),
            s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"),
            s.controls.next.removeClass("disabled")))
        }
          , I = function() {
            s.settings.autoDelay > 0 ? setTimeout(r.startAuto, s.settings.autoDelay) : r.startAuto(),
            s.settings.autoHover && r.hover(function() {
                s.interval && (r.stopAuto(!0),
                s.autoPaused = !0)
            }, function() {
                s.autoPaused && (r.startAuto(!0),
                s.autoPaused = null)
            })
        }
          , W = function() {
            var t = 0;
            if ("next" == s.settings.autoDirection)
                r.append(s.children.clone().addClass("bx-clone"));
            else {
                r.prepend(s.children.clone().addClass("bx-clone"));
                var i = s.children.first().position();
                t = "horizontal" == s.settings.mode ? -i.left : -i.top
            }
            b(t, "reset", 0),
            s.settings.pager = !1,
            s.settings.controls = !1,
            s.settings.autoControls = !1,
            s.settings.tickerHover && !s.usingCSS && s.viewport.hover(function() {
                r.stop()
            }, function() {
                var t = 0;
                s.children.each(function() {
                    t += "horizontal" == s.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                });
                var i = s.settings.speed / t
                  , o = "horizontal" == s.settings.mode ? "left" : "top"
                  , n = i * (t - Math.abs(parseInt(r.css(o))));
                j(n)
            }),
            j()
        }
          , j = function(e) {
            speed = e ? e : s.settings.speed;
            var t = {
                left: 0,
                top: 0
            }
              , i = {
                left: 0,
                top: 0
            };
            "next" == s.settings.autoDirection ? t = r.find(".bx-clone").first().position() : i = s.children.first().position();
            var o = "horizontal" == s.settings.mode ? -t.left : -t.top
              , n = "horizontal" == s.settings.mode ? -i.left : -i.top
              , a = {
                resetValue: n
            };
            b(o, "ticker", speed, a)
        }
          , D = function() {
            s.touch = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            },
            s.viewport.bind("touchstart", R)
        }
          , R = function(e) {
            if (s.working)
                e.preventDefault();
            else {
                s.touch.originalPos = r.position();
                var t = e.originalEvent;
                s.touch.start.x = t.changedTouches[0].pageX,
                s.touch.start.y = t.changedTouches[0].pageY,
                s.viewport.bind("touchmove", q),
                s.viewport.bind("touchend", B)
            }
        }
          , q = function(e) {
            var t = e.originalEvent
              , i = Math.abs(t.changedTouches[0].pageX - s.touch.start.x)
              , o = Math.abs(t.changedTouches[0].pageY - s.touch.start.y);
            if (3 * i > o && s.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * o > i && s.settings.preventDefaultSwipeY && e.preventDefault(),
            "fade" != s.settings.mode && s.settings.oneToOneTouch) {
                var n = 0;
                if ("horizontal" == s.settings.mode) {
                    var r = t.changedTouches[0].pageX - s.touch.start.x;
                    n = s.touch.originalPos.left + r
                } else {
                    var r = t.changedTouches[0].pageY - s.touch.start.y;
                    n = s.touch.originalPos.top + r
                }
                b(n, "reset", 0)
            }
        }
          , B = function(e) {
            s.viewport.unbind("touchmove", q);
            var t = e.originalEvent
              , i = 0;
            if (s.touch.end.x = t.changedTouches[0].pageX,
            s.touch.end.y = t.changedTouches[0].pageY,
            "fade" == s.settings.mode) {
                var o = Math.abs(s.touch.start.x - s.touch.end.x);
                o >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(),
                r.stopAuto())
            } else {
                var o = 0;
                "horizontal" == s.settings.mode ? (o = s.touch.end.x - s.touch.start.x,
                i = s.touch.originalPos.left) : (o = s.touch.end.y - s.touch.start.y,
                i = s.touch.originalPos.top),
                !s.settings.infiniteLoop && (0 == s.active.index && o > 0 || s.active.last && 0 > o) ? b(i, "reset", 200) : Math.abs(o) >= s.settings.swipeThreshold ? (0 > o ? r.goToNextSlide() : r.goToPrevSlide(),
                r.stopAuto()) : b(i, "reset", 200)
            }
            s.viewport.unbind("touchend", B)
        }
          , _ = function() {
            var t = e(window).width()
              , i = e(window).height();
            (a != t || l != i) && (a = t,
            l = i,
            r.redrawSlider(),
            s.settings.onSliderResize.call(r, s.active.index))
        };
        return r.goToSlide = function(t, i) {
            if (!s.working && s.active.index != t)
                if (s.working = !0,
                s.oldIndex = s.active.index,
                s.active.index = 0 > t ? m() - 1 : t >= m() ? 0 : t,
                s.settings.onSlideBefore(s.children.eq(s.active.index), s.oldIndex, s.active.index),
                "next" == i ? s.settings.onSlideNext(s.children.eq(s.active.index), s.oldIndex, s.active.index) : "prev" == i && s.settings.onSlidePrev(s.children.eq(s.active.index), s.oldIndex, s.active.index),
                s.active.last = s.active.index >= m() - 1,
                s.settings.pager && O(s.active.index),
                s.settings.controls && L(),
                "fade" == s.settings.mode)
                    s.settings.adaptiveHeight && s.viewport.height() != h() && s.viewport.animate({
                        height: h()
                    }, s.settings.adaptiveHeightSpeed),
                    s.children.filter(":visible").fadeOut(s.settings.speed).css({
                        zIndex: 0
                    }),
                    s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function() {
                        e(this).css("zIndex", s.settings.slideZIndex),
                        H()
                    });
                else {
                    s.settings.adaptiveHeight && s.viewport.height() != h() && s.viewport.animate({
                        height: h()
                    }, s.settings.adaptiveHeightSpeed);
                    var o = 0
                      , n = {
                        left: 0,
                        top: 0
                    };
                    if (!s.settings.infiniteLoop && s.carousel && s.active.last)
                        if ("horizontal" == s.settings.mode) {
                            var a = s.children.eq(s.children.length - 1);
                            n = a.position(),
                            o = s.viewport.width() - a.outerWidth()
                        } else {
                            var l = s.children.length - s.settings.minSlides;
                            n = s.children.eq(l).position()
                        }
                    else if (s.carousel && s.active.last && "prev" == i) {
                        var d = 1 == s.settings.moveSlides ? s.settings.maxSlides - w() : (m() - 1) * w() - (s.children.length - s.settings.maxSlides)
                          , a = r.children(".bx-clone").eq(d);
                        n = a.position()
                    } else if ("next" == i && 0 == s.active.index)
                        n = r.find("> .bx-clone").eq(s.settings.maxSlides).position(),
                        s.active.last = !1;
                    else if (t >= 0) {
                        var c = t * w();
                        n = s.children.eq(c).position()
                    }
                    if ("undefined" != typeof n) {
                        var p = "horizontal" == s.settings.mode ? -(n.left - o) : -n.top;
                        b(p, "slide", s.settings.speed)
                    }
                }
        }
        ,
        r.goToNextSlide = function() {
            if (s.settings.infiniteLoop || !s.active.last) {
                var e = parseInt(s.active.index) + 1;
                r.goToSlide(e, "next")
            }
        }
        ,
        r.goToPrevSlide = function() {
            if (s.settings.infiniteLoop || 0 != s.active.index) {
                var e = parseInt(s.active.index) - 1;
                r.goToSlide(e, "prev")
            }
        }
        ,
        r.startAuto = function(e) {
            s.interval || (s.interval = setInterval(function() {
                "next" == s.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            }, s.settings.pause),
            s.settings.autoControls && 1 != e && z("stop"))
        }
        ,
        r.stopAuto = function(e) {
            s.interval && (clearInterval(s.interval),
            s.interval = null,
            s.settings.autoControls && 1 != e && z("start"))
        }
        ,
        r.getCurrentSlide = function() {
            return s.active.index
        }
        ,
        r.getCurrentSlideElement = function() {
            return s.children.eq(s.active.index)
        }
        ,
        r.getSlideCount = function() {
            return s.children.length
        }
        ,
        r.redrawSlider = function() {
            s.children.add(r.find(".bx-clone")).outerWidth(g()),
            s.viewport.css("height", h()),
            s.settings.ticker || y(),
            s.active.last && (s.active.index = m() - 1),
            s.active.index >= m() && (s.active.last = !0),
            s.settings.pager && !s.settings.pagerCustom && (x(),
            O(s.active.index))
        }
        ,
        r.destroySlider = function() {
            s.initialized && (s.initialized = !1,
            e(".bx-clone", this).remove(),
            s.children.each(function() {
                void 0 != e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
            }),
            void 0 != e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"),
            e(this).unwrap().unwrap(),
            s.controls.el && s.controls.el.remove(),
            s.controls.next && s.controls.next.remove(),
            s.controls.prev && s.controls.prev.remove(),
            s.pagerEl && s.settings.controls && s.pagerEl.remove(),
            e(".bx-caption", this).remove(),
            s.controls.autoEl && s.controls.autoEl.remove(),
            clearInterval(s.interval),
            s.settings.responsive && e(window).unbind("resize", _))
        }
        ,
        r.reloadSlider = function(e) {
            void 0 != e && (n = e),
            r.destroySlider(),
            d()
        }
        ,
        d(),
        this
    }
}(jQuery),
function(e, t, i) {
    function o(e) {
        var t = {}
          , o = /^jQuery\d+$/;
        return i.each(e.attributes, function(e, i) {
            i.specified && !o.test(i.name) && (t[i.name] = i.value)
        }),
        t
    }
    function n(e, t) {
        var o = i(this);
        if (this.value == o.attr("placeholder") && o.hasClass("placeholder"))
            if (o.data("placeholder-password")) {
                if (o = o.hide().next().show().attr("id", o.removeAttr("id").data("placeholder-id")),
                !0 === e)
                    return o[0].value = t;
                o.focus()
            } else
                this.value = "",
                o.removeClass("placeholder"),
                this == r() && this.select()
    }
    function s() {
        var e, t = i(this), s = this.id;
        if ("" == this.value) {
            if ("password" == this.type) {
                if (!t.data("placeholder-textinput")) {
                    try {
                        e = t.clone().attr({
                            type: "text"
                        })
                    } catch (r) {
                        e = i("<input>").attr(i.extend(o(this), {
                            type: "text"
                        }))
                    }
                    e.removeAttr("name").data({
                        "placeholder-password": t,
                        "placeholder-id": s
                    }).bind("focus.placeholder", n),
                    t.data({
                        "placeholder-textinput": e,
                        "placeholder-id": s
                    }).before(e)
                }
                t = t.removeAttr("id").hide().prev().attr("id", s).show()
            }
            t.addClass("placeholder"),
            t[0].value = t.attr("placeholder")
        } else
            t.removeClass("placeholder")
    }
    function r() {
        try {
            return t.activeElement
        } catch (e) {}
    }
    var a = "[object OperaMini]" == Object.prototype.toString.call(e.operamini)
      , l = "placeholder"in t.createElement("input") && !a
      , a = "placeholder"in t.createElement("textarea") && !a
      , d = i.fn
      , c = i.valHooks
      , p = i.propHooks;
    l && a ? (d = d.placeholder = function() {
        return this
    }
    ,
    d.input = d.textarea = !0) : (d = d.placeholder = function() {
        return this.filter((l ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": n,
            "blur.placeholder": s
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"),
        this
    }
    ,
    d.input = l,
    d.textarea = a,
    d = {
        get: function(e) {
            var t = i(e)
              , o = t.data("placeholder-password");
            return o ? o[0].value : t.data("placeholder-enabled") && t.hasClass("placeholder") ? "" : e.value
        },
        set: function(e, t) {
            var o = i(e)
              , a = o.data("placeholder-password");
            return a ? a[0].value = t : o.data("placeholder-enabled") ? ("" == t ? (e.value = t,
            e != r() && s.call(e)) : o.hasClass("placeholder") ? n.call(e, !0, t) || (e.value = t) : e.value = t,
            o) : e.value = t
        }
    },
    l || (c.input = d,
    p.value = d),
    a || (c.textarea = d,
    p.value = d),
    i(function() {
        i(t).delegate("form", "submit.placeholder", function() {
            var e = i(".placeholder", this).each(n);
            setTimeout(function() {
                e.each(s)
            }, 10)
        })
    }),
    i(e).bind("beforeunload.placeholder", function() {
        i(".placeholder").each(function() {
            this.value = ""
        })
    }))
}(this, document, jQuery),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof module && module.exports ? require("jquery") : e.jQuery)
}(this, function(e, t) {
    function i(e) {
        this.setConfig(e)
    }
    i.prototype.setConfig = function(t) {
        this.config = e.extend({}, {
            namePattern: "[a-zA-Z0-9-]+",
            elemPrefix: "__",
            modPrefix: "--",
            modDlmtr: "--"
        }, t),
        this.blockClassRe = this.buildBlockClassRe(),
        this.elemClassRe = this.buildElemClassRe(),
        this.modClassRe = this.buildModClassRe()
    }
    ,
    i.prototype.getBlock = function(e) {
        var t = this.getBlockClass(e)
          , i = e.closest("." + t);
        return i.selector = t,
        i
    }
    ,
    i.prototype.switchBlock = function(e, t, i) {
        var i = i || null;
        return i ? e.selector = this.buildSelector({
            block: t,
            elem: i
        }) : e.selector = this.buildSelector({
            block: t
        }),
        e
    }
    ,
    i.prototype.findElem = function(e, t) {
        var i = this.getBlockClass(e)
          , o = "." + this.buildElemClass(i, t)
          , n = e.is(o) ? e : e.find(o);
        return n
    }
    ,
    i.prototype.getMod = function(e, i) {
        var o = this.extractMods(e.first());
        return o[i] != t ? o[i] : null
    }
    ,
    i.prototype.hasMod = function(e, t, i) {
        var o = this.extractMods(e.first());
        if (i) {
            if (o[t] == i)
                return !0
        } else if (o[t])
            return !0;
        return !1
    }
    ,
    i.prototype.setMod = function(i, o, n) {
        var s = this
          , r = i.selector;
        return i.each(function() {
            var i = e(this);
            i.selector = r;
            var a = s.extractMods(i)
              , l = s.getBaseClass(i);
            if (a[o] != t) {
                var d = s.buildModClass(l, o, a[o]);
                i.removeClass(d)
            }
            if (n !== !1)
                var c = s.buildModClass(l, o, n);
            i.addClass(c).trigger("setmod", [o, n])
        }),
        i
    }
    ,
    i.prototype.delMod = function(t, i, o) {
        var n = this
          , s = t.selector;
        return t.each(function() {
            var t = e(this);
            t.selector = s;
            var r = n.extractMods(t)
              , a = n.getBaseClass(t);
            if (o) {
                if (r[i] == o)
                    var l = n.buildModClass(a, i, r[i])
            } else
                var l = n.buildModClass(a, i, r[i]);
            t.removeClass(l).trigger("delmod", [i, o])
        }),
        t
    }
    ,
    i.prototype.byMod = function(i, o, n, s) {
        var r = this
          , n = n || null
          , s = s || !1
          , a = i.selector
          , l = e();
        return i.each(function() {
            var i = e(this);
            i.selector = a;
            var d = r.extractMods(i)
              , c = r.getBaseClass(i);
            if (n) {
                if (d[o] == n)
                    var p = r.buildModClass(c, o, d[o])
            } else if (d[o] != t)
                var p = r.buildModClass(c, o, d[o]);
            l = l.add(s ? i.not("." + p) : i.filter("." + p))
        }),
        l.selector = a,
        l
    }
    ,
    i.prototype.extractBlocks = function(t) {
        var i = this
          , o = []
          , n = this.getClasses(t);
        return e.each(n, function(e, t) {
            var n = i.getClassType(t);
            if ("block" == n)
                o.push(t);
            else if ("elem" == n) {
                var s = t.split(i.config.elemPrefix);
                o.push(s[0])
            }
        }),
        o
    }
    ,
    i.prototype.extractElems = function(t) {
        var i = this
          , o = [];
        return e.each(i.getClasses(t), function(e, t) {
            if ("elem" == i.getClassType(t)) {
                var n = t.split(i.config.elemPrefix);
                o.push(n[1])
            }
        }),
        o
    }
    ,
    i.prototype.extractMods = function(i) {
        var o = this
          , n = {};
        return i.each(function() {
            var i = e(this);
            e.each(o.getClasses(i), function(e, i) {
                if ("mod" == o.getClassType(i)) {
                    var s = o.buildModClassRe().exec(i)
                      , r = s[1].split(o.config.modDlmtr);
                    if (r[1] !== t && r[1] !== !1)
                        var a = r[1];
                    else
                        var a = !0;
                    n[r[0]] = a
                }
            })
        }),
        n
    }
    ,
    i.prototype.getClasses = function(i) {
        var o, n = [];
        if ("object" == typeof i)
            if (0 === i.selector.indexOf("."))
                o = i.selector.split(".");
            else {
                if (i.attr("class") == t)
                    return null;
                o = i.attr("class").split(" ")
            }
        else
            o = i.split(".");
        return e.each(o, function(t, i) {
            "" != i && n.push(e.trim(i))
        }),
        n
    }
    ,
    i.prototype.buildBlockClassRe = function() {
        return new RegExp("^(" + this.config.namePattern + ")$")
    }
    ,
    i.prototype.buildElemClassRe = function() {
        return new RegExp("^" + this.config.namePattern + this.config.elemPrefix + "(" + this.config.namePattern + ")$")
    }
    ,
    i.prototype.buildModClassRe = function() {
        return new RegExp("^(?:" + this.config.namePattern + "|" + this.config.namePattern + this.config.elemPrefix + this.config.namePattern + ")" + this.config.modPrefix + "(" + this.config.namePattern + "((" + this.config.modDlmtr + this.config.namePattern + ")$|$))")
    }
    ,
    i.prototype.buildBlockClass = function(e) {
        return e
    }
    ,
    i.prototype.buildElemClass = function(e, t) {
        return e + this.config.elemPrefix + t
    }
    ,
    i.prototype.buildModClass = function(e, i, o) {
        return o !== t && o !== !0 ? e + this.config.modPrefix + i + this.config.modDlmtr + o : e + this.config.modPrefix + i
    }
    ,
    i.prototype.buildSelector = function(e, i) {
        if ("" !== i)
            var i = i || ".";
        if ("object" == typeof e && e.block != t) {
            var o = this.buildBlockClass(e.block);
            if (e.elem != t && (o = this.buildElemClass(o, e.elem)),
            e.mod != t) {
                var n = e.mod.split(":");
                o = this.buildModClass(o, n[0], n[1])
            }
        }
        return o != t ? i + o : i + e
    }
    ,
    i.prototype.getBlockClass = function(e, t) {
        var i = this.extractBlocks(e)
          , t = t || 0;
        return t <= i.length - 1 ? i[t] : null
    }
    ,
    i.prototype.getBaseClass = function(t) {
        var i = this
          , o = null
          , n = this.getClasses(t);
        return e.each(n, function(e, t) {
            var n = i.getClassType(t);
            n && "mod" != n && (o = t)
        }),
        o
    }
    ,
    i.prototype.getClassType = function(e) {
        return this.modClassRe.test(e) ? "mod" : this.elemClassRe.test(e) ? "elem" : this.blockClassRe.test(e) ? "block" : null
    }
    ,
    e.BEM = new i,
    e.fn.extend({
        block: function() {
            return e.BEM.getBlock(this)
        },
        elem: function(t, i) {
            return i || (i = t,
            t = null),
            e.BEM.findElem(t || this, i)
        },
        ctx: function(t, i) {
            return e.BEM.switchBlock(this, t, i)
        },
        mod: function(t, i) {
            return "undefined" == typeof i && (i = null),
            i === !1 ? e.BEM.delMod(this, t) : null != i ? e.BEM.setMod(this, t, i) : e.BEM.getMod(this, t)
        },
        setMod: function(t, i) {
            return e.BEM.setMod(this, t, i)
        },
        delMod: function(t, i) {
            return e.BEM.delMod(this, t, i)
        },
        hasMod: function(t, i) {
            return e.BEM.hasMod(this, t, i)
        },
        byMod: function(t, i) {
            return e.BEM.byMod(this, t, i)
        },
        byNotMod: function(t, i) {
            return e.BEM.byMod(this, t, i, "inverse")
        },
        toggleMod: function(e, t, i) {
            return this.hasMod(e, t) ? this.delMod(e, t).setMod(e, i) : this.delMod(e, i).setMod(e, t)
        }
    })
});

!function(e) {
    e.extend(e.easing, {
        spincrementEasing: function(e, t, n, a, i) {
            return t == i ? n + a : a * (1 - Math.pow(2, -10 * t / i)) + n
        }
    }),
    e.fn.spincrement = function(t) {
        var n = e.extend({
            from: 0,
            to: !1,
            decimalPlaces: 0,
            decimalPoint: ".",
            thousandSeparator: ",",
            duration: 1e3,
            leeway: 50,
            easing: "spincrementEasing",
            fade: !0
        }, t)
          , a = new RegExp(/^(-?[0-9]+)([0-9]{3})/);
        function i(e) {
            if (e = e.toFixed(n.decimalPlaces),
            n.decimalPlaces > 0 && "." != n.decimalPoint && (e = e.replace(".", n.decimalPoint)),
            n.thousandSeparator)
                for (; a.test(e); )
                    e = e.replace(a, "$1" + n.thousandSeparator + "$2");
            return e
        }
        return this.each(function() {
            var t = e(this)
              , a = n.from
              , o = 0 != n.to ? n.to : parseFloat(t.html())
              , r = n.duration;
            n.leeway && (r += Math.round(n.duration * ((2 * Math.random() - 1) * n.leeway / 100))),
            t.css("counter", a),
            n.fade && t.css("opacity", 0),
            t.animate({
                counter: o,
                opacity: 1
            }, {
                easing: n.easing,
                duration: r,
                step: function(e) {
                    t.css("visibility", "visible"),
                    t.html(i(e * o))
                },
                complete: function() {
                    t.css("counter", null),
                    t.html(i(o))
                }
            })
        })
    }
}(jQuery);
!function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            i.extend(n, n.initials),
            n.activeBreakpoint = null,
            n.animType = null,
            n.animProp = null,
            n.breakpoints = [],
            n.breakpointSettings = [],
            n.cssTransitions = !1,
            n.focussed = !1,
            n.interrupted = !1,
            n.hidden = "hidden",
            n.paused = !0,
            n.positionProp = null,
            n.respondTo = null,
            n.rowCount = 1,
            n.shouldClick = !0,
            n.$slider = i(t),
            n.$slidesCache = null,
            n.transformType = null,
            n.transitionType = null,
            n.visibilityChange = "visibilitychange",
            n.windowWidth = 0,
            n.windowTimer = null,
            s = i(t).data("slick") || {},
            n.options = i.extend({}, n.defaults, o, s),
            n.currentSlide = n.options.initialSlide,
            n.originalSettings = n.options,
            void 0 !== document.mozHidden ? (n.hidden = "mozHidden",
            n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden",
            n.visibilityChange = "webkitvisibilitychange"),
            n.autoPlay = i.proxy(n.autoPlay, n),
            n.autoPlayClear = i.proxy(n.autoPlayClear, n),
            n.autoPlayIterator = i.proxy(n.autoPlayIterator, n),
            n.changeSlide = i.proxy(n.changeSlide, n),
            n.clickHandler = i.proxy(n.clickHandler, n),
            n.selectHandler = i.proxy(n.selectHandler, n),
            n.setPosition = i.proxy(n.setPosition, n),
            n.swipeHandler = i.proxy(n.swipeHandler, n),
            n.dragHandler = i.proxy(n.dragHandler, n),
            n.keyHandler = i.proxy(n.keyHandler, n),
            n.instanceUid = e++,
            n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            n.registerBreakpoints(),
            n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t)
            o = t,
            t = null;
        else if (t < 0 || t >= s.slideCount)
            return !1;
        s.unload(),
        "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack),
        s.$slides = s.$slideTrack.children(this.options.slide),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }),
        s.$slidesCache = s.$slides,
        s.reinit()
    }
    ,
    e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }
    ,
    e.prototype.animateSlide = function(e, t) {
        var o = {}
          , s = this;
        s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
        i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i),
                !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)",
                s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)",
                s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(),
        e = Math.ceil(e),
        !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)",
        s.$slideTrack.css(o),
        t && setTimeout(function() {
            s.disableTransition(),
            t.call()
        }, s.options.speed))
    }
    ,
    e.prototype.getNavTarget = function() {
        var e = this
          , t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)),
        t
    }
    ,
    e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }
    ,
    e.prototype.applyTransition = function(i) {
        var e = this
          , t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }
    ,
    e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }
    ,
    e.prototype.autoPlayIterator = function() {
        var i = this
          , e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
        i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e))
    }
    ,
    e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"),
        e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"),
        e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
        !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0; e <= o.getDotCount(); e += 1)
                t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots),
            o.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }),
        e.$slider.addClass("slick-slider"),
        e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
        e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        e.$slideTrack.css("opacity", 0),
        !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        !0 === e.options.draggable && e.$list.addClass("draggable")
    }
    ,
    e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(),
        n = l.$slider.children(),
        l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o),
            l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints)
                r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
            r.options = r.originalSettings,
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            l = s),
            e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }
    ,
    e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this, l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        n = r.slideCount % r.options.slidesToScroll != 0,
        o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
        e.data.message) {
        case "previous":
            s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
            break;
        case "next":
            s = 0 === o ? r.options.slidesToScroll : o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
            break;
        case "index":
            var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(),
        t = 0,
        i > e[e.length - 1])
            i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }
    ,
    e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i))
    }
    ,
    e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(),
        i.stopPropagation(),
        i.preventDefault())
    }
    ,
    e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(),
        t.touchObject = {},
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slideTrack.detach(),
        t.$list.detach(),
        t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        t.unslicked = !0,
        e || t.$slider.trigger("destroy", [t])
    }
    ,
    e.prototype.disableTransition = function(i) {
        var e = this
          , t = {};
        t[e.transitionType] = "",
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }),
        t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
        t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }),
        e && setTimeout(function() {
            t.disableTransition(i),
            e.call()
        }, t.options.speed))
    }
    ,
    e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i),
        e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"),
                e.autoPlay())
            }, 0)
        })
    }
    ,
    e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    e.prototype.getDotCount = function() {
        var i = this
          , e = 0
          , t = 0
          , o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow)
                ++o;
            else
                for (; e < i.slideCount; )
                    ++o,
                    e = t + i.options.slidesToScroll,
                    t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode)
            o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount; )
                ++o,
                e = t + i.options.slidesToScroll,
                t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else
            o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }
    ,
    e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this, r = 0;
        return n.slideOffset = 0,
        t = n.$slides.first().outerHeight(!0),
        !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
        s = -1,
        !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)),
        r = t * n.options.slidesToShow * s),
        n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1,
        r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
        r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth,
        r = (i + n.options.slidesToShow - n.slideCount) * t),
        n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0,
        r = 0),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0,
        n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
        e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r,
        !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        e += (n.$list.width() - o.outerWidth()) / 2)),
        e
    }
    ,
    e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }
    ,
    e.prototype.getNavigableIndexes = function() {
        var i, e = this, t = 0, o = 0, s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll,
        o = -1 * e.options.slidesToScroll,
        i = 2 * e.slideCount); t < i; )
            s.push(t),
            t = o + e.options.slidesToScroll,
            o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }
    ,
    e.prototype.getSlick = function() {
        return this
    }
    ,
    e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0,
        !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return e = n,
                !1
        }),
        Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }
    ,
    e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }
    ,
    e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && (t.paused = !1,
        t.autoPlay())
    }
    ,
    e.prototype.initADA = function() {
        var e = this
          , t = Math.ceil(e.slideCount / e.options.slidesToShow)
          , o = e.getNavigableIndexes().filter(function(i) {
            return i >= 0 && i < e.slideCount
        });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }),
            -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }),
        e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }),
            i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
            e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }
    ,
    e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide),
        i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide),
        !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler),
        i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }
    ,
    e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide),
        !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }
    ,
    e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler),
        e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler),
        e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
        i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition)
    }
    ,
    e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
        i.$nextArrow.show()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }
    ,
    e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this)
                  , t = i(this).attr("data-lazy")
                  , o = i(this).attr("data-srcset")
                  , s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                  , r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o),
                        s && e.attr("sizes", s)),
                        e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }
                ,
                r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, e, t])
                }
                ,
                r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        s = Math.ceil(o + n.options.slidesToShow),
        !0 === n.options.fade && (o > 0 && o--,
        s <= n.slideCount && s++)),
        t = n.$slider.find(".slick-slide").slice(o, s),
        "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)
                r < 0 && (r = n.slideCount - 1),
                t = (t = t.add(d.eq(r))).add(d.eq(l)),
                r--,
                l++;
        e(t),
        n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(),
        i.$slideTrack.css({
            opacity: 1
        }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }
    ,
    e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(),
        i.setPosition()
    }
    ,
    e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(),
        i.paused = !0
    }
    ,
    e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(),
        i.options.autoplay = !0,
        i.paused = !1,
        i.focussed = !1,
        i.interrupted = !1
    }
    ,
    e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
        t.animating = !1,
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility && (t.initADA(),
        t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }
    ,
    e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }
    ,
    e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(),
        o = t.attr("data-lazy"),
        s = t.attr("data-srcset"),
        n = t.attr("data-sizes") || l.$slider.attr("data-sizes"),
        (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s),
            n && t.attr("sizes", n)),
            t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === l.options.adaptiveHeight && l.setPosition(),
            l.$slider.trigger("lazyLoaded", [l, t, o]),
            l.progressiveLazyLoad()
        }
        ,
        r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            l.$slider.trigger("lazyLoadError", [l, t, o]),
            l.progressiveLazyLoad())
        }
        ,
        r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }
    ,
    e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow,
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        t = s.currentSlide,
        s.destroy(!0),
        i.extend(s, s.initials, {
            currentSlide: t
        }),
        s.init(),
        e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }
    ,
    e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this, n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1,
                n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0; )
                        s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1),
                        o--;
                    s.breakpoints.push(t),
                    s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }
    ,
    e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.setPosition(),
        e.focusHandler(),
        e.paused = !e.options.autoplay,
        e.autoPlay(),
        e.$slider.trigger("reInit", [e])
    }
    ,
    e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
        e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50))
    }
    ,
    e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i,
        o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
            return !1;
        o.unload(),
        !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    e.prototype.setCSS = function(i) {
        var e, t, o = this, s = {};
        !0 === o.options.rtl && (i = -i),
        e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        s[o.positionProp] = i,
        !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {},
        !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")",
        o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)",
        o.$slideTrack.css(s)))
    }
    ,
    e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
        !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })),
        i.listWidth = i.$list.width(),
        i.listHeight = i.$list.height(),
        !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
        i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
        i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }
    ,
    e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1,
            !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }),
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }
    ,
    e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this, l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0],
        l = arguments[1],
        n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0],
        s = arguments[1],
        l = arguments[2],
        "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")),
        "single" === n)
            r.options[o] = s;
        else if ("multiple" === n)
            i.each(o, function(i, e) {
                r.options[i] = e
            });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive))
                    r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0; )
                        r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1),
                        e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(),
        r.reinit())
    }
    ,
    e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
        i.$slider.trigger("setPosition", [i])
    }
    ,
    e.prototype.setProps = function() {
        var i = this
          , e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left",
        "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0),
        i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
        void 0 !== e.OTransform && (i.animType = "OTransform",
        i.transformType = "-o-transform",
        i.transitionType = "OTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.MozTransform && (i.animType = "MozTransform",
        i.transformType = "-moz-transform",
        i.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
        void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
        i.transformType = "-webkit-transform",
        i.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.msTransform && (i.animType = "msTransform",
        i.transformType = "-ms-transform",
        i.transitionType = "msTransition",
        void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform",
        i.transformType = "transform",
        i.transitionType = "transition"),
        i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }
    ,
    e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2),
            !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i,
            t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(i).addClass("slick-center")
        } else
            i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow,
            o = !0 === n.options.infinite ? n.options.slidesToShow + i : i,
            n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }
    ,
    e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite && !1 === s.options.fade && (t = null,
        s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow,
            e = s.slideCount; e > s.slideCount - o; e -= 1)
                t = e - 1,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1)
                t = e,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }
    ,
    e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(),
        e.interrupted = i
    }
    ,
    e.prototype.selectHandler = function(e) {
        var t = this
          , o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide")
          , s = parseInt(o.attr("data-slick-index"));
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }
    ,
    e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null, a = this;
        if (e = e || !1,
        !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i),
            o = i,
            d = a.getLeft(o),
            r = a.getLeft(a.currentSlide),
            a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft,
            !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else {
                if (a.options.autoplay && clearInterval(a.autoPlayTimer),
                s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o,
                a.animating = !0,
                a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                n = a.currentSlide,
                a.currentSlide = s,
                a.setSlideClasses(a.currentSlide),
                a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide),
                a.updateDots(),
                a.updateArrows(),
                !0 === a.options.fade)
                    return !0 !== t ? (a.fadeSlideOut(n),
                    a.fadeSlide(s, function() {
                        a.postSlide(s)
                    })) : a.postSlide(s),
                    void a.animateHeight();
                !0 !== t ? a.animateSlide(d, function() {
                    a.postSlide(s)
                }) : a.postSlide(s)
            }
    }
    ,
    e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
        i.$nextArrow.hide()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
        i.$slider.addClass("slick-loading")
    }
    ,
    e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX,
        e = s.touchObject.startY - s.touchObject.curY,
        t = Math.atan2(e, i),
        (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }
    ,
    e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1,
        o.swiping = !1,
        o.scrolling)
            return o.scrolling = !1,
            !1;
        if (o.interrupted = !1,
        o.shouldClick = !(o.touchObject.swipeLength > 10),
        void 0 === o.touchObject.curX)
            return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e),
            o.touchObject = {},
            o.$slider.trigger("swipe", [o, t]))
        } else
            o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
            o.touchObject = {})
    }
    ,
    e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
            }
    }
    ,
    e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null,
        !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide),
        l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX,
        l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY,
        l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))),
        r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))),
        !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0,
        !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
        t = l.swipeDirection(),
        void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0,
        i.preventDefault()),
        s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1),
        !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
        o = l.touchObject.swipeLength,
        l.touchObject.edgeHit = !1,
        !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction,
        l.touchObject.edgeHit = !0),
        !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s,
        !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
        !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null,
        !1) : void l.setCSS(l.swipeLeft))))
    }
    ,
    e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0,
        1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
            return t.touchObject = {},
            !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
        t.dragging = !0
    }
    ,
    e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit())
    }
    ,
    e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
        e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]),
        e.destroy()
    }
    ,
    e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }
    ,
    i.fn.slick = function() {
        var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i],s) : t = o[i].slick[s].apply(o[i].slick, n),
            void 0 !== t)
                return t;
        return o
    }
});
// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
!function(t,e,n,o){"use strict";function i(t,e){var o,i,a=[],s=0;t&&t.isDefaultPrevented()||(t.preventDefault(),e=t&&t.data?t.data.options:e||{},o=e.$target||n(t.currentTarget),i=o.attr("data-fancybox")||"",i?(a=e.selector?n(e.selector):t.data?t.data.items:[],a=a.length?a.filter('[data-fancybox="'+i+'"]'):n('[data-fancybox="'+i+'"]'),s=a.index(o),s<0&&(s=0)):a=[o],n.fancybox.open(a,e,s))}if(t.console=t.console||{info:function(t){}},n){if(n.fn.fancybox)return void console.info("fancyBox already initialized");var a={loop:!1,gutter:50,keyboard:!0,arrows:!0,infobar:!0,smallBtn:"auto",toolbar:"auto",buttons:["zoom","thumbs","close"],idleTime:3,protect:!1,modal:!1,image:{preload:!1},ajax:{settings:{data:{fancybox:!0}}},iframe:{tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',preload:!0,css:{},attr:{scrolling:"auto"}},defaultType:"image",animationEffect:"zoom",animationDuration:366,zoomOpacity:"auto",transitionEffect:"fade",transitionDuration:366,slideClass:"",baseClass:"",baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',spinnerTpl:'<div class="fancybox-loading"></div>',errorTpl:'<div class="fancybox-error"><p>{{ERROR}}</p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" /></svg></a>',zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" /></svg></button>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',smallBtn:'<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',arrowLeft:'<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path></svg></a>',arrowRight:'<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path></svg></a>'},parentEl:"body",autoFocus:!1,backFocus:!0,trapFocus:!0,fullScreen:{autoStart:!1},touch:{vertical:!0,momentum:!0},hash:null,media:{},slideShow:{autoStart:!1,speed:4e3},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"},wheel:"auto",onInit:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop,onActivate:n.noop,onDeactivate:n.noop,clickContent:function(t,e){return"image"===t.type&&"zoom"},clickSlide:"close",clickOutside:"close",dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1,mobile:{idleTime:!1,clickContent:function(t,e){return"image"===t.type&&"toggleControls"},clickSlide:function(t,e){return"image"===t.type?"toggleControls":"close"},dblclickContent:function(t,e){return"image"===t.type&&"zoom"},dblclickSlide:function(t,e){return"image"===t.type&&"zoom"}},lang:"en",i18n:{en:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",ERROR:"The requested content cannot be loaded. <br/> Please try again later.",PLAY_START:"Start slideshow",PLAY_STOP:"Pause slideshow",FULL_SCREEN:"Full screen",THUMBS:"Thumbnails",DOWNLOAD:"Download",SHARE:"Share",ZOOM:"Zoom"},de:{CLOSE:"Schliessen",NEXT:"Weiter",PREV:"Zurück",ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",PLAY_START:"Diaschau starten",PLAY_STOP:"Diaschau beenden",FULL_SCREEN:"Vollbild",THUMBS:"Vorschaubilder",DOWNLOAD:"Herunterladen",SHARE:"Teilen",ZOOM:"Maßstab"}}},s=n(t),r=n(e),c=0,l=function(t){return t&&t.hasOwnProperty&&t instanceof n},d=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),u=function(){var t,n=e.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in i)if(n.style[t]!==o)return i[t];return"transitionend"}(),f=function(t){return t&&t.length&&t[0].offsetHeight},p=function(t,e){var o=n.extend(!0,{},t,e);return n.each(e,function(t,e){n.isArray(e)&&(o[t]=e)}),o},h=function(t,o,i){var a=this;a.opts=p({index:i},n.fancybox.defaults),n.isPlainObject(o)&&(a.opts=p(a.opts,o)),n.fancybox.isMobile&&(a.opts=p(a.opts,a.opts.mobile)),a.id=a.opts.id||++c,a.currIndex=parseInt(a.opts.index,10)||0,a.prevIndex=null,a.prevPos=null,a.currPos=0,a.firstRun=!0,a.group=[],a.slides={},a.addContent(t),a.group.length&&(a.$lastFocus=n(e.activeElement).trigger("blur"),a.init())};n.extend(h.prototype,{init:function(){var i,a,s,r=this,c=r.group[r.currIndex],l=c.opts,d=n.fancybox.scrollbarWidth;n.fancybox.getInstance()||l.hideScrollbar===!1||(n("body").addClass("fancybox-active"),!n.fancybox.isMobile&&e.body.scrollHeight>t.innerHeight&&(d===o&&(i=n('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body"),d=n.fancybox.scrollbarWidth=i[0].offsetWidth-i[0].clientWidth,i.remove()),n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: '+d+"px; }</style>"),n("body").addClass("compensate-for-scrollbar"))),s="",n.each(l.buttons,function(t,e){s+=l.btnTpl[e]||""}),a=n(r.translate(r,l.baseTpl.replace("{{buttons}}",s).replace("{{arrows}}",l.btnTpl.arrowLeft+l.btnTpl.arrowRight))).attr("id","fancybox-container-"+r.id).addClass("fancybox-is-hidden").addClass(l.baseClass).data("FancyBox",r).appendTo(l.parentEl),r.$refs={container:a},["bg","inner","infobar","toolbar","stage","caption","navigation"].forEach(function(t){r.$refs[t]=a.find(".fancybox-"+t)}),r.trigger("onInit"),r.activate(),r.jumpTo(r.currIndex)},translate:function(t,e){var n=t.opts.i18n[t.opts.lang];return e.replace(/\{\{(\w+)\}\}/g,function(t,e){var i=n[e];return i===o?t:i})},addContent:function(t){var e,i=this,a=n.makeArray(t);n.each(a,function(t,e){var a,s,r,c,l,d={},u={};n.isPlainObject(e)?(d=e,u=e.opts||e):"object"===n.type(e)&&n(e).length?(a=n(e),u=a.data()||{},u=n.extend(!0,{},u,u.options),u.$orig=a,d.src=i.opts.src||u.src||a.attr("href"),d.type||d.src||(d.type="inline",d.src=e)):d={type:"html",src:e+""},d.opts=n.extend(!0,{},i.opts,u),n.isArray(u.buttons)&&(d.opts.buttons=u.buttons),s=d.type||d.opts.type,c=d.src||"",!s&&c&&((r=c.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i))?(s="video",d.opts.videoFormat||(d.opts.videoFormat="video/"+("ogv"===r[1]?"ogg":r[1]))):c.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?s="image":c.match(/\.(pdf)((\?|#).*)?$/i)?s="iframe":"#"===c.charAt(0)&&(s="inline")),s?d.type=s:i.trigger("objectNeedsType",d),d.contentType||(d.contentType=n.inArray(d.type,["html","inline","ajax"])>-1?"html":d.type),d.index=i.group.length,"auto"==d.opts.smallBtn&&(d.opts.smallBtn=n.inArray(d.type,["html","inline","ajax"])>-1),"auto"===d.opts.toolbar&&(d.opts.toolbar=!d.opts.smallBtn),d.opts.$trigger&&d.index===i.opts.index&&(d.opts.$thumb=d.opts.$trigger.find("img:first")),d.opts.$thumb&&d.opts.$thumb.length||!d.opts.$orig||(d.opts.$thumb=d.opts.$orig.find("img:first")),"function"===n.type(d.opts.caption)&&(d.opts.caption=d.opts.caption.apply(e,[i,d])),"function"===n.type(i.opts.caption)&&(d.opts.caption=i.opts.caption.apply(e,[i,d])),d.opts.caption instanceof n||(d.opts.caption=d.opts.caption===o?"":d.opts.caption+""),"ajax"===d.type&&(l=c.split(/\s+/,2),l.length>1&&(d.src=l.shift(),d.opts.filter=l.shift())),d.opts.modal&&(d.opts=n.extend(!0,d.opts,{infobar:0,toolbar:0,smallBtn:0,keyboard:0,slideShow:0,fullScreen:0,thumbs:0,touch:0,clickContent:!1,clickSlide:!1,clickOutside:!1,dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1})),i.group.push(d)}),Object.keys(i.slides).length&&(i.updateControls(),e=i.Thumbs,e&&e.isActive&&(e.create(),e.focus()))},addEvents:function(){var o=this;o.removeEvents(),o.$refs.container.on("click.fb-close","[data-fancybox-close]",function(t){t.stopPropagation(),t.preventDefault(),o.close(t)}).on("touchstart.fb-prev click.fb-prev","[data-fancybox-prev]",function(t){t.stopPropagation(),t.preventDefault(),o.previous()}).on("touchstart.fb-next click.fb-next","[data-fancybox-next]",function(t){t.stopPropagation(),t.preventDefault(),o.next()}).on("click.fb","[data-fancybox-zoom]",function(t){o[o.isScaledDown()?"scaleToActual":"scaleToFit"]()}),s.on("orientationchange.fb resize.fb",function(t){t&&t.originalEvent&&"resize"===t.originalEvent.type?d(function(){o.update()}):(o.$refs.stage.hide(),setTimeout(function(){o.$refs.stage.show(),o.update()},n.fancybox.isMobile?600:250))}),r.on("focusin.fb",function(t){var o=n.fancybox?n.fancybox.getInstance():null;o.isClosing||!o.current||!o.current.opts.trapFocus||n(t.target).hasClass("fancybox-container")||n(t.target).is(e)||o&&"fixed"!==n(t.target).css("position")&&!o.$refs.container.has(t.target).length&&(t.stopPropagation(),o.focus())}),r.on("keydown.fb",function(t){var e=o.current,i=t.keyCode||t.which;if(e&&e.opts.keyboard&&!(t.ctrlKey||t.altKey||t.shiftKey||n(t.target).is("input")||n(t.target).is("textarea")))return 8===i||27===i?(t.preventDefault(),void o.close(t)):37===i||38===i?(t.preventDefault(),void o.previous()):39===i||40===i?(t.preventDefault(),void o.next()):void o.trigger("afterKeydown",t,i)}),o.group[o.currIndex].opts.idleTime&&(o.idleSecondsCounter=0,r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",function(t){o.idleSecondsCounter=0,o.isIdle&&o.showControls(),o.isIdle=!1}),o.idleInterval=t.setInterval(function(){o.idleSecondsCounter++,o.idleSecondsCounter>=o.group[o.currIndex].opts.idleTime&&!o.isDragging&&(o.isIdle=!0,o.idleSecondsCounter=0,o.hideControls())},1e3))},removeEvents:function(){var e=this;s.off("orientationchange.fb resize.fb"),r.off("focusin.fb keydown.fb .fb-idle"),this.$refs.container.off(".fb-close .fb-prev .fb-next"),e.idleInterval&&(t.clearInterval(e.idleInterval),e.idleInterval=null)},previous:function(t){return this.jumpTo(this.currPos-1,t)},next:function(t){return this.jumpTo(this.currPos+1,t)},jumpTo:function(t,e){var i,a,s,r,c,l,d,u=this,p=u.group.length;if(!(u.isDragging||u.isClosing||u.isAnimating&&u.firstRun)){if(t=parseInt(t,10),a=u.current?u.current.opts.loop:u.opts.loop,!a&&(t<0||t>=p))return!1;if(i=u.firstRun=!Object.keys(u.slides).length,!(p<2&&!i&&u.isDragging)){if(r=u.current,u.prevIndex=u.currIndex,u.prevPos=u.currPos,s=u.createSlide(t),p>1&&((a||s.index>0)&&u.createSlide(t-1),(a||s.index<p-1)&&u.createSlide(t+1)),u.current=s,u.currIndex=s.index,u.currPos=s.pos,u.trigger("beforeShow",i),u.updateControls(),l=n.fancybox.getTranslate(s.$slide),s.isMoved=(0!==l.left||0!==l.top)&&!s.$slide.hasClass("fancybox-animated"),s.forcedDuration=o,n.isNumeric(e)?s.forcedDuration=e:e=s.opts[i?"animationDuration":"transitionDuration"],e=parseInt(e,10),i)return s.opts.animationEffect&&e&&u.$refs.container.css("transition-duration",e+"ms"),u.$refs.container.removeClass("fancybox-is-hidden"),f(u.$refs.container),u.$refs.container.addClass("fancybox-is-open"),f(u.$refs.container),s.$slide.addClass("fancybox-slide--previous"),u.loadSlide(s),s.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current"),void u.preload("image");n.each(u.slides,function(t,e){n.fancybox.stop(e.$slide)}),s.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"),s.isMoved?(c=Math.round(s.$slide.width()),n.each(u.slides,function(t,o){var i=o.pos-s.pos;n.fancybox.animate(o.$slide,{top:0,left:i*c+i*o.opts.gutter},e,function(){o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"),o.pos===u.currPos&&(s.isMoved=!1,u.complete())})})):u.$refs.stage.children().removeAttr("style"),s.isLoaded?u.revealContent(s):u.loadSlide(s),u.preload("image"),r.pos!==s.pos&&(d="fancybox-slide--"+(r.pos>s.pos?"next":"previous"),r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"),r.isComplete=!1,e&&(s.isMoved||s.opts.transitionEffect)&&(s.isMoved?r.$slide.addClass(d):(d="fancybox-animated "+d+" fancybox-fx-"+s.opts.transitionEffect,n.fancybox.animate(r.$slide,d,e,function(){r.$slide.removeClass(d).removeAttr("style")}))))}}},createSlide:function(t){var e,o,i=this;return o=t%i.group.length,o=o<0?i.group.length+o:o,!i.slides[t]&&i.group[o]&&(e=n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage),i.slides[t]=n.extend(!0,{},i.group[o],{pos:t,$slide:e,isLoaded:!1}),i.updateSlide(i.slides[t])),i.slides[t]},scaleToActual:function(t,e,i){var a,s,r,c,l,d=this,u=d.current,f=u.$content,p=n.fancybox.getTranslate(u.$slide).width,h=n.fancybox.getTranslate(u.$slide).height,g=u.width,b=u.height;!d.isAnimating&&f&&"image"==u.type&&u.isLoaded&&!u.hasError&&(n.fancybox.stop(f),d.isAnimating=!0,t=t===o?.5*p:t,e=e===o?.5*h:e,a=n.fancybox.getTranslate(f),a.top-=n.fancybox.getTranslate(u.$slide).top,a.left-=n.fancybox.getTranslate(u.$slide).left,c=g/a.width,l=b/a.height,s=.5*p-.5*g,r=.5*h-.5*b,g>p&&(s=a.left*c-(t*c-t),s>0&&(s=0),s<p-g&&(s=p-g)),b>h&&(r=a.top*l-(e*l-e),r>0&&(r=0),r<h-b&&(r=h-b)),d.updateCursor(g,b),n.fancybox.animate(f,{top:r,left:s,scaleX:c,scaleY:l},i||330,function(){d.isAnimating=!1}),d.SlideShow&&d.SlideShow.isActive&&d.SlideShow.stop())},scaleToFit:function(t){var e,o=this,i=o.current,a=i.$content;!o.isAnimating&&a&&"image"==i.type&&i.isLoaded&&!i.hasError&&(n.fancybox.stop(a),o.isAnimating=!0,e=o.getFitPos(i),o.updateCursor(e.width,e.height),n.fancybox.animate(a,{top:e.top,left:e.left,scaleX:e.width/a.width(),scaleY:e.height/a.height()},t||330,function(){o.isAnimating=!1}))},getFitPos:function(t){var e,n,o,i,a,s=this,r=t.$content,c=t.width||t.opts.width,l=t.height||t.opts.height,d={};return!!(t.isLoaded&&r&&r.length)&&(i={top:parseInt(t.$slide.css("paddingTop"),10),right:parseInt(t.$slide.css("paddingRight"),10),bottom:parseInt(t.$slide.css("paddingBottom"),10),left:parseInt(t.$slide.css("paddingLeft"),10)},e=parseInt(s.$refs.stage.width(),10)-(i.left+i.right),n=parseInt(s.$refs.stage.height(),10)-(i.top+i.bottom),c&&l||(c=e,l=n),o=Math.min(1,e/c,n/l),c=Math.floor(o*c),l=Math.floor(o*l),"image"===t.type?(d.top=Math.floor(.5*(n-l))+i.top,d.left=Math.floor(.5*(e-c))+i.left):"video"===t.contentType&&(a=t.opts.width&&t.opts.height?c/l:t.opts.ratio||16/9,l>c/a?l=c/a:c>l*a&&(c=l*a)),d.width=c,d.height=l,d)},update:function(){var t=this;n.each(t.slides,function(e,n){t.updateSlide(n)})},updateSlide:function(t,e){var o=this,i=t&&t.$content,a=t.width||t.opts.width,s=t.height||t.opts.height;i&&(a||s||"video"===t.contentType)&&!t.hasError&&(n.fancybox.stop(i),n.fancybox.setTranslate(i,o.getFitPos(t)),t.pos===o.currPos&&(o.isAnimating=!1,o.updateCursor())),t.$slide.trigger("refresh"),o.$refs.toolbar.toggleClass("compensate-for-scrollbar",t.$slide.get(0).scrollHeight>t.$slide.get(0).clientHeight),o.trigger("onUpdate",t)},centerSlide:function(t,e){var i,a,s=this;s.current&&(i=Math.round(t.$slide.width()),a=t.pos-s.current.pos,n.fancybox.animate(t.$slide,{top:0,left:a*i+a*t.opts.gutter,opacity:1},e===o?0:e,null,!1))},updateCursor:function(t,e){var o,i=this,a=i.current,s=i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");a&&!i.isClosing&&(o=i.isZoomable(),s.toggleClass("fancybox-is-zoomable",o),n("[data-fancybox-zoom]").prop("disabled",!o),o&&("zoom"===a.opts.clickContent||n.isFunction(a.opts.clickContent)&&"zoom"===a.opts.clickContent(a))?i.isScaledDown(t,e)?s.addClass("fancybox-can-zoomIn"):a.opts.touch?s.addClass("fancybox-can-drag"):s.addClass("fancybox-can-zoomOut"):a.opts.touch&&"video"!==a.contentType&&s.addClass("fancybox-can-drag"))},isZoomable:function(){var t,e=this,n=e.current;if(n&&!e.isClosing&&"image"===n.type&&!n.hasError){if(!n.isLoaded)return!0;if(t=e.getFitPos(n),n.width>t.width||n.height>t.height)return!0}return!1},isScaledDown:function(t,e){var i=this,a=!1,s=i.current,r=s.$content;return t!==o&&e!==o?a=t<s.width&&e<s.height:r&&(a=n.fancybox.getTranslate(r),a=a.width<s.width&&a.height<s.height),a},canPan:function(){var t,e=this,n=!1,o=e.current;return"image"===o.type&&(t=o.$content)&&!o.hasError&&(n=e.getFitPos(o),n=Math.abs(t.width()-n.width)>1||Math.abs(t.height()-n.height)>1),n},loadSlide:function(t){var e,o,i,a=this;if(!t.isLoading&&!t.isLoaded){switch(t.isLoading=!0,a.trigger("beforeLoad",t),e=t.type,o=t.$slide,o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),e){case"image":a.setImage(t);break;case"iframe":a.setIframe(t);break;case"html":a.setContent(t,t.src||t.content);break;case"video":a.setContent(t,'<video class="fancybox-video" controls controlsList="nodownload"><source src="'+t.src+'" type="'+t.opts.videoFormat+"\">Your browser doesn't support HTML5 video</video");break;case"inline":n(t.src).length?a.setContent(t,n(t.src)):a.setError(t);break;case"ajax":a.showLoading(t),i=n.ajax(n.extend({},t.opts.ajax.settings,{url:t.src,success:function(e,n){"success"===n&&a.setContent(t,e)},error:function(e,n){e&&"abort"!==n&&a.setError(t)}})),o.one("onReset",function(){i.abort()});break;default:a.setError(t)}return!0}},setImage:function(e){var o,i,a,s,r,c=this,l=e.opts.srcset||e.opts.image.srcset;if(e.timouts=setTimeout(function(){var t=e.$image;!e.isLoading||t&&t[0].complete||e.hasError||c.showLoading(e)},350),l){s=t.devicePixelRatio||1,r=t.innerWidth*s,a=l.split(",").map(function(t){var e={};return t.trim().split(/\s+/).forEach(function(t,n){var o=parseInt(t.substring(0,t.length-1),10);return 0===n?e.url=t:void(o&&(e.value=o,e.postfix=t[t.length-1]))}),e}),a.sort(function(t,e){return t.value-e.value});for(var d=0;d<a.length;d++){var u=a[d];if("w"===u.postfix&&u.value>=r||"x"===u.postfix&&u.value>=s){i=u;break}}!i&&a.length&&(i=a[a.length-1]),i&&(e.src=i.url,e.width&&e.height&&"w"==i.postfix&&(e.height=e.width/e.height*i.value,e.width=i.value),e.opts.srcset=l)}e.$content=n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")),o=e.opts.thumb||!(!e.opts.$thumb||!e.opts.$thumb.length)&&e.opts.$thumb.attr("src"),e.opts.preload!==!1&&e.opts.width&&e.opts.height&&o&&(e.width=e.opts.width,e.height=e.opts.height,e.$ghost=n("<img />").one("error",function(){n(this).remove(),e.$ghost=null}).one("load",function(){c.afterLoad(e)}).addClass("fancybox-image").appendTo(e.$content).attr("src",o)),c.setBigImage(e)},setBigImage:function(t){var e=this,o=n("<img />");t.$image=o.one("error",function(){e.setError(t)}).one("load",function(){var n;t.$ghost||(e.resolveImageSlideSize(t,this.naturalWidth,this.naturalHeight),e.afterLoad(t)),t.timouts&&(clearTimeout(t.timouts),t.timouts=null),e.isClosing||(t.opts.srcset&&(n=t.opts.sizes,n&&"auto"!==n||(n=(t.width/t.height>1&&s.width()/s.height()>1?"100":Math.round(t.width/t.height*100))+"vw"),o.attr("sizes",n).attr("srcset",t.opts.srcset)),t.$ghost&&setTimeout(function(){t.$ghost&&!e.isClosing&&t.$ghost.hide()},Math.min(300,Math.max(1e3,t.height/1600))),e.hideLoading(t))}).addClass("fancybox-image").attr("src",t.src).appendTo(t.$content),(o[0].complete||"complete"==o[0].readyState)&&o[0].naturalWidth&&o[0].naturalHeight?o.trigger("load"):o[0].error&&o.trigger("error")},resolveImageSlideSize:function(t,e,n){var o=parseInt(t.opts.width,10),i=parseInt(t.opts.height,10);t.width=e,t.height=n,o>0&&(t.width=o,t.height=Math.floor(o*n/e)),i>0&&(t.width=Math.floor(i*e/n),t.height=i)},setIframe:function(t){var e,i=this,a=t.opts.iframe,s=t.$slide;t.$content=n('<div class="fancybox-content'+(a.preload?" fancybox-is-hidden":"")+'"></div>').css(a.css).appendTo(s),s.addClass("fancybox-slide--"+t.contentType),t.$iframe=e=n(a.tpl.replace(/\{rnd\}/g,(new Date).getTime())).attr(a.attr).appendTo(t.$content),a.preload?(i.showLoading(t),e.on("load.fb error.fb",function(e){this.isReady=1,t.$slide.trigger("refresh"),i.afterLoad(t)}),s.on("refresh.fb",function(){var n,i,s=t.$content,r=a.css.width,c=a.css.height;if(1===e[0].isReady){try{n=e.contents(),i=n.find("body")}catch(t){}i&&i.length&&i.children().length&&(s.css({width:"",height:""}),r===o&&(r=Math.ceil(Math.max(i[0].clientWidth,i.outerWidth(!0)))),r&&s.width(r),c===o&&(c=Math.ceil(Math.max(i[0].clientHeight,i.outerHeight(!0)))),c&&s.height(c)),s.removeClass("fancybox-is-hidden")}})):this.afterLoad(t),e.attr("src",t.src),s.one("onReset",function(){try{n(this).find("iframe").hide().unbind().attr("src","//about:blank")}catch(t){}n(this).off("refresh.fb").empty(),t.isLoaded=!1})},setContent:function(t,e){var o=this;o.isClosing||(o.hideLoading(t),t.$content&&n.fancybox.stop(t.$content),t.$slide.empty(),l(e)&&e.parent().length?(e.parent().parent(".fancybox-slide--inline").trigger("onReset"),t.$placeholder=n("<div>").hide().insertAfter(e),e.css("display","inline-block")):t.hasError||("string"===n.type(e)&&(e=n("<div>").append(n.trim(e)).contents(),3===e[0].nodeType&&(e=n("<div>").html(e))),t.opts.filter&&(e=n("<div>").html(e).find(t.opts.filter))),t.$slide.one("onReset",function(){n(this).find("video,audio").trigger("pause"),t.$placeholder&&(t.$placeholder.after(e.hide()).remove(),t.$placeholder=null),t.$smallBtn&&(t.$smallBtn.remove(),t.$smallBtn=null),t.hasError||(n(this).empty(),t.isLoaded=!1)}),n(e).appendTo(t.$slide),n(e).is("video,audio")&&(n(e).addClass("fancybox-video"),n(e).wrap("<div></div>"),t.contentType="video",t.opts.width=t.opts.width||n(e).attr("width"),t.opts.height=t.opts.height||n(e).attr("height")),t.$content=t.$slide.children().filter("div,form,main,video,audio").first().addClass("fancybox-content"),t.$slide.addClass("fancybox-slide--"+t.contentType),this.afterLoad(t))},setError:function(t){t.hasError=!0,t.$slide.trigger("onReset").removeClass("fancybox-slide--"+t.contentType).addClass("fancybox-slide--error"),t.contentType="html",this.setContent(t,this.translate(t,t.opts.errorTpl)),t.pos===this.currPos&&(this.isAnimating=!1)},showLoading:function(t){var e=this;t=t||e.current,t&&!t.$spinner&&(t.$spinner=n(e.translate(e,e.opts.spinnerTpl)).appendTo(t.$slide))},hideLoading:function(t){var e=this;t=t||e.current,t&&t.$spinner&&(t.$spinner.remove(),delete t.$spinner)},afterLoad:function(t){var e=this;e.isClosing||(t.isLoading=!1,t.isLoaded=!0,e.trigger("afterLoad",t),e.hideLoading(t),t.pos===e.currPos&&e.updateCursor(),!t.opts.smallBtn||t.$smallBtn&&t.$smallBtn.length||(t.$smallBtn=n(e.translate(t,t.opts.btnTpl.smallBtn)).prependTo(t.$content)),t.opts.protect&&t.$content&&!t.hasError&&(t.$content.on("contextmenu.fb",function(t){return 2==t.button&&t.preventDefault(),!0}),"image"===t.type&&n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),e.revealContent(t))},revealContent:function(t){var e,i,a,s,r=this,c=t.$slide,l=!1,d=!1;return e=t.opts[r.firstRun?"animationEffect":"transitionEffect"],a=t.opts[r.firstRun?"animationDuration":"transitionDuration"],a=parseInt(t.forcedDuration===o?a:t.forcedDuration,10),t.pos===r.currPos&&(t.isComplete?e=!1:r.isAnimating=!0),!t.isMoved&&t.pos===r.currPos&&a||(e=!1),"zoom"===e&&(t.pos===r.currPos&&a&&"image"===t.type&&!t.hasError&&(d=r.getThumbPos(t))?l=r.getFitPos(t):e="fade"),"zoom"===e?(l.scaleX=l.width/d.width,l.scaleY=l.height/d.height,s=t.opts.zoomOpacity,"auto"==s&&(s=Math.abs(t.width/t.height-d.width/d.height)>.1),s&&(d.opacity=.1,l.opacity=1),n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"),d),f(t.$content),void n.fancybox.animate(t.$content,l,a,function(){r.isAnimating=!1,r.complete()})):(r.updateSlide(t),e?(n.fancybox.stop(c),i="fancybox-animated fancybox-slide--"+(t.pos>=r.prevPos?"next":"previous")+" fancybox-fx-"+e,c.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i),t.$content.removeClass("fancybox-is-hidden"),f(c),void n.fancybox.animate(c,"fancybox-slide--current",a,function(e){c.removeClass(i).removeAttr("style"),t.pos===r.currPos&&r.complete()},!0)):(f(c),t.$content.removeClass("fancybox-is-hidden"),void(t.pos===r.currPos&&r.complete())))},getThumbPos:function(o){var i,a=this,s=!1,r=o.opts.$thumb,c=r&&r.length&&r[0].ownerDocument===e?r.offset():0,l=function(e){for(var o,i=e[0],a=i.getBoundingClientRect(),s=[];null!==i.parentElement;)"hidden"!==n(i.parentElement).css("overflow")&&"auto"!==n(i.parentElement).css("overflow")||s.push(i.parentElement.getBoundingClientRect()),i=i.parentElement;return o=s.every(function(t){var e=Math.min(a.right,t.right)-Math.max(a.left,t.left),n=Math.min(a.bottom,t.bottom)-Math.max(a.top,t.top);return e>0&&n>0}),o&&a.bottom>0&&a.right>0&&a.left<n(t).width()&&a.top<n(t).height()};return c&&l(r)&&(i=a.$refs.stage.offset(),s={top:c.top-i.top+parseFloat(r.css("border-top-width")||0),left:c.left-i.left+parseFloat(r.css("border-left-width")||0),width:r.width(),height:r.height(),scaleX:1,scaleY:1}),s},complete:function(){var t=this,o=t.current,i={};!o.isMoved&&o.isLoaded&&(o.isComplete||(o.isComplete=!0,o.$slide.siblings().trigger("onReset"),t.preload("inline"),f(o.$slide),o.$slide.addClass("fancybox-slide--complete"),n.each(t.slides,function(e,o){o.pos>=t.currPos-1&&o.pos<=t.currPos+1?i[o.pos]=o:o&&(n.fancybox.stop(o.$slide),o.$slide.off().remove())}),t.slides=i),t.isAnimating=!1,t.updateCursor(),t.trigger("afterShow"),o.$slide.find("video,audio").filter(":visible:first").trigger("play"),(n(e.activeElement).is("[disabled]")||o.opts.autoFocus&&"image"!=o.type&&"iframe"!==o.type)&&t.focus())},preload:function(t){var e=this,n=e.slides[e.currPos+1],o=e.slides[e.currPos-1];n&&n.type===t&&e.loadSlide(n),o&&o.type===t&&e.loadSlide(o)},focus:function(){var t,e=this.current;this.isClosing||e&&e.isComplete&&e.$content&&(t=e.$content.find("input[autofocus]:enabled:visible:first"),t.length||(t=e.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first")),t=t&&t.length?t:e.$content,t.trigger("focus"))},activate:function(){var t=this;n(".fancybox-container").each(function(){var e=n(this).data("FancyBox");e&&e.id!==t.id&&!e.isClosing&&(e.trigger("onDeactivate"),e.removeEvents(),e.isVisible=!1)}),t.isVisible=!0,(t.current||t.isIdle)&&(t.update(),t.updateControls()),t.trigger("onActivate"),t.addEvents()},close:function(t,e){var o,i,a,s,r,c,l,p=this,h=p.current,g=function(){p.cleanUp(t)};return!p.isClosing&&(p.isClosing=!0,p.trigger("beforeClose",t)===!1?(p.isClosing=!1,d(function(){p.update()}),!1):(p.removeEvents(),h.timouts&&clearTimeout(h.timouts),a=h.$content,o=h.opts.animationEffect,i=n.isNumeric(e)?e:o?h.opts.animationDuration:0,h.$slide.off(u).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),h.$slide.siblings().trigger("onReset").remove(),i&&p.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"),p.hideLoading(h),p.hideControls(),p.updateCursor(),"zoom"!==o||t!==!0&&a&&i&&"image"===h.type&&!h.hasError&&(l=p.getThumbPos(h))||(o="fade"),"zoom"===o?(n.fancybox.stop(a),s=n.fancybox.getTranslate(a),c={top:s.top,left:s.left,scaleX:s.width/l.width,scaleY:s.height/l.height,width:l.width,height:l.height},r=h.opts.zoomOpacity,"auto"==r&&(r=Math.abs(h.width/h.height-l.width/l.height)>.1),r&&(l.opacity=0),n.fancybox.setTranslate(a,c),f(a),n.fancybox.animate(a,l,i,g),!0):(o&&i?t===!0?setTimeout(g,i):n.fancybox.animate(h.$slide.removeClass("fancybox-slide--current"),"fancybox-animated fancybox-slide--previous fancybox-fx-"+o,i,g):g(),!0)))},cleanUp:function(t){var e,o=this,i=n("body");o.current.$slide.trigger("onReset"),o.$refs.container.empty().remove(),o.trigger("afterClose",t),o.$lastFocus&&o.current.opts.backFocus&&o.$lastFocus.trigger("focus"),o.current=null,e=n.fancybox.getInstance(),e?e.activate():(i.removeClass("fancybox-active compensate-for-scrollbar"),n("#fancybox-style-noscroll").remove())},trigger:function(t,e){var o,i=Array.prototype.slice.call(arguments,1),a=this,s=e&&e.opts?e:a.current;return s?i.unshift(s):s=a,i.unshift(a),n.isFunction(s.opts[t])&&(o=s.opts[t].apply(s,i)),o===!1?o:void("afterClose"!==t&&a.$refs?a.$refs.container.trigger(t+".fb",i):r.trigger(t+".fb",i))},updateControls:function(t){var e=this,n=e.current,o=n.index,i=n.opts.caption,a=e.$refs.container,s=e.$refs.caption;n.$slide.trigger("refresh"),e.$caption=i&&i.length?s.html(i):null,e.isHiddenControls||e.isIdle||e.showControls(),a.find("[data-fancybox-count]").html(e.group.length),a.find("[data-fancybox-index]").html(o+1),a.find("[data-fancybox-prev]").toggleClass("disabled",!n.opts.loop&&o<=0),a.find("[data-fancybox-next]").toggleClass("disabled",!n.opts.loop&&o>=e.group.length-1),"image"===n.type?a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href",n.opts.image.src||n.src).show():n.opts.toolbar&&a.find("[data-fancybox-download],[data-fancybox-zoom]").hide()},hideControls:function(){this.isHiddenControls=!0,this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")},showControls:function(){var t=this,e=t.current?t.current.opts:t.opts,n=t.$refs.container;t.isHiddenControls=!1,t.idleSecondsCounter=0,n.toggleClass("fancybox-show-toolbar",!(!e.toolbar||!e.buttons)).toggleClass("fancybox-show-infobar",!!(e.infobar&&t.group.length>1)).toggleClass("fancybox-show-nav",!!(e.arrows&&t.group.length>1)).toggleClass("fancybox-is-modal",!!e.modal),t.$caption?n.addClass("fancybox-show-caption "):n.removeClass("fancybox-show-caption")},toggleControls:function(){this.isHiddenControls?this.showControls():this.hideControls()}}),n.fancybox={version:"3.3.5",defaults:a,getInstance:function(t){var e=n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),o=Array.prototype.slice.call(arguments,1);return e instanceof h&&("string"===n.type(t)?e[t].apply(e,o):"function"===n.type(t)&&t.apply(e,o),e)},open:function(t,e,n){return new h(t,e,n)},close:function(t){var e=this.getInstance();e&&(e.close(),t===!0&&this.close())},destroy:function(){this.close(!0),r.add("body").off("click.fb-start","**")},isMobile:e.createTouch!==o&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),use3d:function(){var n=e.createElement("div");return t.getComputedStyle&&t.getComputedStyle(n)&&t.getComputedStyle(n).getPropertyValue("transform")&&!(e.documentMode&&e.documentMode<11)}(),getTranslate:function(t){var e;return!(!t||!t.length)&&(e=t[0].getBoundingClientRect(),{top:e.top||0,left:e.left||0,width:e.width,height:e.height,opacity:parseFloat(t.css("opacity"))})},setTranslate:function(t,e){var n="",i={};if(t&&e)return e.left===o&&e.top===o||(n=(e.left===o?t.position().left:e.left)+"px, "+(e.top===o?t.position().top:e.top)+"px",n=this.use3d?"translate3d("+n+", 0px)":"translate("+n+")"),e.scaleX!==o&&e.scaleY!==o&&(n=(n.length?n+" ":"")+"scale("+e.scaleX+", "+e.scaleY+")"),n.length&&(i.transform=n),e.opacity!==o&&(i.opacity=e.opacity),e.width!==o&&(i.width=e.width),e.height!==o&&(i.height=e.height),t.css(i)},animate:function(t,e,i,a,s){var r=!1;n.isFunction(i)&&(a=i,i=null),n.isPlainObject(e)||t.removeAttr("style"),n.fancybox.stop(t),t.on(u,function(o){(!o||!o.originalEvent||t.is(o.originalEvent.target)&&"z-index"!=o.originalEvent.propertyName)&&(n.fancybox.stop(t),r&&n.fancybox.setTranslate(t,r),
n.isPlainObject(e)?s===!1&&t.removeAttr("style"):s!==!0&&t.removeClass(e),n.isFunction(a)&&a(o))}),n.isNumeric(i)&&t.css("transition-duration",i+"ms"),n.isPlainObject(e)?(e.scaleX!==o&&e.scaleY!==o&&(r=n.extend({},e,{width:t.width()*e.scaleX,height:t.height()*e.scaleY,scaleX:1,scaleY:1}),delete e.width,delete e.height,t.parent().hasClass("fancybox-slide--image")&&t.parent().addClass("fancybox-is-scaling")),n.fancybox.setTranslate(t,e)):t.addClass(e),t.data("timer",setTimeout(function(){t.trigger("transitionend")},i+16))},stop:function(t){t&&t.length&&(clearTimeout(t.data("timer")),t.off("transitionend").css("transition-duration",""),t.parent().removeClass("fancybox-is-scaling"))}},n.fn.fancybox=function(t){var e;return t=t||{},e=t.selector||!1,e?n("body").off("click.fb-start",e).on("click.fb-start",e,{options:t},i):this.off("click.fb-start").on("click.fb-start",{items:this,options:t},i),this},r.on("click.fb-start","[data-fancybox]",i),r.on("click.fb-start","[data-trigger]",function(t){i(t,{$target:n('[data-fancybox="'+n(t.currentTarget).attr("data-trigger")+'"]').eq(n(t.currentTarget).attr("data-index")||0),$trigger:n(this)})})}}(window,document,window.jQuery||jQuery),function(t){"use strict";var e=function(e,n,o){if(e)return o=o||"","object"===t.type(o)&&(o=t.param(o,!0)),t.each(n,function(t,n){e=e.replace("$"+t,n||"")}),o.length&&(e+=(e.indexOf("?")>0?"&":"?")+o),e},n={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},paramPlace:8,type:"iframe",url:"//www.youtube.com/embed/$4",thumb:"//img.youtube.com/vi/$4/hqdefault.jpg"},vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1,api:1},paramPlace:3,type:"iframe",url:"//player.vimeo.com/video/$2"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/?ll="+(t[9]?t[9]+"&z="+Math.floor(t[10])+(t[12]?t[12].replace(/^\//,"&"):""):t[12]+"").replace(/\?/,"&")+"&output="+(t[12]&&t[12].indexOf("layer=c")>0?"svembed":"embed")}},gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/maps?q="+t[5].replace("query=","q=").replace("api=1","")+"&output=embed"}}};t(document).on("objectNeedsType.fb",function(o,i,a){var s,r,c,l,d,u,f,p=a.src||"",h=!1;s=t.extend(!0,{},n,a.opts.media),t.each(s,function(n,o){if(c=p.match(o.matcher)){if(h=o.type,f=n,u={},o.paramPlace&&c[o.paramPlace]){d=c[o.paramPlace],"?"==d[0]&&(d=d.substring(1)),d=d.split("&");for(var i=0;i<d.length;++i){var s=d[i].split("=",2);2==s.length&&(u[s[0]]=decodeURIComponent(s[1].replace(/\+/g," ")))}}return l=t.extend(!0,{},o.params,a.opts[n],u),p="function"===t.type(o.url)?o.url.call(this,c,l,a):e(o.url,c,l),r="function"===t.type(o.thumb)?o.thumb.call(this,c,l,a):e(o.thumb,c),"youtube"===n?p=p.replace(/&t=((\d+)m)?(\d+)s/,function(t,e,n,o){return"&start="+((n?60*parseInt(n,10):0)+parseInt(o,10))}):"vimeo"===n&&(p=p.replace("&%23","#")),!1}}),h?(a.opts.thumb||a.opts.$thumb&&a.opts.$thumb.length||(a.opts.thumb=r),"iframe"===h&&(a.opts=t.extend(!0,a.opts,{iframe:{preload:!1,attr:{scrolling:"no"}}})),t.extend(a,{type:h,src:p,origSrc:a.src,contentSource:f,contentType:"image"===h?"image":"gmap_place"==f||"gmap_search"==f?"map":"video"})):p&&(a.type=a.opts.defaultType)})}(window.jQuery||jQuery),function(t,e,n){"use strict";var o=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),i=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),a=function(e){var n=[];e=e.originalEvent||e||t.e,e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var o in e)e[o].pageX?n.push({x:e[o].pageX,y:e[o].pageY}):e[o].clientX&&n.push({x:e[o].clientX,y:e[o].clientY});return n},s=function(t,e,n){return e&&t?"x"===n?t.x-e.x:"y"===n?t.y-e.y:Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)):0},r=function(t){if(t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio')||n.isFunction(t.get(0).onclick)||t.data("selectable"))return!0;for(var e=0,o=t[0].attributes,i=o.length;e<i;e++)if("data-fancybox-"===o[e].nodeName.substr(0,14))return!0;return!1},c=function(e){var n=t.getComputedStyle(e)["overflow-y"],o=t.getComputedStyle(e)["overflow-x"],i=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,a=("scroll"===o||"auto"===o)&&e.scrollWidth>e.clientWidth;return i||a},l=function(t){for(var e=!1;;){if(e=c(t.get(0)))break;if(t=t.parent(),!t.length||t.hasClass("fancybox-stage")||t.is("body"))break}return e},d=function(t){var e=this;e.instance=t,e.$bg=t.$refs.bg,e.$stage=t.$refs.stage,e.$container=t.$refs.container,e.destroy(),e.$container.on("touchstart.fb.touch mousedown.fb.touch",n.proxy(e,"ontouchstart"))};d.prototype.destroy=function(){this.$container.off(".fb.touch")},d.prototype.ontouchstart=function(o){var i=this,c=n(o.target),d=i.instance,u=d.current,f=u.$content,p="touchstart"==o.type;if(p&&i.$container.off("mousedown.fb.touch"),(!o.originalEvent||2!=o.originalEvent.button)&&c.length&&!r(c)&&!r(c.parent())&&(c.is("img")||!(o.originalEvent.clientX>c[0].clientWidth+c.offset().left))){if(!u||d.isAnimating||d.isClosing)return o.stopPropagation(),void o.preventDefault();if(i.realPoints=i.startPoints=a(o),i.startPoints.length){if(o.stopPropagation(),i.startEvent=o,i.canTap=!0,i.$target=c,i.$content=f,i.opts=u.opts.touch,i.isPanning=!1,i.isSwiping=!1,i.isZooming=!1,i.isScrolling=!1,i.startTime=(new Date).getTime(),i.distanceX=i.distanceY=i.distance=0,i.canvasWidth=Math.round(u.$slide[0].clientWidth),i.canvasHeight=Math.round(u.$slide[0].clientHeight),i.contentLastPos=null,i.contentStartPos=n.fancybox.getTranslate(i.$content)||{top:0,left:0},i.sliderStartPos=i.sliderLastPos||n.fancybox.getTranslate(u.$slide),i.stagePos=n.fancybox.getTranslate(d.$refs.stage),i.sliderStartPos.top-=i.stagePos.top,i.sliderStartPos.left-=i.stagePos.left,i.contentStartPos.top-=i.stagePos.top,i.contentStartPos.left-=i.stagePos.left,n(e).off(".fb.touch").on(p?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",n.proxy(i,"ontouchend")).on(p?"touchmove.fb.touch":"mousemove.fb.touch",n.proxy(i,"ontouchmove")),n.fancybox.isMobile&&e.addEventListener("scroll",i.onscroll,!0),!i.opts&&!d.canPan()||!c.is(i.$stage)&&!i.$stage.find(c).length)return void(c.is(".fancybox-image")&&o.preventDefault());n.fancybox.isMobile&&(l(c)||l(c.parent()))||o.preventDefault(),(1===i.startPoints.length||u.hasError)&&(i.instance.canPan()?(n.fancybox.stop(i.$content),i.$content.css("transition-duration",""),i.isPanning=!0):i.isSwiping=!0,i.$container.addClass("fancybox-controls--isGrabbing")),2===i.startPoints.length&&"image"===u.type&&(u.isLoaded||u.$ghost)&&(i.canTap=!1,i.isSwiping=!1,i.isPanning=!1,i.isZooming=!0,n.fancybox.stop(i.$content),i.$content.css("transition-duration",""),i.centerPointStartX=.5*(i.startPoints[0].x+i.startPoints[1].x)-n(t).scrollLeft(),i.centerPointStartY=.5*(i.startPoints[0].y+i.startPoints[1].y)-n(t).scrollTop(),i.percentageOfImageAtPinchPointX=(i.centerPointStartX-i.contentStartPos.left)/i.contentStartPos.width,i.percentageOfImageAtPinchPointY=(i.centerPointStartY-i.contentStartPos.top)/i.contentStartPos.height,i.startDistanceBetweenFingers=s(i.startPoints[0],i.startPoints[1]))}}},d.prototype.onscroll=function(t){var n=this;n.isScrolling=!0,e.removeEventListener("scroll",n.onscroll,!0)},d.prototype.ontouchmove=function(t){var e=this,o=n(t.target);return void 0!==t.originalEvent.buttons&&0===t.originalEvent.buttons?void e.ontouchend(t):e.isScrolling||!o.is(e.$stage)&&!e.$stage.find(o).length?void(e.canTap=!1):(e.newPoints=a(t),void((e.opts||e.instance.canPan())&&e.newPoints.length&&e.newPoints.length&&(e.isSwiping&&e.isSwiping===!0||t.preventDefault(),e.distanceX=s(e.newPoints[0],e.startPoints[0],"x"),e.distanceY=s(e.newPoints[0],e.startPoints[0],"y"),e.distance=s(e.newPoints[0],e.startPoints[0]),e.distance>0&&(e.isSwiping?e.onSwipe(t):e.isPanning?e.onPan():e.isZooming&&e.onZoom()))))},d.prototype.onSwipe=function(e){var a,s=this,r=s.isSwiping,c=s.sliderStartPos.left||0;if(r!==!0)"x"==r&&(s.distanceX>0&&(s.instance.group.length<2||0===s.instance.current.index&&!s.instance.current.opts.loop)?c+=Math.pow(s.distanceX,.8):s.distanceX<0&&(s.instance.group.length<2||s.instance.current.index===s.instance.group.length-1&&!s.instance.current.opts.loop)?c-=Math.pow(-s.distanceX,.8):c+=s.distanceX),s.sliderLastPos={top:"x"==r?0:s.sliderStartPos.top+s.distanceY,left:c},s.requestId&&(i(s.requestId),s.requestId=null),s.requestId=o(function(){s.sliderLastPos&&(n.each(s.instance.slides,function(t,e){var o=e.pos-s.instance.currPos;n.fancybox.setTranslate(e.$slide,{top:s.sliderLastPos.top,left:s.sliderLastPos.left+o*s.canvasWidth+o*e.opts.gutter})}),s.$container.addClass("fancybox-is-sliding"))});else if(Math.abs(s.distance)>10){if(s.canTap=!1,s.instance.group.length<2&&s.opts.vertical?s.isSwiping="y":s.instance.isDragging||s.opts.vertical===!1||"auto"===s.opts.vertical&&n(t).width()>800?s.isSwiping="x":(a=Math.abs(180*Math.atan2(s.distanceY,s.distanceX)/Math.PI),s.isSwiping=a>45&&a<135?"y":"x"),s.canTap=!1,"y"===s.isSwiping&&n.fancybox.isMobile&&(l(s.$target)||l(s.$target.parent())))return void(s.isScrolling=!0);s.instance.isDragging=s.isSwiping,s.startPoints=s.newPoints,n.each(s.instance.slides,function(t,e){n.fancybox.stop(e.$slide),e.$slide.css("transition-duration",""),e.inTransition=!1,e.pos===s.instance.current.pos&&(s.sliderStartPos.left=n.fancybox.getTranslate(e.$slide).left-n.fancybox.getTranslate(s.instance.$refs.stage).left)}),s.instance.SlideShow&&s.instance.SlideShow.isActive&&s.instance.SlideShow.stop()}},d.prototype.onPan=function(){var t=this;return s(t.newPoints[0],t.realPoints[0])<(n.fancybox.isMobile?10:5)?void(t.startPoints=t.newPoints):(t.canTap=!1,t.contentLastPos=t.limitMovement(),t.requestId&&(i(t.requestId),t.requestId=null),void(t.requestId=o(function(){n.fancybox.setTranslate(t.$content,t.contentLastPos)})))},d.prototype.limitMovement=function(){var t,e,n,o,i,a,s=this,r=s.canvasWidth,c=s.canvasHeight,l=s.distanceX,d=s.distanceY,u=s.contentStartPos,f=u.left,p=u.top,h=u.width,g=u.height;return i=h>r?f+l:f,a=p+d,t=Math.max(0,.5*r-.5*h),e=Math.max(0,.5*c-.5*g),n=Math.min(r-h,.5*r-.5*h),o=Math.min(c-g,.5*c-.5*g),l>0&&i>t&&(i=t-1+Math.pow(-t+f+l,.8)||0),l<0&&i<n&&(i=n+1-Math.pow(n-f-l,.8)||0),d>0&&a>e&&(a=e-1+Math.pow(-e+p+d,.8)||0),d<0&&a<o&&(a=o+1-Math.pow(o-p-d,.8)||0),{top:a,left:i}},d.prototype.limitPosition=function(t,e,n,o){var i=this,a=i.canvasWidth,s=i.canvasHeight;return n>a?(t=t>0?0:t,t=t<a-n?a-n:t):t=Math.max(0,a/2-n/2),o>s?(e=e>0?0:e,e=e<s-o?s-o:e):e=Math.max(0,s/2-o/2),{top:e,left:t}},d.prototype.onZoom=function(){var e=this,a=e.contentStartPos,r=a.width,c=a.height,l=a.left,d=a.top,u=s(e.newPoints[0],e.newPoints[1]),f=u/e.startDistanceBetweenFingers,p=Math.floor(r*f),h=Math.floor(c*f),g=(r-p)*e.percentageOfImageAtPinchPointX,b=(c-h)*e.percentageOfImageAtPinchPointY,m=(e.newPoints[0].x+e.newPoints[1].x)/2-n(t).scrollLeft(),y=(e.newPoints[0].y+e.newPoints[1].y)/2-n(t).scrollTop(),v=m-e.centerPointStartX,x=y-e.centerPointStartY,w=l+(g+v),$=d+(b+x),S={top:$,left:w,scaleX:f,scaleY:f};e.canTap=!1,e.newWidth=p,e.newHeight=h,e.contentLastPos=S,e.requestId&&(i(e.requestId),e.requestId=null),e.requestId=o(function(){n.fancybox.setTranslate(e.$content,e.contentLastPos)})},d.prototype.ontouchend=function(t){var o=this,s=Math.max((new Date).getTime()-o.startTime,1),r=o.isSwiping,c=o.isPanning,l=o.isZooming,d=o.isScrolling;return o.endPoints=a(t),o.$container.removeClass("fancybox-controls--isGrabbing"),n(e).off(".fb.touch"),e.removeEventListener("scroll",o.onscroll,!0),o.requestId&&(i(o.requestId),o.requestId=null),o.isSwiping=!1,o.isPanning=!1,o.isZooming=!1,o.isScrolling=!1,o.instance.isDragging=!1,o.canTap?o.onTap(t):(o.speed=366,o.velocityX=o.distanceX/s*.5,o.velocityY=o.distanceY/s*.5,o.speedX=Math.max(.5*o.speed,Math.min(1.5*o.speed,1/Math.abs(o.velocityX)*o.speed)),void(c?o.endPanning():l?o.endZooming():o.endSwiping(r,d)))},d.prototype.endSwiping=function(t,e){var o=this,i=!1,a=o.instance.group.length;o.sliderLastPos=null,"y"==t&&!e&&Math.abs(o.distanceY)>50?(n.fancybox.animate(o.instance.current.$slide,{top:o.sliderStartPos.top+o.distanceY+150*o.velocityY,opacity:0},200),i=o.instance.close(!0,200)):"x"==t&&o.distanceX>50&&a>1?i=o.instance.previous(o.speedX):"x"==t&&o.distanceX<-50&&a>1&&(i=o.instance.next(o.speedX)),i!==!1||"x"!=t&&"y"!=t||(e||a<2?o.instance.centerSlide(o.instance.current,150):o.instance.jumpTo(o.instance.current.index)),o.$container.removeClass("fancybox-is-sliding")},d.prototype.endPanning=function(){var t,e,o,i=this;i.contentLastPos&&(i.opts.momentum===!1?(t=i.contentLastPos.left,e=i.contentLastPos.top):(t=i.contentLastPos.left+i.velocityX*i.speed,e=i.contentLastPos.top+i.velocityY*i.speed),o=i.limitPosition(t,e,i.contentStartPos.width,i.contentStartPos.height),o.width=i.contentStartPos.width,o.height=i.contentStartPos.height,n.fancybox.animate(i.$content,o,330))},d.prototype.endZooming=function(){var t,e,o,i,a=this,s=a.instance.current,r=a.newWidth,c=a.newHeight;a.contentLastPos&&(t=a.contentLastPos.left,e=a.contentLastPos.top,i={top:e,left:t,width:r,height:c,scaleX:1,scaleY:1},n.fancybox.setTranslate(a.$content,i),r<a.canvasWidth&&c<a.canvasHeight?a.instance.scaleToFit(150):r>s.width||c>s.height?a.instance.scaleToActual(a.centerPointStartX,a.centerPointStartY,150):(o=a.limitPosition(t,e,r,c),n.fancybox.setTranslate(a.$content,n.fancybox.getTranslate(a.$content)),n.fancybox.animate(a.$content,o,150)))},d.prototype.onTap=function(e){var o,i=this,s=n(e.target),r=i.instance,c=r.current,l=e&&a(e)||i.startPoints,d=l[0]?l[0].x-n(t).scrollLeft()-i.stagePos.left:0,u=l[0]?l[0].y-n(t).scrollTop()-i.stagePos.top:0,f=function(t){var o=c.opts[t];if(n.isFunction(o)&&(o=o.apply(r,[c,e])),o)switch(o){case"close":r.close(i.startEvent);break;case"toggleControls":r.toggleControls(!0);break;case"next":r.next();break;case"nextOrClose":r.group.length>1?r.next():r.close(i.startEvent);break;case"zoom":"image"==c.type&&(c.isLoaded||c.$ghost)&&(r.canPan()?r.scaleToFit():r.isScaledDown()?r.scaleToActual(d,u):r.group.length<2&&r.close(i.startEvent))}};if((!e.originalEvent||2!=e.originalEvent.button)&&(s.is("img")||!(d>s[0].clientWidth+s.offset().left))){if(s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))o="Outside";else if(s.is(".fancybox-slide"))o="Slide";else{if(!r.current.$content||!r.current.$content.find(s).addBack().filter(s).length)return;o="Content"}if(i.tapped){if(clearTimeout(i.tapped),i.tapped=null,Math.abs(d-i.tapX)>50||Math.abs(u-i.tapY)>50)return this;f("dblclick"+o)}else i.tapX=d,i.tapY=u,c.opts["dblclick"+o]&&c.opts["dblclick"+o]!==c.opts["click"+o]?i.tapped=setTimeout(function(){i.tapped=null,f("click"+o)},500):f("click"+o);return this}},n(e).on("onActivate.fb",function(t,e){e&&!e.Guestures&&(e.Guestures=new d(e))})}(window,document,window.jQuery||jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'},slideShow:{autoStart:!1,speed:3e3}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{timer:null,isActive:!1,$button:null,init:function(){var t=this;t.$button=t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){t.toggle()}),(t.instance.group.length<2||!t.instance.group[t.instance.currIndex].opts.slideShow)&&t.$button.hide()},set:function(t){var e=this;e.instance&&e.instance.current&&(t===!0||e.instance.current.opts.loop||e.instance.currIndex<e.instance.group.length-1)?e.timer=setTimeout(function(){e.isActive&&e.instance.jumpTo((e.instance.currIndex+1)%e.instance.group.length)},e.instance.current.opts.slideShow.speed):(e.stop(),e.instance.idleSecondsCounter=0,e.instance.showControls())},clear:function(){var t=this;clearTimeout(t.timer),t.timer=null},start:function(){var t=this,e=t.instance.current;e&&(t.isActive=!0,t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),t.set(!0))},stop:function(){var t=this,e=t.instance.current;t.clear(),t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),t.isActive=!1},toggle:function(){var t=this;t.isActive?t.stop():t.start()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.SlideShow&&(e.SlideShow=new n(e))},"beforeShow.fb":function(t,e,n,o){var i=e&&e.SlideShow;o?i&&n.opts.slideShow.autoStart&&i.start():i&&i.isActive&&i.clear()},"afterShow.fb":function(t,e,n){var o=e&&e.SlideShow;o&&o.isActive&&o.set()},"afterKeydown.fb":function(n,o,i,a,s){var r=o&&o.SlideShow;!r||!i.opts.slideShow||80!==s&&32!==s||e(t.activeElement).is("button,a,input")||(a.preventDefault(),r.toggle())},"beforeClose.fb onDeactivate.fb":function(t,e){var n=e&&e.SlideShow;n&&n.stop()}}),e(t).on("visibilitychange",function(){var n=e.fancybox.getInstance(),o=n&&n.SlideShow;o&&o.isActive&&(t.hidden?o.clear():o.set())})}(document,window.jQuery||jQuery),function(t,e){"use strict";var n=function(){for(var e=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n={},o=0;o<e.length;o++){var i=e[o];if(i&&i[1]in t){for(var a=0;a<i.length;a++)n[e[0][a]]=i[a];return n}}return!1}();if(!n)return void(e&&e.fancybox&&(e.fancybox.defaults.btnTpl.fullScreen=!1));var o={request:function(e){e=e||t.documentElement,e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)},exit:function(){t[n.exitFullscreen]()},toggle:function(e){e=e||t.documentElement,this.isFullscreen()?this.exit():this.request(e)},isFullscreen:function(){return Boolean(t[n.fullscreenElement])},enabled:function(){return Boolean(t[n.fullscreenEnabled])}};e.extend(!0,e.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 v16 h22 v-16 h-22 v8" /></svg></button>'},fullScreen:{autoStart:!1}}),e(t).on({"onInit.fb":function(t,e){var n;e&&e.group[e.currIndex].opts.fullScreen?(n=e.$refs.container,n.on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(t){t.stopPropagation(),t.preventDefault(),o.toggle()}),e.opts.fullScreen&&e.opts.fullScreen.autoStart===!0&&o.request(),e.FullScreen=o):e&&e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()},"afterKeydown.fb":function(t,e,n,o,i){e&&e.FullScreen&&70===i&&(o.preventDefault(),e.FullScreen.toggle())},"beforeClose.fb":function(t,e){e&&e.FullScreen&&e.$refs.container.hasClass("fancybox-is-fullscreen")&&o.exit()}}),e(t).on(n.fullscreenchange,function(){var t=o.isFullscreen(),n=e.fancybox.getInstance();n&&(n.current&&"image"===n.current.type&&n.isAnimating&&(n.current.$content.css("transition","none"),n.isAnimating=!1,n.update(!0,!0,0)),n.trigger("onFullscreenChange",t),n.$refs.container.toggleClass("fancybox-is-fullscreen",t))})}(document,window.jQuery||jQuery),function(t,e){"use strict";var n="fancybox-thumbs",o=n+"-active",i=n+"-loading";e.fancybox.defaults=e.extend(!0,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"}},e.fancybox.defaults);var a=function(t){this.init(t)};e.extend(a.prototype,{$button:null,$grid:null,$list:null,isVisible:!1,isActive:!1,init:function(t){var e,n,o=this;o.instance=t,t.Thumbs=o,o.opts=t.group[t.currIndex].opts.thumbs,e=t.group[0],e=e.opts.thumb||!(!e.opts.$thumb||!e.opts.$thumb.length)&&e.opts.$thumb.attr("src"),t.group.length>1&&(n=t.group[1],n=n.opts.thumb||!(!n.opts.$thumb||!n.opts.$thumb.length)&&n.opts.$thumb.attr("src")),o.$button=t.$refs.toolbar.find("[data-fancybox-thumbs]"),o.opts&&e&&n&&e&&n?(o.$button.show().on("click",function(){o.toggle()}),o.isActive=!0):o.$button.hide()},create:function(){var t,o=this,a=o.instance,s=o.opts.parentEl,r=[];o.$grid||(o.$grid=e('<div class="'+n+" "+n+"-"+o.opts.axis+'"></div>').appendTo(a.$refs.container.find(s).addBack().filter(s)),o.$grid.on("click","li",function(){a.jumpTo(e(this).attr("data-index"))})),o.$list||(o.$list=e("<ul>").appendTo(o.$grid)),e.each(a.group,function(e,n){t=n.opts.thumb||(n.opts.$thumb?n.opts.$thumb.attr("src"):null),t||"image"!==n.type||(t=n.src),r.push('<li data-index="'+e+'" tabindex="0" class="'+i+'"'+(t&&t.length?' style="background-image:url('+t+')" />':"")+"></li>")}),o.$list[0].innerHTML=r.join(""),"x"===o.opts.axis&&o.$list.width(parseInt(o.$grid.css("padding-right"),10)+a.group.length*o.$list.children().eq(0).outerWidth(!0))},focus:function(t){var e,n,i=this,a=i.$list,s=i.$grid;i.instance.current&&(e=a.children().removeClass(o).filter('[data-index="'+i.instance.current.index+'"]').addClass(o),n=e.position(),"y"===i.opts.axis&&(n.top<0||n.top>a.height()-e.outerHeight())?a.stop().animate({scrollTop:a.scrollTop()+n.top},t):"x"===i.opts.axis&&(n.left<s.scrollLeft()||n.left>s.scrollLeft()+(s.width()-e.outerWidth()))&&a.parent().stop().animate({scrollLeft:n.left},t))},update:function(){var t=this;t.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible),t.isVisible?(t.$grid||t.create(),t.instance.trigger("onThumbsShow"),t.focus(0)):t.$grid&&t.instance.trigger("onThumbsHide"),t.instance.update()},hide:function(){this.isVisible=!1,this.update()},show:function(){this.isVisible=!0,this.update()},toggle:function(){this.isVisible=!this.isVisible,this.update()}}),e(t).on({"onInit.fb":function(t,e){var n;e&&!e.Thumbs&&(n=new a(e),n.isActive&&n.opts.autoStart===!0&&n.show())},"beforeShow.fb":function(t,e,n,o){var i=e&&e.Thumbs;i&&i.isVisible&&i.focus(o?0:250)},"afterKeydown.fb":function(t,e,n,o,i){var a=e&&e.Thumbs;a&&a.isActive&&71===i&&(o.preventDefault(),a.toggle())},"beforeClose.fb":function(t,e){var n=e&&e.Thumbs;n&&n.isVisible&&n.opts.hideOnClose!==!1&&n.$grid.hide()}})}(document,window.jQuery||jQuery),function(t,e){"use strict";function n(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};return String(t).replace(/[&<>"'`=\/]/g,function(t){return e[t]})}e.extend(!0,e.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'},share:{url:function(t,e){return!t.currentHash&&"inline"!==e.type&&"html"!==e.type&&(e.origSrc||e.src)||window.location},tpl:'<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>'}}),e(t).on("click","[data-fancybox-share]",function(){var t,o,i=e.fancybox.getInstance(),a=i.current||null;a&&("function"===e.type(a.opts.share.url)&&(t=a.opts.share.url.apply(a,[i,a])),o=a.opts.share.tpl.replace(/\{\{media\}\}/g,"image"===a.type?encodeURIComponent(a.src):"").replace(/\{\{url\}\}/g,encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g,n(t)).replace(/\{\{descr\}\}/g,i.$caption?encodeURIComponent(i.$caption.text()):""),e.fancybox.open({src:i.translate(i,o),type:"html",opts:{animationEffect:!1,afterLoad:function(t,e){i.$refs.container.one("beforeClose.fb",function(){t.close(null,0)}),e.$content.find(".fancybox-share__links a").click(function(){return window.open(this.href,"Share","width=550, height=450"),!1})}}}))})}(document,window.jQuery||jQuery),function(t,e,n){"use strict";function o(){var t=e.location.hash.substr(1),n=t.split("-"),o=n.length>1&&/^\+?\d+$/.test(n[n.length-1])?parseInt(n.pop(-1),10)||1:1,i=n.join("-");return{hash:t,index:o<1?1:o,gallery:i}}function i(t){var e;""!==t.gallery&&(e=n("[data-fancybox='"+n.escapeSelector(t.gallery)+"']").eq(t.index-1).trigger("click.fb-start"))}function a(t){var e,n;return!!t&&(e=t.current?t.current.opts:t.opts,n=e.hash||(e.$orig?e.$orig.data("fancybox"):""),""!==n&&n)}n.escapeSelector||(n.escapeSelector=function(t){var e=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,n=function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t};return(t+"").replace(e,n)}),n(function(){n.fancybox.defaults.hash!==!1&&(n(t).on({"onInit.fb":function(t,e){var n,i;e.group[e.currIndex].opts.hash!==!1&&(n=o(),i=a(e),i&&n.gallery&&i==n.gallery&&(e.currIndex=n.index-1))},"beforeShow.fb":function(n,o,i,s){var r;i&&i.opts.hash!==!1&&(r=a(o),r&&(o.currentHash=r+(o.group.length>1?"-"+(i.index+1):""),e.location.hash!=="#"+o.currentHash&&(o.origHash||(o.origHash=e.location.hash),o.hashTimer&&clearTimeout(o.hashTimer),o.hashTimer=setTimeout(function(){"replaceState"in e.history?(e.history[s?"pushState":"replaceState"]({},t.title,e.location.pathname+e.location.search+"#"+o.currentHash),s&&(o.hasCreatedHistory=!0)):e.location.hash=o.currentHash,o.hashTimer=null},300))))},"beforeClose.fb":function(n,o,i){var s;i.opts.hash!==!1&&(s=a(o),o.currentHash&&o.hasCreatedHistory?e.history.back():o.currentHash&&("replaceState"in e.history?e.history.replaceState({},t.title,e.location.pathname+e.location.search+(o.origHash||"")):e.location.hash=o.origHash),o.currentHash=null,clearTimeout(o.hashTimer))}}),n(e).on("hashchange.fb",function(){var t,e=o();n.each(n(".fancybox-container").get().reverse(),function(e,o){var i=n(o).data("FancyBox");if(i.currentHash)return t=i,!1}),t?!t.currentHash||t.currentHash===e.gallery+"-"+e.index||1===e.index&&t.currentHash==e.gallery||(t.currentHash=null,t.close()):""!==e.gallery&&i(e)}),setTimeout(function(){n.fancybox.getInstance()||i(o())},50))})}(document,window,window.jQuery||jQuery),function(t,e){"use strict";var n=(new Date).getTime();e(t).on({"onInit.fb":function(t,e,o){e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll",function(t){var o=e.current,i=(new Date).getTime();e.group.length<2||o.opts.wheel===!1||"auto"===o.opts.wheel&&"image"!==o.type||(t.preventDefault(),t.stopPropagation(),o.$slide.hasClass("fancybox-animated")||(t=t.originalEvent||t,i-n<250||(n=i,e[(-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)<0?"next":"previous"]())))})}})}(document,window.jQuery||jQuery);
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

(function(exports) {
    'use strict';
  
    const _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){ setTimeout(callback, 10) };
    const PI2 = Math.PI * 2;
    let imageData, renderCount;
    let index, startIndex, layerIndex;
    let origin, particle, touch, touchIndex, rect;
    let x, y, z, dX, dY, dZ, distance;
    let force, angle, intensity, vertices;
    let canvas, context, data, r, g, b, a;
    let tick;
    let rotationX = 0;
    let rotationY = 0;
  
    const NextParticle = class NextParticle {
      constructor(optionsParam) {
        let options = {};
        if (optionsParam) {
          if (optionsParam.nodeName) {
            options = JSON.parse(JSON.stringify(optionsParam.dataset));
            if (optionsParam.nodeName === 'IMG') {
              options.image = optionsParam;
            } else {
              options.wrapperElement = optionsParam;
            }
          } else {
            options = optionsParam;
          }
        }
        this.state = 'stopped';
        this.touches = [];
        this.on('imageLoaded', this._onImageLoaded);
        this._initImage(options);
      }
  
      on(event, fn) {
        this.events = this.events || {};
        this.events[event] = this.events[event] || [];
        this.events[event].push(fn);
      }
  
      emit(event, params) {
        const events = this.events[event];
        if (events && events.length) {
          for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
            const cb = events[eventIndex];
            cb.call(this, params);
          }
        }
      }
  
      get renderer() {
        return this._renderer;
      }
  
      set renderer(value) {
        this._renderer = value;
        this._draw = this['_' + value + 'Renderer'];
        try {
          this['_' + value + 'InitContext']();
        } catch (e) {
          console.log(e);
          if (value !== 'default') {
            this.renderer = 'default';
          }
        }
      }
  
      set color(value) {
        this.colorArr = this._parseColor(value);
        if (this.colorArr) {
          if (isNaN(this.colorArr[3])) {
            this.colorArr[3] = 255;
          }
          if (0 < this.colorArr[3] && this.colorArr[3] <= 1) {
            this.colorArr[3] *= 255;
          }
        }
      }
  
      start(optionsParam) {
        const options = optionsParam || {};
        this.initPosition = options.initPosition || this.initPosition;
        this.initDirection = options.initDirection || this.initDirection;
        if (this.canvas) {
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.canvas.style.display = '';
        }
        this._initOrigins();
        this._initParticles();
        this._webglSetAttributes();
        if (this.state !== 'running') {
          this.state = 'running';
          if (!this.disableInteraction) {
            if ('ontouchstart' in window || window.navigator.msPointerEnabled) {
              document.body.addEventListener('touchstart', this._touchHandler);
              document.body.addEventListener('touchmove', this._touchHandler);
              document.body.addEventListener('touchend', this._clearTouches);
              document.body.addEventListener('touchcancel', this._clearTouches);
            } else {
              this.canvas.addEventListener('mousemove', this._mouseHandler);
              this.canvas.addEventListener('mouseout', this._clearTouches);
              this.canvas.addEventListener('click', this._clickHandler);
            }
          }
          this._animate();
        }
      }
  
      stop(optionsParam) {
        const options = optionsParam || {};
        this.fadePosition = options.fadePosition || this.fadePosition;
        this.fadeDirection = options.fadeDirection || this.fadeDirection;
        this._fade();
        document.body.removeEventListener('touchstart', this._touchHandler);
        document.body.removeEventListener('touchmove', this._touchHandler);
        document.body.removeEventListener('touchend', this._clearTouches);
        document.body.removeEventListener('touchcancel', this._clearTouches);
        if (this.canvas) {
          this.canvas.removeEventListener('mousemove', this._mouseHandler);
          this.canvas.removeEventListener('mouseout', this._clearTouches);
          this.canvas.removeEventListener('click', this._clickHandler);
        }
      }
  
      _animate() {
        if (this.state !== 'stopped') {
          this._calculate();
          this._draw();
          _requestAnimationFrame(() => this._animate());
        } else {
          this.emit('stopped');
        }
      }
  
      get _mouseHandler() {
        return (e) => {
          this.touches = [{
            x: e.offsetX,
            y: e.offsetY,
            z: 49 + (this.layerCount - 1) * this.layerDistance,
            force: 1,
          }];
        };
      }
  
      get _clickHandler() {
        return (e) => {
          const strength = this.clickStrength;
          this.origins.map(o => o.z -= strength);
          setTimeout(() => {
            this.origins.map(o => o.z += strength);
          }, 100);
        };
      }
  
  
      get _touchHandler() {
        return (e) => {
          this.touches = [];
          rect = this.canvas.getBoundingClientRect();
          for (touchIndex = 0; touchIndex < e.changedTouches.length; touchIndex++) {
            touch = e.changedTouches[touchIndex];
            if (touch.target === this.canvas) {
              this.touches.push({
                x: touch.pageX - rect.left,
                y: touch.pageY - rect.top,
                z: 49 + (this.layerCount - 1) * this.layerDistance,
                force: touch.force || 1,
              });
              e.preventDefault();
            }
          }
        };
      }
  
      get _clearTouches() {
        return (e) => {
          this.touches = [];
        };
      }
  
      _onImageLoaded(options) {
        this.imageWidth = this.image.naturalWidth || this.image.width;
        this.imageHeight = this.image.naturalHeight || this.image.height;
        this.imageRatio = this.imageWidth / this.imageHeight;
        this.width = this.width || this.imageWidth;
        this.height = this.height || this.imageHeight;
        this.renderSize = (this.width + this.height) / 4;
        if (this.srcImage) {
          this.srcImage.style.display = 'none';
        }
        this._initSettings(options);
        this._initContext(options);
        this._initResponsive(options);
        this.start();
      }
  
      _initImage(options) {
        this.srcImage = options.image;
        if (!this.srcImage && options.imageId) {
          this.srcImage = document.getElementById(options.imageId);
        }
        this.imageUrl = options.imageUrl || this.srcImage.src;
        this.image = document.createElement('img');
        this.wrapperElement = options.wrapperElement || this.srcImage.parentElement;
        this.image.onload = () => this.emit('imageLoaded', options);
        this.image.crossOrigin = 'Anonymous';
        if (options.addTimestamp) {
          if (/\?/.test(this.imageUrl)) {
            this.imageUrl += '&d=' + Date.now();
          } else {
            this.imageUrl += '?d=' + Date.now();
          }
        }
        this.image.src = this.imageUrl;
      }
  
      _initContext(options) {
        this.canvas = options.canvas;
        if (!this.canvas && !this.context && this.wrapperElement) {
          this.canvas = document.createElement('canvas');
          this.wrapperElement.appendChild(this.canvas);
        }
        if (this.convas) {
          this.convas.style.display = 'none';
        }
        this.context = options.context;
        this.renderer = options.renderer || 'default';
      }
  
      _defaultInitContext(options) {
        this.context = this.context || this.canvas.getContext('2d');
      }
  
      _webglInitContext() {
        this.context = this.context || this.canvas.getContext('webgl2') || this.canvas.getContext('experimental-webgl');
        this.fragmentShaderScript = `#version 300 es
  
          precision highp float;
  
          in vec4 vColor;
          out vec4 fragColor;
  
          void main(void) {
            // fragColor = vec4(1, 1, 1, 0.1);
            fragColor = vColor;
          }
        `;
  
        this.vertexShaderScript = `#version 300 es
  
          precision highp float;
  
          in vec3 vertexPosition;
          in vec4 vertexColor;
          uniform vec3 vertexOffset;
          uniform float pointSize;
          uniform float depth;
          vec3 mirror = vec3(1, -1, 1);
  
          uniform mat4 modelViewMatrix;
          uniform mat4 perspectiveMatrix;
          uniform mat4 rotationMatrix;
  
          out vec4 vColor;
  
          void main(void) {
            gl_Position = rotationMatrix * perspectiveMatrix * modelViewMatrix * vec4(mirror * vertexPosition + vertexOffset, vertexPosition);
            gl_PointSize = pointSize + max((log(vertexPosition.z) - 3.91) * depth, -pointSize + 1.0);
            vColor = vertexColor;
          }
        `;
        this.context.viewport(0, 0, this.width, this.height);
        const vertexShader = this.context.createShader(this.context.VERTEX_SHADER);
        this.context.shaderSource(vertexShader, this.vertexShaderScript);
        this.context.compileShader(vertexShader);
        if (!this.context.getShaderParameter(vertexShader, this.context.COMPILE_STATUS)) {
          console.log(this.context.getShaderInfoLog(vertexShader));
        }
        const fragmentShader = this.context.createShader(this.context.FRAGMENT_SHADER);
        this.context.shaderSource(fragmentShader, this.fragmentShaderScript);
        this.context.compileShader(fragmentShader);
        if (!this.context.getShaderParameter(fragmentShader, this.context.COMPILE_STATUS)) {
          console.log(this.context.getShaderInfoLog(fragmentShader));
        }
        this.program = this.context.createProgram();
        this.context.attachShader(this.program, vertexShader);
        this.context.attachShader(this.program, fragmentShader);
        this.context.linkProgram(this.program);
        this.context.useProgram(this.program);
        this.vertexPosition = this.context.getAttribLocation(this.program, 'vertexPosition');
        this.context.enableVertexAttribArray(this.vertexPosition);
        this.vertexColor = this.context.getAttribLocation(this.program, 'vertexColor');
        this.context.enableVertexAttribArray(this.vertexColor);
        this.context.clearColor(0.0, 0.0, 0.0, 0.0);
        this.context.enable(this.context.BLEND);
        this.context.disable(this.context.DEPTH_TEST);
        this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE);
        this.vertexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
        this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
        this.vertexOffset = this.context.getUniformLocation(this.program, "vertexOffset");
        this.context.uniform3f(this.vertexOffset, 0, 0, 1000);
        this.context.vertexAttribPointer(this.vertexPosition, 3.0, this.context.FLOAT, false, 28, 0);
        this.context.vertexAttribPointer(this.vertexColor, 4.0, this.context.FLOAT, false, 28, 12);
        this.uModelViewMatrix = this.context.getUniformLocation(this.program, 'modelViewMatrix');
        this.uPerspectiveMatrix = this.context.getUniformLocation(this.program, 'perspectiveMatrix');
        this.uRotationMatrix = this.context.getUniformLocation(this.program, 'rotationMatrix');
        this.uPointSize = this.context.getUniformLocation(this.program, 'pointSize');
        this.uDepth = this.context.getUniformLocation(this.program, 'depth');
        // this.uVertexColors = this.context.getUniformLocation(this.program, 'vertexColors');
        // this.uVertexIndex = this.context.getUniformLocation(this.program, 'vertexIndex');
  
        this._webglSetAttributes();
      }
  
      _webglSetAttributes() {
        if (this.renderer === 'webgl') {
          var fieldOfView = 1;
          var aspectRatio = this.canvas.width / this.canvas.height;
          var nearPlane = 10;
          var farPlane = 100;
          var top = nearPlane * Math.tan(fieldOfView * Math.PI / 360.0);
          var bottom = -top;
          var right = top * aspectRatio;
          var left = -right;
          var a = (right + left) / (right - left);
          var b = (top + bottom) / (top - bottom);
          var c = (farPlane + nearPlane) / (farPlane - nearPlane);
          var d = (2 * farPlane * nearPlane) / (farPlane - nearPlane);
          var x = (2 * nearPlane) / (right - left);
          var y = (2 * nearPlane) / (top - bottom);
  
          var perspectiveMatrix = [
            x, 0, a, 0,
            0, y, b, 0,
            0, 0, c, d,
            0, 0, -1, 0,
          ];
          var modelViewMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
          ];
          this.context.viewport(0, 0, this.width, this.height);
          this.context.uniformMatrix4fv(this.uModelViewMatrix, false, new Float32Array(perspectiveMatrix));
          this.context.uniformMatrix4fv(this.uPerspectiveMatrix, false, new Float32Array(modelViewMatrix));
          this.context.uniform1f(this.uPointSize, this.particleSize);
          this.context.uniform1f(this.uDepth, this.depth);
          // this.context.uniform4fv(this.uVertexColors, new Float32Array(this.vertexColors));
          // this.context.uniform1f(this.uVertexIndex, 0);
          this._updateRotation();
        }
      }
  
      _updateRotation() {
        const a = Math.cos(rotationX);
        const b = Math.sin(rotationX);
        const c = Math.cos(rotationY);
        const d = Math.sin(rotationY);
        var rotationMatrix = [
          c, 0, d, 0,
          0, a,-b, 0,
         -c, b, a, 0,
          0, 0, 0, 1,
        ];
        this.context.uniformMatrix4fv(this.uRotationMatrix, false, new Float32Array(rotationMatrix));
      }
  
      _webglRenderer() {
        vertices = new Float32Array(this.vertices);
        this.context.bufferData(this.context.ARRAY_BUFFER, vertices, this.context.STATIC_DRAW);
        this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
        this.context.drawArrays(this.context.POINTS, 0, this.particles.length);
        this.context.flush();
      }
  
  
      _initSettings(options) {
        this.width = options.width * 1 || this.width;
        this.height = options.height * 1 || this.height;
        this.maxWidth = options.maxWidth;
        this.maxHeight = options.maxHeight;
        this.minWidth = options.minWidth;
        this.minHeight = options.minHeight;
        if (this.maxWidth) {
          if (/%$/.test(this.maxWidth)) {
            this.maxWidth = (this.width * this.maxWidth.replace('%', '')) / 100;
          } else {
            this.maxWidth *= 1;
          }
        }
        if (this.maxHeight) {
          if (/%$/.test(this.maxHeight)) {
            this.maxHeight = (this.height * this.maxHeight.replace('%', '')) / 100;
          } else {
            this.maxHeight *= 1;
          }
        }
        if (this.minWidth) {
          if (/%$/.test(this.minWidth)) {
            this.minWidth = (this.width * this.minWidth.replace('%', '')) / 100;
          } else {
            this.minWidth *= 1;
          }
        }
        if (this.minHeight) {
          if (/%$/.test(this.minHeight)) {
            this.minHeight = (this.height * this.minHeight.replace('%', '')) / 100;
          } else {
            this.minHeight *= 1;
          }
        }
        this.alphaFade = 0.4;
        this.gravity = options.gravity * 1 || 0.08;
        this.particleGap = options.particleGap * 1 || 3;
        this.particleSize = options.particleSize * 1 || 1;
        this.layerCount = options.layerCount * 1 || 1;
        this.depth = options.depth * 1 || 1;
        this.rotationDuration = options.rotationDuration * 1 || 0;
        this.growDuration = options.growDuration * 1 || 200;
        this.waitDuration = options.waitDuration * 1 || 200;
        this.shrinkDuration = options.shrinkDuration * 1 || 200;
        this.shrinkDistance = options.shrinkDistance * 1 || 50;
        this.threeDimensional = options.threeDimensional !== undefined && options.threeDimensional !== 'false' ? !!options.threeDimensional : false;
        this.lifeCycle = options.lifeCycle !== undefined && options.lifeCycle !== 'false' ? !!options.lifeCycle : false;
        this.layerDistance = options.layerDistance || this.particleGap;
        this.initPosition = options.initPosition || 'random';
        this.initDirection = options.initDirection || 'random';
        this.fadePosition = options.fadePosition || 'none';
        this.fadeDirection = options.fadeDirection || 'none';
        this.noise = isNaN(options.noise * 1) ? 10 : options.noise * 1;
        this.disableInteraction = options.disableInteraction;
        this.mouseForce = options.mouseForce * 1 || 30;
        this.clickStrength = options.clickStrength * 1 || 0;
        this.color = options.color;
        this.colorArr = options.colorArr || this.colorArr;
      }
  
      _initResponsive(options) {
        this.responsiveWidth = this.wrapperElement && options.responsiveWidth;
        if (this.responsiveWidth) {
          this.on('stopped', () => {
            this.width = this.wrapperElement.clientWidth;
            this.start();
          });
          this.wrapperElement.addEventListener('resize', () => {
            if (this.width !== this.wrapperElement.clientWidth) {
              this.stop();
            }
          });
          this.width = this.wrapperElement.clientWidth;
        }
      }
  
      _calculate() {
        this.vertices = this.renderer === 'webgl' ? [] : false;
  
        renderCount = 0;
        for (index = 0; index < this.particles.length; index++) {
          origin = this.origins[index];
          particle = this.particles[index];
          dX = origin.x - particle.x + (Math.random() - 0.5) * this.noise;
          dY = origin.y - particle.y + (Math.random() - 0.5) * this.noise;
          dZ = origin.z - particle.z + (Math.random() - 0.5) * this.noise / 1000;
          distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
          force = distance * 0.01;
          particle.vx += force * (dX / distance) * this.speed;
          particle.vy += force * (dY / distance) * this.speed;
          particle.vz += force * (dZ / distance) * this.speed;
          for (touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
            touch = this.touches[touchIndex];
            dX = particle.x - touch.x;
            dY = particle.y - touch.y;
            dZ = particle.z - touch.z;
            distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
            force = (this.mouseForce * touch.force) / distance;
            particle.vx += force * (dX / distance) * this.speed;
            particle.vy += force * (dY / distance) * this.speed;
            particle.vz += force * (dZ / distance) * this.speed;
          }
          particle.vx *= this.gravityFactor;
          particle.vy *= this.gravityFactor;
          particle.vz *= this.gravityFactor;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.z += particle.vz;
          if (0 > particle.x || particle.x >= this.width || 0 > particle.y || particle.y >= this.height) {
            particle.isHidden = true;
            if (this.state === 'stopping') {
              particle.isDead = true;
            }
          } else {
            if (this.state === 'stopping' && !particle.isDead) {
              renderCount++;
            }
            particle.isHidden = false;
          }
          if (this.vertices) {
            x = particle.x - this.width / 2;
            y = particle.y - this.height / 2;
            z = particle.z;
            a = origin.vertexColors[3];
            if (this.lifeCycle) {
              origin.tick += 1;
              if (origin.tick >= 0) {
                if (origin.tick < this.growDuration) {
                  a = a * (origin.tick / this.growDuration);
                  // z -= 50 * (tick / this.shrinkDuration);
                } else {
                  tick = origin.tick - this.growDuration - this.waitDuration;
                  if (tick >= 0 && tick <= this.shrinkDuration) {
                    touch = this.touches[touchIndex];
                    // rotationX = Math.PI / 2 + Math.cos(dX * Math.PI / 2) * dX * Math.PI * 0.1;
                    // rotationY = Math.PI / 2 + Math.cos(dY * Math.PI / 2) * dY * Math.PI * 0.1;
                    distance = Math.sqrt(x * x + y * y + (z - 50) * (z - 50));
                    // distance = Math.sqrt(x * x + y * y);
                    force = tick / this.shrinkDuration;
                    x += this.shrinkDistance * (x / distance) * force;
                    y += this.shrinkDistance * (y / distance) * force;
                    z += this.shrinkDistance * ((z - 50) / distance) * force;
                    a *= 1 - force;
                    if (tick === this.shrinkDuration) {
                      origin.tick = 0;
                    }
                  }
                }
              } else {
                a = 0;
              }
            }
            this.vertices.push(
              x,
              y,
              z,
              origin.vertexColors[0],
              origin.vertexColors[1],
              origin.vertexColors[2],
              a,
            );
          }
        }
        if (this.state === 'stopping' && renderCount === 0) {
          this.state = 'stopped';
        }
      }
  
      _defaultRenderer() {
        this.depth = Math.max(this.layerDistance * this.layerCount / 2, this.mouseForce);
        this.minZ = -this.depth;
        this.maxZ = this.depth;
        imageData = this.context.createImageData(this.width, this.height);
  
        for (index = 0; index < this.origins.length; index++) {
          origin = this.origins[index];
          particle = this.particles[index];
          if (!particle.isDead && !particle.isHidden) {
            x = ~~particle.x;
            y = ~~particle.y;
            a = origin.color[3];
            if (this.alphaFade > 0 && this.layerCount > 1) {
              z = Math.max(Math.min(particle.z, this.maxZ), this.minZ) - this.minZ;
              a = a * (1 - this.alphaFade) + (a * this.alphaFade * (z / (this.maxZ - this.minZ)));
              a = Math.max(Math.min(~~a, 255), 0);
            }
            startIndex = (x + y * this.width) * 4;
            imageData.data[startIndex + 0] = origin.color[0];
            imageData.data[startIndex + 1] = origin.color[1];
            imageData.data[startIndex + 2] = origin.color[2];
            imageData.data[startIndex + 3] = a;
          }
        }
        this.context.putImageData(imageData, 0, 0);
      }
  
      _initParticles() {
        this.particles = undefined;
        this.particles = [];
        for (index = 0; index < this.origins.length; index++) {
          origin = this.origins[index];
          particle = {};
          this._initParticlePosition(origin, particle);
          this._initParticleDirection(particle);
          this.particles.push(particle);
        }
      }
  
      _initParticlePosition(origin, particle) {
        particle.z = 0;
        switch (this.initPosition) {
          case 'random': {
            particle.x = Math.random() * this.width;
            particle.y = Math.random() * this.height;
            break;
          }
          case 'top': {
            particle.x = Math.random() * this.width * 3 - this.width;
            particle.y = -Math.random() * this.height;
            break;
          }
          case 'left': {
            particle.x = -Math.random() * this.width;
            particle.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          case 'bottom': {
            particle.x = Math.random() * this.width * 3 - this.width;
            particle.y = this.height + Math.random() * this.height;
            break;
          }
          case 'right': {
            particle.x = this.width + Math.random() * this.width;
            particle.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          case 'misplaced': {
            particle.x = origin.x + Math.random() * this.width * 0.3 - this.width * 0.1;
            particle.y = origin.y + Math.random() * this.height * 0.3 - this.height * 0.1;
            break;
          }
          default: {
            particle.x = origin.x;
            particle.y = origin.y;
          }
        }
      }
  
      _fade() {
        if (
          this.fadePosition === 'explode' ||
          this.fadePosition === 'top' ||
          this.fadePosition === 'left' ||
          this.fadePosition === 'bottom' ||
          this.fadePosition === 'right'
        ) {
          this.state = 'stopping';
        } else {
          this.state = 'stopped';
        }
        if (this.origins) {
          for (index = 0; index < this.origins.length; index++) {
            this._fadeOriginPosition(this.origins[index]);
            this._fadeOriginDirection(this.particles[index]);
          }
        }
      }
  
      _fadeOriginPosition(origin) {
        switch (this.fadePosition) {
          case 'random': {
            origin.x = Math.random() * this.width * 2 - this.width;
            origin.y = Math.random() * this.height * 2 - this.height;
            if (origin.x > 0) origin.x += this.width;
            if (origin.y > 0) origin.y += this.height;
            break;
          }
          case 'top': {
            origin.x = Math.random() * this.width * 3 - this.width;
            origin.y = -Math.random() * this.height;
            break;
          }
          case 'left': {
            origin.x = -Math.random() * this.width;
            origin.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          case 'bottom': {
            origin.x = Math.random() * this.width * 3 - this.width;
            origin.y = this.height + Math.random() * this.height;
            break;
          }
          case 'right': {
            origin.x = this.width + Math.random() * this.width;
            origin.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          default: {
            // Stay in place
          }
        }
      }
  
      _initParticleDirection(particle) {
        particle.vz = 0;
        switch (this.initDirection) {
          case 'random': {
            angle = Math.random() * Math.PI * 2;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'top': {
            angle = Math.random() * Math.PI - Math.PI / 2;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'left': {
            angle = Math.random() * Math.PI + Math.PI;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'bottom': {
            angle = Math.random() * Math.PI + Math.PI / 2;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'right': {
            angle = Math.random() * Math.PI;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          default: {
            particle.vx = 0;
            particle.vy = 0;
          }
        }
      }
  
      _fadeOriginDirection(particle) {
        switch (this.fadeDirection) {
          case 'random': {
            angle = Math.random() * Math.PI * 2;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'top': {
            angle = Math.random() * Math.PI - Math.PI / 2;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'left': {
            angle = Math.random() * Math.PI + Math.PI;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'bottom': {
            angle = Math.random() * Math.PI + Math.PI / 2;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case 'right': {
            angle = Math.random() * Math.PI;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          default: {
            particle.vx = 0;
            particle.vy = 0;
          }
        }
      }
  
      _initOrigins() {
        canvas = document.createElement('canvas');
        if (this.responsiveWidth) {
          this.width = this.wrapperElement.clientWidth;
        }
        this.ratio =
          Math.min(this.width, this.maxWidth || Number.POSITIVE_INFINITY) /
          Math.min(this.height, this.maxHeight || Number.POSITIVE_INFINITY);
        if (this.ratio < this.imageRatio) {
          this.renderWidth = ~~Math.min(
            this.width || Number.POSITIVE_INFINITY,
            this.minWidth || this.imageWidth || Number.POSITIVE_INFINITY,
            this.maxWidth || Number.POSITIVE_INFINITY
          );
          this.renderHeight = ~~(this.renderWidth / this.imageRatio);
        } else {
          this.renderHeight = ~~Math.min(
            this.height || Number.POSITIVE_INFINITY,
            this.minHeight || this.imageHeight || Number.POSITIVE_INFINITY,
            this.maxHeight || Number.POSITIVE_INFINITY
          );
          this.renderWidth = ~~(this.renderHeight * this.imageRatio);
        }
        this.offsetX = ~~((this.width - this.renderWidth) / 2)
        this.offsetY = ~~((this.height - this.renderHeight) / 2)
        canvas.width = this.renderWidth;
        canvas.height = this.renderHeight;
        context = canvas.getContext('2d');
        context.drawImage(this.image, 0, 0, this.renderWidth, this.renderHeight);
        data = context.getImageData(0, 0, this.renderWidth, this.renderHeight).data;
        this.origins = undefined;
        this.origins = [];
        const duration = this.growDuration + this.waitDuration + this.shrinkDuration;
        for (x = 0; x < this.renderWidth; x += this.particleGap) {
          for (y = 0; y < this.renderHeight; y += this.particleGap) {
            index = (x + y * this.renderWidth) * 4;
            a = data[index + 3];
            if (a > 0) {
              const seed = Math.random();
              tick = -Math.floor(seed * duration);
              if (this.colorArr) {
                for (layerIndex = 0; layerIndex < this.layerCount; layerIndex++) {
                  this.origins.push({
                    x: this.offsetX + x,
                    y: this.offsetY + y,
                    z: layerIndex * this.layerDistance + 50,
                    color: this.colorArr,
                    tick,
                    seed,
                    vertexColors: this.colorArr.map(c => c / 255),
                  });
                }
              } else {
                r = data[index];
                g = data[index + 1];
                b = data[index + 2];
                for (layerIndex = 0; layerIndex < this.layerCount; layerIndex++) {
                  this.origins.push({
                    x: this.offsetX + x,
                    y: this.offsetY + y,
                    z: layerIndex * this.layerDistance + 50,
                    color: [r, g, b, a],
                    tick,
                    seed,
                    vertexColors: [r / 255, g / 255, b / 255, a / 255],
                  });
                }
              }
            }
          }
        } 
        this.speed = Math.log(this.origins.length) / 10;
        this.gravityFactor = 1 - this.gravity * this.speed;
      }
  
      _parseColor(strParam) {
          let color;
        if (typeof(strParam) !== 'string') {
          return undefined;
        }
          const str = strParam.replace(' ', '');
  
          if (color = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(str)) {
              color = [parseInt(color[1], 16), parseInt(color[2], 16), parseInt(color[3], 16)];
          } else if (color = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(str)) {
              color = [parseInt(color[1], 16) * 17, parseInt(color[2], 16) * 17, parseInt(color[3], 16) * 17];
          } else if (color = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(str)) {
              color = [+color[1], +color[2], +color[3], +color[4]];
          } else if (color = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(str)) {
              color = [+color[1], +color[2], +color[3]];
          } else return undefined;
  
          return color;
      }
    }
  
    exports.NextParticle = NextParticle;
    const nextParticles = document.getElementsByClassName('next-particle');
    for (let nextParticleIndex = 0; nextParticleIndex < nextParticles.length; nextParticleIndex++) {
      const elem = nextParticles[nextParticleIndex];
      elem.nextParticle = new NextParticle(elem);
    }
  }(window));