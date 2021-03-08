import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, ApartmentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {DataProvider} from './DataProvider'
import {PreSchedulesOnWorkplaceTable} from './PreSchedulesOnWorkplaceTable'
import {ProductionProductsTree} from './ProductionProductTree'

const { Header, Footer, Sider, Content } = Layout;

export const ZlecenieProdukcyjne = () => {
    const parsedUrl = new URL(window.location.href)
    const idZlecenie = parsedUrl.searchParams.get("id") || "160334661"
    const [selectedMenu, setSelectedMenu] = useState("pre_schedules_on_workplace")

    const [preSchedulesOnWorkplace, setPreSchedulesOnWorkplace] = useState([])
    const [productionProducts, setProductionProducts] = useState([])
    const [systemObjects, setSystemObjects] = useState([])
    const [operationsPreSchedule, setOperationsPreSchedule] = useState([])

    useEffect(() => {
        DataProvider.pobierzZlecenie(
            {
                idZlecenie: idZlecenie,
            },
            fromServer => {
                console.log('pobierzZlecenie fromServer', fromServer)
                setSystemObjects(fromServer.SystemObjects)
                setOperationsPreSchedule(fromServer.OperationsPreSchedule)
                setProductionProducts(fromServer.ProductionProducts)
                setPreSchedulesOnWorkplace(fromServer.PreSchedulesOnWorkplace)
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
        preSchedulesOnWorkplace,
        productionProducts,
    }

    const menuHandleClick = e => {
        //console.log('click ', e);
        setSelectedMenu(e.key);
    };

    const renderSwitch = () => {
        switch (selectedMenu) {
            case 'pre_schedules_on_workplace':
                return <PreSchedulesOnWorkplaceTable params={params} callbacks={callbacks} />;
            case 'production_products_tree':
                return <ProductionProductsTree params={params} callbacks={callbacks} />;
            default:
                return 'default';
        }
    }
    return (
        <Layout theme="light">
            <div className="ant-layout">
                <Menu theme="dark" mode="horizontal" selectedKeys={[selectedMenu]} onClick={menuHandleClick}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="pre_schedules_on_workplace" icon={<AppstoreOutlined />}>preSchedules On Workplace Tab</Menu.Item>
                    <Menu.Item key="production_products_tree" icon={<ApartmentOutlined />}>Production products tree</Menu.Item>
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
                Footer
                idZlecenie[{idZlecenie}] preSchedulesOnWorkplace[{preSchedulesOnWorkplace.length}]
                productionProducts[{productionProducts.length}] systemObjects[{systemObjects.length}]
                operationsPreSchedule [{operationsPreSchedule.length}]
            </Footer>
        </Layout>
    )
}


