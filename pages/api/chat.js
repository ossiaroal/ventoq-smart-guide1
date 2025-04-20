import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message } = req.body;

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: '你是一个名叫VENTOQ智能客服的助手，专门回答关于智能香薰机的使用、香味推荐、常见问题等问题。请用简洁、亲切的中文回答。' },
      { role: 'user', content: message },
    ],
  });

  res.status(200).json({ reply: response.data.choices[0].message.content });
}
