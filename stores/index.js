import {RunStore} from './RunStore'
import {UserStore} from './UserStore'

class RootStore {

  constructor() {
    this.UserStore = new UserStore()
    this.RunStore = new RunStore()
  }

}

export default new RootStore()