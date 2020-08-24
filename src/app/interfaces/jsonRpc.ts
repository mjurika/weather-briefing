/**
 * JSON-RPC request interface.
 */
export interface IJsonRPCRequest<T> {
	/**
	 * Request identifier.
	 */
	id: string;
	/**
	 * Type of method.
	 */
	method: string;
	/**
	 * Parameters of request.
	 */
	params: T[];
}

/**
 * JSON-RPC response interface.
 */
export interface IJsonRPCResponse<T> {
	/**
	 * Response identifier.
	 */
	id: string;
	/**
	 * Error message.
	 */
	error: string;
	/**
	 * Result of response.
	 */
	result: T;
}
