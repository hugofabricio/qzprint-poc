import React, { useState, useEffect } from 'react'
import * as qz from 'qz-tray'
import { sha256 } from 'js-sha256'

const Print = () => {
  const [printer, setPrinter] = useState('')
  const [connected, setConnected] = useState(false)

  qz.api.setSha256Type((data) => sha256(data))
  qz.api.setPromiseType((resolver) => new Promise(resolver))

  useEffect(() => {
    qz.websocket
      .connect()
      .then(qz.printers.getDefault)
      .then((printer) => {
        setConnected(true)
        setPrinter(printer)
      })
      .then()
      .catch((e) => console.error(e))
  }, [])

  const handleOnClick = () => {
    qz.printers.getDefault().then((printer) => {
      var config = qz.configs.create(printer)
      var data = ['Teste impressão']
      qz.api.showDebug(true)
      return qz.print(config, data)
    })
  }

  return (
    <>
      {connected ? (
        <>
          <p>The default printer is: {printer}</p>
          <button onClick={() => handleOnClick()}>Imprimir</button>
        </>
      ) : (
        <p>Conectando...</p>
      )}
    </>
  )
}

export default Print
