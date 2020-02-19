import * as React from 'react';
interface SignaturePanelProps {
    containerStyle?: object;
    width?: string | number;
    height?: string | number;
    offsetX?: number;
    offsetY?: number;
    strokeColor?: string;
    strokeWidth?: number;
    onFingerUp?: (...args: any[]) => any;
    onTouch?: (...args: any[]) => any;
    onTouchEnd?: (...args: any[]) => any;
    imageOutputSize?: number;
    imageQuality?: number;
    imageFormat?: 'jpg' | 'png' | 'webm' | 'raw';
    outputType?: 'tmpfile' | 'base64' | 'data-uri' | 'zip-base64';
}
interface SignaturePanelState {
    paths: any[];
    points: any[];
    posX: number;
    posY: number;
}
declare class SignaturePanel extends React.Component<SignaturePanelProps, SignaturePanelState> {
    static defaultProps: SignaturePanelProps;
    static timer: any;
    private signatureContainer;
    private panResponder;
    constructor(props: SignaturePanelProps);
    render(): JSX.Element;
    /**
     * Resets the signature pad container
     * @param {GestureResponderEvent} e Event
     * @public
     */
    reset(): void;
    /**
     * Detect the touch start and move events on the signature pad
     * @param {GestureResponderEvent} e Event
     * @private
     */
    private onTouch;
    /**
     * Detect when the user has finished the gesture
     * @private
     */
    private onTouchEnd;
    /**
     * Plots the captured points to an array
     * @param {Array} points Points
     * @return {any}
     * @private
     */
    private plotToSvg;
    /**
     * Takes the points and forms an SVG from them
     * @param {Array} paths
     * @param {Array} points
     * @return {Element}*
     * @private
     */
    private renderSvg;
    /**
     * Sets the layout view
     * @param {LayoutChangeEvent} e Event
     * @private
     */
    private onLayoutContainer;
    /**
     * Creates a snapshot image from the view container
     * @param {Array} paths
     * @param {Array} points
     * @return {SignaturePanelProps['onFingerUp']}*
     * @private
     */
    private returnImageData;
}
export default SignaturePanel;
