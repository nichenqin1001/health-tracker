import { View } from 'backbone';
import template from './food-template.html';

export default View.extend({

    tagName: 'a',

    className: 'list-group-item',

    template,

    events: {
        'click .add-food': 'addFood'
    },

    initialize() {

        this.listenTo(this.model, 'change', this.render);

    },

    render() {

        this.$el.html(this.template(this.model.toJSON()));
        return this;

    },

    addFood() {

        console.log(this);

    }

});
