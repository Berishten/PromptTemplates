(async ()=>{
    var openaiAPI = require('openai');
const OPENAI_API_KEY = "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";

const configuration = new openaiAPI.Configuration({
    organization: "org-QXysP29vlNgG7Qjf2AVA352G",
    apiKey: OPENAI_API_KEY,
});
const openai = new openaiAPI.OpenAIApi(configuration);
// const response = await openai.listEngines();

const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/gpt', async function (req, res) {
    const response = await openai.createCompletion({
        model: "ada",
        prompt: req.body.prompt,
        temperature: 0.5,
        n: 1,
        stream: false,
        stop: ["\n", req.body.prompt]
    });

    res.send({
        message: response.data.choices[0].text
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

})()