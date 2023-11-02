// Create web server
// 1. Create a web server
// 2. Handle request and response
// 3. Return response
// 4. Start server
// 5. Test request

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const app = http.createServer((req, res) => {
    const _url = req.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', (err, filelist) => {
                const title = 'Welcome';
                const description = 'Hello, Node.js';
                const list = templateList(filelist);
                const template = templateHTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
                res.writeHead(200);
                res.end(template);
            });
        } else {
            fs.readdir('./data', (err, filelist) => {
                const filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
                    const title = queryData.id;
                    const list = templateList(filelist);
                    const template = templateHTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
                    <form action="/delete_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <input type="submit" value="delete">
                    </form>`);
                    res.writeHead(200);
                    res.end(template);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', (err, filelist) => {
            const title = 'WEB - create';
            const list = templateList(filelist);
            const template = templateHTML(title, list, `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p><textarea name="description" id="" cols="30" rows