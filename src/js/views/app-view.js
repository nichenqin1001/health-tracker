import { View } from 'backbone';
import $ from 'jquery';

import FoodModel from '../models/food-model';
import FoodCollection from '../collections/foods-collection';
import FoodsView from '../views/foods-view';

var foods = new FoodCollection();

var AppView = View.extend({

    el: '#app',

    events: {
        'click #search-food': 'getFood'
    },

    getFood() {

        $('#search-food-text').empty();
        var searchFoodText = $('#seach-food-text').val();
        $.getJSON('https://api.nutritionix.com/v1_1/search/' + searchFoodText + '?', {
            'results': '0:20',
            'fields': 'item_name,brand_name,item_id,brand_id,nf_calories',
            'appId': 'e24d74f6',
            'appKey': 'd9c92ac01b23ea5673b1de38ca46e84c'
        }, data => {

            var results = data.hits;
            for (var i = 0; i < results.length; i++) {

                var food = new FoodModel({
                    name: results[i].fields.item_name,
                    calories: results[i].fields.nf_calories
                });
                foods.add(food);

            }
            var foodsView = new FoodsView({ model: foods });
            foodsView.render();

        });

    }

});

module.exports = new AppView();
