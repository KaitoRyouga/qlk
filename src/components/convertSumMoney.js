export default function convertSumMoney(data){

    let Thanhtien = 0
    let Soluong = ''
    let Giamgia = ''
    let Dongia = ''
    let dataTemp = {}

    let dataArr = []
    data.forEach(item => {
        Soluong = String(item.Soluong).split(".").join("");
        Giamgia = String(item.Giamgia).split(".").join("");
        Dongia = String(item.Dongia).split(".").join("");
        Thanhtien = Number(Soluong) * Number(Dongia) - Number(Giamgia)
        dataTemp = item
        dataTemp.Thanhtien = String(Thanhtien)
        dataArr.push(dataTemp)
    });
    
    return dataArr
}