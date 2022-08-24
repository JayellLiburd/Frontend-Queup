import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'

import { createbusContext } from './Create'
import Temp from './temp.png'



function Modeling() {

    const {preview, setPreview, preview2, setPreview2,} = useContext(createbusContext)
    console.log(preview)


    function uploadHandler(e) {
        const data = new FormData();
        data.append('file', e.target?.files[0]);
        console.log(data)
    }


  return (
    <Wrapper>
        
        <section>
            <div className='views'>Small View
                <div id='mobile'>
                    <svg width="233" height="420" viewBox="0 0 233 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group 1">
                            <rect id="Rectangle 1" x="5.5" y="1.5" width="223" height="417" rx="21.5" fill="black" fill-opacity="0.75" stroke="black" stroke-width="3"/>
                            <rect id="Rectangle 7" x="7" y="51" width="219" height="336" fill="#ECECEC"/>
                            <circle id="Ellipse 1" cx="157.5" cy="37.5" r="5.5" fill="#D9D9D9"/>
                            <rect id="Rectangle 3" x="82" y="32" width="64" height="11" rx="5.5" fill="#D9D9D9"/>
                            <rect id="Rectangle 8" x="68" y="401" width="95" height="5" rx="2.5" fill="#EEEEEE"/>
                            <rect id="Rectangle 4" x="229" y="71" width="4" height="26" fill="black"/>
                            <rect id="Rectangle 5" y="71" width="4" height="26" fill="black"/>
                            <rect id="Rectangle 6" y="100" width="4" height="26" fill="black"/>
                        </g>
                    </svg>
                    <div class="upload-btn-wrapper btn2">
                        <button class="btn">{preview2[1] === true ? 'Upload' : 'Change'}
                            <input type="file" name="myfile" onChange={(e) => e.target.files[0] ? setPreview2(URL.createObjectURL(e.target.files[0])): setPreview2(Temp)} />
                        </button>
                    </div>
                    <div className="gradient" />
                    <img src={preview2[1] ? preview2 : Temp} alt="" />
                </div>
            </div>
            <div className='views'>Full View
                <img id='full-view' src='Images/queup-home.jpg' alt="" />
                <div id='website'> 
                    <div class="upload-btn-wrapper">
                        <button class="btn">{preview[1] === true ? 'Upload Cover' : 'Change Cover'}</button>
                        <input type="file" name="myfile" onChange={(e) => e.target.files[0] ? setPreview(URL.createObjectURL(e.target.files[0])): setPreview(Temp)} />
                    </div>
                    <div id="gradient" />
                    <img src={preview[1] ? preview : Temp} alt=''/>
                </div>
            </div>
        </section>

    </Wrapper>
  )
}

const Wrapper = styled.div`
    position: relative;
    top: 5rem;
    
    section{
        display: flex;
        flex-direction: row;
        margin-right: 8rem;

        height: 20rem;

        input{width: 5rem;}
    }

    h3{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 9rem;
        left: 40%;

        width: 2rem;
        height: 2rem;
        
        border: 2px solid #c9c9c9;
        box-shadow: 0 0 10px #636363;
        border-radius: 50%;
    }

    .views{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start; 

        font-weight: bold;
        font-family: serif;
        font-size: 1.2rem; 

        min-width: 22rem;
        height: 20rem;

        #full-view{position: relative; top: 1.5rem; width: 36rem; height: 26rem; border: 3px solid; border-radius: 1rem; z-index: 2;}

        #mobile{
            display: flex;
            align-items: center;
            justify-content: center; 
            margin-top: -.5rem;
            margin-bottom: 1rem;

            transform: scale(1);
            min-height: 30rem;
            text-decoration: none;

            /* background: linear-gradient(0deg, rgba(182,182,182,1) 0%, rgba(237,237,237,1) 4%, rgba(237,237,237,1) 96%, rgba(182,182,182,1) 100%); */
            /* box-shadow: 0 0 10px #636363; */
            /* border-radius: 1rem; */

            overflow: hidden;
            z-index: 2;

            svg{z-index: 1;}
            .gradient{position: absolute; width: 6rem; height: 10rem; background: linear-gradient(180deg, rgba(255,255,255,0) 50%, #242424ca 100%); z-index: 6; border-radius: 1rem;}
            img{position: absolute; width: 6rem; height: 10rem;  z-index: 5; border-radius: 1rem;}
            .upload-btn-wrapper { top: 21rem; left: 3.6rem; height: 2rem;
                .btn{ width: 7rem; height: 2rem; font-size: .8rem; margin-top: 0; padding: 0; border-radius: 2rem;}
                input{margin-top: 0rem; height: 2rem;}
            }

        }

        #website{
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative; 
            top: -62%;
            left: -.6rem;

            z-index: 5;

            #gradient{position: absolute; width: 12.5rem; height: 6.8rem; background: linear-gradient(180deg, rgba(255,255,255,0) 50%, #242424ca 100%); z-index: 6; border-radius: .5rem;}
            img{width: 12.5rem; height: 6.8rem; border-radius: .5rem;}
            .upload-btn-wrapper {left: 1rem; bottom: -2.5rem;
                .btn{ margin: 0; padding: 0;}
                input{margin-top: 0rem; width: 10rem; height: 1.5rem;}
            }
           
        }
    }

    .upload-btn-wrapper {
        position: absolute;
        /* overflow: hidden; */
        display: inline-block;
        z-index: 10;
        text-decoration: unset !important;
        &.btn2{
            top: 0rem;
            left: unset;
        }
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center; 
        border: 2px solid gray;
        color: #252525cf;
        background-color: #ffffffa4;
        width: 10rem;
        height: 1.3rem;
        padding: 8px 20px;
        border-radius: 2rem;
        font-size: 15px;
        font-weight: bold;
    }

    .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        
    }

    

    @media (max-width: 550px) {
        height: 35rem;
        section{display: flex; flex-direction: column; margin-right: unset;}

        .views{
            min-width: 10rem; 
            font-size: 1rem;
            margin-top: -5rem;
            margin-bottom: 3rem;
            h3{
                top: 4.5rem; 
                left: 33%
            }
            #mobile{
                margin-top: -8rem;
                width: 6.5rem; 
                height: 10rem; 
                img{
                    width: 3rem; 
                    height: 5rem; 
                    border-radius: .5rem;}
                .gradient{
                    width: 3rem; 
                    height: 5rem; 
                    border-radius: .5rem;}
                .upload-btn-wrapper {
                    left: -.3rem; 
                    bottom: -2.5rem;
                    .btn{
                        position: relative;
                        margin: .5rem 0;
                        left: .3rem;
                        width: 6.4rem; 
                    }
                }
            }
            #website{
                top: -38%;
                left: -.3rem;
                width: 6.5rem; 
                height: 10rem; 
                margin-top: 1.5rem;
                img{
                    position: relative;
                    top: -.6rem;
                    width: 5.35rem; 
                    height: 2.5rem;
                    border-radius: .3rem;
                }
                #gradient{
                    top: 2.1rem;
                    width: 5.4rem; 
                    height: 2rem;
                }
                .btn{
                        position: relative;
                        left: -2.5rem;
                }
            }
            #full-view{
                top: 1rem; 
                width: 15rem; 
                height: 10rem;
            }
        }
    }
`

export default Modeling