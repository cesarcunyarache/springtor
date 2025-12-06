// scripts/resetAndSeed.ts

import { Client } from "pg";
import * as schema from "../schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { db } from "../index";
import dotenv from "dotenv";
import { Assessment } from "../schema";
import { features } from "process";
import { getTableColumns, SQL, sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { sl } from "date-fns/locale";

const assessment = {
  id: "60be81ff-2d07-4599-8da1-9b18099ae43b",
  slug: "pre-post-test",
  title: "Examen de Conocimientos Scrum",
  description:
    "Pre-Test/Post-Test sobre comprensión de roles, eventos y artefactos del marco Scrum.",
};

const assessmentLesson = {
  id: "60be01ff-2d07-459f-8da1-9b18299ae43b",
  title: "Lession test",
  description: "Lession test",
};

const questionsData = [
  {
    assessmentId: assessment.id,
    question:
      "¿Quién facilita el cumplimiento de las reglas de Scrum y ayuda a eliminar impedimentos?",
    options: ["Scrum Master", "Product Owner", "Stakeholders"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál es la responsabilidad principal del Product Owner?",
    options: [
      "Guiar la Daily Scrum",
      "Eliminar impedimentos",
      "Asegurar el valor del producto",
    ],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question:
      "¿Qué rol es el único responsable de ordenar y priorizar el Product Backlog?",
    options: ["Developers", "Scrum Master", "Product Owner"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question:
      "¿Quién modera y guía los eventos de Scrum cuando el equipo lo solicita?",
    options: ["Gerencia de TI", "Product Owner", "Scrum Master"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿Qué debe quedar claro al término de la Sprint Planning?",
    options: [
      "Cuántos días dura el proyecto",
      "Qué se entregará en el Sprint y cómo se trabajará",
      "Cuántos días dura el proyecto",
    ],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question:
      "Si en la mitad de la ejecución de un Sprint surge un problema de alta prioridad, ¿qué hace el equipo?",
    options: [
      "Pide al Scrum Master que suspenda todo y lo atiende el mismo",
      "Pide al Product Owner ajustar meta o contenidos del Sprint",
      "Pide al Product Owner terminar lo planificado y luego lo atiende",
    ],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál es el objetivo de la Daily Scrum?",
    options: [
      "Inspeccionar el avance hacia la meta del Sprint y ajustar el plan",
      "Asignar tareas al equipo",
      "Presentar el incremento terminado",
    ],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "En la Sprint Review se inspecciona principalmente:",
    options: [
      "El incremento terminado",
      "El código fuente",
      "Las métricas de rendimiento",
    ],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál es la duración máxima recomendada de la Daily Scrum?",
    options: ["1 hora", "30 min", "15 min"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál de estos NO es un evento oficial de Scrum?",
    options: [
      "Sprint Execution Meeting",
      "Sprint Retrospective",
      "Sprint Review",
    ],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Para qué sirve la Sprint Retrospective?",
    options: [
      "Revisar el incremento con clientes",
      "Planificar el siguiente Sprint",
      "Inspeccionar el proceso y acordar mejoras",
    ],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿En qué caso se puede cancelar un Sprint?",
    options: [
      "Solo si el Product Owner lo decide y lo justifica",
      "A mitad de Sprint sin diálogo",
      "Cuando el líder del equipo lo pida",
    ],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "Al final de la Sprint Planning el equipo debe tener:",
    options: [
      "Un incremento entregable",
      "Solo una lista de tareas terminadas",
      "Un objetivo claro de Sprint y un plan para lograrlo",
    ],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question:
      "¿Qué artefacto muestra en tiempo real el trabajo que queda por hacer en el Sprint?",
    options: ["Product Backlog", "Sprint Backlog", "Release Plan"],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question:
      "¿Qué garantiza que el incremento cumple con el nivel de calidad acordado?",
    options: ["Definition of Done", "Sprint Backlog", "Product Backlog"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Con qué frecuencia el equipo debe refinar el Product Backlog?",
    options: [
      "Seguidamente, según lo necesite el equipo",
      "Solo al inicio del proyecto",
      "Una vez a la semana",
    ],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question:
      "¿Quién puede proponer cambios al Sprint Backlog durante el Sprint?",
    options: [
      "El Scrum Master con los Developers",
      "El Product Owner junto con los Developers",
      "El Product Owner junto con el Scrum Master",
    ],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question:
      "Durante el Backlog Refinement el equipo actualiza principalmente:",
    options: [
      "Ítems del Product Backlog con más detalle para el Sprint Goal",
      "Ítems del Product Backlog con más detalle y estimaciones",
      "Ítems del Product Backlog con más detalle para la Definition of Done",
    ],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cómo se describe mejor al Product Backlog?",
    options: [
      "Documento de planificación general",
      "Registro de horas trabajadas",
      "Lista ordenada con lo necesario para el producto",
    ],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "El Sprint Backlog está compuesto por:",
    options: [
      "Objetivos del Sprint y trabajo seleccionado",
      "Cronograma de proyecto",
      "Lista de todos los ítems del Product Backlog",
    ],
    answer: "A",
  },
].map((q) => ({
  ...q,
  id: crypto.randomUUID(),
}));

/* const questionsData = [
  {
    question: "¿Cuál es el rol principal del Scrum Master en un equipo Scrum?",
    options: [
      "Asegurarse de que se cumplan los plazos",
      "Eliminar impedimentos y facilitar el marco de trabajo",
      "Asignar tareas a cada miembro del equipo",
      "Supervisar y evaluar el desempeño individual",
    ],
    answer: "B",
    assessmentId: assessmentLesson.id,
  },
  {
    question:
      "¿Qué artefacto de Scrum representa el trabajo pendiente del producto?",
    options: [
      "Product Backlog",
      "Sprint Backlog",
      "Incremento",
      "Burndown Chart",
    ],
    answer: "A",
    assessmentId: assessmentLesson.id,
  },
  {
    question: "¿Cuál es la duración recomendada para un Sprint en Scrum?",
    options: [
      "Un máximo de un mes",
      "Exactamente dos semanas",
      "Entre uno y seis meses",
      "El tiempo que el Product Owner considere necesario",
    ],
    answer: "A",
    assessmentId: assessmentLesson.id,
  },
  {
    question:
      "¿Qué evento de Scrum se utiliza para inspeccionar el incremento y adaptar el Product Backlog si es necesario?",
    options: [
      "Daily Scrum",
      "Sprint Retrospective",
      "Sprint Review",
      "Refinamiento del Backlog",
    ],
    answer: "C",
    assessmentId: assessmentLesson.id,
  },
]; */

const seed = [
  {
    id: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    slug: "scrum",
    title: "Scrum",
    description: "Aprende Scrum desde los fundamentos hasta la maestría.",
    learningSteps: [
      {
        id: "8d4c5c27-32d6-4b5b-b24b-bb8c7c3d7c91",
        name: "Fundamentos de la Agilidad",
        level: 1,
        topics: [
          {
            id: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
            title: "Agilidad en proyectos",
            subtitle: "",
            slug: "agilidad-en-proyectos",
            description:
              "Aprende los valores y fundamentos que impulsan la agilidad en proyectos y equipos.",
            content: "",
            icon: "rocket",
            level: 1,
            features: [
              "Valores del Manifiesto Ágil",
              "Principios de la agilidad",
              "Beneficios de la agilidad",
              "Colaboración y adaptación",
            ],
            modules: [
              {
                id: "5f834a31-7ddb-4f19-a2be-60945e646605",
                title: "Fundamentos de Agilidad",
                level: 1,
                lessons: [
                  {
                    id: "922cba69-3abf-4d65-8aee-07e57b1a89b0",
                    title: "¿Qué es la agilidad?",
                    slug: "que-es-la-agilidad",
                    level: 1,
                    content: `> 📚 **Saberes Previos:**  
> - Conceptos básicos sobre la gestión de proyectos tradicionales.  
> - Familiaridad con la idea de trabajo en equipo y colaboración.




# 🎯Objetivo  
✅Comprender el concepto de agilidad y cómo se aplica en la gestión de proyectos.


# 🗨️Definición
La **agilidad** es una filosofía que permite a los equipos de trabajo adaptarse rápidamente a los cambios mediante entregas incrementales del producto. En lugar de seguir un plan rígido, los equipos ágiles entregan valor constantemente, aprendiendo y adaptándose con cada ciclo o iteración. 


# 💭¿De qué trata?

### Conceptos a Cubrir



| **Concepto**                          | **Descripción**                                                                                                     |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| 💡 **Valor al cliente**                | El enfoque ágil se centra en entregar valor de manera constante al cliente, asegurando que sus necesidades sean atendidas en cada ciclo. |
| 🔄 **Iteración e incremento**          | El trabajo se organiza en ciclos cortos (llamados *sprints*) donde se entrega una versión funcional del producto.   |
| 📝 **Retroalimentación y aprendizaje validado** | Los equipos obtienen retroalimentación del cliente y la incorporan en el siguiente ciclo de trabajo, asegurando que el producto se ajusta a las expectativas del cliente. |
| 🔄 **Adaptación al cambio**            | Los equipos ágiles están preparados para adaptarse a los cambios a medida que surgen, ajustando el trabajo según el feedback o nuevas necesidades. |
| 🤝 **Colaboración y autoorganización** | Los equipos ágiles se organizan de manera autónoma, colaborando estrechamente para encontrar soluciones a los problemas que surgen durante el ciclo de trabajo. |
| 📊 **Visualización del trabajo**       | Se utilizan herramientas visuales como tableros (*Kanban, Scrum boards*) para mostrar el progreso y la carga de trabajo del equipo. |
| 📈 **Métricas ligeras**                | Se miden parámetros clave como **Lead time** (tiempo entre la solicitud y entrega de un elemento) y **Throughput** (número de elementos completados en un periodo). |
| 🚫 **Anti-patrones comunes**           | Son prácticas que obstaculizan el rendimiento ágil, como la falta de comunicación, la sobrecarga de trabajo o la falta de retroalimentación regular. |

# ✏️Contenido

## 1. Propósito de la Agilidad
La agilidad se centra en entregar valor de manera continua, permitiendo que los equipos se adapten a las necesidades cambiantes del cliente y los requisitos del proyecto. En lugar de seguir un plan estricto, los equipos ágiles ajustan su trabajo a medida que avanzan.

> Un gráfico circular que muestre el ciclo de trabajo ágil.

![Descripción de la imagen](https://res.cloudinary.com/dfizshix4/image/upload/v1759010836/4_fi2gfr.png)


> Un tablero visual que representa las columnas típicas: "Por hacer", "En progreso", "Hecho". Esto muestra cómo se visualiza el trabajo en el equipo ágil.

![Descripción de la imagen](https://res.cloudinary.com/dfizshix4/image/upload/v1759011336/Tablero-Kanban-equipos-marketing-1200x771_bi5imo.png)

## 2. Contextos VUCA


| **Icono** | **Descripción**                                                                                                                                                           |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 🌪️ **Volatilidad**   | El mercado de aplicaciones cambia rápidamente, con la aparición de nuevas funcionalidades y la competencia ajustando sus estrategias constantemente. |
| 🤔 **Incertidumbre**   | La reacción de los usuarios ante nuevas características es impredecible, y las regulaciones tecnológicas pueden cambiar sin previo aviso. |
| 🧩 **Complejidad**     | La aplicación interactúa con múltiples servicios externos y bases de datos, lo que hace que los cambios en un área afecten a otras partes del sistema de formas difíciles de prever. |
| 🌫️ **Ambigüedad**    | Las especificaciones iniciales del cliente sobre una función pueden ser vagas, o las demandas pueden ser confusas, lo que dificulta entender la verdadera necesidad. |

![Descripción de la imagen](https://res.cloudinary.com/dfizshix4/image/upload/v1759008068/EDICION_DE_IMAGENES_jnhqwa.png)

---

## Ejemplo Detallado

### Un equipo de desarrollo de software que trabaja en una aplicación web se encuentra en un entorno VUCA debido a:

---

🌪️ **Volatilidad:**  
El mercado de aplicaciones cambia rápidamente, con la aparición de nuevas funcionalidades y la competencia ajustando sus estrategias constantemente.


🤔 **Incertidumbre:**  
La reacción de los usuarios ante nuevas características es impredecible, y las regulaciones tecnológicas pueden cambiar sin previo aviso.


🧩 **Complejidad:**  
La aplicación interactúa con múltiples servicios externos y bases de datos, lo que hace que los cambios en un área afecten a otras partes del sistema de formas difíciles de prever.


🌫️ **Ambigüedad:**  
Las especificaciones iniciales del cliente sobre una función pueden ser vagas, o las demandas pueden ser confusas, lo que dificulta entender la verdadera necesidad.



## 3. Entrega temprana de valor
Los equipos ágiles entregan productos o características funcionales al final de cada iteración, lo que permite que el cliente vea el progreso rápidamente y proporcione retroalimentación.

![Descripción de la imagen](https://res.cloudinary.com/dfizshix4/image/upload/v1759010699/i_ge_hp3o1i.png)`,
                  },
                  {
                    id: "b21ac7f9-df71-42c6-b836-6fbca5aef8f7",
                    title: "Manifiesto Ágil",
                    slug: "manifiesto-agil",
                    level: 2,
                    content: `
El **Manifiesto Ágil** nació en 2001, cuando un grupo de desarrolladores de software se reunió en Utah (EE. UU.) para buscar una forma más humana, flexible y eficiente de trabajar en proyectos.  
De esa reunión surgieron **4 valores fundamentales** y **12 principios** que hoy guían no solo al desarrollo de software, sino también a la gestión de proyectos en general.

---

## 🌱 Los 4 valores del Manifiesto Ágil

---

💬 **1. Individuos e interacciones sobre procesos y herramientas**  
El éxito de un proyecto depende más de las personas y su colaboración que de los procesos estrictos o las herramientas que se usen.  
👉 La comunicación efectiva y el trabajo en equipo son la clave.

---

📄 **2. Software funcionando sobre documentación extensiva**  
La documentación es útil, pero el objetivo principal es **entregar valor real al usuario**.  
👉 Se prefiere un producto funcional antes que toneladas de papeles o informes que nadie usa.

---

🤝 **3. Colaboración con el cliente sobre negociación contractual**  
El cliente no debe verse como un juez externo, sino como **parte activa del equipo**.  
👉 El trabajo conjunto y la retroalimentación constante ayudan a construir mejores soluciones.

---

⚡ **4. Responder ante el cambio sobre seguir un plan**  
Los planes son importantes, pero la capacidad de adaptarse es vital.  
👉 El entorno cambia, y los equipos ágiles están preparados para ajustar su rumbo cuando sea necesario.

---

## 🔑 Los 12 principios del Manifiesto Ágil

1. Nuestra mayor prioridad es **satisfacer al cliente** mediante la entrega continua de software con valor.  
2. **Aceptar los cambios** en los requisitos, incluso en etapas tardías del desarrollo.  
3. **Entregar software funcional frecuentemente**, con ciclos cortos de semanas o meses.  
4. Los **equipos de negocio y desarrollo** deben trabajar juntos a diario.  
5. Construir proyectos en torno a **individuos motivados**, brindándoles apoyo y confianza.  
6. La **comunicación cara a cara** es la forma más eficiente de transmitir información.  
7. El **software funcionando** es la principal medida de progreso.  
8. Los procesos ágiles promueven el **desarrollo sostenible**: los equipos deben mantener un ritmo constante.  
9. La **excelencia técnica y el buen diseño** mejoran la agilidad.  
10. La **simplicidad** es esencial: enfocarse en hacer solo lo necesario.  
11. Las mejores arquitecturas, requisitos y diseños surgen de **equipos autoorganizados**.  
12. A intervalos regulares, el equipo **reflexiona sobre cómo ser más efectivo** y ajusta su comportamiento en consecuencia.

---

## 🚀 En resumen

El **Manifiesto Ágil** nos recuerda que las personas, la colaboración y la adaptación continua son más valiosas que los procesos rígidos.  
Adoptar la mentalidad ágil significa **aprender, mejorar y entregar valor continuamente**.

---

💡 *"No se trata solo de hacer las cosas rápido, sino de hacer las cosas correctas y con propósito."*
`,
                  },
                  {
                    id: "c6a0e214-45f1-44b1-8f34-6a2b5207c91b",
                    title: "¿Cuándo usar enfoques ágiles?",
                    slug: "cuando-usar-enfoques-agiles",
                    level: 3,
                    content: `
Los **enfoques ágiles** no son una solución mágica para todos los proyectos, pero resultan especialmente útiles en entornos donde el cambio, la incertidumbre y la necesidad de adaptación son constantes.  
La agilidad se convierte en una ventaja cuando lo que se busca es **entregar valor rápidamente, adaptarse y aprender en el camino**.

---

## 🌪️ Entornos ideales para aplicar agilidad

---

💡 **1. Proyectos con requisitos cambiantes**  
Cuando los requerimientos del cliente o del mercado evolucionan con frecuencia, los métodos ágiles permiten **ajustar el rumbo sin perder el progreso**.  
👉 Perfecto para startups, innovación o desarrollo de nuevos productos.

---

👥 **2. Equipos que colaboran de forma continua**  
La agilidad se apoya en la **comunicación constante** y el trabajo en equipo.  
👉 Si tu organización promueve la colaboración, los enfoques ágiles funcionarán mejor.

---

⚙️ **3. Necesidad de entregas frecuentes**  
Cuando el producto debe **mostrar resultados parciales rápidamente**, los ciclos cortos de desarrollo (sprints) permiten obtener retroalimentación continua y ajustar las siguientes versiones.  
👉 Ideal para software, servicios digitales o productos iterativos.

---

🧭 **4. Incertidumbre o cambios en el mercado**  
Si el entorno es impredecible, los equipos ágiles pueden **reaccionar rápidamente a nuevas oportunidades o amenazas**.  
👉 La flexibilidad se vuelve una fortaleza estratégica.

---

📈 **5. Búsqueda de mejora continua**  
Los equipos ágiles no solo entregan productos: **aprenden y mejoran con cada iteración**.  
👉 Perfecto para organizaciones que valoran la experimentación y el aprendizaje constante.

---

## ⚠️ Casos donde la agilidad puede no ser la mejor opción

Aunque la agilidad ofrece muchos beneficios, **no siempre es el enfoque ideal**. Puede no ser adecuada cuando:

- Los **requisitos son completamente fijos** y no cambiarán.  
- Se trabaja en **proyectos altamente regulados o críticos**, donde cada paso debe documentarse y aprobarse formalmente.  
- El equipo no tiene **autonomía ni comunicación fluida**.  
- La organización carece de una cultura abierta al cambio.

---

## 🔍 En resumen

Usa enfoques ágiles cuando tu entorno requiera **adaptación, colaboración y entrega rápida de valor**.  
Si, en cambio, el proyecto es estable, predecible y con procesos rígidos, puede ser mejor mantener un enfoque más tradicional.

---

💡 *“La agilidad no es un destino, es una forma de moverse con propósito en medio del cambio.”*
`,
                  },
                ],
              },
            ],
          },
          {
            id: "3f2eeb9f-5dc0-4b77-8c1f-68e1e8a728a4",
            title: "Visión General de Scrum",
            subtitle: "",
            slug: "vision-general-de-scrum",
            description:
              "Tema introductorio que explica Scrum, sus fundamentos, comparación con la gestión tradicional y otras metodologías.",
            content: "",
            icon: "brain",
            level: 1,
            features: [
              "Roles, eventos y artefactos de Scrum",
              "Comparación Scrum vs Gestión Tradicional",
              "Comparación Scrum vs otras metodologías",
              "Valores fundamentales de Scrum",
            ],
            modules: [
              {
                id: "0a4394e3-3e84-4aa4-9f9b-fd6f19db239d",
                title: "Scrum",
                level: 1,
                lessons: [
                  {
                    id: "5f8d23c0-84b9-4b7c-8c7c-7e7a8c4fdd01",
                    title: "¿Qué es Scrum?",
                    slug: "que-es-scrum",
                    level: 1,
                    content: `![Scrum Framework](https://upload.wikimedia.org/wikipedia/commons/5/58/Scrum_process.svg)

# 🌀 ¿Qué es Scrum?

**Scrum** es un **marco de trabajo ágil** diseñado para ayudar a los equipos a **colaborar, adaptarse y entregar valor de manera continua** en proyectos complejos.  
Más que un proceso rígido, Scrum promueve una **forma de pensar y trabajar** basada en la transparencia, la inspección y la adaptación.

---

> 📚 **Saberes Previos:**  
> - Conceptos básicos sobre la gestión de proyectos tradicionales.  
> - Familiaridad con la idea de trabajo en equipo y colaboración.

---

## ⚙️ Origen de Scrum

Scrum fue propuesto por **Ken Schwaber** y **Jeff Sutherland** en la década de 1990.  
Su nombre proviene del **rugby**, donde “scrum” representa una **formación en equipo** que avanza coordinadamente hacia un objetivo común.  

La idea es la misma en proyectos:  
👉 Un grupo de personas que colaboran estrechamente, se adaptan al cambio y buscan mejorar de manera continua.

---

## 🧩 ¿Por qué usar Scrum?

Scrum ayuda a **gestionar proyectos complejos** al dividirlos en **bloques pequeños y manejables** llamados *Sprints*.  
Cada Sprint dura entre **1 y 4 semanas**, y al final se entrega un incremento del producto **listo para usar o evaluar**.

> 💡 **Scrum se enfoca en entregar valor temprano y constante**, en lugar de esperar al final del proyecto.

---

## 👥 Roles en Scrum

Scrum define **tres roles principales**, cada uno con responsabilidades claras:

### 🧑‍💼 1. Product Owner  
- Representa las necesidades del cliente o usuario final.  
- Define y prioriza los elementos del **Product Backlog**.  
- Se enfoca en **maximizar el valor del producto**.

### 🧑‍💻 2. Scrum Master  
- Es el **facilitador del proceso Scrum**.  
- Se asegura de que el equipo siga los principios ágiles y elimine obstáculos.  
- Promueve la mejora continua dentro del equipo.

### 👨‍👩‍👧‍👦 3. Development Team (Equipo de Desarrollo)  
- Grupo multidisciplinario que **construye el producto**.  
- Se autoorganiza y decide cómo alcanzar los objetivos del Sprint.

---

## 🔁 Eventos en Scrum

Scrum organiza el trabajo a través de **eventos o ceremonias** que mantienen el ritmo y la comunicación del equipo:

### 🧭 1. Sprint  
El corazón de Scrum. Un periodo corto y constante (1-4 semanas) en el que el equipo trabaja para entregar un incremento del producto.

### 🎯 2. Sprint Planning  
Reunión donde se **define qué se hará** en el Sprint y **cómo se logrará**.

### 🌅 3. Daily Scrum (Reunión diaria)  
Reunión breve (máximo 15 minutos) para **coordinar el trabajo diario**, compartir avances y detectar bloqueos.

### 🧩 4. Sprint Review  
Revisión del Sprint donde se **presenta el incremento** a los interesados y se recibe retroalimentación.

### 🔍 5. Sprint Retrospective  
Reunión interna para **reflexionar sobre el proceso** y definir mejoras para el próximo Sprint.

---

## 📦 Artefactos de Scrum

Scrum utiliza tres artefactos principales para **gestionar la información y la transparencia** del trabajo:

### 🧾 1. Product Backlog  
Lista priorizada de **requisitos o funcionalidades** del producto.  
Cada elemento se llama *Product Backlog Item (PBI)*.

### 🗂️ 2. Sprint Backlog  
Conjunto de tareas seleccionadas del Product Backlog que el equipo se compromete a completar en el Sprint actual.

### 🚀 3. Increment  
El resultado final del Sprint: una **versión funcional del producto**, lista para entregarse o probarse.

---

> 💬 **Nota:**  
> Scrum **no define cómo desarrollar software**, sino **cómo organizar el trabajo** para entregar valor de manera continua y flexible.

---

## 🔑 Principios Clave de Scrum

- **Transparencia:** Todos deben tener claridad sobre el estado del trabajo.  
- **Inspección:** Revisar periódicamente el progreso y los resultados.  
- **Adaptación:** Ajustar procesos y prioridades según lo aprendido.

---

## 🎯 Beneficios de Scrum

✅ Entrega continua de valor.  
✅ Mayor visibilidad y control del progreso.  
✅ Equipos más comprometidos y autoorganizados.  
✅ Capacidad de adaptación ante el cambio.  
✅ Retroalimentación constante del cliente.

---

## 🚀 En resumen

Scrum es más que una metodología:  
es una **forma ágil y colaborativa de enfrentar proyectos**, centrada en **aprender, mejorar y entregar valor** de forma constante.

> 🧠 *“Scrum no es sobre seguir reglas, sino sobre crear equipos que aprenden y mejoran cada día.”*
`,
                  },
                  {
                    id: "0d6b4cb9-8c27-40c4-bd1d-36cc4b2fdc84",
                    title: "Scrum vs. Gestión Tradicional",
                    slug: "scrum-vs-gestion-tradicional",
                    level: 2,
                    content: `![Comparación entre Scrum y la gestión tradicional](https://img.freepik.com/vector-gratis/ilustracion-concepto-gestion-proyecto_114360-5986.jpg)

> 📚 **Saberes Previos:**  
> - Conocer cómo funciona la planificación tradicional de proyectos (en cascada o “waterfall”).  
> - Entender los conceptos de cronograma, entregas y control del proyecto.

La **gestión tradicional de proyectos** (modelo en cascada) se basa en una planificación **lineal y secuencial**. Cada fase (análisis, diseño, desarrollo, pruebas, implementación) se completa antes de pasar a la siguiente.  

Por otro lado, **Scrum** sigue un enfoque **iterativo e incremental**, en el que el proyecto se divide en pequeños ciclos llamados **sprints**, que permiten entregar valor continuamente y adaptarse a los cambios.

#### ⚖️ Principales diferencias

| Aspecto | Gestión Tradicional | Scrum |
|----------|---------------------|--------|
| **Estructura** | Secuencial (fases fijas) | Iterativa e incremental |
| **Planificación** | Rígida, detallada desde el inicio | Flexible, adaptativa por sprint |
| **Entrega de valor** | Al final del proyecto | De forma continua |
| **Gestión del cambio** | Costosa y difícil | Natural y esperada |
| **Rol del cliente** | Participa al inicio y al final | Participa de forma constante |
| **Medición del éxito** | Cumplimiento del plan | Valor entregado al usuario |

#### 💡 Ejemplo práctico
En un proyecto de desarrollo de software tradicional, primero se define **todo el sistema**, luego se programa y finalmente se entrega.  
Con **Scrum**, el equipo entrega primero un **mínimo producto viable (MVP)** y lo mejora sprint a sprint, basándose en la retroalimentación del cliente.

> 🧠 **Nota:** Scrum promueve la mejora continua y la colaboración constante, reduciendo riesgos y aumentando la satisfacción del cliente.
`,
                  },
                  {
                    id: "32abf4f4-8b0d-4ed5-95b6-bf804c8f46d2",
                    title: "Scrum vs Otras Metodologías",
                    slug: "scrum-vs-otras-metodologias",
                    level: 3,
                    content: `
                    ![Comparativa entre metodologías ágiles](https://img.freepik.com/vector-gratis/desarrolladores-programadores-colaborando-juntos_23-2148789691.jpg)

> 📚 **Saberes Previos:**  
> - Tener una noción de qué son las metodologías ágiles.  
> - Conocer brevemente nombres como Kanban, XP (Extreme Programming) o Lean.

Scrum no es la única metodología ágil existente. Existen otras como **Kanban**, **Extreme Programming (XP)** y **Lean**, cada una con su enfoque y ventajas particulares.

#### 🔍 Comparación general

| Metodología | Enfoque principal | Ventajas | Limitaciones |
|--------------|------------------|-----------|---------------|
| **Scrum** | Iteraciones cortas con roles definidos (Product Owner, Scrum Master, Equipo) | Claridad de roles y objetivos, mejora continua | Requiere disciplina y compromiso del equipo |
| **Kanban** | Flujo visual de trabajo (tablero con columnas) | Flexible, visual, mejora el flujo | Menor estructura para roles o reuniones |
| **XP (Extreme Programming)** | Mejora técnica del código y pruebas continuas | Alta calidad del software, comunicación constante | Puede ser difícil mantener el ritmo |
| **Lean** | Eliminación de desperdicios y enfoque en valor | Alta eficiencia, simplicidad | Requiere madurez organizacional |

#### 🧭 Cuándo usar cada una

- **Scrum:** Ideal para proyectos con alta incertidumbre y necesidad de entregas frecuentes.  
- **Kanban:** Perfecto para mantenimiento o soporte continuo.  
- **XP:** Adecuado para equipos pequeños enfocados en calidad del código.  
- **Lean:** Útil en entornos que buscan eficiencia y mejora de procesos.

> 💬 **Reflexión:** No existe una metodología “mejor” que otra. Lo importante es **adaptar los principios ágiles** a las necesidades reales del equipo y del proyecto.
`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "e8a3d5ab-9c44-4a56-92a8-4c61f51c7c9e",
        name: "Principios de Scrum",
        level: 2,
        topics: [
          {
            id: "7b2e9f3c-5b0d-4e47-97f8-3823b1c23891",
            title: "Control del Proceso empírico",
            subtitle: "",
            slug: "control-del-proceso-empirico",
            description:
              "Explora cómo Scrum se basa en la transparencia, inspección y adaptación para gestionar proyectos de manera efectiva.",
            content: "",
            icon: "search-check",
            level: 1,
            features: [
              "Transparencia en la información",
              "Inspección continua del progreso",
              "Adaptación frente a cambios",
            ],
            modules: [
              {
                id: "c4a92d78-66f0-4a0f-9b07-50c71294eb12",
                title: "Transparencia, Inspección y Adaptación",
                level: 1,
                lessons: [
                  {
                    id: "2fd2a2c9-35e8-4213-8b0d-5bfb083c212a",
                    title: "Transparencia",
                    slug: "transparencia",
                    level: 1,
                    content: `
![Transparencia en Scrum](https://xpedition.utp.edu.pe/wp-content/uploads/2021/02/trasnparencia200.png)

La **transparencia** es uno de los **tres pilares fundamentales de Scrum**, junto con la inspección y la adaptación.  
Significa que todos los aspectos importantes del proceso deben ser **visibles, comprensibles y accesibles** para quienes participan en el proyecto.

La transparencia permite que el equipo tome mejores decisiones, evite suposiciones incorrectas y mantenga una comunicación abierta y honesta.

---

> 📚 **Saberes Previos:**  
> - Conocer qué es Scrum y sus pilares.  
> - Entender el concepto de roles y artefactos en un proyecto ágil.  
> - Familiaridad básica con la comunicación en equipos de trabajo.

---

## 🧭 ¿Qué significa ser transparente en Scrum?

Ser transparente implica que **la realidad del proyecto es visible y entendida por todos**:

- No se oculta información.  
- No hay datos ambiguos o incompletos.  
- Todos comprenden cómo avanza el trabajo.  
- Los artefactos de Scrum reflejan la verdad del progreso.

> 💡 La transparencia crea **confianza**, reduce riesgos y acelera la toma de decisiones.

---

## 🧱 ¿Por qué es tan importante?

La falta de transparencia provoca:

❌ Proyectos atrasados sin que nadie lo note.  
❌ Expectativas discrepantes entre equipo, PO y stakeholders.  
❌ Decisiones basadas en suposiciones falsas.  
❌ Culpa, estrés y conflictos internos.

Cuando la información fluye con claridad:

✅ El equipo se autogestiona mejor.  
✅ El Product Owner prioriza con datos reales.  
✅ Los stakeholders confían en el equipo.  
✅ Se detectan riesgos antes de que sean graves.

---

## 🧩 Áreas donde se aplica la transparencia

### 1️⃣ **Artefactos transparentes**

Todos los artefactos deben mostrar información clara y actualizada:

- **Product Backlog:** Prioridades visibles y definiciones claras.  
- **Sprint Backlog:** Tareas actuales y su progreso real.  
- **Incremento:** Producto funcional y verificable.

Imagen sugerida:  
![Artefactos Scrum](https://scrumorg-website-prod.s3.amazonaws.com/styles/blog_detail/public/2022-11/Scrum%20Artifacts.png)

---

### 2️⃣ **Roles transparentes**

Cada rol debe comunicar y compartir información sin barreras:

- **Product Owner:** Clarifica necesidades y visión.  
- **Scrum Master:** Expone impedimentos y mejoras necesarias.  
- **Equipo de Desarrollo:** Muestra avance real, dudas y dificultades.

---

### 3️⃣ **Eventos transparentes**

Los eventos de Scrum promueven la visibilidad:

- **Daily Scrum:** Estado del trabajo y bloqueadores.  
- **Sprint Review:** Incremento real mostrado sin maquillaje.  
- **Sprint Retrospective:** Conversaciones honestas sobre problemas y mejoras.

---

## 🎯 Ejemplos de transparencia en acción

### 🧪 Ejemplo 1: Actualización del Sprint Backlog
El equipo no marca tareas como “casi listas”.  
En cambio, usa reglas claras:

- “To Do”  
- “In Progress”  
- “Done” (cumpliendo Definition of Done)

Esto evita falsas percepciones del avance.

---

### 🧪 Ejemplo 2: Product Owner claro en sus prioridades
El PO no cambia prioridades por WhatsApp o mensajes aislados.  
Todo debe quedar registrado en el **Product Backlog** con:

- Valor esperado  
- Criterios de aceptación  
- Orden de prioridad visible

---

### 🧪 Ejemplo 3: Daily Scrum honesto
Un desarrollador dice:

> “Ayer no avancé porque estoy bloqueado con la integración. Necesito ayuda.”

Esto permite actuar rápido y evita retrasos ocultos.

---

## 🧭 Casuísticas (situaciones reales)

### 📌 Caso 1: Transparencia baja en un equipo nuevo
Un equipo junior reportaba “todo OK”, pero en realidad no entendían la API.  
Resultado:  
- Retraso de 3 sprints  
- Sobrecarga para 2 desarrolladores  
- Fricción con el PO

Solución Scrum:  
- Daily con tablero visible  
- Sesiones de refinamiento obligatorias  
- Espacios seguros para preguntar

---

### 📌 Caso 2: Stakeholders que no confían
Una empresa veía el Scrum como “irresponsable” porque no había un plan fijo.  
Al implementar transparencia:

- Tableros públicos  
- Historias claras  
- Demo real cada Sprint  

La percepción cambió y aumentó la confianza.

---

### 📌 Caso 3: Equipo que oculta bloqueos
Por miedo, un equipo evitaba decir sus problemas.  
El Scrum Master fomentó la confianza:

- Retrospectivas abiertas  
- Regla “sin culpa, solo aprendizaje”  
- Registro visible de impedimentos

Resultado:  
Entrega en tiempo y mejora de 32% en velocidad.

---

## 🛠️ Herramientas que ayudan a la transparencia

- **Jira / Trello / Azure Boards**  
- **Miro / FigJam**  
- **Slack / Teams**  
- **Dashboard de métricas ágiles**

---

## 🧠 Buenas prácticas

- Actualizar tableros **todos los días**.  
- Definir una **Definition of Done** clara y visible.  
- Comunicar bloqueos sin miedo.  
- Minimizar trabajo oculto o “extraoficial”.  
- Las decisiones importantes deben quedar registradas.

---

## 🚫 Errores comunes que destruyen la transparencia

- Ocultar tareas no planificadas.  
- Inventar avances para “quedar bien”.  
- Saltarse la Sprint Review.  
- Cambiar prioridades sin avisar al equipo.  
- No actualizar los artefactos.

---

## 🚀 En resumen

La transparencia es la base para:

- Evitar suposiciones  
- Tomar decisiones informadas  
- Alinear expectativas  
- Crear confianza  
- Lograr un trabajo colaborativo saludable

> 🧠 *“Sin transparencia, Scrum no funciona. Con transparencia, el equipo evoluciona constantemente.”*
`,
                  },
                  {
                    id: "a7b4f60d-4b75-4879-8e1a-3fd9ecb72a53",
                    title: "Inspección",
                    slug: "inspeccion",
                    level: 2,
                    content: ` 
![Inspección en Scrum](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rduX1T1wpeTsQLnsaJmhrGeWdsBU2m4dvA&s)

La **inspección** es el segundo pilar fundamental de Scrum.  
Consiste en **revisar de manera constante el progreso**, los procesos, los artefactos y el producto, con el fin de detectar desviaciones, identificar mejoras y asegurarse de que el equipo avanza hacia el objetivo del Sprint y del producto.

La inspección no es un examen ni una auditoría:  
Es una **revisión continua y colaborativa** que permite aprender y mejorar en ciclos cortos.

---

> 📚 **Saberes Previos:**  
> - Conocer qué es Scrum y sus pilares.  
> - Comprender el concepto de Sprint y los eventos.  
> - Entender la importancia de la mejora continua en entornos ágiles.

---

## 🧭 ¿Qué es inspeccionar en Scrum?

Inspeccionar significa **analizar el estado actual** del equipo y del producto para saber:

- ¿Estamos avanzando como se esperaba?  
- ¿Existen impedimentos o riesgos?  
- ¿Qué debemos ajustar?  
- ¿Qué hemos aprendido?  

---

## 📦 ¿Qué se inspecciona en Scrum?

Scrum invita a inspeccionar constantemente cuatro aspectos clave:

### 1️⃣ **El progreso hacia el Objetivo del Sprint**  
- Avances reales.  
- Tareas completadas vs. pendientes.  
- Riesgos emergentes.

### 2️⃣ **Los artefactos de Scrum**  
- Product Backlog: claridad y prioridad.  
- Sprint Backlog: transparencia del trabajo.  
- Incremento: calidad y cumplimiento del DoD.

### 3️⃣ **Los procesos y prácticas**  
- ¿Estamos colaborando bien?  
- ¿La comunicación es efectiva?  
- ¿Se respetan los valores ágiles?

### 4️⃣ **La calidad del producto**  
- Cumplimiento de criterios de aceptación.  
- Pruebas realizadas.  
- Integración correcta del incremento.

---

## 📊 Cuadro general de inspección

| Elemento | Se inspecciona durante | ¿Qué se busca? |
|---------|------------------------|----------------|
| Product Backlog | Refinamiento / Sprint Planning | Claridad, valor, prioridad |
| Sprint Backlog | Daily Scrum | Avance, bloqueos, estimaciones |
| Incremento | Sprint Review | Funcionamiento, calidad, feedback |
| Procesos | Retrospective | Mejora continua, problemas internos |

---

## 🧩 Eventos donde ocurre la inspección

### 🔸 Daily Scrum
- Se inspecciona el progreso diario.  
- Se detectan bloqueos rápidamente.  
- Se ajusta el plan para las próximas 24 horas.

### 🔸 Sprint Review
- Se inspecciona el incremento del producto.  
- Se valida con stakeholders.  
- Se recopila feedback valioso.

### 🔸 Sprint Retrospective
- Se inspecciona el proceso y las relaciones humanas.  
- Se identifican mejoras internas.  
- Se planifican acciones de mejora.

### 🔸 Refinamiento
- Se inspecciona la calidad del Product Backlog.  
- Se ajustan prioridades y detalles.

---

## 🧠 La inspección no funciona sin transparencia
Para que la inspección sea efectiva:

- La información debe ser **real y actualizada**.  
- Los artefactos deben reflejar la verdad del progreso.  
- El equipo debe comunicar bloqueos sin miedo.

> 🧠 *“No se puede inspeccionar aquello que está oculto.”*

---

## 🛠️ Herramientas útiles para inspeccionar

- **Jira / Trello / Azure DevOps**  
- **Burndown Charts**  
- **Pull Requests y revisiones de código**  
- **Dashboards ágiles**  
- **Pruebas automatizadas**

---

## 🧪 Ejemplos prácticos

### ✏️ Ejemplo 1: Burndown Chart
El gráfico muestra que el equipo no está reduciendo las tareas como se esperaba.  
Durante el Daily se inspecciona y descubren:

- Tarea mal estimada.  
- Bloqueo técnico no reportado.  

Acción: el equipo replanifica el Sprint.

---

### ✏️ Ejemplo 2: Sprint Review con feedback crítico
El cliente dice:

> “Esta funcionalidad no cumple con lo esperado.”

El equipo inspecciona:

- El criterio de aceptación fue ambiguo.  
- No se validó un caso de uso importante.

Resultado:  
Se ajusta el Product Backlog y se mejora la comunicación con el PO.

---

### ✏️ Ejemplo 3: Problemas de comunicación
En la Retrospectiva, inspeccionan que:

- Dos desarrolladores no se coordinan.  
- Las revisiones de código están tardando demasiado.  

Acciones propuestas:

- Reglas claras para PRs.  
- Reuniones técnicas breves.

---

## 🎭 Casuísticas reales

### 📌 Caso 1: Inspección superficial
Un equipo hacía Daily Scrum “por cumplir”.  
Solo decían: *“Todo bien, avanzando”*.  

Consecuencia:  
No detectaron un error crítico que retrasó 2 semanas el proyecto.

Solución:  
- Reglas claras para el Daily.  
- Mostrar tablero siempre durante la reunión.  
- Promover comunicación real.

---

### 📌 Caso 2: Sprint Review con invisibilidad del trabajo
El equipo presentaba diapositivas en vez del **Incremento real**.  

Resultado:  
- Stakeholders desconfiaban.  
- Se escondían defectos.  

Solución:  
- Mostrar siempre el producto funcionando.  
- Reducir trabajo no integrado.

---

### 📌 Caso 3: Retrospectiva sin mejoras
El equipo siempre decía: *“Todo bien, seguimos igual”*.  
No había inspección profunda.

Solución Scrum Master:  
- Técnicas como “5 porqués”, “Mad-Sad-Glad” y “Starfish”.  
- Crear ambiente seguro para hablar.

---

## 🚫 Errores comunes en la inspección

- Hacer reuniones sin propósito.  
- Ocultar bloqueadores.  
- Presentar trabajo incompleto como “casi listo”.  
- Tomar inspección como auditoría o crítica.  
- No tomar acciones después de inspeccionar.

---

## 🚀 En resumen

La inspección permite:

- Detectar problemas temprano.  
- Aprender en ciclos cortos.  
- Adaptarse rápidamente.  
- Mantener alineado al equipo y stakeholders.  
- Mejorar la calidad del producto de forma continua.

> 🧠 *“Inspeccionamos no para culpar, sino para mejorar y aprender.”*
`,
                  },
                  {
                    id: "0f3e51cd-9c45-42af-8f45-318aeb77088e",
                    title: "Adaptación",
                    slug: "adaptacion",
                    level: 3,
                    content: `
![Adaptación en Scrum](https://dharmacon.net/wp-content/uploads/2023/09/5.jpg)

La **adaptación** es el tercer pilar fundamental de Scrum.  
Significa que, una vez que el equipo inspecciona algo y detecta desviaciones, riesgos o nuevas oportunidades, **ajusta el rumbo** para maximizar el valor y mantener el avance hacia los objetivos del producto.

Sin adaptación, inspeccionar no sirve de nada.

---

> 📚 **Saberes Previos:**  
> - Conocer los pilares de Scrum (Transparencia, Inspección y Adaptación).  
> - Comprender qué es el Sprint y sus eventos.  
> - Entender el rol del Product Owner y del Scrum Master.

---

## 🔧 ¿Qué es Adaptación?

Adaptar en Scrum significa:

- Ajustar la estrategia del Sprint.  
- Reordenar o redefinir el Product Backlog.  
- Mejorar el proceso de trabajo.  
- Solucionar impedimentos.  
- Aprender de forma iterativa.  
- Cambiar lo que sea necesario para mejorar el valor entregado.

> 💡 *Scrum vive del cambio. No se trata de seguir un plan rígido, sino de aprender y mejorar continuamente.*

---

## 📦 ¿Cuándo se debe adaptar?

Scrum dice que se debe adaptar **rápido y de inmediato**, cada vez que se detecta:

- Una desviación del plan del Sprint.  
- Un riesgo técnico.  
- Una mala estimación.  
- Requerimientos nuevos o incompletos.  
- Problemas en la colaboración del equipo.  
- Calidad insuficiente en el producto.  

---

## 📊 Cuadro general de Adaptación en Scrum

| Evento | Qué se adapta | Responsable principal |
|--------|---------------|------------------------|
| Daily Scrum | Plan de trabajo para las siguientes 24 horas | Equipo de Desarrollo |
| Sprint Review | Product Backlog y prioridades | Product Owner |
| Sprint Retrospective | Procesos, prácticas y relaciones | Todo el equipo |
| Refinamiento | Detalle y orden del Product Backlog | PO + Equipo |
| Durante el Sprint | Estrategia, tareas y enfoque | Equipo de Desarrollo |

---

## 🧩 Adaptación en los eventos Scrum

### 🔹 Adaptación en el Daily Scrum
El equipo ajusta:

- Quién toma qué tareas.  
- Cómo se atacará un bloqueo.  
- Si es necesario dividir o unir tareas.  
- Ajustes al Sprint Backlog.

Ejemplo:  
> “La integración falló. Hoy nos enfocamos en corregirla y dejamos la UI para mañana.”

---

### 🔹 Adaptación en la Sprint Review
Basado en feedback:

- Se reorganizan prioridades.  
- Se agregan nuevas historias.  
- Se modifica la visión del producto.

Ejemplo:  
> “Los usuarios pidieron filtro adicional. Esto sube en prioridad para el próximo Sprint.”

---

### 🔹 Adaptación en la Retrospectiva
Aquí se adaptan:

- Procesos.  
- Comunicación.  
- Colaboración.  
- Herramientas.  
- Acuerdos internos.  

Ejemplo:  
> “Vamos a utilizar una regla para Pull Requests: máximo 250 líneas para evitar retrasos.”

---

### 🔹 Adaptación continua durante el Sprint
El equipo puede:

- Cambiar estrategias internas.  
- Dividir tareas.  
- Reorganizarse según capacidades.  
- Mejorar prácticas técnicas.

**Lo único que NO cambia es el Objetivo del Sprint.**

---

## 🧠 Adaptar ≠ Cambiar todo siempre
Adaptar implica **cambios inteligentes**, no caos.

- Cambiar solo cuando agrega valor.  
- Evitar decisiones impulsivas.  
- Ajustar basado en datos, no en opiniones.  
- Revisar impacto antes de actuar.

---

## 🧪 Ejemplos prácticos

### ✏️ Ejemplo 1: Tarea mucho más compleja de lo esperado
En la inspección del Daily se detecta que una funcionalidad requiere más tiempo del estimado.

Adaptación:

- Dividir la tarea.  
- Reorganizar prioridades.  
- Colocar desarrolladores adicionales.  
- Acordar con el PO qué se mantiene o se pospone.

---

### ✏️ Ejemplo 2: Feedback del cliente cambia la prioridad
En la Review, el cliente dice:

> “Esta funcionalidad no es tan urgente como pensamos.”

Adaptación:

- PO baja su prioridad.  
- Se reordena el Product Backlog.  
- El próximo Sprint se enfoca en mayor valor.

---

### ✏️ Ejemplo 3: Problemas en el proceso
En la Retrospectiva detectan:

- Muchas tareas “In Progress”.  
- Bloqueos constantes.  
- Poca comunicación.

Adaptación:

- WIP limit: máximo 2 tareas por persona.  
- Daily técnico opcional.  
- Revisión cruzada obligatoria antes de pasar a Done.

---

## 🎭 Casuísticas reales

### 📌 Caso 1: Sprint que se queda sin tiempo
Un equipo se da cuenta a mitad del Sprint de que no logrará completar todo.

Adaptación:

- Se renegocia el alcance con el PO.  
- Se protege el Objetivo del Sprint.  
- Se entrega el valor más importante.

---

### 📌 Caso 2: Cambio de requisitos a mitad de Sprint
Stakeholder insiste en agregar una historia urgente.

Solución correcta:

- El PO evalúa.  
- Si es urgente de verdad → se cambia el Sprint, pero debe pasar por una **negociación formal**.  
- Si no, se mueve al Product Backlog para el siguiente Sprint.

---

### 📌 Caso 3: Mala calidad detectada en la Review
El cliente nota errores.

Adaptación inmediata:

- El equipo ajusta Definition of Done.  
- Incluye pruebas automáticas o revisiones obligatorias.  
- Planifica corregir deuda técnica.

---

## 🚫 Errores comunes que destruyen la Adaptación

- Inspeccionar pero no actuar.  
- Cambiar prioridades sin pasar por el PO.  
- Cambiar el Objetivo del Sprint.  
- Hacer cambios sin datos.  
- Adaptar tarde y no a tiempo.  
- Tomar cambios como culpa y no como aprendizaje.

---

## 🚀 En resumen

La adaptación permite:

- Corregir desviaciones rápidamente.  
- Aprovechar oportunidades inesperadas.  
- Mejorar la calidad del producto.  
- Aumentar la eficiencia del equipo.  
- Aprender constantemente.

> 🧠 *“En Scrum, adaptarse rápido es la clave para entregar valor continuo.”*
`,
                  },
                ],
              },
            ],
          },
          {
            id: "8c391d5b-bd59-4a31-967a-16a3f3d4969f",
            title: "Personas y flujo de valor",
            subtitle: "",
            slug: "personas-y-flujo-de-valor",
            description:
              "Descubre cómo la autoorganización, la colaboración y la multifuncionalidad impulsan la entrega de valor en Scrum.",
            content: "",
            icon: "users",
            level: 1,
            features: [
              "Autoorganización de equipos",
              "Colaboración efectiva",
              "Equipos multifuncionales",
            ],
            modules: [
              {
                id: "71a02aaf-9e1c-4e02-889f-9d93f2b81df1",
                title: "Autoorganización y colaboración",
                level: 1,
                lessons: [
                  {
                    id: "0cfe0de8-38bb-44b5-bdb4-2d1a2e8eb2f7",
                    title: "Autoorganización",
                    slug: "autoorganizacion",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer los roles de Scrum (Scrum Master, Product Owner, Developers).
- Entender el concepto de Sprint y su objetivo.
- Tener claro qué es un Incremento y por qué debe ser valioso.

---

## 📘 ¿Qué es la Autoorganización?
La **autoorganización** significa que el equipo decide **cómo** realizar su trabajo sin que un jefe les diga cada paso. Esto les da libertad, responsabilidad y la capacidad de adaptarse rápidamente.

Los equipos autoorganizados:
- Eligen la mejor forma de alcanzar el objetivo del Sprint.
- Gestionan sus tareas sin supervisión constante.
- Se comprometen colectivamente con la calidad.
- Se apoyan entre sí para resolver bloqueos.

---

## 🖼️ Imagen Representativa
![Autoorganización](https://corporate-assets.lucid.co/co/7bf8d2d4-2a2b-4fdf-8ab1-ec220673b0e3.png?v=1745515942254)

---

## 📦 Beneficios de la Autoorganización
| Beneficio | Descripción |
|----------|-------------|
| Innovación | Surgen nuevas ideas porque el equipo tiene libertad para proponer. |
| Velocidad | Las decisiones se toman más rápido. |
| Responsabilidad compartida | Todos cuidan la calidad y los resultados. |
| Motivación | El equipo siente autonomía y control de su trabajo. |

---

## 📌 Ejemplos Prácticos
### 🟦 Ejemplo 1: Distribución de tareas
> El equipo revisa el Sprint Backlog y decide quién toma qué tarea según habilidades, carga y disponibilidad.

### 🟩 Ejemplo 2: Resolver bloqueos
> Si surge un problema técnico, el equipo se reúne, analiza alternativas y acuerda la solución sin esperar instrucciones externas.

### 🟧 Ejemplo 3: Mejoras continuas
> En cada Retrospectiva, el equipo propone cambios en la forma de trabajar y decide implementarlos en el siguiente Sprint.

---

## 🎯 Conclusión
La autoorganización permite que el equipo Scrum sea **más ágil, más rápido y más responsable**. No se trata de trabajar sin control, sino de que el equipo tome decisiones inteligentes y alineadas al objetivo del producto.

---`,
                  },
                  {
                    id: "51c622b1-84a3-4c0a-bc69-2a2a91c6f54e",
                    title: "Colaboración Efectiva",
                    slug: "colaboracion-efectiva",
                    level: 2,
                    content: `
## 🧠 Saberes Previos
- Conocer roles y responsabilidades dentro de Scrum.
- Entender qué es un Sprint y qué es un Incremento.
- Saber cómo funciona la autoorganización dentro del equipo.

---

## 📘 ¿Qué es la Colaboración Efectiva?
La **colaboración efectiva** es la capacidad del equipo Scrum de trabajar unido, comunicarse de manera clara y coordinar esfuerzos para lograr objetivos comunes.

En Scrum, la colaboración es esencial porque:
- Reduce malentendidos.
- Asegura que todos estén alineados con el objetivo del Sprint.
- Aumenta la velocidad y la calidad del Incremento.
- Fomenta una cultura de confianza y apoyo mutuo.

---

## 🖼️ Imagen Representativa
![Colaboración Efectiva](https://dharmacon.net/wp-content/uploads/2023/09/168.png)

---

## 📦 Elementos Clave de la Colaboración Efectiva
| Elemento | Descripción |
|----------|-------------|
| Comunicación abierta | El equipo comparte dudas, bloqueos y avances sin miedo. |
| Objetivos comunes | Todos trabajan hacia un solo propósito claro. |
| Confianza | Se confía en que cada miembro cumplirá con su parte. |
| Apoyo mutuo | Nadie trabaja solo; el equipo ayuda cuando hay bloqueos. |
| Transparencia | Información visible y disponible para todos. |

---

## 📌 Ejemplos Prácticos
### 🟦 Ejemplo 1: Daily Scrum para alineación
> Durante la Daily, cada miembro comenta su avance y pide ayuda si la necesita. Esto permite coordinar tareas y evitar bloqueos.

### 🟩 Ejemplo 2: Dividir una historia juntos
> El equipo analiza una User Story compleja y decide en conjunto cómo dividirla en tareas pequeñas que todos puedan comprender.

### 🟧 Ejemplo 3: Pair programming
> Dos desarrolladores trabajan juntos para resolver una tarea crítica, asegurando calidad y aprendizaje mutuo.

---

## 🎯 ¿Por qué es importante?
La colaboración efectiva hace que el equipo:
- Avance más rápido.
- Evite retrabajos.
- Comparta conocimiento.
- Mantenga un ambiente sano y productivo.
- Logre Increments más valiosos con menos fricción.

---

## 📝 Conclusión
La colaboración no se trata solo de trabajar juntos, sino de **comprometerse juntos**. En Scrum, un equipo que colabora de forma efectiva puede adaptarse mejor, responder más rápido a cambios y entregar más valor al cliente.

---`,
                  },
                  {
                    id: "1f34209a-f08d-45d2-b8e3-2106bc229573",
                    title: "Equipos multifuncionales",
                    slug: "equipos-multifuncionales",
                    level: 3,
                    content: `# 
## 🧠 Saberes Previos
- Conocer los roles de Scrum: Product Owner, Scrum Master y Developers.
- Entender el concepto de Sprint y entrega de Incremento.
- Saber qué es la autoorganización y la colaboración.

---

## 📘 ¿Qué son los Equipos Multifuncionales?
Un **equipo multifuncional** es aquel que tiene todas las habilidades necesarias para entregar un producto completo **sin depender de personas externas al equipo**.  
En Scrum, se espera que los Developers puedan:

- Analizar requisitos.  
- Diseñar soluciones.  
- Desarrollar el producto.  
- Realizar pruebas.  
- Integrar y entregar Incrementos listos para usar.

> 💡 Esto permite mayor velocidad, autonomía y responsabilidad.

---

## 🖼️ Imagen Representativa
![Equipos Multifuncionales](https://donetonic.com/wp-content/uploads/2021/05/el-equipo-scrum.png)

---

## 📦 Características de los Equipos Multifuncionales
| Característica | Descripción |
|----------------|-------------|
| Diversidad de habilidades | Incluye programación, diseño, pruebas, integración y documentación. |
| Autonomía | Capacidad de decidir cómo completar las tareas del Sprint. |
| Compromiso | Todos los miembros trabajan juntos hacia un mismo objetivo. |
| Colaboración | Se apoyan entre sí y comparten conocimiento. |
| Responsabilidad compartida | Cada miembro cuida la calidad del Incremento final. |

---

## 📌 Ejemplos Prácticos

### 🟦 Ejemplo 1: Desarrollo completo de una funcionalidad
> El equipo analiza la historia de usuario, diseña, implementa, prueba y entrega el Incremento sin depender de otros departamentos.

### 🟩 Ejemplo 2: Resolviendo bloqueos internamente
> Surge un problema técnico en la integración. El equipo se reúne y lo soluciona sin esperar soporte externo.

### 🟧 Ejemplo 3: Rotación de roles
> Un desarrollador especializado en backend ayuda en tareas de testing mientras otro se enfoca en la integración, fomentando aprendizaje y flexibilidad.

---

## 🎯 Beneficios de los Equipos Multifuncionales
- Reducción de dependencias externas.  
- Entregas más rápidas y de mayor calidad.  
- Mayor motivación y compromiso del equipo.  
- Flexibilidad para adaptarse a cambios en el Product Backlog.  
- Mejora continua a través de aprendizaje compartido.

---

## 🎭 Casuísticas Reales

### 📌 Caso 1: Dependencia de otro equipo
Un equipo solo de desarrollo backend debía esperar diseños de UI externos.  
Resultado: retrasos y frustración.

Solución:  
- Integrar diseñadores y testers dentro del mismo equipo.  
- Implementar revisiones internas rápidas.

### 📌 Caso 2: Falta de habilidades en pruebas
Se detectaban errores frecuentes al entregar Incrementos.  
Solución:  
- Integrar testers dentro del equipo.  
- Capacitar desarrolladores en pruebas automáticas.

### 📌 Caso 3: Equipo pequeño y multidisciplinario
Un equipo de 5 personas desarrolló, probó y desplegó un MVP completo sin dependencias externas, entregando valor en tiempo récord.

---

## 📝 Conclusión
Los **equipos multifuncionales** son la clave para la autonomía, la rapidez y la calidad en Scrum.  
Tener todas las habilidades necesarias dentro del equipo permite **adaptarse, colaborar y entregar valor continuo** sin bloqueos externos.

---`,
                  },
                ],
              },
            ],
          },
          {
            id: "f16e2b6c-561f-4f9b-8d44-1c509c82f3d1",
            title: "Entrega temprana y cadencia",
            subtitle: "",
            slug: "entrega-temprana-y-cadencia",
            description:
              "Aprende cómo priorizar, usar time-boxing y fomentar la experimentación para generar valor de forma temprana y continua.",
            content: "",
            icon: "clock",
            level: 1,
            features: [
              "Priorización por valor",
              "Gestión con time-boxing",
              "Hipótesis y aprendizaje",
            ],
            modules: [
              {
                id: "ab41b1f9-2fc1-4f5d-97cf-8e4d73f14b83",
                title: "Priorización",
                level: 1,
                lessons: [
                  {
                    id: "7f90225c-c1cd-4b61-9a54-99fa9787d5b0",
                    title:
                      "Priorización por Valor (técnicas: MoSCoW, WSJF simple)",
                    slug: "priorizacion-por-valor",
                    level: 1,
                    content: `![Priorización por Valor](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfqVwVoxQAUXIvpdj_8aC0MvB_fiRZtA2T3Q&s)

## 🧠 Saberes Previos
- Conocer los conceptos de Scrum: Product Backlog, Product Owner y Sprints.
- Entender que el Product Backlog contiene todas las funcionalidades, mejoras y correcciones del producto.
- Saber que **no todas las funcionalidades tienen el mismo valor** para el negocio o para el cliente.

---

## 📘 ¿Qué es la Priorización por Valor?
La **Priorización por Valor** es el proceso mediante el cual el Product Owner decide **qué elementos del Product Backlog deben desarrollarse primero** según el valor que entregan al negocio o al cliente.  

Objetivos principales:
- Maximizar el retorno de inversión (ROI).  
- Entregar valor temprano y continuo al cliente.  
- Asegurar que el equipo trabaje en lo que realmente importa.  

> 💡 *No se trata de hacer primero lo fácil, sino lo que genera más impacto.*

---

## 🧩 Elementos clave de la priorización
1. **Valor del negocio**: ¿Cuánto aporta al negocio o cliente final?  
2. **Urgencia o criticidad**: ¿Qué pasa si no se hace ahora?  
3. **Costo o esfuerzo**: ¿Qué recursos necesitamos para implementarlo?  
4. **Riesgo o incertidumbre**: ¿Cuán seguro estamos de la solución propuesta?  

---

## 🔧 Técnicas de Priorización

### 1️⃣ MoSCoW
MoSCoW es una técnica simple para clasificar los ítems del Product Backlog:

| Categoría | Descripción | Ejemplo |
|-----------|-------------|---------|
| **M – Must have** | Imprescindible. Debe entregarse sí o sí en el Sprint | Login de usuario en app bancaria |
| **S – Should have** | Muy importante, pero no crítico | Notificaciones push de promociones |
| **C – Could have** | Deseable, mejora experiencia, se hace si hay tiempo | Tema oscuro en la app |
| **W – Won’t have** | No se hará en este ciclo | Integración con red social poco usada |

**💡 Recomendación:**  
- Revisar MoSCoW en cada Sprint Review y actualizar según feedback del cliente.  
- Evitar sobrecargar Must Have para no saturar al equipo.

---

### 2️⃣ WSJF (Weighted Shortest Job First) – Simple
WSJF ayuda a decidir **qué entregar primero** considerando valor y esfuerzo:

\[
WSJF = \frac{Valor del Negocio + Urgencia + Reducción de Riesgo}{Duración/Esfuerzo}
\]

**Pasos para usar WSJF simple:**
1. Asigna un valor de 1 a 10 a cada ítem por:
   - Valor para el negocio  
   - Urgencia/impacto  
   - Reducción de riesgo
2. Asigna un valor estimado de esfuerzo (tamaño del trabajo).  
3. Calcula WSJF: suma de valor dividido entre esfuerzo.  
4. Prioriza los ítems con **WSJF más alto primero**.

**Ejemplo:**

| Ítem | Valor Negocio | Urgencia | Riesgo Reducido | Esfuerzo | WSJF |
|------|---------------|----------|----------------|----------|------|
| A – Login | 9 | 8 | 5 | 5 | 4.4 |
| B – Notificaciones | 6 | 5 | 2 | 3 | 4.3 |
| C – Tema oscuro | 3 | 2 | 1 | 2 | 3.0 |

> El ítem A tiene mayor WSJF, por lo que se prioriza primero.

---

## 📌 Cuadro Comparativo: MoSCoW vs WSJF

| Aspecto | MoSCoW | WSJF Simple |
|---------|--------|-------------|
| **Propósito** | Clasificar ítems según importancia | Decidir qué ítem genera más valor por menor esfuerzo |
| **Medición** | Cualitativa (Must, Should, Could, Won’t) | Cuantitativa (WSJF = valor/tiempo) |
| **Facilidad** | Muy fácil de aplicar | Requiere estimaciones y cálculos |
| **Uso recomendado** | Backlog inicial o refinamiento rápido | Backlog grande con múltiples dependencias y valor económico |

---

## 🧪 Ejemplos Prácticos

### ✏️ Ejemplo 1: MoSCoW en un e-commerce
- **Must:** Checkout funcional y seguro  
- **Should:** Recomendaciones personalizadas  
- **Could:** Chatbot de atención al cliente  
- **Won’t:** Personalización de colores de interfaz  

### ✏️ Ejemplo 2: WSJF simple en desarrollo de software
El Product Owner analiza 5 historias de usuario y calcula WSJF. La historia con mayor WSJF se agenda primero para el próximo Sprint, asegurando **mayor retorno de valor**.

---

## 🎭 Casuísticas Reales

### 📌 Caso 1: Priorizar solo por facilidad
El equipo prioriza las tareas “fáciles de hacer” primero.  
Consecuencia: el Incremento tarda en generar valor real al cliente.  
Lección: **priorizar por valor, no por comodidad**.

### 📌 Caso 2: Cambio de prioridad por feedback
El cliente solicita funcionalidad crítica para el negocio.  
Acción: el PO recalcula WSJF y mueve ese ítem a la parte superior del Backlog.  
Resultado: Incremento de valor entregado temprano.

### 📌 Caso 3: Uso combinado MoSCoW + WSJF
- MoSCoW clasifica las historias por importancia.  
- WSJF determina el orden dentro de cada categoría.  
- Beneficio: priorización balanceada y eficiente.

---

## 🛠️ Recomendaciones

1. Revisar prioridades en cada Sprint Planning.  
2. Usar MoSCoW para clasificación rápida y WSJF para decisiones estratégicas.  
3. Considerar siempre valor al cliente y negocio, no solo esfuerzo.  
4. Mantener el Product Backlog transparente y actualizado.  
5. Involucrar al equipo en la estimación de esfuerzo para mayor precisión.

---

## 🚀 Conclusión
La **priorización por valor** permite a Scrum entregar **incrementos significativos y útiles** en cada Sprint, asegurando que los esfuerzos del equipo se concentren en lo que realmente importa para el negocio y los usuarios.

> 🧠 *“No es más rápido quien hace más, sino quien entrega más valor antes.”*
`,
                  },
                  {
                    id: "7c21a473-9a8f-4a65-9cb0-5bb79d95c4a7",
                    title: "Time-boxing (propósito y límites)",
                    slug: "time-boxing",
                    level: 2,
                    content: `
## 🧠 Saberes Previos
- Conocer los eventos de Scrum: Sprint, Sprint Planning, Daily, Sprint Review y Retrospective.  
- Entender el concepto de Incremento y Product Backlog.  
- Saber qué significa eficiencia y foco en la entrega de valor.

---

## 📘 ¿Qué es Time-boxing?
El **Time-boxing** es la práctica de **asignar un límite de tiempo fijo** a un evento, actividad o tarea para que se realice de forma enfocada y eficiente.  

En Scrum, todos los eventos tienen **duraciones definidas**, garantizando que el equipo:

- Mantenga la concentración en lo importante.  
- Evite reuniones eternas o desviaciones.  
- Promueva la inspección y adaptación de forma rápida.

> 💡 *Time-boxing no es apresuramiento, es disciplina y enfoque.*

---

## 🔧 Propósitos del Time-boxing

1. **Foco en objetivos**: Cada evento tiene un propósito claro y limitado en tiempo.  
2. **Disciplina de equipo**: Evita desviaciones y discusiones innecesarias.  
3. **Facilita inspección y adaptación**: Eventos cortos permiten ajustes rápidos.  
4. **Transparencia y predictibilidad**: Todos saben cuánto dura cada reunión o actividad.  
5. **Gestión de energía**: Evita agotamiento y mantiene motivación alta.

---

## 🕒 Límites de Tiempo de Eventos Scrum

| Evento | Duración Máxima | Propósito |
|--------|----------------|-----------|
| Sprint | 1 a 4 semanas | Entregar un Incremento valioso |
| Sprint Planning | 8 horas (para Sprint de 1 mes) | Planificar qué se hará y cómo |
| Daily Scrum | 15 minutos | Sincronizar equipo y detectar bloqueos |
| Sprint Review | 4 horas (para Sprint de 1 mes) | Revisar Incremento y recibir feedback |
| Sprint Retrospective | 3 horas (para Sprint de 1 mes) | Reflexionar sobre procesos y mejoras |

> ⏰ *Para Sprints más cortos, los tiempos se ajustan proporcionalmente.*

---

## 🧩 Beneficios del Time-boxing

| Beneficio | Descripción |
|-----------|-------------|
| Eficiencia | Limita el tiempo de reuniones y evita discusiones innecesarias |
| Claridad | Cada evento tiene un objetivo definido y medible |
| Mejora continua | Permite inspección y adaptación frecuentes |
| Prioridad | Fuerza al equipo a enfocarse en lo más importante |
| Motivación | Reuniones cortas mantienen la atención y energía del equipo |

---

## 📌 Ejemplos Prácticos

### 🟦 Ejemplo 1: Daily Scrum
- Duración: 15 minutos  
- Objetivo: Cada miembro responde 3 preguntas:
  1. ¿Qué hice ayer?  
  2. ¿Qué haré hoy?  
  3. ¿Qué bloqueos tengo?  
- Resultado: Comunicación rápida, bloqueos identificados y Sprint Backlog actualizado.

### 🟩 Ejemplo 2: Sprint Planning
- Duración: 4 horas para un Sprint de 2 semanas  
- Se priorizan historias, se asignan tareas y se define Definition of Done.  
- Beneficio: Todo el equipo entiende claramente los objetivos y responsabilidades.

### 🟧 Ejemplo 3: Retrospectiva
- Duración: 3 horas máximo  
- Se revisan éxitos y problemas del Sprint  
- Se definen mejoras concretas para el próximo Sprint

---

## 🎭 Casuísticas Reales

### 📌 Caso 1: Daily Scrum demasiado largo
- El equipo discute detalles técnicos en lugar de bloqueos.  
- Problema: Tiempo excedido, pérdida de foco.  
- Solución: Time-box de 15 minutos, mover discusiones técnicas a reunión aparte o refinamiento.

### 📌 Caso 2: Sprint Planning excesivo
- Se prolonga a 6 horas, agotando al equipo.  
- Problema: Fatiga, decisiones apresuradas al final.  
- Solución: Limitar a 4 horas y preparar backlog refinado antes de la planificación.

### 📌 Caso 3: Retrospectiva sin límite
- Se alarga indefinidamente, mezclando temas de otros Sprints.  
- Problema: Pérdida de valor del feedback y desmotivación.  
- Solución: Time-box estricto de 3 horas y agenda clara.

---

## 🛠️ Recomendaciones de uso
1. **Respetar siempre los límites** para mantener disciplina.  
2. **Preparar agenda previa** para que el tiempo se use de manera efectiva.  
3. **Usar temporizadores** si es necesario para mantener el control.  
4. **Separar discusiones largas** fuera de los eventos time-boxed.  
5. **Adaptar la duración según el tamaño del Sprint** (proporcionalidad).

---

## 🚀 Conclusión
El **Time-boxing** asegura que Scrum sea **eficiente, enfocado y predecible**, promoviendo entrega continua de valor y fomentando hábitos de inspección y adaptación.  
Un equipo que respeta sus límites de tiempo puede **enfocarse en lo importante y mejorar continuamente**.

> 🧠 *“No se trata de hacer más rápido, sino de dedicar el tiempo justo a lo que realmente importa.”*
`,
                  },
                  {
                    id: "8d14e41b-7b6c-4e1b-8358-f02c1d7f0f42",
                    title: "Equipos multifuncionales (hipótesis y aprendizaje)",
                    slug: "equipos-multifuncionales-hipotesis-aprendizaje",
                    level: 3,
                    content: `![Equipos Multifuncionales y Aprendizaje](https://xpedition.utp.edu.pe/wp-content/uploads/2023/02/2.jpg)

## 🧠 Saberes Previos
- Conocer los roles Scrum: Product Owner, Scrum Master y Developers.  
- Entender qué es un Sprint, Incremento y Product Backlog.  
- Conocer la importancia de la autoorganización y colaboración en equipos multifuncionales.  

---

## 📘 Concepto General
Un **equipo multifuncional** es aquel que posee todas las habilidades necesarias para **entregar un producto completo** sin depender de terceros externos.  

Cuando se combina con **hipótesis y aprendizaje**, el equipo puede:
- Formular suposiciones sobre funcionalidades, valor o comportamiento del usuario.  
- Probar esas hipótesis en incrementos reales.  
- Aprender de la retroalimentación para ajustar prioridades, diseño y enfoque.  

> 💡 *Scrum promueve un ciclo continuo de hipótesis, experimentación y aprendizaje dentro de equipos multifuncionales.*

---

## 🔍 Hipótesis en Equipos Multifuncionales
Una **hipótesis** es una suposición que el equipo quiere validar. Por ejemplo:
- “Si agregamos un botón de compra rápida, los usuarios completarán más pedidos.”  
- “Si mejoramos la velocidad de carga, la retención aumentará en un 15%.”  

### Pasos para trabajar con hipótesis
1. Formular claramente la hipótesis.  
2. Definir cómo se medirá (KPI, métricas, feedback).  
3. Implementar en un incremento del producto.  
4. Recoger datos y analizar resultados.  
5. Aprender y ajustar el Product Backlog.

---

## 📦 Aprendizaje dentro del equipo
El **aprendizaje** es la clave para la mejora continua. Los equipos multifuncionales aprenden:
- Qué funcionalidades generan valor real.  
- Qué problemas enfrentan los usuarios.  
- Cómo optimizar procesos internos y colaboración.  

### Beneficios del aprendizaje:
| Beneficio | Descripción |
|-----------|-------------|
| Reducción de riesgo | Se detectan errores y suposiciones incorrectas temprano |
| Mejora continua | Se ajusta el producto y el proceso sprint a sprint |
| Toma de decisiones basada en evidencia | El equipo prioriza lo que realmente aporta valor |
| Motivación y compromiso | Cada miembro ve el impacto directo de su trabajo |

---

## 🧩 Ciclo de Hipótesis y Aprendizaje

1. **Generar Hipótesis**  
   > Suposición clara basada en necesidad del cliente o del negocio.  

2. **Planificar Experimento**  
   > Decidir qué incremento o feature permitirá validar la hipótesis.  

3. **Desarrollo por Equipo Multifuncional**  
   > Implementar funcionalidad completa (backend, frontend, pruebas) sin depender de otros equipos.  

4. **Medir y Validar**  
   > Recoger métricas y feedback de usuarios.  

5. **Aprender y Adaptar**  
   > Ajustar Product Backlog, priorización y proceso según resultados.

---

## 📌 Ejemplos Prácticos

### 🟦 Ejemplo 1: Funcionalidad de e-commerce
- Hipótesis: “Si agregamos recomendaciones personalizadas, el ticket promedio aumentará en un 10%”.  
- Acción: El equipo multifuncional desarrolla la función completa, la lanza en un Sprint y mide el efecto.  
- Aprendizaje: Se confirma la hipótesis → se priorizan más mejoras de personalización.

### 🟩 Ejemplo 2: Mejora de experiencia de usuario
- Hipótesis: “Reducir pasos en checkout reducirá el abandono en 5%”.  
- Acción: Backend y frontend trabajan juntos para simplificar el flujo.  
- Aprendizaje: Métricas muestran mejora, la función se ajusta y se replica en otras áreas.

### 🟧 Ejemplo 3: Validación de MVP
- Hipótesis: “El MVP atraerá al menos 100 usuarios activos en la primera semana”.  
- Acción: Equipo desarrolla MVP completo incluyendo pruebas y lanzamiento.  
- Aprendizaje: Si la meta no se cumple, se ajusta hipótesis y priorización.

---

## 🎭 Casuísticas Reales

### 📌 Caso 1: Hipótesis incorrecta
- El equipo implementó una funcionalidad basada en suposiciones de marketing.  
- Resultado: Baja adopción.  
- Aprendizaje: Validar hipótesis con prototipos o pruebas pequeñas antes de desarrollos grandes.

### 📌 Caso 2: Equipo no multifuncional
- Dependencia de otros departamentos genera retrasos en validar hipótesis.  
- Aprendizaje: Equipos multifuncionales permiten iterar más rápido y aprender antes.

### 📌 Caso 3: Aprendizaje continuo
- Cada Sprint incorpora feedback de usuarios y ajustes en la priorización del Product Backlog.  
- Resultado: Incrementos más valiosos, producto alineado a necesidades reales.

---

## 🛠️ Recomendaciones
1. Formar equipos **verdaderamente multifuncionales**, con todas las habilidades necesarias.  
2. Definir **hipótesis claras y medibles** antes de desarrollar nuevas funcionalidades.  
3. Usar Sprints como ciclos de **experimento y aprendizaje**.  
4. Documentar aprendizajes y compartirlos con todo el equipo.  
5. Integrar resultados en la priorización del Product Backlog.

---

## 🚀 Conclusión
Los **equipos multifuncionales que trabajan con hipótesis y aprendizaje** son la base de un Scrum efectivo.  
Permiten **experimentar, aprender y adaptar** el producto continuamente, asegurando que cada incremento entregue **valor real al cliente y al negocio**.

> 🧠 *“Un equipo que aprende continuamente convierte la incertidumbre en oportunidades de valor.”*
`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "e8f1d9f7-2b34-42bb-87d9-8a21d2e8c33f",
        name: "El Sprint en profundidad",
        level: 3,
        topics: [
          {
            id: "54f16c2a-2a3d-4a1d-9cb4-4738e3ef26f1",
            title: "Sprint como contenedor de Valor",
            subtitle: "",
            slug: "sprint-como-contenedor-de-valor",
            description:
              "Explora el Sprint como la unidad central de trabajo en Scrum, su mecánica, cadencia, flujo y métricas clave.",
            content: "",
            icon: "clock",
            level: 1,
            features: [
              "Mecánica del Sprint",
              "Cadencia y duración del Sprint",
              "Flujo dentro del Sprint",
              "Métricas del Sprint",
            ],
            modules: [
              {
                id: "ad4dbf19-7a46-46b7-9c85-7d348d5d1b4b",
                title: "Mecánica del Sprint",
                level: 1,
                lessons: [
                  {
                    id: "aa9a3c8a-6dfb-4f48-9e1b-2767d5df8c01",
                    title: "¿Qué es un Sprint?",
                    slug: "que-es-un-sprint",
                    level: 1,
                    content: `![Sprint Scrum](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQ0TSk5LfumgdiYABpIF6Q9xTbsSBrmB-Ug&s)

## 🧠 Saberes Previos
- Conocer los roles de Scrum: Product Owner, Scrum Master y Developers.  
- Entender el concepto de Product Backlog y Product Increment.  
- Saber qué es Time-boxing y priorización por valor.  

---

## 📘 Definición de Sprint
Un **Sprint** es un **período de tiempo fijo y limitado** (generalmente entre **1 y 4 semanas**) durante el cual un **equipo Scrum desarrolla un Incremento funcional del producto** listo para entregar.  

> 💡 *El Sprint es el corazón de Scrum: permite entregar valor de manera frecuente y predecible.*

---

## 🔧 Características Clave del Sprint
| Característica | Descripción |
|----------------|-------------|
| Duración fija | 1 a 4 semanas, el equipo decide según contexto |
| Objetivo claro | Cada Sprint tiene un **Sprint Goal** que guía al equipo |
| Incremento entregable | Al final, se debe tener un producto **funcional y usable** |
| Autonomía del equipo | El equipo decide cómo lograr los objetivos del Sprint |
| Time-boxing | Limita la duración de los eventos dentro del Sprint (Daily, Planning, Review, Retrospective) |

---

## 🎯 Propósitos del Sprint
1. **Entrega de valor continuo:** Cada Sprint genera un incremento que puede ser evaluado o usado.  
2. **Inspección y adaptación:** Permite al equipo recibir feedback temprano y ajustar prioridades.  
3. **Foco y compromiso:** Define un objetivo claro y limita el alcance a lo que se puede cumplir.  
4. **Mejora continua:** Cada Sprint termina con una Retrospectiva para optimizar procesos y resultados.  

---

## 📦 Componentes del Sprint
1. **Sprint Planning:** Planificación de qué se hará y cómo.  
2. **Sprint Backlog:** Lista de tareas seleccionadas del Product Backlog.  
3. **Daily Scrum:** Reunión diaria de sincronización.  
4. **Development Work:** Trabajo de los Developers para cumplir el Sprint Goal.  
5. **Sprint Review:** Presentación del Incremento y retroalimentación.  
6. **Sprint Retrospective:** Reflexión sobre el proceso y mejoras para el siguiente Sprint.

---

## 📌 Ejemplos Prácticos

### 🟦 Ejemplo 1: Desarrollo de una funcionalidad
- Sprint de 2 semanas.  
- Objetivo: Implementar el sistema de autenticación de usuarios.  
- Tareas: Login, registro, recuperación de contraseña, pruebas.  
- Resultado: Incremento funcional listo para probar por el Product Owner.

### 🟩 Ejemplo 2: Mejora de rendimiento
- Sprint de 1 semana.  
- Objetivo: Reducir tiempo de carga de la página principal en 30%.  
- Resultado: Incremento medible y listo para evaluar impacto en métricas.

### 🟧 Ejemplo 3: MVP para prueba de mercado
- Sprint de 3 semanas.  
- Objetivo: Crear un MVP con funcionalidades básicas para testear aceptación.  
- Resultado: Producto mínimo viable entregable y listo para feedback de usuarios.

---

## 🎭 Casuísticas Reales

### 📌 Caso 1: Sprint demasiado largo
- Sprint de 6 semanas.  
- Problema: Difícil de planificar, retrasos y poca retroalimentación.  
- Solución: Reducir a 2-3 semanas para mejorar inspección y adaptación.

### 📌 Caso 2: Sprint sin objetivo claro
- El equipo trabaja en tareas sueltas sin foco.  
- Problema: Incremento no entrega valor real.  
- Solución: Definir un **Sprint Goal** claro y medible antes de iniciar.

### 📌 Caso 3: Cambio de prioridades en medio del Sprint
- Nueva funcionalidad urgente solicitada por el cliente.  
- Problema: Interrumpe el Sprint y afecta el objetivo.  
- Solución: Scrum recomienda **no cambiar el Sprint Backlog**; nuevas prioridades se planifican en el siguiente Sprint.

---

## 🛠️ Recomendaciones para un Sprint efectivo
1. Mantener duración constante y adecuada al equipo.  
2. Definir un **Sprint Goal** claro y alcanzable.  
3. Planificar cuidadosamente el Sprint Backlog durante Sprint Planning.  
4. Respetar la autoorganización del equipo en cómo cumplir las tareas.  
5. Usar Daily Scrum y Retrospectiva para inspección, aprendizaje y adaptación.  

---

## 🚀 Conclusión
Un **Sprint bien definido** permite que Scrum cumpla su propósito: **entregar valor frecuentemente, aprender rápido y mejorar continuamente**.  
Respetar el marco del Sprint asegura que el equipo mantenga foco, disciplina y productividad.

> 🧠 *“Un Sprint no es solo trabajar más rápido, sino enfocarse en entregar valor real, medible y usable al final de cada ciclo.”*
`,
                  },
                  {
                    id: "7f37d8d2-5f51-4c9d-bb6c-ef2f45c27d63",
                    title: "Cadencia y duración",
                    slug: "cadencia-y-duracion",
                    level: 2,
                    content: `
## 🧠 Saberes Previos
- Conocer qué es un Sprint y sus eventos principales.  
- Entender el concepto de time-boxing en Scrum.  
- Tener una noción básica sobre la entrega continua de valor.  

---

# ⏱️ ¿Qué es la Cadencia?

La **cadencia** es el **ritmo constante y predecible** con el que un equipo Scrum trabaja y entrega valor.  
Este ritmo se establece mediante Sprints de duración fija.

> 💬 *“Scrum se basa en ciclos repetitivos que permiten mejorar continuamente. La cadencia convierte estos ciclos en un hábito predecible.”*

---

# 📏 ¿Qué es la Duración?

La **duración** es el **tiempo que dura un Sprint**.  
Según Scrum, un Sprint puede durar **entre 1 y 4 semanas**, pero lo más importante es que la duración sea **consistente**.

---

# 🎯 ¿Por qué la Cadencia es clave?

Mantener un ritmo constante trae múltiples beneficios:

| Beneficio | Descripción |
|----------|-------------|
| **Previsibilidad** | Permite saber cuánta funcionalidad puede entregar el equipo cada ciclo. |
| **Mejora continua** | Facilita evaluar y ajustar procesos Sprint tras Sprint. |
| **Confianza con stakeholders** | Los clientes saben cuándo esperar nuevas versiones del producto. |
| **Velocidad sostenible** | Evita sobrecargas, horas extra y desgaste del equipo. |

---

# 📘 ¿Cómo elegir la duración ideal del Sprint?

### ✔️ Reglas básicas
- Debe permitir entregar un **Incremento usable y funcional**.  
- Debe ser lo suficientemente corta para permitir **feedback rápido**.  
- Debe ser lo suficientemente larga para **completar trabajo significativo**.  

### 🔍 Guía según tipo de proyecto

| Tipo de proyecto | Recomendación |
|------------------|---------------|
| Productos digitales con cambios frecuentes | **1 o 2 semanas** |
| Sistemas corporativos más estables | **2 o 3 semanas** |
| Equipos nuevos o inmaduros | **3 semanas** para adaptarse |
| Investigación e innovación | **1 semana** para ciclos rápidos de aprendizaje |

---

# 🧩 Ejemplo visual de Cadencia

Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → ... (2 semanas cada uno)

Este ritmo constante permite medir velocidad, progreso, satisfacción y calidad sin fluctuaciones.

---

# 🟦 Ejemplos Prácticos

### 🟦 Caso 1: Equipo de ecommerce
- Duración: **2 semanas**.  
- Razón: Muchas actualizaciones pequeñas, cambios rápidos.  
- Resultado: Excelente sincronización con marketing y UX.

### 🟩 Caso 2: Proyecto bancario
- Duración: **3 semanas**.  
- Razón: Más análisis, pruebas más estrictas.  
- Resultado: Entregas estables y menor presión.

### 🟧 Caso 3: Startup que itera rápido
- Duración: **1 semana**.  
- Razón: Necesidad de validar hipótesis y hacer experimentos.  
- Resultado: Aprendizaje acelerado, cambios constantes.

---

# 🛑 Errores comunes

### ❌ 1. Cambiar la duración del Sprint según “lo que convenga”
- Esto destruye la cadencia y hace impredecible al equipo.

### ❌ 2. Extender el Sprint “porque no se llegó”
- El problema no es el Sprint, sino la planificación.

### ❌ 3. Sprint demasiado largo
- Se pierde foco.  
- Menos feedback.  
- Más riesgo.

### ❌ 4. Sprint demasiado corto sin justificación
- Riesgo de “microtareas” y estrés del equipo.  
- Incluso la ceremonia consume demasiado tiempo en relación al trabajo.

---

# 📈 Buenas prácticas para mantener una Cadencia saludable

1. **Duración fija, pase lo que pase.**  
2. **Planificación realista**, basada en la velocidad pasada.  
3. Mantener un **ritmo sostenible** (no sobrecargar al equipo).  
4. Evaluar periódicamente si la duración sigue siendo adecuada.  
5. Usar métricas como **Velocity**, **Lead Time**, **Predictibilidad**.

---

# 🧠 Conclusión

La **cadencia y duración** hacen que Scrum sea confiable, medible y sostenible.  
Un Sprint con duración fija permite entregar valor de forma constante y mejorar continuamente mediante ciclos de inspección y adaptación.

> *“Sin cadencia no hay ritmo, sin ritmo no hay mejora, sin mejora no hay Scrum.”*
`,
                  },
                  {
                    id: "c3f21a84-19bb-45fd-9ea3-0e68f34a58af",
                    title: "Flujo dentro del Sprint",
                    slug: "flujo-dentro-del-sprint",
                    level: 3,
                    content: `
## 🧠 Saberes Previos
- Conocer qué es un Sprint.  
- Entender roles: Product Owner, Scrum Master y Developers.  
- Manejar conceptos básicos como Sprint Backlog, Incremento y Cadencia.  
- Saber qué es Time-boxing.  

---

# 📌 ¿Qué es el flujo dentro del Sprint?

El **flujo dentro del Sprint** es la **secuencia natural de actividades, decisiones, eventos y trabajo** que ocurre desde que inicia un Sprint hasta que concluye.  
No es solo “trabajar tareas”, sino **organizar, inspeccionar, coordinar, construir, revisar y mejorar** de forma continua.

> 💡 *El flujo garantiza que el equipo avance de manera ordenada, predecible y alineada con el Sprint Goal.*

---

# 🧭 Mapa General del Flujo del Sprint

Sprint Planning → Trabajo diario → Daily Scrum → Refinamiento continuo → Desarrollo del Incremento → Sprint Review → Sprint Retrospective

Todo ocurre dentro del **marco fijo** del Sprint.

---

# 🟦 1. Sprint Planning (Inicio del Sprint)

### Objetivos clave:
- Definir **qué** se hará (selección del Product Backlog).  
- Decidir **cómo** se hará (plan técnico y estrategia).  
- Establecer el **Sprint Goal**, el corazón del Sprint.

### Resultados:
- Sprint Backlog creado.  
- Objetivo compartido y claro.  

---

# 🟩 2. Trabajo Diario Autogestionado

Los Developers **deciden cómo avanzar** para cumplir el Sprint Goal.  
Incluye análisis, desarrollo, pruebas, diseño, documentación y cualquier actividad necesaria.

### Características:
- Trabajo en equipo, no tareas aisladas.  
- Priorización continua.  
- Visibilidad clara mediante tableros (To Do → Doing → Done).  
- Minimizar bloqueos y dependencias.

---

# 🟧 3. Daily Scrum (Ritmo y Sincronización)

Reunión diaria de **máximo 15 minutos**.

### Propósitos:
- Sincronizar actividades.  
- Detectar impedimentos.  
- Actualizar el plan del Sprint.  
- Ajustar la estrategia del día.

> El Daily no es un reporte al Scrum Master, es un espacio **del equipo para el equipo**.

---

# 🟨 4. Refinamiento Continuo del Backlog

Aunque no es un evento oficial, es una actividad **constante** dentro del Sprint.

### ¿Qué ocurre aquí?
- Se aclaran requisitos.  
- Se dividen historias grandes.  
- Se ajustan prioridades.  
- Se estiman elementos futuros.

Mantiene el backlog **sano, claro y listo** para el siguiente Sprint Planning.

---

# 🟪 5. Construcción del Incremento

Es el núcleo del flujo: producir un incremento **funcional, integrado y con calidad**.

### Elementos esenciales:
- Cumplir Definition of Done.  
- Pruebas continuas (QA no se deja para el final).  
- Integración continua (evitar "montañas de código").  
- Entregas pequeñas y frecuentes.  

> 💬 *Un incremento no es “trabajo en progreso”: es algo usable, real y potencialmente liberable.*

---

# 🟫 6. Sprint Review (Inspección del producto)

Se muestra lo creado a los stakeholders para recibir **feedback directo**.

### Aquí se evalúa:
- ¿Se cumplió el Sprint Goal?  
- ¿El Incremento es funcional y usable?  
- ¿Qué ajustes debe hacer el Product Owner al Product Backlog?  
- ¿Qué nuevas oportunidades aparecen?

Es el momento donde el producto **habla por sí mismo**.

---

# 🟩 7. Sprint Retrospective (Inspección del proceso)

Último evento del Sprint.

### Objetivos:
- Identificar qué funcionó bien.  
- Detectar problemas y oportunidades.  
- Crear acciones de mejora para el siguiente Sprint.  

> Si no hay mejora en cada Sprint, no estás haciendo Scrum: estás “solo entregando tareas”.

---

# 🧱 Representación Visual del Flujo Ideal

PLANIFICAR → EJECUTAR → INSPECCIONAR → ADAPTAR
| | | |
Sprint Planning → Daily → Review → Retrospective

Ciclo continuo, no lineal.

---

# 🧩 Ejemplo Real de Flujo

### Producto: App de Delivery  
Sprint: 2 semanas  
Sprint Goal: “Permitir que los usuarios vean el estado de su pedido en tiempo real.”

**Semana 1:**  
- Developers dividen tareas.  
- Daily detecta bloqueo en API → Scrum Master elimina impedimento.  
- Refinamiento aclara nuevas dependencias con mapas de tracking.

**Semana 2:**  
- QA prueba en staging.  
- Se integra notificaciones push.  
- Sprint Review recibe feedback del cliente: mejorar colores del tracking.  
- Retrospectiva detecta que la comunicación con UX fue tardía → acción de mejora: involucrarlos desde el día 1.

---

# ❌ Errores comunes en el flujo del Sprint

1. **Hacer el trabajo al revés**: pruebas al final.  
2. **Daily como reporte al jefe**.  
3. **No cumplir DoD y dejar “casi terminado”**.  
4. **Cambios constantes del Sprint Backlog** sin control.  
5. **Sprint sin objetivo** → se vuelve un “sprint de tareas”.

---

# 🧠 Conclusión

El **flujo dentro del Sprint** es la estructura que permite al equipo entregar valor, inspeccionar avances y mejorar continuamente.  
Un flujo saludable significa un equipo predecible, enfocado y alineado.  
Un flujo caótico genera productos incompletos, estrés y baja calidad.

> *“El Sprint es un ciclo; el flujo es lo que hace que ese ciclo produzca valor.”*
`,
                  },
                  {
                    id: "f1b7c21e-7e1a-4c28-97f8-83f3c3bdf39f",
                    title: "Métricas del Sprint",
                    slug: "metricas-del-sprint",
                    level: 4,
                    content: `
## 🧠 Saberes Previos
- Conocer qué es un Sprint y su flujo interno.  
- Entender conceptos como Product Backlog, Incremento y Sprint Goal.  
- Conocer la importancia de la inspección y la adaptación.  

---

# 📌 ¿Qué son las métricas del Sprint?

Las **métricas del Sprint** son indicadores que permiten **medir, evaluar y mejorar** el rendimiento del equipo y la entrega de valor durante un Sprint.  
Sirven para **tomar decisiones basadas en datos**, identificar problemas y fomentar la mejora continua.

> 💡 *Scrum no busca controlar personas, sino mejorar procesos y resultados.*

---

# 🟦 Métricas principales

| Métrica | Descripción | Beneficio |
|---------|------------|-----------|
| **Velocity** | Total de puntos de historia completados en un Sprint | Planificación más precisa y medición de capacidad del equipo |
| **Burn-down Chart** | Gráfico que muestra trabajo pendiente vs tiempo | Visualiza progreso y posibles retrasos |
| **Burn-up Chart** | Gráfico que muestra trabajo completado vs total | Permite ver avance hacia la meta y cambios en alcance |
| **Cumulative Flow Diagram (CFD)** | Visualiza el flujo de trabajo (To Do, Doing, Done) | Detecta cuellos de botella y mejora la gestión del flujo |
| **Lead Time / Cycle Time** | Tiempo desde que una tarea entra al backlog hasta completarse | Evalúa eficiencia y rapidez de entrega |
| **Defect Density** | Número de defectos por incremento entregado | Control de calidad del producto |
| **Sprint Goal Success Rate** | Porcentaje de objetivos del Sprint cumplidos | Mide alineación con el Sprint Goal |

---

# 🟩 Ejemplos prácticos

### 1. Velocity
- Sprint Goal: Implementar módulo de autenticación  
- Historias completadas: 8 puntos  
- Velocity del Sprint: **8 puntos**  
- Útil para predecir capacidad en el siguiente Sprint.

### 2. Burn-down Chart
Días 1-10: 50 → 0 puntos pendientes
- Permite ver si el equipo va a cumplir el Sprint Goal a tiempo.  
- Detecta desviaciones y permite ajustes tempranos.

### 3. Cumulative Flow Diagram
- Columnas: To Do, In Progress, Done  
- Observación: “In Progress” crece demasiado → indica cuello de botella en desarrollo.  

---

# 🟨 Casuísticas reales

### 📌 Caso 1: Velocity inestable
- Sprint 1: 12 puntos, Sprint 2: 5 puntos, Sprint 3: 10 puntos  
- Aprendizaje: Necesidad de mejorar estimaciones y claridad de historias.

### 📌 Caso 2: Burn-down no descendente
- Trabajo pendiente no baja → bloqueos o impedimentos  
- Acción: Scrum Master interviene para eliminar impedimentos.

### 📌 Caso 3: Defectos altos
- Incremento entregado con muchos bugs  
- Aprendizaje: Revisar Definition of Done, aumentar pruebas y code reviews.

---

# 🟪 Buenas prácticas

1. Medir siempre **lo que aporta valor**, no solo actividad.  
2. Mantener gráficos y métricas **visibles y transparentes** para todo el equipo.  
3. Usar métricas como **herramienta de mejora**, no de presión.  
4. Revisar métricas en **Daily Scrum, Sprint Review y Retrospective**.  
5. Ajustar planificación y proceso según lo que las métricas muestran.

---

# 🛠️ Herramientas comunes
- Jira, Trello, Azure DevOps  
- Excel o Google Sheets con Burn-down/Burn-up Charts  
- Herramientas de CI/CD que integran métricas automáticamente  

---

# 🧠 Conclusión

Las **métricas del Sprint** permiten a los equipos Scrum **inspeccionar, aprender y mejorar** de manera continua.  
Cuando se usan correctamente, ayudan a:  
- Predecir la capacidad de entrega.  
- Detectar problemas tempranos.  
- Incrementar la eficiencia y calidad del producto.  
- Alinear al equipo con el Sprint Goal.

> *“Métricas sin acción son solo números. El valor real está en usar los datos para mejorar cada Sprint.”*
`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "3c1bdf0c-45e0-4b64-9d0c-b62f0f14b7a9",
        name: "Roles en Scrum",
        level: 4,
        topics: [
          {
            id: "4f94b0f1-11b1-4b59-9b92-d3e2b9c0e11a",
            title: "Product Owner",
            subtitle: "",
            slug: "product-owner",
            description:
              "Comprende el rol del Product Owner y sus responsabilidades en Scrum.",
            content: "",
            icon: "user",
            level: 1,
            features: [
              "Visión del producto",
              "Gestión del backlog",
              "Valor entregado",
              "Priorización efectiva",
            ],
            modules: [
              {
                id: "6f834a31-7ddb-4f19-a2be-60945e646606",
                title: "Rol de Product Owner (PO)",
                level: 1,
                lessons: [
                  {
                    id: "a22cba69-3abf-4d65-8aee-07e57b1a89b1",
                    title: "Responsabilidades del PO",
                    slug: "responsabilidades-po",
                    level: 1,
                    content: `
# 👑 Product Owner en Scrum

## 🧠 Saberes Previos
- Conocer qué es Scrum y sus roles principales.  
- Entender qué es un **Product Backlog** y un **Incremento**.  
- Tener noción de valor entregado y priorización de funcionalidades.  

---

# 📘 ¿Qué es un Product Owner?

El **Product Owner (PO)** es el **responsable de maximizar el valor del producto** que desarrolla el equipo Scrum.  
Es la **voz del cliente o usuario final** dentro del equipo y la organización, asegurando que se construya lo que realmente aporta valor.

> 💡 *El Product Owner no “manda” al equipo, sino que **define el qué y por qué**, mientras el equipo decide el cómo.*

---

# 🔑 Responsabilidades principales del Product Owner

| Responsabilidad | Descripción | Ejemplo / Casuística |
|-----------------|------------|---------------------|
| **Visión del producto** | Define y comunica la visión del producto y los objetivos estratégicos. | Caso: PO define que la app de ecommerce debe reducir el abandono del carrito en un 20%. |
| **Gestión del Product Backlog** | Mantenerlo claro, priorizado y actualizado. | Caso: PO descompone historias grandes en tareas más pequeñas y comprensibles. |
| **Priorización efectiva** | Decide qué funcionalidades tienen mayor valor y deben hacerse primero. | Caso: PO usa **MoSCoW** para priorizar funcionalidades críticas sobre “agradables de tener”. |
| **Valor entregado** | Evalúa si los Incrementos entregados cumplen el objetivo y generan valor real. | Caso: Después de un Sprint, el PO revisa métricas de adopción del nuevo módulo. |
| **Stakeholder management** | Mantener informados y alineados a clientes y directivos. | Caso: PO organiza reuniones de demo con stakeholders para recibir feedback temprano. |
| **Definición de requisitos claros** | Traducir necesidades de negocio en historias de usuario comprensibles para el equipo. | Caso: PO escribe historias con criterios de aceptación claros y testables. |

---

# 🧩 Habilidades clave del Product Owner

1. **Comunicación efectiva:** Para transmitir la visión y objetivos a todo el equipo y stakeholders.  
2. **Negociación y priorización:** Saber balancear necesidades de negocio y capacidad del equipo.  
3. **Conocimiento del mercado y usuario:** Entender qué funcionalidades aportan valor real.  
4. **Análisis y toma de decisiones:** Evaluar trade-offs y riesgos de las funcionalidades.  
5. **Empatía con el equipo:** Comprender capacidades y limitaciones de los Developers.  

---

# 📦 Herramientas y técnicas útiles

- **Técnicas de priorización:** MoSCoW, WSJF simple, Value vs Effort.  
- **Gestión de backlog:** Jira, Trello, Azure DevOps, ClickUp.  
- **Definición de métricas de valor:** KPIs, OKRs, métricas de adopción.  
- **Roadmaps de producto:** Mapas visuales de objetivos y entregables a mediano plazo.  

---

# 🟦 Ejemplos prácticos

### Caso 1: Priorizar funcionalidades
- Problema: El backlog tiene 50 historias de usuario.  
- Acción: PO aplica MoSCoW → identifica 10 críticas, 20 importantes, 20 opcionales.  
- Resultado: El equipo se enfoca en lo que aporta mayor valor primero.

### Caso 2: Feedback con stakeholders
- Problema: Los usuarios reportan confusión en un flujo de la app.  
- Acción: PO organiza demo y recoge feedback directo.  
- Resultado: Ajustes en la próxima iteración para mejorar experiencia.

### Caso 3: Incremento no aporta valor
- Problema: El equipo entrega un módulo completo, pero los usuarios no lo usan.  
- Acción: PO analiza métricas y decide pivotar prioridades.  
- Resultado: Redefinición de historias y enfoque en funcionalidades de alto impacto.

---

# ❌ Errores comunes del Product Owner

1. No mantener el backlog actualizado → caos en la planificación.  
2. Priorizar según preferencias personales, no valor real.  
3. No involucrar al equipo en decisiones → disminuye compromiso.  
4. Cambiar objetivos a mitad de Sprint → rompe el enfoque del equipo.  
5. Falta de comunicación con stakeholders → expectativas desalineadas.

---

# 🛠️ Buenas prácticas

- Definir claramente el **Product Vision** y compartirlo con todos.  
- Mantener el **Product Backlog limpio y priorizado**.  
- Revisar valor entregado al final de cada Sprint.  
- Participar activamente en **Sprint Review y Refinement**.  
- Facilitar la comunicación entre stakeholders y equipo.  

---

# 🧠 Conclusión

El Product Owner es el **puente entre negocio, usuario y equipo Scrum**.  
Su efectividad determina si el producto entrega **valor real, medible y alineado con objetivos estratégicos**.  
Un PO exitoso combina **visión estratégica, comunicación efectiva y capacidad de priorización**, asegurando que el equipo trabaje en lo correcto, de la manera correcta.

> *“El Product Owner no construye el producto, asegura que lo que se construye sea lo correcto.”*  
`,
                  },
                ],
              },
            ],
          },
          {
            id: "5f2eeb9f-6dc0-4b77-8c1f-68e1e8a728b5",
            title: "Scrum Master",
            subtitle: "",
            slug: "scrum-master",
            description:
              "Explora el rol del Scrum Master y su aporte al equipo y la organización.",
            content: "",
            icon: "users",
            level: 1,
            features: [
              "Facilitación de eventos",
              "Eliminación de impedimentos",
              "Mejora continua",
              "Coaching ágil",
            ],
            modules: [
              {
                id: "7a4394e3-3e84-4aa4-9f9b-fd6f19db239e",
                title: "Rol de Scrum Master (SM)",
                level: 1,
                lessons: [
                  {
                    id: "b33d23c0-84b9-4b7c-8c7c-7e7a8c4fdd02",
                    title: "Servicio al equipo y a la organización",
                    slug: "servicio-equipo-organizacion",
                    level: 1,
                    content: `![Scrum Master](https://t2informatik.de/en/wp-content/uploads/sites/2/2023/01/scrum-master.png)

# 🧑‍🏫 Scrum Master en Scrum

## 🧠 Saberes Previos
- Conocer los roles dentro de Scrum: Product Owner y Development Team.  
- Entender eventos de Scrum: Sprint, Daily, Review y Retrospective.  
- Conocer el concepto de **Time-boxing**, Incremento y Backlogs.  

---

# 📘 ¿Qué es un Scrum Master?

El **Scrum Master (SM)** es el **facilitador y coach del equipo Scrum**, responsable de asegurar que se sigan los principios ágiles y las prácticas de Scrum.  
No es un jefe ni manager; su rol es **servir al equipo y a la organización**, eliminando impedimentos y promoviendo la mejora continua.

> 💡 *El Scrum Master protege al equipo de distracciones y ayuda a que todos trabajen de manera efectiva dentro del marco de Scrum.*

---

# 🔑 Responsabilidades principales

| Responsabilidad | Descripción | Ejemplo / Casuística |
|-----------------|------------|---------------------|
| **Facilitación de eventos** | Coordina Sprint Planning, Daily Scrum, Sprint Review y Retrospective | SM asegura que los Daily Scrum duren máximo 15 minutos y sean productivos |
| **Eliminación de impedimentos** | Identifica obstáculos que bloquean al equipo y ayuda a resolverlos | Caso: bloqueo por falta de acceso a servidores, SM gestiona permisos rápidamente |
| **Coaching ágil** | Enseña y refuerza la filosofía Scrum y principios ágiles | SM entrena al equipo en estimaciones ágiles y priorización de tareas |
| **Mejora continua** | Fomenta la inspección y adaptación en procesos y prácticas | Caso: Retrospective identifica problemas de comunicación, SM propone soluciones y seguimiento |
| **Protección del equipo** | Evita interrupciones externas que afecten al equipo | Caso: SM negocia con stakeholders para evitar cambios de alcance a mitad de Sprint |
| **Conexión con la organización** | Ayuda a que Scrum se entienda y adopte fuera del equipo | SM organiza workshops con otras áreas para promover cultura ágil |

---

# 🟦 Servicio al equipo y a la organización

## 👥 Servicio al equipo

El Scrum Master trabaja **para el equipo**, asegurando que tenga las condiciones ideales para entregar valor:

- Facilita eventos y ceremonias.  
- Ayuda al equipo a autoorganizarse.  
- Protege el Sprint Goal frente a interrupciones.  
- Identifica bloqueos y gestiona su eliminación.  
- Promueve buenas prácticas y estándares de calidad.  

### Casuísticas

1. El equipo no puede terminar historias → SM ayuda a replanificar y eliminar impedimentos.  
2. Conflictos internos → SM facilita comunicación y resolución de conflictos.  

## 🏢 Servicio a la organización

El SM también tiene un rol **más amplio**, ayudando a que toda la organización entienda y adopte Scrum:

- Promueve la cultura ágil más allá del equipo.  
- Capacita a stakeholders sobre roles y procesos de Scrum.  
- Coordina con otros equipos para alinear dependencias.  
- Facilita la eliminación de impedimentos organizacionales.  

### Casuísticas

1. Dirección solicita cambios urgentes → SM negocia prioridades y explica impacto al equipo y stakeholders.  
2. Otras áreas no comprenden los ciclos de Scrum → SM organiza workshops y comparte métricas para alinearlos.  

---

# 🟩 Habilidades clave del Scrum Master

- **Comunicación efectiva:** Explica procesos y facilita acuerdos.  
- **Empatía y liderazgo servicial:** Entiende necesidades del equipo y stakeholders.  
- **Resolución de conflictos:** Media discusiones y mantiene enfoque en objetivos.  
- **Coaching y mentoring:** Enseña Scrum y guía mejoras continuas.  
- **Visión sistémica:** Ve cómo las acciones del equipo impactan la organización.  

---

# 🟧 Buenas prácticas

1. Mantener los eventos **time-boxed y productivos**.  
2. Priorizar **eliminar impedimentos** antes que cualquier otra tarea administrativa.  
3. Fomentar **autoorganización**, no imponer decisiones.  
4. Revisar continuamente **procesos y resultados** para mejorar iterativamente.  
5. Promover **transparencia y comunicación** con todos los stakeholders.  

---

# 🟨 Ejemplos prácticos

### Caso 1: Impedimento técnico
- Problema: El equipo no puede desplegar en staging por permisos.  
- Acción: SM gestiona acceso con IT.  
- Resultado: Sprint sigue sin retrasos y el equipo mantiene su foco.

### Caso 2: Cambio constante de prioridades
- Problema: Stakeholders piden cambios frecuentes.  
- Acción: SM educa sobre impacto y protege Sprint Goal.  
- Resultado: Menos interrupciones, más productividad y entregables de calidad.

### Caso 3: Retrospective no aporta mejoras
- Problema: Reuniones repetitivas sin acciones.  
- Acción: SM propone dinámicas de análisis de problemas y seguimiento de acciones.  
- Resultado: Mejora continua real y tangible Sprint tras Sprint.

---

# ❌ Errores comunes del Scrum Master

1. Actuar como jefe o manager del equipo.  
2. Ignorar conflictos internos o impedimentos.  
3. No educar stakeholders sobre Scrum.  
4. Facilitar eventos sin propósito o productividad.  
5. Medir al equipo solo por velocidad y no por valor entregado.

---

# 🧠 Conclusión

El Scrum Master es el **guía, facilitador y protector del equipo**, y al mismo tiempo **agente de cambio dentro de la organización**.  
Su aporte asegura que Scrum funcione correctamente, maximizando el valor entregado, fomentando la autoorganización y generando una cultura de mejora continua.

> *“El Scrum Master no gestiona al equipo, gestiona el marco de trabajo y ayuda al equipo a dar lo mejor de sí.”*
`,
                  },
                ],
              },
            ],
          },
          {
            id: "6f3aeb9f-7ec0-4b77-8c1f-68e1e8a728c6",
            title: "Developers",
            subtitle: "",
            slug: "developers",
            description:
              "Descubre el rol de los Developers y su responsabilidad en la entrega de incrementos de calidad.",
            content: "",
            icon: "code",
            level: 1,
            features: [
              "Incrementos de calidad",
              "Trabajo colaborativo",
              "Autoorganización",
              "Responsabilidad compartida",
            ],
            modules: [
              {
                id: "8b834a31-7ddb-4f19-a2be-60945e646607",
                title: "Rol de Developers",
                level: 1,
                lessons: [
                  {
                    id: "c44cba69-3abf-4d65-8aee-07e57b1a89c2",
                    title: "Entrega de incrementos de calidad",
                    slug: "entrega-incrementos-calidad",
                    level: 1,
                    content: `![Developers](https://easyretro.io/blog/assets/images/scrum-devteams-1.png)

# 💻 Developers en Scrum

## 🧠 Saberes Previos
- Conocer qué es Scrum y sus roles principales: Product Owner, Scrum Master y Developers.  
- Entender qué es un Sprint, Incremento y Product Backlog.  
- Conceptos de **autoorganización** y **colaboración en equipo**.  

---

# 📘 ¿Quiénes son los Developers?

Los **Developers** (equipo de desarrollo) son el grupo de personas **responsables de construir el producto**, asegurando que cada **Incremento entregado sea de alta calidad**.  

- **Multidisciplinarios:** Pueden incluir programadores, testers, diseñadores, analistas, etc.  
- **Autoorganizados:** Deciden cómo realizar el trabajo sin recibir órdenes directas.  
- **Responsabilidad compartida:** Todos son responsables del éxito del Sprint y la calidad del producto.

> 💡 *En Scrum no existen “subroles” dentro del equipo de Developers; todos colaboran para entregar valor.*

---

# 🔑 Responsabilidades principales

| Responsabilidad | Descripción | Ejemplo / Casuística |
|-----------------|------------|---------------------|
| **Entrega de Incrementos de calidad** | Construir funcionalidades completas que cumplen criterios de aceptación y Definition of Done (DoD) | Caso: El equipo entrega un módulo de pagos totalmente funcional y probado al final del Sprint |
| **Trabajo colaborativo** | Cooperar con otros Developers para cumplir el Sprint Goal | Caso: Diseñador y programador trabajan juntos para implementar un flujo de usuario fluido |
| **Autoorganización** | Decidir internamente cómo abordar las tareas y dividir el trabajo | Caso: El equipo se divide tareas según habilidades y capacidades sin intervención externa |
| **Participación en eventos de Scrum** | Asistir a Daily Scrum, Sprint Planning, Review y Retrospective activamente | Caso: En la Retrospective, el equipo identifica un cuello de botella en pruebas y propone soluciones |
| **Garantizar calidad** | Realizar pruebas, code reviews y asegurar cumplimiento de estándares | Caso: Cada historia pasa por pruebas unitarias y revisión de código antes de marcarla como “Done” |
| **Colaboración con Product Owner y Scrum Master** | Comunicar impedimentos, clarificar requisitos y recibir feedback | Caso: Reportan bloqueos técnicos al Scrum Master y clarifican historias con el PO |

---

# 🟦 Habilidades clave de Developers

- **Multidisciplinariedad:** Conocimiento técnico variado y capacidad de asumir distintas tareas.  
- **Colaboración y comunicación:** Compartir información y apoyar a otros miembros del equipo.  
- **Autoorganización:** Planificar, priorizar y ejecutar tareas de forma autónoma.  
- **Calidad y responsabilidad:** Compromiso con estándares de entrega y Definition of Done.  
- **Adaptabilidad:** Capacidad de ajustarse a cambios y nuevas prioridades durante el Sprint.

---

# 🟩 Buenas prácticas

1. **Dividir el trabajo de manera clara** en tareas pequeñas y manejables.  
2. **Revisar la Definition of Done** antes de marcar historias como completas.  
3. **Participar activamente** en eventos Scrum y aportar ideas de mejora.  
4. **Colaborar estrechamente** con PO y SM para eliminar impedimentos rápidamente.  
5. **Fomentar revisiones de calidad**, como code reviews, pruebas y pair programming.  

---

# 🟨 Ejemplos prácticos y casuísticas

### Caso 1: Incremento incompleto
- Problema: Al final del Sprint, una historia de usuario no cumple los criterios de aceptación.  
- Acción: Developers trabajan juntos para completar la historia y cumplir la DoD.  
- Resultado: Incremento entregado cumple expectativas y se mantiene la calidad.

### Caso 2: Bloqueo técnico
- Problema: El equipo no puede continuar debido a un error en infraestructura.  
- Acción: Comunican al Scrum Master y trabajan en soluciones alternativas.  
- Resultado: Bloqueo resuelto sin retrasar todo el Sprint.

### Caso 3: Colaboración efectiva
- Problema: Dos tareas dependen de diferentes miembros del equipo.  
- Acción: Se coordina pair programming y sesiones de revisión cruzada.  
- Resultado: Entregan el Incremento de manera eficiente y con menos errores.

---

# ❌ Errores comunes de Developers

1. Trabajar de forma aislada sin comunicar avances ni problemas.  
2. No seguir la Definition of Done y comprometer la calidad.  
3. No participar en eventos Scrum, perdiendo alineación del equipo.  
4. Depender de decisiones externas para organizar su trabajo.  
5. Entregar Incrementos incompletos o sin pruebas.

---

# 🧠 Conclusión

Los Developers son el **corazón de Scrum**, responsables de transformar el trabajo planificado en **Incrementos de producto de alta calidad**.  
Su **autoorganización, colaboración y responsabilidad compartida** aseguran que cada Sprint entregue valor real al cliente, fomentando la mejora continua y la eficiencia del equipo.

> *“En Scrum, los Developers no siguen órdenes, crean valor juntos de manera autoorganizada y comprometida.”*  
`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "4c1bdf0c-55e0-4b64-9d0c-b62f0f14b7b0",
        name: "Eventos",
        level: 5,
        topics: [
          {
            id: "7f94b0f1-21b1-4b59-9b92-d3e2b9c0e21a",
            title: "Sprint Planning",
            subtitle: "",
            slug: "sprint-planning",
            description:
              "Evento de Scrum enfocado en planificar el trabajo del Sprint.",
            content: "",
            icon: "calendar",
            level: 1,
            features: [
              "Definir Sprint Goal",
              "Plan de trabajo",
              "Propósito claro",
              "Evitar anti-patrones",
            ],
            modules: [
              {
                id: "9f834a31-7ddb-4f19-a2be-60945e646608",
                title: "Planificar con propósito",
                level: 1,
                lessons: [
                  {
                    id: "d11cba69-3abf-4d65-8aee-07e57b1a89d3",
                    title: "Propósito, entradas y salidas",
                    slug: "proposito-entradas-salidas",
                    level: 1,
                    content: `![Sprint Planning](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs6X54VFqeQ-V0zNQ-qoM5sC1LxauNfcoqFA&s)

## 🧠 Saberes Previos
- Conocer qué es un **Sprint** y sus objetivos.  
- Comprender los roles en Scrum: Product Owner, Scrum Master y Developers.  
- Conocer qué es un **Product Backlog** y un **Incremento**.

---

# 🎯 Propósito del Sprint Planning

El **Sprint Planning** es el evento de Scrum en el que el equipo define **qué trabajo realizará durante el Sprint** y **cómo lo logrará**.  
Su propósito principal es:

1. Definir un **Sprint Goal** claro y alcanzable.  
2. Seleccionar los **Product Backlog Items** que se incluirán en el Sprint.  
3. Crear un **plan de trabajo** detallado para alcanzar el Sprint Goal.  

> 💡 *El Sprint Planning asegura que todos los miembros del equipo estén alineados y comprendan el objetivo del Sprint.*

---

# 🔹 Entradas del Sprint Planning

Antes de iniciar la planificación, se necesitan algunas entradas clave:

| Entrada | Descripción | Ejemplo |
|---------|------------|---------|
| **Product Backlog** | Lista priorizada de funcionalidades, historias de usuario y tareas pendientes | PO presenta historias de usuario priorizadas para la nueva funcionalidad de la app |
| **Incremento previo** | Producto entregado hasta el Sprint anterior | El módulo de autenticación ya completo y probado |
| **Capacidad del equipo** | Disponibilidad y horas de trabajo del equipo durante el Sprint | 5 Developers disponibles, vacaciones y otras ausencias consideradas |
| **Progreso de métricas y feedback** | Información de Sprints previos, métricas y retroalimentación del cliente | Datos de adopción de funcionalidades anteriores y retroalimentación de usuarios |

---

# 🔹 Salidas del Sprint Planning

Al finalizar el evento, el equipo debe tener claras las siguientes salidas:

| Salida | Descripción | Ejemplo |
|--------|------------|---------|
| **Sprint Goal** | Objetivo del Sprint que guía el trabajo | “Reducir el tiempo de carga de la página principal en un 30%” |
| **Sprint Backlog** | Conjunto de tareas e historias seleccionadas para el Sprint | Historias de usuario, tareas técnicas y subtareas listas para comenzar |
| **Plan de trabajo inicial** | Estrategia de cómo alcanzar el Sprint Goal | Asignación inicial de tareas, dependencias y estimaciones de esfuerzo |

---

# 🟦 Roles en Sprint Planning

| Rol | Participación |
|-----|---------------|
| **Product Owner** | Presenta el Product Backlog, prioriza historias y clarifica dudas |
| **Scrum Master** | Facilita la reunión, asegura time-boxing y previene anti-patrones |
| **Developers** | Seleccionan historias, estiman esfuerzo, crean plan de trabajo y acuerdan cómo cumplir el Sprint Goal |

---

# 🟩 Buenas prácticas

1. **Preparación previa:** PO debe tener el backlog refinado y priorizado antes del Sprint Planning.  
2. **Time-boxing:** Limitar la reunión según la duración del Sprint (máximo 8 horas para Sprint de 1 mes, proporcionalmente menos para Sprints más cortos).  
3. **Enfoque en valor:** Seleccionar ítems que aporten mayor valor al cliente.  
4. **Colaboración activa:** Todos los miembros participan, discuten y acuerdan tareas.  
5. **Claridad en objetivos:** Asegurarse de que el Sprint Goal sea comprensible y medible.  

---

# 🟨 Ejemplos prácticos y casuísticas

### Caso 1: Product Backlog desordenado
- Problema: Historias poco definidas y sin priorización clara.  
- Acción: PO y equipo refinan historias antes de seleccionar para el Sprint.  
- Resultado: Sprint Planning eficiente y sin confusiones.

### Caso 2: Capacidad del equipo mal estimada
- Problema: Se seleccionan demasiadas historias y no se completan.  
- Acción: SM y Developers revisan disponibilidad y ajustan el Sprint Backlog.  
- Resultado: Sprint realista y alcanzable.

### Caso 3: Sprint Goal poco claro
- Problema: Equipo no entiende el objetivo del Sprint.  
- Acción: PO explica impacto y criterios de éxito, el equipo participa en su definición.  
- Resultado: Sprint Goal claro y motivador, mejor foco y coordinación.

---

# ❌ Anti-patrones a evitar

- Seleccionar demasiadas historias que no se pueden completar.  
- Reunión demasiado larga sin enfoque.  
- PO ausente o sin claridad en prioridades.  
- Developers pasivos que no contribuyen a la planificación.  
- Sprint Goal genérico o incomprensible.

---

# 🧠 Conclusión

El **Sprint Planning** es el **punto de partida de cada Sprint**, donde se define qué se hará, cómo se hará y cuál será su propósito.  
Un Sprint Planning bien ejecutado **incrementa la alineación, la productividad y la probabilidad de entregar valor real al cliente**.

> *“Planificar el Sprint no es solo decidir tareas, es acordar un objetivo común que guíe al equipo hacia el éxito.”*
`,
                  },
                  {
                    id: "d12cba69-3abf-4d65-8aee-07e57b1a89d4",
                    title: "Definir Sprint Goal",
                    slug: "definir-sprint-goal",
                    level: 1,
                    content: `![Sprint Goal](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfG2MEQvDy6mDsfRjwIXp5ZXhB59_1URgUAg&s)

## 🧠 Saberes Previos
- Conocer el propósito del **Sprint Planning**.  
- Entender qué es un **Incremento** y cómo se entrega valor.  
- Familiaridad con el **Product Backlog** y prioridades definidas por el Product Owner.  

---

# 📘 ¿Qué es el Sprint Goal?

El **Sprint Goal** es un **objetivo concreto, claro y alcanzable** que guía al equipo durante el Sprint.  
Sirve como **faro de enfoque** y **referencia para tomar decisiones** durante el desarrollo.

> 💡 *El Sprint Goal no describe tareas individuales, sino el resultado que se espera lograr en conjunto.*

---

# 🔹 Propósito del Sprint Goal

1. **Enfocar al equipo:** Evita dispersión y prioriza lo que genera más valor.  
2. **Guiar decisiones:** Durante el Sprint, el equipo puede evaluar si nuevas solicitudes o cambios se alinean con el objetivo.  
3. **Medir éxito:** Proporciona un criterio claro para determinar si el Sprint fue exitoso.  

---

# 🔹 Cómo definir un Sprint Goal efectivo

| Paso | Descripción | Ejemplo |
|------|------------|---------|
| **1. Revisar Product Backlog** | Seleccionar ítems de alto valor y prioridad | Historias de usuario para mejorar la experiencia de login |
| **2. Identificar objetivo común** | Formular un objetivo concreto que todos comprendan | “Reducir errores de autenticación en un 50%” |
| **3. Evaluar alcance realista** | Asegurarse de que el objetivo sea alcanzable según capacidad del equipo | 5 Developers disponibles, 2 semanas de Sprint |
| **4. Redactar Sprint Goal claro** | Breve, conciso y motivador | “Mejorar la seguridad y estabilidad del login para aumentar la confiabilidad del usuario” |
| **5. Validación con todo el equipo** | Todos los miembros comprenden y acuerdan el objetivo | Daily Scrum y Sprint Planning como confirmación de entendimiento |

---

# 🟦 Buenas prácticas

- Mantener el objetivo **breve y claro**, fácil de recordar.  
- Asegurarse de que sea **medible y alcanzable** dentro del Sprint.  
- Involucrar a **todo el equipo** en su definición, no solo al Product Owner.  
- Revisar si el Sprint Goal **prioriza valor** para el usuario o cliente.  
- Evitar definirlo como lista de tareas; debe ser **un resultado deseado**.  

---

# 🟨 Ejemplos prácticos y casuísticas

### Caso 1: Sprint Goal demasiado amplio
- Problema: “Mejorar toda la aplicación” → demasiado general y poco práctico.  
- Acción: Se redefine a “Reducir errores críticos del módulo de pagos en un 80%”.  
- Resultado: Objetivo claro y alcanzable, enfoque del equipo mejorado.

### Caso 2: Sprint Goal poco motivador
- Problema: “Hacer pruebas de backend” → objetivo técnico sin contexto de valor.  
- Acción: Reformulación: “Asegurar que las transacciones del sistema sean confiables para los usuarios”.  
- Resultado: Equipo entiende impacto y se compromete con el Sprint.

### Caso 3: Cambio de prioridades durante Sprint
- Problema: Stakeholders piden agregar funcionalidades no planificadas.  
- Acción: El equipo evalúa si se alinean con Sprint Goal; si no, se posponen al próximo Sprint.  
- Resultado: Mantiene enfoque y logra cumplir el objetivo inicial.

---

# ❌ Errores comunes al definir Sprint Goal

1. Definirlo como lista de tareas, no como resultado.  
2. No involucrar a todo el equipo.  
3. Objetivo demasiado ambicioso o inalcanzable.  
4. Objetivo demasiado vago o genérico.  
5. No usarlo como guía durante el Sprint.

---

# 🧠 Conclusión

El **Sprint Goal** es la brújula del Sprint:  
- **Guía decisiones**  
- **Mantiene el foco**  
- **Permite medir éxito**  

> *“Un Sprint sin un objetivo claro es como navegar sin brújula: puedes moverte, pero no sabrás si avanzas hacia donde realmente importa.”*  
`,
                  },
                  {
                    id: "d13cba69-3abf-4d65-8aee-07e57b1a89d5",
                    title: "Plan de Trabajo y capacidad",
                    slug: "plan-trabajo-capacidad",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer qué es un **Sprint** y su propósito.  
- Comprender los roles de **Product Owner, Scrum Master y Developers**.  
- Entender los conceptos de **Sprint Backlog**, **Incremento** y **Sprint Goal**.

---

# 🎯 Propósito del Plan de Trabajo y Capacidad

El **plan de trabajo** define **cómo el equipo alcanzará el Sprint Goal**, mientras que la **capacidad del equipo** determina **cuánto trabajo puede asumir** durante el Sprint.  

- Garantiza que el Sprint sea **realista y alcanzable**.  
- Permite **asignar tareas según habilidades y disponibilidad** de los miembros.  
- Facilita **identificar posibles bloqueos o limitaciones antes de iniciar**.

---

# 🔹 Capacidad del equipo

La **capacidad** es la cantidad de trabajo que el equipo puede completar durante el Sprint, considerando:

1. **Disponibilidad de los miembros:** vacaciones, reuniones externas, soporte a otros proyectos.  
2. **Horas de trabajo efectivas:** tiempo real dedicado a tareas de desarrollo.  
3. **Complejidad de las historias:** algunas requieren más esfuerzo técnico.  
4. **Experiencia y habilidades del equipo:** mayor experiencia puede aumentar la productividad.  

> 💡 *Calcular la capacidad correctamente evita sobrecarga y aumenta la probabilidad de cumplir el Sprint Goal.*

---

# 🔹 Creación del Plan de Trabajo

El **plan de trabajo** se basa en la selección de historias del Product Backlog y la capacidad del equipo. Pasos:

| Paso | Descripción | Ejemplo |
|------|------------|---------|
| **1. Selección de historias** | Developers eligen ítems del Product Backlog según prioridad y capacidad | 3 historias de usuario para un Sprint de 2 semanas |
| **2. Desglose de tareas** | Dividir historias en tareas más pequeñas y estimarlas | Historia “Login seguro” → tareas: Frontend, Backend, Pruebas, Documentación |
| **3. Asignación inicial** | Distribuir tareas considerando habilidades y carga de trabajo | Programador A: Backend; Programador B: Frontend; Tester: Pruebas |
| **4. Ajuste de capacidad** | Reajustar tareas si la capacidad no alcanza | Reducir alcance o mover historias a próximo Sprint |
| **5. Planificación de contingencias** | Considerar bloqueos, dependencias y riesgos | Dejar espacio para solucionar errores imprevistos |

---

# 🟦 Roles en planificación de trabajo

| Rol | Responsabilidad |
|-----|----------------|
| **Developers** | Seleccionan, estiman y planifican tareas; acuerdan cómo cumplir el Sprint Goal |
| **Product Owner** | Clarifica requisitos y prioridades; valida alcance | 
| **Scrum Master** | Facilita la planificación, asegura time-boxing, previene sobrecarga | 

---

# 🟩 Buenas prácticas

- **Transparencia:** Todo el equipo conoce disponibilidad y carga de trabajo.  
- **Estimaciones colaborativas:** Usar técnicas como Planning Poker o T-shirt sizing.  
- **Evitar sobrecarga:** Seleccionar solo lo que el equipo puede completar con calidad.  
- **Revisar bloqueos:** Identificar riesgos antes de iniciar el Sprint.  
- **Actualizar el plan según aprendizaje:** Ajustar tareas durante el Sprint si surge información nueva.  

---

# 🟨 Ejemplos prácticos y casuísticas

### Caso 1: Sobrecarga del Sprint
- Problema: Equipo selecciona demasiadas historias y no completa ninguna.  
- Acción: Se revisa capacidad real y se pospone parte del trabajo al siguiente Sprint.  
- Resultado: Sprint realista y objetivos alcanzables.

### Caso 2: Subutilización del equipo
- Problema: Se planifica muy poco trabajo y sobra capacidad.  
- Acción: Agregar historias adicionales priorizadas y factibles.  
- Resultado: Mejor aprovechamiento del equipo y entrega de más valor.

### Caso 3: Cambio de disponibilidad
- Problema: Un miembro clave se enferma o tiene compromisos inesperados.  
- Acción: Ajustar tareas y reasignar responsabilidades según disponibilidad restante.  
- Resultado: Sprint continúa sin comprometer la calidad del Incremento.

---

# ❌ Errores comunes

1. No calcular la capacidad real del equipo.  
2. Sobrecargar el Sprint con historias no alcanzables.  
3. Ignorar bloqueos o dependencias técnicas.  
4. No actualizar el plan según cambios o nuevas prioridades.  
5. Planificar sin la participación activa de los Developers.  

---

# 🧠 Conclusión

El **Plan de Trabajo y la Capacidad** son esenciales para garantizar que el **Sprint sea alcanzable, productivo y de valor**.  
Una buena planificación permite al equipo **entregar Incrementos de calidad, mantener motivación y mejorar continuamente**.

> *“Planificar sin considerar la capacidad es como poner velas a un barco sin saber si puede navegar: el esfuerzo puede ser grande, pero el resultado incierto.”*  
`,
                  },
                  {
                    id: "d14cba69-3abf-4d65-8aee-07e57b1a89d6",
                    title: "Anti-patrones",
                    slug: "anti-patrones-sprint-planning",
                    level: 1,
                    content: `

## 🧠 Saberes Previos
- Conocer el **propósito del Sprint Planning**.  
- Entender los conceptos de **Sprint Goal, Sprint Backlog y Plan de Trabajo**.  
- Saber cómo calcular la **capacidad del equipo** y su disponibilidad.

---

# 📘 ¿Qué son los anti-patrones?

Los **anti-patrones** son prácticas **contraproducentes** que pueden surgir durante el Sprint Planning y que afectan la **eficiencia, enfoque y entrega de valor** del equipo.  
Identificarlos y evitarlos es crucial para que el Sprint sea exitoso.

---

# 🔹 Principales Anti-patrones

| Anti-patrón | Descripción | Ejemplo | Consecuencia |
|-------------|------------|---------|-------------|
| **Seleccionar demasiado trabajo** | Escoger más historias de las que el equipo puede completar | 10 historias para un Sprint de 2 semanas con 4 Developers | Sprint incompleto, frustración y baja motivación |
| **Sprint Goal genérico o inexistente** | Objetivo poco claro o ausente | “Mejorar la app” | Equipo sin foco, decisiones difíciles y bajo valor entregado |
| **Product Owner ausente o poco preparado** | No prioriza ni aclara historias | PO no puede responder preguntas durante la planificación | Retrasos, confusión y plan de trabajo incompleto |
| **Developers pasivos** | No participan activamente en estimaciones y planificación | Aceptan tareas sin discutir factibilidad | Riesgo de sobrecarga y errores en estimaciones |
| **Reunión desordenada y larga** | No hay time-boxing ni enfoque | Sprint Planning dura 5 horas sin pausas ni estructura | Fatiga del equipo, decisiones apresuradas o mal alineadas |
| **Ignorar capacidad real del equipo** | No considerar ausencias, vacaciones o carga de trabajo | Se planifican todas las historias del backlog sin revisar disponibilidad | No se cumple el Sprint, baja calidad y frustración |

---

# 🟦 Cómo prevenir anti-patrones

1. **Preparación previa:** PO debe tener backlog priorizado y refinado.  
2. **Time-boxing:** Respetar el límite de tiempo según duración del Sprint.  
3. **Involucrar a todo el equipo:** Developers participan en estimación y planificación.  
4. **Definir un Sprint Goal claro:** Breve, medible y alcanzable.  
5. **Calcular capacidad real:** Tener en cuenta vacaciones, reuniones y disponibilidad.  
6. **Fomentar transparencia:** Mostrar bloqueos, dependencias y riesgos.  

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Sprint Planning sin PO
- Problema: El PO no está disponible y las historias no están claras.  
- Acción: Reagendar planificación o hacer sesión de refinamiento antes.  
- Resultado: Sprint Backlog definido correctamente y sin dudas.

### Caso 2: Sobrecarga del equipo
- Problema: Se seleccionan más historias de las que se puede completar.  
- Acción: Ajustar Sprint Backlog según capacidad y priorizar ítems de mayor valor.  
- Resultado: Sprint realista y alcanzable.

### Caso 3: Sprint Goal vago
- Problema: Objetivo genérico como “Mejorar rendimiento”.  
- Acción: Reescribir como “Reducir tiempo de carga de página principal en 30%”.  
- Resultado: Equipo alineado y enfocado en un resultado medible.

---

# ❌ Resumen de alertas

- No sobrecargar el Sprint.  
- Evitar objetivos genéricos o inexistentes.  
- PO ausente o sin claridad en prioridades.  
- Developers pasivos durante la planificación.  
- Ignorar capacidad del equipo y bloqueos.  

---

# 🧠 Conclusión

Identificar y **prevenir anti-patrones** en el Sprint Planning es clave para:

- Mejorar la **eficiencia** de la reunión.  
- Asegurar **entregas de valor**.  
- Mantener al equipo **motivado y alineado**.  

> *“Evitar anti-patrones es tan importante como seguir buenas prácticas: un Sprint bien planificado es el primer paso hacia el éxito del equipo.”*  
`,
                  },
                ],
              },
            ],
          },
          {
            id: "8f2eeb9f-7dc0-4b77-8c1f-68e1e8a728d7",
            title: "Daily Scrum",
            subtitle: "",
            slug: "daily-scrum",
            description:
              "Evento diario para sincronizar al equipo y planificar las siguientes 24 horas.",
            content: "",
            icon: "clock",
            level: 1,
            features: [
              "Sincronización diaria",
              "Gestión de impedimentos",
              "Evitar anti-patrones",
              "Seguimiento del objetivo",
            ],
            modules: [
              {
                id: "af4394e3-3e84-4aa4-9f9b-fd6f19db239f",
                title: "Sincronización efectiva",
                level: 1,
                lessons: [
                  {
                    id: "e21d23c0-84b9-4b7c-8c7c-7e7a8c4fdd03",
                    title: "Objetivo de la Daily Scrum",
                    slug: "objetivo-daily-scrum",
                    level: 1,
                    content: `![Daily Scrum](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSZAiR3OlgEBEtY-PHzh3TeoOdtOgtSe_4w&s)

## 🧠 Saberes Previos
- Conocer qué es un **Sprint** y el **Sprint Goal**.  
- Entender los roles de **Developers, Product Owner y Scrum Master**.  
- Saber qué es un **Incremento** y la importancia de la entrega continua.

---

# 📘 ¿Qué es la Daily Scrum?

La **Daily Scrum** es una reunión diaria, breve y estructurada, donde el equipo de desarrollo:

- Sincroniza actividades.  
- Revisa el progreso hacia el **Sprint Goal**.  
- Identifica impedimentos o bloqueos que puedan afectar la entrega.  

> 💡 *No es una reunión de status para el Scrum Master ni el Product Owner, sino un espacio de coordinación del equipo.*

---

# 🎯 Objetivos principales

1. **Sincronización diaria del equipo:** Cada miembro comparte avances y próximos pasos.  
2. **Transparencia del progreso:** Permite a todos conocer el estado del Sprint en tiempo real.  
3. **Detección temprana de impedimentos:** Identificar riesgos o bloqueos antes de que se conviertan en problemas graves.  
4. **Planificación de las próximas 24 horas:** Ajustar prioridades y tareas según necesidad.  
5. **Refuerzo del Sprint Goal:** Mantener al equipo enfocado en el objetivo del Sprint.

---

# 🔹 Estructura recomendada

La Daily Scrum dura **máximo 15 minutos** y se suele responder a tres preguntas básicas:

| Pregunta | Propósito |
|----------|------------|
| ¿Qué hice ayer que ayudó al Sprint Goal? | Compartir avances y logros. |
| ¿Qué haré hoy para avanzar hacia el Sprint Goal? | Planificar las siguientes 24 horas. |
| ¿Hay algún impedimento que me bloquee? | Detectar problemas y buscar soluciones. |

> ⚠️ **Importante:** No es un espacio para resolver problemas largos; los impedimentos se tratan fuera de la reunión con el Scrum Master si es necesario.

---

# 🟦 Buenas prácticas

- Mantener **time-boxing estricto**: máximo 15 minutos.  
- Reunirse **cada día a la misma hora y lugar**.  
- Todos los Developers **participan activamente**.  
- Enfocarse en el **Sprint Goal**, no en tareas individuales sin contexto.  
- Scrum Master **facilita y elimina obstáculos**, pero no dirige la reunión.  

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Reunión larga y desordenada
- Problema: Se entra en discusiones técnicas extensas.  
- Acción: Identificar el problema y mover la discusión a una sesión aparte.  
- Resultado: Daily Scrum vuelve a ser breve y enfocada.

### Caso 2: Falta de foco en el Sprint Goal
- Problema: Los miembros hablan solo de tareas, no del objetivo del Sprint.  
- Acción: Recordar que cada actualización debe conectarse con el Sprint Goal.  
- Resultado: Equipo alineado y consciente del impacto de sus actividades.

### Caso 3: Impedimentos no detectados
- Problema: Un desarrollador tiene un bloqueo y no lo comunica.  
- Acción: Scrum Master fomenta transparencia y seguimiento de impedimentos.  
- Resultado: Bloqueo resuelto rápidamente y sin afectar al Sprint.

---

# ❌ Anti-patrones comunes

1. Reunión demasiado larga.  
2. Solo informar al Scrum Master sin colaboración entre Developers.  
3. Ignorar bloqueos o impedimentos.  
4. Hablar de tareas sin relacionarlas con el Sprint Goal.  
5. Saltarse la reunión o no asistir regularmente.

---

# 🧠 Conclusión

La **Daily Scrum** es la herramienta clave para:

- Mantener al equipo **sincronizado**.  
- Detectar problemas **tempranamente**.  
- Garantizar que el Sprint avance hacia su **objetivo**.  

> *“Una Daily Scrum efectiva no mide tiempo ni tareas, sino la alineación y avance hacia el Sprint Goal.”*  
`,
                  },
                  {
                    id: "e22d23c0-84b9-4b7c-8c7c-7e7a8c4fdd04",
                    title: "Gestión de Impedimentos",
                    slug: "gestion-impedimentos",
                    level: 1,
                    content: `

## 🧠 Saberes Previos
- Conocer qué es un **Sprint** y su objetivo.  
- Entender los roles de **Scrum Master, Product Owner y Developers**.  
- Saber qué es un **Incremento** y cómo se mide el progreso del Sprint.  
- Conocer la **Daily Scrum** y su función de sincronización diaria.

---

# 📘 ¿Qué es un impedimento?

Un **impedimento** es cualquier **obstáculo que impide al equipo avanzar hacia el Sprint Goal**. Puede ser:

- Técnico: errores de infraestructura, herramientas inadecuadas, falta de acceso.  
- Organizativo: decisiones pendientes de otros departamentos, bloqueos de gestión.  
- Personal: ausencia de un miembro clave, baja disponibilidad o enfermedad.  
- Procesos: dependencias externas, retrasos en aprobaciones, documentación incompleta.

> 💡 *Detectar y gestionar impedimentos rápidamente permite mantener el flujo de trabajo y garantizar la entrega de valor.*

---

# 🎯 Objetivos de la gestión de impedimentos

1. **Identificar bloqueos de manera temprana.**  
2. **Facilitar su resolución rápida y efectiva.**  
3. **Evitar que el Sprint se vea afectado negativamente.**  
4. **Aprender del impedimento para prevenir futuros bloqueos.**  

---

# 🔹 Rol de cada miembro

| Rol | Responsabilidad |
|-----|----------------|
| **Developers** | Comunicar impedimentos durante la Daily Scrum o inmediatamente cuando surgen. |
| **Scrum Master** | Facilitar la resolución, eliminar obstáculos y actuar como enlace con la organización. |
| **Product Owner** | Aclarar prioridades y decisiones que puedan estar bloqueando al equipo. |

---

# 🔹 Flujo de gestión de impedimentos

1. **Detección:** Developer identifica un bloqueo.  
2. **Comunicación:** Se comunica durante la Daily Scrum o directamente al Scrum Master.  
3. **Análisis:** Scrum Master evalúa impacto, urgencia y posibles soluciones.  
4. **Resolución:** Acción rápida para eliminar o mitigar el impedimento.  
5. **Seguimiento:** Se verifica que el bloqueo esté completamente resuelto.  
6. **Prevención futura:** Documentar lecciones aprendidas para evitar recurrencias.

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Problema técnico
- **Situación:** No se puede acceder al repositorio de código.  
- **Acción:** Scrum Master contacta al equipo de infraestructura y habilita acceso temporal.  
- **Resultado:** Developers continúan trabajando y se ajusta el plan de tareas.

### Caso 2: Dependencia externa
- **Situación:** Necesidad de aprobación de un stakeholder externo.  
- **Acción:** PO interviene y obtiene la aprobación rápida.  
- **Resultado:** El equipo puede continuar con las historias planificadas.

### Caso 3: Ausencia de un miembro clave
- **Situación:** Developer principal de backend está ausente por enfermedad.  
- **Acción:** Reasignar tareas entre el equipo y ajustar prioridades.  
- **Resultado:** Sprint sigue avanzado sin comprometer el Incremento.

---

# ❌ Anti-patrones en gestión de impedimentos

1. Ignorar los impedimentos hasta que afecten el Sprint.  
2. No documentar los bloqueos y su resolución.  
3. Resolver solo parcialmente, dejando problemas recurrentes.  
4. Developers no comunican problemas por miedo o falta de confianza.  
5. Scrum Master no actúa como facilitador.

---

# 🧠 Buenas prácticas

- Comunicar impedimentos **lo antes posible**.  
- Mantener un **registro de impedimentos** para análisis posterior.  
- Clasificar bloqueos por **urgencia e impacto**.  
- Involucrar a la **organización si el bloqueo está fuera del equipo**.  
- Revisar impedimentos en **retrospectivas** para mejorar procesos futuros.

---

# 🟦 Conclusión

La **gestión de impedimentos** es esencial para que el equipo mantenga **flujo continuo y entrega de valor**.  
Detectarlos, comunicarlos y resolverlos de manera efectiva aumenta la productividad, la motivación del equipo y la probabilidad de alcanzar el **Sprint Goal**.  

> *“Un impedimento no resuelto es un riesgo silencioso; identificarlo y eliminarlo a tiempo es clave para un Sprint exitoso.”*  
`,
                  },
                  {
                    id: "e23d23c0-84b9-4b7c-8c7c-7e7a8c4fdd05",
                    title: "Anti-patrones",
                    slug: "anti-patrones-daily-scrum",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer el propósito de la **Daily Scrum**.  
- Entender los roles del equipo Scrum.  
- Saber cómo se vincula la reunión con el **Sprint Goal**.  

---

# 📘 ¿Qué son los anti-patrones?

Los **anti-patrones** son **prácticas que reducen la efectividad de la Daily Scrum** y afectan la sincronización, la transparencia y la entrega de valor del equipo.

---

# 🔹 Anti-patrones más comunes

| Anti-patrón | Descripción | Ejemplo | Consecuencia |
|-------------|------------|---------|-------------|
| **Reunión larga** | Duración excesiva >15 minutos | Se discuten problemas técnicos detallados | Fatiga del equipo, pérdida de enfoque y tiempo |
| **Solo reportar al Scrum Master** | Developers informan avances solo al SM | Cada Developer dice “he hecho esto” sin interacción | Falta de colaboración y sin ajuste del plan diario |
| **Ignorar impedimentos** | No comunicar bloqueos | Developer tiene un problema y no lo menciona | Riesgo de retrasos y Sprint incompleto |
| **Desalineación con Sprint Goal** | Hablar de tareas sin relación al objetivo | Se discuten tareas menores sin contexto | El equipo pierde foco y valor entregado disminuye |
| **Saltarse la reunión o llegar tarde** | No asistir o llegar con retraso | Algunos miembros faltan o se conectan tarde | Comunicación incompleta, bloqueos no detectados |
| **Discusión técnica extensa** | Entrar en resolución de problemas | Resolver bugs complejos durante la reunión | Se excede el tiempo, y la Daily pierde propósito |

---

# 🟦 Buenas prácticas para evitarlos

1. **Respetar el time-boxing**: máximo 15 minutos.  
2. **Conectar cada actualización con el Sprint Goal**.  
3. **Comunicar impedimentos inmediatamente**.  
4. **Mantener enfoque en sincronización, no resolución**.  
5. **Fomentar participación de todos los Developers**.  
6. **Registrar bloqueos y seguimientos fuera de la reunión**.  

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Reunión demasiado larga
- Problema: Se discuten detalles de código complejos.  
- Acción: Mover la discusión técnica a una sesión aparte.  
- Resultado: Daily Scrum vuelve a ser breve y enfocada.

### Caso 2: Solo informar al Scrum Master
- Problema: Developers no interactúan entre sí, solo reportan avances al SM.  
- Acción: Scrum Master fomenta conversación entre Developers.  
- Resultado: Mejor coordinación y colaboración diaria.

### Caso 3: Ignorar bloqueos
- Problema: Un Developer enfrenta un impedimento y no lo comunica.  
- Acción: Establecer cultura de transparencia y seguimiento de impedimentos.  
- Resultado: Bloqueos resueltos rápidamente y Sprint protegido.

---

# 🧠 Conclusión

Evitar estos **anti-patrones** es clave para mantener la **eficacia, colaboración y enfoque** del equipo.  
Una Daily Scrum bien realizada asegura que todos estén alineados con el **Sprint Goal**, los impedimentos se detecten a tiempo y el equipo avance de manera sincronizada.

> *“La Daily Scrum no mide tareas completadas, mide la sincronización y el avance hacia el objetivo del Sprint.”*
`,
                  },
                ],
              },
            ],
          },
          {
            id: "9f3aeb9f-8ec0-4b77-8c1f-68e1e8a728e8",
            title: "Sprint Review",
            subtitle: "",
            slug: "sprint-review",
            description:
              "Evento para inspeccionar el incremento y adaptar el Product Backlog.",
            content: "",
            icon: "eye",
            level: 1,
            features: [
              "Inspección del incremento",
              "Feedback del cliente",
              "Decisiones del backlog",
            ],
            modules: [
              {
                id: "bf834a31-7ddb-4f19-a2be-60945e646609",
                title: "Orientada al Valor",
                level: 1,
                lessons: [
                  {
                    id: "f31cba69-3abf-4d65-8aee-07e57b1a89f7",
                    title: "Propósito",
                    slug: "proposito-sprint-review",
                    level: 1,
                    content: `![Sprint Review](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuKwQxdicNIUVH1t1HjrSUt-3ej6dORAER9g&s)

## 🧠 Saberes Previos
- Conocer qué es un **Sprint** y el **Incremento de producto**.  
- Comprender la **función del Product Owner, Scrum Master y Developers**.  
- Entender cómo la **retroalimentación temprana** mejora la entrega de valor.  

---

# 📘 ¿Qué es el Sprint Review?

El **Sprint Review** es un evento que ocurre al final de cada Sprint, donde el equipo presenta el **Incremento** desarrollado y recibe retroalimentación de los **stakeholders**.  

> 💡 *No es una reunión de aprobación ni de control, sino de inspección y colaboración para maximizar el valor del producto.*

---

# 🎯 Objetivos principales

1. **Inspección del Incremento:** Revisar el trabajo completado y verificar que cumple con la definición de “Done”.  
2. **Feedback del cliente y stakeholders:** Obtener sugerencias y comentarios que permitan adaptar futuras prioridades.  
3. **Adaptación del Product Backlog:** Basado en lo aprendido, actualizar el backlog con nuevas historias, ajustes o mejoras.  
4. **Evaluación de valor entregado:** Analizar si el Incremento genera el impacto esperado y cumple objetivos de negocio.  
5. **Celebración de logros:** Reconocer avances y motivar al equipo.

---

# 🔹 Estructura del Sprint Review

| Elemento | Propósito |
|----------|-----------|
| **Presentación del Incremento** | Mostrar funcionalidades completas y resultados del Sprint. |
| **Discusión de lo que no se completó** | Explicar bloqueos y ajustes realizados. |
| **Retroalimentación de stakeholders** | Obtener opiniones, validar funcionalidades y priorizar cambios. |
| **Actualización del Product Backlog** | Incorporar nuevas historias o ajustar prioridades según feedback. |
| **Cierre con lecciones aprendidas** | Reflexionar sobre mejoras para próximos Sprints. |

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Stakeholders sin claridad sobre el Incremento
- Problema: Los stakeholders no comprenden las nuevas funcionalidades.  
- Acción: El equipo realiza una demostración práctica, usando ejemplos reales.  
- Resultado: Feedback más preciso y decisiones claras para próximas prioridades.

### Caso 2: Incremento parcialmente terminado
- Problema: Algunas historias no cumplen la definición de “Done”.  
- Acción: Se explica lo pendiente y se decide si queda en backlog para el siguiente Sprint.  
- Resultado: Transparencia y aprendizaje para planificación futura.

### Caso 3: Cambio de prioridades
- Problema: Feedback del cliente sugiere una nueva funcionalidad crítica.  
- Acción: Product Owner adapta el Product Backlog para reflejar nueva prioridad.  
- Resultado: Equipo alineado con valor de negocio y objetivos del producto.

---

# ❌ Anti-patrones comunes

1. Usar el Sprint Review solo como **presentación de marketing**.  
2. Ignorar el feedback de los stakeholders.  
3. No actualizar el Product Backlog con nuevas prioridades.  
4. Extender la reunión innecesariamente sin foco en valor.  
5. Omitir la revisión de lo que no se completó o quedó pendiente.

---

# 🧠 Buenas prácticas

- Preparar el **Incremento** con ejemplos claros y funcionales.  
- Invitar a **todos los stakeholders relevantes**.  
- Mantener la reunión **participativa y colaborativa**.  
- Documentar el **feedback y decisiones** tomadas.  
- Revisar qué se puede mejorar para futuros Sprints.  

---

# 🟦 Conclusión

El Sprint Review permite al equipo y a los stakeholders:

- **Inspeccionar** lo construido.  
- **Aprender** de la experiencia del Sprint.  
- **Adaptar** el Product Backlog para maximizar valor.  

> *“El Sprint Review no es solo mostrar lo que se hizo, es aprender, mejorar y alinear el producto con las necesidades reales del cliente.”*  
`,
                  },
                  {
                    id: "f32cba69-3abf-4d65-8aee-07e57b1a89f8",
                    title: "Demostración y Feedback",
                    slug: "demostracion-feedback",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer el **Sprint Review** y su propósito.  
- Entender el concepto de **Incremento de producto**.  
- Saber cómo se relaciona el **feedback** con la adaptación del Product Backlog.  

---

# 📘 ¿Qué es la demostración?

La **demostración** (o *demo*) es la presentación práctica del Incremento desarrollado durante el Sprint.  
El objetivo es que los **stakeholders** y el equipo puedan **ver, probar y validar** las funcionalidades entregadas.

> 💡 *No se trata de una presentación formal, sino de mostrar el producto funcionando y generar conversación.*

---

# 🎯 Objetivos de la demostración y feedback

1. **Validar funcionalidades:** Confirmar que el Incremento cumple la definición de “Done”.  
2. **Obtener retroalimentación:** Recibir sugerencias, ajustes y mejoras de stakeholders.  
3. **Detectar oportunidades de mejora:** Identificar necesidades no previstas o errores.  
4. **Alinear expectativas:** Evitar desviaciones entre lo entregado y lo esperado por los usuarios.  
5. **Impulsar decisiones sobre el Product Backlog:** Incorporar nuevas historias o priorizar cambios.

---

# 🔹 Buenas prácticas durante la demo

| Práctica | Descripción |
|-----------|------------|
| Preparar escenarios reales | Mostrar funcionalidades con ejemplos prácticos, no solo teoría. |
| Involucrar a todos | Participación activa de Developers, Product Owner y stakeholders. |
| Limitar la duración | Mantener la demo breve, clara y enfocada en valor. |
| Registrar feedback | Tomar nota de comentarios para actualizar el Product Backlog. |
| Fomentar la discusión | Generar preguntas y debate constructivo sobre el Incremento. |

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Feedback inesperado
- **Situación:** Stakeholder sugiere un cambio que no estaba contemplado.  
- **Acción:** Product Owner evalúa impacto y prioridad, decide si se agrega al backlog.  
- **Resultado:** Incremento adaptado al valor de negocio real.

### Caso 2: Funcionalidad incompleta
- **Situación:** Demo muestra una historia parcialmente terminada.  
- **Acción:** Se explica el estado y se decide qué queda pendiente para el siguiente Sprint.  
- **Resultado:** Transparencia y aprendizaje para planificación futura.

### Caso 3: Confusión en la demo
- **Situación:** Stakeholders no comprenden cómo usar la nueva funcionalidad.  
- **Acción:** Developers realizan ejemplos prácticos y explicaciones paso a paso.  
- **Resultado:** Feedback más preciso y alineación de expectativas.

---

# ❌ Anti-patrones comunes

1. Hacer la demo **solo como formalidad** sin permitir interacción.  
2. Ignorar comentarios o preguntas de los stakeholders.  
3. Presentar funcionalidades incompletas sin aclarar contexto.  
4. Extender la demo innecesariamente sin foco en valor.  
5. No documentar el feedback para futuras decisiones.

---

# 🧠 Conclusión

La **demostración y el feedback** son esenciales para:

- Asegurar que el **Incremento** cumple expectativas.  
- Obtener **retroalimentación valiosa** para mejorar el producto.  
- Adaptar el **Product Backlog** de forma continua y ágil.  

> *“El valor real de una demo no está en mostrar lo que hiciste, sino en aprender de lo que los usuarios realmente necesitan.”*  
`,
                  },
                  {
                    id: "f33cba69-3abf-4d65-8aee-07e57b1a89f9",
                    title: "Decisiones sobre el Product Backlog",
                    slug: "decisiones-product-backlog",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer qué es un **Product Backlog** y su propósito.  
- Entender el **Incremento** generado durante el Sprint.  
- Saber cómo funciona el **feedback de stakeholders** y su importancia en Scrum.

---

# 📘 ¿Qué son las decisiones sobre el Product Backlog?

Durante el **Sprint Review**, el equipo y los stakeholders analizan el Incremento y determinan **qué ajustes, mejoras o nuevas historias** deben agregarse al Product Backlog.  

Estas decisiones buscan **maximizar el valor entregado al cliente y la organización**, priorizando el trabajo más relevante para los próximos Sprints.

> 💡 *El Product Backlog es un documento vivo: se actualiza constantemente según el aprendizaje y la retroalimentación.*

---

# 🎯 Objetivos de las decisiones sobre el Product Backlog

1. **Adaptar prioridades:** Reordenar elementos según valor y urgencia.  
2. **Agregar nuevas historias:** Incorporar necesidades detectadas durante la demo o feedback.  
3. **Eliminar o posponer elementos:** Quitar tareas que ya no agregan valor o retrasan el objetivo.  
4. **Refinar detalles:** Mejorar descripciones, criterios de aceptación y estimaciones.  
5. **Alinear expectativas:** Garantizar que todos los stakeholders comprendan los cambios y decisiones.

---

# 🔹 Flujo de decisiones

1. **Revisión del Incremento:** Presentación y análisis de funcionalidades completadas.  
2. **Recibir feedback:** Stakeholders y equipo sugieren cambios, mejoras o nuevas ideas.  
3. **Evaluar impacto y valor:** Product Owner y equipo analizan relevancia y esfuerzo.  
4. **Actualizar Product Backlog:** Modificar elementos existentes, agregar o eliminar historias.  
5. **Comunicar cambios:** Todos los miembros del equipo y stakeholders deben estar alineados.

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Nueva funcionalidad prioritaria
- **Situación:** Cliente solicita una función crítica no contemplada en el backlog.  
- **Acción:** Product Owner evalúa prioridad y esfuerzo, agrega al backlog y la prioriza.  
- **Resultado:** Equipo enfocado en valor de negocio real en próximos Sprints.

### Caso 2: Historia duplicada o irrelevante
- **Situación:** Se identifica que una historia ya no aporta valor.  
- **Acción:** Product Owner la elimina o pospone.  
- **Resultado:** Product Backlog más claro y eficiente.

### Caso 3: Refinamiento de criterios de aceptación
- **Situación:** Feedback indica que la historia necesita más detalle para su correcta implementación.  
- **Acción:** Se ajustan criterios de aceptación y descripciones.  
- **Resultado:** Mejora la comprensión y reduce retrabajo en el siguiente Sprint.

---

# ❌ Anti-patrones comunes

1. Ignorar el feedback de stakeholders y mantener backlog sin cambios.  
2. Posponer decisiones hasta el siguiente Sprint sin análisis.  
3. Agregar demasiadas historias sin priorización clara.  
4. No actualizar criterios de aceptación o descripciones.  
5. Decisiones tomadas unilateralmente sin consenso del equipo.

---

# 🧠 Buenas prácticas

- Revisar y actualizar el backlog **al final de cada Sprint**.  
- Priorizar siempre según **valor de negocio y esfuerzo estimado**.  
- Documentar cambios y comunicarlos claramente al equipo.  
- Involucrar al **Product Owner, Developers y stakeholders** en las decisiones.  
- Mantener un **backlog claro, transparente y enfocado en valor**.

---

# 🟦 Conclusión

Tomar decisiones sobre el Product Backlog en el Sprint Review asegura que el equipo:

- **Maximice valor** en cada Sprint.  
- **Se adapte a cambios y feedback** del cliente.  
- Mantenga el **Product Backlog actualizado y enfocado**.  

> *“Un Product Backlog vivo y bien gestionado es la brújula que guía al equipo hacia entregar valor continuamente.”*  
`,
                  },
                ],
              },
            ],
          },
          {
            id: "af4beb9f-9fc0-4b77-8c1f-68e1e8a728f9",
            title: "Sprint Retrospective",
            subtitle: "",
            slug: "sprint-retrospective",
            description:
              "Evento para reflexionar y mejorar continuamente como equipo.",
            content: "",
            icon: "refresh-cw",
            level: 1,
            features: [
              "Mejora continua",
              "Selección de acciones",
              "Seguimiento de mejoras",
              "Formatos efectivos",
            ],
            modules: [
              {
                id: "cf834a31-7ddb-4f19-a2be-60945e646610",
                title: "Mejora Continua",
                level: 1,
                lessons: [
                  {
                    id: "g41cba69-3abf-4d65-8aee-07e57b1a89g1",
                    title: "Propósito",
                    slug: "proposito-retrospective",
                    level: 1,
                    content: `![Sprint Retrospective](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tn4eXH29gdsoG3HiGOJsAgHnwBvMplF3pg&s)

## 🧠 Saberes Previos
- Conocer qué es un **Sprint** y el **Incremento de producto**.  
- Entender la dinámica de eventos de Scrum: Sprint Planning, Daily Scrum y Sprint Review.  
- Conocer roles: **Scrum Master, Product Owner y Developers**.  

---

# 📘 ¿Qué es la Retrospectiva de Sprint?

La **Sprint Retrospective** es un evento que se realiza al final de cada Sprint, **después del Sprint Review**, donde el equipo reflexiona sobre su **forma de trabajo**, con el objetivo de **mejorar continuamente**.

> 💡 *No se trata de señalar culpables, sino de identificar oportunidades de mejora y planificar acciones concretas.*

---

# 🎯 Objetivos principales

1. **Reflexionar sobre el Sprint:** Analizar qué funcionó bien y qué no.  
2. **Identificar oportunidades de mejora:** Detectar problemas, cuellos de botella o hábitos ineficientes.  
3. **Definir acciones concretas:** Seleccionar medidas para mejorar procesos, comunicación o colaboración.  
4. **Fomentar aprendizaje del equipo:** Compartir experiencias y lecciones aprendidas.  
5. **Promover la mejora continua:** Aplicar los cambios en el siguiente Sprint para aumentar eficiencia y satisfacción.

---

# 🔹 Estructura típica de la Retrospectiva

| Fase | Descripción |
|------|-------------|
| **Set the Stage** | Crear un ambiente seguro y motivar la participación de todos. |
| **Gather Data** | Recoger información sobre el Sprint: logros, problemas, métricas. |
| **Generate Insights** | Analizar causas raíz de problemas y detectar patrones. |
| **Decide What to Do** | Priorizar acciones de mejora concretas y alcanzables. |
| **Close the Retrospective** | Resumir acuerdos, aprendizajes y compromisos para el próximo Sprint. |

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Problemas de comunicación
- **Situación:** Los Developers no compartían información clave durante el Sprint.  
- **Acción:** Identificar la causa, acordar un formato de comunicación diaria más clara.  
- **Resultado:** Mejor coordinación y menos retrasos en el siguiente Sprint.

### Caso 2: Obstáculos recurrentes
- **Situación:** Se detecta un impedimento que se repite Sprint tras Sprint.  
- **Acción:** Analizar causa raíz y definir acción correctiva concreta.  
- **Resultado:** Eliminación del impedimento y mejora continua del flujo de trabajo.

### Caso 3: Celebración de logros
- **Situación:** El equipo completó objetivos difíciles y se siente motivado.  
- **Acción:** Reconocer públicamente los logros y buenas prácticas.  
- **Resultado:** Mayor motivación y cohesión del equipo.

---

# ❌ Anti-patrones comunes

1. Transformar la retrospectiva en sesión de culpas o críticas personales.  
2. No definir acciones concretas al final del evento.  
3. Repetir el mismo formato sin adaptación o innovación.  
4. Omitir la participación de todos los miembros del equipo.  
5. No hacer seguimiento de las acciones acordadas en Sprints posteriores.

---

# 🧠 Buenas prácticas

- Crear un **ambiente seguro y de confianza** para la participación.  
- Fomentar que todos los miembros del equipo aporten ideas.  
- Priorizar **acciones concretas y alcanzables**.  
- Documentar acuerdos y hacer seguimiento en el siguiente Sprint.  
- Variar el formato de retrospectiva para mantener el interés y la creatividad.

---

# 🟦 Conclusión

El Sprint Retrospective permite al equipo:

- **Aprender del pasado Sprint**.  
- **Identificar y aplicar mejoras** de forma continua.  
- **Fortalecer la colaboración y autoorganización**.  

> *“La retrospectiva no cambia el pasado, pero sí el futuro del equipo y su capacidad de entregar valor.”*  
`,
                  },
                  {
                    id: "g42cba69-3abf-4d65-8aee-07e57b1a89g2",
                    title: "Formatos (Start-Stop-Continue, 4L, 5-Whys)",
                    slug: "formatos-retrospective",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer qué es la **Sprint Retrospective** y su propósito.  
- Entender la importancia de **mejora continua** y aprendizaje del equipo.  
- Saber cómo funcionan la **reflexión y el feedback** en Scrum.  

---

# 📘 Introducción

Durante la retrospectiva, se utilizan **formatos y técnicas** que ayudan al equipo a **analizar el Sprint** de manera estructurada y a **identificar mejoras**.  
Los formatos más comunes incluyen:

- **Start-Stop-Continue**  
- **4L (Liked, Learned, Lacked, Longed For)**  
- **5-Whys**  

Cada uno permite abordar la retrospectiva desde diferentes ángulos y facilita la participación de todos los miembros.

---

# 🔹 1. Start-Stop-Continue

| Acción | Pregunta clave | Ejemplo |
|--------|---------------|---------|
| **Start** | ¿Qué deberíamos empezar a hacer? | Empezar a documentar las decisiones de diseño en cada Sprint. |
| **Stop** | ¿Qué deberíamos dejar de hacer? | Dejar de reuniones largas y poco productivas. |
| **Continue** | ¿Qué deberíamos seguir haciendo? | Seguir usando pruebas unitarias automatizadas. |

> 💡 *Ayuda a identificar claramente qué prácticas generan valor y cuáles deben eliminarse.*

---

# 🔹 2. Formato 4L (Liked, Learned, Lacked, Longed For)

| L | Pregunta | Ejemplo |
|---|----------|---------|
| **Liked** | ¿Qué nos gustó del Sprint? | La colaboración entre Developers y Product Owner fue excelente. |
| **Learned** | ¿Qué aprendimos? | Mejor entendimos la prioridad de las historias. |
| **Lacked** | ¿Qué nos faltó? | Faltó documentación técnica en algunas historias. |
| **Longed For** | ¿Qué desearíamos tener? | Más tiempo para pruebas de integración. |

> 💡 *Permite reflexionar sobre emociones, aprendizaje y necesidades futuras.*

---

# 🔹 3. 5-Whys (Cinco Porqués)

- Técnica para **llegar a la raíz de un problema** preguntando “¿Por qué?” cinco veces.  
- **Ejemplo práctico:**  
  1. Problema: El equipo entregó tarde la historia X.  
  2. ¿Por qué? Porque faltaron pruebas.  
  3. ¿Por qué? Porque no se planificó tiempo suficiente.  
  4. ¿Por qué? Porque las estimaciones fueron demasiado optimistas.  
  5. ¿Por qué? Porque no se revisaron las dependencias externas.  
- **Acción resultante:** Mejor planificación y revisión de dependencias en próximos Sprints.

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Falta de participación
- **Situación:** Algunos miembros no aportan en la retrospectiva.  
- **Acción:** Usar un formato visual como Start-Stop-Continue para que todos puedan escribir sus ideas.  
- **Resultado:** Mayor participación y diversidad de ideas.

### Caso 2: Problema recurrente
- **Situación:** Un mismo impedimento se repite en varios Sprints.  
- **Acción:** Aplicar 5-Whys para identificar la causa raíz.  
- **Resultado:** Acciones correctivas efectivas que eliminan el problema de forma sostenible.

### Caso 3: Reflexión superficial
- **Situación:** El equipo solo comenta lo obvio y no profundiza.  
- **Acción:** Usar 4L para abarcar aspectos emocionales, aprendizaje y necesidades.  
- **Resultado:** Aprendizaje más completo y mejoras significativas.

---

# ❌ Anti-patrones comunes

1. Elegir siempre el mismo formato sin adaptación.  
2. No aplicar los hallazgos a futuros Sprints.  
3. Ignorar problemas pequeños que se vuelven recurrentes.  
4. Permitir que un solo miembro domine la retrospectiva.  
5. No priorizar acciones de mejora concretas.

---

# 🧠 Buenas prácticas

- Alternar formatos para mantener frescura y creatividad.  
- Facilitar la retrospectiva de manera que todos participen.  
- Documentar hallazgos y acciones acordadas.  
- Revisar en el próximo Sprint si las acciones implementadas funcionaron.  
- Fomentar un ambiente seguro, donde se pueda hablar de problemas sin culpas.

---

# 🟦 Conclusión

Usar formatos estructurados en la **Sprint Retrospective** permite al equipo:

- Reflexionar de manera completa y clara.  
- Identificar mejoras concretas y acciones alcanzables.  
- Mantener la **mejora continua** como parte de la cultura del equipo.  

> *“La técnica adecuada no solo organiza la retrospectiva, sino que potencia el aprendizaje y la evolución del equipo.”*  
`,
                  },
                  {
                    id: "g43cba69-3abf-4d65-8aee-07e57b1a89g3",
                    title: "Selección de acciones SMART",
                    slug: "acciones-smart",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer qué es la **Sprint Retrospective** y su propósito.  
- Comprender la importancia de **mejora continua** y seguimiento de acciones.  
- Saber cómo priorizar acciones según impacto y factibilidad.  

---

# 📘 ¿Qué son acciones SMART?

Durante la retrospectiva, el equipo define **acciones concretas para mejorar su desempeño** en próximos Sprints.  
Para que estas acciones sean efectivas, se recomienda que sean **SMART**, es decir:

| Letra | Significado | Pregunta clave | Ejemplo |
|-------|-------------|----------------|---------|
| **S** | Specific / Específica | ¿Qué exactamente queremos lograr? | Mejorar la comunicación diaria entre Developers y Product Owner. |
| **M** | Measurable / Medible | ¿Cómo sabremos si se ha logrado? | Revisar que 100% de los temas importantes se compartan en la Daily. |
| **A** | Achievable / Alcanzable | ¿Es realista con los recursos actuales? | Se implementa solo con reuniones diarias ya programadas. |
| **R** | Relevant / Relevante | ¿Aporta valor al equipo o producto? | Mejora el flujo de información y reduce retrasos. |
| **T** | Time-bound / Temporal | ¿En qué plazo se logrará? | Durante el próximo Sprint de 2 semanas. |

> 💡 *SMART asegura que las acciones sean claras, medibles y realmente implementables.*

---

# 🔹 Flujo para definir acciones SMART

1. **Identificar problemas y oportunidades** durante la retrospectiva.  
2. **Generar varias posibles acciones** para cada problema.  
3. **Evaluar cada acción con criterios SMART**: ¿es específica, medible, alcanzable, relevante y temporal?  
4. **Priorizar acciones** que tengan mayor impacto y factibilidad.  
5. **Asignar responsables** y establecer seguimiento en el próximo Sprint.

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Mejora de comunicación
- **Situación:** Información importante no se comparte en la Daily.  
- **Acción SMART:** Crear un breve checklist de temas a cubrir en la Daily, revisar su cumplimiento cada día del Sprint.  
- **Resultado:** Mejor flujo de información y reducción de bloqueos.

### Caso 2: Retrabajo frecuente
- **Situación:** Historias se devuelven por errores repetidos.  
- **Acción SMART:** Implementar revisión de código entre pares antes de marcar como “hecho”, medido por menos de 5 historias devueltas por Sprint.  
- **Resultado:** Mayor calidad y menos retrabajo.

### Caso 3: Falta de documentación
- **Situación:** Los desarrollos carecen de información clave.  
- **Acción SMART:** Documentar cada historia completada con criterios mínimos antes de cerrar el Sprint.  
- **Resultado:** Mejor transferencia de conocimiento y menos dudas en próximos Sprints.

---

# ❌ Anti-patrones comunes

1. Acciones vagas o genéricas (“mejorar comunicación”).  
2. Definir demasiadas acciones que no se pueden cumplir en un Sprint.  
3. No establecer responsables ni plazos.  
4. Olvidar el seguimiento en el siguiente Sprint.  
5. Priorizar acciones irrelevantes para el valor del producto.

---

# 🧠 Buenas prácticas

- Asegurar que cada acción tenga **responsable y fecha de seguimiento**.  
- Limitar el número de acciones a **2-4 por Sprint** para mantener enfoque.  
- Revisar resultados de acciones previas en cada nueva retrospectiva.  
- Usar **herramientas visuales** (tableros, listas, gráficos) para seguimiento.  
- Fomentar compromiso de todo el equipo con las acciones definidas.

---

# 🟦 Conclusión

Seleccionar acciones SMART permite al equipo:

- Convertir aprendizajes en **mejoras concretas y alcanzables**.  
- Medir el impacto de cada acción y ajustar estrategias.  
- Mantener la **mejora continua** como parte de la cultura de Scrum.  

> *“Acciones SMART transforman la reflexión en resultados tangibles y medibles para el equipo.”*  
`,
                  },
                  {
                    id: "g44cba69-3abf-4d65-8aee-07e57b1a89g4",
                    title: "Seguimiento de mejoras",
                    slug: "seguimiento-mejoras",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
- Conocer el **propósito de la Sprint Retrospective**.  
- Entender qué son **acciones SMART** y cómo se definen en el equipo.  
- Familiaridad con el concepto de **mejora continua** en Scrum.

---

# 📘 ¿Por qué es importante el seguimiento?

El **seguimiento de mejoras** asegura que las acciones acordadas en la retrospectiva **no queden solo en papel**, sino que:

- Se implementen efectivamente.  
- Se evalúe su impacto real en el flujo del equipo.  
- Se ajusten o refinen según resultados del Sprint.  

> 💡 *Mejorar sin seguimiento es como plantar semillas sin regarlas: nunca verás crecer los resultados.*

---

# 🔹 Pasos para un seguimiento efectivo

1. **Documentar acciones acordadas:** Registrar cada acción, responsable y plazo.  
2. **Incluirlas en el tablero del equipo:** Por ejemplo, en una columna de “Mejoras en progreso” o usando herramientas digitales como Jira o Trello.  
3. **Revisar en Daily o reuniones específicas:** Verificar avances, bloqueos o resultados parciales.  
4. **Evaluar resultados al final del Sprint:** Durante la siguiente retrospectiva, analizar qué funcionó y qué no.  
5. **Refinar o continuar:** Ajustar acciones que no dieron resultados o consolidar las que sí funcionaron.

---

# 🔹 Indicadores de seguimiento

- **Cumplimiento de acciones:** Porcentaje de acciones implementadas en el Sprint.  
- **Impacto medido:** Ejemplo: reducción de errores, menor retrabajo, mayor velocidad del equipo.  
- **Participación del equipo:** Todos los miembros cumplen su rol en la acción.  
- **Retroalimentación cualitativa:** Opiniones del equipo sobre la utilidad de la acción.

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Acción parcialmente cumplida
- **Situación:** El equipo definió “Mejorar comunicación diaria”, pero solo se cumplió la mitad.  
- **Acción:** Analizar causas (falta de hábito, reuniones largas) y ajustar para el próximo Sprint.  
- **Resultado:** Mayor eficacia en la implementación de la acción.

### Caso 2: Acción exitosa
- **Situación:** Implementaron checklist en Daily para compartir bloqueos.  
- **Resultado:** Todos los bloqueos se identificaron a tiempo y se resolvieron rápidamente.  
- **Lección:** Mantener y replicar este formato en próximos Sprints.

### Caso 3: Acción irrelevante
- **Situación:** Se acordó crear un reporte interno poco útil.  
- **Acción:** Revisar relevancia y eliminar acciones que no aporten valor.  
- **Resultado:** Mayor enfoque en mejoras significativas.

---

# ❌ Anti-patrones comunes

1. Olvidar revisar acciones de la retrospectiva anterior.  
2. No asignar responsables claros.  
3. Medir solo cantidad de acciones, no impacto real.  
4. Registrar acciones en un documento y no darles seguimiento práctico.  
5. Saturar al equipo con demasiadas acciones sin priorización.

---

# 🧠 Buenas prácticas

- Limitar el número de acciones a **2-4 por Sprint** para mantener enfoque.  
- Integrar seguimiento dentro del **flujo de trabajo diario**.  
- Evaluar impacto tanto **cuantitativo** como **cualitativo**.  
- Hacer visible el progreso para motivar al equipo.  
- Ajustar acciones según feedback y resultados reales.

---

# 🟦 Conclusión

El seguimiento de mejoras convierte la **reflexión en resultados concretos**. Permite al equipo:

- Cumplir acciones definidas.  
- Medir impacto real en la eficiencia y calidad.  
- Consolidar la **cultura de mejora continua** en Scrum.

> *“No basta con identificar mejoras, hay que asegurarse de que se implementen y se midan sus resultados.”*  
`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "d25f6a3e-1b4c-4d6f-9f3a-2e1b7c8d9f4a",
        name: "Artefactos de Scrum",
        level: 6,
        topics: [
          {
            id: "a7c8d9e0-2f3b-4c5d-8a9b-1e2f3a4b5c6d",
            title: "Product Backlog",
            subtitle: "",
            slug: "product-backlog",
            description:
              "Artefacto central en Scrum que contiene todos los elementos de trabajo que el equipo de desarrollo debe abordar para crear un producto funcional.",
            content: "",
            icon: "list",
            level: 1,
            features: [
              "Fuente única de trabajo",
              "Transparencia y visibilidad",
              "Evolución continua",
              "Priorización basada en valor de negocio",
            ],
            modules: [
              {
                id: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
                title: "Valor y Ordenamiento",
                level: 1,
                lessons: [
                  {
                    id: "c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
                    title: "Propósito",
                    slug: "product-backlog-proposito",
                    level: 1,
                    content: `![Product Backlog](https://donetonic.com/wp-content/uploads/2022/08/Donetonic-Product-Backlog.jpg)

## 🧠 Saberes Previos
Antes de entender el propósito del Product Backlog, es útil conocer:
- Qué es un **Product Owner** y su responsabilidad sobre el producto.  
- Conceptos básicos de **valor de negocio**.  
- Qué es una **historia de usuario** y un **requerimiento funcional/no funcional**.  
- Comprender que Scrum es un marco **iterativo e incremental**.

---

# 📘 ¿Qué es el Product Backlog?

El **Product Backlog** es un artefacto central en Scrum que contiene **toda la información necesaria** para construir un producto:

- Funcionalidades  
- Requerimientos  
- Correcciones  
- Mejoras  
- Elementos técnicos  
- Investigación (spikes)  

Es la **fuente única y oficial de trabajo** para el equipo.

> 💡 *Si algo no está en el Product Backlog, no existe para el equipo Scrum.*

---

# 🎯 Propósito principal del Product Backlog

El propósito del Product Backlog es **ordenar, gestionar y hacer transparente** todo el trabajo que se necesita para crear, mantener o mejorar un producto.  

Su meta es permitir:

- Alineación entre equipo y negocio.  
- Priorización basada en **valor**.  
- Adaptación rápida ante cambios.  
- Organización clara del trabajo futuro.  
- Visibilidad total para todos los involucrados.  

---

# 🔹 Objetivos clave del Product Backlog

### **1. Centralizar todo el trabajo del producto**  
Todo vive aquí: ideas, bugs, tareas técnicas, mejoras, etc.

### **2. Representar el valor del producto**
Los elementos están ordenados según el beneficio que aportan al usuario y al negocio.

### **3. Mantener transparencia**
Todos —PO, equipo, stakeholders— pueden ver prioridades y expectativas.

### **4. Guiar la planificación del Sprint**
El Sprint Backlog nace del Product Backlog.  
Aquí se define *qué es posible* y *qué es más valioso hacer primero*.

### **5. Evolucionar continuamente**
El Product Backlog es dinámico, no estático. A medida que se aprende más:
- Se agregan nuevos ítems  
- Se eliminan elementos  
- Se reorganiza  
- Se ajustan prioridades  

---

# 🟩 Casuísticas y ejemplos

### ✔ Caso 1: Backlog desordenado
- Impacto: El equipo no sabe qué tiene prioridad.  
- Solución: Refinamiento semanal + reglas claras de ordenamiento.

### ✔ Caso 2: PO solo mete tareas sin valor
- Impacto: El producto crece sin dirección.  
- Solución: Definir criterios objetivos de valor (ROI, riesgo, impacto, urgencia).

### ✔ Caso 3: Backlog con cientos de ítems inútiles
- Impacto: Dificulta encontrar lo importante.  
- Solución: Limpieza mensual → archivar, descartar, reagrupar.

---

# ❌ Anti-patrones comunes

1. Backlog como “lista de supermercado” sin prioridades.  
2. PO que no explica el “por qué” de cada ítem.  
3. Ítems gigantes imposibles de abordar en un Sprint.  
4. Falta de Refinamiento → todo se acumula sin claridad.  
5. Stakeholders que quieren cambiar prioridades sin criterio.  
6. Dejar que el Backlog crezca sin límites ni mantenimiento.

---

# 🧠 Buenas prácticas

- Mantener los ítems en un tamaño manejable.  
- Usar criterios de valor como **MoSCoW** o **WSJF**.  
- Revisar el Backlog de manera continua (Refinement).  
- El Product Owner debe hablar regularmente con usuarios reales.  
- Documentar el “por qué” detrás de cada ítem → da claridad al equipo.

---

# 🟦 Conclusión

El propósito del Product Backlog es asegurar que el trabajo del equipo esté:

- Claro  
- Priorizado  
- Visible  
- Enfocado en generar **valor real**  

Es la herramienta que permite que Scrum funcione como un **proceso adaptable**, donde el producto evoluciona sprint a sprint.

> *“Un Product Backlog bien gestionado es el mapa del viaje: guía cada paso que da el equipo.”*
`,
                  },
                  {
                    id: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
                    title: "Historias de usuario y criterios de aceptación",
                    slug: "historias-usuario-criterios-aceptacion",
                    level: 1,
                    content: `
## 🧠 Saberes Previos
Para comprender este tema, se recomienda conocer:
- Concepto y propósito del **Product Backlog**.  
- Qué es el **valor de negocio** y por qué es clave en Scrum.  
- Diferencia entre **requerimiento funcional** y **no funcional**.  
- Qué es un **Sprint** y cuál es el objetivo del equipo durante dicho ciclo.

---

# 📘 ¿Qué son las historias de usuario?

Las **historias de usuario** son descripciones breves y simples que representan una necesidad real de un usuario o cliente.  
No son especificaciones técnicas; son **conversaciones** que fomentan entendimiento.

La estructura más común es:

> **Como** *[tipo de usuario]*  
> **Quiero** *[necesidad]*  
> **Para** *[beneficio]*

---

# 🎯 Propósito de las historias de usuario

Las historias existen para:

- Crear un **lenguaje común** entre negocio y equipo.  
- Enfocar el desarrollo en **necesidades reales del usuario**.  
- Facilitar la **estimación y priorización**.  
- Mantener un backlog **comprensible y manejable**.  
- Promover la colaboración continua.

> 💡 Una buena historia de usuario siempre se centra en *quién* y *por qué*, no solo en el “qué”.

---

# 🔹 Características de una buena historia (INVEST)

Una historia de usuario debe ser:

- **I**ndependiente  
- **N**egociable  
- **V**aliosa  
- **E**stimable  
- **S**imple (Small)  
- **T**estable  

Estas cualidades permiten que las historias sean realmente útiles y no un obstáculo.

---

# ✔ Ejemplos de historias bien escritas

### 🟦 Ejemplo 1
**Como** comprador  
**Quiero** guardar productos en una lista de deseos  
**Para** revisarlos más tarde antes de comprar  

### 🟩 Ejemplo 2  
**Como** usuario nuevo  
**Quiero** registrarme con mi correo  
**Para** acceder a mi cuenta y personalizar mis preferencias  

---

# 📘 ¿Qué son los criterios de aceptación?

Son un conjunto de **condiciones claras y verificables** que deben cumplirse para considerar una historia como *terminada* y *aceptada por el Product Owner*.

Funcionan como:

- Base para pruebas.  
- Guía para desarrolladores.  
- Aseguramiento de calidad.  
- Alineación sobre expectativas.

Los criterios pueden escribirse en lista simple o usando **Gherkin (Given – When – Then)**.

---

# ✔ Ejemplo de criterios de aceptación

### 📌 Para la historia:  
*"Como usuario quiero iniciar sesión para acceder a mis datos personalizados"*  

**Criterios (lista simple):**
- Debe validar email y contraseña.  
- Debe mostrar mensaje de error si las credenciales no son válidas.  
- Debe permitir máximo 3 intentos fallidos.  
- Debe redirigir al panel principal si el inicio es exitoso.

**Criterios (Gherkin):**

Dado que el usuario está en el formulario de login
Cuando ingresa correo y contraseña válidos
Entonces debe iniciar sesión correctamente y ver el panel principal
Dado que el usuario ingresa credenciales incorrectas
Cuando intenta iniciar sesión
Entonces debe ver un mensaje de error indicando “Credenciales inválidas”

---

# 🟩 Casuísticas y ejemplos

### Caso 1: Historia demasiado grande (Epic disfrazada)
- Problema: el equipo no puede estimar.  
- Solución: dividir en historias más pequeñas y manejables.

### Caso 2: Criterios ambiguos
- Problema: QA interpreta diferente que el PO.  
- Solución: usar lenguaje claro, pruebas Given-When-Then.

### Caso 3: Historia sin beneficio claro
- Problema: se desarrolla algo sin valor real.  
- Solución: preguntar siempre: *¿Para quién y para qué?*

---

# ❌ Anti-patrones comunes

1. Historias que describen tareas técnicas (“Crear tabla”, “Implementar endpoint”).  
2. Historias gigantes que no caben en un Sprint.  
3. Historias sin criterios de aceptación claros.  
4. PO que define historias sin hablar con usuarios reales.  
5. Criterios escritos después del desarrollo (tarde y poco útil).  
6. Historias duplicadas o sin prioridad.

---

# 🧠 Buenas prácticas

- Escribir historias con el equipo, no en solitario.  
- Mantener pocas historias en la parte superior del backlog, pero bien refinadas.  
- Usar criterios Given-When-Then para mayor claridad.  
- Validar que cada historia tenga **valor y propósito**.  
- Revisar criterios antes del Sprint Planning.  

---

# 🟦 Conclusión

Las historias de usuario y sus criterios de aceptación permiten que el equipo:

- Entienda las necesidades reales del usuario.  
- Trabaje con claridad y objetivos medibles.  
- Entregue valor de manera constante.  
- Asegure calidad antes de dar por “terminado” un incremento.  

> *“Una buena historia de usuario describe una necesidad.  
Los criterios de aceptación garantizan que cumplamos esa necesidad.”*
`,
                  },
                  {
                    id: "c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
                    title: "Refinamiento continuo",
                    slug: "refinamiento-continio-product-backlog",
                    level: 1,
                    content: `## 🧠 ¿Qué es el Refinamiento del Product Backlog?

El **refinamiento continuo** es una actividad esencial dentro del marco de Scrum en la que el Product Owner y el Equipo Scrum colaboran para **detallar, aclarar, estimar y descomponer** los elementos del Product Backlog.  
No es un evento formal, sino una práctica constante que garantiza que el backlog esté siempre **actualizado, claro y listo para ser trabajado**.

---

## 🎯 Objetivos del Refinamiento

- Mantener un Product Backlog **ordenado** y **bien definido**.  
- Asegurar que los elementos estén **entendidos por el equipo**.  
- Descomponer items grandes en partes más pequeñas y manejables.  
- Estimar el esfuerzo para facilitar la planificación del Sprint.  
- Identificar **riesgos**, **dependencias** y **suposiciones**.  
- Aumentar la **transparencia** y la **preparación** para futuras iteraciones.

---

## 🔄 ¿Qué actividades se realizan en el refinamiento?

### ✔️ 1. Aclaración de requisitos
El Product Owner explica el propósito, funcionalidad y valor de cada elemento.

### ✔️ 2. Descomposición
Dividir épicas o historias grandes en partes más pequeñas y realizables.

### ✔️ 3. Estimación
El equipo utiliza técnicas como **Planning Poker**, **T-Shirt Sizes**, o **Puntos de Historia**.

### ✔️ 4. Priorización
Se evalúa qué elementos generan más valor y deben subir en el backlog.

### ✔️ 5. Identificación de riesgos
Se señalan posibles bloqueos, dependencias o incertidumbres técnicas.

### ✔️ 6. Actualización del backlog
Se agregan detalles, se eliminan elementos irrelevantes y se ajustan descripciones.

---

## 🧩 Beneficios del Refinamiento Continuo

- 🔍 **Mayor claridad** de lo que se debe construir.  
- ⚙️ **Menos improvisación** durante el Sprint Planning.  
- 📈 **Mejor productividad** del equipo.  
- 🚀 **Incrementos más predecibles y de mayor valor**.  
- 🤝 **Alineación constante** entre el Product Owner y el equipo.

---

## 💡 Buenas Prácticas

- Realizar sesiones semanales de 1 a 2 horas (según tamaño del equipo).  
- No refinar todo, solo los elementos más próximos al siguiente Sprint.  
- Mantener un backlog con al menos **2 Sprints de trabajo preparado**.  
- Fomentar la participación activa de todo el equipo.  
- Evolucionar los elementos con base en feedback del Sprint Review.

---

## 📌 Resultado esperado del refinamiento

Al finalizar el proceso, los elementos del backlog deben:

- Estar **listos** (Definition of Ready) para trabajar.  
- Tener criterios claros.  
- Estar estimados.  
- Ser pequeños, entendibles y accionables.  
- Contar con una prioridad justificada.

---

## 📝 Ejemplo práctico de refinamiento

### Antes:
> Épica: “Mejorar la experiencia de usuario en el flujo de registro”

### Después del refinamiento:
- Historia: “Como usuario quiero iniciar sesión con Google para ahorrar tiempo”
- Historia: “Como usuario quiero ver mensajes claros cuando fallo login”
- Historia: “Como usuario quiero validar mi correo para activar la cuenta”

---

## 📘 Conclusión

El **Refinamiento Continuo** es clave para garantizar que el Product Backlog sea un artefacto **vivo, ordenado y valioso**, permitiendo al equipo entregar productos de alta calidad Sprint tras Sprint.

---
`,
                  },
                  {
                    id: "c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f",
                    title: "Técnicas de priorización",
                    slug: "tecnicas-priorizacion-product-backlog",
                    level: 1,
                    content: `
## 📌 ¿Qué son las técnicas de priorización?

Las **técnicas de priorización** permiten ordenar los ítems del Product Backlog según **valor, urgencia, riesgo, impacto en el negocio y esfuerzo requerido**.  
Su objetivo es ayudar al Product Owner y al Equipo Scrum a **tomar decisiones informadas** y maximizar el valor entregado al cliente en cada Sprint.

Priorización no es solo “qué va primero”, sino **qué genera más valor en este momento**.

---

# 🔧 Técnicas más utilizadas

## 1️⃣ **MoSCoW**
Método clásico para clasificar requisitos según su importancia:

- **M – Must Have (Debe tenerse)**  
  Imprescindible para el producto o envío.  
- **S – Should Have (Debería tenerse)**  
  Alto valor, pero no crítico.  
- **C – Could Have (Podría tenerse)**  
  Deseable, pero opcional.  
- **W – Won’t Have (No se tendrá por ahora)**  
  Se excluye temporalmente.

**Beneficio:** facilita conversaciones rápidas sobre lo esencial.

---

## 2️⃣ **Modelo Kano**
Clasifica funcionalidades según cómo afectan la satisfacción del usuario:

- ⭐ **Atractores** → Sorprenden y encantan.  
- ✔️ **Básicas** → El usuario las espera; si faltan, hay frustración.  
- ⚙️ **De desempeño** → Más funcionalidad = más satisfacción.  
- ➖ **Indiferentes** → No aportan valor real.  
- ❌ **Reversas** → Funcionan en contra del usuario.

**Beneficio:** ayuda a priorizar lo que más impacta emocionalmente al cliente.

---

## 3️⃣ **Valor vs. Esfuerzo (o Impacto vs. Complejidad)**
Matriz donde cada ítem se evalúa en dos ejes:

- **Valor/Impacto:** beneficio para el negocio o usuario.
- **Esfuerzo/Complejidad:** trabajo requerido para implementarlo.

Cuadrantes:

- 🟩 **Alto valor / Bajo esfuerzo:** prioridad máxima.  
- 🟨 **Alto valor / Alto esfuerzo:** planear cuidadosamente.  
- 🟦 **Bajo valor / Bajo esfuerzo:** incluir si hay capacidad.  
- 🟥 **Bajo valor / Alto esfuerzo:** evitar.

**Beneficio:** maximiza retorno de inversión.

---

## 4️⃣ **WSJF – Weighted Shortest Job First**
Usado en marcos como SAFe.  
Fórmula:

WSJF = (Valor de negocio + Urgencia + Reducción de riesgo) / Esfuerzo

**Beneficio:** prioriza trabajos de alto valor y bajo costo.

---

## 5️⃣ **RICE (Reach, Impact, Confidence, Effort)**
Se calcula así:

RICE = (Alcance × Impacto × Confianza) / Esfuerzo

- **Reach (Alcance):** ¿cuántos usuarios afectará?  
- **Impact (Impacto):** ¿qué cambio produce?  
- **Confidence (Confianza):** certeza en los datos.  
- **Effort (Esfuerzo):** trabajo necesario.  

**Beneficio:** muy útil para productos digitales y startups.

---

# 📘 Buenas prácticas al priorizar

- Basarse en **datos**, no en opiniones.  
- Alinear la priorización con los **objetivos del negocio**.  
- Revisar la prioridad **constantemente**, no solo al inicio del proyecto.  
- Considerar **riesgos, dependencias y costos**.  
- Evitar priorizar todo como urgente.  
- Involucrar al equipo para obtener visión técnica realista.

---

# 🚀 ¿Qué se obtiene al aplicar estas técnicas?

- Mayor enfoque en lo que realmente importa.  
- Reducción de desperdicio (menos trabajo de bajo valor).  
- Más transparencia en las decisiones del Product Owner.  
- Planificación de Sprint más fluida.  
- Entregas con mayor impacto para el cliente.

---

# 🧾 Conclusión

Las técnicas de priorización ayudan a transformar un backlog desordenado en una lista **estratégica, clara y orientada a valor**.  
El Product Owner usa estas herramientas para asegurar que cada Sprint contribuya de manera significativa al progreso del producto.

---`,
                  },
                ],
              },
            ],
          },
          {
            id: "d1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
            title: "Sprint Backlog",
            subtitle: "",
            slug: "sprint-backlog",
            description:
              "Lista de ítems del Product Backlog elegidos para el Sprint, incluyendo el plan de trabajo. Propiedad del equipo de Developers y se actualiza durante el Sprint.",
            content: "",
            icon: "clipboard",
            level: 1,
            features: [
              "Conexión con Sprint Goal",
              "Plan detallado de trabajo",
              "Evolución diaria",
              "Transparencia y visibilidad",
            ],
            modules: [
              {
                id: "e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
                title: "Plan del Sprint",
                level: 1,
                lessons: [
                  {
                    id: "f1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
                    title: "Propósito",
                    slug: "sprint-backlog-proposito",
                    level: 1,
                    content:
                     `![Sprint Backlog](https://www.visual-paradigm.com/servlet/editor-content/scrum/what-is-sprint-backlog-in-scrum/sites/7/2018/12/sprint-backlog.png)

## 🧠 Saberes Previos
Para comprender este tema, se recomienda conocer:
- Qué es un **Sprint** y cuál es su duración típica.  
- El funcionamiento del **Product Backlog** y la selección de ítems.  
- El concepto de **Sprint Goal** y su importancia para el equipo.  
- La diferencia entre **historias de usuario** y **tareas técnicas**.

---

# 📘 ¿Qué es el Sprint Backlog?

El **Sprint Backlog** es el **plan de trabajo del equipo de Developers** para el Sprint.  
Incluye:

- Los ítems seleccionados del Product Backlog.  
- El **Sprint Goal**, que guía al equipo durante el Sprint.  
- Las tareas necesarias para completar cada ítem.  
- Cualquier ajuste que se requiera conforme se avanza.

Es un artefacto **vivo**, cambia y se adapta de forma diaria según el progreso real.

> 💡 *El Sprint Backlog no es una promesa, es una estrategia flexible para alcanzar el Sprint Goal.*

---

# 🎯 Propósito del Sprint Backlog

El propósito principal es **guiar al equipo** sobre qué se hará y cómo se hará durante el Sprint.  

Sirve para:

- Dar **claridad** sobre el trabajo seleccionado.  
- Definir un **plan concreto** y entendible por todos.  
- Ajustar el trabajo según el progreso diario.  
- Mantener el enfoque en el **Sprint Goal**.  
- Asegurar la **transparencia** sobre lo que se está realizando.  

---

# 🔹 ¿Por qué es clave para el Sprint?

- Garantiza alineación total del equipo.  
- Facilita la inspección y adaptación en las Daily Scrum.  
- Permite distribuir tareas de manera orgánica.  
- Evita confusiones y duplicidades de trabajo.  
- Ayuda a visualizar la carga de trabajo real vs. esperada.

---

# 📌 Elementos del Sprint Backlog

El Sprint Backlog contiene:

### ✔ 1. Sprint Goal  
Un objetivo claro y conciso que unifica el propósito del Sprint.

### ✔ 2. Ítems seleccionados del Product Backlog  
Los elementos con mayor valor que el equipo podrá completar dentro del Sprint.

### ✔ 3. Plan de trabajo  
Lista de tareas y actividades necesarias para cumplir con los ítems y alcanzar el objetivo.

---

# 🟦 Ejemplo visual de Sprint Backlog

**Sprint Goal:** Mejorar la experiencia del proceso de registro  
**Ítems seleccionados:**  
- Historia: “Como usuario quiero registrarme con Google…”  
- Historia: “Como usuario quiero recibir un correo de confirmación…”  

**Tareas del equipo:**  
- Integrar OAuth  
- Crear endpoint de validación  
- Configurar servidor SMTP  
- Diseñar plantilla del correo  

---

# 🌱 Evolución durante el Sprint

El Sprint Backlog se actualiza:

- En cada **Daily Scrum**  
- Cuando se detectan nuevas tareas  
- Si un ítem necesita dividirse  
- Si algo ya no es necesario  
- Si el equipo identifica nuevos riesgos  

> Nunca se eliminan ítems comprometiendo el Sprint Goal sin consultarlo con el Product Owner.

---

# ❌ Anti-patrones comunes

1. Mantener el Sprint Backlog estático como si fuera un documento rígido.  
2. Incluir más trabajo del que el equipo puede completar.  
3. Quitar ítems sin evaluar el Sprint Goal.  
4. No detallar tareas suficientes, generando baja visibilidad.  
5. Dejar que solo un rol lo gestione (debiera hacerlo *todo el equipo*).

---

# 🧠 Buenas prácticas

- Desglosar tareas pequeñas y manejables.  
- Mantenerlo visible para todos (tablero físico o digital).  
- Actualizarlo constantemente.  
- Enfocarse en el valor aportado, no en la cantidad de tareas.  
- Revisarlo siempre en la **Daily Scrum**.

---

# 🟩 Conclusión

El Sprint Backlog es la brújula del equipo durante el Sprint.  
Aporta claridad, enfoque y transparencia sobre el trabajo necesario para alcanzar el **Sprint Goal**, y es el punto central de la inspección y adaptación diaria.

> *Un Sprint sin Sprint Backlog es como un barco navegando sin mapa ni dirección.*

---
`,
                  },
                  {
                    id: "f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c",
                    title: "Selección de ítems",
                    slug: "sprint-backlog-seleccion-items",
                    level: 1,
                    content:
                      `
## 🧠 Saberes Previos
Antes de profundizar en este tema, se recomienda conocer:
- Qué es el **Product Backlog** y cómo se ordena.  
- El rol del **Product Owner** y su responsabilidad al priorizar.  
- Qué es un **Sprint** y cuál es su objetivo.  
- Cómo funciona la **Sprint Planning**.  
- Qué son las **historias de usuario** y cómo se estiman.

---

# 📘 ¿Qué significa seleccionar ítems?

La **selección de ítems** consiste en elegir, desde el Product Backlog, los elementos que el equipo trabajará durante el Sprint.  
Estos ítems deben aportar valor, ser viables y estar alineados con el **Sprint Goal**.

Esta selección se realiza durante el evento **Sprint Planning**, donde participan:
- Product Owner  
- Scrum Master  
- Developers  

> 💡 El Product Owner presenta *qué* tiene mayor valor;  
> los Developers deciden *cuánto* pueden comprometerse a hacer.

---

# 🎯 Objetivo de la selección de ítems

El propósito es conformar un Sprint Backlog que:

- Tenga ítems con **alto valor de negocio**.  
- Sea **realista**, de acuerdo con la capacidad del equipo.  
- Permita construir un incremento **funcional y usable**.  
- Esté alineado con el **Sprint Goal**.  
- Permita una ejecución fluida durante el Sprint.

---

# 📝 ¿Cómo se realiza la selección?

La selección sigue un proceso:

### ✔ 1. El Product Owner presenta los ítems priorizados  
Se muestran las historias más importantes y su valor para el negocio.

### ✔ 2. El equipo revisa si los ítems están listos (criterio "Definition of Ready")  
Incluye claridad, estimación y criterios de aceptación.

### ✔ 3. Los Developers evalúan su capacidad del Sprint  
Consideran:
- disponibilidad  
- habilidades  
- carga técnica  
- velocidad histórica

### ✔ 4. Se eligen los ítems que **sí pueden completarse**  
El objetivo es llegar a un compromiso responsable y alcanzable.

### ✔ 5. Se define o confirma el Sprint Goal  
Los ítems seleccionados deben apoyar directamente este objetivo.

---

# 📦 ¿Qué tipos de ítems se pueden seleccionar?

- Historias de usuario  
- Bugs o correcciones  
- Tareas técnicas  
- Investigación (*spikes*)  
- Refactorizaciones necesarias  
- Ajustes legales o normativos

Mientras aporten valor y contribuyan al Sprint Goal, pueden entrar al Sprint.

---

# 🔹 Criterios importantes para seleccionar correctamente

- **Valor de negocio:** ¿Qué tan útil o prioritario es para el cliente?  
- **Riesgo:** ¿Qué tanto impacto tiene si no se realiza?  
- **Dependencias:** ¿Requiere o desbloquea otro trabajo?  
- **Esfuerzo estimado:** Tareas demasiado grandes deben dividirse.  
- **Claridad:** Debe estar suficientemente detallado para iniciarse.  

> 🚫 *Nunca deben seleccionarse ítems incompletos o sin claridad.*

---

# 🧩 Ejemplo de selección de ítems

### Product Backlog priorizado:
1. Registro con Google  
2. Envío de correo de bienvenida  
3. Mejorar rendimiento del login  
4. Integración con pasarela de pago  

### Capacidad del equipo:  
Aproximadamente **20 puntos de historia**.

### Selección realizada:
- Registro con Google (8 puntos)  
- Envío de correo de bienvenida (5 puntos)  
- Mejorar rendimiento del login (5 puntos)  

Total: 18 puntos → dentro de la capacidad ✔

---

# ❌ Anti-patrones comunes

1. **El PO obliga al equipo** a tomar más ítems de los que pueden.  
2. El equipo **elige ítems sin valor** solo porque son fáciles.  
3. Seleccionar ítems que no contribuyen al Sprint Goal.  
4. Tomar ítems sin análisis previo (no pasan por refinamiento).  
5. Comprometerse con más de lo que históricamente entregan.  

---

# ✔ Buenas prácticas

- Seleccionar ítems claros y bien refinados.  
- Conversar abiertamente sobre capacidad y riesgos.  
- Alinear absolutamente todo con el Sprint Goal.  
- Preferir pocos ítems completos antes que muchos incompletos.  
- Incluir trabajo técnico necesario para mantener calidad.  

---

# 🟩 Conclusión

La selección de ítems es un proceso clave para iniciar un Sprint con claridad y enfoque.  
Permite al equipo tomar decisiones responsables basadas en valor, capacidad y objetivos comunes.

> *Seleccionar bien es la base para entregar un incremento sólido y de calidad.*

---
`,
                  },
                  {
                    id: "f3a4b5c6-7d8e-9f0a-1b2c-3d4e5f6a7b8c",
                    title: "Plan 'cómo' y descomposición",
                    slug: "plan-como-descomposicion",
                    level: 1,
                    content:
                      `
📚 **Saberes previos:**  
Conocer los conceptos de Historia de Usuario y Sprint Backlog.

---

### 🤔 ¿Qué es el “cómo”?
Una vez elegidos los ítems del Sprint, el equipo define **cómo** los construirá:  
las tareas, pasos técnicos, pruebas, configuraciones y actividades necesarias para completarlos.

Este plan no lo hace el Product Owner, sino **exclusivamente el Equipo de Desarrollo**.

---

### 🔍 ¿Qué es la descomposición?
Es dividir un ítem grande (Historia de Usuario) en partes pequeñas, claras y manejables llamadas **tareas**.

---

### 📌 Características de una buena descomposición:
- Cada tarea debe ser *pequeña*: máximo 1 día de trabajo.  
- Tener un resultado claro y verificable.  
- Ser entendible por cualquier miembro del equipo.  
- Permitir identificar rápidamente bloqueos o impedimentos.

---

### 🧩 Ejemplo:
Historia de Usuario:  
**“Como cliente, quiero iniciar sesión para acceder a mis pedidos.”**

Descomposición:  
- Diseñar pantalla de login  
- Crear endpoint de autenticación  
- Validar credenciales  
- Integrar API con frontend  
- Pruebas de login  

---

### 🎯 ¿Por qué es importante?
Porque permite:  
✔ Mejor visibilidad del progreso  
✔ Detección temprana de impedimentos  
✔ Planificación realista  
✔ Flujo continuo de trabajo durante el Sprint  

---

### 📌 En Resumen:
El plan “cómo” describe los pasos técnicos para completar un ítem, y la descomposición convierte el trabajo en tareas pequeñas, claras y ejecutables durante el Sprint.
`,
                  },
                  {
                    id: "f4a5b6c7-8d9e-0f1a-2b3c-4d5e6f7a8b9c",
                    title: "Actualización diaria y transparencia",
                    slug: "actualizacion-diaria-transparencia",
                    level: 1,
                    content:
                      `
📚 **Saberes previos:**  
Conocer el propósito del *Daily Scrum* y el funcionamiento del Sprint Backlog.

---

### 🔍 ¿Qué significa “actualización diaria”?
El Sprint Backlog es **un artefacto vivo**, por lo que se actualiza **todos los días** según el avance real del equipo.  
Estas actualizaciones reflejan:  
- Tareas completadas  
- Tareas en progreso  
- Nuevas tareas descubiertas  
- Ajustes en el plan para cumplir el Objetivo del Sprint

La actualización ocurre principalmente durante el **Daily Scrum**, pero puede registrarse en cualquier momento del día.

---

### 🌞 Daily Scrum + Sprint Backlog
Durante la reunión diaria, el equipo inspecciona el progreso y adapta el plan para las siguientes 24 horas.  
El Sprint Backlog se convierte en un mapa actual de cómo el equipo planea alcanzar el objetivo.

El Scrum Master no dirige la reunión; el equipo se autoorganiza.

---

### 🧼 ¿Por qué es importante la transparencia?
Scrum se basa en tres pilares: **transparencia, inspección y adaptación**.  
La transparencia diaria permite:

✔ Detectar bloqueos rápidamente  
✔ Evitar sorpresas al final del Sprint  
✔ Mantener al Product Owner informado sin reuniones extras  
✔ Tomar decisiones basadas en datos reales, no suposiciones  
✔ Ver claramente qué tareas aportan al Objetivo del Sprint

---

### 📊 Ejemplo:
El equipo descubre que una validación requerida no estaba prevista.  
Durante el Daily Scrum, lo anotan como nueva tarea y actualizan el Sprint Backlog:  
- Se crea una nueva subtarea  
- Se ajusta la carga de trabajo  
- Se recalcula el avance esperado

Esto evita retrasos en los últimos días del Sprint.

---

### 🧠 Clave:
**Si el Sprint Backlog no cambia día a día, probablemente el equipo no lo está usando correctamente.**

---

### 📌 En Resumen:
La actualización diaria asegura un Sprint Backlog real, visible y confiable, mientras que la transparencia facilita la colaboración, la toma de decisiones y la entrega de valor.
`
                  },
                ],
              },
            ],
          },
          {
            id: "e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b",
            title: "Incremento y Definition of Done",
            subtitle: "",
            slug: "incremento-definition-of-done",
            description:
              "Garantiza la calidad del trabajo y que cada entrega es funcional, cumpliendo con criterios de aceptación y Definition of Done.",
            content: "",
            icon: "check-square",
            level: 1,
            features: [
              "Entrega de valor continuo",
              "Cumplimiento de criterios de aceptación",
              "Calidad asegurada",
              "Preparado para liberación",
            ],
            modules: [
              {
                id: "f5a6b7c8-9d0e-1f2a-3b4c-5d6e7f8a9b0c",
                title: "Calidad y finalización",
                level: 1,
                lessons: [
                  {
                    id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
                    title: "Incremento",
                    slug: "incremento",
                    level: 1,
                    content:
                      `📦 **¿Qué es el Incremento?**

El **Incremento** es el resultado del trabajo completado durante un Sprint.  
Representa una **pieza de producto funcional**, que aporta valor y está lista para usarse, demostrarse o liberarse.

Cada Sprint genera al menos un Incremento, y todos los incrementos deben integrarse entre sí para formar un producto coherente.

---

### 🎯 Características clave del Incremento

- **Funcional y usable**: No es un prototipo ni trabajo parcial.  
- **Potencialmente liberable**: Puede ponerse en producción sin trabajo adicional.  
- **Cumple los criterios de aceptación** del Product Owner.  
- **Respeta la Definition of Done (DoD)** definida por el equipo.  
- **Está integrado con el trabajo previo**, evitando “islas” de funcionalidad.  

---

### 🔧 ¿Por qué debe ser liberable?
Porque Scrum busca entregar valor **de forma continua e incremental**.  
Incluso si el Product Owner decide no liberar, el Incremento **debe estar en un estado que lo permita**.

Esto aumenta la calidad del producto y evita acumulación de deuda técnica.

---

### 🧱 Incremento + Definition of Done
Para que un ítem del Product Backlog forme parte del Incremento, debe:

1. Estar completado según los criterios de aceptación.  
2. Cumplir con todos los puntos de la **Definition of Done**:  
   - Código revisado  
   - Pruebas aprobadas  
   - Documentación mínima actualizada  
   - Integración realizada  
   - Calidad asegurada  

Sin esto, **no se considera parte del Incremento**, aunque “parezca terminado”.

---

### 📌 Ejemplo práctico

Un equipo desarrolla la funcionalidad *“Restablecer contraseña”*.  
Para que forme parte del Incremento del Sprint debe cumplir:

✔ Criterios de aceptación del Product Owner  
✔ Pruebas unitarias y funcionales  
✔ Validaciones completas  
✔ Integración con el flujo de usuario  
✔ Documentación de API actualizada

Si falta alguno, **el trabajo no está Done**.

---

### 🧠 Clave:
**El Incremento refleja la calidad real del producto.  
Un Incremento incompleto es una ilusión de progreso.**

`
                  },
                  {
                    id: "a2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d",
                    title: "Definition of Done y calidad",
                    slug: "definition-of-done",
                    level: 1,
                    content:
                      `

## 🧠 Saberes Previos
Para comprender este tema, es útil conocer:
- Qué es el **Incremento** dentro de un Sprint.  
- Cómo funcionan los **criterios de aceptación** en una historia de usuario.  
- Qué significa “trabajo terminado” en Scrum.  
- Importancia de la calidad y la entrega continua.

---

# 📘 ¿Qué es la Definition of Done?

La **Definition of Done (DoD)** es un acuerdo explícito del equipo Scrum que define **qué significa que un elemento del Product Backlog esté realmente terminado**.  
Es un **estándar de calidad mínimo e innegociable** que debe cumplirse para que el Incremento sea considerado potencialmente liberable.

La DoD no es opcional ni depende del criterio personal de alguien:  
👉 **Se cumple o no se cumple.**

---

# 🎯 Propósito de la Definition of Done

La DoD existe para:

- Garantizar un **nivel consistente de calidad** en cada Sprint.  
- Evitar trabajo a medio hacer o “técnicamente terminado pero…”  
- Asegurar que cada Incremento sea **usable y liberable**.  
- Reducir errores, retrabajo y deuda técnica.  
- Crear transparencia sobre lo que significa “Done”.

> 💬 *Si el equipo no comparte qué es Done, nadie sabe realmente si el trabajo está terminado.*

---

# 🔍 ¿Qué incluye una buena DoD?

Aunque varía por equipo, industria o producto, generalmente incluye:

### ✔ Validaciones técnicas
- Código compilado sin errores.  
- Pruebas unitarias superadas.  
- Pruebas funcionales y de integración realizadas.  
- Cobertura mínima acordada.  

### ✔ Requisitos de calidad
- Código revisado (peer review).  
- Cumplimiento de estándares internos.  
- Sin vulnerabilidades críticas.  

### ✔ Entregables
- Documentación mínima actualizada.  
- API documentada (si aplica).  
- Interfaces revisadas.  

### ✔ Integración
- Integrado correctamente con el producto.  
- Sin romper funcionalidades existentes.  

### ✔ Listo para liberar
- Cumple criterios de aceptación.  
- Aprobado por el Product Owner (solo si cumple la DoD).  

---

# 📌 Ejemplo de Definition of Done

Un equipo Scrum podría definir su DoD así:

**Para que un ítem esté Done debe cumplir:**

1. Se completaron todos los criterios de aceptación.  
2. El código fue revisado por otro Developer.  
3. Se ejecutaron pruebas unitarias (mín. 80% de cobertura).  
4. Se realizaron pruebas manuales de la funcionalidad.  
5. La documentación se actualizó.  
6. El ítem se integró con el resto del producto sin errores.  
7. Se verificó el cumplimiento de estándares de seguridad.  
8. Se ejecutó el pipeline de CI sin fallos.  

---

# 🧱 DoD vs. Criterios de aceptación

| Concepto | Qué define | Quién lo define | Cuándo se usa |
|---------|------------|-----------------|----------------|
| **Criterios de Aceptación** | Comportamiento esperado de **una historia específica** | Product Owner + Equipo | Para validar cada historia |
| **Definition of Done** | Estándar de calidad para **todo el trabajo** | Todo el Equipo Scrum | Para validar el Incremento |

Ambos se utilizan juntos.

---

# 🧠 Importancia para el Incremento

El Incremento **solo es válido** si:

✔ cumple sus criterios de aceptación  
✔ cumple la Definition of Done  

Si no cumple la DoD, **no se puede considerar parte del Incremento**, aunque esté “casi terminado”.

---

# 💡 Buenas prácticas

- La DoD debe ser **visible**, clara y compartida por todos.  
- Debe revisarse y actualizarse regularmente.  
- No debe convertirse en una checklist imposible; debe ser realista.  
- Debe aplicarse a *todo* trabajo del Sprint.  

---

# 🎯 Conclusión

La **Definition of Done** es esencial para asegurar que cada entrega sea de alta calidad, consistente y verdaderamente terminada.  
Sin la DoD, el equipo no puede garantizar que el Incremento esté realmente listo, lo que genera confusión, deuda técnica y retrasos.

**La DoD es la base de la calidad en Scrum.**
`,
                  },
                  {
                    id: "a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
                    title: "Integración continua/automatización",
                    slug: "integracion-continua",
                    level: 1,
                    content:
                    `# 
## 🧠 Saberes Previos
Antes de profundizar en este tema, es recomendable tener claro:
- Qué es un **Incremento** en Scrum y por qué debe ser potencialmente liberable.  
- Conceptos básicos de **entrega continua** y **ciclos de desarrollo**.  
- Qué es un **pipeline** de integración o despliegue.  
- Importancia de la calidad, pruebas y detección temprana de errores.

---

# 📘 ¿Qué es la Integración Continua?

La **Integración Continua (CI)** es una práctica donde los Developers **integran su código frecuentemente** (varias veces al día) en un repositorio compartido.  
Cada integración dispara un proceso automatizado que **verifica la calidad, ejecuta pruebas y asegura que el código funciona**.

Su propósito es detectar problemas **lo antes posible**, evitando sorpresas al final del Sprint.

> 💡 Mientras más frecuentemente se integra, menor es el riesgo y el costo del error.

---

# 🎯 Objetivos principales de la Integración Continua

- Reducir errores generados por integraciones tardías.  
- Automatizar verificaciones clave del producto.  
- Producir Incrementos estables y listos para liberar.  
- Mejorar la calidad del software desde el inicio.  
- Aumentar la transparencia sobre el estado real del trabajo.  

---

# ⚙️ ¿Qué incluye un pipeline de CI?

Un pipeline de integración continua suele contener:

### ✔ **1. Compilación y verificación**
- Verificar que el código compile.  
- Chequear dependencias y versiones.  

### ✔ **2. Análisis estático**
- Revisiones automáticas del estilo de código.  
- Detección de vulnerabilidades.  
- Controles de calidad (ej. SonarQube).  

### ✔ **3. Ejecución de pruebas**
- Pruebas unitarias.  
- Pruebas de integración.  
- Pruebas de API o contratos.  

### ✔ **4. Empaquetado**
- Construcción de artefactos listos para despliegue.  
- Verificaciones básicas de integridad.  

### ✔ **5. Reportes**
- Informes automáticos de errores.  
- Cobertura de pruebas.  
- Notificaciones al equipo (Slack, correo, etc.).  

> 🧩 Estos pasos ayudan a asegurar que cada historia cumpla con la **Definition of Done** antes de integrarse al Incremento.

---

# 🤝 CI + Scrum: ¿Cómo se conectan?

La Integración Continua apoya varios pilares de Scrum:

| Pilar Scrum | Cómo aporta CI |
|-------------|----------------|
| **Transparencia** | Muestra estado real del producto y del Incremento. |
| **Inspección** | Detecta problemas en minutos, no días. |
| **Adaptación** | Permite corregir rápido y ajustar el plan del Sprint. |

Además:  
✔ Ayuda al equipo a evitar deuda técnica.  
✔ Permite crear Incrementos realmente liberables al final del Sprint.  
✔ Facilita entregas más frecuentes y con menos riesgo.

---

# 🤖 ¿Qué se puede automatizar?

La automatización no solo abarca la integración. También puede incluir:

- Generación de builds.  
- Ejecución de pruebas E2E.  
- Despliegues a entornos de prueba.  
- Creación de documentación.  
- Validaciones de seguridad.  
- Versionado automático (semántico).  

Mientras más aspectos se automaticen, más fluido y fiable se vuelve el proceso de entrega.

---

# 🧱 Buenas prácticas de Integración Continua

- Integrar código **al menos una vez por día**.  
- Nunca dejar código sin pasar por el pipeline de CI.  
- Mantener el pipeline **rápido, estable y confiable**.  
- Corregir fallas del pipeline de inmediato.  
- Mantener un estándar mínimo de pruebas automatizadas.  
- Usar ramas cortas y fusiones frecuentes.  

---

# 🚀 Resultado esperado

Con una buena CI y automatización:

- El Incremento es más estable.  
- El equipo reduce retrabajo.  
- Las integraciones son más seguras.  
- La calidad es más predecible.  
- El Product Owner recibe valor más rápido.  

La Integración Continua **no es opcional**: es un habilitador fundamental para cumplir la Definition of Done y entregar producto real en cada Sprint.

`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "5f3b2d1a-8c4f-4e9a-9b2c-1d7e8f4a9b5c",
        name: "Aspectos clave en Scrum",
        level: 7,
        topics: [
          {
            id: "d1a2b3c4-5e6f-7a8b-9c0d-e1f2a3b4c5d6",
            title: "Justificación del Negocio",
            subtitle: "",
            slug: "justificacion-del-negocio",
            description:
              "Asegura que el proyecto se mantenga enfocado en entregar valor al negocio y se adapte a cambios durante su ciclo de vida.",
            content: "",
            icon: "briefcase",
            level: 1,
            features: [
              "Caso de negocio vivo",
              "Alineación con objetivos estratégicos",
              "Entrega de valor continuo",
              "Priorización basada en impacto",
            ],
            modules: [
              {
                id: "m1-justificacion",
                title: "Caso de Negocio",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito",
                    title: "Propósito",
                    slug: "proposito",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-vision-metricas",
                    title: "Visión y métricas de valor",
                    slug: "vision-metricas-de-valor",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-viabilidad-seguimiento",
                    title: "Viabilidad y seguimiento del caso",
                    slug: "viabilidad-seguimiento-del-caso",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "d2b3c4d5-6e7f-8a9b-0c1d-f2a3b4c5d6e7",
            title: "Calidad",
            subtitle: "",
            slug: "calidad",
            description:
              "Garantiza que los entregables del proyecto cumplen con estándares definidos y contribuyen al Sprint Goal.",
            content: "",
            icon: "check-circle",
            level: 1,
            features: [
              "Calidad integrada en el Sprint",
              "Prevención sobre detección",
              "Medición de calidad",
              "Incrementos consistentes",
            ],
            modules: [
              {
                id: "m1-calidad",
                title: "Calidad Integrada",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito-sprint-backlog",
                    title: "Propósito",
                    slug: "proposito-sprint-backlog",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-prevencion-deteccion",
                    title: "Prevención > Detección",
                    slug: "prevencion-deteccion",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-medidas-calidad",
                    title: "Medidas de calidad",
                    slug: "medidas-de-calidad",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "d3c4d5e6-7f8a-9b0c-1d2e-f3a4b5c6d7e8",
            title: "Cambio",
            subtitle: "",
            slug: "cambio",
            description:
              "Manejo de cambios y entregables incrementales para asegurar la adaptación y continuidad de valor en Scrum.",
            content: "",
            icon: "refresh-cw",
            level: 1,
            features: [
              "Gestión de cambio ágil",
              "Incrementos liberables",
              "Adaptación continua",
              "Integración y automatización",
            ],
            modules: [
              {
                id: "m1-cambio",
                title: "Gestión del Cambio",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito-incremento",
                    title: "Propósito",
                    slug: "proposito-incremento",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-impacto-alcance-valor",
                    title: "Impacto en alcance y valor",
                    slug: "impacto-alcance-valor",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-integracion-continua",
                    title: "Cambios durante el Sprint",
                    slug: "cambios-durante-el-sprint",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "d4e5f6a7-8b9c-0d1e-2f3a-b4c5d6e7f8a9",
            title: "Riesgo",
            subtitle: "",
            slug: "riesgo",
            description:
              "Identificación y manejo de riesgos de manera ágil para asegurar el éxito y la continuidad de valor del proyecto.",
            content: "",
            icon: "alert-triangle",
            level: 1,
            features: [
              "Riesgos visibles",
              "Identificación continua",
              "Radiadores de riesgo",
              "Mitigación temprana",
            ],
            modules: [
              {
                id: "m1-riesgo",
                title: "Riesgo Ágil",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito-riesgo",
                    title: "Propósito",
                    slug: "proposito-riesgo",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-identificacion-continua",
                    title: "Identificación continua",
                    slug: "identificacion-continua",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-radiadores-riesgo",
                    title: "Radiadores de Riesgo",
                    slug: "radiadores-de-riesgo",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

function buildConflictUpdateAllExceptIdAndCreatedAt<
  T extends PgTable | SQLiteTable
>(table: T) {
  const columns = getTableColumns(table);
  return Object.keys(columns).reduce((acc, key) => {
    if (key === "id" || key === "createdAt") return acc;
    const colName = columns[key].name;
    acc[key] = sql.raw(`excluded."${colName}"`);
    return acc;
  }, {} as Record<string, SQL>);
}

async function main() {
  dotenv.config();
  /*  console.log("🗑️ Limpiando base de datos..."); */

  // El orden importa por las FK: primero hijos, luego padres
  /* await db.delete(schema.lessons);
  await db.delete(schema.modules);
  await db.delete(schema.topics);
  await db.delete(schema.learningSteps);
  await db.delete(schema.roadmaps);
  await db.delete(schema.questions);
  await db.delete(schema.assessments); */

  console.log("🌱 Seeding...");

  const { roadmaps, steps, topics, modules, lessons } = flattenSeed(seed);

  await db
    .insert(schema.roadmaps)
    .values(roadmaps)
    .onConflictDoUpdate({
      target: schema.roadmaps.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.roadmaps),
    });
  await db
    .insert(schema.learningSteps)
    .values(steps)
    .onConflictDoUpdate({
      target: schema.learningSteps.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.learningSteps),
    });
  await db
    .insert(schema.topics)
    .values(topics)
    .onConflictDoUpdate({
      target: schema.topics.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.topics),
    });
  await db
    .insert(schema.modules)
    .values(modules)
    .onConflictDoUpdate({
      target: schema.modules.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.modules),
    });
  await db
    .insert(schema.lessons)
    .values(lessons)
    .onConflictDoUpdate({
      target: schema.lessons.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.lessons),
    });

  /*  await db.insert(schema.assessments).values(assessment) */ /* .onConflictDoUpdate({
    target: schema.assessments.id,
    set: buildConflictUpdateAllExceptId(schema.assessments),
  });; */
  /*  await db.insert(schema.questions).values(questionsData) */ /* .onConflictDoUpdate({
    target: schema.questions.id,
    set: buildConflictUpdateAllExceptId(schema.questions),
  });  */

  console.log("✅ Seed successful");
  /* await client.end(); */
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

function flattenSeed(seed: any) {
  const roadmaps: any[] = [];
  const steps: any[] = [];
  const topics: any[] = [];
  const modules: any[] = [];
  const lessons: any[] = [];

  for (const roadmap of seed) {
    roadmaps.push({
      ...roadmap,
    });

    for (const step of roadmap.learningSteps) {
      steps.push({
        roadmapId: roadmap.id,
        ...step,
      });

      for (const topic of step.topics) {
        topics.push({
          stepId: step.id,
          roadmapId: roadmap.id,
          ...topic,
        });

        for (const moduleObjec of topic.modules) {
          modules.push({
            topicId: topic.id,
            ...moduleObjec,
          });

          for (const lesson of moduleObjec.lessons) {
            lessons.push({
              moduleId: moduleObjec.id,
              ...lesson,
            });
          }
        }
      }
    }
  }

  return { roadmaps, steps, topics, modules, lessons };
}
