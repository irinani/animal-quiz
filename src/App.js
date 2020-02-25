import React, { useRef, useState } from "react";
import animals from "./api/animals";
import Animal from "./components/animalComponent";
import "./App.css";
import shuffleArray from "./utils/utils";

export default function App() {
  const [showStartButton, setShowStartButton] = useState(true);

  const refs = useRef([]);
  let animal = 0;
  refs.current = [];
  const addToRefs = el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  function showImage() {
    refs.current[animal].setVisible();
    setShowStartButton(false);
  }

  function showNextImage() {
    refs.current[animal].setHidden();

    if (animal + 1 < animals.length) {
      animal++;
      showImage();
    } else {
      alert("Voitit pelin");
      animal = 0;
      setShowStartButton(true);
    }
  }
  const showStartButtonElement = showStartButton ? (
    <button className="btn-start" onClick={showImage}>
      Aloita
    </button>
  ) : (
    ""
  );

  const shuffledAnimals = shuffleArray(animals);

  return (
    <div className="App">
      <div className="content">
        <div className="text-center mb-32">
          <h1>Mikä eläin?</h1>
          {showStartButtonElement}
        </div>
        <div className="animals">
          {shuffledAnimals.map((animal, index) => (
            <Animal
              key={index}
              name={animal.name}
              img={animal.img}
              options={animal.options}
              ref={addToRefs}
              showNextImage={showNextImage}
            />
          ))}
        </div>
      </div>
      <div className="footer text-center">
        Kuvat: <a href="https://papunet.net/">Papunet</a>
      </div>
    </div>
  );
}
