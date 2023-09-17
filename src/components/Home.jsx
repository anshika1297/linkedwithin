import { styled } from "styled-components";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <div>
      {!props.user && <Navigate to="/" />}
      <Header />
      <Container>
        <Section>
          <h5>
            <a>Hiring in a Hurry?- </a>
          </h5>
          <p>
            {" "}
            &nbsp; Find Talented pros in record time with LinkWithIn & Keep
            Business Moving
          </p>
        </Section>

        <Layout>
          <LeftSide />
          <Main />
          <RightSide />
        </Layout>
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding-top: 50px;
  max-width: 100%;
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1128px;
`;
const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  display: flex;
  text-decoration: underline;
  justify-content: center;

  h5 {
    color: #0a66c2;
    font-size: 14px;

    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    font-weight: 600;
    color: #434649;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 10px 100px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    margin: 10px 0px;
  }
`;
const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

export default connect(mapStateToProps)(Home);
