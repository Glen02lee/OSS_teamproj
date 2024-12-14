import React, { useState, useEffect } from "react";
import { fetchRiotChampions } from "../api/riotApi";
import ChampionList from "../components/ChampionList";
import RuneList from "../components/RuneList";
import { saveSetToMockApi } from "../api/mockApi";
import styled from "styled-components";

// style
const AddSetButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  margin-top: 10px;
  color: ${(props) => (props.isError ? "#ff4d4d" : "#00ff00")};
`;

// Styled Components
const PageContainer = styled.div`
  display: grid;
  grid-template-areas:
    "selected selected"
    "champion rune";
  grid-template-columns: 50% 50%;
  gap: 20px;
  padding: 20px;
  background: radial-gradient(circle, #0a1428, #1e1e2e, #10182e);
  color: #f0f4f9;
  height: 100vh;
`;

const SelectedRegion = styled.div`
  grid-area: selected;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  background: rgba(30, 30, 46, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const SelectedImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #00aaff;
`;

const RuneCategory = styled.div`
  display: flex;
  flex-direction: column; /* Align items vertically */
  align-items: center; /* Center align */
  gap: 10px;

  h3 {
    color: #00aaff;
    margin: 0;
  }
`;

const RuneDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #444;
  }
`;

const Region = styled.div`
  background: rgba(30, 30, 46, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  input,
  select {
    padding: 5px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #444;
    background: #1e1e2e;
    color: #f0f4f9;
  }
`;

const InputField = styled.input`
  padding: 8px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #1e1e2e;
  color: #f0f4f9;
`;

const AddRuneSet = () => {
  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [primaryRunes, setPrimaryRunes] = useState({ category: "", runes: [] });
  const [secondaryRunes, setSecondaryRunes] = useState({
    category: "",
    runes: [],
  });
  const [setName, setSetName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadChampions = async () => {
      const data = await fetchRiotChampions();
      setChampions(data);
      setFilteredChampions(data);
    };
    loadChampions();
  }, []);

  useEffect(() => {
    let filtered = champions;

    if (!setName.trim()) {
      setMessage({ text: "세트 이름을 입력해주세요.", isError: true });
      return;
    }
    if (searchTerm) {
      filtered = filtered.filter((champ) =>
        champ.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((champ) => champ.tags.includes(roleFilter));
    }

    if (difficultyFilter) {
      filtered = filtered.filter(
        (champ) => champ.info.difficulty === parseInt(difficultyFilter)
      );
    }

    setFilteredChampions(filtered);
  }, [searchTerm, roleFilter, difficultyFilter, champions]);

  const handleAddSet = async () => {
    setMessage(""); // 메시지 초기화

    if (!setName.trim()) {
      setMessage({ text: "세트 이름을 입력해주세요.", isError: true });
      return;
    }

    if (!selectedChampion) {
      setMessage({ text: "챔피언이 선택되지 않았습니다.", isError: true });
      return;
    }

    if (!primaryRunes.category || primaryRunes.runes.length !== 4) {
      setMessage({
        text: "Primary Runes의 카테고리와 룬 4개를 모두 선택해주세요.",
        isError: true,
      });
      return;
    }

    if (!secondaryRunes.category || secondaryRunes.runes.length !== 2) {
      setMessage({
        text: "Secondary Runes의 카테고리와 룬 2개를 모두 선택해주세요.",
        isError: true,
      });
      return;
    }

    const newSet = {
      setName,
      champion: {
        name: selectedChampion.name,
        title: selectedChampion.title,
        description: selectedChampion.blurb,
        roles: selectedChampion.tags,
        stats: selectedChampion.info,
      },
      primaryRuneCategory: primaryRunes.category,
      primaryRunes: primaryRunes.runes.map((rune) => ({
        name: rune.name,
        icon: rune.icon,
      })),
      secondaryRuneCategory: secondaryRunes.category,
      secondaryRunes: secondaryRunes.runes.map((rune) => ({
        name: rune.name,
        icon: rune.icon,
      })),
    };

    console.log("Saving JSON Data:", JSON.stringify(newSet, null, 2));

    try {
      await saveSetToMockApi(newSet);
      setSetName("");
      setSelectedChampion(null);
      setPrimaryRunes({ category: "", runes: [] });
      setSecondaryRunes({ category: "", runes: [] });
    } catch (error) {
      setMessage({ text: "세트 저장에 실패했습니다.", isError: true });
    }
  };

  return (
    <PageContainer>
      <SelectedRegion>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputField
            type="text"
            placeholder="세트 이름을 입력하세요"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
          {message && message.text && (
            <Message isError={message.isError}>{message.text}</Message>
          )}
        </div>
        {selectedChampion ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <SelectedImage
                src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${selectedChampion.image.full}`}
                alt={selectedChampion.name}
              />
              <div>
                <h2 style={{ color: "#00aaff", margin: "0" }}>
                  {selectedChampion.name}
                </h2>
                <p style={{ color: "#ccc", margin: "5px 0" }}>
                  {selectedChampion.title}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "30px" }}>
              <RuneCategory>
                <h3>Primary Runes</h3>
                <RuneDisplay>
                  {primaryRunes.runes?.map((rune, index) => (
                    <img
                      key={index}
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                      alt={rune.name}
                    />
                  ))}
                </RuneDisplay>
              </RuneCategory>

              <RuneCategory>
                <h3>Secondary Runes</h3>
                <RuneDisplay>
                  {secondaryRunes.runes?.map((rune, index) => (
                    <img
                      key={index}
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                      alt={rune.name}
                    />
                  ))}
                </RuneDisplay>
              </RuneCategory>
            </div>

            <AddSetButton onClick={handleAddSet}>Add Set</AddSetButton>
          </>
        ) : (
          <h2 style={{ color: "#00aaff" }}>챔피언과 룬을 선택해주세요</h2>
        )}
      </SelectedRegion>

      <Region>
        <h2>챔피언 선택</h2>
        <FilterSection>
          <input
            type="text"
            placeholder="챔피언 이름 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">역할군 필터</option>
            <option value="Fighter">Fighter</option>
            <option value="Mage">Mage</option>
            <option value="Tank">Tank</option>
            <option value="Assassin">Assassin</option>
            <option value="Marksman">Marksman</option>
            <option value="Support">Support</option>
          </select>
          <select onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option value="">난이도 필터</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </FilterSection>
        <ChampionList
          champions={filteredChampions}
          onSelect={setSelectedChampion}
          selectedChampion={selectedChampion}
        />
      </Region>

      <Region>
        <h2>룬 선택</h2>
        <RuneList
          onSelectPrimaryRunes={(selectedRunes) =>
            setPrimaryRunes(selectedRunes)
          }
          onSelectSecondaryRunes={(selectedRunes) =>
            setSecondaryRunes(selectedRunes)
          }
        />
      </Region>
    </PageContainer>
  );
};

export default AddRuneSet;
