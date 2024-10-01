require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }
  
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  
  res.json(fileInfo);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
