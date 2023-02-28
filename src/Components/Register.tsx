import React from "react";
import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import { session } from "Connections";

function Reg() {
  function menu() {
    const menubg = document.querySelector(".burger");
    const openmenu = document.querySelector(".sidenav");
    const topnavcolor = document.querySelector(".topnav");
    const signup = document.querySelector(".signup");
    if (!menubg || !openmenu || !topnavcolor || !signup) return;
    menubg.classList.remove("open");
    openmenu.classList.remove("open");
    topnavcolor.classList.remove("open");
    signup.classList.remove("open");
  }

  function Switchform() {
    const login = document.querySelector(".login_modal");
    const signup = document.querySelector(".signup");
    if (!login || !signup) return;
    login.classList.add("open");
    signup.classList.remove("open");
  }

  let form = [];
  const submit = (e: React.FormEvent) => {
    form = [];
    e.preventDefault();
    const formdata = document.querySelector(".reg");
    if (!formdata) return;
    const formData = new FormData(formdata as HTMLFormElement);
    for (var data of formData.entries()) {
      if (data[1] !== "")
        return alert("Please fill in all registration credentials");
      form.push(data[1]);
    }
    session.register({firstName: form[0], lastName: form[1], email: form[2], username: form[3], password: form[4]});
  };

  const responseGoogle = (response: any) => {
    session.login('google', response)
  };

  return (
    <Wrapper>
      <h1>Queup Next</h1>
      <div className="glow" />
      <form className="reg">
        <div className="socials">
          <GoogleLogin onSuccess={responseGoogle} size="medium" width="350" />
        </div>
        <h2 className="close" onClick={menu}>
          X
        </h2>
        <h2>Registration</h2>
        <div className="name">
          <input
            className="inputinfo"
            type="text"
            placeholder="First Name"
            name="given-name"
            autoComplete="on"
          />

          <input
            className="inputinfo"
            type="text"
            placeholder="Last Name"
            name="family-name"
            autoComplete="on"
          />
        </div>
        <input
          className="inputreg"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="on"
        />

        <input
          className="inputreg"
          type="text"
          placeholder="Create Username"
          name="username"
          autoComplete="on"
        />

        <input
          className="inputreg"
          type="new-password"
          placeholder="Create Password"
          autoComplete="on"
        />

        <input
          className="inputreg"
          type="password"
          placeholder="Re-type Password"
          name="new-password"
          autoComplete="on"
        />
        <h3 style={{ fontSize: "1rem", fontFamily: "serif" }}>
          {"If you do have an account go to "}
          <p onClick={Switchform} style={{ color: "brown" }}>
            {" Login Page"}
          </p>
        </h3>
        <button id="btn" onClick={submit}>
          Register
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs({ className: "signup" })`
  display: flex;
  visibility: hidden;
  justify-content: center;
  width: 100vw;
  height: 0vh;
  overflow: hidden;
  background-image: url("Images/soft-grad.jpg");
  background-size: cover;
  //TODO: fix h1 its always on top
  h1 {
    position: absolute;
    top: 1.5rem;
    margin: 0;
    color: #cdc4bb;
    font-family: "Cinzel", serif;
    font-size: 2rem;
  }
  .glow {
    position: absolute;
    top: 5.5rem;
    width: 30vw;
    height: 6rem;
    border-radius: 50%;
    box-shadow: 0 -25px 30px 0 #ffefde5d;
    animation: glow 2s ease-in-out infinite;
    @keyframes glow {
      0%,
      100% {
        box-shadow: 0 -25px 30px 0 #ffefdee1;
      }
      50% {
        box-shadow: 0 -25px 30px 0 #ffefde;
      }
    }
  }
  .reg {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 5.5rem;
    width: 30vw;
    height: 0vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    overflow: hidden;
    background-color: white;
    .close {
      position: absolute;
      right: 2rem;
      top: 0rem;
      cursor: pointer;
    }
    .socials {
      padding: 1rem 1vw;
      border-bottom: 2px solid black;
    }
    h2 {
      color: #72460c;
    }
    input {
      all: unset;
      display: none;
      margin: 0.5rem 0;
      padding: 0.5rem;
      padding-left: 1rem;
      width: 20vw;
      height: 1.5rem;
      font-weight: bold;
      background-color: #8d8d8d;
      border-radius: 0.5rem;
      cursor: pointer;
      &::placeholder {
        color: white;
      }
    }
    h3 {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        text-indent: 0.3rem;
        font-size: 0.8rem;
        cursor: pointer;
      }
    }
    button {
      all: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 2rem;
      aspect-ratio: 3/1;
      width: 6rem;
      color: white;
      font-weight: bold;
      background-color: #58370b;
      border-radius: 0.5rem;
      &:hover {
        border: 1px solid black;
        color: #e0e0e0;
      }
    }
    .name {
      display: flex;
      justify-content: center;
      margin: 0;
      width: 30vw;
      margin: 0.5rem 0;
      input {
        width: 8vw;
        margin: 0 calc(0.2rem + 1vw);
      }
    }
  }
  &.open {
    visibility: visible;
    height: 100vh;
    .reg {
      display: flex;
      padding: 3rem;
      padding-top: 2rem;
      padding-bottom: 5rem;
      height: max-content;
      input {
        display: block;
      }
    }
  }
  @media (max-width: 1200px) {
    display: none;
  }
`;

export default Reg;
