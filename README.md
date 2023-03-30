# Prompt templates 📚🤖
Es una herramienta que permite crear plantillas de prompts con espacio para argumentos para ser reutilizadas durante la creación de un proyecto, hace uso del API de herramientas conversacionales de **OpenAI** como **GPT-3**, **GPT-4** (si es que tiene acceso a ella).

##### AVISO:
Este proyecto está en desarrollo y solo es una prueba de concepto, no se recomienda usarlo en producción.

## Requisitos
- Node.js
- NPM

## Configuración de variables de entorno
1) Abra el archivo **.env** en la carpeta del servidor del proyecto (./server)
2) Configure las variables de entorno

## Arrancar el proyecto
1) Abrar una terminal en la carpeta del servidor del proyecto (./prompttemplate/server)
2) Ejecutar el siguiente comando:```npm install``` (solo la primera vez)
3) Ejecutar el siguiente comando:```node .```
4) Finalmente abra el archivo **index.html** (./) en el navegador.

## Cómo usarlo?
1) Escriba el nombre del template en el campo de texto
2) Presione el botón **Agregar prompt**
3) Escriba el prompt en el campo de texto
4) Presione el botón **Agregar argumento** para incrustar argumentos al prompt
5) Presione el botón **Guardar**
6) Abra su template en la lista de templates del costado izquierdo, rellene los argumentos y presione el botón **▶** para aplicar el template y obtener el resultado.
7) Al costado derecho se mostrará el output del template.

Para crear un nuevo template, presione el botón **Nuevo template +** en la lista de templates.

<p align="center">
  <img src="./examples/build_a_prompt.png" alt="preview"/>
</p>