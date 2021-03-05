import * as React from 'react';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons"
import {Stack, IStackTokens} from "office-ui-fabric-react/lib/Stack";
import { FontIcon } from '@fluentui/react/lib/Icon';
import { TwoOptionsCard } from './TwoOptionsCard';
import { Callout } from '@fluentui/react/lib/Callout';
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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

const wrapperTokens : IStackTokens = {
  childrenGap: 10, 
  padding: 10
}
const spacingTokens: IStackTokens = {
  childrenGap: 5,
  padding: 5
};


export const TwoOptionsCompositeControl = React.memo(function TwoOptionsCompositeControlApp({cards, width, height, showOn, onValueChanged, isDisabled, isVisible, disabledAttributes, hiddenAttributes}: ITwoOptionsProperties) : JSX.Element{  
    const [isZoomed, setIsZoomed] = React.useState(false);
    if(isVisible!==true) return <></>;    

    const toggleZoomed = ()=>{
      setIsZoomed(!isZoomed);
    }

    const disabledCards : string[]= (disabledAttributes ?? "").split(";");
    const hiddenCards : string[] = (hiddenAttributes ?? "").split(";");    

    return  (
      <Stack horizontal style={{width:"100%"}} >      
        <Stack horizontal wrap tokens={wrapperTokens} style={{width:"100%"}} >
        {cards.filter((card)=>{
          return !hiddenCards.includes(card.control.attributes?.LogicalName ?? card.name) && (isZoomed===true || shouldShow(card.control.raw, showOn));
        }).map((card) => 
          <TwoOptionsCard 
              card={card} 
              width={width} 
              height={height}        
              onCardClicked={onValueChanged} 
              key={card.name} 
              isVisibleBecauseOfZoom = {!shouldShow(card.control.raw, showOn)}
              isDisabled ={disabledCards.includes(card.control.attributes?.LogicalName ?? card.name)}           
              ></TwoOptionsCard>     
        )}
      </Stack>
      <Stack verticalAlign="end" onClick={toggleZoomed} >
        <Stack className="ZoomOut" verticalAlign="center">        
          <FontIcon iconName={isZoomed===true ? "ZoomOut" : "ZoomIn"} style={{fontWeight: "bold"}}/>        
        </Stack>
      </Stack>    
      </Stack>
      );

}, (prevProps, newProps)=> { 
    return newProps.cards.every((newCard, index) => newCard.control.raw === prevProps.cards[index]?.control.raw )
    && prevProps.onValueChanged === newProps.onValueChanged
    && prevProps.isDisabled === newProps.isDisabled
    && prevProps.isVisible === newProps.isVisible
    && prevProps.disabledAttributes === newProps.disabledAttributes
    && prevProps.hiddenAttributes === newProps.hiddenAttributes  
});
