import React from "react";
import styled from "styled-components";
import lake from "../../assets/lake.jpeg";
import lion from "../../assets/lion.jpeg";
import mountain from "../../assets/mountain.jpeg";
import ottawabuilding from "../../assets/ottawabuilding.jpeg";
import road from "../../assets/road.jpeg";

const images = [lake, lion, mountain, ottawabuilding, road];

const randomImg = images[Math.floor(Math.random() * images.length)];

const Header = () => {
  return <Wrapper src={randomImg} />;
};

const Wrapper = styled.img`
  max-width: 400px;
  max-height: 270px;
  object-fit: cover;
`;

export default Header;
