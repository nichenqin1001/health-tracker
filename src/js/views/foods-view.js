import { View } from 'backbone';
import FoodView from '../views/food-view';

export default View.extend({

    el: '#foods',

    initialize() {

        this.listenTo(this.model, 'change', this.render);

    },

    render() {

        this.model.each(food => {

            var foodView = new FoodView({ model: food });
            this.$el.append(foodView.render().$el);

        });

        return this;

    }

});
