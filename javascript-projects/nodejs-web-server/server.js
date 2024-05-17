const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const {method, url} = request;

    // if(method === 'GET'){
    //     response.end('<h1>Hello!</h1>');
    // }

    // if(method === 'POST'){
    //     let body = [];

    //     request.on('data',(chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const {name} = JSON.parse(body);
    //         response.end(`<h1>Hai, ${name}!</h1>`);
    //     });
    // }

    if(url === '/'){
        // Todo 2: logika respon bila url bernilai '/'
        if(method === 'GET'){
            // response bila client menggunakan GET
            response.end('<h1>Ini adalah homepage</h1>');
        } else{
            // response bila client tidka mengggunakan GET
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request </h1>`);
        }
    }else if(url === '/about'){
        // Todo 3: logika repson bila url bernilai '/about'
            if(method === 'GET'){
                // response bila client menggunakan GET
                response.end('<h1>Halo! ini adalah halaman about</h1>')
            } else if(method === 'POST'){
                // response bile client menggunakan POST
                let body = [];

                request.on('data', (chunk) => {
                    body.push(chunk);
                });

                request.on('end', () => {
                    body =  Buffer.concat(body).toString();
                    const {name} = JSON.parse(body);
                    response.end(`<h1>Halo, ${name}! ini adalah halaman about</h1>`)
                });
            }else{
                // response bile client tidak menggunakan GET ataupun POST
                response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`)
            }
    } else {
        // Todo 1: logika repsons bila url bukan '/' atau '/about'
        response.end('<h1>Halaman tidak ditemukan !</h1>');
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

// sukses diambil ke pc windows 11