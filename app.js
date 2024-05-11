const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// URL подключения к MongoDB
mongoose.connect('mongodb://localhost:27017/myUniversityDB', { useNewUrlParser: true })
     .then(() => console.log('Connected to MongoDB...'))
     .catch(err => console.error('Could not connect to MongoDB...', err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database.');
});

app.use(express.static('public'));
const port = 3000;
app.set('view engine', 'ejs'); // Указание EJS в качестве шаблонизатора
app.set('views', path.join(__dirname, 'views')); // Установка пути к папке с шаблонами

app.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Университет - Главная' });
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'Университет - Об университете' });
});


// Определение схемы для курсов
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String 
});

const Course = mongoose.model('Course', courseSchema);
let courses=[];
function addCourses(){
  courses=[
  {
    title:'Информационная безопасность',
    description:'Эта программа обучения предназначена для студентов, которые интересуются защитой информации и данных от киберугроз. Студенты изучают различные аспекты информационной безопасности, включая криптографию, сетевую безопасность, углубленный анализ кибератак и методы обеспечения защиты данных. Выпускники этой программы способны разрабатывать и внедрять стратегии защиты информации для организаций и компаний.',
    duration: '1 год' 
  },
  {
    title:'Искусственный интеллект и машинное обучение',
    description:'Эта программа обучения предоставляет студентам знания и навыки, необходимые для работы с искусственным интеллектом и машинным обучением. Студенты изучают методы обучения машин, разработку алгоритмов и технологий искусственного интеллекта, а также их применение в различных сферах, от медицины до финансов. Выпускники этой программы востребованы на рынке труда и могут претендовать на позиции ведущих специалистов в области искусственного интеллекта.',
    duration: '2 года' 
  },
  {
    title:'Разработка программного обеспечения',
    description:'Эта программа обучения предназначена для студентов, желающих стать профессиональными разработчиками программного обеспечения. Студенты изучают различные языки программирования, методы разработки программ, тестирование и оптимизацию программного обеспечения. Выпускники этой программы обладают навыками, необходимыми для создания качественного и инновационного программного обеспечения.',
    duration: '3 года' 
  }
  ];
}
addCourses();
Course.insertMany(courses)
.then(() => console.log('Курсы успешно сохранены'))
.catch(err => console.error('Ошибка при сохранении:', err));
app.get('/courses', function(req, res) {
  Course.find({})
    .then(courses => {
      // Рендер содержимого в строку и передача в main.ejs
      res.render('courses-content', { courses: courses }, (err, html) => {
        if (err) {
          console.error(err);
          res.status(500).send('Ошибка при рендеринге страницы курсов.');
        } else {
          // Передача сгенерированного HTML в main.ejs
          res.render('layouts/main', {
            pageTitle: 'Университет - Курсы',
            content: html
          });
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Ошибка при чтении из базы данных');
    });
});
const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new FeedbackModel({ name, email, message });
    await feedback.save();
    
    res.send('Спасибо за ваш отзыв!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при отправке отзыва.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});