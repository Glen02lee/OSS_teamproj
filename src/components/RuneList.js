import React, { useEffect, useState } from "react";
import { fetchRiotRunes } from "../api/riotApi";
import styled from "styled-components";

// style
const RuneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const CategoryIcon = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease, border 0.3s ease;
  border: ${(props) =>
    props.isSelected ? "2px solid #00aaff" : "1px solid #444"};
  padding: 5px;

  &:hover {
    transform: scale(1.1);
  }
`;

const RuneSlot = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const RuneIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${(props) => (props.isSelected ? "2px solid red" : "1px solid gray")};
  opacity: ${(props) => (props.isSelected ? 1 : 0.6)};

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h4`
  color: #00aaff;
  text-align: center;
`;

const RuneList = ({ onSelectPrimaryRunes, onSelectSecondaryRunes }) => {
  const [runes, setRunes] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const [selectedRunes1, setSelectedRunes1] = useState({});
  const [selectedRunes2, setSelectedRunes2] = useState([]);

  useEffect(() => {
    const loadRunes = async () => {
      const data = await fetchRiotRunes();
      setRunes(data);
    };
    loadRunes();
  }, []);

  const handlePrimaryCategoryChange = (category) => {
    setSelectedCategory1(category);
    setSelectedRunes1({});
    onSelectPrimaryRunes({ category: category.name, runes: [] });
  };

  const handleSecondaryCategoryChange = (category) => {
    setSelectedCategory2(category);
    setSelectedRunes2([]);
    onSelectSecondaryRunes({ category: category.name, runes: [] });
  };

  const handleRuneClick = (list, slotIndex, rune) => {
    if (list === 1) {
      setSelectedRunes1((prev) => {
        const updatedRunes = {
          ...prev,
          [slotIndex]: { name: rune.name, icon: rune.icon },
        };
        onSelectPrimaryRunes({
          category: selectedCategory1.name,
          runes: Object.values(updatedRunes),
        });
        return updatedRunes;
      });
    } else {
      setSelectedRunes2((prev) => {
        const runeData = { name: rune.name, icon: rune.icon };
        const newRunes = prev.some((r) => r.name === rune.name)
          ? prev.filter((r) => r.name !== rune.name)
          : [...prev, runeData];
        const updatedRunes = newRunes.slice(0, 2);
        onSelectSecondaryRunes({
          category: selectedCategory2.name,
          runes: updatedRunes,
        });
        return updatedRunes;
      });
    }
  };

  const renderRunes = (category, selectedRunes, list, excludeFirstSlot) => {
    if (!category) return null;

    const slots = excludeFirstSlot ? category.slots.slice(1) : category.slots;

    return slots.map((slot, slotIndex) => (
      <RuneSlot key={slotIndex}>
        {slot.runes.map((rune) => (
          <RuneIcon
            key={rune.id}
            src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
            alt={rune.name}
            isSelected={
              list === 1
                ? selectedRunes[slotIndex]?.icon === rune.icon
                : selectedRunes.some((r) => r.icon === rune.icon)
            }
            onClick={() => handleRuneClick(list, slotIndex, rune)}
          />
        ))}
      </RuneSlot>
    ));
  };

  return (
    <RuneContainer>
      {/* Primary Runes */}
      <div>
        <Title>Primary Runes</Title>
        <CategoryList>
          {runes.map((category) => (
            <CategoryIcon
              key={category.key}
              src={`https://ddragon.leagueoflegends.com/cdn/img/${category.icon}`}
              alt={category.name}
              isSelected={selectedCategory1?.key === category.key}
              onClick={() => handlePrimaryCategoryChange(category)}
            />
          ))}
        </CategoryList>
        {renderRunes(selectedCategory1, selectedRunes1, 1, false)}
      </div>

      {/* Secondary Runes */}
      <div>
        <Title>Secondary Runes</Title>
        <CategoryList>
          {runes
            .filter((category) => category.key !== selectedCategory1?.key)
            .map((category) => (
              <CategoryIcon
                key={category.key}
                src={`https://ddragon.leagueoflegends.com/cdn/img/${category.icon}`}
                alt={category.name}
                isSelected={selectedCategory2?.key === category.key}
                onClick={() => handleSecondaryCategoryChange(category)}
              />
            ))}
        </CategoryList>
        {renderRunes(selectedCategory2, selectedRunes2, 2, true)}
      </div>
    </RuneContainer>
  );
};

export default RuneList;
