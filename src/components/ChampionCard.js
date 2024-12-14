import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

// Style
const Card = styled.div`
  border: ${(props) =>
    props.isSelected ? "3px solid #00aaff" : "1px solid #444"};
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.isSelected
      ? "0 4px 12px rgba(0, 170, 255, 0.8)"
      : "0 2px 4px rgba(0, 0, 0, 0.3)"};
  transition: 0.3s ease;
  background-color: ${(props) =>
    props.isSelected ? "#1a2e45" : "rgba(30, 30, 46, 0.8)"};
  cursor: pointer;
  text-align: center;
  padding: 10px;
  margin: 5px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: ${(props) =>
      props.isSelected ? "2px solid #00aaff" : "1px solid #555"};
  }

  p {
    margin-top: 10px;
    font-size: 1rem;
    color: #f0f4f9;
    font-weight: bold;
  }
`;

const InfoButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  color: #f0f4f9;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #007bff;
  }

  .info {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 10px;

    h2 {
      color: #00aaff;
      margin-bottom: 10px;
      font-size: 1.8rem;
    }

    p {
      margin: 5px 0;
      line-height: 1.5;
      font-size: 1rem;
    }

    .stats {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.9rem;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;

        img {
          width: 16px;
          height: 16px;
        }

        strong {
          color: #00aaff;
        }
      }
    }
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background-color: #007bff;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChampionCard = ({ champion, isSelected, onSelect }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Card isSelected={isSelected} onClick={() => onSelect(champion)}>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champion.image.full}`}
          alt={champion.name}
        />
        <p>{champion.name}</p>
        <InfoButton
          onClick={(e) => {
            e.stopPropagation();
            setModalIsOpen(true);
          }}
        >
          정보 보기
        </InfoButton>
      </Card>

      {/* 모달 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            maxWidth: "400px",
            maxHeight: "500px",
            overflowY: "auto",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#1e1e2e",
            color: "#f0f4f9",
          },
        }}
      >
        <ModalContent>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champion.image.full}`}
            alt={champion.name}
          />
          <div className="info">
            <h2>
              {champion.name} <span>- {champion.title}</span>
            </h2>
            <p>{champion.blurb}</p>
            <div className="stats">
              <div className="stat-item">
                <strong>공격력:</strong> {champion.info.attack}
              </div>
              <div className="stat-item">
                <strong>방어력:</strong> {champion.info.defense}
              </div>
              <div className="stat-item">
                <strong>마법력:</strong> {champion.info.magic}
              </div>
              <div className="stat-item">
                <strong>난이도:</strong> {champion.info.difficulty}
              </div>
              <div className="stat-item">
                <strong>역할군:</strong> {champion.tags.join(", ")}
              </div>
            </div>
          </div>
        </ModalContent>
        <CloseButton onClick={() => setModalIsOpen(false)}>닫기</CloseButton>
      </Modal>
    </>
  );
};

export default ChampionCard;
