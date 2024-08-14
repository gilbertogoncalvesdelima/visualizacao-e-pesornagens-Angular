# FrontEnd



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## NetLify

Como criar e adicionar o arquivo _redirects:

Criar o arquivo:

Abra um editor de texto simples, como o Bloco de Notas (Notepad) no Windows ou o TextEdit no macOS (configurado para texto simples).

Nome do arquivo:
_redirects

Digite a regra de redirecionamento: 
/* /index.html 200.

Salve o arquivo com o nome _redirects, certificando-se de que não há nenhuma extensão no nome do arquivo. No Windows, você pode precisar colocar o nome entre aspas, como "_redirects", ao salvar, para evitar que o editor adicione uma extensão automaticamente.
Adicionar ao projeto:
Coloque o arquivo _redirects na pasta de saída do build do seu projeto Angular. Normalmente, essa pasta é dist/nome-do-seu-projeto se você estiver usando o Angular CLI padrão para construir seu projeto.
O arquivo deve estar na raiz dessa pasta de saída, ao lado do index.html.
Deploy no Netlify:
Faça o deploy da sua aplicação no Netlify novamente. Você pode fazer isso fazendo um commit e push das mudanças para o seu repositório git se estiver usando a integração contínua do Netlify, ou pode fazer o upload manual dos arquivos da pasta de build se estiver usando o deploy manual.
Essa configuração garantirá que todas as solicitações HTTP para rotas em sua aplicação Angular sejam direcionadas ao index.html, permitindo que o roteamento do lado do cliente funcione corretamente, mesmo em recargas de página ou quando acessadas diretamente pela URL
