const express = require('express');
const cors = require('cors');
const users = require('./routes/users.js');
const app = express();

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 5000);

app.get('/user/:id', users.find);
app.post('/user', users.create);
app.put('/user/:id', users.update);
app.delete('/user/:id', users.remove);

app.listen(app.settings.port, function() {
  console.log('Server is running on port 5000. Press CTRL+C to stop server')
});
