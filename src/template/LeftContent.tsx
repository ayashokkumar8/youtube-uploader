import React from "react";
//import MenuDrawer from "components/menu/MenuDrawer";
//import { history } from "App";
import { useMutation } from "react-query";
//import fetch from "services/fetch";

const LeftContent = () => {
/*
    const [request] = useMutation<any, string>((url) => fetch.post(url));

    const onClick = React.useCallback((url: string) => {
        if(url.startsWith("api")){
            request(url.replace("api", ""));
        } else {
            history.push(url)
        }
    }, [request])

    return(<MenuDrawer onClick={onClick} />)  */
return <div>Left Menu Content</div>;
}

export default LeftContent;
