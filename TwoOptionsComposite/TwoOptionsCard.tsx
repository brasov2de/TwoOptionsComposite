import { ITwoOptionsCards } from "./TwoOptionsCompositeControl";
import * as React from 'react';
import {Stack, IStackStyles, IStackTokens} from "office-ui-fabric-react/lib/Stack";
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface ITwoOptionsCardProperties{
    card : ITwoOptionsCards;
    name : string;
    isVisible: boolean;
    width: number;
    height: number;
    onCardClicked : (newVale : Object) => void;    
   }

const iconClass = mergeStyles({
    fontSize: "2.5em",
    margin: "1px",   
    textAlign: "center"
}); 

export const TwoOptionsCard = ({card, name, isVisible , width, height, onCardClicked}: ITwoOptionsCardProperties) : JSX.Element => {

    const onClick = React.useCallback(()=> {
        onCardClicked({[name]: !card.control.raw})
    }, [onCardClicked]);  
    if(!isVisible) return <></>;
    const valueIndex = card.control.raw===true ? 1 : 0;
    const color = card.control.attributes?.Options[valueIndex]?.Color ?? "black";
        
    return  <Stack key={card.control.attributes?.LogicalName} onClick={onClick} tokens={{ childrenGap: 2 }} verticalFill={true} style={{width: `${width}px`, height: `${height}px`, alignItems: "center" , border: `1px solid ${color}`, cursor: "pointer"}}>
       <Stack grow><span>{card.control.formatted}</span></Stack>
       <Stack grow><FontIcon iconName={(card.icons??"").split(";")[valueIndex]} className={iconClass} style={{color:color}} /></Stack>
       <Stack grow><span style={{fontWeight: "bold"}}>{card.control.attributes?.DisplayName}</span></Stack>
    </Stack>      
}