# 📦 Painel de Gestão de Lotes Consignados

Demonstração pública de uma solução criada a partir da análise de um processo real de consignação, com foco no acompanhamento de **lotes, acertos, devoluções e saldos pendentes por vendedor e cliente**.

[![Quality](https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/quality.yml/badge.svg)](https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/quality.yml)
[![Deploy](https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/pages.yml/badge.svg)](https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/pages.yml)
[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-222222?logo=githubpages&logoColor=white)](https://leviroiz.github.io/gestao-lotes-consignados-demo/)
[![License](https://img.shields.io/badge/Licença-MIT-green.svg)](LICENSE)

### 🌐 [Abrir demonstração online](https://leviroiz.github.io/gestao-lotes-consignados-demo/)

> **Nota sobre a versão pública**
>
> Esta demonstração foi reconstruída especificamente para portfólio utilizando dados 100% sintéticos.  
> Não contém marcas, credenciais, endpoints, documentos, bancos de dados, integrações ou informações operacionais da empresa que originou o estudo.

---

## 🎯 Contexto

O projeto nasceu da análise de um processo real de acompanhamento de produtos consignados.

A operação precisava transformar informações sobre lotes e clientes em uma visão mais clara para responder perguntas como:

- quais clientes ainda possuem saldo pendente;
- quantas peças foram enviadas, vendidas e devolvidas;
- qual o saldo atual de cada consignação;
- quais vendedores possuem acertos em aberto;
- quais carteiras precisam ser priorizadas;
- como consolidar essas informações para acompanhamento administrativo.

A proposta foi transformar essas regras operacionais em uma interface capaz de facilitar a leitura dos dados e reduzir a necessidade de conferências manuais.

---

## 💡 Solução

O conceito foi estruturado em torno de dois perfis de utilização.

### 👨‍💼 Administrador

Visão consolidada da operação, com recursos para:

- acompanhar indicadores gerais;
- comparar carteiras;
- visualizar diferentes vendedores;
- buscar clientes;
- aplicar filtros combinados;
- ordenar resultados;
- identificar saldos e pendências.

### 🧑‍💼 Vendedor

Visão individual de uma carteira, com foco em:

- clientes vinculados ao vendedor;
- lotes ainda em aberto;
- quantidades pendentes;
- valores pendentes;
- acompanhamento dos próximos acertos.

Na demonstração pública, esses perfis são apenas simulados no navegador. Não existe autenticação real ou proteção de recursos.

---

## 🔎 O que é possível explorar

A demonstração inclui:

- alternância entre perfis administrativo e vendedor;
- indicadores consolidados;
- comparação resumida entre vendedores;
- busca por cliente;
- filtros por vendedor, período, quantidade e valor;
- ordenação dos resultados;
- quantidades enviadas, vendidas, devolvidas e pendentes;
- valores pendentes;
- estados de carregamento;
- estado sem resultados;
- cenário de falha simulada;
- atualização da visualização;
- interface responsiva;
- adaptação da experiência conforme o perfil selecionado.

---

## 🏗️ Arquitetura

O projeto possui uma separação importante entre o **protótipo estudado originalmente** e a **demonstração publicada neste repositório**.

| Protótipo original | Demonstração pública |
|---|---|
| Arquitetura full stack | Aplicação estática |
| Backend e API | Sem backend |
| Persistência de dados | Dados sintéticos em JavaScript |
| Autenticação e perfis | Perfis simulados localmente |
| Integração com ERP | Sem integrações externas |
| Regras processadas pelo sistema | Regras executadas no navegador |
| Ambiente operacional | GitHub Pages |

### Arquitetura conceitual do protótipo original

```text
Usuário
   ↓
Interface Web
   ↓
Jinja2 + HTML + CSS + JavaScript
   ↓
FastAPI
   ↓
Regras de negócio
   ↓
SQLite
   ↓
Camada de integração
   ↓
ERP / API REST
```

O estudo original envolveu conceitos e tecnologias como:

- Python;
- FastAPI;
- Jinja2;
- HTML, CSS e JavaScript;
- SQLite;
- HTTPX;
- API REST;
- autenticação;
- autorização por perfil;
- gerenciamento de sessão;
- persistência;
- testes automatizados com Pytest.

> Esses componentes pertencem ao protótipo original e **não fazem parte do código disponibilizado neste repositório público**.

---

## 🌐 Arquitetura da demonstração

A versão pública foi deliberadamente simplificada:

```text
Dados sintéticos em JavaScript
          ↓
Filtros e regras de consolidação
          ↓
Controle local do perfil
          ↓
Manipulação do DOM
          ↓
Interface responsiva
```

Essa versão:

- não possui backend;
- não possui banco de dados;
- não realiza autenticação real;
- não utiliza cookies;
- não utiliza `localStorage`;
- não depende de serviços internos;
- não realiza integração com ERP;
- não utiliza endpoints privados.

Essa decisão permite demonstrar a lógica e a experiência do projeto sem expor componentes da operação original.

---

## 🛠️ Tecnologias da versão pública

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

### Frontend

- HTML5 semântico;
- CSS responsivo;
- JavaScript sem frameworks;
- APIs nativas do DOM;
- `Intl.NumberFormat` para valores e quantidades;
- filtros e ordenação executados no navegador.

### Infraestrutura

- GitHub Actions;
- GitHub Pages;
- pipeline automatizado de validação;
- deploy automático da branch `main`.

---

## 🧪 Qualidade e CI

O repositório possui um fluxo de validação executado automaticamente em pushes e pull requests.

O pipeline executa:

```text
Código enviado
      ↓
GitHub Actions
      ↓
Validação da sintaxe JavaScript
      ↓
Auditoria da demonstração pública
      ↓
Aprovação / bloqueio
```

Entre as verificações realizadas estão:

- validação da sintaxe de `assets/app.js`;
- verificação da existência e estrutura básica de `index.html`;
- busca por arquivos potencialmente sensíveis;
- detecção de extensões de bancos de dados e certificados;
- identificação de arquivos como `.env` e chaves privadas;
- busca por padrões comuns de API keys;
- busca por client secrets;
- busca por bearer tokens;
- detecção de chamadas de rede acidentais na aplicação.

O deploy para o GitHub Pages é realizado por um workflow separado.

---

## 🔐 Segurança e privacidade

A preparação da demonstração pública seguiu o princípio de **não expor informações relacionadas à operação que originou o projeto**.

Algumas decisões adotadas:

- utilização exclusiva de dados fictícios;
- remoção de marcas e nomes reais;
- ausência de credenciais;
- ausência de bancos de dados;
- ausência de endpoints internos;
- ausência de integrações corporativas;
- nenhuma coleta de dados dos visitantes;
- conteúdo dinâmico renderizado com APIs seguras do DOM, como `textContent`;
- auditoria automática antes da publicação.

A demonstração não representa uma arquitetura de segurança de produção.

Recursos como autenticação real, autorização no servidor, criptografia, persistência segura e proteção contra abuso exigiriam backend e análise específica de arquitetura.

Mais detalhes:

👉 [SECURITY.md](SECURITY.md)

---

## 🏢 Decisão de produto

Durante a evolução do projeto, foi identificado que a empresa já possuía uma funcionalidade interna capaz de atender parte relevante do problema.

A decisão operacional foi aproveitar essa solução existente e estruturar seu uso junto à equipe, em vez de introduzir um novo sistema.

Por esse motivo, este projeto **não é apresentado como uma aplicação implantada em produção**.

O protótipo cumpriu seu papel durante as etapas de:

```text
Problema operacional
        ↓
Análise do processo
        ↓
Levantamento de requisitos
        ↓
Modelagem das regras
        ↓
Proposta de solução
        ↓
Protótipo
        ↓
Validação
        ↓
Decisão operacional
```

Essa decisão também faz parte do desenvolvimento de software: nem todo problema precisa resultar na implantação de uma nova aplicação.

---

## 🧠 O que este projeto demonstra

O projeto reúne experiência prática em:

- análise de processos;
- levantamento de requisitos;
- transformação de regras de negócio em software;
- modelagem de perfis de usuário;
- desenho de fluxos e interfaces;
- desenvolvimento frontend;
- arquitetura backend;
- APIs REST;
- persistência;
- integração entre sistemas;
- testes;
- Git e GitHub;
- CI/CD;
- segurança;
- preparação de uma versão pública sem exposição de dados corporativos.

---

## 🚀 Executando localmente

A demonstração não possui dependências externas.

Clone o repositório:

```bash
git clone https://github.com/leviroiz/gestao-lotes-consignados-demo.git
cd gestao-lotes-consignados-demo
```

Depois abra:

```text
index.html
```

diretamente no navegador.

Também é possível baixar o repositório como ZIP e abrir o arquivo `index.html`.

---

## 📁 Estrutura principal

```text
gestao-lotes-consignados-demo/
│
├── .github/
│   └── workflows/
│       ├── pages.yml
│       └── quality.yml
│
├── assets/
│   ├── app.js
│   └── styles.css
│
├── scripts/
│   └── audit_public_demo.py
│
├── index.html
├── README.md
├── SECURITY.md
├── LICENSE
└── .gitignore
```

---

## 👨‍💻 Autor

Projeto e implementação por **Carlos Levi**.

[![GitHub](https://img.shields.io/badge/GitHub-leviroiz-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/leviroiz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-leviroiz-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leviroiz)

---

## 📄 Licença

Código disponibilizado sob a [Licença MIT](LICENSE).
