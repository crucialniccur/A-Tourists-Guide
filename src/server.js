const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://crucialniccur.github.io'); // Updated with your GitHub Pages URL
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

server.listen(process.env.PORT || 5000, () => {
    console.log('JSON Server is running');
});
