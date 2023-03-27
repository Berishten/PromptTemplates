(async () => {
  var openaiAPI = require("openai");
  const OPENAI_API_KEY = "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";

  const configuration = new openaiAPI.Configuration({
    organization: "org-QXysP29vlNgG7Qjf2AVA352G",
    apiKey: OPENAI_API_KEY,
  });
  const openai = new openaiAPI.OpenAIApi(configuration);
  // const response = await openai.listEngines();
  // use cors
  const cors = require("cors");

  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");

  app.use(bodyParser.json());
  app.use(cors());

  app.post("/gpt", async function (req, res) {
    let txt = String(req.body.prompt);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: txt },
      ]
    });

    console.log("DATA:", response.data.choices);
    console.log("P:", req.body.prompt);
    console.log("R:", response.data.choices[0].message.content);
    res.send({
      message: response.data.choices[0].message.content,
    });
  });

  app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
})();
