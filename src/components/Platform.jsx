import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { STATICURL } from "../static";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TempTab = styled.div`
  width: 100%;
  height: 50vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
`;

const TempBox = styled.div`
  place-items: center;
  min-width: 100px;
  min-height: 100px;
`;

const Input = styled.input`
  border: 1px solid black;
  margin-right: 5px;
`;
const Form = styled.form`
  border: 1px solid black;
  padding: 20px;
`;

export default function Platform() {
  const [accessToken, setAccessToken] = useState("");
  const [movie, setMovie] = useState("");
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState(0);

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
      setAccessToken(res.data.accessToken);
    } catch (error) {}
  }

  async function execute() {
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
      console.log(error); // 발생한 에러 표시
    }
  }

  const upload = (e) => {
    e.preventDefault();
    console.log(unit, title);
    const formData = new FormData();
    formData.append("file", movie);

    formData.append(
      "unitRequestDto",
      new Blob(
        [
          JSON.stringify({
            description: "test 강의 입니다",
            objective: "test입니다",
            title: "test unit4",
          }),
        ],
        { type: "application/json" }
      )
    );

    fetch(`${STATICURL}/open/courses/1/units`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "X-AUTH-TOKEN": accessToken,
      },
      body: formData,
      keepalive: true,
    })
      .then((res) => res)
      .then((data) => {
        alert("성공");
      })
      .catch((err) => {
        alert("실패");
      });
  };

  const logout = () => {
    fetch(`${STATICURL}/open/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then(alert("로그아웃"))
      .catch((e) => {
        alert("실패");
      });
  };

  return (
    <Wrapper>
      <TempTab>
        <TempBox>
          <button onClick={execute}>강의 시청</button>
          <button onClick={login}>로그인</button>
          <button onClick={logout}>로그아웃</button>
        </TempBox>
        <TempBox>
          <div>
            <Form>
              <Input
                type="file"
                accept={".mp4"}
                onChange={(e) => {
                  setMovie(e.target.files[0]);
                }}
                placeholder="강의 mp4를 업로드하세요"
              />
              <Input
                type="number"
                placeholder="강의 unit"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="강의 title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
              <button onClick={upload}>업로드</button>
            </Form>
          </div>
        </TempBox>
      </TempTab>
    </Wrapper>
  );
}

// 만들어야하는 기능
// 로그인 강의 업로드 플레이어 실행
