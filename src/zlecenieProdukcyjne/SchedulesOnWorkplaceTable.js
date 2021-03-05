import { Table } from 'antd';

export const SchedulesOnWorkplaceTable = ({ params, callbacks }) => {
    const { preSchedulesOnWorkplace } = params
    //console.log('SchedulesOnWorkplaceTable', preSchedulesOnWorkplace) 
    const columns = [
        // {
        //     title: 'id',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'operation',
            dataIndex: 'id_operation',
            key: 'id_operation',
            sorter: (a, b) => a.id_operation - b.id_operation,
            render: id_operation => callbacks.soIndexTitle(callbacks.operationPreSchedule(id_operation).id_so_operation),
        },
        {
            title: 'workplace',
            dataIndex: 'id_workplace',
            key: 'id_workplace',
            sorter: (a, b) => a.id_workplace - b.id_workplace,
            render: id_workplace => callbacks.soIndexTitle(id_workplace),
        },
        {
            title: 'planned_start',
            dataIndex: 'planned_start',
            key: 'planned_start',
            sorter: {
                compare: (a, b) => a.planned_start.localeCompare(b.planned_start),
                multiple: 3,
            },
        },
        {
            title: 'planned_end',
            dataIndex: 'planned_end',
            key: 'planned_end',
            sorter: {
                compare: (a, b) => a.planned_end.localeCompare(b.planned_end),
                multiple: 3,
            },
        },
    ];

    return (
        <Table dataSource={preSchedulesOnWorkplace} columns={columns} rowKey='id' />
    )
}
