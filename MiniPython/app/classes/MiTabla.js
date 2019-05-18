var Ident = require('./Identificador');

    function MiTabla(){
        this.tabla = [];
        this.nivelActual = -1;
        return this;
    }
    MiTabla.prototype.constructor = MiTabla;
    MiTabla.prototype.insertar = function(id,tipo){
        if (this.buscarPorNivel(id) == null) {
            var i = new Ident(id, tipo, this.nivelActual);
            this.tabla.push(i)
        }
    };
    MiTabla.prototype.buscar = function(nombre){
        temp = null;
        for(i = this.tabla.length-1; i >=0;i--){
            console.log("En el buscar",this.tabla[i].token.text);
            if(this.tabla[i].token.text === nombre){
                temp = this.tabla[i]
            }
        }
        return temp
    };
    MiTabla.prototype.buscarPorNivel = function(nombre){
        temp = null;
        for(i = this.tabla.length-1; i >=0;i--){
            //console.log("Nivel en la tabla",this.tabla[i].nivel, "NivelActual",this.nivelActual);
            //console.log("En el buscarPorNivel",this.tabla[i].tok);
            if(this.tabla[i].nivel === this.nivelActual){
                if(this.tabla[i].token.text === nombre){
                    temp = this.tabla[i]
                }
            }
        }
        return temp
    };

    MiTabla.prototype.openScope =  function(){
        this.nivelActual ++;
    };
    MiTabla.prototype.closeScope = function(){
        var i = 0;
        while (i < this.tabla.length){
            if(this.tabla[i].nivel === this.nivelActual){
                this.tabla.splice(i,1);
                i = 0;
            }else {
                i++;
            }
        }
        this.nivelActual--;
    };
    /*closeScope(nivel){
        for(i = 0; i<this.tabla.length();i++){
            if(this.tabla[i].nivel === nivel){
                this.tabla.splice(i,1);
            }
        }
        this.nivelActual--;
    }*/
    MiTabla.prototype.imprimir = function(){
        console.log("Cantidad de elementos de la tabla",this.tabla.length);
        for(i = 0; i<this.tabla.length;i++){
            s = this.tabla[i].token.text;
            console.log("Nombre "+ s+" - " +"Nivel: " +this.tabla[i].nivel);
        }
    };


module.exports = MiTabla;

