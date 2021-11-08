import React,{useState} from 'react'
export const EditAuditContext=React.createContext()
export const EditAuditProvider=(props)=>{
    const [editAudit, seteditAudit] = useState()
    return (
        <EditAuditContext.Provider value={[editAudit,seteditAudit]}>
            {props.children}
        </EditAuditContext.Provider>
    )
}