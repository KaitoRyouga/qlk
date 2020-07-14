import React from 'react'
import convertSumMoney from './convertSumMoney'

export default function onChangeInputRange(e, dataP) {

    // console.log(dataP)

    let dataTemp = dataP
    dataTemp[dataP.length - 1].Soluong = e

    let fix = convertSumMoney(dataTemp)
    return fix
}