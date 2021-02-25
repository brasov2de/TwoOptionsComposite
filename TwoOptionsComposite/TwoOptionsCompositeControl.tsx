import * as React from 'react';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons"
import {Stack, IStackTokens} from "office-ui-fabric-react/lib/Stack";

import { TwoOptionsCard } from './TwoOptionsCard';

initializeIcons();


export interface ITwoOptionsCards{
    control : ComponentFramework.PropertyTypes.TwoOptionsProperty;
    name : string;
    icons: string    
}

export interface ITwoOptionsProperties{
 cards : ITwoOptionsCards[];
 width: number;
 height: number;
 showOn:  "ALWAYS" | "TRUE" | "FALSE" | "NOTNULL";
 onValueChanged : (newValue:Object) => void;
 isDisabled: boolean;
 isVisible : boolean;
 disabledAttributes : string |null;
 hiddenAttributes : string | null;
 
}


function shouldShow(value : boolean, showOn:  "ALWAYS" | "TRUE" | "FALSE" | "NOTNULL") : boolean {
  if(showOn==="ALWAYS") return true;
  if(showOn==="TRUE") return value===true;
  if(showOn==="FALSE") return value===false;
  if(showOn==="NOTNULL") return value != null;
  return true;
}

export const TwoOptionsCompositeControl = ({cards, width, height, showOn, onValueChanged, isDisabled, isVisible, disabledAttributes, hiddenAttributes}: ITwoOptionsProperties) : JSX.Element => {  
    if(isVisible!==true) return <></>;
    const wrapperTokens : IStackTokens = {
        childrenGap: 10, 
        padding: 10
      }
      const spacingTokens: IStackTokens = {
        childrenGap: 5,
        padding: 5
      };

    const onCardClick = (newVal:Object)=>{      
      if(isDisabled===true) return;
      const newValue = Object.assign(cards.reduce((result, current) => {        
          return Object.assign(result, {[current.name]: current.control.raw});
      }, {}), newVal);
      onValueChanged(newValue);
    };

    const disabledCards : string[]= (disabledAttributes ?? "").split(";");
    const hiddenCards : string[] = (hiddenAttributes ?? "").split(";");

    
    return  <Stack horizontal wrap tokens={wrapperTokens} style={{width:"100%"}} >
    {cards.map((card) => 
      <TwoOptionsCard 
          card={card} 
          width={width} 
          height={height}        
          onCardClicked={onCardClick} 
          key={card.name} 
          isDisabled ={disabledCards.includes(card.control.attributes?.LogicalName ?? card.name)} 
          isVisible ={!hiddenCards.includes(card.control.attributes?.LogicalName ?? card.name) && shouldShow(card.control.raw, showOn)} 
          ></TwoOptionsCard>     
    )}
  </Stack>
}
