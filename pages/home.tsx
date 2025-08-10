import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: 
    linear-gradient(135deg, #000b 0%, #222c 100%),
    url('/image/spider.jpg') center center/cover no-repeat,
    linear-gradient(135deg, #e62429 0%, #222 100%),
    url('https://www.transparenttextures.com/patterns/comic.png');
  background-blend-mode: darken, multiply, multiply;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 1rem;
  position: relative;
  overflow-x: hidden;
`;
const Logo = styled.h1`
  font-family: 'Bangers', Impact, sans-serif;
  font-size: 3.2rem;
  letter-spacing: 2px;
  color: #fff;
  margin-bottom: 1.2rem;
  animation: ${fadeIn} 1s ease;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;
const MarvelMark = styled.span`
  background: #e62429;
  color: #fff;
  font-family: Impact, 'Bangers', sans-serif;
  font-weight: bold;
  font-size: 3.2rem;
  letter-spacing: 2px;
  padding: 0.1em 0.5em 0.08em 0.5em;
  border-radius: 6px;
  box-shadow: 0 2px 12px #e6242920;
  line-height: 1.1;
  text-shadow: 0 2px 8px #b71c1c60;
  margin-right: 0.5em;
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;
const BannerWrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px #e6242940, 0 2px 12px #0003;
  padding: 1.2rem 2.2rem 0.7rem 2.2rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1.2s 0.2s backwards;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 0.7rem 0.5rem 0.3rem 0.5rem;
  }
`;
const Banner = styled.img`
  width: 320px;
  max-width: 90vw;
  display: block;
`;
const Desc = styled.p`
  font-size: 1.2rem;
  max-width: 500px;
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1.2s 0.4s backwards;
`;
// Removido bloco de tecnologias para visual mais profissional
const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: #fff;
  color: #e62429;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 8px;
  padding: 0.9rem 2.2rem;
  margin-top: 1.2rem;
  box-shadow: 0 2px 12px #0005;
  text-decoration: none;
  letter-spacing: 1px;
  transition: background 0.2s, color 0.2s, transform 0.15s;
  animation: ${fadeIn} 1.2s 0.6s backwards;
  cursor: pointer;
  &:hover {
    background: #e62429;
    color: #fff;
    transform: scale(1.08);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.98);
  }
`;
const Footer = styled.footer`
  margin-top: 3rem;
  font-size: 0.95rem;
  color: #fff8;
  text-align: center;
`;

export default function HomeLanding() {
  const router = useRouter();
  return (
    <Wrapper>
  <Logo><MarvelMark>MARVEL</MarvelMark> HQ Store</Logo>
      <BannerWrapper>
        <Banner src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MarvelLogo.svg" alt="Marvel Banner" />
      </BannerWrapper>
      <Desc>
        A Marvel HQ Store é o seu portal para o universo dos quadrinhos Marvel.<br />
        Explore, descubra e adquira suas HQs favoritas com uma experiência moderna, responsiva e segura.
      </Desc>
      <Button onClick={() => router.push('/store')}>
        <svg width="24" height="24" fill="none" stroke="#e62429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        Ver Loja
      </Button>
      <Footer>
        Desafio Front-end &copy; 2025<br />
        Jonathan Gomes
      </Footer>
    </Wrapper>
  );
}
