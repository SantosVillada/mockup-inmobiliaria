# HISTORIAL DE PROMPTS — mockup-inmobiliaria

Este directorio es la **memoria persistente** del proyecto. Cualquier agente (incluido el Director) que retome el trabajo debe leer estos archivos **antes** de hacer cambios.

## Objetivo

Que un agente que llegue mañana pueda entender de un vistazo:

- qué se hizo
- por qué se hizo
- quién lo hizo
- qué archivos se modificaron
- qué decisiones se tomaron
- qué falta hacer
- cuál es el próximo paso

## Estructura

```text
historial-prompts/
├── README.md              <- este archivo (índice y reglas)
├── 00-director.md         <- log del DIRECTOR
├── 01-ux-ui.md            <- Agente UX/UI
├── 02-branding.md         <- Agente Branding
├── 03-frontend.md         <- Agente Frontend
├── 04-propiedades.md      <- Agente Propiedades
├── 05-agentes.md          <- Agente Agentes Inmobiliarios
├── 06-marketing.md        <- Agente Conversión / Marketing
├── 07-backend.md          <- Agente Backend / Arquitectura futura
├── 08-qa.md               <- Agente QA
├── 09-director-visual.md  <- Director Visual
└── decisiones.md          <- Decisiones arquitectónicas y visuales
```

## Reglas de uso

1. **Siempre** leer `README.md`, `decisiones.md` y el archivo del agente correspondiente antes de actuar.
2. Registrar **cada** intervención con el formato definido (ver sección Formato).
3. Nunca sobrescribir trabajo existente sin analizarlo primero.
4. No repetir trabajo ya realizado.
5. Indicar siempre el **próximo paso** y el **agente que debe continuar**.

## Formato de registro por agente

```md
# [NOMBRE DEL AGENTE]

## Prompt / Instrucción
[Prompt recibido o instrucción ejecutada]

## Fecha
[fecha]

## Objetivo
[qué se intentó conseguir]

## Resultado
[qué se realizó]

## Archivos modificados
- archivo 1
- archivo 2

## Decisiones tomadas
- decisión 1
- decisión 2

## Próximo paso
[qué debe hacerse después]

## Estado
COMPLETADO / EN PROGRESO / BLOQUEADO
```

## Orden de trabajo (Fases)

- **FASE 1** → Director → UX/UI → Branding
- **FASE 2** → Propiedades → Agentes inmobiliarios → Marketing
- **FASE 3** → Frontend → Arquitectura futura
- **FASE 4** → QA
- **FASE 5** → Director Visual
- **FASE 6** → Director

El Director revisa el resultado de cada fase antes de avanzar.
