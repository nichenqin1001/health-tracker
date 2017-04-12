import { Collection } from 'backbone';
import FoodModel from '../models/food-model';
import { LocalStorage } from 'backbone.localstorage';

var SelectedFoodsCollection = Collection.extend({

    model: FoodModel,

    localStorage: new LocalStorage('selectedFoodsCollection'),

});

module.exports = new SelectedFoodsCollection();
