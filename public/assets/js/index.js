
$('#chekrelas').on('change', function(e) {
    e.preventDefault();
    var elem	  = document;
    for (let index = 7; index <  12; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked     = this.checked;
       elem.getElementById(elemNam).disabled    = !elem.getElementById(elemNam).disabled
    }
});

$('#checkries').on('change', function(e) {
    e.preventDefault();
    var elem	  = document;
    for (let index = 27; index <  32; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked = this.checked;
    }
});


$('#checkelem').on('change', function(e) {
    e.preventDefault();
    var elem	  = document;
    for (let index = 12; index <  17; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked = this.checked;
    }
});

$('#checkherram').on('change', function(e) {
    e.preventDefault();
    var elem	  = document;
    for (let index = 71; index <  75; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked = this.checked;
    }
});

$('#checkorden').on('change', function(e) {
    e.preventDefault();
    var elem	  = document;
    for (let index = 75; index <  81; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked = this.checked;
    }
});



$('#formCheck-6').on('change', function(e) {
    e.preventDefault();
    var elem	  = document;
    for (let index = 7; index <  17; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked = this.checked;
    }

    for (let index = 27; index <  32; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked = this.checked;
    }

    for (let index = 71; index <  81; index++) {
        var  elemNam    = 'formCheck-' + index ;
       elem.getElementById(elemNam).checked = this.checked;
    }
});

$('#btnClose').on('click',function (e) {
    var url_e   = 'home/closeSession',
      elem	  = document,
      data          = {};
    $.ajax({
        type	: "POST",
        url	    : url_e,
        success: function(data)
        {
            window.location.reload();               
        },
        failure: function (data) {
            alertify.message('Error inesperado...!');
        }
    });
});



$('.formsave').on('submit', function(e) {
  e.preventDefault();
  var url_e   = $(this).attr("action"),
      elem	  = document,
      data          = {};
    $('input').each(function () {
        data[this.name] = this.value;
    });
    $('textarea').each(function () {
        data[this.name] = this.value;
    });
    $.ajax({
        type	: "POST",
        url	    : url_e,
        data	: {
            records : JSON.stringify(data) // Adjuntar los campos del formulario enviado.
        },
        success: function(data)
        {
            var
                res = JSON.parse(data),
                req = res.success;
            if (req == true) {
                alertify.message('Se han guardado los datos correctamente.');
                window.location.reload();               
            } else {
                alertify.message('No se han guardado los datos!');
            }
        },
        failure: function (data) {
            alertify.message('Error inesperado...!');
        }
    });
});

$('.login').on('submit', function(e) {
  e.preventDefault();
  var $this = $(this),
      url_e   = $(this).attr("action"),
      elem	  = document,
      data          = {};
    data = {
        user  : elem.getElementById('username').value,
        pass  : Sha1.hash(elem.getElementById('password').value)
    };
    $.ajax({
        type	: "POST",
        url	    : url_e,
        data	: data, // Adjuntar los campos del formulario enviado.
        success: function(data)
        {
            var
                res = JSON.parse(data),
                req = res.request;
            if (req) {
                if (req == 1) {
                    alertify.message('Ingresando al sistema');
                    window.location.reload();
                } else {
                    alertify.message('No se han guardado los datos!');
                }
            } else {
                alertify.message('No se han guardado los datos!');
            }

        },
        failure: function (data) {
            alertify.message('Error inesperado...!');
        }
    });
});
