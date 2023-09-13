import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 100%;
  min-height:60vh;
  max-width: 100%;
  padding: 0 20px;
  margin: 5rem auto;
  color: #fff;
`;
export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Card = styled.div`
  width: 35rem;
  height: 45rem;
  margin-top: 2rem;
  border-style: none;
`;
export const InnerBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  transform-style: preserve-3d;
  transition: transform 1.5s;
`;
export const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(2, 4, 27, 0.76);
  background-image: linear-gradient(
      rgba(2, 2, 44, 0.459),
      rgba(1, 1, 10, 0.884)
    ),
    url("../../../public/static/pixels/coolhome.jpg");
  background-position: center;
  background-size: cover;
  padding: 10%;
  box-sizing: border-box;
`;
export const Form = styled.div`
  background: #f005a21e;
  background-image: linear-gradient(
      rgba(1, 1, 31, 0.548),
      rgba(1, 1, 10, 0.884)
    ),
    url("../../../public/static/pixels/nousonphone.png");
  background-position: center;
  background-size: cover;
  padding: 3% 3% 0 3%;
  border-radius: 0 0 3% 3%;
  margin-top: 0;
  color: azure;
  border: 3px solid #032921;
`;
