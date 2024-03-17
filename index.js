const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000; //what port 2 use - from system variable OR 3000

const app = express(); //creating application object
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) //engine for pages rendering
app.set('view engine', 'hbs')
app.set('views', 'views') //setting a folder for views

app.use(express.urlencoded({ extended:true })) //adding the middleware
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect('', { //paste the needed stuff to connect to db
            useNewUrlParcer: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server has been started!')    
        }) //starting the server
    } catch (e) {
        console.log(e)
    }
}

start()
