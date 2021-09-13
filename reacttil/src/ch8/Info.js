import React, { useState, useEffect } from 'react'

const Info = () => {
  const [name, setName] = useState('기본 이름')
  const [nickname, setNickname] = useState('Phodol2')

  useEffect(() => {
    console.log('이펙트')
    console.log(name)
    return () => {
      console.log('클린업')
      console.log(name)
    }
  }, [name])

  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangeNickName = e => {
    setNickname(e.target.value)
  }

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickName} />
      </div>

      <div>
        <div>
          <b>이름 : </b>
          {name}
        </div>
        <div>
          <b>별명 : </b>
          {nickname}
        </div>
      </div>
    </div>
  )
}

export default Info
