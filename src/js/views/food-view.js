import { View } from 'backbone';

export default View.extend({

    tagName: 'li',

    className: 'list-group-item',

    render() {

        this.$el.html(this.model.get('calories'));
        return this;

    }

});
