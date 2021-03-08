import { Tree } from 'antd';

export const ProductionProductsTree = ({ params, callbacks }) => {
    const { productionProducts } = params

    const byId = (ppId) => {
        return productionProducts.find(pp => pp.id === ppId);
    }
    const byIdParent = (ppId) => {
        return productionProducts.filter(pp => pp.id_parent === ppId);
    }

    const ppToTreeAdapter = pp => {
        return {
            title: callbacks.soIndexTitle(pp.id_object),
            key: pp.id,
            children: byIdParent(pp.id).map(ppToTreeAdapter),
        }
    }

    const listToTree = () => {
        const root = byIdParent('0')[0]
        return [ppToTreeAdapter(root)]
    }

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    return (
        <Tree
            checkable showLine
            //defaultExpandedKeys={['0-0-0', '0-0-1']}
            //defaultSelectedKeys={['0-0-0', '0-0-1']}
            //defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={listToTree()}
        />
    );
}

const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
            },
        ],
    },
];