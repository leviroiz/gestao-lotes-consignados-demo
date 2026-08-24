# Segurança da demonstração

## Escopo

Este repositório contém somente uma demonstração estática para portfólio. Todos os nomes, códigos, datas e valores são fictícios. Não há conexão com ERP, banco de dados, API, serviço de autenticação ou infraestrutura corporativa.

A tela inicial simula dois perfis apenas no navegador. Essa seleção não é um mecanismo de autenticação e não protege nenhum recurso real.

## Controles adotados

- nenhum arquivo de ambiente, banco de dados ou chave privada é versionado;
- nenhuma marca ou imagem da empresa de origem está incluída;
- o JavaScript não realiza chamadas de rede nem usa cookies ou armazenamento local;
- conteúdo proveniente dos dados simulados é inserido com `textContent`, não com HTML dinâmico;
- uma auditoria automatizada bloqueia categorias comuns de arquivos sensíveis e integrações externas acidentais.

## Limitações

Este projeto não implementa segurança de produção. Controle de acesso, sessões, criptografia, autorização no servidor, proteção contra abuso e persistência segura exigiriam um backend e uma revisão específica de arquitetura.

Se você identificar um problema relacionado exclusivamente a esta demonstração, abra uma issue sem incluir informações privadas.
