# cep.js

> Encontre o Endereço completo a partir do CEP.

----
## Instalação
Você pode baixar o repositório aqui [Download ZIP](https://github.com/modugno/cep.js/archive/master.zip)

----
## Como Usar
* Chame o script na página

```html
<script src="cep.js"></script>
```

* Inicialize o Plugin

```javascript
new Cep('.cep');
```

* Exemplo de Formulário
```html
<input type="text" class="cep" placeholder="CEP">
<input type="text" class="logradouro" placeholder="Rua">
<input type="text" class="complemento" placeholder="Complemento">
<input type="text" class="bairro" placeholder="Bairro">
<input type="text" class="localidade" placeholder="Cidade">
<input type="text" class="uf" placeholder="UF">
```

Ao digitar o CEP e sair do campo (event blur) ele irá buscar o endereço e irá popular no formulário.
## Configurações
Caso queira algo mais personalizado, você pode passar como segundo parametro do construtor um objeto com as configurações.
```javascript
new Cep('.cep', {
	// mensagem que sera exibida quando estiver pesquisando o cep
	loadText: 'Carregando...',

	// mensagem padrão de erro
	errorText: 'Whoops, ocorreu um erro interno ao trazer os dados =[',

	// campos do formulário
	logradouro  : '.logradouro',
	complemento : '.complemento',
	bairro      : '.bairro',
	localidade  : '.localidade',
	uf          : '.uf'
});
```

