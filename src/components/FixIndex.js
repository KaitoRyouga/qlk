export default function FixIndex(nhanvien) {

    let indexCount = 1
    nhanvien.forEach(item => {
        item.index = indexCount
        item.key = indexCount
        indexCount = indexCount + 1
    });

    return(
        nhanvien
    )
}