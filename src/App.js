import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import Joen from "./components/Joen";
import Platform from "./components/Platform";

const Container = styled.div``;

const Btn = styled.button`
  width: 50px;
  height: 50px;
  margin: 10px;
`;

function App() {
  const [platOrJoen, setWhat] = useState(0);
  const [click, setClick] = useState(true);
  const menu = {
    1: <Platform />,
    2: <Joen />,
  };

  console.log(click);

  return (
    <Container>
      {/* {click ? (
        <>
          <Btn
            onClick={() => {
              setClick(false);
              setWhat(1);
            }}
          >
            플랫폼 접속
          </Btn>
          <Btn
            onClick={() => {
              setClick(false);
              setWhat(2);
            }}
          >
            조은캠프
          </Btn>
        </>
      ) : null}

      {menu[platOrJoen]} */}
      <Platform/>
    </Container>
  );
}

export default App;
