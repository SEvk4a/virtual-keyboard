export default class Keys {
  constructor(array) {
    this.elements = {
      board: null,
      textarea: null,
      keys: array,
    };

    this.typeKeys = localStorage.getItem('language');
    this.pressButton = true;
  }

  render() {
    this.renderHtmlContent();
    this.renderKeys('dataru');
    this.handleLanguageEvent();
  }

  renderHtmlContent() {
    const body = document.body;

    const htmlContent = document.createElement('div');
    htmlContent.classList.add('container');

    htmlContent.innerHTML = `   
                               <h1>RSS Виртуальная клавиатура</h1>
                                 <textarea id=#textarea cols="30" rows="10" autofocus></textarea>
                                   <div class="board"></div>
                                   <p>Клавиатура создана в операционной системе Windows</p>
                                   <p>Для переключения языка комбинация: левыe ctrl + alt</p>
                                   `;
    body.append(htmlContent);

    this.elements.board = document.querySelector('.board');
    this.elements.textarea = document.getElementById('#textarea');
  }

  renderKeys() {
    this.elements.board.innerHTML = '';
    for (let i = 0; i < this.elements.keys.length; i++) {
      const keysRow = document.createElement('div');
      keysRow.classList.add('keys-row');

      this.elements.board.append(keysRow);

      for (let j = 0; j < this.elements.keys[i].length; j++) {
        const keyButton = document.createElement('div');
        keyButton.classList.add('key-button');
        keyButton.classList.add(`${this.elements.keys[i][j].dataeng}`.toLowerCase());

        if (this.typeKeys === 'dataru') {
          keyButton.setAttribute('keyname', this.elements.keys[i][j].dataru);
          keyButton.innerHTML = `${this.elements.keys[i][j].dataru}`;
        } else if (this.typeKeys === 'shiftedRu') {
          keyButton.setAttribute('keyname', this.elements.keys[i][j].dataru);
          if (this.elements.keys[i][j].shiftedRu) {
            keyButton.innerHTML = `${this.elements.keys[i][j].shiftedRu}`;
          } else {
            keyButton.innerHTML = `${this.elements.keys[i][j].dataru}`;
          }
        } else if (this.typeKeys === 'shiftedEng') {
          keyButton.setAttribute('keyname', this.elements.keys[i][j].dataeng);
          if (this.elements.keys[i][j].shiftedEng) {
            keyButton.innerHTML = `${this.elements.keys[i][j].shiftedEng}`;
          } else {
            keyButton.innerHTML = `${this.elements.keys[i][j].dataru}`;
          }
        } else if (this.typeKeys === 'dataeng') {
          keyButton.setAttribute('keyname', this.elements.keys[i][j].dataeng);
          keyButton.innerHTML = `${this.elements.keys[i][j].dataeng}`;
        } else if (this.typeKeys === 'capslockEng') {
          keyButton.setAttribute('keyname', this.elements.keys[i][j].dataeng);
          if (this.elements.keys[i][j].capsLockEng) {
            keyButton.innerHTML = `${this.elements.keys[i][j].capsLockEng}`;
          } else {
            keyButton.innerHTML = `${this.elements.keys[i][j].dataeng}`;
          }
        } else if (this.typeKeys === 'capslockRu') {
          keyButton.setAttribute('keyname', this.elements.keys[i][j].dataru);
          if (this.elements.keys[i][j].capsLockRu) {
            keyButton.innerHTML = `${this.elements.keys[i][j].capsLockRu}`;
          } else {
            keyButton.innerHTML = `${this.elements.keys[i][j].dataru}`;
          }
        }

        keysRow.append(keyButton);
      }
    }

    this.handleAllKeysEvents();
    this.handleAllClickEvents();
  }

  handleLanguageEvent() {
    window.addEventListener('keydown', (e) => {
      if ((e.key === 'Control' && e.altKey) || (e.key === 'Alt' && e.ctrlKey)) {
        if (this.typeKeys === 'dataru') {
          this.typeKeys = 'dataeng';
          localStorage.setItem('language', 'dataeng');
        } else {
          this.typeKeys = 'dataru';
          localStorage.setItem('language', 'dataru');
        }
        setTimeout(() => {
          this.renderKeys();
        }, 100);
      } else if (e.key === 'CapsLock') {
        if (this.typeKeys === 'dataru') {
          this.typeKeys = 'capslockRu';
        } else if (this.typeKeys === 'dataeng') {
          this.typeKeys = 'capslockEng';
        } else if (this.typeKeys === 'capslockEng') {
          this.typeKeys = 'dataeng';
        } else if (this.typeKeys === 'capslockRu') {
          this.typeKeys = 'dataru';
        }
        setTimeout(() => {
          this.renderKeys();
        }, 100);
      } else if (e.key === 'ArrowUp') {
        this.elements.textarea.value += '▲';
      } else if (e.key === 'ArrowDown') {
        this.elements.textarea.value += '▼';
      } else if (e.key === 'ArrowLeft') {
        this.elements.textarea.value += '◄';
      } else if (e.key === 'ArrowRight') {
        this.elements.textarea.value += '►';
      }
    });
  }

  handleAllKeysEvents() {
    const htmlKeys = document.querySelectorAll('.key-button');
    const spaceButton = document.querySelector('.space');
    const winButton = document.querySelector('.win');

    document.addEventListener('keydown', (e) => {
      console.log(e.key);
      for (let i = 0; i < htmlKeys.length; i++) {
        if (e.key.toLowerCase() === htmlKeys[i].getAttribute('keyname').toLowerCase()) {
          htmlKeys[i].classList.add('active');
        }
      }

      if (e.key === ' ') {
        spaceButton.classList.add('active');
      } else if (e.key === 'Meta') {
        winButton.classList.add('active');
      }
    });

    document.addEventListener('keyup', (e) => {
      for (let i = 0; i < htmlKeys.length; i++) {
        if (e.key.toLowerCase() === htmlKeys[i].getAttribute('keyname').toLowerCase()) {
          htmlKeys[i].classList.remove('active');
        }
      }

      if (e.key === ' ') {
        spaceButton.classList.remove('active');
      } else if (e.key === 'Meta') {
        winButton.classList.remove('active');
      }
    });
  }

  handleAllClickEvents() {
    const htmlKeys = document.querySelectorAll('.key-button');
    const textarea = this.elements.textarea;
    const shiftButton = document.querySelectorAll('.shift');

    htmlKeys.forEach((key) => {
      key.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.target.classList.add('active');
        setTimeout(() => {
          e.target.classList.remove('active');
        }, 100);

        if (e.target.innerHTML === 'Backspace') {
          textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd);
        } else if (e.target.innerHTML === 'Enter') {
          textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd);
          textarea.selectionStart += 1;
        } else if (e.target.innerHTML === 'Delete') {
          textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1);
        } else if (e.target.innerHTML === 'Tab') {
          textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd);
          textarea.selectionStart += 1;
        } else if (e.target.innerHTML === 'Space') {
          textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd);
          textarea.selectionStart += 1;
        } else if (e.target.innerHTML === 'CapsLock') {
          if (this.typeKeys === 'dataru') {
            this.typeKeys = 'capslockRu';
          } else if (this.typeKeys === 'dataeng') {
            this.typeKeys = 'capslockEng';
          } else if (this.typeKeys === 'capslockEng') {
            this.typeKeys = 'dataeng';
          } else if (this.typeKeys === 'capslockRu') {
            this.typeKeys = 'dataru';
          }
          this.renderKeys();
        } else if (
          e.target.innerHTML === 'Control' ||
          e.target.innerHTML === 'Win' ||
          e.target.innerHTML === 'Alt' ||
          e.target.innerHTML === 'Shift'
        ) {
          textarea.value += '';
        } else {
          textarea.setRangeText(e.target.innerHTML, textarea.selectionStart, textarea.selectionEnd);
          textarea.selectionStart += 1;
        }
        textarea.focus();
      });
    });

    shiftButton.forEach((e) => {
      e.addEventListener('mousedown', () => {
        if (this.typeKeys === 'dataru') {
          this.typeKeys = 'shiftedRu';
        } else if (this.typeKeys === 'dataeng') {
          this.typeKeys = 'shiftedEng';
        }

        this.renderKeys();
      });
    });

    shiftButton.forEach((e) => {
      e.addEventListener('mouseup', () => {
        if (this.typeKeys === 'shiftedRu') {
          this.typeKeys = 'dataru';
        } else if (this.typeKeys === 'shiftedEng') {
          this.typeKeys = 'dataeng';
        }
        this.renderKeys();
      });
    });
  }
}

const setLanguageLocalStorage = () => {
  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'dataru');
  }
};

setLanguageLocalStorage();
