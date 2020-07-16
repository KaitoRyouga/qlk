import moment from 'moment';

export default function SearchHome(variable ,object, nhanvien) {

    var nhanvienAfterSearchChinhanh = []

    if(variable.slice(0, variable.length - 1) === 'Ngaytao'){
        // console.log(nhanvien[1].Ngaytao >= object)
        // console.log(nhanvien[1].Ngaytao >= object)
        if(variable.slice(variable.length - 1, variable.length) === '1'){
            nhanvienAfterSearchChinhanh = nhanvien.filter(nv => {
    
                return(
                    nv.Ngaytao >= object
                )
    
            })
        }

        if(variable.slice(variable.length - 1, variable.length) === '2'){
            nhanvienAfterSearchChinhanh = nhanvien.filter(nv => {
    
                return(
                    nv.Ngaytao <= object
                )
    
            })
        }

        // if(nhanvienAfterSearchChinhanh)

        return(
            nhanvienAfterSearchChinhanh
        )
    }else if(variable === 'Thoigian'){

        let timeNew = moment(0)

        if(object === 'Hôm nay'){
            timeNew = moment().hours(0).minutes(0)
        }else if(object === 'Tuần này'){
            timeNew = moment().day(-4)
        }

        nhanvienAfterSearchChinhanh = nhanvien.filter(nv => {
    
            return(
                nv.Ngaytao >= timeNew
            )

        })

        return nhanvienAfterSearchChinhanh
        
    }
    else{


        if(object === null || object === '' || object === undefined){
            nhanvienAfterSearchChinhanh = [{notify: 1}]
        }else{
            nhanvienAfterSearchChinhanh = nhanvien.filter(nv => {
    
                return(
                    nv[variable] === object
                )
    
            })
    
            if(nhanvienAfterSearchChinhanh.length === 0){
                return(
                    [{notify:0}]
                )
            }
        }
    
        return(
            nhanvienAfterSearchChinhanh
        )
    }
}