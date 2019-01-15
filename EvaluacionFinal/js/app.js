var Calculadora = {

	teclas: document.getElementsByClassName('tecla'),
	display: document.getElementById('display'),
	variable1: "",
	variable2: "",
	resultado: "",
	operador: "",

	init: function () {
		this.efectoTeclas();
		this.eventoIngresarTecla();
	},

	efectoTeclas: function() {
		for(var i=0; i<this.teclas.length; i++) {
			this.teclas[i].onmousedown = this.eventoReducirTecla;
			this.teclas[i].onmouseup = this.eventoVolverTecla;
		}
	},

	eventoReducirTecla: function(event) {
		var tecla = event.target;
		tecla.style.transform = "scale(0.9)";
	},

	eventoVolverTecla: function(event) {
		var tecla = event.target;
		tecla.style.transform = "scale(1.0)";
	},
	
	operacion: function(numero1,numero2,operacion) {
		switch(operacion) {
			case "mas":
				Calculadora.resultado = numero1 + numero2;
				return Calculadora.resultado
			case "menos":
				Calculadora.resultado = numero1 - numero2;
				return Calculadora.resultado
			case "por":
				Calculadora.resultado = numero1 * numero2;
				return Calculadora.resultado
			case "dividido":
				Calculadora.resultado = numero1 / numero2;
				return Calculadora.resultado
		}
	},

	eventoIngresarTecla: function() {
		for(var i=0; i<this.teclas.length; i++) {
			this.teclas[i].onclick = this.ingresarTecla;
		}
	},

	ingresarTecla: function(event) {
		var tecla = event.target;		
		if(Number(tecla.id) >= 0) {
			if(Calculadora.resultado != "") {
				Calculadora.resetearDisplay("2");
			}
			Calculadora.mostrarNumero(tecla)
		} else if(tecla.id == "on") {
			Calculadora.resetearDisplay("1");
		} else if(tecla.id == "punto") {
			Calculadora.mostrarDecimal(tecla);
		} else if(tecla.id == "sign") {
			Calculadora.cambiarSigno();
		} else if(tecla.id == "dividido" || tecla.id == "por" || tecla.id == "menos" || tecla.id == "mas") {
			Calculadora.iniciarOperacion(tecla);
		} else if(tecla.id == "igual") {
			Calculadora.mostrarResultado();
		}
	},

	mostrarNumero: function(element) {
		if(this.display.textContent.length == 1 && this.display.textContent == "0") {
			Calculadora.modificarDisplay(element,"1")
		} else if (this.display.textContent.length >= 1 && this.display.textContent != "0") {
			Calculadora.modificarDisplay(element,"2")
		} else if(this.display.textContent == "") {
			Calculadora.modificarDisplay(element,"1")
		}
	},

	mostrarDecimal: function(element) {
		if(this.display.textContent.length == 1 && this.display.textContent == "0") {
			Calculadora.modificarDisplay(element,"3")
		} else if (this.display.textContent.length >= 1 && Calculadora.verificarPunto() == false) {
			Calculadora.modificarDisplay(element,"4")
		}
	},

	verificarPunto: function () {
		if(this.display.textContent.indexOf(".") >= 1) {
			return true;
		} else {
			return false;
		}
	},

	cambiarSigno: function() {
		if(this.display.textContent.substr(0,1) == "-") {
			this.display.textContent = this.display.textContent.substr(1);
		} else if(this.display.textContent.substr(0,1) != "0") {
			this.display.textContent = "-" + this.display.textContent;
		}
	},

	modificarDisplay: function(element,condicion) {
		switch(condicion) {
			case "1" :
				if(Calculadora.validarDigitos() == true) {
					this.display.textContent = element.id;
				}
				break;
			case "2" :
				if(Calculadora.validarDigitos() == true) {
					this.display.textContent = this.display.textContent + element.id;
				}
				break;
			case "3" :
				if(Calculadora.validarDigitos() == true) {
					this.display.textContent = this.display.textContent + ".";
				}
				break;
			case "4" :
				if(Calculadora.validarDigitos() == true) {
					this.display.textContent = this.display.textContent + ".";
				}
				break;
		}
	},

	iniciarOperacion: function(element) {
		if(Calculadora.variable1 == "") {
			Calculadora.variable1 = display.textContent;
		} else if(Calculadora.resultado != "") {
			Calculadora.variable1 = Calculadora.resultado;
			Calculadora.resultado = "";
		}
		Calculadora.operador = element.id;
		Calculadora.resetearDisplay("2");
	},

	mostrarResultado: function() {
		if(Calculadora.variable1 != "") {
			Calculadora.variable2 = display.textContent;
			visorResultado = Calculadora.operacion(Number(Calculadora.variable1),Number(Calculadora.variable2),Calculadora.operador);
			display.textContent = Calculadora.formatoResultado(visorResultado);

		} else if(Calculadora.resultado != ""){
			visorResultado = Calculadora.operacion(Number(Calculadora.resultado),Number(Calculadora.variable2),Calculadora.operador)
			display.textContent = Calculadora.formatoResultado(visorResultado);
		}
	},

	resetearDisplay: function(condicion) {
		if(condicion == "1") {
			this.display.textContent = "0";
			Calculadora.variable1 = "";
			Calculadora.variable2 = "";
			Calculadora.resultado = "";
			Calculadora.operador = "";
		} else if(condicion == "2") {
			this.display.textContent = "";
		}
	},

	validarDigitos: function() {
		if(this.display.textContent.length < 8) {
			return true;
		} else {
			return false;
		}
	},

	formatoResultado: function(valor) {
		x = String(valor);
		if(x.length <=8){
			return x;
		} else {
			return x.slice(0, 8);
		}
	}
};

Calculadora.init();