export class Upgrade {
  constructor ({ name, price, multiplier, type }) {
    this.name = name
    this.price = price
    this.multiplier = multiplier
    this.type = type
    this.quantity = 0
  }

  get ListTemplate() {
    return `
    <div class="col-3 p-3">
      <div class="border border-dark rounded p-2">
        <h2>${this.name}</h2>
        <p class="d-flex justify-content-between">
          <span>$${this.price}</span>
          <span>Multiplier: ${this.multiplier}</span>
        </p>
        <button onclick="app.GameController.buyUpgrade('${this.name}')" class="btn btn-primary">Buy</button>
      </div>
    </div>
    `
  }
}