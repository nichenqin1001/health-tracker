import { View } from 'backbone';
import { FoodModel } from '../models/food-model';
import { selectedFoods } from '../models/food-model';

import template from './food-template.html';

export default View.extend({

    tagName: 'a',

    className: 'list-group-item',

    template,

    events: {
        'click .add-food': 'addFoodToSelected'
    },

    initialize() {

        this.listenTo(this.model, 'change', this.render);

    },

    render() {

        this.$el.html(this.template(this.model.toJSON()));
        return this;

    },

    /**
     * add current model into selected collection
     * 
     */
    addFoodToSelected(e) {

        if (this.$el.hasClass('disabled')) return;

        // hide add button
        e.target.style.display = 'none';
        this.$el.addClass('disabled');

        var newSelectedFood = new FoodModel({
            name: this.model.get('name'),
            calories: this.model.get('calories'),
        });

        selectedFoods.create(newSelectedFood);

    }

});
