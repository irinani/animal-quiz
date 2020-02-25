import React, { Component } from "react";
import shuffleArray from "../utils/utils";
import optionValues from "../utils/options";

class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, showNextButton: false, hideOptions: false };
  }

  setVisible() {
    this.setState({ visible: true });
  }

  setHidden() {
    this.setState({ visible: false });
  }

  checkAnswer = e => {
    const userOption = e.innerHTML;
    const correctOption = this.props.name;

    if (userOption.toLowerCase() === correctOption.toLowerCase()) {
      this.setState({ hideOptions: true });
      this.setState({ showNextButton: true });
    } else {
      alert("Yritä uudelleen");
    }
  };

  render() {
    const hiddenClass = this.state.visible ? "" : "hidden";
    const hideOptions = this.state.hideOptions ? "hidden" : "";
    const showNextButton = this.state.showNextButton ? (
      <button
        onClick={this.props.showNextImage}
        className="ml-auto button-next"
      >
        Seuraava
      </button>
    ) : (
      ""
    );
    const randomValues = shuffleArray(optionValues) // shufflataan kaikki arvot
      .filter(value => value !== this.props.name) // suodatetaan listasta pois oikea arvo
      .slice(1, 3); // otetaan 2 arvoa (shufflatusta listasta)
    const randomValuesAndCorrect = randomValues.concat(this.props.name); // yhdistetään oikea + 2 randomia
    const shuffledValues = shuffleArray(randomValuesAndCorrect); // shufflataan 3 arvon lista vielä kerran

    return (
      <div key={this.props.index} className={"animal-item " + hiddenClass}>
        <img src={this.props.img} alt={this.props.name}></img>
        <ul className={"options mt-32 " + hideOptions}>
          {shuffledValues.map((option, index) => (
            <li key={index} data-key={option}>
              <button type="button" onClick={e => this.checkAnswer(e.target)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
        <div className="d-flex mt-32">{showNextButton}</div>
      </div>
    );
  }
}

export default Animal;
