# Painel de Gestão de Lotes Consignados

Demonstração pública de uma interface para acompanhar lotes consignados, acertos, devoluções e saldos pendentes por vendedor e cliente.

> Esta versão foi reconstruída para portfólio com dados 100% sintéticos. Ela não contém marcas, credenciais, endpoints, documentos, banco de dados ou código de integração da empresa que originou o estudo.

## Demonstração

[Abrir a versão online](https://leviroiz.github.io/gestao-lotes-consignados-demo/)

Também é possível baixar o repositório e abrir `index.html` diretamente no navegador. Não há instalação, servidor ou cadastro.

Na tela inicial, escolha um dos dois perfis simulados:

- **Administrador:** visão consolidada, filtros e comparação entre carteiras.
- **Vendedor:** acesso restrito a uma carteira individual.

Não há autenticação real: a escolha de perfil altera apenas a experiência exibida localmente.

## O problema modelado

O projeto nasceu da análise de um processo real de acompanhamento de consignados. A informação precisava ser transformada em uma visão simples para identificar clientes com saldo em aberto, consolidar quantidades enviadas, vendidas e devolvidas e priorizar os próximos acertos.

A solução operacional adotada pela empresa foi aproveitar uma funcionalidade já existente no aplicativo utilizado pela equipe e treinar os vendedores nesse fluxo. O protótipo deste repositório registra a etapa de diagnóstico, modelagem das regras e desenho da experiência — não é apresentado como um sistema implantado em produção.

## O que a demonstração permite explorar

- alternância entre perfis administrativo e vendedor;
- consolidação de indicadores por carteira;
- busca, filtros combinados e ordenação da tabela;
- comparação resumida entre vendedores;
- estados de carregamento, ausência de dados e falha simulada;
- layout responsivo para desktop e dispositivos móveis;
- renderização segura de conteúdo dinâmico com APIs nativas do DOM.

## Decisões da versão pública

```text
Dados sintéticos em JavaScript
          ↓
Regras de filtro e consolidação no navegador
          ↓
Interface responsiva por perfil
```

Esta edição é deliberadamente estática: não realiza requisições de rede, não grava cookies ou armazenamento local e não possui backend. A arquitetura interna estudada para o projeto incluía API, autenticação por perfil, persistência local e uma camada de integração com ERP; esses componentes foram excluídos desta publicação para preservar informações operacionais.

## Tecnologias

- HTML5 semântico;
- CSS responsivo;
- JavaScript sem frameworks;
- GitHub Actions para auditoria e publicação;
- GitHub Pages para hospedagem.

## Qualidade e segurança

O fluxo de validação verifica a sintaxe do JavaScript, a estrutura básica do HTML e a ausência de arquivos sensíveis, chamadas de rede e padrões comuns de credenciais. Consulte [SECURITY.md](SECURITY.md) para conhecer o escopo e as limitações da demonstração.

## Autor

Projeto e implementação por [Carlos Levi](https://github.com/leviroiz).

## Licença

Código disponibilizado sob a [licença MIT](LICENSE).
