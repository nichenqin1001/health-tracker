import { View } from 'backbone';
import $ from 'jquery';

import foods from '../collections/foods-collection';
import FoodsView from './foods-view';

var AppView = View.extend({

    el: '#app',

    events: {
        'click #search-food': 'getFood'
    },

    initialize() {

        foods.reset();
        this.listenTo(foods, 'add', this.render);

    },

    renderList(food) {

        console.log(food);

    },

    getFood() {

        $('#foods').empty();
        var searchFoodText = $('#seach-food-text').val();
        $.getJSON('https://api.nutritionix.com/v1_1/search/' + searchFoodText + '?', {
            'results': '0:10',
            'fields': 'item_name,nf_calories',
            'appId': 'e24d74f6',
            'appKey': 'd9c92ac01b23ea5673b1de38ca46e84c'
        }, data => {

            foods.reset();
            var results = data.hits;
            results.forEach(food => {

                foods.add({ name: food.fields.item_name, calories: food.fields.nf_calories });

            });
            var foodsView = new FoodsView({ model: foods });
            foodsView.render();

            console.log(foods);

        });

    }

});

module.exports = new AppView();
