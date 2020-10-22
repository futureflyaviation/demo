/* global jQuery:false */
/* global WINGER_STORAGE:false */

(function() {
	"use strict";

	// Init skin-specific actions on first run
	// Attention! Don't forget to add the class "inited" and check it to prevent re-initialize the elements
	jQuery( document ).on(
		'action.ready_winger', function() {

            // MailChimp - ID
            //------------------
            if (jQuery('.mc4wp-form-fields').length > 0) {
                var count_mc4wp = 1;
                jQuery('.mc4wp-form-fields').each(
                    function () {
                        jQuery(this).find('input[type="checkbox"]').each(
                            function () {
                                var id = jQuery(this).attr('id');
                                if (id) {
                                }
                                else {
                                    id = 'mc4wp';
                                }
                                jQuery(this).attr('id', id + '-' + count_mc4wp);
                                jQuery(this).next('label').attr('for', id + '-' + count_mc4wp);
                                count_mc4wp++;
                            });
                    });
            }

            // GDPR on click add class checked to label
            if (jQuery('#wpgdprc').length > 0) {
                var label = jQuery('.wpgdprc-checkbox label');
                if (jQuery('#wpgdprc').attr("checked") == 'checked') {
                    label.toggleClass('checked');
                }
                jQuery('#wpgdprc').on('click', function () {
                    if (jQuery('#wpgdprc').attr("checked") == 'checked') {
                        label.addClass('checked');
                    } else {
                        label.removeClass('checked');
                    }
                });
            }

            // Change state submit
            jQuery('.wpcf7-form .wpcf7-wpgdprc input[type="checkbox"]' ).on( 'change', function() {
                var chk    = jQuery(this),
                    button = chk.parents('form').find('input[type="submit"]'),
                    decor  = button.parents('.decor_button');
                decor.toggleClass('disabled', !chk.get(0).checked);
            }).trigger('change');


            // Check valid fields
            function checkValidFields(form) {
                form.find('.asterisk_decor').each( function () {
                    if (jQuery(this).find('.wpcf7-not-valid').length > 0) {
                        jQuery(this).addClass('not-valid');
                    } else {
                        jQuery(this).removeClass('not-valid');
                    }
                });
            }

            jQuery('.wpcf7-form').parents('.wpcf7').on( 'wpcf7:invalid', function() {
                checkValidFields( jQuery(this) );
            });
            jQuery('.wpcf7-form input:not([type="submit"])').on( 'change', function() {
                checkValidFields( jQuery(this).parents('form') );
            });
        }
    );

})();
