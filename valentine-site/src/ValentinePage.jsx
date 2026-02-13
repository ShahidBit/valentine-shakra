import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import confetti from "canvas-confetti";

/* ================= ANIMATIONS ================= */

const twinkle = keyframes`
  0%,100% { opacity: 0.8; }
  50% { opacity: 0.2; }
`;

const shoot = keyframes`
  0% { transform: translateX(0) translateY(0); opacity: 1; }
  100% { transform: translateX(-800px) translateY(400px); opacity: 0; }
`;

const sparkle = keyframes`
  0% { text-shadow: 0 0 5px #fff; }
  50% { text-shadow: 0 0 25px #ff69b4, 0 0 50px #ffd700; }
  100% { text-shadow: 0 0 5px #fff; }
`;

const glowRing = keyframes`
  0% { transform: scale(0.85); text-shadow: 0 0 10px #fff; }
  50% { transform: scale(1); text-shadow: 0 0 40px #ffd700; }
  100% { transform: scale(0.85); text-shadow: 0 0 10px #fff; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/* ================= STYLED ================= */

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: radial-gradient(circle at bottom, #0b0f2a 0%, #000 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  position: relative;
  color: white;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  z-index: 20;
  animation: ${fadeIn} 1s ease;
  cursor: pointer;
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

const ShootingStar = styled.div`
  position: absolute;
  top: ${() => Math.random() * 40}%;
  right: -100px;
  width: 3px;
  height: 3px;
  background: white;
  animation: ${shoot} 3s linear infinite;
`;

const Moon = styled.div`
  position: absolute;
  top: 80px;
  right: 120px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #fff 40%, #ddd 70%);
  border-radius: 50%;
  box-shadow: 0 0 60px #fff;
`;

const Card = styled.div`
  backdrop-filter: blur(15px);
  background: rgba(255,255,255,0.08);
  padding: 60px;
  border-radius: 30px;
  width: 600px;
  max-width: 90%;
  text-align: center;
  z-index: 5;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${sparkle} 3s infinite;
`;

const Text = styled.p`
  font-size: 1.3rem;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 15px 35px;
  font-size: 1.1rem;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin: 10px;
  transition: 0.2s;
  background: ${({ primary }) => (primary ? "#ff2e63" : "white")};
  color: ${({ primary }) => (primary ? "white" : "#ff2e63")};

  &:hover {
    transform: scale(1.1);
  }
`;

const FloatingNoButton = styled(Button)`
  position: fixed;
  z-index: 10;
`;

const YesContainer = styled.div`
  position: relative;
  display: inline-block;
  padding: 20px 60px;
  border-radius: 50px;
  background: #ff2e63;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const BigYes = styled.div`
  font-size: 1.5rem;
`;

const TinyNo = styled.button`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 0.5rem;
  padding: 4px 8px;
  border-radius: 20px;
  border: none;
  background: white;
  color: #ff2e63;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const Ring = styled.div`
  font-size: 120px;
  margin-top: 20px;
  animation: ${glowRing} 2s infinite;
`;

/* ================= COMPONENT ================= */

const ValentinePage = () => {
  const [accepted, setAccepted] = useState(false);
  const [noTries, setNoTries] = useState(0);
  const [message, setMessage] = useState("");
  const [noMerged, setNoMerged] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const noRef = useRef(null);
  const audioRef = useRef(null);

  /* ===== MUSIC AUTOPLAY ===== */
  useEffect(() => {
    const tryPlay = async () => {
      try {
        await audioRef.current.play();
      } catch {
        setShowOverlay(true);
      }
    };
    tryPlay();
  }, []);

  const startMusic = () => {
    audioRef.current.play();
    setShowOverlay(false);
  };

  /* ===== NO BUTTON LOGIC ===== */

  const moveNoButton = () => {
    const button = noRef.current;
    const tries = noTries + 1;
    setNoTries(tries);

    const maxX = window.innerWidth - button.offsetWidth - 10;
    const maxY = window.innerHeight - button.offsetHeight - 10;

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    if (tries === 1) setMessage("Ohhh no no no DUA 😜 try again!");
    if (tries === 2) {
      setMessage("Too slow SHAKRA 😏 I'm getting faster!");
      button.style.transition = "all 0.05s linear";
    }
    if (tries === 3) {
      setMessage("FLASH MODE ⚡ Activated!");
      button.style.transition = "none";
    }
    if (tries === 4) {
      setMessage("You can't escape destiny 💫");
      button.style.opacity = "0";
      setTimeout(() => (button.style.opacity = "1"), 800);
    }
    if (tries === 5) {
      setMessage("You are persistent 😏");
    }
    if (tries >= 6) {
      setMessage("Okay fine… destiny wins 💖");
      setNoMerged(true);
      return;
    }

    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  };

  /* ===== YES CLICK ===== */

  const handleYesClick = () => {
    setAccepted(true);
    confetti({ particleCount: 300, spread: 180 });
  };

  return (
    <Page>
      {showOverlay && (
        <Overlay onClick={startMusic}>
          💖 Tap Anywhere To Begin Our Story 💖
        </Overlay>
      )}

      {[...Array(120)].map((_, i) => <Star key={i} />)}
      {[...Array(3)].map((_, i) => <ShootingStar key={i} />)}
      <Moon />

      <Card>
        {!accepted ? (
          <>
            <Title>SHAKRA ✨</Title>
            <Text>
              My beautiful <strong>DUA</strong>,  
              under this sky full of stars…  
              Will you be my Valentine? 💘
            </Text>

            {message && (
              <Text style={{ color: "#ffd700", fontWeight: "bold" }}>
                {message}
              </Text>
            )}

            {!noMerged ? (
              <Button id="yes-btn" primary onClick={handleYesClick}>
                YES 💕
              </Button>
            ) : (
              <YesContainer onClick={handleYesClick}>
                <BigYes>YES 💕</BigYes>
                <TinyNo
                  onClick={(e) => {
                    e.stopPropagation();
                    handleYesClick();
                  }}
                >
                  NO
                </TinyNo>
              </YesContainer>
            )}
          </>
        ) : (
          <>
            <Title>Forever Begins 💖</Title>
            <Text>
              Shakra… You are my DUA answered by destiny.
            </Text>
            <Ring>💍</Ring>
            <Text style={{ fontWeight: "bold" }}>
              ✨ SHAKRA, YOU ARE MY FOREVER ✨
            </Text>
          </>
        )}
      </Card>

      {!accepted && !noMerged && (
        <FloatingNoButton
          ref={noRef}
          style={{ left: "70%", top: "70%" }}
          onMouseEnter={moveNoButton}
        >
          NO 😜
        </FloatingNoButton>
      )}

      <audio ref={audioRef} src="/music/romantic.mp3" loop />
    </Page>
  );
};

export default ValentinePage;
