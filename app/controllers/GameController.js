import { AppState } from "../AppState.js";
import { gameService } from "../services/GameService.js";
import { setHTML, setText } from "../utils/Writer.js";

export class GameController {
  constructor () {
    // console.log('Game Controller loaded');
    // SECTION page load
    this.drawBagelDebris()
    this.drawUpgrades()
    setInterval(this.collectAuto, 3000)

    // SECTION listeners (AppState changes)
    AppState.on('bagelDebris', this.drawBagelDebris)
    AppState.on('upgrades', this.drawUpgrades)
  }


  drawBagelDebris() {



    setText('bagelDebris', AppState.bagelDebris)
  }

  drawUpgrades() {
    // console.log('did i ever run');
    const upgrades = AppState.upgrades
    let content = ''
    upgrades.forEach(upgrade => content += upgrade.ListTemplate)

    setHTML('upgrades', content)

    let clickTotal = gameService.calculateUpgradeTotal('click')
    let autoTotal = gameService.calculateUpgradeTotal('auto')

    setText('clickPower', clickTotal + 1)
    setText('autoPower', autoTotal)
  }
  collectBagelDebris() {
    gameService.collectBagelDebris()
  }

  collectAuto() {
    gameService.collectAuto()
  }

  buyUpgrade(upgradeName) {
    // console.log(upgradeName);
    gameService.buyUpgrade(upgradeName)
  }
}