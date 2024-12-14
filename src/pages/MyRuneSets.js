import React, { useEffect, useState } from "react";
import {
  fetchSetsFromMockApi,
  deleteSetFromMockApi,
  updateSetOnMockApi,
} from "../api/mockApi";
import RuneList from "../components/RuneList";
import styled from "styled-components";

// style
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: radial-gradient(circle, #0a1428, #1e1e2e, #10182e);
  color: #f0f4f9;
`;

const ListContainer = styled.div`
  width: 40%;
  padding: 20px;
  border-right: 2px solid #333;
`;

const DetailContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  color: #00aaff;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(30, 30, 46, 0.9);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background: #1e1e2e;
  }
`;

const ChampionImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00aaff;
`;

const ChampionStats = styled.div`
  margin-top: 10px;
  background: rgba(30, 30, 46, 0.8);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.9rem;

  div {
    display: flex;
    gap: 5px;

    span {
      font-weight: bold;
      color: #00aaff;
    }
  }
`;

const RuneDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RuneIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${(props) => (props.isSelected ? "2px solid red" : "2px solid #444")};
  cursor: ${(props) => (props.editable ? "pointer" : "default")};
  opacity: ${(props) => (props.isSelected ? 1 : 0.7)};
`;

const Button = styled.button`
  background: ${(props) => (props.danger ? "#ff6f61" : "#007bff")};
  color: white;
  border: none;
  padding: 8px 12px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.danger ? "#ff4d4d" : "#0056b3")};
  }
`;

const InputField = styled.input`
  padding: 8px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #1e1e2e;
  color: #f0f4f9;
  width: 50%;
`;

const MyRuneSets = () => {
  const [runeSets, setRuneSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedSet, setUpdatedSet] = useState(null);

  useEffect(() => {
    loadRuneSets();
  }, []);

  const loadRuneSets = async () => {
    const data = await fetchSetsFromMockApi();
    setRuneSets(data);
  };

  const handleDelete = async (id) => {
    await deleteSetFromMockApi(id);
    setSelectedSet(null);
    loadRuneSets();
  };

  const handleSave = async () => {
    await updateSetOnMockApi(updatedSet.id, updatedSet);
    setEditing(false);
    setSelectedSet(updatedSet);
    loadRuneSets();
  };

  return (
    <Container>
      <ListContainer>
        <Title>내 룬 세트</Title>
        <List>
          {runeSets.map((set) => (
            <ListItem
              key={set.id}
              onClick={() => {
                setSelectedSet(set);
                setUpdatedSet({ ...set });
                setEditing(false);
              }}
            >
              <span>
                <strong>{set.setName}</strong>
              </span>
              <Button
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(set.id);
                }}
              >
                삭제
              </Button>
            </ListItem>
          ))}
        </List>
      </ListContainer>

      {selectedSet && (
        <DetailContainer>
          <h2 style={{ color: "#00aaff" }}>세트 상세 정보</h2>
          {editing ? (
            <InputField
              value={updatedSet.setName}
              onChange={(e) =>
                setUpdatedSet({ ...updatedSet, setName: e.target.value })
              }
            />
          ) : (
            <h3>{selectedSet.setName}</h3>
          )}

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <ChampionImage
              src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${selectedSet.champion.name}.png`}
              alt={selectedSet.champion.name}
            />
            <div>
              <h3>{selectedSet.champion.name}</h3>
              <p>{selectedSet.champion.title}</p>
            </div>
          </div>

          <ChampionStats>
            <div>
              <span>공격력:</span> {selectedSet.champion.stats.attack}
            </div>
            <div>
              <span>방어력:</span> {selectedSet.champion.stats.defense}
            </div>
            <div>
              <span>마법력:</span> {selectedSet.champion.stats.magic}
            </div>
            <div>
              <span>난이도:</span> {selectedSet.champion.stats.difficulty}
            </div>
          </ChampionStats>

          <h3>Primary Runes</h3>
          <RuneDisplay>
            {updatedSet.primaryRunes.map((rune, index) => (
              <RuneIcon
                key={index}
                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                alt={rune.name}
              />
            ))}
          </RuneDisplay>

          <h3>Secondary Runes</h3>
          <RuneDisplay>
            {updatedSet.secondaryRunes.map((rune, index) => (
              <RuneIcon
                key={index}
                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                alt={rune.name}
              />
            ))}
          </RuneDisplay>

          {editing && (
            <RuneList
              onSelectPrimaryRunes={(newRunes) =>
                setUpdatedSet({ ...updatedSet, primaryRunes: newRunes.runes })
              }
              onSelectSecondaryRunes={(newRunes) =>
                setUpdatedSet({ ...updatedSet, secondaryRunes: newRunes.runes })
              }
            />
          )}

          {!editing ? (
            <Button onClick={() => setEditing(true)}>수정하기</Button>
          ) : (
            <>
              <Button onClick={handleSave}>저장</Button>
              <Button danger onClick={() => setEditing(false)}>
                취소
              </Button>
            </>
          )}
        </DetailContainer>
      )}
    </Container>
  );
};

export default MyRuneSets;
