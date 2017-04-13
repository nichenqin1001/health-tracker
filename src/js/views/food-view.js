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
        selectedFoods.fetch();

    },

    render() {

        this.$el.html(this.template(this.model.toJSON()));
        this.$el.attr('id', this.model.id);
        return this;

    },

    addFoodToSelected() {

        var newSelectedFood = new FoodModel({
            name: this.model.get('name'),
            calories: this.model.get('calories'),
        });

        selectedFoods.create(newSelectedFood);

        console.log(selectedFoods);

    }

});
