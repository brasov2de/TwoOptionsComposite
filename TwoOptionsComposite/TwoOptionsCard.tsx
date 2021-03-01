import { ITwoOptionsCards } from "./TwoOptionsCompositeControl";
import * as React from 'react';
import {Stack, IStackStyles, IStackTokens} from "office-ui-fabric-react/lib/Stack";
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface ITwoOptionsCardProperties{
    card : ITwoOptionsCards;      
    isDisabled : boolean;
    width: number;
    height: number;
    onCardClicked : (newVale : Object) => void;    
   }

const calculateIconStyle=(height: number) : string => {    
    return mergeStyles({
        fontSize: `${Math.trunc(height/3)}px`,
        fontWeight: "bold",
        margin: "1px",   
        textAlign: "center"
    });
}

export const TwoOptionsCard = ({card, isDisabled, width, height, onCardClicked}: ITwoOptionsCardProperties) : JSX.Element => {
    const iconClass = calculateIconStyle(height);  

    const onClick = React.useCallback(()=> {
        if(isDisabled===true) return;
        onCardClicked({[card.name]: !card.control.raw})
    }, [onCardClicked, isDisabled]);      
    
    const valueIndex = card.control.raw===true ? 1 : 0;
    const color = card.control.attributes?.Options[valueIndex]?.Color ?? "black";
    const iconName = (card.icons??"").split(";")[valueIndex];  
        
    return  (
        <Stack 
            key={card.control.attributes?.LogicalName} 
            className={isDisabled===true ? "CardDisabled" : "Card"}
            onClick={onClick} 
            tokens={{ childrenGap: 2 }} 
            verticalFill={true} 
            style={{width: `${width}px`, height: `${height}px`, border: `1px solid silver`, alignItems: "center"}}>
            <Stack grow>
                <span>{card.control.formatted}</span>
            </Stack>
            <Stack grow>
                <FontIcon iconName={iconName} className={iconClass} style={{color:color}} />
            </Stack>
            <Stack grow>
                <span style={{fontWeight: "bold"}}>{card.control.attributes?.DisplayName}</span>
            </Stack>
        </Stack> 
    )     
}