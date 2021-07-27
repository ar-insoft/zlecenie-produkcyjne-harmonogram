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
                    const value = ent[1]
                    return (<div className='objectEntry'>
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
    }
}

export default Tools