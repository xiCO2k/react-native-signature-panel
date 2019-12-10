import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder, StyleSheet, PixelRatio } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';

class SignaturePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			points: [],
			paths: [],
			posX: 0,
			posY: 0,
		};

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: e => this._onTouch(e),
			onPanResponderMove: e => this._onTouch(e),
			onPanResponderRelease: e => this.onTouchEnd(e),
		});
	}

	_plotToSvg(points) {
		const { posX, posY } = this.state;
		if (points.length > 0) {
			let path = `M ${points[0].locationX - posX},${points[0].locationY - posY}`;
			points.forEach(point => {
				path += ` L ${point.locationX - posX},${point.locationY - posY}`;
			});
			return path;
		} else {
			return '';
		}
	}

	_onTouch(e) {
		const { locationX, locationY } = e.nativeEvent;
		const { points } = this.state;

		this.setState({
			paths: this.state.paths,
			points: [...points, { locationX, locationY }],
		});
	}

	onTouchEnd() {
		const { paths, points } = this.state;
		const { strokeColor, strokeWidth, onFingerUp, imageFormat } = this.props;
		const newPath = <Path d={this._plotToSvg(points)} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />;
		this.setState(
			{
				paths: [...paths, newPath],
				points: [],
			},
			this._returnImageData(imageFormat, onFingerUp, paths, points)
		);
	}

	_renderSVG = (paths, points) => {
		const { width, height, strokeColor, strokeWidth } = this.props;

		return (
			<Svg style={styles.pad} width={width} height={height}>
				<G>
					{paths.map((path, i) => {
						return <Fragment key={`path-${i}`}>{path}</Fragment>;
					})}
					<Path d={this._plotToSvg(points)} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
				</G>
			</Svg>
		);
	};

	_onLayoutContainer = e => {
		const { x, y } = e.nativeEvent.layout;
		const { offsetX, offsetY } = this.props;
		this.setState({
			posX: x + offsetX,
			posY: y + offsetY,
		});
	};

	_returnImageData(imageFormat, onFingerUp, paths, points) {
		return async () => {
			if (imageFormat === 'svg') {
				onFingerUp(this._renderSVG(paths, points));
			} else {
				const { imageOutputSize, imageQuality, imageFormat, outputType } = this.props;
				const pixelRatio = PixelRatio.get();
				const pixels = imageOutputSize / pixelRatio;
				let file = await takeSnapshotAsync(this.signatureContainer, {
					result: outputType,
					height: pixels,
					width: pixels,
					quality: imageQuality,
					format: imageFormat,
				});
				onFingerUp(file);
			}
		};
	}

	render() {
		const { containerStyle, width, height } = this.props;
		const { paths, points } = this.state;
		return (
			<View
				{...this.panResponder.panHandlers}
				ref={el => (this.signatureContainer = el)}
				onLayout={this._onLayoutContainer}
				style={[containerStyle, { width: width, height: height }]}
			>
				{this._renderSVG(paths, points)}
			</View>
		);
	}
}

SignaturePanel.propTypes = {
	containerStyle: PropTypes.object,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	offsetX: PropTypes.number,
	offsetY: PropTypes.number,
	strokeColor: PropTypes.string,
	strokeWidth: PropTypes.number,
	onFingerUp: PropTypes.func,
	imageOutputSize: PropTypes.number,
	imageQuality: PropTypes.number,
	imageFormat: PropTypes.string,
	outputType: PropTypes.string,
};

SignaturePanel.defaultProps = {
    height: 300, 
    width: '100%',
	offsetX: 0,
	offsetY: 0,
	strokeColor: '#000',
	strokeWidth: 3,
	imageOutputSize: 480,
	imageQuality: 1, // 0.1 to 1
	imageFormat: 'png', // ['png', 'jpg', 'svg]
	outputType: 'tmpfile', // ['tmpFile', 'base64', 'data-uri']
	onFingerUp: () => {},
};

let styles = StyleSheet.create({
	pad: {
		backgroundColor: 'transparent',
	},
});

export default SignaturePanel;
