import { Collection } from 'backbone';
import FoodModel from '../models/food-model';
import { LocalStorage } from 'backbone.localstorage';

var FoodsCollection = Collection.extend({

    model: FoodModel,

    localStorage: new LocalStorage('foodsCollection'),

});

module.exports = new FoodsCollection();