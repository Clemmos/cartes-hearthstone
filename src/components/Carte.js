import React from "react";

const Carte = ({ carte }) => {
  return (
    <li className="carte">
      <img
        src={
          "https://art.hearthstonejson.com/v1/render/latest/frFR/256x/" +
          carte.cardId +
          ".png"
        }
        alt={carte.name}
      />
    </li>
  );
};

export default Carte;
