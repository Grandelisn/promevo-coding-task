import {createContext, useContext, useEffect, useState} from 'react';
import type { GmailLabel } from '../types/gmail-label';

export type LabelContextType = {
    labels: GmailLabel[],
    setLabels: (labels: GmailLabel[]) => void

}

const defaultContext: LabelContextType = {
    labels: [],
    setLabels: (labels: GmailLabel[]) => {}
}
const LabelContext = createContext<LabelContextType>(defaultContext)

export function LabelContextProvider({children}: {children: React.ReactNode}) {
    const [labels, setLabels] = useState<GmailLabel[]>([])
    console.log('test');
    useEffect(() => {
        console.log('test');
        setLabels([
            {
                id: '1',
                labelListVisibility: 'labelShow',
                messageListVisibility: 'show',
                messagesTotal: 0,
                messagesUnread: 0,
                name: 'Inbox',
                threadsTotal: 0,
                threadsUnread: 0,
                type: 'user',
                color: {
                    textColor: '#000000',
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: '2',
                labelListVisibility: 'labelShow',
                messageListVisibility: 'show',
                messagesTotal: 0,
                messagesUnread: 0,
                name: 'Starred',
                threadsTotal: 0,
                threadsUnread: 0,
                type: 'user',
                color: {
                    textColor: '#000000',
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: '3',
                labelListVisibility: 'labelShow',
                messageListVisibility: 'show',
                messagesTotal: 0,
                messagesUnread: 0,
                name: 'Sent Mail',
                threadsTotal: 0,
                threadsUnread: 0,
                type: 'user',
                color: {
                    textColor: '#000000',
                    backgroundColor: '#ffffff'
                }
            },]);
        }, []);
    return (
        <LabelContext.Provider value={{labels, setLabels}}>
            {children}
        </LabelContext.Provider>
    )
}
export function useLabelContext() {
    return useContext(LabelContext)
}