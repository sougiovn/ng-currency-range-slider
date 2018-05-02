(function NgCurrencyRangeSlider() {
  'use strict';

  angular.module('nggs.currency-range-slider', [])
    .provider('ngCurrencyRangeSliderConfig', provider)
    .directive('ngCurrencyRangeSlider', directive);

  function provider() {
    var provider = this;

    provider.$get = function () {
      return provider;
    }

    var defaults = {
      colors: null,
      debounceTime: null,
      inputEnter: null,
      labelPrefix: null,
      limitToRange: null,
      min: null,
      max: null,
      range: null,
      valueFormatter: null,
      valueParser: null
    };

    provider.getDefaults = getDefaults;
    provider.setDefaults = setDefaults;

    function getDefaults(customConfig) {
      var config = {};

      Object.keys(defaults).forEach(function (key) {
        if (isNotNull(customConfig) && isNotNull(customConfig[key])) {
          config[key] = customConfig[key];
        } else if (isNotNull(defaults[key])) {
          config[key] = defaults[key];
        }
      });

      return config;
    }

    function setDefaults(config) {
      Object.keys(config).forEach(function (key) {
        defaults[key] = config[key];
      });
    }
  }

  directive.$inject = ['ngCurrencyRangeSliderConfig', '$timeout'];

  function directive(ngCurrencyRangeSliderConfig, $timeout) {
    return {
      restrict: 'E',
      scope: {
        colors: '=',
        debounceTime: '=',
        inputEnter: '=',
        labelPrefix: '=',
        limitToRange: '=',
        min: '=',
        max: '=',
        valueFormatter: '=',
        valueParser: '=',
        ngModel: '=',
        onRangeChange: '&'
      },
      link: ngCurrencyRangeSlider
    }

    function ngCurrencyRangeSlider($scope, $element, $attrs) {
      var config = {};
      var range;

      var rootElement = $element[0];

      var $ngModelMin, $ngModelMax;

      init();

      function init() {
        setupConfig();
        setupComponent();
        setupListeners();
        setupDestroy();
      }

      function setupComponent() {
        CurrencyRangeSlider(rootElement, ngCurrencyRangeSliderConfig.getDefaults(config));
      }

      function setupListeners() {
        $ngModelMin = $scope.$watch('ngModel.min', function (newValue) {
          if (isNotNull(newValue) && newValue != range.min) {
            range.min = +newValue;
            setRange();
          }
        });
        $ngModelMax = $scope.$watch('ngModel.max', function (newValue) {
          if (isNotNull(newValue) && newValue != range.max) {
            range.max = +newValue;
            setRange();
          }
        });
        rootElement.addEventListener('rangeChange', emitRangeChange, true);
      }

      function setupDestroy() {
        $element.on('$destroy', function () {
          if (destroy) {
            destroy();
          }
          $scope.$destroy();
        });

        $scope.$on('$destroy', function () {
          if (destroy) {
            destroy();
          }
        });
      }

      function destroy() {
        $ngModelMin();
        $ngModelMax();

        var destroyEvent = document.createEvent('Event');
        destroyEvent.initEvent('destroy', false, false);
        rootElement.dispatchEvent(destroyEvent);

        rootElement.removeEventListener('rangeChange', emitRangeChange, true);
      }

      function setRange() {
        var rangeChangeEvent = document.createEvent('CustomEvent');
        rangeChangeEvent.initCustomEvent('setRange', true, false, range);
        rootElement.dispatchEvent(rangeChangeEvent);
      }

      function emitRangeChange(event) {
        range = event.detail;

        $scope.onRangeChange({
          $event: {
            min: range.min,
            max: range.max
          }
        });

        $scope.ngModel = {
          min: range.min,
          max: range.max
        };

        $timeout(function () {
          $scope.$apply()
        });
      }

      function setupConfig() {
        if (isNotNull($scope.colors)) {
          config.colors = $scope.colors;
        }
        if (isNotNull($scope.debounceTime)) {
          config.debounceTime = $scope.debounceTime;
        }
        if (isNotNull($scope.inputEnter)) {
          config.inputEnter = $scope.inputEnter;
        }
        if (isNotNull($scope.labelPrefix)) {
          config.labelPrefix = $scope.labelPrefix;
        }
        if (isNotNull($scope.limitToRange)) {
          config.limitToRange = $scope.limitToRange;
        }
        if (isNotNull($scope.min)) {
          config.min = $scope.min;
        }
        if (isNotNull($scope.max)) {
          config.max = $scope.max;
        }
        if (isNotNull($scope.valueFormatter)) {
          config.valueFormatter = $scope.valueFormatter;
        }
        if (isNotNull($scope.valueParser)) {
          config.valueParser = $scope.valueParser;
        }
        if (isNotNull($scope.ngModel)) {
          range = {
            min: $scope.ngModel.min,
            max: $scope.ngModel.max
          }
        } else {
          range = {};
        }
      }
    }
  }

  function isNotNull(param) {
    return !isNull(param);
  }

  function isNull(param) {
    return param == null;
  }

  function isNotUndefined(param) {
    return typeof param !== 'undefined';
  }

})();
