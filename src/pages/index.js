import React from "react";

import SEO from "../components/seo";
import Layout from "../components/layout";
import styled, { css, createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: ${p => p.theme.uiBlack};
    font-family: Staatliches, sans-serif;
  }
`;

const IndexPage = ({ data }) => {
  return (
    <>
      <Layout>
        <GlobalStyle />
        <SEO title="EPITAPH" />
        <Flex>
          <Header>EPITAPH!</Header>
          <Tombstone />
        </Flex>
        {/* <Section>
          <Heading>One day.</Heading>
        </Section>

        <Section invertColors>
          <Heading>You will die.</Heading>
        </Section>

        <Section>
          {" "}
          <Heading>Will you live on?</Heading>
        </Section> */}
      </Layout>
    </>
  );
};

const Heading = styled.h2`
  font-size: 20vmin;
  text-align: center;
`;

const Flex = styled.div`
  display: flex;

  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;

  height: 95vh;
`;

const Section = styled.div`
  background-color: ${p => p.theme.primary90};
  color: ${p => p.theme.primary80};
  padding: 50px;

  ${p =>
    p.invertColors &&
    css`
      background-color: ${p => p.theme.primary100};
      color: ${p => p.theme.primary90};
    `}
`;

const Section2 = styled.div`
  padding: 50px;
`;

const Padding = styled.div`
  padding: 5vmin;
`;

const Header = styled.h1`
  margin: 0;
  grid-row: 2;
  grid-column: 1 / -1;
  font-size: 25vmin;
  color: ${p => p.theme.primary90};
  height: 25vmin;
`;

const Tombstone = styled.div`
  grid-column: 1 / 12;
  position: relative;
  background: ${p => p.theme.primary100};
  width: 42vmin;
  height: 56vmin;
  border-top-right-radius: 45%;
  border-top-left-radius: 45%;

  margin: 5vmin 5vmin 0;
  transform: translateX(-1vmin);

  ::before {
    content: "YOU'RE GOING TO DIE!";
    text-align: center;
    position: absolute;
    margin: -15vmin 0 0 15vmin;
    padding: 0 5vmin 5vmin;
    color: ${p => p.theme.primary100};
    top: 50%;
    font-size: 7vmin;
    align-self: center;
    justify-self: center;
    z-index: 1;
    transform: skewY(-1deg);
  }

  ::after {
    grid-column: 3 / 10;
    transform: translateX(5vmin) translateY(1vmin);
    display: block;
    content: " ";
    background: ${p => p.theme.primary90};
    width: 42vmin;
    height: 54vmin;
    border-top-right-radius: 45%;
    border-top-left-radius: 45%;
    border: 1vmin solid #000;
    border-bottom: none;
  }
`;

export default IndexPage;
