import React, { useEffect, useState } from "react";

export interface TitleTypeProp {
    mediaType: string;
}

interface ChildrenProp {
    children: React.ReactNode
}

export const ThemeContext = React.createContext<TitleTypeProp>({mediaType:''});

const MyProvider = ({ children }: ChildrenProp) => {
    const [type, setType] = useState<TitleTypeProp>({mediaType:''});
    useEffect(()=>{
        const currentURL:string = window.location.href;
        currentURL.includes('movie')?setType({mediaType:'movie'}):currentURL.includes('tv')?setType({mediaType:'tv'}):setType({mediaType:''});
    },[]);

    return <ThemeContext.Provider value={type}>{children}</ThemeContext.Provider>;
};

export default MyProvider;