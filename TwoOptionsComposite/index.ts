import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ITwoOptionsCards, ITwoOptionsProperties, TwoOptionsCompositeControl } from "./TwoOptionsCompositeControl";

function isITwoOptionsCards(card : ITwoOptionsCards | null ): card is ITwoOptionsCards {
	return card != null
  }
export class TwoOptionsComposite implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private container: HTMLDivElement;
	private newValue : Object =  {};
	private notifyOutputChanged : () => void;	
	
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	private valueChanged = (newValue: Object) : void => {
		this.newValue =  Object.assign(this.newValue, newValue);        
		this.notifyOutputChanged();
	}

	private renderControl(context: ComponentFramework.Context<IInputs>) : void {			
		const paramNames = Array(30).fill(null);
		let cards : ITwoOptionsCards[] = paramNames.map((name, index) => {
			const ctrlName = `boolean${index+1}`			
			if((context.parameters as any)[ctrlName]?.type == null){
				return null;
			}
			return {
				control:(context.parameters as any)[ ctrlName] as ComponentFramework.PropertyTypes.TwoOptionsProperty, 
				name : ctrlName,
				icons:(context.parameters as any)[`${ctrlName}Icons`].raw ?? "ToggleLeft;ToggleRight"}
		}).filter(isITwoOptionsCards);

		this.newValue = cards.reduce((result, current) => {        
			return Object.assign(result, {[current.name]: current.control.raw});
		}, {});

		let params : ITwoOptionsProperties = {						
			cards,
			width: context.parameters.cardWidth?.raw ?? 120,
			height: context.parameters.cardHeight?.raw ?? 100, 
			showOn : context.parameters.showOn.raw, 
			onValueChanged : this.valueChanged, 
			isDisabled : context.mode.isControlDisabled,
			isVisible : context.mode.isVisible, 
			disabledAttributes : context.parameters.disabledAttributes.raw,
			hiddenAttributes : context.parameters.hiddenAttributes.raw

		};			
		ReactDOM.render(React.createElement(TwoOptionsCompositeControl, params ) , this.container);
	
	}
	

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.container = container;				
		this.notifyOutputChanged = notifyOutputChanged;
		this.renderControl(context);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.renderControl(context);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return this.newValue;
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this.container);
	}
}