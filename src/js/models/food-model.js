import 'backbone.localstorage';
import { Model, Collection, LocalStorage } from 'backbone';

const FoodModel = Model.extend({

    defaults: {
        name: '',
        calories: 0,
        selected: false
    }

});

const FoodsCollections = Collection.extend({

    model: FoodModel,

    localStorage: new LocalStorage('foods')

});

var foods = new FoodsCollections();

const SelectedFoodsCollection = Collection.extend({

    model: FoodModel,

    localStorage: new LocalStorage('selected-foods')

});

var selectedFoods = new SelectedFoodsCollection();

module.exports = {
    FoodModel,
    foods,
    selectedFoods
};
