import Tools from './Tools'

export const Zlecenie = ({ params, callbacks, }) => {
    const { orderProductionSystemObject } = params

    if (!orderProductionSystemObject) return null
    return (
        <>
            <img src={orderProductionSystemObject.icon_path} style={{ width: 15 + 'px' }, { height: 15 + 'px' }, { marginRight: 5 + 'px' }} />
            Zlecenie produkcyjne {(orderProductionSystemObject.object_index + ' ' + orderProductionSystemObject.title)}
            {Tools.displayObjectEntriesAsGrid(orderProductionSystemObject)}
        </>
    )
}