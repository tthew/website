import React, { useEffect, useState } from "react";

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

  body > #___gatsby,
  body > #___gatsby > div {
    height: 100%
  }
`;

const IndexPage = ({ data }) => {
  const [tombstoneIsVisible, setTombstoneVisibility] = useState(false);
  const [epitaphIsVisible, setEpitaphVisibility] = useState(false);
  const [titleIsVisible, setTitleVisibility] = useState(false);
  useEffect(() => {
    setEpitaphVisibility(true);
    setTimeout(() => {
      setTombstoneVisibility(true);
      setTimeout(() => {
        setTitleVisibility(true);
      }, 1000);
    }, 3000);
  }, []);

  return (
    <>
      <Layout>
        <GlobalStyle />
        <SEO title="EPITAPH" />
        <Flex>
          <Header titleIsVisible={titleIsVisible}>COMING SOON!</Header>
          <Tombstone tombstoneIsVisible={tombstoneIsVisible}>
            <Epitaph epitaphIsVisible={epitaphIsVisible}>
              YOU'RE GOING TO DIE!
            </Epitaph>
          </Tombstone>
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

  height: 100%;
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
  font-size: 15vmin;
  color: ${p => p.theme.primary10};
  height: 25vmin;
  margin-top: 5vmin;

  white-space: nowrap;

  opacity: ${p => (p.titleIsVisible ? 1 : 0)};
  transition: opacity 1000ms cubic-bezier(0, 0, 0.3, 0);
  transform: skewX(-10deg);
`;

const Epitaph = styled.div`
  text-align: center;
  position: absolute;
  margin: -15vmin 0 0 15vmin;
  padding: 0 5vmin 5vmin;
  color: ${p => p.theme.primary20};
  top: 50%;
  font-size: 7vmin;
  align-self: center;
  justify-self: center;
  transform: skewY(-1deg);
  z-index: 2;

  opacity: ${p => (p.epitaphIsVisible ? 1 : 0)};
  transition: opacity 600ms cubic-bezier(0, 0, 0.3, 0),
    color 600ms cubic-bezier(0, 0, 0.3, 0);
`;

const Tombstone = styled.div`
  grid-column: 1 / 12;
  position: relative;
  width: 42vmin;
  height: 56vmin;
  border-top-right-radius: 45%;
  border-top-left-radius: 45%;

  margin: 5vmin 5vmin 0;
  transform: translateX(-1vmin) skewY(-5deg) rotate(5deg);

  ${Epitaph} {
    transform: scale(${p => (p.tombstoneIsVisible ? 1 : 3)})
      ${p =>
        p.tombstoneIsVisible
          ? css`translate(0, 0)`
          : css`translate(-2.5vmin, 6vmin)`};

    color: ${p =>
      p.tombstoneIsVisible ? p.theme.primary100 : p.theme.primary20};

    transition: opacity 600ms cubic-bezier(0, 0, 0.3, 0),
      color 600ms cubic-bezier(0, 0, 0.3, 0),
      transform 600ms cubic-bezier(0, 0, 0.3, 0);
  }

  ::before {
    position: absolute;
    display: block;
    content: " ";
    width: 42vmin;
    height: 56vmin;
    border-top-right-radius: 45%;
    border-top-left-radius: 45%;
    background: ${p => p.theme.primary100};
    opacity: ${p => (p.tombstoneIsVisible ? 1 : 0)};
    transition: opacity 600ms cubic-bezier(0, 0, 0.3, 0);
  }

  ::after {
    grid-column: 3 / 10;
    transform: translateX(5vmin) translateY(0.5vmin);
    display: block;
    content: " ";
    background: ${p => p.theme.primary90};
    width: 42vmin;
    height: 54.5vmin;
    border-top-right-radius: 45%;
    border-top-left-radius: 45%;
    border: 1vmin solid #000;
    border-bottom: none;

    opacity: ${p => (p.tombstoneIsVisible ? 1 : 0)};
    transition: opacity 600ms cubic-bezier(0, 0, 0.3, 0);
  }
`;

export default IndexPage;
