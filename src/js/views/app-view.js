import { View } from 'backbone';
import { invoke, each } from 'underscore';
import $ from 'jquery';

import FoodView from './food-view';
import SelectedFoodView from './selected-food-view';
import { FoodModel, foods, selectedFoods } from '../models/food-model';

import template from './app-template.html';

export default View.extend({

    el: '#app',

    template,

    events: {
        'click #search-food': 'getData',
        'click #clean-input': 'cleanInput',
        'click #destroy-food': 'clearData'
    },

    initialize() {

        this.$inputTextAlert = $('#inputTextAlert');
        this.$foodsList = $('#foods');
        this.$selectedList = $('#selected');
        this.$stats = $('#stats');
        this.$loader = $('#loader');

        this.listenTo(foods, 'add', this.addOne);
        this.listenTo(selectedFoods, 'add', this.addSelected);
        this.listenTo(selectedFoods, 'all', this.render);

        // get localstorage
        foods.fetch();
        selectedFoods.fetch();

    },

    /**
     * render total calories of selected food list
     * 
     */
    render() {

        var calories = 0;
        each(selectedFoods.toJSON(), food => {

            calories += parseInt(food.calories);

        });

        this.$stats.html(this.template({ calories }));

    },

    /**
     * add food into search results
     * and render food template
     * @param {any} food 
     */
    addOne(food) {

        var foodView = new FoodView({ model: food });
        this.$foodsList.append(foodView.render().$el);

    },

    /**
     * add food into selected collection
     * and render selected foods list
     * @param {any} food 
     */
    addSelected(food) {

        var selectedFoodView = new SelectedFoodView({ model: food });
        this.$selectedList.append(selectedFoodView.render().$el);

    },

    getData() {

        var searchFoodText = $('#search-food-text').val();

        if (!searchFoodText) {

            this.$inputTextAlert.removeClass('hidden');
            return;

        }

        // clear data
        this.$foodsList.empty();
        // show loader through css3 animation
        this.$loader.html('<div></div><div></div><div></div>');
        // hide input text alert
        if (!this.$inputTextAlert.hasClass('hidden')) this.$inputTextAlert.addClass('hidden');

        $.getJSON('https://api.nutritionix.com/v1_1/search/' + searchFoodText + '?', {
            'results': '0:10',
            'fields': 'item_name,nf_calories',
            'appId': 'e24d74f6',
            'appKey': 'd9c92ac01b23ea5673b1de38ca46e84c'
        }, data => {

            // hide loader
            this.$loader.empty();
            foods.reset();

            var results = data.hits;
            results.forEach((food, index) => {

                var newFood = new FoodModel({
                    name: food.fields.item_name,
                    calories: food.fields.nf_calories,
                    id: index
                });

                foods.create(newFood);

            });

        }).fail(() => {

            this.$loader.empty();
            this.$foodsList.html('<div class="alert alert-danger alert-dismissible" role="alert">' +
                'Oops! Search failed! Please check your connection or proxy setting and try again!' +
                '</div>');

        });

    },

    clearData() {

        invoke(foods.toArray(), 'destroy');
        this.$foodsList.empty();

    },

    cleanInput() {

        this.$('#search-food-text').val('');

    }

});
