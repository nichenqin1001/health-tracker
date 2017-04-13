import { View } from 'backbone';

import template from './selected-food-template.html';

export default View.extend({

    tagName: 'a',

    className: 'list-group-item',

    template,

    events: {
        'click .delete-food': 'deleteFood'
    },

    initialize() {

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);

    },

    render() {

        this.$el.html(this.template(this.model.toJSON()));
        return this;

    },

    deleteFood() {

        this.model.destroy();

    }

});
