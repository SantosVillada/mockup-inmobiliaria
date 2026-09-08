# DECISIONES DEL PROYECTO — mockup-inmobiliaria

Registro central de las decisiones arquitectónicas y visuales importantes. Se actualiza a medida que cada agente resuelve puntos clave.

## Código de decisión
Usar identificadores tipo `DNN` (ej. `D01`, `D02`) para poder referenciarlas desde los archivos de cada agente.

---

## D01 — Estado inicial del proyecto
- **Fecha:** 2026-09-08
- **Tipo:** Arquitectónica
- **Decisión:** El proyecto parte desde cero (carpeta vacía, sin historial previo).
- **Motivo:** No existe trabajo previo que conservar.
- **Impacto:** Todo el contenido visual se construirá a partir de esta base.

## D02 — Primero coordinación, luego interfaz
- **Fecha:** 2026-09-08
- **Tipo:** Proceso
- **Decisión:** Construir la capa de coordinación (`historial-prompts/`) antes de cualquier desarrollo visual.
- **Motivo:** Garantizar la continuidad del proyecto y evitar trabajo aislado/repetido.

## D03 — Stack tecnológico a definir en Fase 3
- **Fecha:** 2026-09-08
- **Tipo:** Arquitectónica
- **Decisión:** No fijar aún el stack definitivo; lo resolverán los Agentes Frontend (03) y Backend (07).
- **Motivo:** Evitar decisiones prematuras que luego haya que revertir.
- **Restricción:** El mockup debe ser compatible con un backend futuro (Supabase u otro), según lo indicado por el Director.

## D04 — Bloqueo: Git no disponible en el entorno (RESUELTO)
- **Fecha:** 2026-09-08
- **Tipo:** Bloqueo / Infraestructura
- **Decisión:** Registrar que `git` (y `node`/`npm`/`gh`) no estaban en PATH en este entorno.
- **Motivo:** No se podía inicializar/clonar el repositorio local.
- **Acción recomendada:** Instalar Git (y Node si se usará un framework frontend) antes de la Fase 3. El proyecto queda listo para asociarse a `https://github.com/SantosVillada/mockup-inmobiliaria.git`.
- **RESOLUCIÓN (2026-09-08):** Instalados con `winget` → Git 2.55.0, GitHub CLI (gh) 2.100.0, Node.js v24.19.0, npm 11.17.0. Se autenticó `gh` como `SantosVillada`. Repo local inicializado, commit inicial creado y pusheado a GitHub.

## D05 — Repositorio y rama
- **Fecha:** 2026-09-08
- **Tipo:** Arquitectónica / Infraestructura
- **Decisión:** Repo local inicializado en `mockup-inmobiliaria`, rama por defecto `main`.
- **Motivo:** Convención moderna de ramas; GitHub lo usa por defecto.
- **Impacto:** Todo el trabajo futuro se realiza sobre `main` y se pushea a `origin`.
- **Remote:** `https://github.com/SantosVillada/mockup-inmobiliaria.git`
- **Commit inicial:** `cefe55e` ("chore: init project and historial de prompts").

## D06 — Identidad de git
- **Fecha:** 2026-09-08
- **Tipo:** Configuración
- **Decisión:** `user.name = SantosVillada`, `user.email = scvillada@gmail.com`.
- **Motivo:** Identidad configurada a nivel de repo (local) para los commits del proyecto.

---

## Decisiones futuras (plantilla)
- [Próxima decisión relevante aquí]
