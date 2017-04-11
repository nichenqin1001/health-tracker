window.app = window.app || {};

(function () {

    var FoodView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template($('#search-result').html()),

        render: function () {
            this.$el.html(this.template);
            return this;
        }

    });

    var foodView = new FoodView();
    foodView.render();

}());
