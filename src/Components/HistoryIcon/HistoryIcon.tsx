import React from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShareIcon from '@mui/icons-material/Share';
import WorkIcon from '@mui/icons-material/Work';

const HistoryIcon = (props:any) => { 
    console.log(props);
    switch(props.icono){
        case "TR":
            return <StorefrontIcon />
            break;
        case "TA":
            return <ShareIcon />
            break;
        default:
            return <WorkIcon />
            break;
    }
}

export default HistoryIcon;