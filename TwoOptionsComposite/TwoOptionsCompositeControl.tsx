import * as React from 'react';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons"
import { Icon} from "office-ui-fabric-react/lib/Icon";
import {Stack, IStackStyles, IStackTokens} from "office-ui-fabric-react/lib/Stack";
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { DocumentCard, FontIcon, TextField } from '@fluentui/react';

initializeIcons();


export interface ITwoOptionsCards{
    control : ComponentFramework.PropertyTypes.TwoOptionsProperty;
    icons: string

}

export interface ITwoOptionsProperties{
 cards : ITwoOptionsCards[];
 width: number;
 height: number;
 showOn:  "ALWAYS" | "TRUE" | "FALSE" | "NOTNULL"
}
const iconClass = mergeStyles({
  fontSize: "3em",
  margin: "1px",   
  textAlign: "center"
});

function shouldShow(value : boolean, showOn:  "ALWAYS" | "TRUE" | "FALSE" | "NOTNULL") : boolean {
  if(showOn==="ALWAYS") return true;
  if(showOn==="TRUE") return value===true;
  if(showOn==="FALSE") return value===false;
  if(showOn==="NOTNULL") return value != null;
  return true;
}

export const TwoOptionsCompositeControl = ({cards, width, height, showOn}: ITwoOptionsProperties) : JSX.Element => {
    const wrapperTokens : IStackTokens = {
        childrenGap: 10, 
        padding: 10
      }
      const spacingTokens: IStackTokens = {
        childrenGap: 5,
        padding: 5
      };
    
    return  <Stack horizontal wrap tokens={wrapperTokens} style={{width:"100%"}} >
    {cards.map((card) =>{      
      const isVisible = shouldShow(card.control.raw, showOn);      
      if(!isVisible) return <></>;
      const valueIndex = card.control.raw===true ? 1 : 0;
      const color = card.control.attributes?.Options[valueIndex]?.Color ?? "black";
      return  <Stack tokens={{ childrenGap: 2 }} verticalFill={true} style={{width: `${width}px`, height: `${height}px`, alignItems: "center" , border: `1px solid ${color}`}}>
       <Stack grow><span>{card.control.formatted}</span></Stack>
       <Stack grow><FontIcon iconName={card.icons.split(";")[valueIndex]} className={iconClass} style={{color:color}} /></Stack>
       <Stack grow><span style={{fontWeight: "bold"}}>{card.control.attributes?.DisplayName}</span></Stack>
    </Stack>      
    })}
  </Stack>
}
