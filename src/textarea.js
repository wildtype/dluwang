export default class Textarea {
  constructor(options) {
    this.active = false;
    this.container = options.container;
    this.parser = options.parser;

    this.parentElement = undefined;
    this.editableSlug = undefined;

    this.element = this.container.querySelector('textarea#editor__textarea');

    this.bindAutoGrow();
    this.bindKeys();
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
    this.editableSlug = this.parentElement.dataset.title;

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

    this.parser.parse(this.parentElement, value);
    this.element.value = '';
    this.active = false;
    window.location = `#/page/${this.editableSlug}`;
  }
}
