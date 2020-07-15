import React, { Component } from 'react';

import { Typography, Layout, Divider, Row, Col, Form, Input, Button, Table, Space, Tabs, Select, InputNumber, DatePicker } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import duplicate from './duplicate'
import convertSumMoney from './convertSumMoney'
import InfoGeneral from './InfoGeneral'
// import onChangeInputRange from './OnChange'

// import Mathang from '../data/data'

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input

function financial(x) {

    x = String(x).split(".").join("");

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
  
  let data = [
    {
      key: '1',
      index: '1',
      Mahang: 'SP001',
      Tenhang: 'Sài gòn special',
      DVT: 'Thùng',
      Soluong: 1,
      Dongia: '250000',
      Giamgia: '50000',
      Thanhtien: '200000',
      Ghichu: '',
    }
  ];

class AddModal extends Component {

    formRef = React.createRef();

    state = {
        reset: false,
        valueTTH: null,
        valueGG: null,
        valueCanTra: null,
        valueDaTra: null,
        valueNo: null,
        dataP: [],
        selectedRows: [],
        dataGeneral: [
            {
                key: 0,
                index: 0,
                Mahang: '',
                Tenhang: '',
                DVT: '',
                Soluong: 0,
                Dongia: 0,
                Giamgia: 0,
                Thanhtien: 0,
                Ghichu: '',
            }
        ],
        dataArr: {},
        Trangthai: ''
    }

    onChangeTTH = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))

        this.setState({
            valueTTH: numberTTH3
        })

        this.formRef.current.setFieldsValue({
            Tongtienhang: numberTTH3
        })
    }

    onChangeGG = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))

        this.setState({
            valueGG: numberTTH3
        })

        this.formRef.current.setFieldsValue({
            Giamgia: numberTTH3
        })

        let dataTemp = this.state.dataP
        dataTemp[this.state.dataP.length - 1].Giamgia = numberTTH3

        let fix = convertSumMoney(dataTemp)
        this.setState({
            dataP: fix
        })

    }

    onChangeCanTra = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))

        this.setState({
            valueTCanTra: numberTTH3
        })

        // this.formRef.current.setFieldsValue({
        //     CantraNCC: numberTTH3
        // })
    }

    onChangeDaTra = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))

        this.setState({
            valueDaTra: e.target.value
        })

        this.formRef.current.setFieldsValue({
            TiendatraNCC: numberTTH3
        })
    }

    onChangeNo = (e) => {
        let numberTTH = e.target.value
        let numberTTH2 = numberTTH.split(".").join("");
        let numberTTH3 = financial(Number(numberTTH2))

        this.setState({
            valueNo: e.target.value
        })

        this.formRef.current.setFieldsValue({
            TiennoNCC: numberTTH3
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState.valueDaTra !== this.state.valueDaTra){
            let valueDaTra = this.state.valueDaTra.split('.').join('')
            let ThanhtienTemp = 0
            try {
                this.state.dataP.forEach(item => {
                    ThanhtienTemp = ThanhtienTemp + Number(item.Thanhtien.split('.').join(''))
                });
            } catch (error) {
                
            }

            let Thanhtien = ThanhtienTemp
            
            let TiennoNCC = Number(Thanhtien) - Number(valueDaTra)
            TiennoNCC = financial(TiennoNCC)
            this.formRef.current.setFieldsValue({
                TiennoNCC: TiennoNCC
            })
        }

        if(this.state.dataP !== data){
            this.setState({
                dataP: data
            })

            // let valueDaTra = this.state.valueDaTra.split('.').join('')
            let ThanhtienTemp = 0
            let SoluongTemp = 0

            try {
                data.forEach(item => {
                    ThanhtienTemp = ThanhtienTemp + Number(item.Thanhtien.split('.').join(''))
                });
            } catch (error) {
                
            }

            data.forEach(item => {
                SoluongTemp = SoluongTemp + Number(item.Soluong)
            });

            let Thanhtien = ThanhtienTemp
            
            let TiennoNCC = Number(Thanhtien) - Number(this.state.valueDaTra)
            TiennoNCC = financial(TiennoNCC)
            this.formRef.current.setFieldsValue({
                TiennoNCC: TiennoNCC,
                Tongtienhang: financial(Thanhtien),
                CantraNCC: financial(Thanhtien),
                Tongsoluong: SoluongTemp
            })
        }

    }

    componentDidMount(){

        // console.log(this.props.info)

        try {
            switch (this.props.info[1].action) {
                case 'copy':
                    try {
                        this.setState({
                            dataP: this.props.info[0].dataEdit[0]
                        })
                    } catch (error) {
                        console.log(error)
                    }
    
                    this.formRef.current.setFieldsValue({
                        Nguoitao: this.props.info[0].Nguoitao,
                        NCC: this.props.info[0].NCC,
                        Tongtienhang: this.props.info[0].Tongtienhang,
                        Tongtienhang: this.props.info[0].Tongtienhang,
                        CantraNCC: this.props.info[0].CantraNCC,
                        TiennoNCC: this.props.info[0].TiennoNCC,
                        Tongsoluong: this.props.info[0].Tongsoluong,
                    })
                    break;

                case 'edit':
                    try {
                        this.setState({
                            dataP: this.props.info[0].dataEdit[0]
                        })
                    } catch (error) {
                        console.log(error)
                    }

                    this.formRef.current.setFieldsValue({
                        Nguoitao: this.props.info[0].Nguoitao,
                        NCC: this.props.info[0].NCC,
                        Tongtienhang: this.props.info[0].Tongtienhang,
                        Maphieu: this.props.info[0].Maphieu,
                        Tongsoluong: this.props.info[0].Tongsoluong,
                        Giamgia: this.props.info[0].Giamgia,
                        Tongtienhang: this.props.info[0].Tongtienhang,
                        CantraNCC: this.props.info[0].CantraNCC,
                        TiennoNCC: this.props.info[0].TiennoNCC,
                        TiendatraNCC: this.props.info[0].TiendatraNCC,

                    })
            
                default:
                    break;
            }
        } catch (error) {

        }

        if(this.props.selectRowsSearch.length !== 0){

            let selectRowsSearch = this.props.selectRowsSearch
            selectRowsSearch.forEach(item => {
                item.Giamgia = 0
                item.Thanhtien = item.Dongia
            });

            let dataTemp = duplicate(data, selectRowsSearch)
            this.setState({
                dataP: dataTemp
            })

            data = dataTemp

        }else{
            
            this.setState({
                dataP: data
            })
        }

        let dataArr = InfoGeneral(data)

        this.setState({
            dataArr: dataArr
        })

        try {
            if(this.props.info[1].action){

            }
        } catch (error) {
            let random = Math.random().toString(36);
            random = random.slice(random.length - 3, random.length).toUpperCase()
            let utc = new Date().toJSON().slice(0,10).replace(/-/g,'');   

            this.formRef.current.setFieldsValue({
                Tongsoluong: financial(dataArr.Soluong),
                Giamgia: financial(dataArr.Giamgia),
                Tongtienhang: financial(dataArr.Thanhtien),
                CantraNCC: financial(dataArr.Thanhtien),
                TiendatraNCC: '0',
                TiennoNCC: financial(dataArr.Thanhtien),
                Maphieu: random + utc
            })
        }
        
    }

    handleClickSearch = (values) => {
        this.props.handleClickSearch(values)
    }

    onChangeInputRange = (e, sp) => {

        let dataTemp = this.state.dataP

        let dataChangeIndex = dataTemp.findIndex(item => {
            return(
                item.Tenhang === sp.Tenhang
            )
        })

        let dataChange = dataTemp.filter(item => {
            return item.Tenhang === sp.Tenhang
        })

        dataChange[0].Soluong = e

        let newData1 = dataTemp.slice(0, dataChangeIndex)
        let newData3 = dataTemp.slice(dataChangeIndex+1, dataTemp.length)

        let newData12 = [].concat(newData1, dataChange)
        let newData = [].concat(newData12, newData3)

        let fix = convertSumMoney(newData)

        // data = fix

        this.setState({
            dataP: fix
        })

    }

    handleClickRemove = (sp) => {

        let dataTemp = this.state.dataP

        let dataAfterDelete = dataTemp.filter(item => {
            return(
                item.Tenhang !== sp.Tenhang
            )
        })

        let fix = convertSumMoney(dataAfterDelete)

        data = fix

        this.setState({
            dataP: fix
        })

        this.reset()
    }

    reset = () => {
        let ThanhtienTemp = 0
        let SoluongTemp = 0

        try {
            data.forEach(item => {
                ThanhtienTemp = ThanhtienTemp + Number(item.Thanhtien.split('.').join(''))
            });
        } catch (error) {
            
        }

        data.forEach(item => {
            SoluongTemp = SoluongTemp + Number(item.Soluong)
        });

        let Thanhtien = ThanhtienTemp
        
        let TiennoNCC = Number(Thanhtien) - Number(this.state.valueDaTra)
        TiennoNCC = financial(TiennoNCC)
        this.formRef.current.setFieldsValue({
            TiennoNCC: TiennoNCC,
            Tongtienhang: financial(Thanhtien),
            CantraNCC: financial(Thanhtien),
            Tongsoluong: SoluongTemp
        })
    }

    handleChangeTrangthai = (value) => {
        this.setState({
            Trangthai: value
        })
    }

    onFinish = (values) => {
        values.Trangthai = this.state.Trangthai
        values.dataEdit = this.state.dataP
        // console.log()
        this.props.handlePushDataToHome(values)
        // console.log(values)
    }



    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {

                // this.props.handleClickColumn(selectedRows)
                this.setState({
                    selectedRows: selectedRows
                })
            },
        };

        const columns = [
            {
              title: '#',
              dataIndex: 'index',
              key: 'index',
              render: (index, sp) => {
                  return(
                    <CloseOutlined onClick={() => this.handleClickRemove(sp)} style={{cursor: "pointer"}}/>
                  )
              }
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
              render: (Soluong, Mahang) => {
                return(
                    <InputNumber onChange={(e) => {
                        this.onChangeInputRange(e, Mahang)
                    }} defaultValue={Soluong}></InputNumber>
                )
              }
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
                        <Input style={{width: '5em'}} defaultValue={Giamgia} onChange={(e) => this.onChangeGG(e)} value={financial(Giamgia)}></Input>
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
                render: (Ghichu) => {
                    return(
                        <TextArea style={{width: '10em'}} placeholder="Ghi chú"></TextArea>
                    )
                }
              },
          ];
        

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
                                <Col span={18}>
                                    <Content className="ContentModal">
                                        <div className="NhapKho">
                                            <Row style={{height: '100%'}}>
                                                <Col span={20}>
                                                    <Form id="formSearch" onFinish={this.handleClickSearch}>
                                                        <Form.Item name="Nhapkho" label="Nhập kho">
                                                            <Input placeholder="Nhập mã hàng hoặc tên hàng"></Input>
                                                        </Form.Item>
                                                    </Form>
                                                </Col>
                                                <Col span={2} offset={1}>
                                                    <Button form="formSearch" key="submit" htmlType="submit">Tìm kiếm</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="NhapKho">
                                            <Table 
                                                columns={columns} 
                                                dataSource={this.state.dataP} 
                                                rowSelection={{
                                                    type: "checkbox",
                                                    ...rowSelection,
                                                }}
                                            />
                                        </div>
                                    </Content>
                                </Col>
                                <Col span={6}>
                                    <div className="SliderModal">
                                        <div className="NhapKho">
                                            <Typography>Thông tin phiếu</Typography>
                                            <Divider></Divider>
                                            <Tabs defaultActiveKey="1">
                                                <TabPane tab="Thông tin chung" key="1">
                                                    <Form
                                                        id="formAddT"
                                                        ref={this.formRef}
                                                        onFinish={this.onFinish}
                                                    >
                                                        <Space>
                                                            <Row>
                                                                <Col span={24}>
                                                                    <Form.Item name="Nguoitao" label="Người tạo" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                                                        <Select>
                                                                            <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
                                                                            <Option value="Nguyễn Văn B">Nguyễn Văn B</Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item label="Ngày tạo" name="Ngaytao">
                                                                        <DatePicker disabled showTime={true} showToday={true}></DatePicker>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="Maphieu" label="Mã phiếu">
                                                                        <Input disabled></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="NCC" label="NCC" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                                                        <Select>
                                                                            <Option value="NCC1">NCC 1</Option>
                                                                            <Option value="NCC2">NCC 2</Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="Trangthai" label="Trạng thái">
                                                                        <Input disabled defaultValue="Mới"></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="Tongsoluong" label="Tổng số lượng">
                                                                        <InputNumber disabled onChange={(e) => this.onChangeInputRange(e)} style={{width: '100%'}}/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>

                                                                <Form.Item name="Tongtienhang" label="Tổng tiền hàng">
                                                                    <Input disabled></Input>
                                                                </Form.Item>
                                                                    
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>

                                                                    <Form.Item name="Giamgia" label="Giảm giá">
                                                                        <Input disabled onChange={(e) => this.onChangeGG(e)}></Input>
                                                                    </Form.Item>
                                                                </Col>
                                                                <div className="spaceCol"></div>
                                                                <Col span={24}>
                                                                    <Form.Item name="CantraNCC" label='Cần trả NCC'>
                                                                        <Input disabled></Input>
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
                                                                        <Input disabled></Input>
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
                                                <TabPane tab="Thông tin thêm" key="2">

                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Layout>
                    <Footer>
                        <Row>
                            <Col span={12} offset={15}>
                                <Space>
                                    <Button form="formAddT" key="submit" htmlType="submit" onClick={() => this.handleChangeTrangthai('Lưu tạm')} className="ButtonModal">Lưu tạm</Button>
                                    <Button form="formAddT" key="submit" htmlType="submit" onClick={() => this.handleChangeTrangthai('Hoàn thành')} className="ButtonModal">Hoàn thành</Button>
                                    <Button className="ButtonModal">Import</Button>
                                    <Button className="ButtonModal">Làm mới</Button>
                                    <Button className="ButtonModal">Đóng</Button>
                                </Space>
                            </Col>
                        </Row>
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default AddModal;