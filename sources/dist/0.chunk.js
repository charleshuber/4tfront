webpackJsonpac__name_([0],{

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__periods_module__ = __webpack_require__(232);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PeriodsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__periods_module__["a"]; });



/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(74)

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_concat__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_concat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_concat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_authentication_service__ = __webpack_require__(48);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceService; });









var ResourceService = (function () {
    function ResourceService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.domain = 'http://localhost:8080/';
        //private domain = '/';
        this.servicesUrl = this.domain + '4TRest/services/';
        this.resourcesUrl = this.servicesUrl + 'resources'; // URL to web API
    }
    ResourceService.prototype.getAll = function () {
        return this.authenticate('get', this.getResourceUrl() + '/all', null, null);
    };
    ResourceService.prototype.create = function (resource) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]({ headers: headers });
        return this.authenticate('post', this.getResourceUrl(), resource, options);
    };
    ResourceService.prototype.read = function (id) {
        return this.authenticate('get', this.getResourceUrl() + '/' + id, null, null);
    };
    ResourceService.prototype.update = function (resource) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]({ headers: headers });
        return this.authenticate('put', this.getResourceUrl(), resource, options);
    };
    ResourceService.prototype.delete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]({ headers: headers });
        return this.authenticate('delete', this.getResourceUrl() + '/' + id, null, null);
    };
    ResourceService.prototype.authenticate = function (method, url, resource, options) {
        var service = this;
        var authentication = this.authService.authenticate(this.servicesUrl);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (obs) {
            authentication.subscribe(function (authorization) {
                if (!options) {
                    options = options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]();
                }
                if (!options.headers) {
                    options.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
                }
                options.headers.append('Authorization', authorization);
                var httpRequest = null;
                if (resource) {
                    httpRequest = service.http[method](url, resource, options)
                        .map(service.extractData)
                        .catch(service.handleError);
                }
                else {
                    httpRequest = service.http[method](url, options)
                        .map(service.extractData)
                        .catch(service.handleError);
                }
                httpRequest.subscribe(function (data) {
                    obs._next(data);
                }, function (e) { return obs._error(e); }, function () { return obs._complete(); });
            }, function (e) { return obs._error(e); }, function () { return obs._complete(); });
        });
    };
    ResourceService.prototype.getRootResourceUrl = function () {
        return this.resourcesUrl;
    };
    ResourceService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ResourceService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Response"]) {
            if (error.headers.has('validation-failed')) {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error.json());
            }
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return ResourceService;
}());
ResourceService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_8__auth_authentication_service__["a" /* AuthenticationService */]])
], ResourceService);



/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource_service__ = __webpack_require__(218);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompiledPeriodService; });



var CompiledPeriodService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](CompiledPeriodService, _super);
    function CompiledPeriodService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompiledPeriodService.prototype.getAllOfTimeline = function (tlid) {
        return this.authenticate('get', this.getResourceUrl() + '/timeline/' + tlid, null, null);
    };
    CompiledPeriodService.prototype.getResourceUrl = function () {
        return this.getRootResourceUrl() + '/compiledPeriod';
    };
    return CompiledPeriodService;
}(__WEBPACK_IMPORTED_MODULE_2__resource_service__["a" /* ResourceService */]));
CompiledPeriodService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
], CompiledPeriodService);



/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource_service__ = __webpack_require__(218);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelineService; });



var TimelineService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](TimelineService, _super);
    function TimelineService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineService.prototype.addCPPR = function (tlId, cpprId) {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/add/compiledPeriod/' + cpprId, null, null);
    };
    TimelineService.prototype.removeCPPR = function (tlId, cpprId) {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/remove/compiledPeriod/' + cpprId + '', null, null);
    };
    TimelineService.prototype.addCRPR = function (tlId, crprId) {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/add/cronPeriod/' + crprId, null, null);
    };
    TimelineService.prototype.removeCRPR = function (tlId, crprId) {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/remove/cronPeriod/' + crprId, null, null);
    };
    TimelineService.prototype.addPeriod = function (tlId, periodId) {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/add/period/' + periodId, null, null);
    };
    TimelineService.prototype.removePeriod = function (tlId, periodId) {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/remove/period/' + periodId, null, null);
    };
    TimelineService.prototype.getResourceUrl = function () {
        return this.getRootResourceUrl() + '/timeline';
    };
    return TimelineService;
}(__WEBPACK_IMPORTED_MODULE_2__resource_service__["a" /* ResourceService */]));
TimelineService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
], TimelineService);



/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeUnit; });
/* unused harmony export TimeUnitUtils */
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["MINUTE"] = 1] = "MINUTE";
    TimeUnit[TimeUnit["HOUR"] = 2] = "HOUR";
    TimeUnit[TimeUnit["DAY"] = 3] = "DAY";
    TimeUnit[TimeUnit["WEEK"] = 4] = "WEEK";
    TimeUnit[TimeUnit["MONTH"] = 5] = "MONTH";
    TimeUnit[TimeUnit["YEAR"] = 6] = "YEAR";
})(TimeUnit || (TimeUnit = {}));
var TimeUnitUtils;
(function (TimeUnitUtils) {
    function toString(unit) {
        return TimeUnit[unit];
    }
    TimeUnitUtils.toString = toString;
    function parse(unit) {
        return TimeUnit[unit];
    }
    TimeUnitUtils.parse = parse;
    /*
    export function parse(unit: number): TimeUnit{
      switch(unit){
        case 1: return TimeUnit.MINUTE;
        case 2: return TimeUnit.HOUR;
        case 3: return TimeUnit.DAY;
        case 4: return TimeUnit.WEEK;
        case 5: return TimeUnit.MONTH;
        case 6: return TimeUnit.YEAR;
      }
      return null;
    }
    */
})(TimeUnitUtils || (TimeUnitUtils = {}));


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fd829846fc6cb67a4d3b8ee524f74ce6.svg";

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3789f78639d9110088a431f75a5d8561.svg";

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(470)

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rest_resources_cppr_compiledperiod_service__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rest_resources_cppr_compiledperiod__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rest_resources_timeline_timeline_service__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rest_resources_timeline_timeline__ = __webpack_require__(230);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeriodComponent; });








var PeriodComponent = (function () {
    function PeriodComponent(route, router, location, cpprService, tlService) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.cpprService = cpprService;
        this.tlService = tlService;
        this.period = new __WEBPACK_IMPORTED_MODULE_5__rest_resources_cppr_compiledperiod__["a" /* CompiledPeriod */]();
    }
    PeriodComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .queryParams
            .subscribe(function (params) {
            _this.id = +params['id'] || null;
            _this.getPeriod(null);
        });
    };
    PeriodComponent.prototype.getPeriod = function (successCallback) {
        if (this.id) {
            this.loadPeriod();
        }
        else {
            this.createPeriod("period-" + new Date().getTime());
        }
    };
    PeriodComponent.prototype.savePeriod = function () {
        if (this.id) {
            var thiz_1 = this;
            this.cpprService.update(this.period).subscribe(function (newOne) {
                thiz_1.id = newOne.id;
                thiz_1.period = newOne;
            });
        }
        else {
            if (this.period.name && this.period.name.length > 0) {
                this.createPeriod(this.period.name);
            }
        }
    };
    PeriodComponent.prototype.loadPeriod = function () {
        var thiz = this;
        this.cpprService.read(this.id).subscribe(function (period) {
            thiz.period = period;
        });
    };
    PeriodComponent.prototype.createPeriod = function (name) {
        var thiz = this;
        var newCppr = new __WEBPACK_IMPORTED_MODULE_5__rest_resources_cppr_compiledperiod__["a" /* CompiledPeriod */]();
        newCppr.name = name;
        this.cpprService.create(newCppr).subscribe(function (newOne) {
            thiz.id = newOne.id;
            thiz.period = newOne;
        });
    };
    PeriodComponent.prototype.createTimeline = function () {
        var thiz = this;
        var newTimeline = new __WEBPACK_IMPORTED_MODULE_7__rest_resources_timeline_timeline__["a" /* Timeline */]();
        newTimeline.name = "Timeline-" + new Date().getTime();
        this.tlService.create(newTimeline).subscribe(function (newOne) {
            thiz.goToTimeline(newOne.id);
        });
    };
    PeriodComponent.prototype.deletePeriod = function () {
        var thiz = this;
        return this.cpprService.delete(this.id)
            .subscribe(function (period) {
            thiz.back();
        }, function (error) { });
    };
    PeriodComponent.prototype.goToTimeline = function (timelineId) {
        this.router.navigate(['/periods/timeline-detail', timelineId]);
    };
    PeriodComponent.prototype.back = function () {
        this.location.back();
    };
    return PeriodComponent;
}());
PeriodComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'period',
        template: __webpack_require__(249),
        styles: [__webpack_require__(254)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"],
        __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
        __WEBPACK_IMPORTED_MODULE_4__rest_resources_cppr_compiledperiod_service__["a" /* CompiledPeriodService */],
        __WEBPACK_IMPORTED_MODULE_6__rest_resources_timeline_timeline_service__["a" /* TimelineService */]])
], PeriodComponent);



/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rest_resources_cppr_compiledperiod_service__ = __webpack_require__(219);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeriodsComponent; });





var PeriodsComponent = (function () {
    function PeriodsComponent(cpprService, router, location) {
        this.cpprService = cpprService;
        this.router = router;
        this.location = location;
    }
    PeriodsComponent.prototype.ngOnInit = function () {
        this.getPeriods(null);
    };
    PeriodsComponent.prototype.getPeriods = function (successCallback) {
        var thiz = this;
        return this.cpprService.getAll()
            .subscribe(function (periods) {
            thiz.periods = periods;
            if (successCallback) {
                successCallback();
            }
        }, function (error) { });
    };
    PeriodsComponent.prototype.deletePeriod = function (id) {
        var thiz = this;
        return this.cpprService.delete(id)
            .subscribe(function (period) {
            thiz.getPeriods(null);
        }, function (error) { });
    };
    PeriodsComponent.prototype.goToPeriod = function (id) {
        this.router.navigate(['/periods/details'], { queryParams: { id: id } });
    };
    PeriodsComponent.prototype.back = function () {
        this.location.back();
    };
    return PeriodsComponent;
}());
PeriodsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'periods',
        template: __webpack_require__(250),
        styles: [__webpack_require__(255)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__rest_resources_cppr_compiledperiod_service__["a" /* CompiledPeriodService */],
        __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"]])
], PeriodsComponent);



/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rest_resources_timeline_timeline_service__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rest_resources_timeline_timeline__ = __webpack_require__(230);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelineComponent; });






var TimelineComponent = (function () {
    function TimelineComponent(route, router, location, tlService) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.tlService = tlService;
        this.timeline = new __WEBPACK_IMPORTED_MODULE_5__rest_resources_timeline_timeline__["a" /* Timeline */]();
    }
    TimelineComponent.prototype.ngOnInit = function () {
        var thiz = this;
        this.route.params.subscribe(function (params) {
            thiz.id = +params['id'] || null;
            thiz.getTimeline(null);
        });
    };
    TimelineComponent.prototype.getTimeline = function (successCallback) {
        if (this.id) {
            this.loadTimeline();
        }
    };
    TimelineComponent.prototype.saveTimeline = function () {
        if (this.id) {
            var thiz_1 = this;
            this.tlService.update(this.timeline).subscribe(function (newOne) {
                thiz_1.id = newOne.id;
                thiz_1.timeline = newOne;
            });
        }
        else {
            if (this.timeline.name && this.timeline.name.length > 0) {
                this.createTimeline(this.timeline.name);
            }
        }
    };
    TimelineComponent.prototype.loadTimeline = function () {
        var thiz = this;
        this.tlService.read(this.id).subscribe(function (Timeline) {
            thiz.timeline = Timeline;
        });
    };
    TimelineComponent.prototype.createTimeline = function (name) {
        var thiz = this;
        var newTl = new __WEBPACK_IMPORTED_MODULE_5__rest_resources_timeline_timeline__["a" /* Timeline */]();
        newTl.name = name;
        this.tlService.create(newTl).subscribe(function (newOne) {
            thiz.id = newOne.id;
            thiz.timeline = newOne;
        });
    };
    TimelineComponent.prototype.deleteTimeline = function () {
        var thiz = this;
        return this.tlService.delete(this.id)
            .subscribe(function (timeline) {
            thiz.back();
        }, function (error) { });
    };
    TimelineComponent.prototype.back = function () {
        this.location.back();
    };
    return TimelineComponent;
}());
TimelineComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'timeline',
        template: __webpack_require__(251),
        styles: [__webpack_require__(256)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"],
        __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
        __WEBPACK_IMPORTED_MODULE_4__rest_resources_timeline_timeline_service__["a" /* TimelineService */]])
], TimelineComponent);



/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resource; });
var Resource = (function () {
    function Resource() {
    }
    return Resource;
}());



/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resource__ = __webpack_require__(229);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timeline; });


var Timeline = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](Timeline, _super);
    function Timeline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Timeline;
}(__WEBPACK_IMPORTED_MODULE_1__resource__["a" /* Resource */]));



/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__periods_routes__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__periods_component__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__period_component__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__timeline_timeline_component__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__timegrid_timegrid_component__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_rest_resources_cppr_compiledperiod_service__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_rest_resources_timeline_timeline_service__ = __webpack_require__(220);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeriodsModule; });













var PeriodsModule = (function () {
    function PeriodsModule() {
    }
    return PeriodsModule;
}());
PeriodsModule.routes = __WEBPACK_IMPORTED_MODULE_6__periods_routes__["a" /* routes */];
PeriodsModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"])({
        declarations: [
            // Components / Directives/ Pipes
            __WEBPACK_IMPORTED_MODULE_7__periods_component__["a" /* PeriodsComponent */],
            __WEBPACK_IMPORTED_MODULE_8__period_component__["a" /* PeriodComponent */],
            __WEBPACK_IMPORTED_MODULE_9__timeline_timeline_component__["a" /* TimelineComponent */],
            __WEBPACK_IMPORTED_MODULE_10__timegrid_timegrid_component__["a" /* TimegridComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["JsonpModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["RouterModule"].forChild(__WEBPACK_IMPORTED_MODULE_6__periods_routes__["a" /* routes */]),
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_11_app_rest_resources_cppr_compiledperiod_service__["a" /* CompiledPeriodService */], __WEBPACK_IMPORTED_MODULE_12_app_rest_resources_timeline_timeline_service__["a" /* TimelineService */]]
    })
], PeriodsModule);



/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__periods_component__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__period_component__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timeline_timeline_component__ = __webpack_require__(227);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });



var routes = [
    { path: '', children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_0__periods_component__["a" /* PeriodsComponent */] },
            { path: 'details', component: __WEBPACK_IMPORTED_MODULE_1__period_component__["a" /* PeriodComponent */] },
            { path: 'timeline-detail/:id', component: __WEBPACK_IMPORTED_MODULE_2__timeline_timeline_component__["a" /* TimelineComponent */] }
        ] },
];


/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resource__ = __webpack_require__(229);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompiledPeriod; });


var CompiledPeriod = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](CompiledPeriod, _super);
    function CompiledPeriod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CompiledPeriod;
}(__WEBPACK_IMPORTED_MODULE_1__resource__["a" /* Resource */]));



/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timeunit__ = __webpack_require__(221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateUtils; });

var DateUtils;
(function (DateUtils) {
    function trunc(date, unit) {
        var newDate = new Date(date.getTime());
        switch (unit) {
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].YEAR: newDate.setMonth(0);
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH: newDate.setDate(1);
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].WEEK:
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY: newDate.setHours(0);
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR: newDate.setMinutes(0);
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MINUTE:
                newDate.setSeconds(0);
                newDate.setMilliseconds(0);
        }
        return newDate;
    }
    DateUtils.trunc = trunc;
    function increment(date, unit) {
        var newDate = new Date(date.getTime());
        switch (unit) {
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].YEAR:
                newDate.setFullYear(date.getFullYear() + 1);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH:
                newDate.setMonth(date.getMonth() + 1);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].WEEK:
                newDate.setDate(date.getDate() + 8);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY:
                newDate.setDate(date.getDate() + 1);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR: newDate.setHours(date.getHours() + 1);
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MINUTE: newDate.setMinutes(date.getMinutes() + 1);
        }
        return newDate;
    }
    DateUtils.increment = increment;
    function formatDate(date, pattern) {
        var minPattern = pattern.replace(/mm/g, '' + on2Digits(date.getMinutes()));
        var hrPattern = minPattern.replace(/hh/g, '' + on2Digits(date.getHours()));
        var dyPattern = hrPattern.replace(/dd/g, '' + on2Digits(date.getDate()));
        var wkPattern = dyPattern.replace(/ww/g, '' + on2Digits(date.getDate()));
        var mtPattern = wkPattern.replace(/MM/g, '' + on2Digits(date.getMonth() + 1));
        var fullYearPattern = mtPattern.replace(/yyyy/g, '' + date.getFullYear());
        var yearPattern = fullYearPattern.replace(/yy/g, '' + truncFullYear(date));
        return yearPattern;
    }
    DateUtils.formatDate = formatDate;
    function on2Digits(digit) {
        return digit < 10 ? '0' + digit : '' + digit;
    }
    function truncFullYear(date) {
        var fullyear = '' + date.getFullYear();
        return fullyear.substring(fullyear.length - 2, fullyear.length);
    }
})(DateUtils || (DateUtils = {}));


/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timeunit__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dateutils__ = __webpack_require__(237);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridBuilder; });


var GridBuilder = (function () {
    function GridBuilder(targetId, unit, range, start, end, date, maxresolution) {
        this.timegridColClass = 'timegrid-col';
        this.grid = null;
        this.grid = document.getElementById(targetId);
        this._unit = unit;
        this._range = range;
        this._start = start;
        this._end = end;
        this._date = date;
        this._maxresolution = maxresolution;
    }
    GridBuilder.prototype.render = function () {
        this.renderRowGrid(this.grid, this._unit);
    };
    GridBuilder.prototype.renderRowGrid = function (parent, unit) {
        this.emptyElement(parent);
        var row = document.createElement('div');
        parent.appendChild(row);
        var rowsize = 0;
        switch (unit) {
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MINUTE:
                rowsize = this._range.asMinutes;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR:
                rowsize = this._range.asHours;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY:
                rowsize = this._range.asDays;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].WEEK:
                rowsize = this._range.asWeeks;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH:
                rowsize = this._range.asMonths;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].YEAR: rowsize = this._range.asYears;
        }
        this.renderColumns(row, unit, rowsize, 0);
    };
    GridBuilder.prototype.renderColumns = function (target, unit, rowsize, level) {
        var currentDate = __WEBPACK_IMPORTED_MODULE_1__dateutils__["a" /* DateUtils */].trunc(this._start, this._unit);
        var classes = this.getClasses(unit);
        var rowClass = classes[0];
        var cellClass = classes[1];
        var columns = this.renderGridColumns(target, rowsize, currentDate, unit, level, cellClass);
        var childUnit = this.child(unit);
        if (childUnit) {
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                var columnDate = new Date(parseInt(column.getAttribute('data-date')));
                var childNumber = this.childElementsNumber(unit, columnDate);
                var width = Math.trunc(column.offsetWidth / this._maxresolution);
                if (width > childNumber) {
                    var content = column.querySelector('.timegrid-col-content');
                    var innerContent = document.createElement('div');
                    content.appendChild(innerContent);
                    this.renderColumns(innerContent, childUnit, childNumber, level + 1);
                }
            }
        }
        target.classList.add('timegrid-row');
        target.classList.add('timegrid-row-' + level);
        target.classList.add(rowClass);
        target.classList.add(rowClass + '-' + level);
    };
    GridBuilder.prototype.renderGridColumns = function (target, rowsize, currentDate, unit, level, colClass) {
        var columns = [];
        for (var i = 0; i < rowsize; i++) {
            var column = document.createElement('div');
            target.appendChild(column);
            column.classList.add(colClass);
            column.classList.add(colClass + '-' + level);
            column.classList.add(this.timegridColClass);
            column.classList.add(this.timegridColClass + '-' + level);
            column.setAttribute('data-date', '' + currentDate.getTime());
            column.setAttribute('data-date-formatted', '' + __WEBPACK_IMPORTED_MODULE_1__dateutils__["a" /* DateUtils */].formatDate(currentDate, 'dd/MM/yyyy hh:mm'));
            this.renderTimeGridColumn(column, currentDate, unit, level);
            columns.push(column);
            currentDate = __WEBPACK_IMPORTED_MODULE_1__dateutils__["a" /* DateUtils */].increment(currentDate, unit);
        }
        return columns;
    };
    GridBuilder.prototype.renderTimeGridColumn = function (target, date, unit, level) {
        var isReference = __WEBPACK_IMPORTED_MODULE_1__dateutils__["a" /* DateUtils */].trunc(this._date, this._unit).getTime() === __WEBPACK_IMPORTED_MODULE_1__dateutils__["a" /* DateUtils */].trunc(date, this._unit).getTime();
        if (isReference) {
            target.classList.add('timegrid-col-reference');
        }
        var content = document.createElement('div');
        content.classList.add('timegrid-col-content');
        content.classList.add('timegrid-col-content-' + level);
        content.setAttribute('data-date', '' + date.getTime());
        content.setAttribute('data-date-formatted', '' + date);
        var labelCell = document.createElement('div');
        labelCell.classList.add('timegrid-col-label');
        labelCell.classList.add('timegrid-col-label-' + level);
        target.appendChild(content);
        target.appendChild(labelCell);
        this.printLabel(labelCell, date, unit, level);
        return false;
    };
    GridBuilder.prototype.getClasses = function (unit) {
        switch (unit) {
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MINUTE: return ['timegrid-row-minutes', 'timegrid-col-minute'];
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR: return ['timegrid-row-hours', 'timegrid-col-hour'];
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY: return ['timegrid-row-days', 'timegrid-col-day'];
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].WEEK: return ['timegrid-row-weeks', 'timegrid-col-week'];
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH: return ['timegrid-row-months', 'timegrid-col-month'];
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].YEAR: return ['timegrid-row-years', 'timegrid-col-year'];
        }
        return ['', ''];
    };
    GridBuilder.prototype.printLabel = function (labelCell, date, unit, level) {
        switch (unit) {
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MINUTE:
                this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm']);
                return;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR:
                this.printLabelWithPatterns(labelCell, date, level, ['dd/MM hh:00', 'hh']);
                return;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY:
                this.printLabelWithPatterns(labelCell, date, level, ['dd/MM/yy', 'dd-MM']);
                return;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].WEEK:
                this.printLabelWithPatterns(labelCell, date, level, ['dd/MM/yy', 'dd-MM']);
                return;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH:
                this.printLabelWithPatterns(labelCell, date, level, ['MM-yyyy', 'MM']);
                return;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].YEAR:
                this.printLabelWithPatterns(labelCell, date, level, ['yyyy']);
                return;
        }
    };
    GridBuilder.prototype.printLabelWithPatterns = function (labelCell, date, level, patterns) {
        var startWidth = labelCell.offsetWidth;
        if (level < patterns.length) {
            var formatted = __WEBPACK_IMPORTED_MODULE_1__dateutils__["a" /* DateUtils */].formatDate(date, patterns[level]);
            labelCell.innerHTML = formatted;
        }
    };
    GridBuilder.prototype.childElementsNumber = function (unit, date) {
        switch (unit) {
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MINUTE: return 0;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR: return 60;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY: return 24;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].WEEK: return 7;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH: return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].YEAR: return 12;
        }
    };
    GridBuilder.prototype.child = function (unit) {
        switch (unit) {
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR: return __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MINUTE;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY: return __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].HOUR;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].WEEK: return __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH: return __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].DAY;
            case __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].YEAR: return __WEBPACK_IMPORTED_MODULE_0__timeunit__["a" /* TimeUnit */].MONTH;
        }
        return null;
    };
    GridBuilder.prototype.emptyElement = function (element) {
        if (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    };
    return GridBuilder;
}());



/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timerange__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timeunit__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gridbuilder__ = __webpack_require__(238);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimegridComponent; });
/* unused harmony export ALIGN */





var TimegridComponent = (function () {
    function TimegridComponent() {
        this.timeunits = __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */];
        this._unit = __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].DAY;
        this._size = 1;
        this._target = new Date();
        this._maxresolution = 1;
    }
    TimegridComponent.prototype.ngOnInit = function () {
        this.keys = Object.keys(this.timeunits).filter(function (f) { return !isNaN(Number(f)); });
        this._gridId = "timegrid-" + Math.random();
        this.compute();
    };
    TimegridComponent.prototype.ngAfterViewInit = function () {
        this.render();
    };
    Object.defineProperty(TimegridComponent.prototype, "gridId", {
        get: function () {
            return this._gridId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "unit", {
        get: function () {
            return this._unit;
        },
        set: function (unit) {
            var previousTimeUnit = this._unit;
            this._unit = parseInt(unit);
            this.compute();
            if (!this.isViewValid()) {
                this._unit = previousTimeUnit;
                this.compute();
                var unitSelection = document.getElementById(this._gridId + '-unit');
                var oldSelectedOption = unitSelection.querySelector('option[value="' + this._unit + '"]');
                unitSelection.selectedIndex = oldSelectedOption.index;
            }
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            var previousSize = this._size;
            this._size = size;
            this.compute();
            if (!this.isViewValid()) {
                this._size = previousSize;
                this.compute();
                var sizeInput = document.getElementById(this._gridId + '-size');
                sizeInput.value = '' + this._size;
            }
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "date", {
        get: function () {
            return this._target;
        },
        set: function (date) {
            var previousDate = this._target;
            this._target = date;
            this.compute();
            if (!this.isViewValid()) {
                this._target = previousDate;
                this.compute();
            }
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "startDate", {
        get: function () {
            return this.dateRange(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "endDate", {
        get: function () {
            return this.dateRange(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "timerange", {
        get: function () {
            return this._timerange;
        },
        enumerable: true,
        configurable: true
    });
    TimegridComponent.prototype.onResize = function (event) {
        this.compute();
        while (!this.isViewValid()) {
            this._size--;
            this.compute();
        }
        this.render();
        //Just to be aware of window resize event in order to bind offsetWidth with dom
    };
    Object.defineProperty(TimegridComponent.prototype, "offsetwidth", {
        get: function () {
            return document.getElementById(this._gridId).offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "maxrowsize", {
        get: function () {
            return Math.trunc(this.offsetwidth / this._maxresolution);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "rowsize", {
        get: function () {
            return Math.trunc(this.offsetwidth / this._maxresolution);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "lowerTimeUnit", {
        get: function () {
            var maxrowsize = this.maxrowsize;
            if (maxrowsize >= this._timerange.asMinutes)
                return __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].MINUTE;
            if (maxrowsize >= this._timerange.asHours)
                return __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].HOUR;
            if (maxrowsize >= this._timerange.asDays)
                return __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].DAY;
            if (maxrowsize >= this._timerange.asWeeks)
                return __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].WEEK;
            if (maxrowsize >= this._timerange.asMonths)
                return __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].MONTH;
            return __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].YEAR;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimegridComponent.prototype, "timeUnitNumber", {
        get: function () {
            switch (this._unit) {
                case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].MINUTE:
                    return this._timerange.asMinutes;
                case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].HOUR:
                    return this._timerange.asHours;
                case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].DAY:
                    return this._timerange.asDays;
                case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].WEEK:
                    return this._timerange.asWeeks;
                case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].MONTH:
                    return this._timerange.asMonths;
                case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].YEAR:
                    return this._timerange.asYears;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    TimegridComponent.prototype.isViewValid = function () {
        return this.timeUnitNumber <= this.maxrowsize;
    };
    TimegridComponent.prototype.computeAndRender = function () {
        this.compute();
        this.render();
    };
    TimegridComponent.prototype.compute = function () {
        this._timerange = this.computeTimerange();
    };
    TimegridComponent.prototype.render = function () {
        var builder = new __WEBPACK_IMPORTED_MODULE_4__gridbuilder__["a" /* GridBuilder */](this._gridId, this._unit, this._timerange, this.startDate, this.endDate, this._target, this._maxresolution);
        builder.render();
    };
    TimegridComponent.prototype.computeTimerange = function () {
        var timerange = new __WEBPACK_IMPORTED_MODULE_2__timerange__["a" /* Timerange */]();
        var startDate = this.startDate;
        var endDate = this.endDate;
        var rangeAsMillis = endDate.getTime() - startDate.getTime();
        var rangeAsMonth = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
        var rangeAsYear = endDate.getFullYear() - startDate.getFullYear() + 1;
        timerange.asMinutes = Math.trunc((rangeAsMillis / (60 * 1000))) + (rangeAsMillis % (60 * 1000) > 0 ? 1 : 0);
        timerange.asHours = Math.trunc((rangeAsMillis / (60 * 60 * 1000))) + (rangeAsMillis % (60 * 60 * 1000) > 0 ? 1 : 0);
        timerange.asDays = Math.trunc((rangeAsMillis / (24 * 60 * 60 * 1000))) + (rangeAsMillis % (24 * 60 * 60 * 1000) > 0 ? 1 : 0);
        timerange.asWeeks = Math.trunc((timerange.asDays / 7)) + (timerange.asDays % 7 > 0 ? 1 : 0);
        timerange.asMonths = rangeAsMonth;
        timerange.asYears = rangeAsYear;
        return timerange;
    };
    TimegridComponent.prototype.dateRange = function (before) {
        var rangeDateBorder = new Date(this._target.getTime());
        var rangeBorder = this.afterRange();
        if (before) {
            rangeBorder = this.beforeRange() * -1;
        }
        switch (this._unit) {
            case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].MINUTE:
                rangeDateBorder.setMinutes(rangeDateBorder.getMinutes() + rangeBorder);
                break;
            case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].HOUR:
                rangeDateBorder.setHours(rangeDateBorder.getHours() + rangeBorder);
                break;
            case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].DAY:
                rangeDateBorder.setDate(rangeDateBorder.getDate() + rangeBorder);
                break;
            case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].WEEK:
                rangeDateBorder.setDate(rangeDateBorder.getDate() + (7 * rangeBorder));
                break;
            case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].MONTH:
                rangeDateBorder.setMonth(rangeDateBorder.getMonth() + rangeBorder);
                break;
            case __WEBPACK_IMPORTED_MODULE_3__timeunit__["a" /* TimeUnit */].YEAR:
                rangeDateBorder.setFullYear(rangeDateBorder.getFullYear() + rangeBorder);
                break;
        }
        return rangeDateBorder;
    };
    TimegridComponent.prototype.beforeRange = function () {
        return Math.trunc(this._size / 2);
    };
    TimegridComponent.prototype.afterRange = function () {
        var overlay = this._size % 2;
        return Math.trunc(this._size / 2) + overlay;
    };
    return TimegridComponent;
}());
TimegridComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'timegrid',
        template: __webpack_require__(253),
        styles: [__webpack_require__(257)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None
    })
], TimegridComponent);

var ALIGN;
(function (ALIGN) {
    ALIGN[ALIGN["LEFT"] = 0] = "LEFT";
    ALIGN[ALIGN["RIGHT"] = 1] = "RIGHT";
    ALIGN[ALIGN["CENTER"] = 2] = "CENTER";
})(ALIGN || (ALIGN = {}));


/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timerange; });
var Timerange = (function () {
    function Timerange() {
    }
    return Timerange;
}());



/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "#period {\n  height: 100%;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column; }\n\n#detail {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  border-width: 0px 0px 2px 0px;\n  border-radius: 4px;\n  border-color: #eee; }\n\n#actions {\n  flex-basis: 40px;\n  display: flex;\n  flex-direction: column; }\n\n.list-row {\n  display: flex;\n  flex-direction: row; }\n\n.list-cell {\n  line-height: 40px;\n  padding: 1px; }\n\n.list-cell button {\n  height: 40px;\n  width: 40px;\n  cursor: pointer;\n  border-width: 1px;\n  border-radius: 4px;\n  border-color: #eee; }\n\n.list-cell button:hover {\n  background-color: #eee; }\n\n.delete-button {\n  background: url(" + __webpack_require__(223) + ") center 0px no-repeat; }\n\n.back-button {\n  background: url(" + __webpack_require__(222) + ") center 0px no-repeat; }\n\n.add-button {\n  background: url(" + __webpack_require__(246) + ") center 0px no-repeat; }\n", ""]);

// exports


/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "#periods {\n  height: 100%;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column; }\n\n#list {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  border-width: 0px 0px 2px 0px;\n  border-radius: 4px;\n  border-color: #eee; }\n\n#actions {\n  flex-basis: 40px;\n  display: flex;\n  flex-direction: column; }\n\n.list-row {\n  display: flex;\n  flex-direction: row; }\n\n.list-cell {\n  line-height: 40px;\n  padding: 1px; }\n\n.list-cell button {\n  height: 40px;\n  width: 40px;\n  cursor: pointer;\n  border-width: 1px;\n  border-radius: 4px;\n  border-color: #eee; }\n\n.list-cell button:hover {\n  background-color: #eee; }\n\n.edit-button {\n  background: url(" + __webpack_require__(248) + ") center 0px no-repeat; }\n\n.delete-button {\n  background: url(" + __webpack_require__(223) + ") center 0px no-repeat; }\n\n.add-button {\n  background: url(" + __webpack_require__(247) + ") center 0px no-repeat; }\n\n.back-button {\n  background: url(" + __webpack_require__(222) + ") center 0px no-repeat; }\n", ""]);

// exports


/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "#timeline {\n  height: 100%;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column; }\n\n#detail {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  border-width: 0px 0px 2px 0px;\n  border-radius: 4px;\n  border-color: #eee; }\n\n#actions {\n  flex-basis: 40px;\n  display: flex;\n  flex-direction: column; }\n\n.list-row {\n  display: flex;\n  flex-direction: row; }\n\n.timeline-timegrid-row {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column; }\n\n.timeline-timegrid-row > div.list-cell {\n  flex-grow: 1;\n  display: flex; }\n\n.timeline-timegrid-row > div.list-cell > timegrid {\n  flex-grow: 1; }\n\n.list-cell {\n  line-height: 40px;\n  padding: 1px; }\n\n.list-cell button {\n  height: 40px;\n  width: 40px;\n  cursor: pointer;\n  border-width: 1px;\n  border-radius: 4px;\n  border-color: #eee; }\n\n.list-cell button:hover {\n  background-color: #eee; }\n\n.delete-button {\n  background: url(" + __webpack_require__(223) + ") center 0px no-repeat; }\n\n.back-button {\n  background: url(" + __webpack_require__(222) + ") center 0px no-repeat; }\n", ""]);

// exports


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".timegrid-component {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n\n.timegrid {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  background-color: #eee;\n  padding: 2px;\n  border-radius: 5px; }\n\n.timegrid-tools {\n  flex-basis: 50px; }\n\n.timegrid-row {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: row; }\n\n.timegrid-col {\n  flex-grow: 1;\n  flex-basis: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column; }\n\n.timegrid-col-0 {\n  border-right-width: 1px;\n  border-right-color: #aaa;\n  border-right-style: solid; }\n\n.timegrid-col-1 {\n  border-right-width: 1px;\n  border-right-color: #bbb;\n  border-right-style: dotted; }\n\n.timegrid-col-2 {\n  border-right-width: 1px;\n  border-right-color: #ccc;\n  border-right-style: dashed; }\n\n.timegrid-col-reference {\n  background-color: #eee; }\n\n.timegrid-col:first-child {\n  border-top-left-radius: 2px;\n  border-bottom-left-radius: 2px; }\n\n.timegrid-col:last-child {\n  border-top-right-radius: 2px;\n  border-bottom-right-radius: 2px;\n  border-right-width: 0px; }\n\n.timegrid-col-content {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: row; }\n\n.timegrid-col-label {\n  text-align: center;\n  line-height: normal;\n  color: #455;\n  font-size: 0.8em; }\n", ""]);

// exports


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e722a160a7cdb01fd1851d418c7b37c5.svg";

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "86f23ebbf59799ffc24f4ab60afbaec8.svg";

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6fa20b5935fef4c03f7938ed426839fc.svg";

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

module.exports = "<div id=\"period\">\n    <div id=\"detail\">\n      <div class=\"list-row\">\n        <div class=\"list-cell\">\n          {{id}}\n        </div>\n        <div class=\"list-cell\">\n          <input type=\"text\" class=\"form-control\"\n            id=\"name\" required\n            [(ngModel)]=\"period.name\"\n            name=\"name\"\n            (change)=\"savePeriod()\"/>\n        </div>\n      </div>\n    </div>\n    <div id=\"actions\">\n      <div class=\"list-row\">\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"back-button\" (click)=\"back()\"></button>\n        </div>\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"delete-button\" (click)=\"deletePeriod()\"></button>\n        </div>\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"add-button\" (click)=\"createTimeline()\"></button>\n        </div>\n      </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

module.exports = "<div id=\"periods\">\n    <div id=\"list\">\n      <div class=\"list-row periods\" *ngFor=\"let period of periods\">\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"edit-button\" [routerLink]=\"['details']\" [queryParams]=\"{ id: period.id }\"></button>\n        </div>\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"delete-button\" (click)=\"deletePeriod(period.id)\"></button>\n        </div>\n        <div class=\"list-cell\">{{period.name}}</div>\n      </div>\n    </div>\n    <div id=\"actions\">\n      <div class=\"list-row\">\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"back-button\" (click)=\"back()\"></button>\n        </div>\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"add-button\" [routerLink]=\"['details']\" [queryParams]=\"{ id: null }\"></button>\n        </div>\n      </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 251:
/***/ (function(module, exports) {

module.exports = "<div id=\"timeline\">\n    <div id=\"detail\">\n      <div class=\"list-row\">\n        <div class=\"list-cell\">\n          {{id}}\n        </div>\n        <div class=\"list-cell\">\n          <input type=\"text\" class=\"form-control\"\n            id=\"name\" required\n            [(ngModel)]=\"timeline.name\"\n            name=\"name\"\n            (change)=\"saveTimeline()\"/>\n        </div>\n      </div>\n      <div class=\"list-row\" class=\"timeline-timegrid-row\">\n        <div class=\"list-cell\">\n          <timegrid></timegrid>\n        </div>\n      </div>\n    </div>\n    <div id=\"actions\">\n      <div class=\"list-row\">\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"back-button\" (click)=\"back()\"></button>\n        </div>\n        <div class=\"list-cell\">\n          <button type=\"button\" class=\"delete-button\" (click)=\"deleteTimeline()\"></button>\n        </div>\n      </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

module.exports = "<div class=\"timegrid-component\" (window:resize)=\"onResize($event)\">\n  <div id=\"{{gridId}}\" class=\"timegrid\">\n\n  </div>\n  <div class=\"timegrid-tools\">\n    <input id=\"{{gridId}}-size\" type=\"text\" class=\"form-control\"\n      id=\"size\" required\n      [(ngModel)]=\"size\"\n      name=\"name\"/>\n      <select id=\"{{gridId}}-unit\" [(ngModel)]=\"unit\">\n        <option *ngFor=\"let key of keys\" [value]=\"key\">{{timeunits[key]}}</option>\n      </select>`\n  </div>\n  <!--\n  <br>\n  start: {{startDate}} ///// date: {{date}}\n  <br>\n  end: {{endDate}}\n  <br>\n  minutes: {{timerange.asMinutes}} == hours: {{timerange.asHours}} == days: {{timerange.asDays}}== weeks: {{timerange.asWeeks}} == months: {{timerange.asMonths}} == years: {{timerange.asYears}}\n  <br>\n  offsetwidth: {{offsetwidth}} // maxrowsize: {{maxrowsize}} // lowerTimeUnit: {{timeunits[lowerTimeUnit]}}\n  -->\n</div>\n"

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(241);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(242);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(243);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(244);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=0.chunk.js.map