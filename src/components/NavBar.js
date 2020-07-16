import React, { Component } from 'react'
import './NavBar.css'
import Home from "./Home";
import AddModal from './AddModal.js'
import SearchForm from './SearchForm'

import { Typography, Layout, Divider, Row, Col, Menu } from 'antd'
import { CaretDownOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'

import { Collapse } from 'antd';

const { Panel } = Collapse;

const { Header, Content, Footer, Sider } = Layout;

class NavBar extends Component {

    state = {
        Qlnv: true,
        ModalAddqlnv: false,
        infoCopy: [],
        infoView: [],
        action: null,
        headers: [],
        data: [],
        expand: false,
        viewModal: false,
        disableLayout: false,
        selectRowsSearch: [],
        ModalSearchForm: false,
        rowCurrent: [],
        dataChange: [],
        infoPhieu: []
    }

    handleClickButton = (name) => {

        switch (name) {
            case "Tìm kiếm":

                break;
            case "Thêm":
                this.setState({
                    ModalAddqlnv: !this.state.ModalAddqlnv,
                    Qlnv: false,
                    infoCopy: [],
                    disableLayout: true
                })
                break;
            case "Sao chép":
                let infoTemp = [].concat(this.state.infoCopy, {action: 'copy'})

                this.setState({
                    ModalAddqlnv: true,
                    Qlnv: false,
                    infoCopy: infoTemp
                })

                break;

            case "Chỉnh sửa":
                // console.log('here')
                this.setState({
                    ModalAddqlnv: true,
                    disableLayout: true,
                    Qlnv: false,
                    action: 'edit',
                    infoPhieu: []
                })
    
                this.handleClickEdit()
                break;

            case "Hủy phiếu":
                let infoDeleteTemp = [].concat(this.state.infoCopy, {action: 'delete'})

                this.setState({
                    infoCopy: infoDeleteTemp
                })
                break;
            
            case "Xuất file":
                this.handleExport()
                break;
        
            default:
                break;
        }
    }

    handleClickQlnv = () => {
        this.setState({
            Qlnv: !this.state.Qlnv,
            ModalAddqlnv: false
        })
    }

    handleClickBack = () => {
        this.setState({
            Qlnv: true,
            ModalAddqlnv: false
        })
    }

    handleClickEdit = () => {
        let newInfo = [].concat(this.state.infoCopy, {action: 'edit'})
        this.setState({
            infoCopy: newInfo
        })
    }

    handleClickColumn = (info) => {
        // console.log(info)
        this.setState({
            infoCopy: info
        })
    }
    
    handleClickColumnView = () => {

        this.setState({
            ModalAddqlnv: true,
            Qlnv: false,
            action: 'view',
            viewModal: true
        })
    }

    handleClickView = (MaNhanvien) => {

        const nhanvienChoose = this.props.nhanvien.filter(item => {
            return(item.MaNhanvien === MaNhanvien)
        })

        let newInfo = [].concat(nhanvienChoose, [{action: 'view'}])

        this.setState({
            infoCopy: newInfo
        })

        this.handleClickColumnView()
    }

    handleClickSearch = (values) =>  {
        this.setState({
            ModalAddqlnv: false,
            Qlnv: false,
            ModalSearchForm: true
        })
    }

    handleClickChooseColumn = (selectRows) => {
        this.setState({
            selectRowsSearch: selectRows,
            ModalAddqlnv: true,
            Qlnv: false,
            ModalSearchForm: false
        })
    }

    handlePushDataToHome = (data) => {

        try {
            if(this.state.infoCopy[1].action === 'edit'){
                // console.log(data)
                data.action = 'edit'
            }
        } catch (error) {
            
        }

        this.setState({
            ModalAddqlnv: false,
            Qlnv: true,
            disableLayout: false,
            dataChange: data,
            
        })
    }

    handleClickMaphieu = (Maphieu) => {
        // console.log(Maphieu)
        // let infophieu = this.state.
        this.setState({
            ModalAddqlnv: true,
            Qlnv: false,
            disableLayout: true,
            infoPhieu: Maphieu
        })
    }

    handleChangeEdit = () => {
        this.handleClickButton('Chỉnh sửa')
    }

    render() {

        const panel  = (
            <div className="BoxSlider">
                <Typography style={{color: 'white'}}>
                    Giao dịch
                </Typography>
                {
                    this.state.expand ? <MinusSquareOutlined style={{backgroundColor: 'white'}}/> : <PlusSquareOutlined style={{backgroundColor: 'white'}} />
                }
                
            </div>
        )

        const panel2  = (
            <div className="BoxSlider">
                <Typography style={{color: 'white'}}>
                    Báo cáo kho
                </Typography>
                {
                    this.state.expand ? <MinusSquareOutlined style={{backgroundColor: 'white'}}/> : <PlusSquareOutlined style={{backgroundColor: 'white'}} />
                }
                
            </div>
        )

        const { Qlnv, ModalAddqlnv, ModalSearchForm } = this.state

        return (
            <Layout className="LayoutHome">
                {
                    this.state.disableLayout ? null : (
                        <Header className="HeaderHome">
                            <Menu theme="dark" style={{backgroundColor: '#428BCA', color: 'white'}} mode="horizontal">
                                <Menu.Item>
                                    Trang chủ
                                    <CaretDownOutlined style={{marginLeft: '0.1em', fontSize: "0.7em"}}></CaretDownOutlined>
                                </Menu.Item>
                                <Menu.Item>
                                    Danh mục
                                    <CaretDownOutlined style={{marginLeft: '0.1em', fontSize: "0.7em"}}></CaretDownOutlined>
                                </Menu.Item>
                                <Menu.Item>
                                    Giao dịch
                                    <CaretDownOutlined style={{marginLeft: '0.1em', fontSize: "0.7em"}}></CaretDownOutlined>
                                </Menu.Item>
                                <Menu.Item>
                                    Tồn kho
                                    <CaretDownOutlined style={{marginLeft: '0.1em', fontSize: "0.7em"}}></CaretDownOutlined>
                                </Menu.Item>
                                <Menu.Item>
                                    Thanh toán
                                    <CaretDownOutlined style={{marginLeft: '0.1em', fontSize: "0.7em"}}></CaretDownOutlined>
                                </Menu.Item>
                                <Menu.Item>
                                    Báo cáo
                                    <CaretDownOutlined style={{marginLeft: '0.1em', fontSize: "0.7em"}}></CaretDownOutlined>
                                </Menu.Item>
                                <Menu.Item>
                                    Hệ thống
                                    <CaretDownOutlined style={{marginLeft: '0.1em', fontSize: "0.7em"}}></CaretDownOutlined>
                                </Menu.Item>
                            </Menu>
                        </Header>
                    )
                }
                <Layout>
                    {
                        this.state.disableLayout ? null : (
                            <Sider className="SliderHome">
                                <div>
                                    <Collapse onChange={() => this.setState({expand: !this.state.expand})} defaultActiveKey={['1']}>
                                        <Panel showArrow={false} header={panel} key="1">
                                        <Row>
                                            <Col span={2}>
                                                <Divider dashed type="vertical" style={{height: '100%', backgroundColor: 'black'}}/>
                                            </Col>
                                            <Col span={22}>
                                                <Row justify="center" align="middle">
                                                    <Col span={2}>
                                                        <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <Typography className="TypographyPanel">
                                                            Xuất kho
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                <Row justify="center" align="middle">
                                                    <Col span={2}>
                                                        <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <Typography onClick={this.handleClickQlnv} className="TypographyPanel">
                                                            Nhập kho
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                <Row justify="center" align="middle">
                                                    <Col span={2}>
                                                        <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <Typography onClick={this.handleClickQlnv} className="TypographyPanel">
                                                            Kiểm kho
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                <Row justify="center" align="middle">
                                                    <Col span={2}>
                                                        <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <Typography className="TypographyPanel">
                                                            Tồn kho
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        </Panel>
                                    </Collapse>
                                </div>
                                <div>
                                    <Collapse onChange={() => this.setState({expand: !this.state.expand})} defaultActiveKey={['1']}>
                                        <Panel showArrow={false} header={panel2} key="1">
                                        <Row>
                                            <Col span={2}>
                                                <Divider dashed type="vertical" style={{height: '100%', backgroundColor: 'black'}}/>
                                            </Col>
                                            <Col span={22}>
                                                <Row justify="center" align="middle">
                                                    <Col span={2}>
                                                        <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <Typography className="TypographyPanel">
                                                            Báo cáo xuất, nhập, tồn
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                <Row justify="center" align="middle">
                                                    <Col span={2}>
                                                        <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <Typography className="TypographyPanel">
                                                            Báo cáo nhập hàng
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                <Row justify="center" align="middle">
                                                    <Col span={2}>
                                                        <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <Typography onClick={this.handleClickQlnv} className="TypographyPanel">
                                                            Báo cáo xuất hàng
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        </Panel>
                                    </Collapse>
                                </div>
                            </Sider>
                        )
                    }
                    <Content>
                        {
                            Qlnv && (
                                <Home handleClickMaphieu={this.handleClickMaphieu} dataChange={this.state.dataChange} handleExport={this.handleExport} handleClickColumn={this.handleClickColumn} handleClickEdit={this.handleClickEdit} action={this.state.action} handleClickButton={this.handleClickButton} handleClickView={this.handleClickView}></Home>
                            )
                        }
                        {
                            ModalAddqlnv && (
                                <AddModal handleChangeEdit={this.handleChangeEdit} infoPhieu={this.state.infoPhieu} handlePushDataToHome={this.handlePushDataToHome} selectRowsSearch={this.state.selectRowsSearch} handleClickSearch={this.handleClickSearch} info={this.state.infoCopy} infoview={this.state.infoview} handleClickBack={this.handleClickBack} view={this.view}></AddModal>
                            )
                        }
                        {/* <AddModal handleClickSearch={this.handleClickSearch} info={this.state.infoCopy} infoview={this.state.infoview} handleClickBack={this.handleClickBack} view={this.view}></AddModal> */}

                        {
                            ModalSearchForm && (
                                <SearchForm handleClickChooseColumn={this.handleClickChooseColumn}></SearchForm>
                            )
                        }
                    </Content>
                </Layout>
                <Footer>
                </Footer>
            </Layout>
        )
    }
}

export default NavBar
