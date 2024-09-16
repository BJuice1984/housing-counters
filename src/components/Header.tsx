import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  color: var(--color-text-main);
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
`;

const Header = () => {
  return (
    <header>
      <Title>Список счётчиков</Title>
    </header>
  );
};

export default Header;
