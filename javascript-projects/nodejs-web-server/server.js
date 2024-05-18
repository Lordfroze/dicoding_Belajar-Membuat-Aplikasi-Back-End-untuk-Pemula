const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/html');
    response.setHeader('Powered-By', 'Node.js');
    
    const {method, url} = request;

    if(url === '/'){
        // Todo 2: logika respon bila url bernilai '/'
        if(method === 'GET'){
            // response bila client menggunakan GET
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        } else{
            // response bila client tidka mengggunakan GET
            response.statusCode = 400;
            response.end(JSON.stringify({
                message:`Halaman tidak dapat diakses dengan ${method} request`,
            }));

        }
    }else if(url === '/about'){
        // Todo 3: logika repson bila url bernilai '/about'
            if(method === 'GET'){
                // response bila client menggunakan GET
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: 'Halo! ini adalah halaman about',
                }));
            } else if(method === 'POST'){
                // response bile client menggunakan POST
                let body = [];

                request.on('data', (chunk) => {
                    body.push(chunk);
                });

                request.on('end', () => {
                    body =  Buffer.concat(body).toString();
                    const {name} = JSON.parse(body);
                    response.statusCode = 200;
                    response.end(JSON.stringify({
                        message: `Halo, ${name}! ini adalah halaman about`,
                    }));
                });
            }else{
                // response bile client tidak menggunakan GET ataupun POST
                response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`)
                response.end(JSON.stringify({
                    message: `Halaman tidak dapat diakses menggunakan ${method} request`,
                }));
            }
    } else {
        // Todo 1: logika repsons bila url bukan '/' atau '/about'
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});