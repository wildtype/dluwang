import creole from 'npm-creole';

export default class Textarea {
  constructor(options) {
    this.active = false;
    this.container = options.container;

    this.parentElement = undefined;

    this.element = this.buildElement();
    this.container.appendChild(this.element);

    this.bindAutoGrow();
    this.bindKeys();

    this.creoleParser = new creole({
      interwiki: {
        wp: 'https://en.wikipedia.org/wiki/',
        c2: 'https://wiki.c2.com/?'
      },
      linkFormat: '#/page/'
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
    const initialDocumentPosition = document.documentElement.scrollTop;

    this.element.style.height = 'auto';

    const height = `${this.element.scrollHeight - 28}px`;
    this.element.style.height = height;

    document.documentElement.scrollTop = initialDocumentPosition;
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

    parentElement.classList.add('hide');
    this.element.value = parentElement.dataset.source || '';
    this.container.classList.remove('hide');

    setTimeout(() => {
      this.autoGrow();
      this.element.selectionStart = 0;
      this.element.selectionEnd = 0;
      this.element.focus();
    }, 50);
  }

  deactivate() {
    const value = this.element.value;
    this.parentElement.dataset.source = value;
    this.parentElement.innerHTML = '';
    this.container.classList.add('hide');

    this.creoleParser.parse(this.parentElement, value);
    this.parentElement.classList.remove('hide')
    this.element.value = '';
    this.active = false;
  }
}
