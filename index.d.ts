declare module 'createreduxjs' {
	import { Action, AnyAction, Reducer, ActionCreator } from 'redux';

	export function createAction(type: any): any;
	export function createRedux(INITIAL_STATE: any, Actions: any): any;
	export function createActions(params: any): any;

	export function createReducer(INITIAL_STATE: any): any;

	export function createType(action: any): any;
}
