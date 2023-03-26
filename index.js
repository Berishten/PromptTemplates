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
  //   addFirstPromptElement();
  //   addPromptElement();

  loadMocks();

  loadTemplateList();
}

function loadTemplateList() {
  templates.forEach((template) => {
    createTemplateListElement(template);
  });
}

function loadMocks() {
  mocks = [];

  templates = mocks;
}

function loadTemplate(id) {
  let temp = templates.find((template) => template.id === id);
  console.log(id, temp);

  // set template name
  document.getElementById("template-name").value = temp.name;

  var div = document.getElementById("prompts");
  div.innerHTML = "";
  temp.blocks.forEach((block) => {
    if (block.type === "prompt") {
      loadPromptBlock(block);
    } else if (block.type === "argument") {
      addArgumentElement();
    }
  });
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
  template.name = template_name;
  template.blocks[0].text = document.getElementById(
    prompt_block_name + "0"
  ).value;
  template.blocks[0].id = prompt_block_name + "0";
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
