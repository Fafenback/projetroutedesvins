import { base } from "../firebase";
import { Container } from "unstated";

class WinesContainer extends Container {
  constructor(props) {
    super(props);
    this.state = {
      wines: [],
      wine: {},
      vinSelected: {},
      orderedWinesByCreationDate: [],
      orderedWinesByMillesimes: []
    };
    this.init();
  }
  //initialisation du state
  init = () => {
    base.bindToState("vins", {
      context: this,
      state: "wines",
      asArray: true,
    });
  };

  getVinById(id) {
    return base.fetch(`vins/${id}`, {
      context: this,
      then(data) {
        this.setState({ vinSelected: data });
      }
    });
  }

  byCreationDate = () => {
    if (this.state.wines) {
      const { wines } = this.state;
      const orderedWinesByCreationDate = wines.sort((a, b) => a.date - b.date);
      this.setState({ orderedWinesByCreationDate });
    }
  };
  byMillesimes = () => {
    const { wines } = this.state;
    const orderedWinesByMillesimes = wines.sort((a, b) => a.key - b.key);
    this.setState({ orderedWinesByMillesimes });
  };
}
export default WinesContainer;
