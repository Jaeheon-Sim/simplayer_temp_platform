import styled from "styled-components";

import { useEffect, useState } from "react";
import { STATICURL } from "../static";

const Wrapper = styled.div`
  width: 95vw;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10vh;
`;
const Input = styled.input`
  border: 1px solid black;
  margin-right: 5px;
`;
const Form = styled.form`
  border: 1px solid black;
  padding: 20px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 5px;
  font-size: 25px;
  font-weight: bolder;
`;

const Div = styled.div`
  cursor: pointer;
`;

const Sbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

export default function Manager() {
  const [movie, setMovie] = useState("");
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState(0);

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
            description: "AL-01강",
            objective: "개념 1",
            title: "어플리케이션 설계 및 개발의 개요",
          }),
        ],
        { type: "application/json" }
      )
    );

    fetch(`${STATICURL}/open/courses/2/units`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "X-AUTH-TOKEN":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjY5OTk0MDg2LCJleHAiOjE3MDE1MzAwODZ9.3Ieu1UsdkIvcPOs8m9kRYaDrVTQFmJbd_uG_0ANg-Go",
      },
      body: formData,
      keepalive: true,
    })
      .then((res) => res)
      .then((data) => {
        alert(data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Wrapper>
      <Box>
        <Div>업로드</Div>
      </Box>
      <Sbox>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>강의를 업로드 하세요</h1>
        <br />
        <br />
        <br />
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
      </Sbox>
    </Wrapper>
  );
}
