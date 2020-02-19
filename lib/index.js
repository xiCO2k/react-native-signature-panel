"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var react_native_view_shot_1 = require("react-native-view-shot");
var SignaturePanel = /** @class */ (function (_super) {
    __extends(SignaturePanel, _super);
    function SignaturePanel(props) {
        var _this = _super.call(this, props) || this;
        _this.signatureContainer = React.createRef();
        /**
         * Takes the points and forms an SVG from them
         * @param {Array} paths
         * @param {Array} points
         * @return {Element}*
         * @private
         */
        _this.renderSvg = function (paths, points) {
            var _a = _this.props, width = _a.width, height = _a.height, strokeColor = _a.strokeColor, strokeWidth = _a.strokeWidth;
            return (<react_native_svg_1.default style={styles.pad} width={width} height={height}>
				<react_native_svg_1.G>
					{paths.map(function (path, i) {
                return <React.Fragment key={"path-" + i}>{path}</React.Fragment>;
            })}
					<react_native_svg_1.Path d={_this.plotToSvg(points)} stroke={strokeColor} strokeWidth={strokeWidth} fill="none"/>
				</react_native_svg_1.G>
			</react_native_svg_1.default>);
        };
        /**
         * Sets the layout view
         * @param {LayoutChangeEvent} e Event
         * @private
         */
        _this.onLayoutContainer = function (e) {
            var _a = e.nativeEvent.layout, x = _a.x, y = _a.y;
            var _b = _this.props, offsetX = _b.offsetX, offsetY = _b.offsetY;
            _this.setState({
                posX: x + offsetX,
                posY: y + offsetY,
            });
        };
        _this.state = {
            paths: [],
            points: [],
            posX: 0,
            posY: 0,
        };
        _this.panResponder = react_native_1.PanResponder.create({
            onMoveShouldSetPanResponder: function () { return true; },
            onPanResponderGrant: function (e) { return _this.onTouch(e); },
            onPanResponderMove: function (e) { return _this.onTouch(e); },
            onPanResponderRelease: function (e) { return _this.onTouchEnd(); },
            onStartShouldSetPanResponder: function () { return true; },
        });
        return _this;
    }
    SignaturePanel.prototype.render = function () {
        var _a = this.props, containerStyle = _a.containerStyle, width = _a.width, height = _a.height;
        var _b = this.state, paths = _b.paths, points = _b.points;
        return (<react_native_1.View {...this.panResponder.panHandlers} ref={this.signatureContainer} onLayout={this.onLayoutContainer} style={[containerStyle, { width: width, height: height }]}>
				{this.renderSvg(paths, points)}
			</react_native_1.View>);
    };
    /**
     * Resets the signature pad container
     * @param {GestureResponderEvent} e Event
     * @public
     */
    SignaturePanel.prototype.reset = function () {
        this.setState({
            paths: [],
            points: [],
            posX: 0,
            posY: 0
        });
    };
    /**
     * Detect the touch start and move events on the signature pad
     * @param {GestureResponderEvent} e Event
     * @private
     */
    SignaturePanel.prototype.onTouch = function (e) {
        var _a = e.nativeEvent, locationX = _a.locationX, locationY = _a.locationY;
        var points = this.state.points;
        if (SignaturePanel.timer) {
            clearTimeout(SignaturePanel.timer);
        }
        this.setState({
            paths: this.state.paths,
            points: __spreadArrays(points, [{ locationX: locationX, locationY: locationY }]),
        });
        this.props.onTouch(e);
    };
    /**
     * Detect when the user has finished the gesture
     * @private
     */
    SignaturePanel.prototype.onTouchEnd = function () {
        var _a = this.state, paths = _a.paths, points = _a.points;
        var _b = this.props, strokeColor = _b.strokeColor, strokeWidth = _b.strokeWidth;
        var newPath = <react_native_svg_1.Path d={this.plotToSvg(points)} stroke={strokeColor} strokeWidth={strokeWidth} fill="none"/>;
        this.setState({
            paths: __spreadArrays(paths, [newPath]),
            points: [],
        }, this.returnImageData({ paths: paths, points: points }));
        this.props.onTouchEnd();
    };
    /**
     * Plots the captured points to an array
     * @param {Array} points Points
     * @return {any}
     * @private
     */
    SignaturePanel.prototype.plotToSvg = function (points) {
        var _a = this.state, posX = _a.posX, posY = _a.posY;
        if (points.length > 0) {
            var path_1 = "M " + (points[0].locationX - posX) + "," + (points[0].locationY - posY);
            points.forEach(function (point) {
                path_1 += " L " + (point.locationX - posX) + "," + (point.locationY - posY);
            });
            return path_1;
        }
        else {
            return '';
        }
    };
    /**
     * Creates a snapshot image from the view container
     * @param {Array} paths
     * @param {Array} points
     * @return {SignaturePanelProps['onFingerUp']}*
     * @private
     */
    SignaturePanel.prototype.returnImageData = function (_a) {
        var _this = this;
        var paths = _a.paths, points = _a.points;
        var _b = this.props, onFingerUp = _b.onFingerUp, imageFormat = _b.imageFormat, outputType = _b.outputType, imageOutputSize = _b.imageOutputSize, imageQuality = _b.imageQuality;
        return function () {
            if (!['jpg', 'png', 'webm', 'raw'].includes(imageFormat)) {
                onFingerUp(_this.renderSvg(paths, points));
            }
            else {
                var pixelRatio = react_native_1.PixelRatio.get();
                var pixels_1 = imageOutputSize / pixelRatio;
                SignaturePanel.timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var file;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, react_native_view_shot_1.captureRef(this.signatureContainer, {
                                    format: imageFormat,
                                    height: pixels_1,
                                    quality: imageQuality,
                                    result: outputType,
                                    width: pixels_1,
                                })];
                            case 1:
                                file = _a.sent();
                                onFingerUp(file);
                                SignaturePanel.timer = null;
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
            }
        };
    };
    SignaturePanel.defaultProps = {
        height: 300,
        imageFormat: 'png',
        imageOutputSize: 480,
        imageQuality: 1,
        offsetX: 0,
        offsetY: 0,
        onFingerUp: function () { },
        onTouch: function () { },
        onTouchEnd: function () { },
        outputType: 'tmpfile',
        strokeColor: '#000',
        strokeWidth: 3,
        width: '100%',
    };
    SignaturePanel.timer = null;
    return SignaturePanel;
}(React.Component));
var styles = react_native_1.StyleSheet.create({
    pad: {
        backgroundColor: 'transparent',
    },
});
exports.default = SignaturePanel;
