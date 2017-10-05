var ac_main =
webpackJsonpac__name_([2],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return decorateModuleRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ENV_PROVIDERS; });
// Angular 2


// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function (value) { return value; };
if (false) {
    enableProdMode();
    // Production
    _decorateModuleRef = function (modRef) {
        disableDebugTools();
        return modRef;
    };
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ApplicationRef"]);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["enableDebugTools"])(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
var decorateModuleRef = _decorateModuleRef;
var ENV_PROVIDERS = PROVIDERS.slice();


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(215)

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(212)

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(0)

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_component__ = __webpack_require__(57);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__home_component__["a"]; });



/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__no_content_component__ = __webpack_require__(62);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__no_content_component__["a"]; });



/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabelService; });


var LabelService = (function () {
    function LabelService() {
        this.lang = 'fr';
        this.labels = {
            "authentication.popup.label.email": {
                "en": "email",
                "fr": "courriel"
            },
            "authentication.popup.label.password": {
                "en": "password",
                "fr": "mot de passe"
            },
            "authentication.popup.label.connection": {
                "en": "connect",
                "fr": "se connecter"
            }
        };
    }
    LabelService.prototype.gb = function (key) {
        if (this.labels[key]) {
            return this.labels[key][this.lang];
        }
        return "";
    };
    return LabelService;
}());
LabelService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], LabelService);



/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = vendor_lib;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(451)

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(63)

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_module__ = __webpack_require__(54);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_module__["a"]; });
// App



/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(43)

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(213)

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(214)

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__labels_label_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });







var AuthenticationService = (function () {
    function AuthenticationService(labels) {
        this.labels = labels;
        this.authenticated = false;
        this.username = null;
        this.password = null;
        //THE 3 LINES ABOVES ARE ONLY FOR DEVS
        this.authenticated = true;
        this.username = "yoman";
        this.password = "yomanapp";
    }
    AuthenticationService.prototype.authenticate = function (url) {
        var service = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (obs) {
            if (!service.authenticated) {
                service.popup(url).subscribe(function (x) {
                    obs._next(service.buildBasicAuthorization());
                }, function (e) { return obs._error(e); }, function () { return obs._complete(); });
            }
            else {
                obs._next(service.buildBasicAuthorization());
            }
        });
    };
    AuthenticationService.prototype.buildBasicAuthorization = function () {
        return 'Basic ' + btoa(this.username + ':' + this.password);
    };
    AuthenticationService.prototype.clearPopup = function () {
        while (document.querySelector('#authentication-container')) {
            var container = document.querySelector('#authentication-container');
            container.parentElement.removeChild(container);
        }
    };
    AuthenticationService.prototype.popup = function (url) {
        this.clearPopup();
        var service = this;
        var container = document.createElement('div');
        container.setAttribute('id', 'authentication-container');
        document.querySelector('body').appendChild(container);
        var form = document.createElement('form');
        container.appendChild(form);
        var fieldset1 = document.createElement('fieldset');
        form.appendChild(fieldset1);
        var mailLabel = document.createElement('label');
        fieldset1.appendChild(mailLabel);
        mailLabel.setAttribute('for', 'email');
        mailLabel.innerHTML = this.labels.gb('authentication.popup.label.email');
        var mail = document.createElement('input');
        mail.setAttribute('type', 'email');
        mail.setAttribute('id', 'email');
        fieldset1.appendChild(mail);
        mail.focus();
        var fieldset2 = document.createElement('fieldset');
        form.appendChild(fieldset2);
        var passwordLabel = document.createElement('label');
        fieldset2.appendChild(passwordLabel);
        passwordLabel.setAttribute('for', 'password');
        passwordLabel.innerHTML = this.labels.gb('authentication.popup.label.password');
        var password = document.createElement('input');
        password.setAttribute('type', 'password');
        password.setAttribute('id', 'password');
        fieldset2.appendChild(password);
        var fieldset3 = document.createElement('fieldset');
        form.appendChild(fieldset3);
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.value = this.labels.gb('authentication.popup.label.connection');
        fieldset3.appendChild(button);
        mail.onkeydown = password.onkeydown = function (e) {
            if (e.keyCode == 13) {
                button.click();
            }
        };
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (obs) {
            button.onclick = function (evt) {
                if (mail.value.length > 0 && password.value.length > 0) {
                    service.username = mail.value;
                    service.password = password.value;
                    var req = new XMLHttpRequest();
                    req.onreadystatechange = function (event) {
                        // XMLHttpRequest.DONE === 4
                        if (this.readyState === XMLHttpRequest.DONE) {
                            if (this.status === 200) {
                                service.authenticated = true;
                                service.clearPopup();
                                obs._next();
                            }
                            else if (this.status === 401) {
                                mail.value = '';
                                password.value = '';
                                service.username = '';
                                service.password = '';
                            }
                            else {
                                alert('Accès impossible ! Un problème a eu lieu durant l\'authenthification');
                                obs._next();
                                obs._complete();
                            }
                        }
                    };
                    // we make a synchronous call
                    req.open('GET', url, true);
                    req.setRequestHeader("Authorization", service.buildBasicAuthorization());
                    req.withCredentials = true;
                    req.send(null);
                }
            };
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__labels_label_service__["a" /* LabelService */]])
], AuthenticationService);



/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(211)

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(456)

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(467)

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(500)

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });

/*
 * Angular 2 decorators and services
 */


/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(appState) {
        this.appState = appState;
        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
        this.name = 'Angular 2 Webpack Starter';
        this.url = 'https://twitter.com/AngularClass';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
        this.initHeader();
    };
    AppComponent.prototype.initHeader = function () {
        var nav = document.querySelector('#app_header nav');
        nav.classList.add('collapse');
        nav.onmouseover = function () {
            nav.classList.remove('collapse');
        };
        nav.onmouseout = function () {
            nav.classList.add('collapse');
        };
        nav.onclick = function () {
            if (nav.classList.contains('collapse')) {
                nav.classList.remove('collapse');
            }
            else {
                nav.classList.add('collapse');
            }
        };
    };
    return AppComponent;
}());
AppComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app',
        encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None,
        styles: [
            __webpack_require__(75)
        ],
        template: __webpack_require__(70)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */]])
], AppComponent);

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angularclass_hmr__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angularclass_hmr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__angularclass_hmr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environment__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routes__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_resolver__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__no_content__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_x_large__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_rest_labels_label_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_rest_auth_authentication_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__styles_styles_scss__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__styles_styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__styles_styles_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__styles_headings_css__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__styles_headings_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__styles_headings_css__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });







/*
 * Platform and Environment providers/directives/pipes
 */


// App is our top level component










// Application wide providers
var APP_PROVIDERS = __WEBPACK_IMPORTED_MODULE_10__app_resolver__["a" /* APP_RESOLVER_PROVIDERS */].concat([
    __WEBPACK_IMPORTED_MODULE_11__app_service__["a" /* AppState */],
    __WEBPACK_IMPORTED_MODULE_15_app_rest_labels_label_service__["a" /* LabelService */],
    __WEBPACK_IMPORTED_MODULE_16_app_rest_auth_authentication_service__["a" /* AuthenticationService */]
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state) {
            return;
        }
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angularclass_hmr__["createNewHosts"])(cmpLocation);
        // save input values
        store.restoreInputValues = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angularclass_hmr__["createInputTransfer"])();
        // remove styles
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angularclass_hmr__["removeNgStyles"])();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    return AppModule;
}());
AppModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"])({
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__home__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_13__no_content__["a" /* NoContentComponent */],
            __WEBPACK_IMPORTED_MODULE_14__home_x_large__["a" /* XLargeDirective */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["RouterModule"].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_routes__["a" /* ROUTES */], { useHash: true, preloadingStrategy: __WEBPACK_IMPORTED_MODULE_6__angular_router__["PreloadAllModules"] })
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__environment__["b" /* ENV_PROVIDERS */],
            APP_PROVIDERS
        ]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_core__["ApplicationRef"],
        __WEBPACK_IMPORTED_MODULE_11__app_service__["a" /* AppState */]])
], AppModule);



/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* unused harmony export DataResolver */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_RESOLVER_PROVIDERS; });




var DataResolver = (function () {
    function DataResolver() {
    }
    DataResolver.prototype.resolve = function (route, state) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ res: 'I am data' });
    };
    return DataResolver;
}());
DataResolver = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
], DataResolver);

// an array of services to resolve routes with data
var APP_RESOLVER_PROVIDERS = [
    DataResolver
];


/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__no_content__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROUTES; });


var ROUTES = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__home__["a" /* HomeComponent */] },
    { path: 'user', loadChildren: function() { return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 216))  .then( function(module) { return module['UserModule']; } ); } },
    { path: 'periods', loadChildren: function() { return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 215))  .then( function(module) { return module['PeriodsModule']; } ); } },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_1__no_content__["a" /* NoContentComponent */] },
];


/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__title__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });




var HomeComponent = (function () {
    // TypeScript public modifiers
    function HomeComponent(appState, title) {
        this.appState = appState;
        this.title = title;
        // Set our default values
        this.localState = { value: '' };
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
    };
    HomeComponent.prototype.submitState = function (value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    };
    return HomeComponent;
}());
HomeComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        // The selector is what angular internally uses
        // for `document.querySelectorAll(selector)` in our index.html
        // where, in this case, selector is the string 'home'
        selector: 'home',
        // We need to tell Angular's Dependency Injection which providers are in our app.
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__title__["a" /* Title */]
        ],
        // Our list of styles in our component. We may add more to compose many styles together
        styles: [__webpack_require__(76)],
        // Every Angular template is first compiled by the browser before Angular runs it's compiler
        template: __webpack_require__(71)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__title__["a" /* Title */]])
], HomeComponent);



/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__title_service__ = __webpack_require__(59);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__title_service__["a"]; });



/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Title; });



var Title = (function () {
    function Title(http) {
        this.http = http;
        this.value = 'Angular 2';
    }
    Title.prototype.getData = function () {
        console.log('Title#getData(): Get Data');
        // return this.http.get('/assets/data.json')
        // .map(res => res.json());
        return {
            value: 'AngularClass'
        };
    };
    return Title;
}());
Title = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]])
], Title);



/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__x_large_directive__ = __webpack_require__(61);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__x_large_directive__["a"]; });



/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return XLargeDirective; });


/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
var XLargeDirective = (function () {
    function XLargeDirective(element, renderer) {
        // simple DOM manipulation to set font size to x-large
        // `nativeElement` is the direct reference to the DOM element
        // element.nativeElement.style.fontSize = 'x-large';
        this.element = element;
        this.renderer = renderer;
        // for server/webworker support use the renderer
        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    }
    return XLargeDirective;
}());
XLargeDirective = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
        selector: '[x-large]' // using [ ] means selecting attributes
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
], XLargeDirective);



/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoContentComponent; });


var NoContentComponent = (function () {
    function NoContentComponent() {
    }
    return NoContentComponent;
}());
NoContentComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'no-content',
        template: "\n    <div>\n      <h1>404: page missing</h1>\n    </div>\n  "
    })
], NoContentComponent);



/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_environment__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angularclass_hmr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app__ = __webpack_require__(25);
/* harmony export (immutable) */ __webpack_exports__["main"] = main;
/*
 * Angular bootstraping
 */



/*
 * App Module
 * our top level module that holds all of our components
 */

/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["platformBrowserDynamic"])()
        .bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app__["a" /* AppModule */]).then(function(MODULE_REF) {
  if (false) {
    module["hot"]["accept"]();
    
    if (MODULE_REF.instance["hmrOnInit"]) {
      module["hot"]["data"] && MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
    }
    if (MODULE_REF.instance["hmrOnStatus"]) {
      module["hot"]["apply"](function(status) {
        MODULE_REF.instance["hmrOnStatus"](status);
      });
    }
    if (MODULE_REF.instance["hmrOnCheck"]) {
      module["hot"]["check"](function(err, outdatedModules) {
        MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
      });
    }
    if (MODULE_REF.instance["hmrOnDecline"]) {
      module["hot"]["decline"](function(dependencies) {
        MODULE_REF.instance["hmrOnDecline"](dependencies);
      });
    }
    module["hot"]["dispose"](function(store) {
      MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
      MODULE_REF.destroy();
      MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
    });
  }
  return MODULE_REF;
})
        .then(__WEBPACK_IMPORTED_MODULE_1__app_environment__["a" /* decorateModuleRef */])
        .catch(function (err) { return console.error(err); });
}
// needed for hmr
// in prod this is replace for document ready
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__["bootloader"])(main);


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "#app_header {\n  flex-basis: 40px;\n  background-color: white;\n  margin-bottom: 10px; }\n\n#app_main {\n  flex-grow: 1;\n  height: 100%;\n  overflow-y: auto; }\n\n#app_main main {\n  height: 100%;\n  overflow-y: auto; }\n\n#app_footer {\n  flex-basis: 30px;\n  margin: 0px;\n  padding: 0px;\n  background-color: #667788; }\n\n#app_footer a {\n  margin: 0px;\n  padding: 0px 10px;\n  text-decoration: none;\n  height: 30px;\n  line-height: 30px;\n  color: white;\n  font-style: italic;\n  font-size: 12px; }\n\n#app_header nav {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  min-height: 40px;\n  width: 100%;\n  box-shadow: 0px -0px 5px 1px black; }\n\n#app_header nav a {\n  height: 40px;\n  line-height: 40px;\n  padding: 0px 10px;\n  margin: 0px;\n  color: white; }\n\n#app_header nav a.burger {\n  display: none;\n  text-decoration: none;\n  background: url(" + __webpack_require__(69) + ") center 0px no-repeat; }\n\n#app_header nav a:not(.burger) {\n  display: block;\n  text-decoration: none;\n  background-color: white;\n  color: black; }\n\n#app_header nav a.active:not(.burger) {\n  font-weight: bold; }\n\n#app_header nav a:not(.burger):hover {\n  background-color: black;\n  color: white; }\n\n#app_header nav.collapse a:not(.burger) {\n  display: none; }\n\n#app_header nav.collapse a.burger {\n  display: block; }\n", ""]);

// exports


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "/* this file will be extracted to main dist folder and is imported in index.html */\n/* This file is for setting global styles  */\nhtml, body {\n  height: 100%;\n  font-family: Arial, Helvetica, sans-serif;\n  padding: 0px;\n  margin: 0px; }\n\napp {\n  height: 100%;\n  padding: 0px;\n  margin: 0px;\n  display: flex;\n  flex-direction: column; }\n\n#authentication-container {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5); }\n\n#authentication-container form {\n  display: block;\n  position: relative;\n  top: 40%;\n  left: 40%;\n  width: 20%;\n  background-color: white;\n  padding: 10px; }\n\n#authentication-container form fieldset {\n  margin: 10px 0px; }\n\n#authentication-container form label {\n  display: block; }\n\n#authentication-container form input:not([type=button]) {\n  width: 100%;\n  border: 1px solid black; }\n", ""]);

// exports


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "/*styles for home content only*/", ""]);

// exports


/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "h1 {\n  color: #00BCD4;\n}", ""]);

// exports


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a26fbb3c4b49fdbac7e474ad066a9fae.svg";

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

module.exports = "\n<div id=\"app_header\">\n  <nav>\n    <a href=\"#\" class=\"burger\"></a>\n    <a [routerLink]=\" ['./'] \"\n      routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n      Accueil\n    </a>\n    <a [routerLink]=\" ['./periods'] \"\n           routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n    Periodes\n    </a>\n    <a [routerLink]=\" ['./user'] \"\n           routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n    Utilisateurs\n    </a>\n  </nav>\n</div>\n\n<div id=\"app_main\">\n  <main>\n    <router-outlet></router-outlet>\n  </main>\n</div>\n\n<div id=\"app_footer\">\n  <footer>\n    <div>\n      <a [href]=\"url\">mentions légales</a>\n    </div>\n  </footer>\n</div>\n"

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1 x-large class=\"sample-content\">Your Content Here</h1>\n\n  <hr>\n\n  <div>\n    For hot module reloading run\n    <pre>npm run start:hmr</pre>\n  </div>\n\n  <hr>\n\n  <div>\n    <h4>Local State</h4>\n\n    <form (ngSubmit)=\"submitState(localState.value)\" autocomplete=\"off\">\n\n      <input\n        [value]=\"localState.value\"\n        (input)=\"localState.value = $event.target.value\"\n        placeholder=\"Submit Local State to App State\"\n        autofocus>\n\n      <button>Submit Value</button>\n    </form>\n    <!--\n        <input type=\"text\" [value]=\"localState.value\" (input)=\"localState.value = $event.target.value\" autofocus>\n        Rather than wiring up two-way data-binding ourselves with [value] and (input)\n        we can use Angular's [(ngModel)] syntax\n        <input type=\"text\" name=\"textInput\" [(ngModel)]=\"localState.value\" autofocus>\n      -->\n\n    <pre>this.localState = {{ localState | json }}</pre>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(17)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./styles.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(17)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./headings.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./headings.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(65);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(67);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppState; });


var AppState = (function () {
    function AppState() {
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    return AppState;
}());
AppState = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
], AppState);



/***/ })

},[63]);
//# sourceMappingURL=main.bundle.js.map