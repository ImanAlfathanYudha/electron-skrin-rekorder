class RecorderControls extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="btn-row">
        <button id="startBtn" class="button is-primary">Start</button>
        <button id="stopBtn" class="button is-warning">Stop</button>
      </div>
      <button id="videoSelectBtn" class="button is-text">
        Choose a Video Source
      </button>
    `;
  }
}

customElements.define('recorder-controls', RecorderControls);