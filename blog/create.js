const fs = require('fs');
const path = require('path');
const showdown = require('showdown');

const converter = new showdown.Converter();
const rootDir = path.resolve(__dirname, '..');
const postsFolder = path.join(__dirname, 'posts');
const blogHtmlPath = path.join(rootDir, 'blog.html');

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

    const mdFiles = files.filter((file) => path.extname(file) === '.md');
    mdFiles.sort((a, b) => {
        const getLeadingNumber = (name) => {
            const match = name.match(/^(\d+)/);
            return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
        };
        return getLeadingNumber(b) - getLeadingNumber(a);
    });

    const tilFilePattern = /(^|-)til(-|$)/i;
    const tilPosts = [];
    const regularPosts = [];

    mdFiles.forEach((file) => {
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

        fs.writeFileSync(htmlFilePath, html); // create html file for post
        console.log(`Generated ${htmlFileName}`);

        // add link to post to blog page
        const post = `
            <div class="blog-post" onclick="window.location.href='./blog/posts/${htmlFileName}'">
                <h2>${articleName}</h2>
                <p>${fileContent.split('\n')[1]}</p>
            </div>`;

        const slug = path.basename(file, path.extname(file));
        if (tilFilePattern.test(slug)) {
            tilPosts.push(post);
        } else {
            regularPosts.push(post);
        }
    });

    blog += `
            <details class="blog-dropdown">
                <summary>today I learned</summary>
                <div class="blog-dropdown-content">
                    ${tilPosts.join('\n')}
                </div>
            </details>`;

    blog += regularPosts.join('\n');

    blog += `
        </article>
    </body>
    </html>`;
    fs.writeFileSync(blogHtmlPath, blog);



});



