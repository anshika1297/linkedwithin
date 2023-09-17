import { styled } from "styled-components";
import { connect } from "react-redux";
import { signInApi } from "../Actions";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  return (
    <Container>
      {props.user && <Navigate to="/Home" />}
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="login-logo.svg" />
        </a>
        <div>
          <Join>Join now</Join>
          <Signin>Sign in</Signin>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1> Find Job Through Your Community</h1>
          <img src="/images/login-hero.svg" alt="login-hero.svg" />
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt="google.svg" />
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0;
`;
const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 12px;
  padding: 14px 22px;
  font-weight: bold;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    border-radius: 30px;
  }
`;
const Signin = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 30px;
  transition-duration: 180ms;
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  padding: 15px 24px;
  text-align: center;
  background-color: rgba(0 0 0 0);

  &:hover {
    background-color: #0a66c2;
    color: #f6f7f8;
  }
`;
const Section = styled.div`
  color: #2977c9;
  display: flex;
  align-content: start;
  min-height: 430px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 60px;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  max-width: 1128;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
    padding: 60px 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 50px;
    line-height: 70px;
    font-weight: 200;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2px;
    }
  }

  img {
    width: 750px;
    height: 550px;
    position: absolute;
    top: 20px;
    right: 10px;

    @media (max-width: 768px) {
      margin-top: 30px;
      top: 280px;
      width: initial;
      height: initial;
      position: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 30px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  vertical-align: middle;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
  }
`;

const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => {
    dispatch(signInApi());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
