import { View } from 'backbone';
import template from './food-template.html';

export default View.extend({

    tagName: 'a',

    className: 'list-group-item',

    template: template,

    render() {

        this.$el.html(this.template(this.model.toJSON()));
        return this;

    }

});
