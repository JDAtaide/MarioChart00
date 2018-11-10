/// <reference path="../AppMC.js" />

//1 - verificar nome de app (ex: app, myApp, mainapp, etc...)

app.factory('utilService', function () {
    return {

        getUrlVars: function () {

            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },

        //TimeStuff
        mostrarHoras: function () {
            var hora = new Date();
            return hora;
        },

        minutesToHours: function (n) {   //Converte Minutos em Horas ex:  90 (m) --> "01:30" 
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);

            if (rhours < 10) {
                rhours = "0" + rhours;
            }
            if (rminutes < 10) {
                rminutes = "0" + rminutes;
            }
            return rhours + ":" + rminutes;
        },

        minutesToDateFormat: function (n) {   //Converte Minutos em Horas ex:  90 (m) --> '1995-12-17T01:30:00' 

            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);

            if (rhours < 10) {
                rhours = "0" + rhours;
            }
            if (rminutes < 10) {
                rminutes = "0" + rminutes;
            }
            var t = rhours + ":" + rminutes;

            return new Date('1995-12-17T' + t + ':00');
        },


        hoursToMinutes: function (horas) { //Converte Minutos em Horas:  "01:30"  --> 90 (m) 
            var c = (horas).toLocaleTimeString();
            var a = c.split(':');
            var duracaoMinutes = (+a[0]) * 60 + (+a[1]);
            return duracaoMinutes
        },


        DateToString: function (date) { //Converte Data em string:  Thu Aug 23 2018 01:00:00 GMT+0100 --> "2018-08-23"
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }




    };
});