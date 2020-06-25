import React, { useEffect, useState, useContext } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { Redirect, Link } from "react-router-dom";
import "./SpecialistDashboard.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
// import assess from '../../../res/assess-white.png'
// import invest from '../../../res/invest-white.png'
// import crowdfunding from '../../../res/crowdfunding.png'

export default function specialistDashboard(props) {
  const [userData, setUserData] = useState({});
  const [ideaList, setIdeaList] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {

    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.push("/SpecialistStart");
  }, []);

  if (props.authState.loggedIn && !props.authState.user) {
    props.user();
  }

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/specialist`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => setIdeaList(res.body));
  }, []);

  if (userLoggedIn === false) return <Redirect to="/Specialist/login" />;

  const renderTitle =
    userData && props.authState.user ? (
      <h2 className="title">
        {userData.firstName}'s{" "}
        {props.authState.user.specialistType !== "not a specialist"
          ? props.authState.user.specialistType.charAt(0).toUpperCase() +
            props.authState.user.specialistType.slice(1)
          : null}{" "}
        Specialist Dashboard
      </h2>
    ) : null;

  const renderIdeaList = () => {
    if (ideaList.length < 1) {
      return (
        <>
          {" "}
          {renderCard(props.authState.user.specialistType)}
          <h2 style={styledH2}>
            There are no idea's available in your relevant phase(s)
          </h2>
        </>
      );
    }
    if (props.authState.user.specialistType === "patent") {
      return renderPatentIdeaList();
    } else {
      const list = ideaList.map((idea) => (
        <Link
          key={idea.id}
          className="tile-link"
          to={`/Specialist/dashboard/ideas/${idea.id}`}
        >
          <div className="assess-tile" key={idea.id}>
            <p style={{ color: "black" }}>
              <b>Title: </b>
              <br />
              {idea.idea[5].answers[0].qAnswer}
            </p>
            <br />
            <p style={{ color: "black" }}>
              <b>Description: </b>
              <br />
              {idea.idea[5].answers[1].qAnswer}
            </p>
            <br />
          </div>
        </Link>
      ));

      return (
        <>
          {renderCard(props.authState.user.specialistType)}
          <div className="flex-tilescontainer">{list}</div>
        </>
      );
    }
  };

  const renderPatentIdeaList = () => {
    if (!ideaList) return null;
    else {
      const list4 = ideaList.ideasPhase4.map((idea) => (
        <Link
          key={idea.id}
          className="tile-link"
          to={`/Specialist/dashboard/ideas/${idea.id}`}
        >
          <div className="assess-tile" key={idea.id}>
            <p style={{ color: "black" }}>
              <b>Title: </b>
              <br />
              {idea.idea[5].answers[0].qAnswer}
            </p>
            <br />
            <p style={{ color: "black" }}>
              <b>Description: </b>
              <br />
              {idea.idea[5].answers[1].qAnswer}
            </p>
            <br />
          </div>
        </Link>
      ));
      const list6 = ideaList.ideasPhase6.map((idea) => (
        <Link
          key={idea.id}
          className="tile-link"
          to={`/Specialist/dashboard/ideas/${idea.id}`}
        >
          <div className="assess-tile" key={idea.id}>
            <p style={{ color: "black" }}>
              <b>Title: </b>
              <br />
              {idea.idea[5].answers[0].qAnswer}
            </p>
            <br />
            <p style={{ color: "black" }}>
              <b>Description: </b>
              <br />
              {idea.idea[5].answers[1].qAnswer}
            </p>
            <br />
          </div>
        </Link>
      ));
      if (ideaList.ideasPhase4.length < 1 && ideaList.ideasPhase6.length < 1) {
        return (
          <h2 style={styledH2}>There are no ideas available in phase 4 or 6</h2>
        );
      }
      if (ideaList.ideasPhase4.length >= 1 && ideaList.ideasPhase6.length < 1) {
        return (
          <>
            {renderCard(props.authState.user.specialistType)}
            <h2 style={styledH2}>These are ideas in phase 4</h2>
            <div className="flex-tilescontainer">{list4}</div>
            <h2 style={styledH2}>There are no ideas available in phase 6</h2>
          </>
        );
      }
      if (ideaList.ideasPhase4.length < 1 && ideaList.ideasPhase6.length >= 1) {
        return (
          <>
            {renderCard(props.authState.user.specialistType)}
            <h2 style={styledH2}>These are ideas in phase 6</h2>
            <div className="flex-tilescontainer">{list6}</div>
            <h2 style={styledH2}>There are no ideas available in phase 4</h2>
          </>
        );
      } else
        return (
          <>
            {renderCard(props.authState.user.specialistType)}
            <h2 style={styledH2}>These are ideas in phase 4</h2>
            <div className="flex-tilescontainer">{list4}</div>
            <h2 style={styledH2}>These are ideas in phase 6</h2>
            <div className="flex-tilescontainer">{list6}</div>
          </>
        );
    }
  };

  function specialistPhase(type) {
    if (type === "patent") return "4 and 6";
    if (type === "validation") return "5";
    if (type === "calculation" || type === "subsidy") return "7";
  }
  const renderCard = (type) => {
    if (!props.authState.user) return null;
    if (props.authState.user.role !== "admin") {
      return (
        <StyledCard>
          Here are the ideas that are currently in phase {specialistPhase(type)}
          .<p>You can view and edit the ideas.</p>
        </StyledCard>
      );
    } else
      return (
        <StyledCard>
          Here are all the ideas.<p>You can view and edit the ideas.</p>
        </StyledCard>
      );
  };

  return (
    <div className="dashboard-container">
      {renderTitle}
      {ideaList ? renderIdeaList() : null}
    </div>
  );
}

const styledH2 = {
  fontSize: 20,
  fontWeight: 400,
  color: "white",
};

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px;
  width: 500px;
  margin: auto;
  color: white;
  display: flex;
  flex-direction: column;
`;
