import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["OPENAI_API_KEY"] || "";
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4o-mini";

export async function aiGenerate(prompt: string) {

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: 'system', content: 'You are a helpful assistant that helps users plan their day effectively with the prompt user will provide their task that what they want to do and you will generate the best schedule for them.' },
        { role: 'user', content: prompt },
      ],
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
  return response.body.choices[0].message.content;
}

export const revampTheResponse = async (response: string) => {
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );

  const revampResponse = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: 'system', content: 'You are a helpful assistant that helps users to make the response more structured to store in the db' },
        { role: 'user', content: `Revamp this response in the form of json where each time will have these fields {time: time, task: task, tips: tips,} if anything else then that so that it become easy for me to store it in the database: ${response}` },
      ],
      model: model
    }
  });

  if (isUnexpected(revampResponse)) {
    throw revampResponse.body.error;
  }

  console.log(revampResponse.body.choices[0].message.content);
  return revampResponse.body.choices[0].message.content;
}