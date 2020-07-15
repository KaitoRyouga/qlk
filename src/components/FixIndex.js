import React from 'react'

export default function FixIndex(nhanvien) {

    let index = 1
    nhanvien.forEach(item => {
        item.index = index
        item.key = index
        index = index + 1
    });

    return(
        nhanvien
    )
}