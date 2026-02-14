import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import confetti from "canvas-confetti";

/* ================= ANIMATIONS ================= */

const twinkle = keyframes`
  0%,100% { opacity: 0.8; }
  50% { opacity: 0.2; }
`;


const glowRing = keyframes`
  0% { transform: scale(0.85); text-shadow: 0 0 10px #fff; }
  50% { transform: scale(1); text-shadow: 0 0 40px #ffd700; }
  100% { transform: scale(0.85); text-shadow: 0 0 10px #fff; }
`;

/* ================= STYLED ================= */

const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at bottom, #0b0f2a 0%, #000 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  color: white;
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  top: ${() => Math.random() * 100}%;
  left: ${() => Math.random() * 100}%;
  animation: ${twinkle} ${() => Math.random() * 3 + 2}s infinite;
`;

const Moon = styled.div`
  position: absolute;
  top: 60px;
  right: 60px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #ffffff 40%, #ddd 70%);
  border-radius: 50%;
  box-shadow: 0 0 60px #ffffff;

  @media (max-width: 600px) {
    width: 90px;
    height: 90px;
    top: 40px;
    right: 30px;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  border-radius: 24px;
  padding: 30px;
  text-align: center;
  z-index: 2;
  position: relative;
  overflow: hidden;

  background: rgba(10, 15, 40, 0.35);
  backdrop-filter: blur(6px);

  animation: ${fadeIn} 0.6s ease;

  &::before {
    content: "";
    opacity: 0.6;
    position: absolute;
    inset: 0;
    background: url(${props =>
      props.$accepted
        ? "/images/bear4.gif"
        : "/images/bear.gif"
    }) center 35% / cover no-repeat;
    opacity: 0.8;
    z-index: 0;
    transition: background 0.4s ease;
  }
  &::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  z-index: 1;
}
  

  > * {
    position: relative;
    z-index: 2;
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 18px;
  font-weight: 700;
  letter-spacing: 1px;

  color: #ff6fa5;

  text-shadow:
    0 0 8px rgba(255,111,165,0.7),
    0 0 18px rgba(255,111,165,0.5);
`;

const ForeverText = styled.h3`
  margin-top: 30px;
  font-size: 1.4rem;
  letter-spacing: 1px;
  font-weight: 600;

  color: #ffb3d9;

  text-shadow:
    0 0 10px rgba(157, 55, 70, 0.6);
`;


const LoveText = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  margin-top: 10px;
  margin-bottom: 25px;
  font-weight: 500;

  color: #ffffff;

  text-shadow:
    0 2px 8px rgba(0,0,0,0.6);
`;



const Text = styled.p`
  font-size: 1.05rem;
  margin-bottom: 20px;
  color: #ffffff;

  text-shadow:
    0 2px 6px rgba(0,0,0,0.7);
`;



const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Button = styled.button`
  padding: 10px 22px;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;

  background: ${({ $primary }) =>
    $primary ? "#ff2e63" : "white"};

  color: ${({ $primary }) =>
    $primary ? "white" : "#ff2e63"};
`;


const YesButton = styled(Button)`
  background: #ff2e63;
  color: white;
`;

const NoButton = styled(Button)`
  background: white;
  color: #ff2e63;
`;

const FloatingNo = styled(Button)`
  position: fixed;
  background: white;
  color: #ff2e63;
  z-index: 50;
  transition: none;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  text-align: center;
`;

const Ring = styled.div`
  font-size: 110px;
  margin-top: 20px;
  animation: ${glowRing} 2s infinite;
`;

const Credit = styled.div`
  position: fixed;
  bottom: 15px;
  right: 20px;

  font-size: 0.75rem;
  letter-spacing: 1px;

  color: rgba(255, 182, 193, 0.7);
  font-family: "Poppins", sans-serif;

  text-shadow: 0 0 8px rgba(255, 105, 180, 0.4);

  z-index: 200;

`;

/* ================= COMPONENT ================= */

const ValentinePage = () => {
  const [accepted, setAccepted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showIntro, setShowIntro] = useState(true);
  const [readyClicked, setReadyClicked] = useState(false);
  const [noTries, setNoTries] = useState(0);
  const [message, setMessage] = useState("");
  const audioRef = useRef(null);
  const noRef = useRef(null);

  /* ===== READY BUTTON ===== */

  const handleReady = () => {
    setReadyClicked(true);

    // Unlock autoplay
    audioRef.current.play().catch(() => {});
    audioRef.current.pause();

    let count = 3;

    const timer = setInterval(() => {
      setCountdown(count);
      count--;

      if (count < 0) {
        clearInterval(timer);
        setShowIntro(false);

        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }, 1000);
  };


 const moveNoButton = () => {
  const button = noRef.current;
  if (!button) return;

  increaseTries();

  const card = button.parentElement; // move inside card
  const rect = card.getBoundingClientRect();

  const maxX = rect.width - button.offsetWidth - 10;
  const maxY = rect.height - button.offsetHeight - 10;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  button.style.position = "absolute";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
};


  /* ===== YES CLICK ===== */

  const handleYesClick = () => {
    setAccepted(true);
    confetti({ particleCount: 300, spread: 160 });
  }; 

const increaseTries = () => {
  setNoTries(prev => {
    const tries = prev + 1;

    if (tries === 1)
      setMessage("Hmm… that felt like a wrong click 😌");
    else if (tries === 2)
      setMessage("Hmm… are you sure? My heart says try again 💕");
    else if (tries === 3)
      setMessage("System detected extreme cuteness… retry required 😎");
    else if (tries === 4)
      setMessage("Dil toh pagal hai… phir try karega 💕");
    else if (tries === 5)
      setMessage("Background me romantic music baj raha hai 🎶");
    else if (tries >= 6)
      setMessage("Thukaraaoge thukara lo....🥹 Ham thhokar kha kar bhi tumhaare dar pe aenge 💖");

    return tries;
  });
};




  /* ===== NO ESCAPE ===== */

useEffect(() => {
  const handleMove = (e) => {
    const button = noRef.current;
    if (!button || accepted || showIntro) return;

    const card = button.parentElement;
    const cardRect = card.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();

    const centerX = btnRect.left + btnRect.width / 2;
    const centerY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (distance < 100) {
      increaseTries();

      const maxX = cardRect.width - btnRect.width - 10;
      const maxY = cardRect.height - btnRect.height - 10;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      button.style.position = "absolute";
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
    }
  };

  window.addEventListener("mousemove", handleMove);
  return () => window.removeEventListener("mousemove", handleMove);
}, [accepted, showIntro]);


  return (
    <Page>

      {/* INTRO */}
      {showIntro && (
        <Overlay>
          {!readyClicked ? (
            <div>
              <h2 style={{ marginBottom: "20px" }}>
                ⚠️ Warning… Hold Your Heart…
              </h2>
              <p style={{ marginBottom: "20px" }}>
                A thief is coming… ❤️
              </p>
              <Button
                style={{ background: "#ff2e63", color: "white" }}
                onClick={handleReady}
              >
                READY 💫
              </Button>
            </div>
          ) : (
            <div>
              <h2>Get Ready...</h2>
              <h1 style={{ fontSize: "3rem" }}>{countdown}</h1>
            </div>
          )}
        </Overlay>
      )}

      {[...Array(80)].map((_, i) => <Star key={i} />)}
      <Moon />

     <Card $accepted={accepted}>

        {!showIntro && (
          !accepted ? (
            <>
              <Title>SHAKRA ✨</Title>

              <Text>
              My beautiful <strong>DUA</strong>…  
              Under this moonlit sky, where every heartbeat whispers your name,  
              will you be my Valentine? 💖
              </Text>

               {message && (
              <Text style={{ color: "#ffd700", fontWeight: "bold" }}>
                {message}
              </Text>
            )}
             <>
            <Button id="yes-btn" $primary onClick={handleYesClick}>
              YES 💕
            </Button>

           <NoButton
            ref={noRef}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            onTouchStart={moveNoButton}   // 🔥 MOBILE SUPPORT
          >
            NO 😜
          </NoButton>
            
            </>
            </>
          ) : (
            <>
                <Title>Forever Begins 💖</Title>

                <LoveText>
                  Shakra Naaz…  
                  You are not just my DUA 🤲,  
                  you are the destiny my heart was always searching for ✨ 
                  And it chose you before I even knew 💕
                </LoveText>

                <ForeverText>
                  ✨ SHAKRA, YOU ARE MY FOREVER ✨
                </ForeverText>
              </>

          )
        )}
      </Card>

      <audio ref={audioRef} src="/music/romantic.mp3" loop />
      <Credit>
  Created by Shahid with love for Shakra 💖
</Credit>

    </Page>
  );
};

export default ValentinePage;
