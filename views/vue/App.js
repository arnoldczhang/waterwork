const Vue = require('vue');

module.exports = () => {
  return new Vue({
    template: `
      <div id="container">
        <style>
          body {
            overflow:hidden;
          }
          #container {
            background-image:url(/images/bk2.png);
            background-size: contain;
            background-repeat: no-repeat;
            background-position-x: 100%;
            background-color: rgb(242, 242, 237);
          }
        </style>
        <header></header>
        <article id="app"></article>
        <footer></footer>
      </div>
    `,
  });
};