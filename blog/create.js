const fs = require('fs');
const path = require('path');
const showdown = require('showdown');

const converter = new showdown.Converter();
const postsFolder = './blog/posts'; // run from root

fs.readdir(postsFolder, (err, files) => {
    if (err) {
        console.error('Error reading posts folder:', err);
        return;
    }

    let blog = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>einar | Blog</title>
        <link rel="stylesheet" href="styles.css">
        <link rel="icon" href="assets/monk.jpg">
    </head>
    <body>
        <article>
            <header>
                <div class="blog-header">
                    <h1>word vomit</h1>
                    <img src="./assets/thumbup.jpg" alt="thumb up">
                </div>
                <p>by einar</p>
            </header>
    `;

    files.forEach((file) => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(postsFolder, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let html = converter.makeHtml(fileContent);

            const htmlFileName = path.basename(file, path.extname(file)) + '.html';
            const htmlFilePath = path.join(postsFolder, htmlFileName);
            const articleName = fileContent.split('\n')[0].slice(1);

            html = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>einar | ${articleName}</title>
                    <link rel="stylesheet" href="../../styles.css">
                    <link rel="icon" href="assets/monk.jpg">
                </head>
                <body>
                    <article>` + 
                        html + 
                    `</article>
                </body>
            </html>`;

            fs.writeFileSync(htmlFilePath, html);
            console.log(`Generated ${htmlFileName}`);

            const post = `
            <div class="blog-post" onclick="window.location.href='./blog/posts/${htmlFileName}'">
                <h2>${articleName}</h2>
                <p>${fileContent.split('\n')[1]}</p>
            </div>`;

            blog += post;
        }
    });

    blog += `
        </article>
    </body>
    </html>`;
    fs.writeFileSync('./blog.html', blog);



});



