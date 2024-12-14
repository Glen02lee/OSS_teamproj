import React from "react";
import ChampionCard from "./ChampionCard";
import styled from "styled-components";

const ChampionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 10px;
`;

const ChampionList = ({ champions, onSelect, selectedChampion }) => {
  return (
    <ChampionsContainer>
      {champions.map((champ) => (
        <ChampionCard
          key={champ.id}
          champion={champ}
          onSelect={onSelect}
          isSelected={selectedChampion?.id === champ.id} // compare selected champion
        />
      ))}
    </ChampionsContainer>
  );
};

export default ChampionList;
