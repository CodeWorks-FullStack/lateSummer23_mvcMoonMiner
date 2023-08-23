import { AppState } from "../AppState.js"

class GameService {
  collectAuto() {
    let autoTotal = this.calculateUpgradeTotal('auto')

    AppState.bagelDebris += autoTotal

  }
  buyUpgrade(upgradeName) {
    const foundUpgrade = AppState.upgrades.find(upgrade => upgrade.name == upgradeName)

    if (foundUpgrade.price > AppState.bagelDebris) {
      return
    }

    AppState.bagelDebris -= foundUpgrade.price
    foundUpgrade.quantity++
    foundUpgrade.price = Math.floor(foundUpgrade.price * 1.3)

    AppState.emit('upgrades')
    // console.log(foundUpgrade);
  }
  collectBagelDebris() {
    AppState.bagelDebris++
    console.log(AppState.bagelDebris);

    let clickTotal = this.calculateUpgradeTotal('click')

    AppState.bagelDebris += clickTotal

    // const clickUpgrades = AppState.upgrades.filter(upgrade => upgrade.type == 'click')
    // clickUpgrades.forEach(upgrade => AppState.bagelDebris += upgrade.quantity * upgrade.multiplier)
  }

  calculateUpgradeTotal(upgradeType) {

    let sum = 0
    const upgrades = AppState.upgrades.filter(upgrade => upgrade.type == upgradeType)
    upgrades.forEach(upgrade => sum += upgrade.quantity * upgrade.multiplier)


    return sum
  }



}

export const gameService = new GameService()