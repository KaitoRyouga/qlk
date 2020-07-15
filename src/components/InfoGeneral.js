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

    dataArr.Giamgia = Giamgia
    dataArr.Soluong = Soluong
    dataArr.Thanhtien = Thanhtien

    return dataArr
}