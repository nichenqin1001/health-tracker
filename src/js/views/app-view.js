import { View } from 'backbone';
import $ from 'jquery';

import foods from '../collections/foods-collection';
import selectedFoods from '../collections/selected-foods-collection';
import FoodView from './food-view';

import template from './app-template.html';

var AppView = View.extend({

    el: '#app',

    template,

    events: {
        'click #search-food': 'getFood'
    },

    initialize() {

        this.searchFoodText = $('#seach-food-text').val();
        this.$foodsList = $('#foods');
        this.$stats = $('#stats');

        this.listenTo(foods, 'add', this.addOne);

        foods.fetch();

    },

    render() {

        var calories = 0;
        foods.each(food => {

            calories += food.toJSON().calories;

        });

        this.$stats.html(this.template({ calories }));

    },

    addOne(food) {

        var foodView = new FoodView({ model: food });
        this.$foodsList.append(foodView.render().$el);

    },

    getFood() {

        this.$foodsList.empty();

        $.getJSON('https://api.nutritionix.com/v1_1/search/' + this.searchFoodText + '?', {
            'results': '0:10',
            'fields': 'item_name,nf_calories',
            'appId': 'e24d74f6',
            'appKey': 'd9c92ac01b23ea5673b1de38ca46e84c'
        }, data => {

            foods.reset();
            var results = data.hits;
            results.forEach((food, index) => {

                foods.add({ name: food.fields.item_name, calories: food.fields.nf_calories, id: index });

            });

        });

    }

});

module.exports = new AppView();
