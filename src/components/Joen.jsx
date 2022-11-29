import axios from "axios";
import styled from "styled-components";
import joen from "../image/camp.png";
import { STATICURL } from "../static";

const Div = styled.div`
  position: relative;
`;

const Btn = styled.div`
  position: absolute;
  width: 29px;
  height: 18px;
  background-color: transparent;
  z-index: 200;
  left: 1305px;
  top: 508px;
  cursor: pointer;
`;

const BtnS = styled(Btn)`
  left: 1305px;
  top: 545px;
`;

export default function Joen() {
  async function login() {
    try {
      const res = await axios.post(
        `${STATICURL}/open/auth/login`,
        {
          account: "test",
          password: "test",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(res.data.accessToken);
      execute(res.data.accessToken);
    } catch (error) {}
  }

  async function execute(accessToken) {
    try {
      const res = await fetch(`${STATICURL}/open/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "X-AUTH-TOKEN": accessToken,
        },
        body: JSON.stringify({ unitId: 1, courseId: 1 }),
      });
      const json = await res.json();
      window.open(json.redirectUrl, "_blank");
    } catch (error) {
      alert("실패");
      console.log(error);
    }
  }

  return (
    <Div>
      <Btn onClick={login} />
      <BtnS onClick={login} />
      <Btn style={{ left: "1305px", top: "580px" }} onClick={login} />
      <Btn style={{ left: "1305px", top: "620px" }} onClick={login} />
      <Btn style={{ left: "1305px", top: "655px" }} onClick={login} />
      <Btn style={{ left: "1305px", top: "690px" }} onClick={login} />
      <Btn style={{ left: "1305px", top: "730px" }} onClick={login} />
      <Btn style={{ left: "1305px", top: "765px" }} onClick={login} />

      <img src={joen} alt="" />
    </Div>
  );
}
