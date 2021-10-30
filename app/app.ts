import {Application} from '@nativescript/core';

import {localize} from "@nativescript/localize";
Application.setResources({L: localize});

Application.run({moduleName: 'app-root'});
