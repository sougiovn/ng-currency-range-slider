(function NgCurrencyRangeSliderDemo() {
  'use strict';
  
  angular
    .module('demo', ['nggs.currency-range-slider'])
    .config(config)
    .controller('demoController', demoController);
  
  config.$inject = ['ngCurrencyRangeSliderConfigProvider'];
  
  function config(ngCurrencyRangeSliderConfig) {
    ngCurrencyRangeSliderConfig.setDefaults({
      inputEnter: true
    });
  }
  
  function demoController() {
    var self = this;
  
    self.basicSlider = {
      min: 0,
      max: 100,
      range: {
        min: 0,
        max: 100
      }
    }
  
    self.labelSlider = {
      min: 0,
      max: 100,
      labelPrefix: 'R$',
      range: {
        min: 0,
        max: 100
      }
    }
  
    self.coloredSlider = {
      min: 0,
      max: 100,
      labelPrefix: 'R$',
      range: {
        min: 0,
        max: 100
      },
      colors: {
        sliderBgColor: 'pink',
        sliderBoxShadowColor: 'darkred',
        highlightBgColor: 'lightblue',
        highlightBoxShadowColor: 'darkblue',
        viewerBgColor: 'darkgreen',
        viewerColor: 'lightgreen',
        viewerInputBottomBorder: 'yellow'
      }
    }
  
    self.changeSlider = {
      min: 0,
      max: 100,
      range: {
        min: 10,
        max: 89
      }
    }
    
    self.onRangeChange = function(range) {
      console.log('onRangeChange', range, self.changeSlider.range)
    }
  }
  
})();