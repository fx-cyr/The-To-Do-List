import React, { useEffect, useState } from "react";
import styled from "styled-components";
import lake from "../../assets/lake.jpeg";
import lion from "../../assets/lion.jpeg";
import mountain from "../../assets/mountain.jpeg";
import ottawabuilding from "../../assets/ottawabuilding.jpeg";
import road from "../../assets/road.jpeg";
import { BsChatQuote } from "react-icons/bs";

const images = [lake, lion, mountain, ottawabuilding, road];

const randomImg = images[Math.floor(Math.random() * images.length)];

const Header = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuote(data);
        // console.log(data);
        // console.log(quote);
      });
  }, [setQuote]);

  const randomQuote = quote[Math.floor(Math.random() * quote.length)];

  console.log(randomQuote);

  return (
    <Container>
      <Wrapper src={randomImg} />
      {randomQuote && (
        <>
          <Quote>
            <Icon>
              <BsChatQuote />
            </Icon>
            {randomQuote.text} - {randomQuote.author}
          </Quote>
        </>
      )}
    </Container>
  );
};

const Wrapper = styled.img`
  max-width: 400px;
  max-height: 280px;
  object-fit: cover;
  opacity: 80%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -8px;
`;

const Quote = styled.div`
  position: absolute;
  text-align: center;
  max-width: 400px;
  width: 75%;
  top: 10%;
  left: 10;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  font-family: Montserrat;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.8em;
`;

export default Header;
