import creole from 'npm-creole';

export default class Textarea {
  constructor() {
    this.active = false;
    this.parentElement = undefined;

    this.element = this.buildElement();
    this.bindAutoGrow();
    this.bindKeys();

    this.creoleParser = new creole({
      interwiki: {
        wp: 'https://en.wikipedia.org/wiki/',
        c2: 'https://wiki.c2.com/?'
      },
      linkFormat: '#/?page='
    });
  }

  buildElement() {
    const textarea = document.createElement('textarea');
    textarea.rows = 1;
    return textarea;
  }

  bindAutoGrow() {
    this.element.addEventListener('input', e => {
      this.autoGrow();
    });
  }

  autoGrow() {
    this.element.style.height = 'auto';

    const height = `${this.element.scrollHeight - 28}px`;
    this.element.style.height = height;
  }

  bindKeys() {
    this.element.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.deactivate();
      }
    });
  }

  activate(parentElement) {
    this.active = true;
    this.parentElement = parentElement;

    parentElement.innerHTML = '';
    this.element.value = parentElement.dataset.source || '';
    parentElement.appendChild(this.element);

    setTimeout(() => {
      this.autoGrow();
      this.element.focus();
    }, 50);
  }

  deactivate() {
    const value = this.element.value;
    this.parentElement.dataset.source = value;
    this.parentElement.removeChild(this.element);
    this.parentElement.innerHTML = '';

    this.creoleParser.parse(this.parentElement, value);
    this.element.value = '';
    this.active = false;
  }
}
