import React, { Component } from 'react';

import { Typography, Layout, Divider, Row, Col, Form, Input, Button, Table, Space, Tabs, Select, InputNumber } from 'antd'

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

// const columns = [
//     {
//       title: '#',
//       dataIndex: 'index',
//       key: 'index',
//     },
//     {
//       title: 'Mã hàng',
//       dataIndex: 'Mahang',
//       key: 'Mahang',
//     },
//     {
//       title: 'Tên hàng',
//       dataIndex: 'Tenhang',
//       key: 'Tenhang',
//     },
//     {
//       title: 'ĐVT',
//       key: 'DVT',
//       dataIndex: 'DVT',
//     },
//     {
//       title: 'Số lượng',
//       key: 'Soluong',
//       dataIndex: 'Soluong',
//       render: (Soluong) => {
//         return(
//             <InputNumber onChange={(e) => {
//                 const dataTemp = onChangeInputRange(e, data)
//                 data = dataTemp
//             }} defaultValue={Soluong}></InputNumber>
//         )
//       }
//     },
//     {
//         title: 'Đơn giá',
//         key: 'Dongia',
//         dataIndex: 'Dongia',
//         render: (Dongia) => {         
//             return(  
//                 <span>
//                     {financial(Dongia)}
//                 </span>
//             )
//         }
//       },
//       {
//         title: 'Giảm giá',
//         key: 'Giamgia',
//         dataIndex: 'Giamgia',
//         render: (Giamgia) => {         
//             return(  
//                 <span>
//                     {financial(Giamgia)}
//                 </span>
//             )
//         }
//       },
//       {
//         title: 'Thành tiền',
//         key: 'Thanhtien',
//         dataIndex: 'Thanhtien',
//         render: (Thanhtien) => {
//             console.log(data)      
//             return(  
//                 <span>
//                     {financial(Thanhtien)}
//                 </span>
//             )
//         }
//       },
//       {
//         title: 'Ghi chú',
//         key: 'Ghichu',
//         dataIndex: 'Ghichu',
//       },
//   ];
  
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
        dataArr: {}
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
            let Thanhtien = this.state.dataP[this.state.dataP.length - 1].Thanhtien.split('.').join('')
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
        }

    }

    componentDidMount(){

        // this.setState({
        //     reset: !this.state.reset
        // })

        if(this.props.selectRowsSearch.length !== 0){

            // console.log(this.state.dataP)
            // console.log(this.props.selectRowsSearch)

            // this.props.selectRowsSearch.forEach(item => {
            //     let selectRowsSearch = 
            //     selectRowsSearch.push(item)
            //     selectRowsSearch[0].Giamgia = 0
            //     selectRowsSearch[0].Thanhtien = item.Dongia
            //     let dataTemp = [].concat(data, selectRowsSearch)
            //     this.setState({
            //         dataP: dataTemp
            //     })
            // });

            let selectRowsSearch = this.props.selectRowsSearch
            selectRowsSearch.forEach(item => {
                item.Giamgia = 0
                item.Thanhtien = item.Dongia
                console.log(item)
                let dataTemp = [].concat(data, selectRowsSearch)
                this.setState({
                    dataP: dataTemp
                })

                data = dataTemp
            });

        }else{
            
            this.setState({
                dataP: data
            })

            // this.formRef.current.setFieldsValue({
            //     Tongsoluong: 1,
            //     Tongtienhang: data[data.length - 1].Thanhtien,
            //     CantraNCC: data[data.length - 1].Thanhtien,
            // })
        }

        let dataArr = InfoGeneral(data)

        this.setState({
            dataArr: dataArr
        })

        this.formRef.current.setFieldsValue({
            Tongsoluong: financial(dataArr.Soluong),
            Giamgia: financial(dataArr.Giamgia),
            Tongtienhang: financial(dataArr.Thanhtien),
            CantraNCC: financial(dataArr.Thanhtien),
            TiendatraNCC: 0,
        })
        
    }

    handleClickSearch = (values) => {
        this.props.handleClickSearch(values)
    }

    onChangeInputRange = (e) => {
        let dataTemp = this.state.dataP
        dataTemp[this.state.dataP.length - 1].Soluong = e

        let fix = convertSumMoney(dataTemp)
        this.setState({
            dataP: fix
        })

    }

    onClickTest = () => {
        console.log('test')
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
              render: (Soluong) => {
                return(
                    <InputNumber onChange={(e) => {
                        this.onChangeInputRange(e)
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
                    console.log(data)      
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
                                                                        <Select>
                                                                            <Option value="Nguyenvana">Nguyễn Văn A</Option>
                                                                            <Option value="Nguyenvanb">Nguyễn Văn B</Option>
                                                                        </Select>
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
                                                                        <Input defaultValue="Mới"></Input>
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
                                    <Button className="ButtonModal">Lưu tạm</Button>
                                    <Button className="ButtonModal">Hoàn thành</Button>
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