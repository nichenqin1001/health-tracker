import { View } from 'backbone';

var FoodView = View.extend({

    tagName: 'tr',

    render() {

        this.$el.html('hello world');
        return this;

    }

});

module.exports = new FoodView();;
