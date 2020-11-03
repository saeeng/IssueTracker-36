import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainPageLayout = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

MainPageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
`;

const Main = styled.main`
  width: 100%;
  max-width: 600px;
`;

export default MainPageLayout;