# Consignment Batch Management System

A public reconstruction of a consignment workflow explored to make batches, settlements, returns and pending balances easier to understand.

The project started from an operational problem: information was fragmented across customers, sellers and consignment batches, making it difficult to see what was still pending and where attention was needed.

The most important outcome was not the prototype itself. During the analysis, an existing internal solution was found to already address a significant part of the problem, changing the final product decision.

<p>
  <a href="https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/quality.yml">
    <img src="https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/quality.yml/badge.svg" alt="Quality">
  </a>
  <a href="https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/pages.yml">
    <img src="https://github.com/leviroiz/gestao-lotes-consignados-demo/actions/workflows/pages.yml/badge.svg" alt="Deploy">
  </a>
</p>

**[Open the live demo →](https://leviroiz.github.io/gestao-lotes-consignados-demo/)**

---

## Context

The workflow involved tracking consignment activity across customers and sellers.

The main questions were operational:

- Which customers still have open balances?
- How many items were shipped, sold, returned or remain pending?
- Which seller portfolios require attention?
- What value is still open?
- How can this information be consolidated without manually checking multiple records?

The project explored how these questions could be represented in a clearer operational interface.

> [!NOTE]
> This repository is a sanitized public reconstruction.
>
> All customers, sellers, values, dates and operational scenarios are synthetic.

---

## The product decision

A full-stack prototype was initially explored around the workflow.

That work included concepts such as:

```text
Python
FastAPI
Jinja2
SQLite
REST APIs
HTTPX
authentication
authorization
sessions
persistence
ERP integration
```

But building software was not the final objective.

The analysis eventually showed that an existing internal feature could already solve a significant part of the operational problem.

Instead of introducing another application simply because a prototype had already been created, the better operational path was to structure and adopt the existing solution.

The project therefore became an example of a broader process:

```text
Operational problem
        │
        ▼
Process analysis
        │
        ▼
Requirements
        │
        ▼
Business rules
        │
        ▼
Prototype
        │
        ▼
Validation
        │
        ▼
Product decision
```

The prototype still had value: it helped clarify the process, expose requirements and make the alternatives easier to evaluate.

Sometimes the useful outcome of software work is deciding that another system should not be introduced.

---

## What made this tricky

### Turning operational data into useful information

Raw quantities alone were not enough.

The interface needed to preserve the relationship between:

```text
shipped
sold
returned
pending
pending value
```

while still making it easy to identify customers and portfolios that needed attention.

### Different perspectives

An administrator needs a consolidated view across multiple sellers.

A seller needs a narrower view of their own portfolio.

The public demo represents both perspectives, but these profiles are intentionally simulated in the browser.

They are **not authentication or authorization mechanisms**.

### Filtering without losing context

The administrative view combines:

- seller filtering
- customer search
- date ranges
- minimum pending quantity
- minimum pending value
- configurable sorting

The metrics are recalculated from the currently visible data, so the summary remains consistent with the active filters.

### Operational states matter too

A real interface is not always displaying a successful response.

The demo also represents:

```text
loading
data available
no pending data
no filter results
simulated failure
```

These states are part of the interface rather than afterthoughts.

---

## Public demo

<p align="center">
  <img src="docs/images/preview.png" alt="Consignment management dashboard public demo" width="1000">
</p>

The demo includes two simulated entry profiles:

### Administrator

The administrative view provides:

- consolidated portfolio metrics
- seller comparison
- seller filtering
- customer search
- date filters
- pending quantity filters
- pending value filters
- sorting across operational fields

### Seller

The seller view focuses on a single portfolio and exposes the customers and consignment balances associated with that simulated seller.

Because this is a static public demonstration, profile selection happens entirely in the browser and does not protect any resource.

---

## Architecture

The public version deliberately avoids reproducing the original operational environment.

```text
Synthetic Data
      │
      ▼
Local Application State
      │
      ├── Profile
      ├── Scenario
      ├── Filters
      └── Sorting
      │
      ▼
Filtering & Aggregation
      │
      ▼
DOM Rendering
      │
      ▼
Responsive Dashboard
```

The application is built with:

```text
HTML
CSS
Vanilla JavaScript
```

and runs entirely in the browser.

There is no:

```text
backend
database
authentication service
ERP connection
external API
cookie storage
localStorage
```

The data used by the interface is defined locally in JavaScript.

---

## Interaction model

The demo includes synthetic scenarios that can be changed directly from the interface:

```text
Com dados
Sem pendências
Falha simulada
```

Loading is also simulated locally so that the UI can demonstrate asynchronous application states without making network requests.

Search, filtering, sorting and metrics are processed entirely on the client side.

Dynamic operational values are inserted into the interface using DOM APIs such as `textContent`.

---

## Quality checks

The repository includes a GitHub Actions workflow that runs on pushes and pull requests.

It validates JavaScript syntax:

```bash
node --check assets/app.js
```

and executes a custom audit:

```bash
python scripts/audit_public_demo.py
```

The audit checks the public repository for issues such as:

- forbidden database files
- environment files
- private key files
- common API key patterns
- client secrets
- bearer tokens
- accidental network calls in the public application
- basic HTML parsing

The workflow is intended to reduce the chance of accidentally introducing private operational material or external integrations into the public reconstruction.

A separate GitHub Actions workflow deploys the static application to GitHub Pages.

---

## Security and privacy

The public demo contains only synthetic information.

It includes no:

- real customers
- real sellers
- real company branding
- credentials
- databases
- private endpoints
- ERP integrations
- production configuration

The application performs no network requests and collects no visitor data.

The profile selector is only an interface simulation and must not be interpreted as a real access-control mechanism.

A production implementation would require dedicated decisions around authentication, authorization, persistence, encryption and backend security.

More details are available in [SECURITY.md](SECURITY.md).

---

## Running locally

The public demo has no external runtime dependencies.

Clone the repository:

```bash
git clone https://github.com/leviroiz/gestao-lotes-consignados-demo.git
cd gestao-lotes-consignados-demo
```

Then open:

```text
index.html
```

in a browser.

You can also use the hosted version:

**[Live demo →](https://leviroiz.github.io/gestao-lotes-consignados-demo/)**

---

## Repository structure

```text
gestao-lotes-consignados-demo/
├── .github/
│   └── workflows/
├── assets/
│   ├── app.js
│   └── styles.css
├── scripts/
│   └── audit_public_demo.py
├── index.html
├── README.md
├── SECURITY.md
├── LICENSE
└── .gitignore
```

---

## Public reconstruction

The public version is intentionally smaller than the prototype explored during the project.

| Prototype exploration | Public demo |
|---|---|
| Full-stack architecture | Static application |
| Backend | Browser only |
| Persistent data | Synthetic in-memory data |
| Authentication concepts | Simulated profiles |
| ERP/API integration concepts | No external integrations |
| Server-side rules | Local demonstration logic |

The goal of this repository is not to reproduce the original environment.

It is to preserve the **problem, reasoning, interface concepts and product decisions** in a form that can be inspected publicly without exposing operational systems or data.

---

## License

Available under the [MIT License](LICENSE).
