/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { baseUrl } from '../../constants'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CofounderPersonalityTest(props) {
  const [testResult, setTestResult] = useState('')
  const [errorCheck, seterrorCheck] = useState('false')
  const [successMsg, setSuccessMsg] = useState(false)
  const handelSubmit = async (e) => {
    e.preventDefault()
    setSuccessMsg(true)
    const response = await fetch(`${baseUrl}/users`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(testResult),
    })

    // Awaiting response.json()
    const resData = await response.json()
    console.log(resData)
    // Return response data
    return resData
  }

  const setValue = (e) => {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9a-z]+/
    setTestResult(e.target.value)

    if (e.target.value.match(format)) {
      seterrorCheck('only cpatial 4 letters allowed')
    } else if (e.target.value.length > 4) {
      seterrorCheck('only cpatial 4 letters allowed')
    } else {
      seterrorCheck('false')
    }
  }

  return (
    <div>
      <Container>
        {successMsg ? (
          <div>
            <LeftSide>
              <h3>
                Thank you. Your Profile assesement test results submitted
                successfully.
              </h3>
            </LeftSide>
          </div>
        ) : (
          <div>
            <LeftSide>
              <div>
                <h3>Take your Pesonality Test</h3>
              </div>
            </LeftSide>
            <RightSide>
              <form onSubmit={handelSubmit}>
                <label>
                  {' '}
                  <h3>Click below</h3>
                </label>
                <br />
                <a href="https://www.16personalities.com/nl">Start the test</a>
                <br />
                <br />
                <label>Upload your result here</label>
                <input type="text" value={testResult} onChange={setValue} />
                {errorCheck !== 'false' && <label>{errorCheck}</label>}
                <br />
                <button type="submit">Submit</button>
                <br />
              </form>
            </RightSide>
          </div>
        )}
      </Container>
    </div>
  )
}

const LeftSide = styled.div`
  position: absolute;
  color: #ffffff;
  top: 50%;
  left: 50%;
  width: 360px;
  height: 300px;
  margin-left: -360px;
  margin-top: -150px;
  padding-top: 10px;

  h3 {
    display: block;
    position: relative;
    left: 47px;
    width: 80%;
    font-size: 24px;
    font-weight: 500;
    padding: 5px;
    margin: 50px 5px 5px;
  }

  p {
    display: block;
    position: relative;
    left: 47px;
    top: 10px;
    width: 80%;
    font-size: 10px;
    font-weight: 300;
    padding: 5px;
    margin: 5px;
  }

  a {
    font-weight: 800;

    &:hover {
      cursor: pointer;
      color: #dfeff2;
    }
  }
`

const RightSide = styled.div`
  position: absolute;
  //color: #ffffff;
  top: 50%;
  left: 50%;
  width: 300px;
  height: auto;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-left: 0px;
  margin-top: -150px;
  border-radius: 6px;
  box-shadow: 2px 2px 23px 0px rgba(37, 37, 37, 0.39);
  background-color: rgba(255, 255, 255, 0.9);
  color: #233949;

  label {
    display: block;
    position: relative;
    left: 10%;
    width: 80%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #233949;
    padding: 0;
    margin: 0;
    border-radius: 10px;
    border-color: transparent;
    outline: none;
    -webkit-appearance: none;
  }

  input {
    display: block;
    position: relative;
    left: 10%;
    width: 80%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #233949;
    border-radius: 6px;
    border-color: transparent;
    padding: 6px;
    outline: none;
    -webkit-appearance: none;
  }

  button {
    display: inline-block;
    position: relative;
    float: right;
    right: 10%;
    width: 30%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #233949;
    border-radius: 6px;
    border-color: transparent;
    outline: none;
    -webkit-appearance: none;
    background-color: #dfeff2;
    transition: all 100ms ease-in-out;

    &:hover {
      color: white;
      background-color: #4cc5f1;
      cursor: pointer;
    }
  }

  a {
    display: inline-block;
    position: relative;
    float: left;
    left: 10%;
    margin-right: 5px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;

    color: #233949;
    outline: none;
    -webkit-appearance: none;
    transition: all 100ms ease-in-out;

    &:hover {
      cursor: pointer;
      color: #1a3d7c;
    }
  }
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
`
