$(document).ready(function () {

    //    $('.demo-confirm').click(function () {
    //        event.preventDefault();
    //        vex.dialog.alert({
    //            message: 'The Fuck?',
    //            className: 'vex-theme-wireframe' // Overwrites defaultOptions
    //        });
    //    });


    function showDialog(cb) {

        var $contactData = $('#contactData');
        vex.dialog.open({
            showCloseButton: true,
            unsafeMessage: '<div id="contactData"><h1>Contact Us</h1><div class="reveal"><ul><li>Go Work</li><li>Menara Rajawali</li><li>Ground Floor</li><li>(+62)81219221497</li></ul><p>Or you can write your message here, remember to fill your email address.</p></div></div>',
            //            message: 'Enter notes for this context',

            input: [
                '<input name="email" type="text" placeholder="Email Address" required />',
                '<textarea name="notes" rows="6", cols="80 placeholder="Type Your Message"/>',
                ].join(''),
            className: 'vex-theme-wireframe',
            buttons: [
      $.extend({}, vex.dialog.buttons.YES, {
                    text: 'SUBMIT'
                }),
//      $.extend({}, vex.dialog.buttons.NO, {
             //                    text: 'Cancel'
             //                })
    ],
            callback: function (data) {
                if (data) {
                    console.log(data.notes);
                    cb(data.notes);
                }
            }
        });
    }

    $('.contacts').click(function () {
        showDialog(function (notes) {
            $('.message').text(notes);
        })
    });



    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });

    // This button will increment the value
    $('.qtyplus').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(1);
        }
    });

    $(".addCart").click(function (e) {
        e.preventDefault();
        $(".shopCart a").addClass('addIn');

        $(".countItem").html(function (i, val) {

            return $("input.qty").val();
        });

        if ($("shopCart p").value != '(0)') {
            console.log('not empty');
            $(".shopCart a").addClass('addIn');
            $(".shopCart p").css({
                "left": "52px",
                "opacity": "100%"
            });
        } else {
            $(".shopCart a").removeClass('addIn');
        }
    });

    /* activate pause for lightbulb video if scrolled out of viewport */



});

$(function () {

    $('li.dropdown > a').on('click', function (event) {

        event.preventDefault()

        $('.dropdown-menu').css({
            //            "display": "flex",
            "transform": "none"
        });

        //Hide menu when clicked outside
        //        $('.dropdown-menu').mouseleave(function () {
        //            var thisUI = $(this);
        //            $('html').click(function () {
        //                thisUI.hide();
        //                $('html').unbind('click');
        //            });
        //        });


    });

    $('.close').on('click', function (event) {

        event.preventDefault()

        $('.dropdown-menu').css({
            "transform": "translate(0, -200%)"
        });

    });


});

$(window).scroll(function () {
    if ($(window).scrollTop() >= 96) {
        $('.cover').addClass('fixed-header');
        $('.cover div').addClass('visible-title');
    } else {
        $('.cover').removeClass('fixed-header');
        $('.cover div').removeClass('visible-title');
    }
});



/* Set values + misc */
var promoCode;
var promoPrice;
var fadeTime = 300;

/* Assign actions */
$('.quantity input').change(function () {
    updateQuantity(this);
});

$('.remove button').click(function () {
    removeItem(this);
});

$(document).ready(function () {
    updateSumItems();
});

$('.promo-code-cta').click(function () {

    promoCode = $('#promo-code').val();

    if (promoCode == '10off' || promoCode == '10OFF') {
        //If promoPrice has no value, set it as 10 for the 10OFF promocode
        if (!promoPrice) {
            promoPrice = 10;
        } else if (promoCode) {
            promoPrice = promoPrice * 1;
        }
    } else if (promoCode != '') {
        alert("Invalid Promo Code");
        promoPrice = 0;
    }
    //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
    if (promoPrice) {
        $('.summary-promo').removeClass('hide');
        $('.promo-value').text(promoPrice.toFixed(2));
        recalculateCart(true);
    }
});

/* Recalculate cart */
function recalculateCart(onlyTotal) {
    var subtotal = 0;

    /* Sum up row totals */
    $('.basket-product').each(function () {
        subtotal += parseFloat($(this).children('.subtotal').text());
    });

    /* Calculate totals */
    var total = subtotal;

    //If there is a valid promoCode, and subtotal < 10 subtract from total
    var promoPrice = parseFloat($('.promo-value').text());
    if (promoPrice) {
        if (subtotal >= 10) {
            total -= promoPrice;
        } else {
            alert('Order must be more than £10 for Promo code to apply.');
            $('.summary-promo').addClass('hide');
        }
    }

    /*If switch for update only total, update only total display*/
    if (onlyTotal) {
        /* Update total display */
        $('.total-value').fadeOut(fadeTime, function () {
            $('#basket-total').html(total.toFixed(2));
            $('.total-value').fadeIn(fadeTime);
        });
    } else {
        /* Update summary display. */
        $('.final-value').fadeOut(fadeTime, function () {
            $('#basket-subtotal').html(subtotal.toFixed(2));
            $('#basket-total').html(total.toFixed(2));
            if (total == 0) {
                $('.checkout-cta').fadeOut(fadeTime);
            } else {
                $('.checkout-cta').fadeIn(fadeTime);
            }
            $('.final-value').fadeIn(fadeTime);
        });
    }
}

/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.subtotal').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });

    productRow.find('.item-quantity').text(quantity);
    updateSumItems();
}

function updateSumItems() {
    var sumItems = 0;
    $('.quantity input').each(function () {
        sumItems += parseInt($(this).val());
    });
    $('.total-items').text(sumItems);
}

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
        updateSumItems();
    });
}
