import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/hero";
import About from "../components/about";
import Experience from "../components/experience";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="Senior Freelance Web Developer in Berlin"
        keywords={[`freelance`, `web developer`, `berlin`]}
      />
      <Hero />
      <About />
      <Experience />
    </Layout>
  );
};

export default IndexPage;
