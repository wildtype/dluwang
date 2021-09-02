import Textarea from './textarea';
import Router from './router.ts';
import Parser from './parser.ts';

window.addEventListener("beforeunload", (event) => {
  const confirmationMessage = "Dont go";
  event.returnValue = confirmationMessage;
});

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

  window.addEventListener('popstate', router.routeTo);
}

document.addEventListener('DOMContentLoaded', main);
