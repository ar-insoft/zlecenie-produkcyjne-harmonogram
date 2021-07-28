import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Avatar, Badge } from 'antd';
import { MailOutlined, AppstoreOutlined, ApartmentOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {DataProvider} from './DataProvider'
import { Zlecenie} from './Zlecenie'
import {PreSchedulesOnWorkplaceTable} from './PreSchedulesOnWorkplaceTable'
import {ProductionProductsTree} from './ProductionProductTree'
import { OperationsTable} from './OperationsTable'

const { Header, Footer, Sider, Content } = Layout;

export const Kontroler = () => {
    const parsedUrl = new URL(window.location.href)
    const idZlecenie = parsedUrl.searchParams.get("id") || "160891864"
    const [selectedMenu, setSelectedMenu] = useState("pre_schedules_on_workplace")

    const [orderProductionSystemObject, setOrderProductionSystemObject] = useState()
    const [preSchedulesOnWorkplace, setPreSchedulesOnWorkplace] = useState([])
    const [schedulesOnWorkplace, setSchedulesOnWorkplace] = useState([])
    const [productionProducts, setProductionProducts] = useState([])
    const [systemObjects, setSystemObjects] = useState([])
    const [operationsPreSchedule, setOperationsPreSchedule] = useState([])
    const [operationsSchedule, setOperationsSchedule] = useState([])

    useEffect(() => {
        DataProvider.pobierzZlecenie(
            {
                idZlecenie: idZlecenie,
            },
            fromServer => {
                console.log('pobierzZlecenie fromServer', fromServer)
                setOrderProductionSystemObject(fromServer.OrderProductionSystemObject)
                setSystemObjects(fromServer.SystemObjects)
                setOperationsPreSchedule(fromServer.OperationsPreSchedule)
                setOperationsSchedule(fromServer.OperationsSchedule)
                setProductionProducts(fromServer.ProductionProducts)
                setPreSchedulesOnWorkplace(fromServer.PreSchedulesOnWorkplace)
                setSchedulesOnWorkplace(fromServer.SchedulesOnWorkplace)
                //setIsLoading(false)
            }, error => {
                console.log('zapiszPrace error', error)
                //wyswietlKomunikatBledu(error)
                //setIsLoading(false)
            })
    }, [])

    const callbacks = {
        soIndexTitle: (soId) => {
            const so = systemObjects.find(so => so.id_system_object === soId);
            if (so) {
                return so.object_index +' '+ so.title
            }
            return 'n.d.(' + soId+')'
        },
        operationPreSchedule: id => operationsPreSchedule.find(oper => oper.id === id),
    }

    const params = {
        orderProductionSystemObject,
        preSchedulesOnWorkplace, schedulesOnWorkplace,
        productionProducts,
        operationsPreSchedule, operationsSchedule,
    }

    const menuHandleClick = e => {
        //console.log('click ', e);
        setSelectedMenu(e.key);
    };

    const renderSwitch = () => {
        switch (selectedMenu) {
            case 'pre_schedules_on_workplace':
                return <PreSchedulesOnWorkplaceTable dane={preSchedulesOnWorkplace} params={params} callbacks={callbacks} />;
            case 'schedules_on_workplace':
                return <PreSchedulesOnWorkplaceTable dane={schedulesOnWorkplace} params={params} callbacks={callbacks} />;
            case 'production_products_tree':
                return <ProductionProductsTree params={params} callbacks={callbacks} />;
            case 'operations_schedule':
                return <OperationsTable operacje={operationsSchedule} params={params} callbacks={callbacks} />;
            default:
                return <Zlecenie params={params} callbacks={callbacks} />
                // return <>
                //     {orderProductionSystemObject && (orderProductionSystemObject.object_index +' '+ orderProductionSystemObject.title)}
                // </>
        }
    }
    return (
        <Layout theme="light">
            {/* idZlecenie[{idZlecenie}] preSchedulesOnWorkplace[{preSchedulesOnWorkplace.length}]
                productionProducts[{productionProducts.length}] systemObjects[{systemObjects.length}]
                operationsPreSchedule [{operationsPreSchedule.length}] */}
            <div className="ant-layout" data-order-id="{idZlecenie}">
                <Menu theme="dark" mode="horizontal" selectedKeys={[selectedMenu]} onClick={menuHandleClick}>
                    <Menu.Item key="1">id {idZlecenie}</Menu.Item>
                    <Menu.Item key="pre_schedules_on_workplace" icon={<AppstoreOutlined />}>preSchedules On Workplace Tab</Menu.Item>
                    <Menu.Item key="schedules_on_workplace" icon={<AppstoreOutlined />}>schedules On Workplace Tab</Menu.Item>
                    <Menu.Item key="production_products_tree" icon={<ApartmentOutlined />}>Production products tree</Menu.Item>
                    <Menu.Item key="operations_schedule" icon={<AppstoreOutlined />}>operations schedule Tab</Menu.Item>
                </Menu>
            </div>
            <Layout>
                <Sider theme="light">Sider</Sider>
                <Content>
                    {/* <PreSchedulesOnWorkplaceTable params={params} callbacks={callbacks} /> */}
                    {renderSwitch()}
                </Content>
            </Layout>
            <Footer>
                <span className="avatar-item" style={{ margin: "0 10px" }}>
                    <Badge count={productionProducts.length}>
                        <Avatar shape="square" title="productionProducts">
                            PP
                        </Avatar>
                    </Badge>
                </span>
                <span className="avatar-item" style={{ margin: "0 10px" }}>
                    <Badge count={operationsPreSchedule.length}>
                        <Avatar shape="square" title="operationsPreSchedule">
                            pSch
                        </Avatar>
                    </Badge>
                </span>
                <span className="avatar-item" style={{ margin: "0 10px" }}>
                    <Badge count={operationsSchedule.length}>
                        <Avatar shape="square" title="operationsSchedule">
                            Sch
                        </Avatar>
                    </Badge>
                </span>
                <span className="avatar-item" style={{ margin: "0 10px" }}>
                    <Badge count={preSchedulesOnWorkplace.length}>
                        <Avatar shape="square" title="preSchedulesOnWorkplace">
                            pOW
                        </Avatar>
                    </Badge>
                </span>
                <span className="avatar-item" style={{ margin: "0 10px" }}>
                    <Badge count={schedulesOnWorkplace.length}>
                        <Avatar shape="square" title="schedulesOnWorkplace">
                            sOW
                        </Avatar>
                    </Badge>
                </span>
                <span className="avatar-item" style={{ margin: "0 10px" }}>
                    {new Date().toISOString()} / {new Date().toLocaleString()}
                </span>
                {/* <Badge count={-1}>
                    <Avatar shape="square" icon={<UserOutlined />} />
                </Badge> */}
            </Footer>
        </Layout>
    )
}


