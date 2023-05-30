class WCTab extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    let thisNode = this;

    let tabs = this.querySelectorAll('div');
    console.log(3, tabs);

    thisNode.render();

    // let observer = new MutationObserver(function () {
    //   console.log(8);
    //   thisNode.render();
    // });

    // We are only interested in the children of
    // this component
    // observer.observe(this, { childList: true });
  }

  render() {
    let tabs = this.querySelectorAll('div');

    // Define basic structure
    this.shadowRoot.innerHTML = `
      <div class='tab-btn-container'></div>
      <div class='tab-panel-container'></div>
    `;
    this.shadowRoot.appendChild(this.generateStyle());

    let btnContainer = this.shadowRoot.querySelector('.tab-btn-container');
    let panelContainer = this.shadowRoot.querySelector('.tab-panel-container');

    let thisNode = this;
    const currentActiveTabIndex = 0;

    for (let index = 0; index < tabs.length; index++) {
      let currentTab = tabs[index];

      this.addTab(currentTab, btnContainer, panelContainer);

      if (currentActiveTabIndex === index) {
        thisNode.activate(currentTab.getAttribute('name'));
      }
    }
  }

  addTab(tab, btnContainer, panelContainer) {
    let tabBtn = document.createElement('button');
    let clonedTab = tab.cloneNode(true);
    let thisNode = this;
    let tabName = tab.getAttribute('name');

    tabBtn.textContent = tabName;
    tabBtn.setAttribute('name', tabName);
    btnContainer.appendChild(tabBtn);
    panelContainer.appendChild(clonedTab);

    tabBtn.addEventListener('click', function () {
      thisNode.activate(tabName);
    });
  }

  activate(tabName) {
    // Deactivate previously active tab if any
    let activeBtn = this.shadowRoot.querySelector(
      '.tab-btn-container > button.active'
    );
    if (activeBtn !== null) {
      activeBtn.classList.remove('active');
    }
    let activeTab = this.shadowRoot.querySelector(
      '.tab-panel-container > div.active'
    );
    if (activeTab !== null) {
      activeTab.classList.remove('active');
    }

    // Mark provided tab as active
    this.shadowRoot
      .querySelector(`.tab-btn-container > button[name='${tabName}']`)
      .classList.add('active');

    this.shadowRoot
      .querySelector(`.tab-panel-container > div[name='${tabName}']`)
      .classList.add('active');
  }

  generateStyle() {
    let style = document.createElement('style');
    style.textContent = `
    *{
      background-color: #ccc;
      color: block;
      font-size: 1rem;
      font-family: sans-serif;
    }
    .tab-panel-container{
      padding: 8px;
    }
    .tab-btn-container{
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .tab-panel-container > div {
      display: none;
    }
    .tab-panel-container > div.active{
      display: block;
    }
    .tab-btn-container{
      display: flex;
      gap: 8px;
    }
    .tab-btn-container > button{
      background-color: #4e6183;
      border: none;
      outline: none;
      color: white;
      padding: 4px 8px;
      border-radius: 8px;
      cursor: pointer;
    }
    .tab-btn-container > button.active{
      background-color: #03C988;
    }
    `;
    return style;
  }
}

window.addEventListener('load', function () {
  window.customElements.define('wc-tab', WCTab);
});

// window.customElements.define('wc-tab', WCTab);
