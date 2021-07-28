import { Tag } from 'antd';

const Tools = {
    displayObjectEntries: obj => {
        return (
            <div className='objectEntries'>
                {Object.entries(obj).map(ent => <div className='objectEntry'>
                    <div>{ent[0]}</div><div className='objectEntryValue'>{ent[1]}</div>
                </div>)}
            </div>
        )
    },
    displayObjectEntriesAsTags: obj => {
        return (
            <div className='objectEntries'>
                {Object.entries(obj).map(ent => {
                    const name = ent[0]
                    const value = ent[1] ? ent[1] : '-'
                    const width = (name + value).length < 30 ? 200 : 405
                    return (<div className='objectEntry' style={{ width: width+"px" }}>
                        <Tag color='geekblue' key={name}>
                            {name} {' '}
                            <Tag color='blue' key={value}>
                                {value}
                            </Tag>
                        </Tag>
                    </div>)
                })}
            </div>
        )
    },
    displayObjectEntriesAsGrid: obj => {
        return (
            <div className='objectEntries'>
                {Object.entries(obj).map(ent => {
                    const name = ent[0]
                    const value = ent[1] ? ent[1] : '-'
                    const width = (name + value).length < 30 ? 200 : 400
                    return (<div className='objectEntryGrid' style={{ width: width + "px" }}>
                        <div className='objectEntryGridName'>
                            {name} {' '}
                        </div>
                        <div className='objectEntryGridValue'>
                            {value}
                        </div>
                    </div>)
                })}
            </div>
        )
    },
}

export default Tools