# node-github-pages

Convert your Node.js project to static pages for GitHub Pages(Of course you can use it on other platforms.). 

You don't have to learn about new rules, statements, or languages. Just install this library, and add some codes, done! 

You can generate static pages without changing the template engine you are using such as ```ejs, pug(jade)```...

**Currently it is only made for ```Express```.**



## Updates and TODO

### 0.1.0
> Generate static pages.

> Specify directory to generate.

> Copy static files such as css, js to the output directory

### TODO

> Remove the output directory if it is not empty(Optional).

> Detects changes to specified files and automatically renders them(Optional).

> Works in non-Express environments.


## How to use

### Install

```sh
npm install node-github-pages --save
```

### Code

```javascript
var pages = require("node-github-pages")(app, {
  static: "public", // Static directory path(css, js...)
  path: "docs" // Output path
});
pages.renderFiles([{
  "view": "index",
  "url": "",
  "options": { title: "Express" }
},
{
  "view": "second",
  "url": "/second",
  "options": { title: "second page" }
},
.
.
.
]);
```
