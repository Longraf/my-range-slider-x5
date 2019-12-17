(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./rangeslider":2}],2:[function(require,module,exports){
module.exports = class rangeslider {
    static _createDOM(target, value1, value2, minValue, maxValue) { // Creates a DOM tree for the slider
        let slider  = document.createElement('div');
        slider.setAttribute('class', 'my-JSRS-rangeSlider rangeSlider5a4');
        slider.innerHTML = `<div class="JSRSrangeSlider">
                                <div class="JSRSvaluee min-value">${minValue}</div>
                                <div class="JSRSspace space-left">
                                    <div class="JSRSbuttonn min__button">
                                        <span class="JSRSrange__value range__value_left">${value1}</span>
                                    </div>
                                </div>
                                <div class="JSRSspace JSRSrange-line"></div>
                                <div class="JSRSspace space-right">
                                    <div class="JSRSbuttonn max__button">
                                        <span class="JSRSrange__value range__value_right">${value2}</span>
                                    </div>
                                </div>
                                <div class="JSRSvaluee max-value">${maxValue}</div>
                            </div>
                            <div class="JSRSscale">
                            </div>`;
        target.appendChild(slider);
        return slider
    }
    constructor({
                    Target       = null,
                    MinValue     = null,
                    MaxValue     = null,
                    Values       = [MinValue, MaxValue],
                    MinMaxVision = false,
                    ScaleStep    = false,
                    StepLength   = 1,
                })
    {
        let that = this;
        //
        this._Target        = rangeslider._createDOM(Target, Values[0], Values[1], MinValue, MaxValue, ScaleStep);

        this._MinValue      = MinValue;
        this._MaxValue      = MaxValue;
        this._Values        = Values;
        this._MinMaxVision  = MinMaxVision;
        this._ScaleStep     = ScaleStep;
        this._StepLength    = StepLength;
        this._Selectors     = {
            slider                  : this.Target,
            spaceLeft               : this.Target.querySelector('.space-left'),
            minButton               : this.Target.querySelector('.min__button'),
            rangeLine               : this.Target.querySelector('.JSRSrange-line'),
            maxButton               : this.Target.querySelector('.max__button'),
            spaceRight              : this.Target.querySelector('.space-right'),
            rangeValueLeft          : this.Target.querySelector('.range__value_left'),
            rangeValueRight         : this.Target.querySelector('.range__value_right'),
            positionLeftGlow        : (this.Values[0] - this.MinValue) / (this.MaxValue -this. MinValue),
            positionRightGlow       : (this.MaxValue - this.Values[1]) / (this.MaxValue - this.MinValue),
            MinValueSelect          : this.Target.querySelector('.min-value'),
            MaxValueSelect          : this.Target.querySelector('.max-value'),
            scale                   : this.Target.querySelector('.JSRSscale'),
            scaleSpan               : this.Target.querySelectorAll('.JSRSscale span'),
            scaleSpanP              : this.Target.querySelectorAll('.JSRSscale span p'),
        };
        this._startPosition = () => {
            let minButtonCoord = this._Selectors.spaceLeft.offsetWidth - this._Selectors.minButton.offsetWidth/2;
            let maxButtonCoord = this._Selectors.spaceRight.getBoundingClientRect().x - this._Selectors.slider.getBoundingClientRect().x - this._Selectors.minButton.offsetWidth/2;
            let coord = event.pageX - this._Selectors.slider.getBoundingClientRect().x;
            let center = (maxButtonCoord + minButtonCoord) / 2 ;
            if (coord < center) {
                document.addEventListener('mousemove', moveLeftSlider);
            } else {
                document.addEventListener('mousemove', moveRightSlider);
            }
            // this._validationCorrectData();
        };
        this._validationCorrectData = () => {
            if (this.MinValue === this.MaxValue) {
                console.warn(Error('MinValue can not be equal than MaxValue'));
            }
            if (this.MinValue > this.MaxValue) {
                [this.MinValue, this.MaxValue] = [this.MaxValue, this.MinValue];
                console.warn(Error('MinValue can not be greater than MaxValue'));
            }
            if (this.Values[0] < this.MinValue) {
                this.Values[0] = this.MinValue;
                console.warn('The value[0] can not be less than the MinValue and above the MaxValue');
            }
            if (this.Values[1] > this.MaxValue) {
                this.Values[1] = this.MaxValue;
                console.warn('The value[1] can not be less than the MinValue and above the MaxValue');
            }
            if (this.Values[1] < this.MinValue) {
                this.Values[1] = this.Values[0];
                console.warn('The value[1] can not be less than the MinValue and above the MaxValue');
            }
            if (this.Values[0] > this.Values[1] ) {
                this.Values[0] = this.Values[1];
                console.warn('Value[0] can not be greater than Value[1]');
            }
            this._recountFlexGlow();
        };
        this._recountFlexGlow = () => {
            this._Selectors.spaceLeft.style.flexGrow  = (this.Values[0] - this.MinValue) / (this.MaxValue -this.MinValue);
            this._Selectors.spaceRight.style.flexGrow = (this.MaxValue - this.Values[1]) / (this.MaxValue - this.MinValue);
            this._Selectors.rangeLine.style.flexGrow  = 1- this._Selectors.spaceLeft.style.flexGrow - this._Selectors.spaceRight.style.flexGrow;
            this._Selectors.rangeValueLeft.innerHTML  = this.Values[0];
            this._Selectors.rangeValueRight.innerHTML = this.Values[1];
            this._installRangeValueHTML();
        };
        this._installRangeValueHTML = () => {
            this._Selectors.rangeValueLeft.innerHTML  = this.Values[0];
            this._Selectors.rangeValueRight.innerHTML = Math.round((1 - this._Selectors.spaceRight.style.flexGrow ) * (this.MaxValue - this.MinValue)) + this.MinValue;
            let left  = this._Selectors.spaceLeft.style.flexGrow  * (this.MaxValue - this.MinValue) + this.MinValue ;
            let right = (1 - this._Selectors.spaceRight.style.flexGrow ) * (this.MaxValue - this.MinValue) + this.MinValue;
            this._Selectors.maxButton.style.transform = `translate(${-this._Selectors.maxButton.offsetWidth/2}px,0px)`;
            this._Selectors.minButton.style.transform = `translate(${this._Selectors.maxButton.offsetWidth/2}px,0px)`;
            if (this.StepLength % 1 === 0) {
                if (this.StepLength % 1000 === 0 && String(this.MaxValue).length > 5) {
                    left  = Math.round(left  / 1000) * 1000 ;
                    right = Math.round(right / 1000) * 1000;
                }
                left  = Math.round(left);
                right = Math.round(right);
            } else {
                left  = left.toFixed(String(this.StepLength).split('.')[1].length);
                right = right.toFixed(String(this.StepLength).split('.')[1].length);
            }
            if (this.MaxValue > 99999 ) {
                left = this._rounderExp(left, false);
                right = this._rounderExp(right, false);
            }
            this._Values = [left, right];
            let distanse = this._Selectors.rangeValueRight.getBoundingClientRect().x - this._Selectors.rangeValueLeft.getBoundingClientRect().x - this._Selectors.rangeValueLeft.offsetWidth ;
            //console.log(distanse);
            if (distanse < 10) {
                this._Selectors.rangeValueRight.style.border = '0px';
                if (left === right) {
                    this._Selectors.rangeValueLeft.innerHTML = this._rankNumber(left);
                } else {
                    this._Selectors.rangeValueLeft.innerHTML = this._rankNumber(left) + '-' + this._rankNumber(right);
                }
                this._Selectors.rangeValueRight.innerHTML = '';
            } else {
                this._Selectors.rangeValueRight.style.border = '';
                this._Selectors.rangeValueLeft.innerHTML  = this._rankNumber(left);
                this._Selectors.rangeValueRight.innerHTML = this._rankNumber(right);
            }
            let padding = this._Selectors.minButton.offsetWidth/2 + 2;
            if (this.minMaxVisibility) {
                this._Selectors.MinValueSelect.style.display = 'block';
                this._Selectors.MaxValueSelect.style.display = 'block';

                if (this._Selectors.spaceLeft.offsetWidth < this._Selectors.MinValueSelect.offsetWidth + padding) { // hidden MinValue left
                    this._Selectors.MinValueSelect.style.display = "none";
                } else {
                    this._Selectors.MinValueSelect.style.color = "";
                }
                if (this._Selectors.spaceRight.offsetWidth < this._Selectors.MaxValueSelect.offsetWidth + padding) { // hidden MaxValue right
                    this._Selectors.MaxValueSelect.style.display = "none";
                } else {
                    this._Selectors.MaxValueSelect.style.color = "";
                }
            } else {
                this._Selectors.MinValueSelect.style.display = 'none';
                this._Selectors.MaxValueSelect.style.display = 'none';
            }
            this._Selectors.MinValueSelect.innerHTML  = this._rankNumber(this.MinValue);
            this._Selectors.MaxValueSelect.innerHTML  = this._rankNumber(this.MaxValue);
            if (this._Selectors.minButton.getBoundingClientRect().x - this._Selectors.slider.getBoundingClientRect().x // Value[0]can not be to the left of the slider
                - (this._Selectors.rangeValueLeft.offsetWidth / 2 ) + this._Selectors.minButton.offsetWidth < 0 ){
                this._Selectors.rangeValueLeft.style.left = this._Selectors.slider.getBoundingClientRect().x
                    - this._Selectors.minButton.getBoundingClientRect().x + (this._Selectors.rangeValueLeft.offsetWidth / 2)  - this._Selectors.minButton.offsetWidth + 'px' ;
            } else {
                this._Selectors.rangeValueLeft.style.left = '';
            }
            if (this._Selectors.minButton.getBoundingClientRect().x - this._Selectors.slider.getBoundingClientRect().x
                + this._Selectors.minButton.offsetWidth + this._Selectors.rangeValueLeft.offsetWidth / 2 + this._Selectors.minButton.offsetWidth - this._Selectors.slider.offsetWidth > 0){ // Value[0] can not be to the right of the slider
                this._Selectors.rangeValueLeft.style.right = this._Selectors.minButton.getBoundingClientRect().x - this._Selectors.slider.getBoundingClientRect().x
                    + this._Selectors.minButton.offsetWidth + this._Selectors.rangeValueLeft.offsetWidth/2 - this._Selectors.slider.offsetWidth - this._Selectors.minButton.offsetWidth + 'px';
            } else {
                this._Selectors.rangeValueLeft.style.right = '';
            }
            //console.log(this._Selectors.rangeValueLeft.style.left);
            if (this._Selectors.maxButton.getBoundingClientRect().x - this._Selectors.slider.getBoundingClientRect().x // Value[1] can not be to the right of the slider
                + this._Selectors.maxButton.offsetWidth + this._Selectors.rangeValueRight.offsetWidth/2 + this._Selectors.minButton.offsetWidth> this._Selectors.slider.offsetWidth){
                this._Selectors.rangeValueRight.style.right = this._Selectors.maxButton.getBoundingClientRect().x - this._Selectors.slider.getBoundingClientRect().x
                    + this._Selectors.maxButton.offsetWidth + this._Selectors.rangeValueRight.offsetWidth/2 - this._Selectors.slider.offsetWidth - this._Selectors.minButton.offsetWidth + 'px';
            } else {
                this._Selectors.rangeValueRight.style.right = '';
            }
            this._dimensionScale(this.ScaleStep);
        };
        this._roundingToFive = (val) => {
            let rezult = val % 5;
            rezult && (val = val - rezult + 5);
            return val;
        };
        this._rankNumber = (e) => {
            return String(e).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        };
        this._rounderExp = (val, isEqualFive = true, coefficient = 1) => {
            //num = M * Math.pow(10, P)
            let lengthVal = String(this.MaxValue).length - 3 - coefficient;
            if (this.MaxValue < 20) {
                return val;
            }
            if (isEqualFive) {
                return Math.round( this._roundingToFive(val /  Math.pow(10, lengthVal))) *  Math.pow(10, lengthVal);
            } else {
                return Math.round( val /  Math.pow(10, lengthVal) ) *  Math.pow(10, lengthVal);
            }
        };
        this._fromValuesToFlex = (e) => (e - this.MinValue) / (this.MaxValue - this.MinValue);
        this._currentRoundstep = (val) => {
            val = val /that.StepLength;
            //let currentValueLeft = Math.round(val / that._Selectors.slider.offsetWidth * (that.MaxValue - that.MinValue)) + that.MinValue;
            let currentValueLeft = Math.round(val / that._Selectors.slider.offsetWidth * (that.MaxValue - that.MinValue)) * that.StepLength + that.MinValue;
            return (currentValueLeft - this.MinValue) / (this.MaxValue - this.MinValue)
        };
        function moveLeftSlider() {
            event.preventDefault();
            let coord = event.pageX - that._Selectors.slider.getBoundingClientRect().x;
            if (StepLength) {
                that._Selectors.spaceLeft.style.flexGrow = that._currentRoundstep(coord);
            } else {
                that._Selectors.spaceLeft.style.flexGrow = coord / that._Selectors.slider.offsetWidth;
            }
            let LeftGrow  = parseFloat(that._Selectors.spaceLeft.style.flexGrow);
            let RightGrow = parseFloat(that._Selectors.spaceRight.style.flexGrow);
            if  (coord <= 0) {
                that._Selectors.spaceLeft.style.flexGrow = 0;
            }
            if (LeftGrow + RightGrow < 1) {
                that._Selectors.rangeLine.style.flexGrow = 1 - LeftGrow - RightGrow;
            } else {
                that._Selectors.rangeLine.style.flexGrow = 0;
                that._Selectors.spaceLeft.style.flexGrow = 1- RightGrow;
            }
            that._installRangeValueHTML();
            // that.Values[0] = LeftGrow * that.MaxValue;
        }
        function moveRightSlider() {
            event.preventDefault();
            let coord = event.pageX - that._Selectors.slider.getBoundingClientRect().x;
            if (StepLength) {
                that._Selectors.spaceRight.style.flexGrow = 1 - that._currentRoundstep(coord) ;
            } else {
                that._Selectors.spaceRight.style.flexGrow = 1 - coord / that._Selectors.slider.offsetWidth
            }
            let LeftGrow  = parseFloat(that._Selectors.spaceLeft.style.flexGrow);
            let RightGrow = parseFloat(that._Selectors.spaceRight.style.flexGrow);
            if  (coord >= that._Selectors.slider.offsetWidth) {
                that._Selectors.spaceRight.style.flexGrow = 0;
            }
            if (1 - LeftGrow - RightGrow > 0) {
                that._Selectors.rangeLine.style.flexGrow = 1 - LeftGrow - RightGrow;
            } else {
                that._Selectors.rangeLine.style.flexGrow = 0;
                that._Selectors.spaceRight.style.flexGrow = 1 - LeftGrow;
            }
            that._installRangeValueHTML();
        }

        this._getSpanElementWidth = () => {
            let span    = document.createElement('span');
            span.setAttribute('class', 'span');
            let p       = document.createElement('p');
            p.innerHTML = this.MaxValue;
            span.appendChild(p);
            this._Selectors.scale.appendChild(span);
            let width = p.offsetWidth;
            span.remove();
            return width
        };
        this._dimensionScale = (step) => {
            this._Selectors.scaleSpan = this._Selectors.slider.querySelector('.JSRSscale span');
            let clone = this._Selectors.scale.cloneNode(false);
            this._Selectors.scale.remove();
            this._Selectors.scale = clone;
            this._Selectors.slider.appendChild(clone);
            if (step) {
                let maxStep = Math.floor(this._Selectors.slider.offsetWidth / (this._getSpanElementWidth() )) - 2;
                let currentSum = this.MinValue;
                let counter = step;
                while (MinValue + counter < MaxValue ) {
                    currentSum += step;
                    let span    = document.createElement('span');
                    span.setAttribute('class', 'span');
                    let p = document.createElement('p');
                    p.innerHTML = currentSum;
                    span.style.left = (this._Selectors.slider.offsetWidth * counter / (this.MaxValue - this.MinValue))  + 'px';
                    span.appendChild(p);
                    this._Selectors.scale.appendChild(span);
                    counter += step;
                }
                this._Selectors.scaleSpan = this._Selectors.slider.querySelectorAll('.JSRSscale span');
                this._Selectors.scaleSpanP = this._Selectors.slider.querySelectorAll('.JSRSscale span p');
                let coefficient = Math.floor(this._Selectors.scaleSpan.length / maxStep);
                if (this._Selectors.slider.offsetWidth < this._Selectors.scaleSpanP[this._Selectors.scaleSpanP.length-1].offsetWidth * this._Selectors.scaleSpanP.length * 1.5 ) {
                    for (let i = 0; i < this._Selectors.scaleSpan.length; i++ ) {
                        if (i % (coefficient + 1) === 0 ) {
                            this._Selectors.scaleSpan[i].querySelector('p').style.display = '';
                        } else {
                            this._Selectors.scaleSpan[i].querySelector('p').style.display = 'none';
                        }
                    }
                }
            } else {
                let maxStep = Math.floor(this._Selectors.slider.offsetWidth / (this._getSpanElementWidth() * 2)) - 2;
                if (maxStep  > 15 ) {
                    maxStep = 15;
                }
                if (maxStep  < 1) {
                    return
                }
                let step = this._rounderExp((this.MaxValue - this.MinValue) / maxStep , true, 0);
                let currentSum = this.MinValue;
                let counter = step;
                while (this.MinValue + counter  < this.MaxValue) {
                    currentSum += step;
                    let span = document.createElement('span');
                    span.setAttribute('class', 'span');
                    let p = document.createElement('p');
                    p.innerHTML = Math.round(this._rounderExp(currentSum, true, 0));
                    if (p.innerHTML >= this.MaxValue) {
                        return
                    }
                    span.style.left = this._Selectors.slider.offsetWidth * this._fromValuesToFlex(p.innerHTML) + 'px';
                    span.appendChild(p);
                    this._Selectors.scale.appendChild(span);
                    counter += step;
                }
            }
        };
        this._dimensionScale(this.ScaleStep);
        this._debounce = (func, wait, immediate) => {
            let timeout;
            return () => {
                const context = this, args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        that._Selectors.slider.addEventListener('mousedown' , this._startPosition);
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', moveRightSlider);
            document.removeEventListener('mousemove', moveLeftSlider);
        });
        window.addEventListener('resize', this._debounce(() => this._dimensionScale(this.ScaleStep), 200, false), false);
        this._validationCorrectData();
        this._recountFlexGlow();
    }
    get Target(){
        return this._Target;
    }
    set Target(v){
        this._Target = v;
    }
    get ValueLeft(){
        return this._Values[0];
    }
    set ValueLeft(v){
        this._Values[0] = v;
        this._validationCorrectData();

    }
    get ValueRight(){
        return this._Values[1];
    }
    set ValueRight(v){
        this._Values[1] = v;
        this._validationCorrectData();
    }
    get Values(){
        return this._Values;
    }
    set Values(array){
        if (!Array.isArray(array) || array.length !== 2 ) {
            console.warn('Only accepts an array and only two values');
            return
        }
        if (array[0] > array[1]) {
            [array[0], array[1]] = [array[1], array[0]];
            console.warn('Value[0] can not be greater than Value[1]');
        }
        this._Values = [array[0], array[1]];
        this._validationCorrectData();
    }
    get MinValue(){
        return this._MinValue;
    }
    set MinValue(v){
        this._MinValue = v;
        this._validationCorrectData();
    }
    get MaxValue(){
        return this._MaxValue;
    }
    set MaxValue(v){
        this._MaxValue = v;
        this._validationCorrectData();

    }
    get minMaxVisibility(){
        return this._MinMaxVision;
    }
    set minMaxVisibility(v){
        this._MinMaxVision = v;
        this._validationCorrectData();
    }
    get ScaleStep(){
        return this._ScaleStep;
    }
    set ScaleStep(v){
        this._ScaleStep = v;
        this._validationCorrectData();
    }
    get StepLength(){
        return this._StepLength;
    }
    set StepLength(v){
        this._StepLength = v;
        this._validationCorrectData();
    }
};
},{}]},{},[1])