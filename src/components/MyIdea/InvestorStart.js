/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Button from '../reogranisation/Questions/Button';
import posed from 'react-pose';

import InvestorRegistration from './InvestorRegistration';

const InvestorStart = (props) => {

  const [uiState, setUiState] = useState('notDisplayingLogin');
  const [emailAddress, setEmailAddress] = useState('');
  const [loginButtonEnabled, setLoginButtonEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [signUpFormValidated, setSignUpFormValidated] = useState(false);


  const newUser = () => {
    if (localStorage.getItem("currentUserJwt")) {
      props.history.push('/Investors/dashboard');
    } else {
      setUiState('displayingLogin');
    }
  };

  const existingUser = () => {
    // if (!props.authState.loggedIn)
    // setUiState('displayingLogin');
    props.history.push('/Investors/login');
  };

  const closeRegistration = () => {
    setUiState('notDisplayingLogin');
  };

  useEffect(() => {
   if (localStorage.getItem("currentUserJwt")) {
    props.history.push('/Investors/dashboard');
   }
    if (emailAddress.length > 6 && password.length > 6) {
      setLoginButtonEnabled(true);
      setSignUpFormValidated(true);
    }
  }, [emailAddress, password]);



  return (
    <Container>
      <Global styles={css`
        body {
          background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
        }
      `} />
      <Content>
        <div css={css`grid-area: content-area`}>
          <div css={css`display: flex; align-items: center; flex-direction: column;`}>
            <StartContent pose={uiState}
              css={css`display: flex; flex-direction: column; width: auto; margin-bottom: 60px;`}>
              <Heading css={css`@media only screen and (orientation:portrait) { margin-top: 60px;}`}>
                My Investor Page
              </Heading>
              <Paragraph>
                Welcome to your Investor Page. Below you can create a new account or login.
              </Paragraph>
              <Paragraph>
                If you don’t have an account yet when clicking one of the buttons, you will be asked to make
                one.
              </Paragraph>
              <Controls css={css`display: flex; flex-wrap: wrap; justify-content: flex-start;`}>
                <Button text={'New User'} onClick={newUser} />
                <Button text={'Existing User'} onClick={existingUser} />
              </Controls>
            </StartContent>
            <InvestorRegistration show={uiState === 'displayingLogin'} handleCancel={closeRegistration} props={props} />
          </div>
        </div>
      </Content>
    </Container>
  );
};

const PStartContent = posed.div({
  notDisplayingLogin: {
    y: 0,
    opacity: 1.0,
  },
  displayingLogin: {
    y: -390,
    opacity: 0.15,
  },
});

const StartContent = styled(PStartContent)`
  width: 100%;
`;


const Controls = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 80vw;
  max-width: 900px;
  height: auto;
  max-height: 500px;
  padding: 20px;
  display: grid;
  
  @media only screen and (orientation:portrait) { 
    grid-template-columns: 1fr;
    grid-template-rows:  auto auto;
    grid-template-areas: "logo-area" "content-area";
  }
  @media only screen and (orientation:landscape) { 
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    grid-template-areas: "logo-area content-area";
  }
`;

const Heading = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin: 18px 10px 80px 10px;
`;

const Paragraph = styled.div`
  display: block;
  position: relative;
  font-size: 14px;
  font-weight: 400;
  margin: 0 10px 30px;
`;

const Container = styled.div`
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
  display: flex;
`;

export default InvestorStart;
