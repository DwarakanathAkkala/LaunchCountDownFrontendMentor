let deadline = new Date("Feb 23, 2024 02:17:25").getTime();


// Getting current time in required format
let now = new Date().getTime();

// Calculating the difference
let t = deadline - now;

// Getting value of days, hours, minutes, seconds
let days = Math.floor(t / (1000 * 60 * 60 * 24));
let hours = Math.floor(
    (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor(
    (t % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor(
    (t % (1000 * 60)) / 1000);

console.log("Count Down", days, " Days ", hours, " Hours ", minutes, " and ", seconds, " seconds");
let daysStr = days.toString().padStart(2, "0");
let hoursStr = hours.toString().padStart(2, "0");
let minutesStr = minutes.toString().padStart(2, "0");
let secondsStr = seconds.toString().padStart(2, "0");

document.getElementById("daysElement").dataset.initValue = daysStr;
document.getElementById("hourElement").dataset.initValue = hoursStr;
document.getElementById("minuteElement").dataset.initValue = minutesStr;
document.getElementById("secondsElement").dataset.initValue = secondsStr;


// Create Countdown
var Countdown = {

    // Backbone-like structure
    $el: $('.countdown'),

    // Params
    countdown_interval: null,
    total_seconds: 0,

    // Initialize the countdown  
    init: function () {

        // DOM
        this.$ = {
            days: this.$el.find('.bloc-time.days .figure'),
            hours: this.$el.find('.bloc-time.hours .figure'),
            minutes: this.$el.find('.bloc-time.min .figure'),
            seconds: this.$el.find('.bloc-time.sec .figure')
        };

        // Init countdown values
        this.values = {
            days: this.$.days.parent().attr('data-init-value'),
            hours: this.$.hours.parent().attr('data-init-value'),
            minutes: this.$.minutes.parent().attr('data-init-value'),
            seconds: this.$.seconds.parent().attr('data-init-value'),
        };

        // Initialize total seconds
        this.total_seconds = this.values.days * 24 * 60 * 60 + this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

        // Animate countdown to the end 
        this.count();
    },

    count: function () {

        var that = this,
            $day_1 = this.$.days,
            $hour_1 = this.$.hours,
            $min_1 = this.$.minutes,
            $sec_1 = this.$.seconds;

        this.countdown_interval = setInterval(function () {

            if (that.total_seconds > 0) {

                --that.values.seconds;

                if (that.values.minutes >= 0 && that.values.seconds < 0) {

                    that.values.seconds = 59;
                    --that.values.minutes;
                }

                if (that.values.hours >= 0 && that.values.minutes < 0) {

                    that.values.minutes = 59;
                    --that.values.hours;
                }

                if (that.values.days >= 0 && that.values.hours < 0) {
                    that.values.hours = 23;
                    --that.values.days;
                }

                // Update DOM values
                // Days
                that.checkHour(that.values.days, $day_1);

                // Hours
                that.checkHour(that.values.hours, $hour_1);

                // Minutes
                that.checkHour(that.values.minutes, $min_1);

                // Seconds
                that.checkHour(that.values.seconds, $sec_1);

                --that.total_seconds;
            }
            else {
                clearInterval(that.countdown_interval);
            }
        }, 1000);
    },

    animateFigure: function ($el, value) {

        var that = this,
            $top = $el.find('.top'),
            $bottom = $el.find('.bottom'),
            $back_top = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');

        // Before we begin, change the back value
        $back_top.find('span').html(value);

        // Also change the back bottom value
        $back_bottom.find('span').html(value);

        // Then animate
        TweenMax.to($top, 0.8, {
            rotationX: '-180deg',
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function () {

                $top.html(value);

                $bottom.html(value);

                TweenMax.set($top, { rotationX: 0 });
            }
        });

        TweenMax.to($back_top, 0.8, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: 'all'
        });
    },

    checkHour: function (value, $el_1) {

        var val_1 = value.toString().padStart(2, "0"),
            fig_1_value = $el_1.find('.top').html().padStart(2, "0");

        // Animate only if the figure has changed
        if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
    }
};


Countdown.init();