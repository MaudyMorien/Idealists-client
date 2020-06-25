/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import jsonFormData from './idea-form-v1';
import { PoseGroup } from 'react-pose';
import posed from 'react-pose';
import QuestionGroup from '../../reogranisation/Questions/QuestionGroup';
import Button from '../../reogranisation/Questions/Button';
import SubmissionSideScreen from './SubmissionSideScreen';
import CompleteSubmission from './CompleteSubmission';

const Submission = (props) => {

  const [questionGroups, setQuestionGroups] = useState([...jsonFormData]);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeGroupComplete, setActiveGroupComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputFocused, setInputFocused] = useState(0);
  const [answers, setAnswers] = useState({});
  const [valueDecideProfit, setValueDecideProfit] = useState(false);
  const [valueDecideSdg, setValueDecideSdg] = useState(false);

  useEffect(() => {
    setProgress(activeGroup / questionGroups.length);
  }, [activeGroup]);


  if (!props.authState.user) {
    props.user()
  }


  const handleAnswers = (id, value) => {
    setAnswers({
      ...answers,
      [activeGroup]: {
        ...answers[activeGroup],
        [id]: value,
      },
    });
  };

  const handleNextBttnClick = () => {
    
    if ((activeGroup) === questionGroups.length) {
    } else {
      setActiveGroup(activeGroup + 1);
    }
  };

  const handleInputFocus = (isFocused) => {
    setInputFocused(isFocused);
  };

  const handleValidationChange = (status) => {
    setActiveGroupComplete(status);
  };

  const handleDecidingQuestions = (from, continues) => {
    if (continues) {
      handleAnswers(from, continues.toString());
      setActiveGroup(activeGroup + 1);
      setValueDecideProfit(false);
      setValueDecideSdg(false);
    }else if (from === 0){
      setValueDecideProfit(true)
    } else if (from === 1) {
      setValueDecideSdg(true)
    }
  };

  if (localStorage.currentUserJwt !== "" && props.authState.loggedIn === false) {
    props.setAuthLoggedInTrue()
    return <div></div>;
  }
  if (questionGroups.length === 0) return <div>Loading...</div>;
  return (
    <div>
      <Container>
        <Overlay pose={inputFocused ? 'isFocusing' : 'default'} />
        <ProgressBar pose='visible' poseKey={progress} progress={progress} />

        <SubmissionSideScreen
          title={activeGroup === questionGroups.length ? 'Almost done' : questionGroups[activeGroup].groupTitle}
          description={activeGroup === questionGroups.length ? 'Please download the Participants Agreement by pressing on the button. After reading it carefully, and if you agree with its terms and conditions, press I agree to finish your submission.' : questionGroups[activeGroup].groupDescription} />

        <Right>
          <Content>
            <PoseGroup animateOnMount={false} withParent={true} preEnterPose='preEnter'>
              {
                <PGroupContainer
                  key={`container-${activeGroup === questionGroups.length ? 'complete-submission' : questionGroups[activeGroup].id.toString()}`}>
                  {activeGroup === questionGroups.length ?
                    <CompleteSubmission groups={questionGroups} answers={answers} authState={props.authState}
                      login={props.login} /> :
                    <QuestionGroup group={questionGroups[activeGroup]}
                      answersHandler={handleAnswers}
                      handleDecidingQuestions={handleDecidingQuestions}
                      handleInputFocus={handleInputFocus}
                      handleValidationChanges={handleValidationChange}
                      key={questionGroups[activeGroup].id.toString()}
                      answers={answers[activeGroup]}
                      
                    />}
                    {(valueDecideProfit)? <div style={{color:"red" }}> <br/>We are working very hard on building a non-profit version of The Idealists as well. Unfortunately, until that is ready, we cannot accept non-profit ideas yet.
                     </div>:null}
                     {(valueDecideSdg)? <div style={{color:"red" }}> <br/>We are sorry, but you cannot continue if your idea does not fit within one of the SDGs.
                     </div>:null}
                </PGroupContainer>
              }
            </PoseGroup>
          </Content>
        </Right>
        <div css={css`position: absolute; right: 20px; bottom: 20px; width: 160px;`}>
          {activeGroup !== questionGroups.length &&
            <Button text='Next' disabled={!activeGroupComplete} onClick={handleNextBttnClick} withIcon />}
        </div>

      </Container>
    </div>
  );
};


const PProgressBar = posed.div({
  visible: {
    width: (props) => {
      return (`${Math.floor(props.progress * 100)}vw`);
    },
    transition: {
      width: { type: 'spring', stiffness: 1000, damping: 30 },
    },
  },
});

const PGroupContainer = posed.div({
  preEnter: {
    x: 400,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    scale: 0.69,
    transition: {
      default: { ease: 'easeInOut', duration: 400 },
    },
  },
  enter: {
    x: 0,
    originX: '50%',
    originY: '50%',
    opacity: 1.0,
    scale: 1.0,
    transition: {
      default: { ease: 'easeInOut', duration: 400 },
    },
  },
  exit: {
    x: -400,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    scale: 0.69,
    transition: { ease: 'easeInOut', duration: 400 },
  },
});

const ProgressBar = styled(PProgressBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 20px;
  border-radius: 5px;
  background-image: linear-gradient(to right, #1a3d7c, #ffffff);
  opacity: 0.6;
`;

const POverlay = posed.div({
  default: {
    backgroundImage: 'linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1)',
    transition: {
      ease: 'easeInOut',
      duration: 120,
    },
  },
  isFocusing: {
    backgroundImage: 'linear-gradient(to right top, #142f60, #043864, #004067, #004869, #084f69)',
    transition: {
      ease: 'easeInOut',
      duration: 120,
    },
  },
});


const Overlay = styled(POverlay)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 90vw;
  max-width: 800px;
  height: auto;
  padding: 20px;
`;

const Right = styled.div`
grid-area: right;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
`;

export default Submission;
