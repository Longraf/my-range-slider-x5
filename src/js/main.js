let RangeSlider = require('./rangeslider');

let rr = new RangeSlider({
    Target       : document.querySelector('.wrapper'),
    MinValue     : 4000,
    MaxValue     : 75000,
    Values       : [6000, 65000],
    MinMaxVision : true,
    StepLength   : 100,
    // ScaleStep    : 500,
});

let rr2 = new RangeSlider({
    Target       : document.querySelector('.wrapper'),
    MinValue     : 1,
    MaxValue     : 15,
    Values       : [4, 6],
    MinMaxVision : true,
    StepLength   : 0.1,

});
let rr3 = new RangeSlider({
    Target       : document.querySelector('.wrapper'),
    MinValue     : 500,
    MaxValue     : 3700,
    Values       : [500, 3700],
    MinMaxVision : true,
    ScaleStep    : false,
    StepLength   : false,
});
let rr4 = new RangeSlider({
    Target       : document.querySelector('.wrapper'),
    MinValue     : 10000,
    MaxValue     : 1200000,
    Values       : [300000, 1100000],
    MinMaxVision : true,
    // StepLength   : 1,
});
let rr5 = new RangeSlider({
    Target       : document.querySelector('.wrapper'),
    MinValue     : 28,
    MaxValue     : 100,
    Values       : [34, 90],
    MinMaxVision : true,
    ScaleStep    : 1,
    StepLength   : 0.5,
});