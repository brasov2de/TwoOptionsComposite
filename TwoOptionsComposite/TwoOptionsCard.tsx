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
    isVisibleBecauseOfZoom : boolean;
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

export const TwoOptionsCard = React.memo(function TwoOptionsCardApp({card, isDisabled, width, height, isVisibleBecauseOfZoom, onCardClicked}: ITwoOptionsCardProperties) : JSX.Element{
    const iconClass = calculateIconStyle(height);  

    const onClick = React.useCallback(()=> {
        if(isDisabled===true) return;
        //onCardClicked({[card.name]: card.control.raw===true ? false : (card.control.raw==false ? null : true)})
        onCardClicked({[card.name]: card.control.raw==null ?  true : !card.control.raw })
    }, [card.name, card.control.raw, onCardClicked, isDisabled]);      
    
    const valueIndex = card.control.raw===true ? 1 : 0;
    const color = card.control.raw==null ? "#ebebeb" : card.control.attributes?.Options[valueIndex]?.Color ?? "black";
    const iconName = (card.icons??"").split(";")[valueIndex];  
    const textColor = isVisibleBecauseOfZoom===true ? "silver" : "black";
        
    return  (
        <Stack 
            key={card.control.attributes?.LogicalName} 
            className={isDisabled===true ? "CardDisabled" : "Card"}
            onClick={onClick} 
            tokens={{ childrenGap: 2 }} 
            verticalFill={true} 
            style={{width: `${width}px`, height: `${height}px`, border: `1px solid silver`, alignItems: "center"}}>
            <Stack grow style={{color: textColor}}>
                <span className="NoWrap" style={{width:width}}>{card.control.formatted}</span>
            </Stack>
            <Stack grow>
                <FontIcon iconName={iconName} className={iconClass} style={{color:color}} />
            </Stack>
            <Stack grow>
                <span 
                    className="NoWrap"
                    style={{color: textColor, width: width}}>                        
                    {card.control.attributes?.DisplayName}
                </span>
            </Stack>
        </Stack> 
    )     
}, (prevProps, newProps) => {       
    return prevProps.card.control.raw === newProps.card.control.raw
        && prevProps.isDisabled=== newProps.isDisabled
        && prevProps.isVisibleBecauseOfZoom === newProps.isVisibleBecauseOfZoom
        && prevProps.onCardClicked === newProps.onCardClicked
});