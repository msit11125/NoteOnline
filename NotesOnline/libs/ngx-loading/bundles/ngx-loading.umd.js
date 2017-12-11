(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['ngx-loading'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

var LoadingConfig = (function () {
    /**
     * @param {?=} config
     */
    function LoadingConfig(config) {
        if (config === void 0) { config = {}; }
        this.backdropBorderRadius = config.backdropBorderRadius;
        this.backdropBackgroundColour = config.backdropBackgroundColour;
        this.fullScreenBackdrop = config.fullScreenBackdrop;
        this.animationType = config.animationType;
        this.primaryColour = config.primaryColour;
        this.secondaryColour = config.secondaryColour;
        this.tertiaryColour = config.tertiaryColour;
    }
    return LoadingConfig;
}());
var ANIMATION_TYPES = {
    chasingDots: 'chasing-dots',
    circle: 'sk-circle',
    circleSwish: 'circleSwish',
    cubeGrid: 'sk-cube-grid',
    doubleBounce: 'double-bounce',
    pulse: 'pulse',
    rectangleBounce: 'rectangle-bounce',
    rotatingPlane: 'rotating-plane',
    threeBounce: 'three-bounce',
    wanderingCubes: 'wandering-cubes'
};
var LoadingConfigService = (function () {
    /**
     * @param {?} config
     */
    function LoadingConfigService(config) {
        this.config = config;
        this.loadingConfig = config || new LoadingConfig();
    }
    return LoadingConfigService;
}());
LoadingConfigService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
LoadingConfigService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: ['loadingConfig',] },] },
]; };
var LoadingComponent = (function () {
    /**
     * @param {?} loadingConfigService
     */
    function LoadingComponent(loadingConfigService) {
        this.loadingConfigService = loadingConfigService;
        this.config = new LoadingConfig();
        this.ANIMATION_TYPES = ANIMATION_TYPES;
        this.loadingConfig = {
            animationType: '',
            backdropBackgroundColour: '',
            backdropBorderRadius: '',
            fullScreenBackdrop: false,
            primaryColour: '',
            secondaryColour: '',
            tertiaryColour: ''
        };
        this.defaultConfig = {
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.3)',
            backdropBorderRadius: '0px',
            fullScreenBackdrop: false,
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        };
    }
    /**
     * @return {?}
     */
    LoadingComponent.prototype.ngOnInit = function () {
        for (var /** @type {?} */ option in this.defaultConfig) {
            if (typeof this.loadingConfig[option] == "boolean") {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : false;
                if (this.loadingConfig[option] == false) {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ? this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            }
            else {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : '';
                if (this.loadingConfig[option] == '') {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ? this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            }
        }
    };
    /**
     * @param {?} animationType
     * @return {?}
     */
    LoadingComponent.prototype.getAnimationType = function (animationType) {
        var /** @type {?} */ animationTypeSet;
        switch (animationType) {
            case ANIMATION_TYPES.chasingDots:
                animationTypeSet = ANIMATION_TYPES.chasingDots;
                break;
            case ANIMATION_TYPES.circle:
                animationTypeSet = ANIMATION_TYPES.circle;
                break;
            case ANIMATION_TYPES.circleSwish:
                animationTypeSet = ANIMATION_TYPES.circleSwish;
                break;
            case ANIMATION_TYPES.cubeGrid:
                animationTypeSet = ANIMATION_TYPES.cubeGrid;
                break;
            case ANIMATION_TYPES.doubleBounce:
                animationTypeSet = ANIMATION_TYPES.doubleBounce;
                break;
            case ANIMATION_TYPES.pulse:
                animationTypeSet = ANIMATION_TYPES.pulse;
                break;
            case ANIMATION_TYPES.rectangleBounce:
                animationTypeSet = ANIMATION_TYPES.rectangleBounce;
                break;
            case ANIMATION_TYPES.rotatingPlane:
                animationTypeSet = ANIMATION_TYPES.rotatingPlane;
                break;
            case ANIMATION_TYPES.threeBounce:
                animationTypeSet = ANIMATION_TYPES.threeBounce;
                break;
            case ANIMATION_TYPES.wanderingCubes:
                animationTypeSet = ANIMATION_TYPES.wanderingCubes;
                break;
            default:
                animationTypeSet = ANIMATION_TYPES.threeBounce;
        }
        return animationTypeSet;
    };
    return LoadingComponent;
}());
LoadingComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ngx-loading',
                template: "\n        <div *ngIf=\"show\" class=\"backdrop\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\" [ngStyle]=\"{'border-radius': loadingConfig?.backdropBorderRadius, 'background-color': loadingConfig?.backdropBackgroundColour}\"></div>\n        <div *ngIf=\"show\">\n            <div class=\"spinner-circle\" *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.circle\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\" \n            [ngStyle]=\"{'border-top-color': loadingConfig?.secondaryColour, 'border-right-color': loadingConfig?.secondaryColour, 'border-bottom-color': loadingConfig?.secondaryColour, 'border-left-color': loadingConfig?.primaryColour}\"></div>\n\n            <div *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.cubeGrid\" class=\"sk-cube-grid\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"sk-cube sk-cube1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube2\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube3\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube4\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube5\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube6\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube7\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube8\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"sk-cube sk-cube9\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n            </div>\n\n            <div *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.threeBounce\" class=\"spinner-three-bounce\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"bounce1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"bounce2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n                <div class=\"bounce3\" [ngStyle]=\"{'background-color': loadingConfig?.tertiaryColour}\"></div>\n            </div>\n\n            <div class=\"spinner-sk-rotateplane\" *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rotatingPlane\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\"></div>\n\n            <div class=\"spinner-rectangle-bounce\" *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rectangleBounce\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"rect1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect2\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect3\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect4\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect5\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n            </div> \n\n            <div class=\"spinner-wandering-cubes\" *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.wanderingCubes\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"cube1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"cube2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n            </div>\n\n            <div class=\"spinner-double-bounce\" *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.doubleBounce\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"double-bounce1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"double-bounce2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n            </div>\n\n            <div class=\"spinner-pulse\" *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.pulse\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n\n            <div class=\"spinner-chasing-dots\" *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.chasingDots\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"dot1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"dot2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n            </div>\n\n            <div class=\"spinner-circle-swish\"*ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.circleSwish\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\" [ngStyle]=\"{'color': loadingConfig?.primaryColour}\"></div>\n\n        </div>\n    ",
                styles: [
                    "       \n            .backdrop {\n                z-index: 50;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background-color: rgba(0, 0, 0, 0.3);\n            }\n\n\n\n            /* Spinner Circle styles */\n\n            .spinner-circle,\n            .spinner-circle:after {\n                border-radius: 50%;\n                width: 10em;\n                height: 10em;\n            }\n\n            .spinner-circle {\n                font-size: 6px;\n                //text-indent: -9999em;\n                border-top: 1.1em solid rgba(255, 255, 255, 0.2);\n                border-right: 1.1em solid rgba(255, 255, 255, 0.2);\n                border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);\n                border-left: 1.1em solid #ffffff;\n\n                margin: auto;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n\n                -webkit-transform: translateZ(0);\n                -ms-transform: translateZ(0);\n                transform: translateZ(0);\n                -webkit-animation: load8 1.1s infinite linear;\n                animation: load8 1.1s infinite linear;\n            }\n            @-webkit-keyframes load8 {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n            @keyframes load8 {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n\n\n\n            /* Circle Swish styles */\n\n            .spinner-circle-swish {\n                font-size: 60px;\n                overflow: hidden;\n                width: 1em;\n                height: 1em;\n                z-index: 51;\n                font-size: 60px;\n                border-radius: 50%;\n                margin: auto;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n\n                -webkit-transform: translateZ(0);\n                -ms-transform: translateZ(0);\n                transform: translateZ(0);\n                -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;\n                animation: load6 1.7s infinite ease, round 1.7s infinite ease;\n              }\n              @-webkit-keyframes load6 {\n                0% {\n                  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n                }\n                5%,\n                95% {\n                  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n                }\n                10%,\n                59% {\n                  box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;\n                }\n                20% {\n                  box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;\n                }\n                38% {\n                  box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;\n                }\n                100% {\n                  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n                }\n              }\n              @keyframes load6 {\n                0% {\n                  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n                }\n                5%,\n                95% {\n                  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n                }\n                10%,\n                59% {\n                  box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;\n                }\n                20% {\n                  box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;\n                }\n                38% {\n                  box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;\n                }\n                100% {\n                  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n                }\n              }\n              @-webkit-keyframes round {\n                0% {\n                  -webkit-transform: rotate(0deg);\n                  transform: rotate(0deg);\n                }\n                100% {\n                  -webkit-transform: rotate(360deg);\n                  transform: rotate(360deg);\n                }\n              }\n              @keyframes round {\n                0% {\n                  -webkit-transform: rotate(0deg);\n                  transform: rotate(0deg);\n                }\n                100% {\n                  -webkit-transform: rotate(360deg);\n                  transform: rotate(360deg);\n                }\n              }\n\n\n\n            /* Cube Grid styles */\n\n            .sk-cube-grid { \n                width: 40px;\n                height: 40px;\n              \n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n            }\n              \n            .sk-cube-grid .sk-cube {\n                width: 33%;\n                height: 33%;\n                background-color: #333;\n                float: left;\n                -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;\n                animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; \n            }\n\n            .sk-cube-grid .sk-cube1 {\n                -webkit-animation-delay: 0.2s;\n                animation-delay: 0.2s; \n            }\n\n            .sk-cube-grid .sk-cube2 {\n                -webkit-animation-delay: 0.3s;\n                animation-delay: 0.3s; \n            }\n\n            .sk-cube-grid .sk-cube3 {\n                -webkit-animation-delay: 0.4s;\n                animation-delay: 0.4s; \n            }\n\n            .sk-cube-grid .sk-cube4 {\n                -webkit-animation-delay: 0.1s;\n                animation-delay: 0.1s; \n            }\n\n            .sk-cube-grid .sk-cube5 {\n                -webkit-animation-delay: 0.2s;\n                animation-delay: 0.2s; \n            }\n\n            .sk-cube-grid .sk-cube6 {\n                -webkit-animation-delay: 0.3s;\n                animation-delay: 0.3s; \n            }\n\n            .sk-cube-grid .sk-cube7 {\n                -webkit-animation-delay: 0s;\n                animation-delay: 0s; \n            }\n\n            .sk-cube-grid .sk-cube8 {\n                -webkit-animation-delay: 0.1s;\n                animation-delay: 0.1s; \n            }\n\n            .sk-cube-grid .sk-cube9 {\n                -webkit-animation-delay: 0.2s;\n                animation-delay: 0.2s; \n            }\n              \n            @-webkit-keyframes sk-cubeGridScaleDelay {\n                0%, 70%, 100% {\n                    -webkit-transform: scale3D(1, 1, 1);\n                    transform: scale3D(1, 1, 1);\n                } 35% {\n                    -webkit-transform: scale3D(0, 0, 1);\n                    transform: scale3D(0, 0, 1); \n                }\n            }\n              \n            @keyframes sk-cubeGridScaleDelay {\n                0%, 70%, 100% {\n                    -webkit-transform: scale3D(1, 1, 1);\n                    transform: scale3D(1, 1, 1);\n                } 35% {\n                    -webkit-transform: scale3D(0, 0, 1);\n                    transform: scale3D(0, 0, 1);\n                } \n            }\n\n\n\n            /* Double Bounce styles */\n\n            .spinner-double-bounce {\n                width: 40px;\n                height: 40px;\n              \n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n            }\n              \n            .double-bounce1, .double-bounce2 {\n                width: 100%;\n                height: 100%;\n                border-radius: 50%;\n                background-color: #333;\n                opacity: 0.6;\n                position: absolute;\n                top: 0;\n                left: 0;\n                \n                -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n                animation: sk-bounce 2.0s infinite ease-in-out;\n            }\n              \n            .double-bounce2 {\n                -webkit-animation-delay: -1.0s;\n                animation-delay: -1.0s;\n            }\n              \n            @-webkit-keyframes sk-bounce {\n                0%, 100% { -webkit-transform: scale(0.0) }\n                50% { -webkit-transform: scale(1.0) }\n            }\n              \n            @keyframes sk-bounce {\n                0%, 100% { \n                  transform: scale(0.0);\n                  -webkit-transform: scale(0.0);\n                } 50% { \n                  transform: scale(1.0);\n                  -webkit-transform: scale(1.0);\n                }\n            }\n\n\n\n            /* Pulse styles */\n\n            .spinner-pulse {\n                width: 40px;\n                height: 40px;\n                background-color: #333;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n              \n                border-radius: 100%;  \n                -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n                animation: sk-scaleout 1.0s infinite ease-in-out;\n            }\n              \n            @-webkit-keyframes sk-scaleout {\n                0% { -webkit-transform: scale(0) }\n                100% {\n                  -webkit-transform: scale(1.0);\n                  opacity: 0;\n                }\n            }\n              \n            @keyframes sk-scaleout {\n                0% { \n                  -webkit-transform: scale(0);\n                  transform: scale(0);\n                } 100% {\n                  -webkit-transform: scale(1.0);\n                  transform: scale(1.0);\n                  opacity: 0;\n                }\n            }\n\n\n\n            /* Three Bounce styles */\n\n            .spinner-three-bounce {\n                width: 70px;\n                text-align: center;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                height: 20px;\n                margin: auto;\n                z-index: 51;\n            }\n\n            .spinner-three-bounce > div {\n                width: 18px;\n                height: 18px;\n                background-color: #ffffff;\n\n                border-radius: 100%;\n                display: inline-block;\n                -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n                animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n            }\n\n            .spinner-three-bounce .bounce1 {\n                -webkit-animation-delay: -0.32s;\n                animation-delay: -0.32s;\n            }\n\n            .spinner-three-bounce .bounce2 {\n                -webkit-animation-delay: -0.16s;\n                animation-delay: -0.16s;\n            }\n\n            @-webkit-keyframes sk-bouncedelay {\n                0%, 80%, 100% { -webkit-transform: scale(0) }\n                40% { -webkit-transform: scale(1.0) }\n            }\n\n            @keyframes sk-bouncedelay {\n                0%, 80%, 100% { \n                    -webkit-transform: scale(0);\n                    transform: scale(0);\n                } 40% { \n                    -webkit-transform: scale(1.0);\n                    transform: scale(1.0);\n                }\n            }\n\n\n\n            /* Rotate Plane styles */\n\n            .spinner-sk-rotateplane {\n                width: 40px;\n                height: 40px;\n                background-color: #ffffff;\n                text-align: center;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n                -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;\n                animation: sk-rotateplane 1.2s infinite ease-in-out;\n            }\n\n            @-webkit-keyframes sk-rotateplane {\n                0% { -webkit-transform: perspective(120px) }\n                50% { -webkit-transform: perspective(120px) rotateY(180deg) }\n                100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }\n            }\n\n            @keyframes sk-rotateplane {\n                0% { \n                    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n                    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) \n                } 50% { \n                    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n                    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) \n                } 100% { \n                    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                }\n            }\n\n\n\n            /* Rectangle Bounce styles*/\n\n            .spinner-rectangle-bounce {\n                width: 50px;\n                height: 40px;\n                font-size: 10px;\n                text-align: center;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n            }\n\n            .spinner-rectangle-bounce > div {\n                background-color: #ffffff;\n                height: 100%;\n                width: 6px;\n                display: inline-block;\n                \n                -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n                animation: sk-stretchdelay 1.2s infinite ease-in-out;\n            }\n\n            .spinner-rectangle-bounce .rect2 {\n                -webkit-animation-delay: -1.1s;\n                animation-delay: -1.1s;\n            }\n\n            .spinner-rectangle-bounce .rect3 {\n                -webkit-animation-delay: -1.0s;\n                animation-delay: -1.0s;\n            }\n\n            .spinner-rectangle-bounce .rect4 {\n                -webkit-animation-delay: -0.9s;\n                animation-delay: -0.9s;\n            }\n\n            .spinner-rectangle-bounce .rect5 {\n                -webkit-animation-delay: -0.8s;\n                animation-delay: -0.8s;\n            }\n\n            @-webkit-keyframes sk-stretchdelay {\n                0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  \n                20% { -webkit-transform: scaleY(1.0) }\n            }\n\n            @keyframes sk-stretchdelay {\n                0%, 40%, 100% { \n                    transform: scaleY(0.4);\n                    -webkit-transform: scaleY(0.4);\n                }  20% { \n                    transform: scaleY(1.0);\n                    -webkit-transform: scaleY(1.0);\n                }\n            }\n\n\n\n            /* Wandering Cubes styles */\n\n            .spinner-wandering-cubes {\n                width: 60px;\n                height: 58px;\n                font-size: 10px;\n                text-align: center;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n            }\n\n            .cube1, .cube2 {\n                background-color: #ffffff;\n                width: 15px;\n                height: 15px;\n                position: absolute;\n                top: 0;\n                left: 0;\n                \n                -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;\n                animation: sk-cubemove 1.8s infinite ease-in-out;\n            }\n\n            .cube2 {\n                -webkit-animation-delay: -0.9s;\n                animation-delay: -0.9s;\n            }\n\n            @-webkit-keyframes sk-cubemove {\n                25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }\n                50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }\n                75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }\n                100% { -webkit-transform: rotate(-360deg) }\n            }\n\n            @keyframes sk-cubemove {\n                25% { \n                    transform: translateX(42px) rotate(-90deg) scale(0.5);\n                    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n                } 50% { \n                    transform: translateX(42px) translateY(42px) rotate(-179deg);\n                    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n                } 50.1% { \n                    transform: translateX(42px) translateY(42px) rotate(-180deg);\n                    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n                } 75% { \n                    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n                    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n                } 100% { \n                    transform: rotate(-360deg);\n                    -webkit-transform: rotate(-360deg);\n                }\n            }  \n            \n \n\n            /* Circle styles */\n            \n            .sk-circle {\n                width: 40px;\n                height: 40px;\n              \n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n              }\n              .sk-circle .sk-child {\n                width: 100%;\n                height: 100%;\n                position: absolute;\n                left: 0;\n                top: 0;\n              }\n              .sk-circle .sk-child:before {\n                content: '';\n                display: block;\n                margin: 0 auto;\n                width: 15%;\n                height: 15%;\n                background-color: #333;\n                border-radius: 100%;\n                -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;\n                        animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;\n              }\n              .sk-circle .sk-circle2 {\n                -webkit-transform: rotate(30deg);\n                    -ms-transform: rotate(30deg);\n                        transform: rotate(30deg); }\n              .sk-circle .sk-circle3 {\n                -webkit-transform: rotate(60deg);\n                    -ms-transform: rotate(60deg);\n                        transform: rotate(60deg); }\n              .sk-circle .sk-circle4 {\n                -webkit-transform: rotate(90deg);\n                    -ms-transform: rotate(90deg);\n                        transform: rotate(90deg); }\n              .sk-circle .sk-circle5 {\n                -webkit-transform: rotate(120deg);\n                    -ms-transform: rotate(120deg);\n                        transform: rotate(120deg); }\n              .sk-circle .sk-circle6 {\n                -webkit-transform: rotate(150deg);\n                    -ms-transform: rotate(150deg);\n                        transform: rotate(150deg); }\n              .sk-circle .sk-circle7 {\n                -webkit-transform: rotate(180deg);\n                    -ms-transform: rotate(180deg);\n                        transform: rotate(180deg); }\n              .sk-circle .sk-circle8 {\n                -webkit-transform: rotate(210deg);\n                    -ms-transform: rotate(210deg);\n                        transform: rotate(210deg); }\n              .sk-circle .sk-circle9 {\n                -webkit-transform: rotate(240deg);\n                    -ms-transform: rotate(240deg);\n                        transform: rotate(240deg); }\n              .sk-circle .sk-circle10 {\n                -webkit-transform: rotate(270deg);\n                    -ms-transform: rotate(270deg);\n                        transform: rotate(270deg); }\n              .sk-circle .sk-circle11 {\n                -webkit-transform: rotate(300deg);\n                    -ms-transform: rotate(300deg);\n                        transform: rotate(300deg); }\n              .sk-circle .sk-circle12 {\n                -webkit-transform: rotate(330deg);\n                    -ms-transform: rotate(330deg);\n                        transform: rotate(330deg); }\n              .sk-circle .sk-circle2:before {\n                -webkit-animation-delay: -1.1s;\n                        animation-delay: -1.1s; }\n              .sk-circle .sk-circle3:before {\n                -webkit-animation-delay: -1s;\n                        animation-delay: -1s; }\n              .sk-circle .sk-circle4:before {\n                -webkit-animation-delay: -0.9s;\n                        animation-delay: -0.9s; }\n              .sk-circle .sk-circle5:before {\n                -webkit-animation-delay: -0.8s;\n                        animation-delay: -0.8s; }\n              .sk-circle .sk-circle6:before {\n                -webkit-animation-delay: -0.7s;\n                        animation-delay: -0.7s; }\n              .sk-circle .sk-circle7:before {\n                -webkit-animation-delay: -0.6s;\n                        animation-delay: -0.6s; }\n              .sk-circle .sk-circle8:before {\n                -webkit-animation-delay: -0.5s;\n                        animation-delay: -0.5s; }\n              .sk-circle .sk-circle9:before {\n                -webkit-animation-delay: -0.4s;\n                        animation-delay: -0.4s; }\n              .sk-circle .sk-circle10:before {\n                -webkit-animation-delay: -0.3s;\n                        animation-delay: -0.3s; }\n              .sk-circle .sk-circle11:before {\n                -webkit-animation-delay: -0.2s;\n                        animation-delay: -0.2s; }\n              .sk-circle .sk-circle12:before {\n                -webkit-animation-delay: -0.1s;\n                        animation-delay: -0.1s; }\n              \n              @-webkit-keyframes sk-circleBounceDelay {\n                0%, 80%, 100% {\n                  -webkit-transform: scale(0);\n                          transform: scale(0);\n                } 40% {\n                  -webkit-transform: scale(1);\n                          transform: scale(1);\n                }\n              }\n              \n              @keyframes sk-circleBounceDelay {\n                0%, 80%, 100% {\n                  -webkit-transform: scale(0);\n                          transform: scale(0);\n                } 40% {\n                  -webkit-transform: scale(1);\n                          transform: scale(1);\n                }\n              }\n\n\n\n              /* Chasing Dots styles */\n\n              .spinner-chasing-dots {\n                width: 40px;\n                height: 40px;\n              \n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                margin: auto;\n                z-index: 51;\n                text-align: center;\n                \n                -webkit-animation: sk-rotate 2.0s infinite linear;\n                animation: sk-rotate 2.0s infinite linear;\n              }\n              \n              .dot1, .dot2 {\n                width: 60%;\n                height: 60%;\n                display: inline-block;\n                position: absolute;\n                top: 0;\n                background-color: #333;\n                border-radius: 100%;\n                \n                -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n                animation: sk-bounce 2.0s infinite ease-in-out;\n              }\n              \n              .dot2 {\n                top: auto;\n                bottom: 0;\n                -webkit-animation-delay: -1.0s;\n                animation-delay: -1.0s;\n              }\n              \n              @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}\n              @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}\n              \n              @-webkit-keyframes sk-bounce {\n                0%, 100% { -webkit-transform: scale(0.0) }\n                50% { -webkit-transform: scale(1.0) }\n              }\n              \n              @keyframes sk-bounce {\n                0%, 100% { \n                  transform: scale(0.0);\n                  -webkit-transform: scale(0.0);\n                } 50% { \n                  transform: scale(1.0);\n                  -webkit-transform: scale(1.0);\n                }\n              }\n\n            .full-screen {\n                position: fixed;\n            }\n        "
                ]
            },] },
];
/**
 * @nocollapse
 */
LoadingComponent.ctorParameters = function () { return [
    { type: LoadingConfigService, },
]; };
LoadingComponent.propDecorators = {
    'show': [{ type: core.Input },],
    'config': [{ type: core.Input },],
};
var LoadingModule = (function () {
    function LoadingModule() {
    }
    /**
     * @param {?} loadingConfig
     * @return {?}
     */
    LoadingModule.forRoot = function (loadingConfig) {
        return {
            ngModule: LoadingModule,
            providers: [{ provide: 'loadingConfig', useValue: loadingConfig }]
        };
    };
    return LoadingModule;
}());
LoadingModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                exports: [LoadingComponent],
                declarations: [LoadingComponent],
                providers: [LoadingConfigService],
            },] },
];
/**
 * @nocollapse
 */
LoadingModule.ctorParameters = function () { return []; };

exports.LoadingModule = LoadingModule;
exports.ANIMATION_TYPES = ANIMATION_TYPES;
exports.ɵb = LoadingComponent;
exports.ɵc = LoadingConfigService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-loading.umd.js.map
