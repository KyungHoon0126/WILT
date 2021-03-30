const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const app = express();

const mongoose = require('mongoose');

// public 디렉터리 밑에 있는 데이터들은 웹브라우저의 요청에 따라 서비스 제공. 
// pulbic 디렉터리에 저장된 파일만을 제공.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', require('./routes'));

// Promise : 콜백 중첩 완화를 위해 사용
// Node.js의 Native Promise 사용
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

app.listen(config.port, () => {
    console.log(`Server is running at port ${config.port}`)
});