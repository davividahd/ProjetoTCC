## Objetivo
Fornecer instruções concisas e específicas para agentes de codificação assistida trabalharem neste repositório ProjetoTCC (front-end estático). Concentre-se em mudanças seguras e localizadas: HTML, CSS e JS dentro da pasta `front-end/`.

## Visão geral do projeto
- Projeto principalmente estático: todo o código de interface está em `front-end/` (HTML, `CSS/` e `js/`).
- Não há backend ou sistema de build detectável neste repositório. Páginas usam Bootstrap via CDN e scripts JS locais.

## Componentes e fluxos importantes
- Páginas principais: `front-end/paginainicialcandidato.html`, `login.html`, `criarconta.html`, `mensagens.html`, etc.
- Scripts principais em `front-end/js/` (ex.: `darkmode.js`, `login.js`, `mensagens.js`). Muitos comportamentos e dados estão embutidos em scripts inline nos HTML (ex.: array `vagas` e funções `criarCards` / `aplicarFiltros` em `paginainicialcandidato.html`).
- Assets: `front-end/CSS/` contém estilos e `front-end/CSS/imagens/` armazena imagens usadas localmente.

## Convenções e padrões de código deste repositório
- Preferência por scripts inline simples para funcionalidades de página — modificações devem preservar a integração com IDs/elementos existentes (por ex.: `modalDetalhes`, `vaga-container`, `search-cargo`, `search-localizacao`).
- Evite renomear IDs ou classes sem atualizar todas as referências nos HTML e JS.
- Ao editar `paginainicialcandidato.html`, procure por `criarCards`, `mostrarDetalhesVaga`, e `aplicarFiltros` — são pontos de extensão comuns.

## Orientações práticas para agentes
- Priorize mudanças locais e reversíveis (pequenas funções, correções de UI, acessibilidade). Não refatore em larga escala (por ex., extração massiva de scripts inline) sem revisão humana.
- Ao adicionar funcionalidades JS reutilizáveis, preferir criar/alterar arquivos em `front-end/js/` e linká-los nas páginas, mas verifique que não haja dependências implícitas de escopo global.
- Mantenha compatibilidade com Bootstrap 5: os modais e classes atuais dependem dessa versão (ver inclusão CDN em `paginainicialcandidato.html`).

## Como rodar e depurar localmente
- Método rápido (VS Code): instalar e usar a extensão Live Server e abrir `front-end/` como raiz do servidor.
- Linha de comando (PowerShell): a partir da raiz do repositório execute, se tiver Python instalado:

  python -m http.server 5500

  Em seguida abra http://localhost:5500/front-end/paginainicialcandidato.html
- Depuração: usar o DevTools do navegador (Console para erros JS; Network para recursos faltando). Logs úteis: mensagens de evento nos `console.log` dos arquivos JS locais.

## Integrações e dependências externas
- Bootstrap e bundle JS são carregados por CDN em `paginainicialcandidato.html`.
- Não há pacotes npm, gerenciadores ou testes automatizados detectados — adicione manifest apenas se introduzir dependências.

## Casos de cuidado / anti-padrões a evitar
- Não remova ou renomeie IDs de modais e botões (ex.: `modalDetalhes`, `modal-titulo`, `modal-imagem`) sem atualizar chamadas JS.
- Evitar mover dados de exemplo (o array `vagas`) para um backend fictício sem alinhar com o time; esse dado é usado diretamente por várias funções inline.
- Evitar alterações globais em CSS que possam ser quebradas pelo carregamento do CSS via caminhos relativos dentro de `front-end/CSS/`.

## Exemplo rápido para o agente
- Se for melhorar o filtro de localização: editar `front-end/paginainicialcandidato.html`, localizar `aplicarFiltros()` (perto da definição da constante `vagas`), e alterar apenas a lógica de comparação. Testar carregando a página via Live Server.

## Quando pedir orientação humana
- Sempre peça revisão humana antes de: mover grandes blocos de JS para um novo sistema de módulos, introduzir um sistema de build (npm, webpack) ou conectar APIs externas.

Se algo importante estiver ausente nestas instruções, responda com perguntas específicas sobre qual parte do fluxo você pretende modificar e eu atualizo este arquivo.
