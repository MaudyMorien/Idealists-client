import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../../constants";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import Button from "../../../reogranisation/Questions/Button";
import CommentRender from "./CommentRender";
import CommentForm from "./CommentForm";
import "./CommentSection.css";

export default function CommentSection(props) {
  const { id, show, loading } = props;
  const [commentsData, setCommentsData] = useState([]);
  const [showAddComment, setShowAddComment] = useState(false);
  
  const fetchComments = () => {
    request
      .get(`${baseUrl}/ideas/${id}/comments`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => {
        setCommentsData(res.body);
      });
  }
  useEffect(() => {
    fetchComments()
  }, []);

  const renderComments = () => {
    if (commentsData.length === 0)
      return (
        <StyledCard>
          There are currently no specialist comments on this idea.
        </StyledCard>
      );
    else
      return commentsData.map((comment) => {
        console.log("comment:", comment)
        return (
          <CommentRender
            token={props.authState.token}
            id={id}
            loaded={loading}
            reFetch={fetchComments}
            key={comment.id}
            date={comment.createdAt}
            comment={comment.comment}
            user={comment.user}
            idComment={comment.id}
            commentForm={CommentForm}
          />
        );
      });
  };

  const renderAddComment = () => {
    if (!showAddComment)
      return (
        <StyledCard>
          <Button
            text="Add Comment"
            onClick={() => setShowAddComment(!showAddComment)}
          />
        </StyledCard>
      );
    else
      return (
        <CommentForm
          token={props.authState.token}
          id={id}
          loaded={loading}
          reFetch={fetchComments}
          showForm={(e) => setShowAddComment(e)}
        />
      );
  };

  return (
    <>
      <StyledCard>
        <Button text="Hide Comments" onClick={() => show(false)} />
      </StyledCard>
      <div className="commentsectioncontent">{renderComments()}</div>
      {renderAddComment()}
    </>
  );
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;
