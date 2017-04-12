import { Model } from 'backbone';

export default Model.extend({

    defaults: {
        name: '',
        calories: 0,
        selected: false
    }

});
