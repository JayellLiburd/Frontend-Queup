import { BusinessTypes } from "Connections/lib/@Types";
import React, { useContext } from "react";
import styled from "styled-components";
import { Updater } from "../../Helpers/Context";

type Options = {
  carousel?: boolean;
};
function VStack(
  props: { header: string; results: Array<BusinessTypes> },
  options: Options = { carousel: true }
) {
  const placeHolders = Array(7).fill("");

  let RowCount = 5;
  if (window.innerWidth > 1400) {
    RowCount = 7;
  }

  const { setListener, setMedia } = useContext(Updater);
  function Displaymedia(item: BusinessTypes) {
    setMedia(item);
    setListener(true);
    const outofbounds = document.querySelector(".card");
    if (outofbounds) outofbounds.classList.add("open");
  }

  return (
    <Wrapper property={props.header}>
      {props.results.length !== 0 ? (
        <>
          <h2>{props.header}</h2>
          {shuffle(props.results)
            .filter((_, index) => index < RowCount)
            .map((item) => {
              return (
                <div
                  className="carousellcard"
                  onClick={(e) => Displaymedia(item)}
                  key={item.name}
                >
                  <div>
                    <img
                      src={
                        "https://storage.googleapis.com/queup-images/" +
                        item.image
                      }
                      alt=""
                      loading="lazy"
                    />
                    <h3 className="h3">{item.name}</h3>
                    <p>{"20 in Queue"}</p>
                  </div>
                  <h4>{item.open}</h4>
                </div>
              );
            })}
        </>
      ) : (
        <>
          <h2>{props.header}</h2>
          {placeHolders
            .filter((_, index) => index < RowCount)
            .map((item) => {
              return (
                <div
                  className="carousellcard empty"
                  onClick={(e) => Displaymedia(item)}
                  key={item.name}
                >
                  loading
                </div>
              );
            })}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs((props) => ({ id: props.property }))`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  h2 {
    margin: 0.5rem 1rem;
    padding: 0;
    color: #686767;
    font-size: 1rem;
    font-family: "Cinzel", serif;
    font-weight: 600;
  }
  .carousellcard {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    margin: 0.5rem 0;
    width: 100%;
    min-height: 4rem;
    color: white;
    border-radius: 0.8rem;
    background-color: #5c5c5c;
    cursor: pointer;
    &:nth-child(2n) {
      background-color: saddlebrown;
    }
    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: -5rem;
      .h3 {
        margin: unset;
        color: white;
        margin: 0 2rem;
        min-width: 15rem;
      }
      p {
        margin: 0;
        font-size: 0.8rem;
      }
    }
    &.empty {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #c0c0c0a6;
      background: #eee;
      background: linear-gradient(110deg, #ececec 8%, #f7f7f7 18%, #ececec 33%);
      border-radius: 5px;
      background-size: 200% 100%;
      animation: 1.5s shine linear infinite;
      cursor: default;
      &:nth-child(2n) {
        background: #e2e1e1;
      }
      @keyframes shine {
        to {
          background-position-x: -200%;
        }
      }
    }
  }
  @media (max-width: 1400px) {
    .carousellcard {
      div {
        .h3 {
          margin: unset;
          color: white;
          font-size: 0.8rem;
          margin: 0 0.5rem;
          min-width: unset;
          font-size: 0.9rem;
        }
      }
      h4 {
        font-size: 0.9rem;
        margin-right: 0.5rem;
      }
    }
  }
`;

function shuffle(array: Array<BusinessTypes> = []) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default VStack;
