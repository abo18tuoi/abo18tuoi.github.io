System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, v3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "14412U6hZxAD77/a3V4DtDo", "DragNode", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DragNode = exports('DragNode', (_dec = ccclass("DragNode"), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DragNode, _Component);

        function DragNode() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "targetNode", _descriptor, _assertThisInitialized(_this));

          _this._isDragging = false;
          _this._offset = v3();
          return _this;
        }

        var _proto = DragNode.prototype;

        _proto.onLoad = function onLoad() {
          this.targetNode.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.targetNode.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.targetNode.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.targetNode.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        };

        _proto.onTouchStart = function onTouchStart(event) {
          this._isDragging = true;
          var touch = event.touch;

          this._offset.set(touch.getUILocation().x - this.targetNode.position.x, touch.getUILocation().y - this.targetNode.position.y);
        };

        _proto.onTouchMove = function onTouchMove(event) {
          if (!this._isDragging) return;
          var touch = event.touch;
          this.targetNode.position = v3(touch.getUILocation().x - this._offset.x, touch.getUILocation().y - this._offset.y);
        };

        _proto.onTouchEnd = function onTouchEnd() {
          this._isDragging = false;
        };

        return DragNode;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './DragNode.ts', './Moving.ts', './ScaleNode.ts', './SpineController.ts', './SpineTest.ts', './TimeScaleSlider.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Moving.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sp, Vec3, tween, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "6bd60zfn5RAPrPuTS7Cyd8y", "Moving", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Moving = exports('Moving', (_dec = ccclass("Moving"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Moving, _Component);

        function Moving() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._tween = null;
          _this._speed = 100;
          return _this;
        }

        var _proto = Moving.prototype;

        _proto.onEnable = function onEnable() {
          this.move();
        };

        _proto.onDisable = function onDisable() {
          this.stop();
          var spine = this.node.getComponent(sp.Skeleton);

          if (spine) {
            spine.clearAnimation();
          }
        };

        _proto.move = function move() {
          var _this2 = this;

          this.stop();
          var randomPosition = new Vec3(Math.random() * 1000 - 500, Math.random() * 1000 - 500, 0);

          var duration = Vec3.distance(this.node.position, randomPosition) / this._speed;

          this._tween = tween(this.node).to(duration, {
            position: randomPosition
          }, {
            onUpdate: function onUpdate() {
              //update angle follow the direction
              var direction = randomPosition.clone().subtract(_this2.node.position).normalize();
              _this2.node.angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
            },
            onComplete: function onComplete() {
              _this2.move();
            }
          }).start();
        };

        _proto.stop = function stop() {
          if (this._tween) {
            this._tween.stop();

            this._tween = null;
          }
        };

        return Moving;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScaleNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Slider, Label, isValid, v3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Slider = module.Slider;
      Label = module.Label;
      isValid = module.isValid;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "3802a4KOlNEuYWYMVXVumIE", "ScaleNode", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MIN_SCALE = 0;
      var MAX_SCALE = 2;
      var ScaleNode = exports('ScaleNode', (_dec = ccclass('ScaleNode'), _dec2 = property(Node), _dec3 = property(Slider), _dec4 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScaleNode, _Component);

        function ScaleNode() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "slider", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "label", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScaleNode.prototype;

        _proto.start = function start() {
          this.slider.progress = 0.5;
        };

        _proto.update = function update(deltaTime) {
          if (isValid(this.target)) {
            var value = this.snapValue();
            this.setScale(value);
            this.label.string = value.toFixed(2);
          }
        };

        _proto.setScale = function setScale(value) {
          this.target.scale = v3(value, value);
        };

        _proto.snapValue = function snapValue() {
          // snap progress value
          var value = this.slider.progress * (MAX_SCALE - MIN_SCALE) + MIN_SCALE;
          var snap = 0.01;
          return Math.round(value / snap) * snap;
        };

        return ScaleNode;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "slider", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, sp, Prefab, Node, Toggle, assetManager, warn, Component, instantiate, Label;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Prefab = module.Prefab;
      Node = module.Node;
      Toggle = module.Toggle;
      assetManager = module.assetManager;
      warn = module.warn;
      Component = module.Component;
      instantiate = module.instantiate;
      Label = module.Label;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "ad7f8YHhnxI35sORnmEzGMH", "SpineController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SpineController = exports('SpineController', (_dec = ccclass('SpineController'), _dec2 = property(sp.Skeleton), _dec3 = property(Prefab), _dec4 = property(Node), _dec5 = property(Toggle), _dec6 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineController, _Component);

        function SpineController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "spine", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnPlayAnim", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "container", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "toggleLoop", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "containerSpine", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SpineController.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          this.spine.setEventListener(this.onSpineEvent.bind(this));
          window['sp'] = this.spine;
          assetManager.resources.loadDir('', function (err, assets) {
            if (err) {
              warn(err);
              return;
            }

            if (assets.length == 0) {
              warn('No spine data found');
              return;
            }

            assets = assets.filter(function (data) {
              return data instanceof sp.SkeletonData;
            });

            _this2.createListSpines(assets);
          });
        };

        _proto.createListSpines = function createListSpines(skeData) {
          var _this3 = this;

          this.containerSpine.removeAllChildren();
          if (skeData.length == 0) return;

          var _loop = function _loop() {
            var data = _step.value;
            var btn = instantiate(_this3.btnPlayAnim);
            btn.getComponentInChildren(Label).string = data.name;
            btn.parent = _this3.containerSpine;
            btn.on(Node.EventType.TOUCH_END, function () {
              _this3.spine.skeletonData = data;

              _this3.createListAnims();
            });
          };

          for (var _iterator = _createForOfIteratorHelperLoose(skeData), _step; !(_step = _iterator()).done;) {
            _loop();
          }

          this.spine.skeletonData = skeData[0];
          this.createListAnims();
        };

        _proto.createListAnims = function createListAnims() {
          var _this4 = this;

          this.container.removeAllChildren();
          var anims = this.spine.skeletonData.getAnimsEnum();

          var _loop2 = function _loop2(anim) {
            if (anim == '<None>') return "continue";
            var btn = instantiate(_this4.btnPlayAnim);
            btn.getComponentInChildren(Label).string = anim;
            btn.parent = _this4.container;
            btn.on(Node.EventType.TOUCH_END, function () {
              _this4.spine.setAnimation(0, anim, _this4.toggleLoop.isChecked);

              var duration = _this4.getAnimationDuration(_this4.spine, anim);

              console.log("Play animation " + anim + " with duration " + duration);
            });
          };

          for (var anim in anims) {
            var _ret = _loop2(anim);

            if (_ret === "continue") continue;
          }
        };

        _proto.getAnimationDuration = function getAnimationDuration(spine, name) {
          var animation = spine.skeletonData._skeletonCache.animations.find(function (e) {
            return e.name == name;
          });

          return animation.duration;
        };

        _proto.onSpineEvent = function onSpineEvent(trackEntry, event) {
          console.log('onSpineEvent', event.data.name);
        };

        _proto.stop = function stop() {
          this.spine.clearTracks();
        };

        return SpineController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spine", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnPlayAnim", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "toggleLoop", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "containerSpine", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineTest.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, Label, EditBox, NodePool, assetManager, sp, instantiate, v3, VERSION, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Label = module.Label;
      EditBox = module.EditBox;
      NodePool = module.NodePool;
      assetManager = module.assetManager;
      sp = module.sp;
      instantiate = module.instantiate;
      v3 = module.v3;
      VERSION = module.VERSION;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "e8112HPg4RF5KYqigqxQ+02", "SpineTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SpineTest = exports('SpineTest', (_dec = ccclass('SpineTest'), _dec2 = property(Prefab), _dec3 = property(Label), _dec4 = property(EditBox), _dec5 = property(EditBox), _dec6 = property(EditBox), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineTest, _Component);

        function SpineTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "prefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lblCount", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editBox", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editBoxIncreaseByTime", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editBoxMax", _descriptor5, _assertThisInitialized(_this));

          _this.pool = new NodePool();
          _this.listSpine = [];
          _this.spineBoss = null;
          _this.delayTime = 0;
          return _this;
        }

        var _proto = SpineTest.prototype;

        _proto.onLoad = function onLoad() {
          this.editBox.enabled = false;
          this.editBoxIncreaseByTime.enabled = false;
          this.editBoxMax.enabled = false;
          this.loadListSpine();
        };

        _proto.update = function update(dt) {
          this.delayTime += dt;

          if (this.delayTime >= 1) {
            this.delayTime = 0;
            this.addByNumber(parseInt(this.editBoxIncreaseByTime.string));
          }
        };

        _proto.loadListSpine = function loadListSpine() {
          var _this2 = this;

          this.log('Loading spine data...');
          assetManager.resources.loadDir('', function (err, assets) {
            if (err) {
              _this2.log("Error loading spine data: " + err);

              return;
            }

            if (assets.length == 0) {
              _this2.log('No spine data found');

              return;
            }

            assets = assets.filter(function (data) {
              return data instanceof sp.SkeletonData;
            });
            _this2.listSpine = assets.filter(function (data) {
              return data.name.includes('fish') || data.name.includes('boss');
            });
            _this2.spineBoss = assets.find(function (data) {
              return data.name.includes('boss');
            });
            _this2.editBox.enabled = true;
            _this2.editBoxIncreaseByTime.enabled = true;
            _this2.editBoxMax.enabled = true;
            _this2.editBox.string = '100';
            _this2.editBoxIncreaseByTime.string = '0';
            _this2.editBoxMax.string = '2000';

            _this2.add();

            _this2.log("Spine data loaded");
          });
        };

        _proto.add = function add() {
          if (!this.listSpine || this.listSpine.length == 0) return;
          var count = parseInt(this.editBox.string);
          this.addByNumber(count);
        };

        _proto.addByNumber = function addByNumber(count) {
          for (var i = 0; i < count; i++) {
            if (this.node.children.length >= this.MaxSpineCount) break;
            var node = this.pool.get();

            if (!node) {
              node = instantiate(this.prefab);
            }

            node.active = true;
            node.setParent(this.node);
            node.setPosition(v3(0, 0, 0));
            var spine = node.getComponent(sp.Skeleton);
            spine.clearAnimation();
            spine.skeletonData = this.spineData();
            this.tryPlayAnimation(spine);
          }

          this.log("Spine Count: " + this.node.children.length);
        };

        _proto.remove = function remove() {
          var count = parseInt(this.editBox.string);

          while (count > 0 && this.node.children.length > 0) {
            var node = this.node.children[0];

            if (node) {
              node.active = false;
              this.pool.put(node);
              count--;
            }
          }

          this.log("Spine Count: " + this.node.children.length);
        };

        _proto.spineData = function spineData() {
          return this.listSpine[this.node.children.length % this.listSpine.length];
        };

        _proto.hasAnimation = function hasAnimation(spine, name) {
          if (!spine || !spine.skeletonData) {
            return false;
          }

          var animation = spine.skeletonData._skeletonCache.animations.find(function (e) {
            return e.name === name;
          });

          return animation != null;
        };

        _proto.tryPlayAnimation = function tryPlayAnimation(spine) {
          var anims = ['Walk', 'idle', 'animation'];

          for (var _i = 0, _anims = anims; _i < _anims.length; _i++) {
            var anim = _anims[_i];

            if (this.hasAnimation(spine, anim)) {
              spine.setAnimation(0, anim, true);
              break;
            }
          }
        };

        _proto.log = function log(message) {
          this.lblCount.string = "Cocos Version: " + VERSION + "\nSpine Version: 3.8\n" + message;
        };

        _createClass(SpineTest, [{
          key: "MaxSpineCount",
          get: function get() {
            try {
              return parseInt(this.editBoxMax.string);
            } catch (error) {
              return 2000;
            }
          }
        }]);

        return SpineTest;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lblCount", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editBox", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "editBoxIncreaseByTime", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "editBoxMax", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimeScaleSlider.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ScaleNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sp, ScaleNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
    }, function (module) {
      ScaleNode = module.ScaleNode;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "a6a81eMI5xDFY4+x0tYrLOo", "TimeScaleSlider", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TimeScaleSlider = exports('TimeScaleSlider', (_dec = ccclass('TimeScaleSlider'), _dec(_class = /*#__PURE__*/function (_ScaleNode) {
        _inheritsLoose(TimeScaleSlider, _ScaleNode);

        function TimeScaleSlider() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ScaleNode.call.apply(_ScaleNode, [this].concat(args)) || this;
          _this.spine = null;
          return _this;
        }

        var _proto = TimeScaleSlider.prototype;

        _proto.onLoad = function onLoad() {
          this.spine = this.target.getComponent(sp.Skeleton);
        };

        _proto.setScale = function setScale(value) {
          this.spine.timeScale = value;
        };

        return TimeScaleSlider;
      }(ScaleNode)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map