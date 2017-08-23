import './assets/styles/main.scss';
import './assets/styles/select.css';

import angular from 'angular';

import ComponentsModule from './components/components.module';
import ContainersModule from './containers/containers.module';

import CONSTS from './app.consts.js';

angular
    .module('AngularForm', [
        ComponentsModule,
        ContainersModule
    ])
    .constant('CONSTS', CONSTS)
    .name;
