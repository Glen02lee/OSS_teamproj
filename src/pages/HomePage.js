import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// style
const HomeContainer = styled.div`
  background-image: url("https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1555bd509c011b34/64f8e539b6443f20e84cbce7/Lux-League-of-Legends.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f0f4f9;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  color: #00aaff;
  text-shadow: 0 0 10px #007bff, 0 0 20px #00aaff;
`;

const Description = styled.p`
  font-size: 1.5rem;
  max-width: 600px;
  line-height: 1.5;
  color: #e1e6f0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 25px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const StyledButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(to right, #007bff, #00aaff);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 20px 40px;
  border-radius: 10px;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0056b3, #007bff);
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  }
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Title>Welcome to the League Rune Manager</Title>
      <Description>
        챔피언을 선택하고 나만의 룬 세트를 저장해 보세요! 더 강력한 플레이를
        경험해보세요.
      </Description>
      <ButtonContainer>
        <StyledButton to="/add">새로운 룬 추가</StyledButton>
        <StyledButton to="/sets">내 룬 세트 보기</StyledButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default HomePage;
