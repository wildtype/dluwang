import Textarea from './textarea';
import Router from './router.ts';
import Parser from './parser.ts';

window.addEventListener("beforeunload", (event) => {
  const confirmationMessage = "Dont go";
  event.returnValue = confirmationMessage;
});

function main() {
  const mainArticle = document.getElementById('main');
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
      window.location = '#/edit/';
    }
  });

  router.route('edit', () => {
    textarea.activate(mainArticle)
  });
  
  router.route('page', () => {
    const addr = window.location;
    const pagePart = addr.hash;
    const matching = pagePart.match(/^#\/.*?\/(.*)/);
    const pageTitle = matching[1];
    
    console.log('Routeing to page page', matching[1])
    
    if (pageTitle) {
      const page = document.querySelector(`[data-title="${matching[1]}"]`);
      if (page) page.classList.remove('hide');
    }
  });

  window.addEventListener('popstate', router.routeTo.bind(router));
}

document.addEventListener('DOMContentLoaded', main);
