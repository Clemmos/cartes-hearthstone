import React, { useEffect, useState } from "react";
import axios from "axios";
import Carte from "./Carte";
import { FormControl, InputGroup } from "react-bootstrap";

const Cartes = () => {
  const [cartesArmes, setCartesArmes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [nomCarteRecherchee, setNomCarteRecherchee] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/Weapon",
      params: { locale: "frFR" },
      headers: {
        "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "b30bb8a153msh2d7741f8e936ea7p175afbjsn482a2c944e04",
      },
    };

    axios
      .request(options)
      .then((res) => {
        setCartesArmes(res.data);
        setChargement(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="cartes">
      <div className="menuRecherche">
        <InputGroup>
          <FormControl
            onChange={(e) => {
              setNomCarteRecherchee(e.target.value);
              console.log(e.target.value);
            }}
            placeholder="Trier par nom"
            aria-label="TriCartesParNom"
          />
        </InputGroup>
      </div>
      {/* texte indiquant le chargement des cartes au chargement de la page */}
      {chargement ? <p>chargement des cartes</p> : null}

      <ul className="listeCartes">
        {cartesArmes
          .slice(0, 100)
          .filter((carte) =>
            // le filter n'inclut pas les apostrophes dans la recherche
            carte.name.toLowerCase().includes(nomCarteRecherchee.toLowerCase())
          )
          .map((carte, index) => (
            <Carte key={index} carte={carte} />
          ))}
      </ul>
    </div>
  );
};

export default Cartes;
