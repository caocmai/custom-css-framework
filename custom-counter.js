const template = document.createElement('template')

template.innerHTML = `
<style>
.container {
          margin: 5px;
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

      input {
          font-family: 'Didact Gothic', sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }

</style>

<div class="container">
      <div class="button down">
          <div class="arrow"></div>
      </div>

      <input class="display_count" value="0" name="display_input">

      <div class="button up">
          <div class="arrow"></div>
      </div>
</div>

`

class CustomCounter extends HTMLElement {
    constructor() {
        super();

        const tempHTML = template.content.cloneNode(true)
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(tempHTML)

        this._downButton = this._shadowRoot.querySelector('.down')
        this._upButton = this._shadowRoot.querySelector('.up')
        this._displyCounter = this._shadowRoot.querySelector('.display_count')
        this._displayInput = this._shadowRoot.querySelector('[name="display_input"]')

        console.log("input vakue", this._displayInput)
        this._value = 0
        this._step = 1
        this._min = 0
        this._max = 10

        this._update()

        this._increment = this._increment.bind(this)
        this._decrement = this._decrement.bind(this)
        this._resetUserInputDisplay = this._resetUserInputDisplay.bind(this)
        this._showUserInputValue = this._showUserInputValue.bind(this)

    }

    _increment(e) {
        console.log("increment event and this", e, this)

        const incrementValue = parseInt(this._value) + this._step
        console.log(incrementValue, this._max, this._value)
        if (incrementValue <= this._max) {
            this._value = incrementValue
            console.log("after incrementing", this._value)
        }
        this._update()
    }

    _decrement(e) {
        console.log("decrement event and this", e, this)
        
        const decrementValue = this._value - this._step
        console.log(decrementValue, this._min)

        if (decrementValue >= this._min) {
            this._value = decrementValue
        }

        this._update()
    }

    _showUserInputValue(e) {
        console.log("change displyinput and this", this)
        if (e.key === 'Enter') {
            // code for enter
            console.log("pressed enter")
            this._value = this._displayInput.value

            if (this._value >= this._max) {
                this._resetUserInputDisplay()
            }
            this._update()
          }
        
    }

    _resetUserInputDisplay(e) {
        this._value = ""
        this._update()

    }

    _update() {
        this._displyCounter.value = this._value
        // Creating a new event
        this.dispatchEvent(new Event('change'))
    }

    static get observedAttributes() {
        return ['value', 'min', 'max', 'step'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') {
            this._value = parseInt(newValue)
            this._update()
        } else if (name === 'min') {
            this._min = parseInt(newValue)
        } else if (name === 'max') {
            this._max = parseInt(newValue)
        } else if (name === 'step') {
            this._step = parseInt(newValue)
        }
    }

    connectedCallback() {
        this._upButton.addEventListener('click', this._increment) // add click event to up button
        this._downButton.addEventListener('click', this._decrement) // add click even to down button
        this._displayInput.addEventListener('keypress', this._showUserInputValue)
        this._displayInput.addEventListener('click', this._resetUserInputDisplay)

    }

    // disconnectedCallback() {
    //     this._upButton.removeEventListener('click', this._increment)
    //     this._downButton.removeEventListener('click', this._decrement)
    // }

}

customElements.define('custom-counter', CustomCounter);
