import React from 'react'

export default function InfoGeneral(data){
    let Giamgia = 0
    let Soluong = 0
    let Thanhtien = 0

    let dataArr = {}

    data.forEach(item => {
        Giamgia = Number(item.Giamgia) + Number(Giamgia)
        Soluong = Number(item.Soluong) + Number(Soluong)
        Thanhtien = Number(item.Thanhtien) + Number(Thanhtien)
    });

    // console.log(Giamgia)
    // console.log(Soluong)
    // console.log(Thanhtien)
    // console.log(data)

    dataArr.Giamgia = Giamgia
    dataArr.Soluong = Soluong
    dataArr.Thanhtien = Giamgia

    // console.log(dataArr)

    return dataArr
}