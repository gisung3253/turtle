require('dotenv').config();
const express = require('express');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai'); // 올바른 순서로 모듈 불러오기
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); // images 폴더를 정적 경로로 설정


// OpenAI API 설정
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  // OpenAI 챗봇 엔드포인트
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
  
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant for "언어와 읽기 도우미".' },
            { role: 'user', content: message },],
      });
  
      const reply = response.data.choices[0].message.content;
      res.json({ reply });
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'An error occurred with the AI.' });
    }
  });

// 라우트 설정
app.get('/', (req, res) => {
  res.render('intro1');
});

app.get('/intro2', (req, res) => {
  res.render('intro2');
});

app.get('/intro3', (req, res) => {
  res.render('intro3');
});

app.get('/intro4', (req, res) => {
  res.render('intro4');
});

app.get('/enroll/login1', (req, res) => {
  res.render('enroll/login1');
});

app.get('/enroll/login2', (req, res) => {
  res.render('enroll/login2');
});

app.get('/main/main1', (req, res) => {
  res.render('main/main1', { page: 'home' });
});

app.get('/main/main2', (req, res) => {
  res.render('main/main2', { page: 'community' });
});

app.get('/main/main3', (req, res) => {
  res.render('main/main3', { page: 'profile' });
});

app.get('/chat/chat1', (req, res) => {
    const initialMessage = "안녕하세요 저는 언어와 읽기 도우미에요! 공부하다가 궁금한 점이 있으면 물어봐주세요.";
    res.render('chat/chat1', { initialMessage });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
