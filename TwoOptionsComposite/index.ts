import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ITwoOptionsCards, ITwoOptionsProperties, TwoOptionsCompositeControl } from "./TwoOptionsCompositeControl";

export class TwoOptionsComposite implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private container: HTMLDivElement;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	private renderControl(context: ComponentFramework.Context<IInputs>) : void {		
	/*	const inputs = [context.parameters.input1, context.parameters.input2, context.parameters.input3, context.parameters.input4, context.parameters.input5, context.parameters.input6];
		const backgroundColors = (context.parameters.backgroundColor?.raw || "").split(";");
		const textColors = (context.parameters.textColor?.raw || "").split(";");
		const suffixes = (context.parameters.suffix?.raw || "").split(";");
		const icons = (context.parameters.icons?.raw || "").split(";");

		const numberCards = inputs.filter((numberCard) => numberCard!=null && numberCard.type!=null).map((numberCard, index) => {
			return {
				value : numberCard?.formatted || "",
				backgroundColor: backgroundColors[index] || "gray",
				textColor : textColors[index] || "white",
				suffix : suffixes[index] || "",
				label : numberCard?.attributes?.DisplayName || "",
				icon : icons[index] || "FieldEmpty"
			}
		})	*/
		const paramNames = Array(30).fill(0);
		let cards : ITwoOptionsCards[] = paramNames.map((name, index) => {
			const ctrlName = `boolean${index+1}`
			return {
				control:(context.parameters as any)[ ctrlName] as ComponentFramework.PropertyTypes.TwoOptionsProperty, 
				icons:(context.parameters as any)[`${ctrlName}Icons`].raw ?? "ToggleLeft;ToggleRight"}
		});

		let params : ITwoOptionsProperties = {						
			cards,
			width: 120 // context.parameters.size?.raw ?? 120

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
		return {};
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