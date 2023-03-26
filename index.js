const prompt_block_name = "template-block-";
const template_name = "template-";

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
      id: "template-0",
      blocks: [
        {
          id: "template-block-0",
          text: "Desde",
          type: "prompt",
        },
        {
          id: "template-block-1",
          type: "argument",
        },
        {
          id: "template-block-2",
          text: "hasta",
          type: "prompt",
        },
        {
          id: "template-block-3",
          type: "argument",
        },
      ],
      name: "Distancia",
    },
    {
      id: "template-1",
      blocks: [
        {
          id: "template-block-0",
          text: "Redacta un cuento con los siguientes generos",
          type: "prompt",
        },
        {
          id: "template-block-1",
          type: "argument",
        },
        {
          id: "template-block-2",
          text: "y firma al final como",
          type: "prompt",
        },
        {
          id: "template-block-3",
          type: "argument",
        },
      ],
      name: "Redactor de cuentos",
    },
    {
      id: "template-2",
      blocks: [
        {
          id: "template-block-0",
          text: "Toma esta tabla",
          type: "prompt",
        },
        {
          id: "template-block-1",
          type: "argument",
        },
        {
          id: "template-block-2",
          text: "y genera un reporte de",
          type: "prompt",
        },
        {
          id: "template-block-3",
          type: "argument",
        },
        {
          id: "template-block-4",
          text: "No agregar firma",
          type: "prompt",
        },
      ],
      name: "Generador de reportes",
    },
  ];

  templates = mocks;
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
  var title = document.createElement("h1");
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

  //   var div = document.getElementById("prompts");
  //   div.innerHTML = "";
  //   temp.blocks.forEach((block) => {
  //     if (block.type === "prompt") {
  //       loadPromptBlock(block);
  //     } else if (block.type === "argument") {
  //       addArgumentElement();
  //     }
  //   });
}

function createReadBlock(block, type = "prompt") {
  var div = document.getElementById("readonlyprompt");
  var blockElement;
  if (type !== "prompt") {
    blockElement = document.createElement("input");
    blockElement.textContent = "Argumento";
    blockElement.className = "badge argument-badge";
  } else {
    blockElement = document.createElement("span");
    blockElement.textContent = block.text;
    blockElement.className = "badge prompt-badge";
  }
  div.appendChild(blockElement);
}

function loadPromptBlock(block) {
  var div = document.getElementById("prompts");
  var input = document.createElement("input");
  input.id = prompt_block_name + "" + template.blocks.length;
  input.placeholder = "Prompt";
  input.className = "input-prompt";
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
  argument.className = "label-badge";
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

// esta funcion toma un string y hace una peticion a "localhost:3000/gpt", cuando recibe la respuesta la imprime en el elemento con id "output"
function generate(text) {
  fetch("http://localhost:3000/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("output").innerHTML = data.text;
    });
}
