import Textarea from './textarea';

document.addEventListener('DOMContentLoaded', () => {
  const textarea = new Textarea();
  const main = document.getElementById('main');

  document.addEventListener('keydown', (e) => {
    if (e.key === "i" && !textarea.active) {
      textarea.activate(main);
    }
  });
});
