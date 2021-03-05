import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, ApartmentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {DataProvider} from './DataProvider'
import {SchedulesOnWorkplaceTable} from './SchedulesOnWorkplaceTable'

const { Header, Footer, Sider, Content } = Layout;

export const ZlecenieProdukcyjne = () => {
    const parsedUrl = new URL(window.location.href)
    const idZlecenie = parsedUrl.searchParams.get("id") || "160334661"

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

    return (
        <Layout theme="light">
            <div className="ant-layout">
                Header 
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreOutlined />}>preSchedules On Workplace Tab</Menu.Item>
                    <Menu.Item key="3" icon={<ApartmentOutlined />}>nav 3</Menu.Item>
                </Menu>
            </div>
            <Layout>
                <Sider theme="light">Sider</Sider>
                <Content>
                    <SchedulesOnWorkplaceTable params={params} callbacks={callbacks} />
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


