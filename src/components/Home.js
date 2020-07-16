import React, { Component } from 'react'
import './Home.css'

import { Col, Row, Typography, Form, Input, Button, List, Table, Select  } from 'antd'
import { CSVLink } from "react-csv"
import { DatePicker } from 'antd';
import moment from 'moment';
import FixIndex from './FixIndex'
import SearchHome from './SearchHome'
import duplicate from './duplicate';

const { Option } = Select;
const { RangePicker } = DatePicker;

let nhanvien = [
    {
      key: 1,
      index: 1,
      Chinhanh: 'Hồ chí minh',
      Maphieu: 'PKK20180819',
      Ngaytao: 1579911400000,
      NCC: "Công ty TNHH Bulter Viet Nam",
      Nguoitao: "Nguyễn Văn A",
      Tongtienhang: 5000000,
      Giamgia: 100000,
      TiendatraNCC: 4900000,
      Trangthai: "Hoàn thành",
      Ghichu: "",
    }
]

const dataList = [
    {
        content: 'Tìm kiếm'
    },
    {
        content: 'Thêm'
    },
    {
        content: 'Sao chép'
    },
    {
        content: 'Chỉnh sửa'
    },
    {
        content: 'Hủy phiếu'
    },
    {
        content: 'Xuất file'
    },
]

const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    //   render: text => <a>{text}</a>,
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'Chinhanh',
      key: 'Chinhanh',
    },
    {
        title: 'Mã phiếu',
        dataIndex: 'Maphieu',
        key: 'Maphieu'
    },
    {
        title: 'Ngày lập phiếu',
        dataIndex: 'Ngaytao',
        key: 'Ngaytao',
        render: (Ngaytao) => {
            return(
                <DatePicker defaultValue={Ngaytao}></DatePicker>
            )
        }
    },
    {
        title: 'Nhà cung cấp',
        dataIndex: 'NCC',
        key: 'NCC'
    },
    {
        title: 'Người lập phiếu',
        dataIndex: 'Nguoitao',
        key: 'Nguoitao'
    },
    {
        title: 'Tổng tiền hàng',
        dataIndex: 'Tongtienhang',
        key: 'Tongtienhang'
    },
    {
        title: 'Giảm giá',
        dataIndex: 'Giamgia',
        key: 'Giamgia'
    },
    {
        title: 'Đã trả',
        dataIndex: 'TiendatraNCC',
        key: 'TiendatraNCC'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'Trangthai',
        key: 'Trangthai'
    },
    {
        title: 'Ghi chú',
        dataIndex: 'Ghichu',
        key: 'Ghichu'
    },
]

class Home extends Component {

    constructor(props) {
        super(props);
        this.exportBtn = React.createRef();
        this.SearchBtn = React.createRef();
    }

    handleClickRoot = (MaNhanvien) => {
        this.props.handleClickView(MaNhanvien)
    }
    

    state = {
        infoCopy: [],
        data: [],
        headers: [],
        active: false,
        data2: [],
        dataSource: [],
        dataSourceTemp: [],
        datanhanvien: []
    }

    handleExport = () => {

        const headers = []
        const data = []

        for (let index = 0; index < columns.length; index++) {
            headers.push({label: columns[index].title, key: columns[index].dataIndex}) 
        }

        for (let index = 0; index < this.state.data2.length; index++) {
            try {
                data.push({
                    index: this.state.data2[index].index,
                    Chinhanh: this.state.data2[index].Chinhanh,
                    Maphieu: this.state.data2[index].Maphieu,
                    Ngaytao: this.state.data2[index].Ngaytao,
                    NCC: this.state.data2[index].NCC,
                    Nguoitao: this.state.data2[index].Nguoitao,
                    Tongtienhang: this.state.data2[index].Tongtienhang,
                    Giamgia: this.state.data2[index].Giamgia,
                    TiendatraNCC: this.state.data2[index].TiendatraNCC,
                    Trangthai: this.state.data2[index].Trangthai,
                })
            } catch (error) {
                //
            }
        }

        this.setState({
            data: data,
            headers: headers,
            active: true
        })

        if(this.state.active === true){
            this.exportBtn.current.link.click();
        }

        if (this.state.data !== []) {
            this.setState({
              active: true
            });
            if (this.isCsvFileReady()) {
              this.exportBtn.current.link.click();
              this.setState({
                  active: false
              })
            } else {
              setTimeout(() => {
                if (this.isCsvFileReady()) {
                  this.exportBtn.current.link.click();
                  this.setState({
                    active: false
                })
                }
              }, 1000);
            }
        }
    }

    isCsvFileReady = () => {
        return this.exportBtn && 
        this.exportBtn.current &&
        this.exportBtn.current.link &&
        this.exportBtn.current.link.click &&
        typeof this.exportBtn.current.link.click === 'function';
    }

    onFinish = values => {
        console.log('Success:', values);
        // this.props.SearchNV(values)
        this.handleClickSearchHome(values)
    };

    handleClickSearchHome = (values) => {

        this.setState({
            datanhanvien: nhanvien
        })

        let dataTempChinhanh = SearchHome('Chinhanh' ,values.Chinhanh, this.state.datanhanvien)
        let dataTempMaphieu = SearchHome('Maphieu' ,values.Maphieu, this.state.datanhanvien)
        let dataTempNguoitao = SearchHome('Nguoitao' ,values.Nguoitao, this.state.datanhanvien)
        let dataTempTrangthai = SearchHome('Trangthai' ,values.Trangthai, this.state.datanhanvien)
        let dataTempThoigian = SearchHome('Thoigian' ,values.Thoigian, this.state.datanhanvien)

        let dataTempNgayTao = []
        try {
            let dataTempNgayTao1 = SearchHome('Ngaytao1' ,values.Ngaytao[0], this.state.datanhanvien)
            let dataTempNgayTao2 = SearchHome('Ngaytao2' ,values.Ngaytao[1], this.state.datanhanvien)

            for (let index = 0; index < dataTempNgayTao1.length; index++) {
                for (let index2 = 0; index2 < dataTempNgayTao2.length; index2++) {
                    if(dataTempNgayTao1[index] === dataTempNgayTao2[index2]){
                        dataTempNgayTao.push(dataTempNgayTao1[index])
                    }
                }
                
            }
        } catch (error) {
            
        }

        // console.log(moment().day(2).format('DD/MM/YYYY : HH:mm'))

        let dataTemp1 = [].concat(dataTempChinhanh, dataTempMaphieu, dataTempNguoitao, dataTempTrangthai, dataTempNgayTao)
        
        let dataTemp = duplicate(dataTemp1, dataTempThoigian)

        try {
            if(dataTempChinhanh[0].notify === 0 || dataTempMaphieu[0].notify === 0 || dataTempNguoitao[0].notify === 0 || dataTempTrangthai[0].notify === 0 || dataTempNgayTao[0].notify === 0){
                dataTemp = []
            }
        } catch (error) {
            
        }

        this.setState({
            datanhanvien: dataTemp
        })
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    componentDidUpdate(prevProps, prevState) {

        if(prevState.dataSource === this.state.dataSource ){

            if(this.props.activeSearch === 1){
                this.setState({
                    dataSource: this.props.nhanvienSearch
                })
            }
        }

        if(prevProps.nhanvienSearch !== this.props.nhanvienSearch){

            this.setState({
                dataSource: this.props.nhanvienSearch
            })
        }
    }

    componentDidMount() {

        this.setState({
            dataSource: this.props.nhanvien,
            datanhanvien: nhanvien
        })

        let dataTemp = this.props.dataChange

        try {

            if(dataTemp.action === 'edit'){
                let dataEdit = nhanvien.findIndex(nv => {
                    return(
                        nv.Maphieu === dataTemp.Maphieu
                    )
                })
    
                let newNV1 = nhanvien.slice(0, dataEdit)
                let newNV3 = nhanvien.slice(dataEdit+1, nhanvien.length)
        
        
                let newNV12 = [].concat(newNV1, dataTemp)
                let newNV = [].concat(newNV12, newNV3)
    
                nhanvien = newNV

                FixIndex(nhanvien)

                this.setState({
                    datanhanvien: nhanvien
                })
            }
            else{
                let data = [].concat(nhanvien, dataTemp)

                nhanvien = data
        
                FixIndex(nhanvien)

                this.setState({
                    datanhanvien: nhanvien
                })
            }
        } catch (error) {
            let data = [].concat(nhanvien, dataTemp)

            nhanvien = data
    
            FixIndex(nhanvien)

            this.setState({
                datanhanvien: nhanvien
            })
        }

    }

    handleClickRemove = () => {

        let nhanvienAfterDelete = []

        this.state.data2.forEach(item => {
            let itemTemp = item
            if(nhanvienAfterDelete.length !== 0){
                nhanvien = nhanvienAfterDelete
                nhanvienAfterDelete = []
            }
            nhanvienAfterDelete = nhanvien.filter(nv => {
                return(
                    nv.Maphieu !== itemTemp.Maphieu
                )
            })

        });

        nhanvien = nhanvienAfterDelete

        this.setState({
            datanhanvien: nhanvien
        })
    }

    handleClickMaphieu = (Maphieu) => {
        // console.log('kaito')
        // this.setState({
        let dataTemp = this.state.datanhanvien.filter((item) => {
            return item.Maphieu === Maphieu
        })

        this.props.handleClickMaphieu(dataTemp)
        // })
    }

    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.handleClickColumn(selectedRows)
                this.setState({
                    data2: selectedRows
                })
            },
        };

        const columns = [
            {
              title: '#',
              dataIndex: 'index',
              key: 'index',
            },
            {
              title: 'Chi nhánh',
              dataIndex: 'Chinhanh',
              key: 'Chinhanh',
            },
            {
                title: 'Mã phiếu',
                dataIndex: 'Maphieu',
                key: 'Maphieu',
                render: (Maphieu) => {
                    return(
                        <Typography style={{ cursor: 'pointer' }} onClick={() => this.handleClickMaphieu(Maphieu)}>{Maphieu}</Typography>
                    )
                }
            },
            {
                title: 'Ngày lập phiếu',
                dataIndex: 'Ngaytao',
                key: 'Ngaytao',
                render: (Ngaytao) => {
                    return(
                        <span>
                            {moment(Ngaytao).format('DD/MM/YYYY : HH:mm')}
                        </span>
                    )
                }
            },
            {
                title: 'Nhà cung cấp',
                dataIndex: 'NCC',
                key: 'NCC'
            },
            {
                title: 'Người lập phiếu',
                dataIndex: 'Nguoitao',
                key: 'Nguoitao'
            },
            {
                title: 'Tổng tiền hàng',
                dataIndex: 'Tongtienhang',
                key: 'Tongtienhang'
            },
            {
                title: 'Giảm giá',
                dataIndex: 'Giamgia',
                key: 'Giamgia'
            },
            {
                title: 'Đã trả',
                dataIndex: 'TiendatraNCC',
                key: 'TiendatraNCC'
            },
            {
                title: 'Trạng thái',
                dataIndex: 'Trangthai',
                key: 'Trangthai'
            },
            {
                title: 'Ghi chú',
                dataIndex: 'Ghichu',
                key: 'Ghichu'
            },
        ]

        return (
            <div className="ContentHome">
                <div className="BoxContent">
                    <Typography style={{color: 'white'}}>
                        Quản lý nhân viên
                    </Typography>
                </div>
                <div className="BoxContentBottom">
                    <div className="InputNV">
                        <Form
                            id="formSearchHome"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Row>
                                <Col span={8}>
                                    <Form.Item name="Chinhanh" label="Chi nhánh">
                                            <Select>
                                                <Option value="Hồ chí minh">Hồ chí minh</Option>
                                                <Option value="Hà nội">Hà nội</Option>
                                            </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Form.Item name="Thoigian" label="Thời gian">
                                        <Select>
                                            <Option value="Tuần này">Tuần này</Option>
                                            <Option value="Hôm nay">Hôm nay</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Form.Item name="Maphieu" label="Mã phiếu">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Form.Item name="Ngaytao" label="Ngày lập phiếu">
                                        <RangePicker />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Form.Item name="Trangthai" label="Trạng thái">
                                        <Select>
                                            <Option value="Hoàn thành">Hoàn thành</Option>
                                            <Option value="Hủy">Hủy</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Form.Item name="Nguoitao" label="Người lập phiếu">
                                        <Select>
                                            <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
                                            <Option value="Nguyễn Văn B">Nguyễn Văn B</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button ref={this.SearchBtn} htmlType="submit"></Button>
                        </Form>
                    </div>
                    <div>
                        <List
                            grid={{
                                gutter: -10
                            }}
                            size="small"
                            dataSource={dataList}
                            renderItem={item => {

                                if(item.content === "Xuất file"){
                                    return(
                                        <List.Item key={Math.random()} style={{padding: '0', paddingRight: '0.5em'}}>
                                            <Button onClick={() => {
                                                this.handleExport()
                                            }} value={item.content} className="ButtonContent" shape="round">
                                                {item.content}

                                                {
                                                    this.state.active ? (
                                                        
                                                        <CSVLink ref={this.exportBtn} data={this.state.data} headers={this.state.headers}></CSVLink>
                                                    ) : null
                                                }
                                            </Button>
                                        </List.Item>
                                    )

                                }else{
                                    return(
                                        <List.Item key={Math.random()} style={{padding: '0', paddingRight: '0.5em'}}>
                                            <Button onClick={() => {
                                                
                                                if(item.content === "Tìm kiếm"){
                                                    this.SearchBtn.current.click()
                                                }

                                                if(item.content === 'Hủy phiếu'){
                                                    this.handleClickRemove()
                                                }
                                                
                                                this.props.handleClickButton(item.content)
                                            }} value={item.content} className="ButtonContent" shape="round">
                                                {item.content}
                                            </Button>
                                        </List.Item>
                                    )
                                }
                            }}
                        >

                        </List>
                    </div>
                </div>
                <div className="BoxContentBottom">
                    <Table
                        columns={columns}
                        dataSource={this.state.datanhanvien}
                        bordered
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Home
