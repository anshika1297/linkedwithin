import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import { useEffect } from "react";
import { GetUserAuth } from "./Actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.GetUserAuth();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  GetUserAuth: () => dispatch(GetUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
