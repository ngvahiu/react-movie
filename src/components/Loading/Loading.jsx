import React from 'react'

function Loading() {
  return (
    <div className='fixed w-full h-full flex justify-center items-center' style={{
        backgroundColor: '#ff0000'
    }}>
        <img src={require('../../assets/loading.gif')} alt='loading gif'/>
    </div>
  )
}

export default Loading