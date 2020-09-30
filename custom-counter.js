const template = document.createElement('template')

template.innerHTML = `
<style>
.container {
          margin: 30px;
          display: flex;
      }

      .button {
          padding: .5em 1em;
          background-color: #FFC93C;
          display: flex;
          /* justify-content: center; */
          align-items: center;
          border-top: 2px solid;
          border-bottom: 2px solid;
      }

      .down {
          border-top-left-radius: 0.5em;
          border-bottom-left-radius: 0.5em;
          border-left: 2px solid;
      }

      .up {
          border-top-right-radius: 0.5em;
          border-bottom-right-radius: 0.5em;
          border-right: 2px solid;
      }

      .arrow {
          width: 8px;
          height: 8px;
          border-top: 3px solid;
          border-right: 3px solid;
          /* transition: 400ms; */

      }

      .down > .arrow {
          transform: translate(0px, -1px) rotate(135deg);
          transition: 300ms;
      }

      .up > .arrow {
          transform: translate(0px, 3px) rotate(-45deg);
          transition: 300ms;
      }

      .display_count {
          padding: .5em 1em;
          width: 2em;
          border-top: 2px solid;
          border-bottom: 2px solid;
          border-right: 2px solid;
          outline: none;
          text-align: center;
      }

      .button:hover {
        background-color: rgb(181, 181, 202);
      }

      .button.up:hover > .arrow{
          border-color: red;
          transform: translate(0px, 1px) rotate(-45deg);
      }

      .button.down:hover > .arrow {
        transform: translate(0px, 0px) rotate(135deg);
        border-color: red;

      }

</style>

<div class="container">
      <div class="button down">
          <div class="arrow"></div>
      </div>

      <input class="display_count" value="0">

      <div class="button up">
          <div class="arrow"></div>
      </div>
</div>

`

class CustomCounter extends HTMLElement {
    constructor() {
        super();

        const tempHTML = template.content.cloneNode(true)
        this._shadowRoot = this.attachShadow( { mode: 'open' });
        this._shadowRoot.appendChild(tempHTML)

        this._downButton = this._shadowRoot.querySelector('.down')
        this._upButton = this._shadowRoot.querySelector('.up')
        this._displyCounter = this._shadowRoot.querySelector('.display_count')

        this._value = 0
        this._step = 1
        this._min = 0
        this._max = 10

    }


    _update() {
        this._displyCounter.innerHTML = this._value
        // Creating a new event
        this.dispatchEvent(new Event('change')) 
    }

    _increment() {
        const incrementValue = this._value + this._step

        if (incrementValue <= this._max) {
            this._value = incrementValue
        }
        this._update
    }
}

customElements.define('custom-counter', CustomCounter);
