// модуль для работы с файлами
const fs = require('fs');

// модуль ОС, символ перевода строки
const eol = require('os').EOL;


const nodemailer = require('nodemailer');

//чтение файла в синхронном варианте
let data = fs.readFileSync('hello.txt', 'utf8');
console.log(data);

//запись файла в синхронном варианте, полностью перезаписывают файл
fs.writeFileSync('hello.txt', 'Hi I am Alex!')
data = fs.readFileSync('hello.txt', 'utf8');
console.log(data);

//дозаписать файл в синхронном варианте
fs.appendFileSync('hello.txt', eol+'I add string in the end of file');
data = fs.readFileSync('hello.txt', 'utf8');
console.log(data);

//отправка почты
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aleksandr.romanko.dev@gmail.com',
    pass: '********'
  }
});

let mailOptions = {
  from: 'aleksandr.romanko.dev@gmail.com',
  to: 'qwerty3088@gmail.com',
  subject: 'Sending Email using Node.js',
  text: data
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
