import Vue from 'vue'
import Index from './components/Index.vue'
window.onload = function() {
	new Vue({
		el: '#app',
		components: {
			'my-component': Index
		}
	});
}

require('./style/css/bootstrap.min.css');
require('./style/css/font-awesome.min.css');
require('./style/css/app.scss');
