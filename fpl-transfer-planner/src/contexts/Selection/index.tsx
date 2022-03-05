import React, { createContext, useReducer } from 'react';
import { initialSelectionContext, SelectionContextType, selectionContextReducer, } from './reducer';


export const SelectionContext = createContext<SelectionContextType>({state: initialSelectionContext});

export const SelectionProvider = ({ children }: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(selectionContextReducer, initialSelectionContext);
    return (
        <SelectionContext.Provider value={{state, dispatch}} children={children} />
    )
}