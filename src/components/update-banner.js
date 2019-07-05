import React from "react";
import styled, { css } from "styled-components";

const UpdateBanner = () => {
  return (
    <Wrapper>
      <Line>This website has been updated!</Line>
      <Line>
        <Link
          href="#"
          onClick={e => e.preventDefault() || window.location.reload()}
        >
          Refresh now to get the latest content
        </Link>
      </Line>
    </Wrapper>
  );
};

const Line = styled.p`
  display: block;
  margin: 0;

  ${p =>
    p.theme.mq.sm &&
    css`
      display: inline-block;
      margin-left: 0.5rem;
      :first-child {
        margin: 0;
      }
    `}
`;

const Link = styled.a`
  :link,
  :visited,
  :hover,
  :active {
    color: green;
  }
`;

const Wrapper = styled.div`
  margin: 0;
  padding: 1rem;
  text-align: center;
  background: ${p => p.theme.primary100};
  color: ${p => p.theme.primary20};
  font-family: verdana;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default UpdateBanner;
