import Vue from 'vue';
import VueGAPI from 'vue-gapi';

const apiConfig = {
	apiKey: 'AIzaSyCwSdSdIblDFzQbJSzu17XmnqZ4WvOsTPw',
	clientId:
		'439379594062-3rn83ast9er0aj23buk2sr99oasjevar.apps.googleusercontent.com',
	discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
	scope: 'https://www.googleapis.com/auth/spreadsheets'
};

Vue.use(VueGAPI, apiConfig);
