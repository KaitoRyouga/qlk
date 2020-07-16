import React, {Component} from 'react'
import ReactToPrint from 'react-to-print'
import { Row, Col, Avatar, Typography, Table, Button, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import './PrintBill.css'

const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Mã hàng',
      dataIndex: 'Mahang',
      key: 'Mahang',
    },
    {
      title: 'Tên hàng',
      dataIndex: 'Tenhang',
      key: 'Tenhang',
    },
    {
      title: 'ĐVT',
      key: 'DVT',
      dataIndex: 'DVT',
    },
    {
      title: 'Số lượng',
      key: 'Soluong',
      dataIndex: 'Soluong',
    },
    {
        title: 'Đơn giá',
        key: 'Dongia',
        dataIndex: 'Dongia',
      },
      {
        title: 'Giảm giá',
        key: 'Giamgia',
        dataIndex: 'Giamgia',
      },
      {
        title: 'Thành tiền',
        key: 'Thanhtien',
        dataIndex: 'Thanhtien',
      },
      {
        title: 'Ghi chú',
        key: 'Ghichu',
        dataIndex: 'Ghichu',
      },
  ];
const pageSize = 20;

class ComponentToPrint extends Component {
  render() {
    return (
        <div>
        <Row justify="space-around" align="bottom">
            <Col span={6}>
                <Avatar size={100} icon={<UserOutlined />} />
            </Col>
            <Col span={10}>
                <div style={{textAlign: 'center'}}>
                    <Typography style={{fontWeight: "bold", fontSize: '2em'}}>CÔNG TY TNHH MPS</Typography>
                    <Typography style={{fontSize: '1.3em'}}>Địa chỉ: 123 Xuân thủy, Thảo Điền, Quận 2, TP.HCM</Typography>
                
                    <Row style={{fontSize: '1.3em'}}>
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
                <span className="spanContent">Mã phiếu: </span><span className="spanDecript">{this.props.data.Maphieu}</span>
            </Col>
            <Col style={{textAlign: 'right'}} span={23}>
                <span className="spanContent">Ngày: </span><span className="spanDecript">{moment(new Date()).format('DD/MM/YYYY')}</span>
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
                <span className="spanContent">Người tạo: </span><span className="spanDecript">{this.props.data.Nguoitao}</span>
            </Col>
            <Col span={22} offset={1}>
                <span className="spanContent">Nhà cung cấp: </span><span className="spanDecript">{this.props.data.NCC}</span>
            </Col>
            <Col span={22} offset={1}>
                <span className="spanContent">Địa chỉ: </span><span className="spanDecript">55 Đường số 7, Khu đô thị An Phú An Khanh, Quận 2, Hồ Chí Minh</span>
            </Col>
        </Row>
        <Row justify="space-around" style={{marginTop: '1em'}}>
            <Col span={21} offset={1}>
                <Table
                    dataSource={this.props.data.dataEdit}
                    columns={columns}
                    bordered
                    pagination={this.props.data.dataEdit.length > pageSize && { pageSize }} 
                >

                </Table>
            </Col>
        </Row>

        <Row justify="space-between" style={{marginTop: '2em'}}>
            <Col span={9} offset={15}>
                <span className="spanContent">Tổng số lượng hàng: </span><span className="spanDecript">{this.props.data.Tongsoluong}</span>
            </Col>
            <Col span={9} offset={15}>
                <span className="spanContent">Tổng tiền hàng: </span><span className="spanDecript">{this.props.data.Tongtienhang}</span>
            </Col>
            <Col span={9} offset={15}>
                <span className="spanContent">Chiết khấu: </span><span className="spanDecript">{this.props.data.Giamgia}</span>
            </Col>
            <Col span={9} offset={15}>
                <span className="spanContent">Thành tiền: </span><span className="spanDecript">{this.props.data.CantraNCC}</span>
            </Col>
        </Row> 

        <Row style={{marginTop: '3em', marginBottom: '5em'}}>
            <Col span={9} offset={3}>
                <Row justify="start" style={{textAlign: 'center'}}>
                    <Col>
                        <Col span={24}>
                        <Typography style={{fontSize: '1.2em'}}>Ngày {moment(new Date()).format('DD')} tháng {moment(new Date()).format('MM')} năm {moment(new Date()).format('YYYY')} </Typography>
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
                            <Typography style={{fontSize: '1.2em'}}>Ngày {moment(new Date()).format('DD')} tháng {moment(new Date()).format('MM')} năm {moment(new Date()).format('YYYY')} </Typography>
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
    );
  }
}

export default class PrintBill extends Component {

    state = {
        data: {
            CantraNCC: '',
            Giamgia: '',
            Maphieu: "",
            NCC: "",
            Ngaytao: '',
            Nguoitao: "",
            TiendatraNCC: '',
            TiennoNCC: '',
            Tongsoluong: '',
            Tongtienhang: '',
            Trangthai: '',
            action: '',
            dataEdit: []
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.location.data
        })
    }

  render() {
    return (
      <div>
        <ComponentToPrint data={this.state.data} ref={el => (this.componentRef = el)} />
        
        <Row justify="end" style={{marginTop: '3em'}}>
            <Space>
                <Col>
                    <ReactToPrint
                        trigger={() => {
                            return <Button className="ButtonModal">In</Button>
                        }}
                        content={() => this.componentRef}
                    />
                </Col>
                <Col>
                    <Button href="/" className="ButtonModal">Hủy</Button>
                </Col>
            </Space>
        </Row>
      </div>
    );
  }
}