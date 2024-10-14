(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        });
    });

    /*==================================================================
    [ Validate for both forms ]*/
    $('.validate-form').on('submit', function(event){
        var check = true;
        var formId = $(this).attr('id');  // Lấy ID của form đang được submit

        // Chọn tất cả các input trong form đang được submit
        var inputs = $('#' + formId + ' .validate-input .input100');

        for (var i = 0; i < inputs.length; i++) {
            if (validateEmail(inputs[i]) == false || validateNotEmpty(inputs[i]) == false) {
                showValidate(inputs[i]);
                check = false;
            }
        }

        // Ngăn submit nếu có lỗi
        if (!check) {
            event.preventDefault();
        }
        return check;
    });

    /*==================================================================
    [ Validate email function ]*/
    function validateEmail(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        return true;
    }

    /*==================================================================
    [ Validate not empty function ]*/
    function validateNotEmpty(input) {
        if ($(input).val().trim() == '') {
            return false;
        }
        return true;
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Hide validate on focus ]*/
    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    /*==================================================================
    [ Toggle Between Login and Signup ]*/
    $(document).ready(function() {
        $('#slide-btn-signin').on('click', function() {
            $('#signin').addClass('transform-100');
        });

        $('#slide-btn-signup').on('click', function() {
            $('#signin').removeClass('transform-100');
        });
    });
})(jQuery);

