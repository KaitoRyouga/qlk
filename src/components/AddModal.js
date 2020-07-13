import React, { Component } from 'react';

import { Typography, Layout, Divider, Row, Col, Form, Input, Button, Table, Space, Tabs } from 'antd'

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input

function financial(x) {

    if(Number(x) != x){
        return null
    }

    let arrR = []
    let arrR2 = []
    let xCut = ''
    let xCut2 = ''
    let xCut3 = ''

    let times =  Math.floor(String(x).length / 3)
    if(Number(times)*3 === String(x).length){
        xCut3 = String(x).slice(0, String(x).length - (Number(times)-1)*3)
    }else{
        xCut3 = String(x).slice(0, String(x).length - (Number(times))*3)
    }
    

    while(true){
        if(String(x).length > 3){
            xCut = String(x).slice(String(x).length - 3, String(x).length)
    
            xCut2 = String(x).slice(0, String(x).length-3)
    
            x = String(x).slice(0, String(x).length-3)
    
            arrR.push(xCut)
            arrR2.push(xCut2)
        }else{
            break
        }
    }

    // console.log(arrR)
    // console.log(arrR2)

    arrR2 = arrR2.reverse()
    arrR = arrR.reverse()

    if(arrR.length >= arrR2.length){
        arrR.forEach(item => {
            xCut3 = xCut3 + '.' + item
        });
    }else{
        arrR2.forEach(item => {
            xCut3 = xCut3 + '.' + item
        });
    }

    return xCut3

    
  }
  

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
        render: (Dongia) => {         
            return(  
                <span>
                    {financial(Dongia)}
                </span>
            )
        }
      },
      {
        title: 'Giảm giá',
        key: 'Giamgia',
        dataIndex: 'Giamgia',
        render: (Giamgia) => {         
            return(  
                <span>
                    {financial(Giamgia)}
                </span>
            )
        }
      },
      {
        title: 'Thành tiền',
        key: 'Thanhtien',
        dataIndex: 'Thanhtien',
        render: (Thanhtien) => {         
            return(  
                <span>
                    {financial(Thanhtien)}
                </span>
            )
        }
      },
      {
        title: 'Ghi chú',
        key: 'Ghichu',
        dataIndex: 'Ghichu',
      },
  ];
  
  const data = [
    {
      key: '1',
      index: '1',
      Mahang: 'SP001',
      Tenhang: 'Sài gòn special',
      DVT: 'Thùng',
      Soluong: 1,
      Dongia: 250000,
      Giamgia: 50000,
      Thanhtien: 200000,
      Ghichu: '',
    },
    {
        key: '2',
        index: '2',
        Mahang: '',
        Tenhang: '',
        DVT: '',
        Soluong: null,
        Dongia: null,
        Giamgia: null,
        Thanhtien: null,
        Ghichu: '',
      }
  ];

class AddModal extends Component {

    formRef = React.createRef();

    state = {
        valueTTH: null,
        valueGG: null,
        valueCanTra: null,
        valueDaTra: null,
        valueNo: null,
    }

    onChangeTTH = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))
        console.log(numberTTH3)
        // this.setState({
        //     valueTTH: numberTTH3
        // })

        this.formRef.current.setFieldsValue({
            Tongtienhang: numberTTH3
        })
    }

    onChangeGG = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))
        console.log(numberTTH3)
        // this.setState({
        //     valueGG: numberTTH3
        // })
        this.formRef.current.setFieldsValue({
            Giamgia: numberTTH3
        })
    }

    onChangeCanTra = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))
        console.log(numberTTH3)
        // this.setState({
        //     valueCanTra: numberTTH3
        // })
        this.formRef.current.setFieldsValue({
            CantraNCC: numberTTH3
        })
    }

    onChangeDaTra = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))
        console.log(numberTTH3)
        // this.setState({
        //     valueDaTra: numberTTH3
        // })
        this.formRef.current.setFieldsValue({
            TiendatraNCC: numberTTH3
        })
    }

    onChangeNo = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))
        console.log(numberTTH3)
        // this.setState({
        //     valueNo: numberTTH3
        // })
        this.formRef.current.setFieldsValue({
            TiennoNCC: numberTTH3
        })
    }

    render() {
        return (
            <div>
                <Layout className="LayoutHomeModal">
                    <Header className="HeaderHomeModal">
                        <div style={{marginLeft: '-2em', fontWeight: 'bold', fontSize: '1.3em'}}>
                            Phiếu nhập kho
                        </div>
                    </Header>
                        <Layout>
                            <Row style={{width: '100%', height: '100%'}}>
                                <Col span={16}>
                                    <Content className="ContentModal">
                                        <div className="NhapKho">
                                            <Row style={{height: '100%'}}>
                                                <Col span={20}>
                                                    <Form>
                                                        <Form.Item label="Nhập kho">
                                                            <Input placeholder="Nhập mã hàng hoặc tên hàng"></Input>
                                                        </Form.Item>
                                                    </Form>
                                                </Col>
                                                <Col span={2} offset={1}>
                                                    <Button>Tìm kiếm</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="NhapKho">
                                            <Table columns={columns} dataSource={data} />
                                        </div>
                                    </Content>
                                </Col>
                                <Col span={8}>
                                    <div className="SliderModal">
                                        <div className="NhapKho">
                                            <Typography>Thông tin phiếu</Typography>
                                            <Divider></Divider>
                                            <Tabs defaultActiveKey="1">
                                                <TabPane tab="Thông tin chung" key="1">
                                                    <Form
                                                        ref={this.formRef}
                                                    >
                                                        <Space>
                                                            <Row>
                                                                <Col span={24}>
                                                                    <Form.Item name="Nguoitao" label="Người tạo">
                                                                        <Input></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item label="Ngày tạo" name="Ngaytao">
                                                                        <Input></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="Maphieu" label="Mã phiếu">
                                                                        <Input></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="NCC" label="NCC">
                                                                        <Input></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="Trangthai" label="Trạng thái">
                                                                        <Input></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="Tongsoluong" label="Tổng số lượng">
                                                                        <Input></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>

                                                                <Form.Item name="Tongtienhang" label="Tổng tiền hàng">
                                                                    <Input onChange={(e) => this.onChangeTTH(e)}></Input>
                                                                </Form.Item>
                                                                    
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>

                                                                    <Form.Item name="Giamgia" label="Giảm giá">
                                                                        <Input onChange={(e) => this.onChangeGG(e)}></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="CantraNCC" label='Cần trả NCC'>
                                                                        <Input onChange={(e) => this.onChangeCanTra(e)}></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="TiendatraNCC" label="Tiền đã trả NCC">
                                                                        <Input onChange={(e) => this.onChangeDaTra(e)}></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="TiennoNCC" label="Tiền nợ NCC">
                                                                        <Input onChange={(e) => this.onChangeNo(e)}></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item>
                                                                        <TextArea placeholder="Ghi chú"></TextArea>
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Space>
                                                    </Form>
                                                    
                                                </TabPane>
                                                <TabPane tab="Thông tin chi tiết" key="2">

                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Layout>
                    <Footer>

                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default AddModal;