import app from './server';

// Start Server
app.listen(app.get('port'), () => {
    console.log(`App listening at http://localhost:${app.get('port')}`);
});