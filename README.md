# Implementación de CRUD de órdenes en DynamoDB

El sistema debe permitir la creación, lectura, actualización y eliminación de órdenes en una tabla DynamoDB, expuestas a través de una API REST. Cada orden tiene un identificador único, descripción, estado y fecha de creación. El sistema debe manejar la validación de entradas, asegurar la unicidad del identificador y gestionar posibles errores de acceso a la base de datos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: JDK 17+, Maven 3.9+, IDE con soporte Java.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `mvn compile` en la raíz. Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración y creación de la tabla DynamoDB

**Objetivo:** Configurar DynamoDB y crear la tabla de órdenes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura DynamoDB para el proyecto.
- Crea una tabla DynamoDB con las columnas necesarias para almacenar las órdenes.

**Entregable:** Tabla DynamoDB creada y configurada para almacenar órdenes.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración de servicios en la nube.

</details>

### Fase 2: Implementación de operaciones CRUD

**Objetivo:** Implementar las operaciones CRUD para la tabla de órdenes.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Implementa las operaciones de creación, lectura, actualización y eliminación de órdenes en la tabla DynamoDB.
- Asegura que las operaciones manejen correctamente la validación de entradas y los posibles errores de acceso a la base de datos.

**Entregable:** Operaciones CRUD implementadas y funcionales para la tabla de órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Manejo de errores y validación de entradas en operaciones CRUD.
- Uso de Terraform para la configuración y despliegue del proyecto.

</details>

### Fase 3: Exposición de operaciones CRUD a través de una API REST

**Objetivo:** Exponerse las operaciones CRUD a través de una API REST.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Crea una API REST que exponga las operaciones CRUD implementadas en la fase anterior.
- Asegura que la API maneje correctamente las solicitudes y respuestas, incluyendo la validación de entradas y el manejo de errores.

**Entregable:** API REST funcional que expone las operaciones CRUD para la tabla de órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Diseño y desarrollo de APIs RESTful.
- Uso de Terraform para la configuración y despliegue del proyecto.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD y por qué es importante en el manejo de datos?
- **paraQueSirve**: ¿Para qué sirve exponer operaciones CRUD a través de una API REST?
- **comoSeUsa**: ¿Cómo se usa Terraform para configurar y desplegar servicios en la nube?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica el diseño de una API REST para exponer operaciones CRUD?

## Criterios de Evaluacion

- Configuración y creación de la tabla DynamoDB.
- Implementación de operaciones CRUD.
- Exposición de operaciones CRUD a través de una API REST.
- Manejo de errores y validación de entradas en operaciones CRUD.
- Uso de Terraform para la configuración y despliegue del proyecto.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`
  - `GET /orders`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
