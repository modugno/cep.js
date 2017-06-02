class Cep {

	/**
	 * Construtor
	 * @param  String element class/id/tag no qual irá conter o CEP 
	 * @param  Object settings configurações do plugin
	 * @return void
	 */
	constructor(element, settings) {
		
		// seta as configurações padrões
		this.settings = this._setSettings();

		// se foi passada alguma configuração por parametro, adiciona ela nas configurações gerais
		if (settings !== undefined) {
			Object.assign(this.settings, settings);
		}

		console.log(this.settings);
		return;
		// retorna os inputs da página
		this.input = this._getInputs(element);

		// adiciona um evento de 'blur' quando o usuário sair do campo de CEP, para fazer a requisição
		this.input._cep.addEventListener('blur', this.buscarCep.bind(this));

	}

	/**
	 * Seta as configurações
	 */
	_setSettings() {

		return {
			// mensagem que sera exibida quando estiver pesquisando o cep
			loadText: 'Carregando...',
			errorText: 'Whoops, ocorreu um erro interno ao trazer os dados =[',

			// informações sobre o endereço
			logradouro  : '.logradouro',
			complemento : '.complemento',
			bairro      : '.bairro',
			localidade  : '.localidade',
			uf          : '.uf'

		}
	}

	/** Retorna os inputs da página
	 * 
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	_getInputs(element) {
		return {
			_cep         : document.querySelector(element),
			_logradouro  : document.querySelector(this.settings.logradouro),
			_complemento : document.querySelector(this.settings.complemento),
			_bairro      : document.querySelector(this.settings.bairro),
			_localidade  : document.querySelector(this.settings.localidade),
			_uf          : document.querySelector(this.settings.uf)
		}
	}

	/**
	 * Retorna o JSON com os dados de endereço direto da Viacap.com.br
	 * @param  String cep Número do CEP para procurar
	 * @return JSON com os dados do endereço
	 */
	_get(cep) {

		return new Promise((resolve, reject) => {
			
			let xhr = new XMLHttpRequest;

			// abre uma conexão com a via CEP via GET
			xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`);

			// quando o estado do XMLHttpRequest mudar
			xhr.onreadystatechange = () => {

				// quando chegar no ultimo estágio de conclusão da requisição
				if (xhr.readyState == 4) {	
					
					// Se ocorreu tudo bem, devolve um json com os dados do endereço
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject(xhr.responseText);
					}
				}
				
			};
			// envia a requisição
			xhr.send();
		});

	}

	/**
	 * Método para buscar o CEP 
	 * @return JSON com os dados do endereço do CEP
	 */
	buscarCep() {
			
		// seta o cep que sera enviado a viacep.com.br
		let cep = this.input._cep.value;

		// valida se o cep foi informado
		if (this.input._cep.value == '') return;

		// muda o status dos inputs para carregando
		this._preLoadDefault();

		// faz a requisição pelo endereço
		this._get(cep).then((response) => {
			
			// seta os campos
			this._setAddress(response);

			this._enableInput();

		}).catch(error => {

			this._enableInput();
			this._resetInput();

			// retorna o erro
			console.log(error);
			alert(this.settings.errorText);
		});

	}

	/**
	 * No momento da requisição, bloqueará todos os campos, e colocara uma mensagem padrão até que a requisição termine.
	 * @return {[type]} [description]
	 */
	_preLoadDefault() {

		// desabilita os campos
		this._disableInput();

		// seta a mensagem de de settings.loadText para os campos
		this.input._cep.value         = this.settings.loadText;
		this.input._logradouro.value  = this.settings.loadText;
		this.input._complemento.value = this.settings.loadText; 
		this.input._bairro.value      = this.settings.loadText; 
		this.input._localidade.value  = this.settings.loadText; 
		this.input._uf.value          = this.settings.loadText;
	}

	/**
	 * Desabilita os inputs
	 * @return void
	 */
	_disableInput() {
		// percorre todos os campos do formulário e bloqueia
		Object.values(this.input).map(input => input.setAttribute('disabled', 'disabled'));	
	}

	/**
	 * Habilita os inputs
	 * @return void
	 */
	_enableInput() {
		// percorre todos os campos do formulário e bloqueia
		Object.values(this.input).map(input => input.removeAttribute('disabled'));	
	}

	/**
	 * Limpa todos os campos
	 * @return {[type]} [description]
	 */
	_resetInput() {
		this.input._logradouro.value  = '';
		this.input._complemento.value = '';
		this.input._bairro.value      = '';
		this.input._localidade.value  = '';
		this.input._uf.value          = '';
	}

	/**
	 * Seta as informações do endereço nos campos
	 * @param Json response
	 */
	_setAddress(response) {
		this.input._cep.value         = response.cep;
		this.input._logradouro.value  = response.logradouro;
		this.input._complemento.value = response.complemento;
		this.input._bairro.value      = response.bairro;
		this.input._localidade.value  = response.localidade; 
		this.input._uf.value          = response.uf;
	}

}