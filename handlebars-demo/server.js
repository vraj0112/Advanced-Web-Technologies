const express = require('express');
const exhbs = require('express-handlebars');

const app = express();

app.engine('hbs',exhbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine','hbs');

app.get('/signin',function(req,res){
    res.render('signin',
        {
            username: 'Vraj Shah',
            password: 'Vraj Shah',
            signin: 'Sign In'
        }
    );
    
});

app.get('/',(req,res)=>{
    res.redirect('/signin');
});

app.get('/signup',function(req,res){
    res.render('signup',
        {
            username: 'Vraj Shah',
            password: 'Vraj Shah',
            confirmpassword: 'Vraj Shah',
            signup: 'Sign Up'
        }
    );
});

app.listen(8000, ()=>{
    console.log('Server Listening on port 8000');
});
