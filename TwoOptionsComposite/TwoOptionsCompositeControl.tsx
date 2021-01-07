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
}
const iconClass = mergeStyles({
  fontSize: 30,
  height: 30,
  width: 50,
  margin: "1px",   
  textAlign: "center"
});


export const TwoOptionsCompositeControl = ({cards, width}: ITwoOptionsProperties) : JSX.Element => {
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
      const color = card.control.attributes?.Options[1]?.Color ?? "green";
      return  <Stack tokens={{ childrenGap: 2 }} verticalFill={true} style={{width: "200px", height: "100px", alignItems: "center" , border: `1px solid ${color}`}}>
       <Stack grow><span>{card.control.formatted}123</span></Stack>
       <Stack grow><FontIcon iconName={card.icons.split(";")[1]} className={iconClass} style={{color:color}} /></Stack>
       <Stack grow><span style={{fontWeight: "bold"}}>{card.control.attributes?.DisplayName}</span></Stack>
    </Stack>
      /* <Stack grow  wrap horizontal horizontalAlign="space-between" tokens={{ childrenGap: 10, padding: 0}}>
          <FontIcon iconName={card.icons.split(";")[0]} />  
       </Stack>
       <Stack grow horizontal horizontalAlign="start" verticalAlign="end" style={{maxHeight: "25%", textAlign: "left"}}>
           <span style={{fontSize: "1.1em"}} >label</span>
       </Stack>*/   
    })}
  </Stack>
}
