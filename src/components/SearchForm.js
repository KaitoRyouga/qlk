import React, { Component } from 'react'
import { Typography, Layout, Row, Col, Form, Button, Table, Space, Tabs, Select } from 'antd'
import { CloseSquareFilled } from '@ant-design/icons'

import Mathang from '../data/data'

import { Card } from 'antd';

const { Meta } = Card;

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

function financial(x) {

    if(Number(x) !== x){
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
        title: 'Số lượng',
        dataIndex: 'Soluong',
        key: 'Soluong',
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
        title: 'ĐVT',
        key: 'DVT',
        dataIndex: 'DVT',
      },
      {
        title: 'Nhóm hàng',
        key: 'Nhomhang',
        dataIndex: 'Nhomhang',
      },
  ];

export default class SearchForm extends Component {
    
    state = {
        MathangSearch: [],
        QuerySearchMathang: '',
        QuerySearchNhomhang: '',
        activeSearch: 1,
        selectedRows: []
    }

    SearchForm = () => {

        var MathangAfterSearchMathang = []


        if(this.state.QuerySearchMathang === null || this.state.QuerySearchMathang === '' || this.state.QuerySearchMathang === undefined){
            MathangAfterSearchMathang = []
        }else{
            MathangAfterSearchMathang = Mathang.filter(mt => {
                return(
                    mt.Tenhang === this.state.QuerySearchMathang
                )
            })
            if(MathangAfterSearchMathang.length === 0){

                this.setState({
                    activeSearch: 1,
                })
            }
        }

        var MathangAfterSearchNhomhang = []


        if(this.state.QuerySearchNhomhang === null || this.state.QuerySearchNhomhang === '' || this.state.QuerySearchNhomhang === undefined){
            MathangAfterSearchNhomhang = []
        }else{
            MathangAfterSearchNhomhang = Mathang.filter(mt => {
                return(
                    mt.Nhomhang === this.state.QuerySearchNhomhang
                )
            })
            if(MathangAfterSearchNhomhang.length === 0){

                this.setState({
                    activeSearch: 1,
                })
            }
        }

        if(MathangAfterSearchNhomhang.length !== 0 && MathangAfterSearchMathang.length !== 0){
            MathangAfterSearchMathang = MathangAfterSearchMathang.filter(item => {
                return(
                    item.Nhomhang === this.state.QuerySearchNhomhang
                )
            });

            MathangAfterSearchNhomhang = MathangAfterSearchNhomhang.filter(item => {
                return(
                    item.Mathang === this.state.QuerySearchMathang
                )
            });
        }

        
        var SearchMH = [].concat(MathangAfterSearchNhomhang, MathangAfterSearchMathang)
        
        const unique =  SearchMH.map(e => e['key'])

        .map((e, i, final) => final.indexOf(e) === i && i)

       .filter((e) => SearchMH[e]).map(e => SearchMH[e]);

        if(SearchMH.length === 0 && this.state.QuerySearchNhomhang.length === 0){
            this.setState({
                MathangSearch: Mathang
            })
        }else{
            this.setState({
                MathangSearch: unique
            })
        }
    
    }

    onChangeSearchMathang = (values) => {

        this.setState({
            QuerySearchMathang: values
        })
    }

    onChangeSearchNhomhang = (values) => {

        this.setState({
            QuerySearchNhomhang: values
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if(this.state.QuerySearchMathang.length !== prevState.QuerySearchMathang.length || this.state.QuerySearchNhomhang.length !== prevState.QuerySearchNhomhang.length){
            this.SearchForm()
        }
    }

    componentDidMount(){
        this.SearchForm()
    }

    handleClickChooseColumn = () => {

        this.props.handleClickChooseColumn(this.state.selectedRows)
    }

    handleClickChooseColumnImage = (item) => {

        this.setState({
            selectedRows: [item]
        })
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

        const cardModal = (item, gia, description) => {
            if(description.length >= 22){
                description = description.slice(0, 17) + ' [...]'
            }
            return(
                <Col span={4} style={{paddingRight: '0.5em'}}>
                    <Card
                        onClick={() => this.handleClickChooseColumnImage(item)}
                        hoverable
                        style={{height: '20em'}}
                        cover={<img alt="example" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/X_G.png" />}
                    >
                        <Meta title={`Giá: ${gia}`} description={description} />
                    </Card>
                </Col>
            )
        }

        return (
            <div>
                <Layout>
                    <Header className="HeaderHomeSearch">
                        <Row align="middle">
                            <Col span={20}>
                                <Typography style={{fontWeight: 'bold', color: 'white', fontSize: '1.5em'}}>Tìm kiếm mặt hàng</Typography>
                            </Col>
                            <Col style={{textAlign: 'right'}} span={2} offset={2}>
                                <CloseSquareFilled />
                            </Col>
                        </Row>
                        
                    </Header>
                    <Content>
                        <div>
                            <Form>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item name="Mathang" label="Mặt hàng">
                                            <Select onChange={(e) => this.onChangeSearchMathang(e)}>
                                                <Option value="Áo sơ mi nam">Áo sơ mi nam</Option>
                                                <Option value="Bàn chải đánh răng">bàn chải đánh răng</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={4}>
                                        <Form.Item name="Nhomhang" label="Nhóm hàng">
                                            <Select onChange={(e) => this.onChangeSearchNhomhang(e)}>
                                                <Option value="Quần áo">Quần áo</Option>
                                                <Option value="Hàng hóa">Hàng hóa</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Hiển thị dạng danh sách" key="1">
                                    <Table
                                        dataSource={this.state.MathangSearch}
                                        columns={columns}
                                        rowSelection={{
                                            type: "checkbox",
                                            ...rowSelection,
                                        }}
                                    >

                                    </Table>
                                </TabPane>
                                <TabPane tab="Hiển thị dạng hình ảnh" key="2">
                                    <Row>
                                        {
                                            this.state.MathangSearch.map(item => {
                                                return(
                                                    cardModal(item, item.Dongia, item.Tenhang)
                                                )
                                            })
                                        }
                                    </Row>
                                </TabPane>

                            </Tabs>
                        </div>
                    </Content>
                    <Footer>
                        
                    </Footer>
                </Layout>
                <div style={{textAlign: 'right'}}>
                    <Space>
                        <Button onClick={this.handleClickChooseColumn} className="ButtonModal">Chọn</Button>
                        <Button className="ButtonModal">Đóng</Button>
                    </Space>
                </div>
            </div>
        )
    }
}
