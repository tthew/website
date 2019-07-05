import React from "react";
import styled from "styled-components";

const UpdateBanner = () => {
  return (
    <Wrapper>
      <p>
        This website has been updated!{" "}
        <Link
          href="#"
          onClick={e => e.preventDefault() || window.location.reload()}
        >
          Refresh now to get the latest content
        </Link>
        .
      </p>
    </Wrapper>
  );
};

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
