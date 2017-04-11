window.app = window.app || {};

(function () {

    app.FoodModel = Backbone.Model.extend({

        default: {
            name: '',
            calories: 0
        }

    });

}());
