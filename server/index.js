const express = require('express');
const cors = require('cors');
const app = express();
const users = require('./routes/users.js');
const projects = require('./routes/projects.js');
const user_stories = require('./routes/user_stories.js');

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 5000);


//User CRUD action routes
app.get('/user/:id', users.find);
app.post('/user', users.create);
app.put('/user/:id', users.update);
app.delete('/user/:id', users.remove);


//Project CRUD action routes
app.get('/project/:id', projects.find);
app.post('/project', projects.create);
app.put('/project/:id', projects.update);
app.delete('/project/:id', projects.remove);


//User story CRUD action routes
app.get('/story/:id', user_stories.find);
app.post('/story', user_stories.create);
app.put('/story/:id', user_stories.update);
app.delete('/story/:id', user_stories.remove);



app.listen(app.settings.port, function() {
  console.log('Server is running on port 5000. Press CTRL+C to stop server')
});
