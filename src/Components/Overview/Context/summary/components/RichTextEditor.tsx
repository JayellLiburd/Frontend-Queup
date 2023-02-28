import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import styled from "styled-components"
import { Que, Props } from ".."

function RichTextEditor(props: Props) {

  return (
    <Wrapper>
      <ReactQuill 
        theme="snow" 
        value={props.data.info.notes}
        style={{width: '100%', height: '15rem', paddingBottom: '5.5rem'}}
        ref={props.editorRef}
        tabIndex={1}
        placeholder={'Type Description Here...'}
        preserveWhitespace={true}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({id: 'RichTextEditor'})`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 7rem;
  width: 100%;
  .ql-container.ql-snow{ border: unset;}
  .ql-toolbar.ql-snow{ border: none !important;}
  #updateEdit{
    position: absolute;
    top: .5rem;
    right: 1rem;
    background-color: #fcead6;
    cursor: pointer;
  }
`

export default RichTextEditor