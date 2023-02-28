import React, { useEffect } from 'react'

type Props = {
  setTest: (word: string) => void;
  word: string;
}

function Test(props: Props) {
  useEffect(() => {
    console.log('test')
  }, [props.word])
  return (
    <>
      <div>{props.word}</div>
      <input type="text" defaultValue={props.word} onKeyUp={e => e.code === 'Enter' ? props.setTest(e.currentTarget.value) : null } />
    </>
  )
}

function TestMain() {
  const [test, setTest] = React.useState('')
  useEffect(() => {
    console.log(test)
  }, [test])

  let props = {
    setTest,
    word: test
  }

  return (
    <Test {...props} />
  )
}

export default TestMain