import { Upgrade } from "./models/Upgrade.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  bagelDebris = 0

  /** @type {Upgrade[]} */
  upgrades = [
    new Upgrade({ name: 'spoon', price: 20, multiplier: 1, type: 'click' }),
    new Upgrade({ name: 'buttery knife', price: 30, multiplier: 4, type: 'click' }),
    new Upgrade({ name: 'mouse', price: 100, multiplier: 10, type: 'auto' }),
    new Upgrade({ name: 'beagle', price: 150, multiplier: 15, type: 'auto' }),
  ]

  // NOTE Used to load initial data
  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
