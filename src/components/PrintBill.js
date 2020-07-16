import React, { Component } from 'react'
import { Row, Col, Avatar, Typography, Table } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './PrintBill.css'

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
        key: 'Maphieu'
    },
    {
        title: 'Ngày lập phiếu',
        dataIndex: 'Ngaytao',
        key: 'Ngaytao'
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

const pageSize = 20;

export default class PrintBill extends Component {
    render() {
        console.log(this.props.location)
        return (
            <div>
                <Row justify="center" align="bottom">
                    <Col span={6}>
                        <Avatar size={100} icon={<UserOutlined />} />
                    </Col>
                    <Col span={10}>
                        <div style={{textAlign: 'center'}}>
                            <Typography style={{fontWeight: "bold", fontSize: '2em'}}>CÔNG TY TNHH MPS</Typography>
                            <Typography style={{fontSize: '1.5em'}}>Địa chỉ: 123 Xuân thủy, Thảo Điền, Quận 2, TP.HCM</Typography>
                        
                            <Row style={{fontSize: '1.5em'}}>
                                <Col span={12}>
                                    <Typography>Tel: +84-123-456-789</Typography>
                                </Col>
                                <Col span={12}>
                                    <Typography>Fax: +84-123-456-789</Typography>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'center', marginTop: '4em', marginBottom: '1em'}}>
                        <Typography style={{fontWeight: "bold", fontSize: '2em'}}>PHIẾU NHẬP KHO</Typography>
                    </Col>
                    <Col style={{textAlign: 'right'}} span={23}>
                        <span className="spanContent">Mã phiếu: </span><span className="spanDecript">PNK20200601</span>
                    </Col>
                    <Col style={{textAlign: 'right'}} span={23}>
                        <span className="spanContent">Ngày: </span><span className="spanDecript">18/06/2020</span>
                    </Col>
                </Row>
                <Row justify="space-around">
                    <Col span={22} offset={1}>
                        <span className="spanContent">Chi nhánh: </span><span className="spanDecript">Chi nhánh Hồ Chí Minh</span>
                    </Col>
                    <Col span={22} offset={1}>
                        <span className="spanContent">Kho: </span><span className="spanDecript">Kho đông lạnh</span>
                    </Col>
                    <Col span={22} offset={1}>
                        <span className="spanContent">Người tạo: </span><span className="spanDecript">Nguyễn Văn Bá</span>
                    </Col>
                    <Col span={22} offset={1}>
                        <span className="spanContent">Nhà cung cấp: </span><span className="spanDecript">Công ty Tnhh Thực Phẩm Sạch Thương Mại A&C</span>
                    </Col>
                    <Col span={22} offset={1}>
                        <span className="spanContent">Địa chỉ: </span><span className="spanDecript">55 Đường số 7, Khu đô thị An Phú An Khanh, Quận 2, Hồ Chí Minh</span>
                    </Col>
                </Row>
                <Row justify="space-around" style={{marginTop: '1em'}}>
                    <Col span={21} offset={1}>
                        <Table
                            dataSource={nhanvien}
                            columns={columns}
                            bordered
                            pagination={nhanvien.length > pageSize && { pageSize }} 
                        >

                        </Table>
                    </Col>
                </Row>

                <Row justify="space-between" style={{marginTop: '2em'}}>
                    <Col span={9} offset={15}>
                        <span className="spanContent">Tổng số lượng hàng: </span><span className="spanDecript">...........</span>
                    </Col>
                    <Col span={9} offset={15}>
                        <span className="spanContent">Tổng tiền hàng: </span><span className="spanDecript">...........</span>
                    </Col>
                    <Col span={9} offset={15}>
                        <span className="spanContent">Chiết khấu: </span><span className="spanDecript">...........</span>
                    </Col>
                    <Col span={9} offset={15}>
                        <span className="spanContent">Thành tiền: </span><span className="spanDecript">...........</span>
                    </Col>
                </Row> 

                <Row style={{marginTop: '3em', marginBottom: '5em'}}>
                    <Col span={9} offset={3}>
                        <Row justify="start" style={{textAlign: 'center'}}>
                            <Col>
                                <Col span={24}>
                                    <Typography style={{fontSize: '1.2em'}}>Ngày...tháng...năm</Typography>
                                </Col>
                                <Col span={24}>
                                    <Typography style={{fontSize: '1.2em', fontWeight: 'bold'}}>Người nhận</Typography>
                                </Col>
                                <Col span={24}>
                                    <Typography style={{fontSize: '1.2em'}}>(Ký, ghi rõ họ tên)</Typography>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={9} offset={-3}>
                        <Row justify="end" style={{textAlign: 'center'}}>
                            <Col>
                                <Col span={24}>
                                    <Typography style={{fontSize: '1.2em'}}>Ngày...tháng...năm</Typography>
                                </Col>
                                <Col span={24}>
                                    <Typography style={{fontSize: '1.2em', fontWeight: 'bold'}}>Người duyệt</Typography>
                                </Col>
                                <Col span={24}>
                                    <Typography style={{fontSize: '1.2em'}}>(Ký, ghi rõ họ tên)</Typography>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
