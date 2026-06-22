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
    const [labels, setLabels] = useState<GmailLabel[]>([]);
    
    
    return (
        <LabelContext.Provider value={{labels, setLabels}}>
            {children}
        </LabelContext.Provider>
    )
}
export function useLabelContext() {
    return useContext(LabelContext)
}