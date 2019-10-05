
//  initialize keyboard (required) 
   $(function(){
       $('#email').keyboard();
       $('#password').keyboard();
       $('#first_name').keyboard();
       $('#last_name').keyboard();
       $('#dni').keyboard();
       $('#password_confirmation').keyboard();
   });


$('.register').on('submit', function(e) {
  e.preventDefault();
  var url_e   = $(this).attr("action"),
      elem	    = document,
      redirec   = '/parks',
      data          = {};
    $('input').each(function () {
        data[this.name] = this.value;
    });

    data['id_document'] = 1;
    data['type']        = 3;
    $.ajax({
        type	: "POST",
        url	    : url_e,
        data	: data,
    }).done(function(data){
        var
            res = data
            req = res.success;
        if (req) {
            alertify.message('Se han guardado los datos correctamente.');
            window.location.href =  redirec;               
        } else {
            alertify.message('No se han guardado los datos!');
        }
    }).fail(function (error) {
        alertify.message('Error inesperado...!');
    });
});

$('.login').on('submit', function(e) {
  e.preventDefault();
  var $this = $(this),
      url_e   = $(this).attr("action"),
      elem	  = document,
      redirec   = '/client/services',
      data      = {};
    data = {
        email       : elem.getElementById('email').value,
        password    : elem.getElementById('password').value
    };
    
    $.ajax({
        type	: "POST",
        url	    : url_e,
        data	: data // Adjuntar los campos del formulario enviado.
    }).done( function(data) {
        var
            req = data.success;
        if (req == true && data.user.type == 3) {
            localStorage.setItem('token-customers', JSON.stringify(data));
            alertify.message('Ingresando al sistema');
            window.location.href =  redirec;  
        } else {
            alertify.message('Error de autenticación!');
            $.ajax({
                type	: "GET",
                url	    : '/api/auth/logout',
                // data	: data, 
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", data.token_type +' ' + data.access_token);
                },
                success: function (r){
                },
                failer : function(r){
                }
            });
        }
    }).fail( function(error) {
        alertify.message('Error de autenticación o no está registrado en el sistema!');
    });
});

$('.login-fast').on('submit', function(e) {
  e.preventDefault();
  var $this = $(this),
      url_e   = $(this).attr("action"),
      elem	  = document,
      redirec   = '/fastfood/menu',
      data      = {};
    data = {
        email       : elem.getElementById('email').value,
        password    : elem.getElementById('password').value
    };
    
    $.ajax({
        type	: "POST",
        url	    : url_e,
        data	: data // Adjuntar los campos del formulario enviado.
    }).done( function(data) {
        var
            req = data.success;
        if (req == true && data.user.type == 1) {
            localStorage.setItem('token-fastfood', JSON.stringify(data));
            alertify.message('Ingresando al sistema');
            window.location.href =  redirec;  
        } else {
            alertify.message('Error de autenticación!');
            $.ajax({
                type	: "GET",
                url	    : '/api/auth/logout',
                // data	: data, 
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", data.token_type +' ' + data.access_token);
                },
                success: function (r){
                },
                failer : function(r){
                }
            });
        }
    }).fail( function(error) {
        alertify.message('Error de autenticación o no está registrado en el sistema!');
    });
});
