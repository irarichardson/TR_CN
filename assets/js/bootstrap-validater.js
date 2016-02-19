$(document).ready(function() {
    $('#registerForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    emailAddress: {
                        message: 'The value is not a valid email address'
                    }
                }
            }
	    password: {
               validators: {
                   notEmpty: {
                        message: 'The password is required'
                    }
                }
            }
        }
        rules: {
            name:{
                minlength: 3,
                maxlength: 20,
                required: true
            },
            email:{
                minlength: 6,
                maxlength: 20,
                required: true
            }
	    password:{
                minlength: 6,
                maxlength: 20,
                required: true
            }
	    highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            }
    });
});