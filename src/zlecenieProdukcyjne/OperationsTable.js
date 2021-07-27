import { Table } from 'antd';
import Tools from './Tools'

export const OperationsTable = ({ params, callbacks, operacje }) => {
    //const { operationsPreSchedule, operationsSchedule } = params
    //const {operacje} = params

    const findSoId = id_operation => {
        const operation = operacje.find(oper => oper.id === id_operation)
        return operation.id_so_operation
    }

    const displayOperation = id_operation => {
        const operation = operacje.find(oper => oper.id === id_operation)
        return Tools.displayObjectEntriesAsTags(operation)
    }

    const columns = [
        {
            title: 'operation',
            dataIndex: 'id_so_operation',
            key: 'id_so_operation',
            sorter: (a, b) => a.id_operation - b.id_operation,
            render: id_so_operation => callbacks.soIndexTitle(id_so_operation),
        },
        {
            title: 'workplace',
            dataIndex: 'id_so_workplace',
            key: 'id_so_workplace',
            sorter: (a, b) => a.id_workplace - b.id_workplace,
            render: id_so_workplace => callbacks.soIndexTitle(id_so_workplace),
        },
        {
            title: 'planned_start',
            dataIndex: ['planned_start_date', 'planned_start_time'],
            key: 'planned_start_date',
            sorter: (a, b) => {
                console.log('sort', a,b)
                //const nameA = a.toUpperCase();
                //const nameB = b.toUpperCase();
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            },
            render: (text, record) => record.planned_start_date + ' ' + record.planned_start_time,
        },
        {
            title: 'fields',
            dataIndex: 'id',
            key: 'fields',
            render: id => displayOperation(id),
        },
        // {
        //     title: 'planned_start',
        //     dataIndex: 'planned_start',
        //     key: 'planned_start',
        //     sorter: {
        //         compare: (a, b) => a.planned_start.localeCompare(b.planned_start),
        //         multiple: 3,
        //     },
        // },
        // {
        //     title: 'planned_end',
        //     dataIndex: 'planned_end',
        //     key: 'planned_end',
        //     sorter: {
        //         compare: (a, b) => a.planned_end.localeCompare(b.planned_end),
        //         multiple: 3,
        //     },
        // },
    ];

    return (
        <>
            Operacje {operacje && operacje.length}
        <Table dataSource={operacje} columns={columns} rowKey='id' />
        </>
    )
}
