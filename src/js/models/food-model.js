import { Model } from 'backbone';
import { LocalStorage } from 'backbone.localstorage';

export default Model.extend({

    defaults: {
        name: '',
        calories: 0,
        selected: false
    },

    localStorage: new LocalStorage('foodModel')

});
