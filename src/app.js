import Textarea from './textarea';
import Router from './router.ts';
import Parser from './parser.ts';

window.addEventListener("beforeunload", (event) => {
  const confirmationMessage = "Dont go";
  event.returnValue = confirmationMessage;
});

Element.prototype.addEventListenerToChild = function(evName, chSelector, callback) {
  this.addEventListener(evName, (event) => {
    if (event.target.matches(chSelector)) {
      callback(event);
    }
  });
};

function main() {
  const main = document.getElementById('main');
  const editor = document.getElementById('editor');
  const parser = new Parser({
    interwiki: {
      wp: 'https://en.wikipedia.org/wiki/',
      c2: 'https://wiki.c2.com/?'
    },
    linkFormat: '#/page/'
  });

  const textarea = new Textarea({ container: editor, parser: parser });
  const router = new Router();

  document.addEventListener('keydown', (e) => {
    if (e.key === "i" && !textarea.active) {
      textarea.activate(main);
    }
  });

  main.addEventListenerToChild('click', 'a[href^="#/page/"]', (event) => {
    console.log('Mengunjungi halaman', event.target.textContent);
    router.route(event.target.href);
  });
}

document.addEventListener('DOMContentLoaded', main);
