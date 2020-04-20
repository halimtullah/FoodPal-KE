$(document).ready(function() {
  
    $('#rootwizard').bootstrapWizard({
        'tabClass': 'form-wizard',
        'onNext': function(tab, navigation, index) {
            var $valid = $("#checkOutForm").valid();
            if (!$valid) {
                return false;
            } else {
                $('#rootwizard').find('.form-wizard').children('li').eq(index - 1).addClass('complete');
                $('#rootwizard').find('.form-wizard').children('li').eq(index - 1).find('.step').html('<i class="fa fa-check"></i>');
            }
        }
    });
});