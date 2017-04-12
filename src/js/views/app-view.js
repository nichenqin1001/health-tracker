import { View } from 'backbone';
import $ from 'jquery';

export default View.extend({

    el: '#app',

    events: {
        'click #search-food': 'getFood'
    },

    getFood() {
        $('#search-food-text').empty();
        var searchFoodText = $('#seach-food-text').val();
        $.getJSON('https://api.nutritionix.com/v1_1/search/' + searchFoodText + '?', {
            'results': '0:20',
            'fields': 'item_name,brand_name,item_id,brand_id,nf_calories',
            'appId': 'e24d74f6',
            'appKey': 'd9c92ac01b23ea5673b1de38ca46e84c'
        }, function (data) {
            console.log(data);
        });
    }

});
