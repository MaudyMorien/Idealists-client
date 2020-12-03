import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import "./InvestorDashboard.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import Button from '../../reogranisation/Questions/Button';

export default function MyMentorships(props) {
  const [userData, setUserData] = useState({});
  const history = useHistory(); 


  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.push("/InvestorStart");
  }, []);

  return (
    <div className="dashboard-container">
      <br />
      <br />
      <h2 className="title">This is {userData.firstName}'s dashboard</h2>
      <div style={{ width: "12rem", margin: "auto" }}>
      <Button text="Go back" onClick={() => history.goBack()}/>
      </div>
      <h2 className="title">My Mentorships</h2>
      <StyledCard>
        Did you apply for mentorship whilst assessing one of the ideas and want
        to see if the team picked you as one of their 3 mentors? Do it right
        here. Mentors receive a 1% equity-interest in the idea-company in
        exchange for being available to the founder-team for at least 1 hour a
        week.
      </StyledCard>
    </div>
  );
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px;
  width: 500px;
  margin: auto;
  display: flex;
  color: white;
`;
