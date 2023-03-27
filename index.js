const prompt_block_name = "template-block-";
const template_name = "template-";
const ARGUMENT_BADGE_STYLE = "fs-5 badge text-bg-primary ms-2 me-2";
const PROMPT_BADGE_STYLE = "fs-5 badge text-bg-secondary";

let template = {
  id: "",
  blocks: [],
  name: "",
};

let templates = [];

init();

function init() {
  loadMocks();
  loadTemplateList();
}

function loadTemplateList() {
  templates.forEach((template) => {
    createTemplateListElement(template);
  });
}

function loadMocks() {
  mocks = [
    {
      id: "template-3",
      blocks: [
        {
          id: "template-block-0",
          text: "Escribe una expresion regular que cumpla las siguientes reglas:",
          type: "prompt",
        },
        {
          id: "template-block-1",
          type: "argument",
          text: "debe contener un numero, una letra mayuscula y minuscula, minimo 1 caracter especial y debe tener un largo de 10 caracteres",
        },
      ],
      name: "Expresión regular",
    },
    {
      id: "template-2",
      blocks: [
        {
          id: "template-block-0",
          text: "Traduce esto:",
          type: "prompt",
        },
        {
          id: "template-block-1",
          type: "argument",
        },
        {
          id: "template-block-2",
          text: "a:",
          type: "prompt",
        },
        {
          id: "template-block-3",
          type: "argument",
        },
      ],
      name: "Traductor",
    },
    {
      id: "template-1",
      blocks: [
        {
          id: "template-block-0",
          text: "Condensa esto:",
          type: "prompt",
        },
        {
          id: "template-block-1",
          type: "argument",
        },
      ],
      name: "Condensar texto",
    },
    {
      id: "template-0",
      blocks: [
        {
          id: "template-block-0",
          text: "Genera una campaña publicitaria, como base:",
          type: "prompt",
        },
        {
          id: "template-block-1",
          type: "argument",
        },
        {
          id: "template-block-2",
          text: ". En los lugares donde consideres que va el contenido audiovisual escribe [material audiovisual]",
          type: "prompt",
        },
      ],
      name: "Marketer pro",
    },
  ];

  templates = mocks;
}

function newTemplate() {
  //   hacer que el div con id "form" aparezca
  document.getElementById("form").style.display = "block";
  //   hacer que el div con id "readonlyform" desaparezca
  document.getElementById("readonlyform").style.display = "none";
  //   limpiar el div con id "readonlyprompt"
  document.getElementById("readonlyprompt").innerHTML = "";
  //   limpiar el div con id "prompts"
  document.getElementById("prompts").innerHTML = "";
  //   limpiar el input con id "template-name"
  document.getElementById("template-name").value = "";
  //   crear un nuevo template vacío
  template = {
    id: "",
    blocks: [],
    name: "",
  };
}

function loadTemplate(id) {
  var div = document.getElementById("readonlyprompt");
  div.innerHTML = "";
  // hacer que el div con id "form" desaparezca
  document.getElementById("form").style.display = "none";
  //   hacer que el div con id "readonlyform" aparezca
  document.getElementById("readonlyform").style.display = "block";

  let temp = templates.find((template) => template.id === id);
  document.getElementById("template-name").value = temp.name;

  // create a title
  var title = document.createElement("h3");
  title.textContent = temp.name;
  div.appendChild(title);
  // agregar hr
  var hr = document.createElement("hr");
  hr.style.marginBottom = "20px";
  div.appendChild(hr);

  temp.blocks.forEach((block) => {
    if (block.type === "prompt") {
      createReadBlock(block);
    } else if (block.type === "argument") {
      createReadBlock(block, "argument");
    }
  });

  template = temp;
}

function createReadBlock(block, type = "prompt") {
  var div = document.getElementById("readonlyprompt");
  var blockElement;
  if (type !== "prompt") {
    blockElement = document.createElement("input");
    blockElement.id = block.id;
    blockElement.placeholder = "Argumento";
    blockElement.onchange = function () {
      block.text = this.value;
    };
    blockElement.textContent = "Argumento";
    blockElement.className = "ms-2 me-2 fs-5 input-prompt";
  } else {
    blockElement = document.createElement("span");
    blockElement.textContent = block.text;
    blockElement.className = PROMPT_BADGE_STYLE;
  }
  div.appendChild(blockElement);
}

function loadPromptBlock(block) {
  var div = document.getElementById("prompts");
  var input = document.createElement("input");
  input.id = prompt_block_name + "" + template.blocks.length;
  input.placeholder = "Prompt";
  input.className = "ms-2 me-2 fs-5 input-prompt";
  input.value = block.text;
  div.appendChild(input);
}

function addArgumentBlock() {
  // adds a new object to the blocks array
  template.blocks.push({
    id: prompt_block_name + "" + template.blocks.length,
    type: "argument",
  });
  addArgumentElement();
}

function addPromptBlock() {
  addPromptElement();
  let promptBlock = {
    id: prompt_block_name + "" + template.blocks.length,
    text: document.getElementById(
      prompt_block_name + "" + template.blocks.length
    ).value,
    type: "prompt",
  };
  template.blocks.push(promptBlock);
}

function addArgumentElement() {
  var div = document.getElementById("prompts");
  var argument = document.createElement("span");
  argument.textContent = "Argumento";
  argument.className = ARGUMENT_BADGE_STYLE;
  div.appendChild(argument);
}

function addPromptElement() {
  var div = document.getElementById("prompts");
  var input = document.createElement("input");
  input.id = prompt_block_name + template.blocks.length;
  input.placeholder = "Prompt";
  input.className = "input-prompt";
  div.appendChild(input);
}

function saveTemplate() {
  //   get each prompt block and add to the template object
  template.blocks.forEach((block) => {
    if (block.type === "prompt") {
      block.text = document.getElementById(block.id).value;
    }
  });

  template.name = document.getElementById("template-name").value;
  template.id = template_name + templates.length;
  createTemplateListElement(template);
  templates.push(template);

  console.log(template);

  // cargar el template que se acaba de crear
  loadTemplate(template.id);
}

function createTemplateListElement(template) {
  var ul = document.getElementById("templates");
  var li = document.createElement("li");
  li.id = template.id;
  li.onclick = loadTemplate.bind(this, template.id);
  li.className = "template-item-list";
  li.textContent = template.name;
  ul.appendChild(li);
}

function generate() {
  // hacer que el div con id "generate-btn" desaparezca
  document.getElementById("generate-btn").style.display = "none";
  // hacer que el div con id "spiner" apareza
  document.getElementById("spiner").style.display = "block";

  // variable que tiene el texto de cada uno de los bloques del template concatenados
  let text = "";
  // recorrer cada bloque del template
  template.blocks.forEach((block) => {
    text += block.text + " ";
  });

  // eliminar el ultimo espacio
  text = text.substring(0, text.length - 1);

  // hacer una peticion a "http://localhost:3000/gpt" con el texto concatenado el body {prompt: text} esperar la respuesta y mostrarla en el div con id "output"
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    prompt: text,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/gpt", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      document.getElementById("output").innerText = JSON.parse(result).message;
    })
    .catch((error) => console.log("error", error))
    .finally(() => {
      // hacer que el div con id "spiner" desaparezca
      document.getElementById("spiner").style.display = "none";
      // hacer que el div con id "generate-btn" aparezca
      document.getElementById("generate-btn").style.display = "block";
    });
}
