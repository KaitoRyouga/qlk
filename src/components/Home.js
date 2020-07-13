import React, { Component } from 'react'
import './Home.css'

import { Col, Row, Typography, Form, Input, Button, List, Table, Select  } from 'antd'
import { CSVLink } from "react-csv"
import { DatePicker } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const nhanvien = [
    {
      key: 1,
      index: 1,
      Chinhanh: 'Hồ chí minh',
      Maphieu: 'PKK20180819',
      Ngaylapphieu: "19/08/2018 : 16:00",
      Nhacungcap: "Công ty TNHH Bulter Viet Nam",
      Nguoilapphieu: "Nguyễn Văn A",
      Tongtienhang: 5000000,
      Giamgia: 100000,
      Datra: 4900000,
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
        dataIndex: 'Ngaylapphieu',
        key: 'Ngaylapphieu'
    },
    {
        title: 'Nhà cung cấp',
        dataIndex: 'Nhacungcap',
        key: 'Nhacungcap'
    },
    {
        title: 'Người lập phiếu',
        dataIndex: 'Nguoilapphieu',
        key: 'Nguoilapphieu'
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
        dataIndex: 'Datra',
        key: 'Datra'
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
                    MaNhanvien: this.state.data2[index].MaNhanvien,
                    TenNhanvien: this.state.data2[index].TenNhanvien,
                    Chinhanh: this.state.data2[index].Chinhanh,
                    Chucvu: this.state.data2[index].Chucvu,
                    Email: this.state.data2[index].Email,
                    SDT: this.state.data2[index].SDT,
                    CMND: this.state.data2[index].CMND,
                    NS: this.state.data2[index].Ngaycap,
                    Diachi: this.state.data2[index].Diachi,
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
        this.props.SearchNV(values)
    };

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

        console.log(this.props)
    }

    componentDidMount() {
        this.setState({
            dataSource: this.props.nhanvien,
        })

        console.log(this.props)
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
                dataIndex: 'Ngaylapphieu',
                key: 'Ngaylapphieu'
            },
            {
                title: 'Nhà cung cấp',
                dataIndex: 'Nhacungcap',
                key: 'Nhacungcap'
            },
            {
                title: 'Người lập phiếu',
                dataIndex: 'Nguoilapphieu',
                key: 'Nguoilapphieu'
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
                dataIndex: 'Datra',
                key: 'Datra'
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
                                    <Form.Item name="Ngaylapphieu" label="Ngày lập phiếu">
                                        <RangePicker />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Form.Item name="Trangthai" label="Trạng thái">
                                        <Select>
                                            <Option value="Hoanthanh">Hoàn thành</Option>
                                            <Option value="Huy">Hủy</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Form.Item name="Nguoilapphieu" label="Người lập phiếu">
                                        <Select>
                                            <Option value="Nguyenvana">Nguyễn Văn A</Option>
                                            <Option value="Nguyenvanb">Nguyễn Văn B</Option>
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
                        dataSource={nhanvien}
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
