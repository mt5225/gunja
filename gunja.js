
// 隐藏系统内置面板
gui.showPanel("LevelPanel", true);

var subwayPortManager = {};
var subwayPortManager1 = {};
var subwayPortManager2 = {};
var subwayPortManager3 = {};
var current_layer = "outside";

camera.zoomLimit = Vector2(4, 500);
// object.find("Interlayer").pickEnabled = false;
//查找地铁口位置
function findSubwayPos() {

	var objList = object.findByProperty("type");
	for (var i = 0; i < objList.Count; i++) {
		var obj = objList.get_Item(i);
		var propValue = obj.getProperty("type");
		if (propValue == "port") {
			subwayPortManager[obj.id] = obj;
		} else if (propValue == "port1") {
			subwayPortManager1[obj.id] = obj;
		} else if (propValue == "port2") {
			subwayPortManager2[obj.id] = obj;
		} else if (propValue == "port3") {
			subwayPortManager3[obj.id] = obj;
		}
	}
}

//B1
object.find("Entrance 10").uid = "Lift 1";
object.find("Entrance 11").uid = "Lift 2";
object.find("Entrance 12").uid = "Entrance ❺ ❼";

object.find("Entrance ⑤⑦").uid = "Entrance <size=16>❺</size>";
object.find("Entrance  ⑤⑦").uid = "Entrance <size=16>❺</size>";
//B2
object.find("9").uid = "Exit";
object.find("9_0").uid = "Lift 1";
object.find("9_1").uid = "Lift 2";
object.find("9_2").uid = "Exit";
object.find("9_3").uid = "Exit";
object.find("9_4").uid = "Exit";

object.find("Line ❼").uid = "Entrance ❼";
object.find("line ❼").uid = "Entrance ❼";
object.find("line❼").uid = "Entrance ❼";

//B3
object.find("Exit_0").uid = "Exit";
object.find("Exit_1").uid = "Lift 2";
object.find("Exit_2").uid = "Exit";
object.find("Exit_3").uid = "Lift 1";

object.find("0").uid = "Exit";
object.find("0_0").uid = "Exit";
object.find("0_1").uid = "Exit";
object.find("0_2").uid = "Exit";

// level.change(object.find("bulding"));//进入建筑里边

var urlBase = "http://www.3dmomoda.com/mmdclient/script/examples/demos/";

var ui_up;
var ui_down;
var ui_downup;
var ui_btn;
var ui_btns;

var btn_ui;
var up_ui;
var down_ui;
var downup_ui;
//创建牌子
function createTable() {
	util.download({
		"url": urlBase + "/assets/SiloHouses/Subway/infopanel_subway1_pc.bundle",
		"success": function (res) {

			foreach(var item in pairs(subwayPortManager)) {

				var obj = item.value;
				obj.setTransparent(0.001);
				var infopanle_UI = gui.create(res);
				var bound = ObjectUtil.CalculateBounds(obj.gameObject);
				var offsetY = bound.size.y;
				infopanle_UI.setObject(obj, Vector3(0, offsetY, 0));
				infopanle_UI.setText("Button/Text", obj.uid);

				infopanle_UI.regButtonEvent("Button", function () {

					levelManager.EnableFlyCamera = false;
					level.change(object.find("Gunja"));

					btnFloor();

					object.find("Compass02").show(false);
					object.find("Compass03").show(false);

					var objpos = object.find("Center01");
					objpos.setTransparent(0.001);
					objpos.setPosition(Vector3(-35, -20, 0)); //-45,30,-110
					var pos = objpos.transform.TransformPoint(Vector3(300, 500, 460)); //520,450,300
					camera.setPosition(pos); //-178.3,239.8,-268.3
					camera.lookAt(objpos.center);
					levelManager.EnableFlyCamera = true;

					ui_btn.find("Buttons/Toggle1").GetComponent("Toggle").isOn = true;
					ui_btn.show(true);

				});
			}

		}
	});

	util.download({
		"url": urlBase + "/assets/SiloHouses/Subway/infopanel_subwayup1_pc.bundle",
		"success": function (res) {
			up_ui = res;

			foreach(var item in pairs(subwayPortManager1)) {

				var obj1 = item.value;
				obj1.setTransparent(0.001);
				ui_up = gui.create(up_ui);
				ui_up.setScale(0.6, 0.6);
				var bound = ObjectUtil.CalculateBounds(obj1.gameObject);
				var offsetY = bound.size.y;
				ui_up.setObject(obj1, Vector3(0, offsetY, 0));
				ui_up.setText("Button/Text", obj1.uid);
				array.add(uiup, ui_up);

			}
		}
	});

	util.download({
		"url": urlBase + "/assets/SiloHouses/Subway/infopanel_subwaydown1_pc.bundle",
		"success": function (res) {
			down_ui = res;

			foreach(var item in pairs(subwayPortManager2)) {

				var obj2 = item.value;
				obj2.setTransparent(0.001);
				ui_down = gui.create(down_ui);
				ui_down.setScale(0.6, 0.6);
				var bound2 = ObjectUtil.CalculateBounds(obj2.gameObject);
				var offsetY2 = bound2.size.y;
				ui_down.setObject(obj2, Vector3(0, offsetY2, 0));
				ui_down.setText("Button/Text", obj2.uid);
				array.add(uidown, ui_down);

			}
		}
	});

	util.download({
		"url": urlBase + "/assets/SiloHouses/Subway/infopanel_subwayup&down_pc.bundle",
		"success": function (res) {
			downup_ui = res;

			foreach(var item in pairs(subwayPortManager3)) {

				var obj3 = item.value;
				obj3.setTransparent(0.001);
				ui_downup = gui.create(downup_ui);
				ui_downup.setScale(0.6, 0.6);
				var bound3 = ObjectUtil.CalculateBounds(obj3.gameObject);
				var offsetY3 = bound3.size.y;
				ui_downup.setObject(obj3, Vector3(0, offsetY3, 0));
				ui_downup.setText("Button/Text", obj3.uid);
				array.add(uidownup, ui_downup);

			}

		}
	});

	util.download({
		"url": urlBase + "/assets/SiloHouses/Subway/gunjastation2-1_pc.bundle",
		"success": function (res) {
			btn_ui = res;
			ui_btn = gui.create(btn_ui);
			ui_btn.show(false);

			// ui_btn.setPosition(20,-40);
		}
	});
	util.download({
		"url": urlBase + "/assets/SiloHouses/Subway/gunjastation3-1_pc.bundle",
		"success": function (res) {
			ui_btns = gui.create(res);
			ui_btns.regButtonEvent("Button", function () {

				gui.showPanel("IcoViewPoint", true);

			});
		}
	});
}

var uiup = [];
var uidown = [];
var uidownup = [];

function isshow() {

	levelManager.EnableFlyCamera = false;
	util.addEventListener("levelchange", function (obj) {

		//改变建筑内背景颜色
		var R = 36;
		var G = 36;
		var B = 36;
		camera.cam.backgroundColor = Color(R / 255, G / 255, B / 255);

		if (obj.ClsID == ObjectFactory.CLSID_FLOORPLAN) {
            current_layer = "inside";
			if (ui_btn.findToggle("Toggle").isOn) {
				showTable();
			}

		} else if (obj.ClsID == ObjectFactory.CLSID_BUILDING) {
            current_layer = "outside";
			concealTable();
		}

		//检测视点面板是否开启ViewPointUI.IsShowViewPintUI()
		util.setRenderCallback(function () {

			if (ViewPointUI.IsShowViewPintUI()) {
				ui_btn.show(false);
				ui_btns.show(false);
			} else if (stateManager.CurState.name == "FPSCtrlState") {
				ui_btn.show(false);
				ui_btns.show(false);
			} else if (obj.ClsID == ObjectFactory.CLSID_WORLD) {
				ui_btn.show(false);
				ui_btns.show(true);
			} else if (obj.ClsID != ObjectFactory.CLSID_WORLD) {
				ui_btns.show(false);
				ui_btn.show(true);
			}
		});

	});

}

function concealTable() {
	for (var i = 0; i < uiup.length; i++) {
		uiup[i].show(false);
	}
	for (var j = 0; j < uidown.length; j++) {
		uidown[j].show(false);
	}
	for (var k = 0; k < uidownup.length; k++) {
		uidownup[k].show(false);
	}
	// array.clear(uiup);
	// array.clear(uidown);
	// array.clear(uidownup);
}

function showTable() {
	for (var i = 0; i < uiup.length; i++) {
		uiup[i].show(true);
	}
	for (var j = 0; j < uidown.length; j++) {
		uidown[j].show(true);
	}
	for (var k = 0; k < uidownup.length; k++) {
		uidownup[k].show(true);
	}
}

var obj01 = object.find("隐藏1");
var obj02 = object.find("隐藏2");
function workEvent() {

	fps.setSpeed(10, 20);

	fps.onStart(function () {

		obj01.show(false);
		obj02.show(false);

	});
	fps.onEnd(function () {

		if (FloorPlan.current.name == "B1") {
			obj01.show(true);
		} else if (FloorPlan.current.name == "B3") {
			obj02.show(true);
		}

	});

}

function btnFloor() {

	ui_btn.regToggleEvent("Buttons/Toggle0", function (isOn) {

		levelManager.EnableFlyCamera = true;
		levelManager.ChangeObjLevel(World.current);

		ui_btn.show(false);
		ui_btn.findToggle("Buttons/Toggle0").isOn = false;
	});

	ui_btn.regToggleEvent("Buttons/Toggle1", function (isOn) {

		if (isOn) {
			var obj1 = object.find("Gunja");

			object.find("Compass02").show(false);
			object.find("Compass03").show(false);

			levelManager.EnableFlyCamera = false;
			levelManager.ChangeObjLevel(obj1);
			var objpos = object.find("Center01");
			objpos.setTransparent(0.001);
			objpos.setPosition(Vector3(-35, -20, 0)); //-45,30,-110
			var pos = objpos.transform.TransformPoint(Vector3(300, 500, 460)); //520,450,300
			camera.setPosition(pos); //-178.3,239.8,-268.3
			camera.lookAt(objpos.center);
			levelManager.EnableFlyCamera = true;
		}

	});

	ui_btn.regToggleEvent("Buttons/Toggle2", function (isOn) {
		var obj1 = object.find("B1");

		levelManager.EnableFlyCamera = false;
		levelManager.ChangeObjLevel(obj1);
		var objpos = object.find("Center01");
		objpos.setTransparent(0.001);
		objpos.setPosition(Vector3(-35, -20, 0));
		var pos = objpos.transform.TransformPoint(Vector3(300, 500, 460));
		camera.setPosition(pos); //-178.3,239.8,-268.3
		camera.lookAt(objpos.center);
		levelManager.EnableFlyCamera = true;

	});

	ui_btn.regToggleEvent("Buttons/Toggle3", function (isOn) {
		var obj1 = object.find("B2");

		object.find("Compass02").show(true);
		levelManager.EnableFlyCamera = false;
		levelManager.ChangeObjLevel(obj1);
		var objpos = object.find("Center01");
		objpos.setTransparent(0.001);
		objpos.setPosition(Vector3(-35, -20, 0));
		var pos = objpos.transform.TransformPoint(Vector3(300, 500, 460));
		camera.setPosition(pos); //-178.3,239.8,-268.3
		camera.lookAt(objpos.center);
		levelManager.EnableFlyCamera = true;

	});

	ui_btn.regToggleEvent("Buttons/Toggle4", function (isOn) {
		var obj1 = object.find("B3");

		object.find("Compass03").show(true);
		levelManager.EnableFlyCamera = false;
		levelManager.ChangeObjLevel(obj1);
		var objpos = object.find("Center01");
		objpos.setTransparent(0.001);
		objpos.setPosition(Vector3(-35, -20, 0));
		var pos = objpos.transform.TransformPoint(Vector3(300, 500, 460));
		camera.setPosition(pos); //-178.3,239.8,-268.3
		camera.lookAt(objpos.center);
		levelManager.EnableFlyCamera = true;

	});

	ui_btn.regToggleEvent("Toggle", function (isOn) {

		if (isOn && FloorPlan.current.name != "Gunja") {

			showTable();

		} else {

			concealTable();
		}

	});

	ui_btn.regButtonEvent("Button", function () {

		gui.showPanel("IcoViewPoint", true);

	});

}

//查找地铁口位置
findSubwayPos();
//初始化UI
createTable();
//楼层内显示牌子
isshow();
//行走
workEvent();

//////////////////////////////////////
//// fire and gas alarms
//////////////////////////////////////
var API_URL = "http://192.168.86.24:9006/";
var LISTENING = false;
var objSign = gui.createLabel("<color=red>IDLE</color>", Rect(42, 585, 120, 30));
var F_STAT = "fire_recovery";
var G_STAT = "gas_recovery";
var T_Banner_List = {};
var T_Effect_List = {};

function open_camera_live_feed(objId) {
	var camObj = object.find(objId);
	if (camObj != null) {
		util.setTimeout(function () {
			selector.select(camObj);
		}, 3000);
	}
}
function intoBuilding() {
	var obj1 = object.find("Gunja");

	object.find("Compass02").show(false);
	object.find("Compass03").show(false);

	levelManager.EnableFlyCamera = false;
	levelManager.ChangeObjLevel(obj1);
	var objpos = object.find("Center01");
	objpos.setTransparent(0.001);
	objpos.setPosition(Vector3(-35, -20, 0)); //-45,30,-110
	var pos = objpos.transform.TransformPoint(Vector3(300, 500, 460)); //520,450,300
	camera.setPosition(pos); //-178.3,239.8,-268.3
	camera.lookAt(objpos.center);
	levelManager.EnableFlyCamera = true;

};

function toLevel(levelStr) {
	var obj1 = object.find(levelStr);
	levelManager.EnableFlyCamera = false;
	levelManager.ChangeObjLevel(obj1);
	var objpos = object.find("Center01");
	objpos.setTransparent(0.001);
	objpos.setPosition(Vector3(-35, -20, 0));
	var pos = objpos.transform.TransformPoint(Vector3(300, 500, 460));
	camera.setPosition(pos); //-178.3,239.8,-268.3
	camera.lookAt(objpos.center);
	levelManager.EnableFlyCamera = true;

}
function show_banner_and_effect(obj) {
	if (T_Banner_List[obj.getProperty("name")] == null) {
		util.download({
			"url": API_URL + "outline_button.bundle",
			"success": function (res) {
				var banner_ui = gui.create(res);
				var offsetY = obj.size.y + 0.2;
				banner_ui.setObject(obj, Vector3(0, offsetY, 0));
				var msg = "<size=12>" + obj.getProperty("name") + "</size>";
				banner_ui.setText("Button/Text", msg);
				util.downloadTexture({
					"url": API_URL + "demo_panel_001.png",
					"success": function (text) {
						banner_ui.setImage("Button", text);
					}
				});
				//fly to object while user click the banner
				banner_ui.regButtonEvent("Button", function () {
					fly_to_object(obj);
				});
				T_Banner_List[obj.getProperty("name")] = banner_ui;
			}
		});
		if (current_layer == "outside") {
			intoBuilding();
		}
		util.setTimeout(function () {
			//show real fire
			if (obj.getProperty("source") == "fire") {
				var fireEffectObject = object.create("4483E64D87BA49F8AA9AAA693194A541", obj, Vector3(0, -1, 0));
				T_Effect_List[obj.getProperty("name")] = fireEffectObject;
				toLevel("B1");
				ui_btn.findToggle("Buttons/Toggle2").isOn = true;

			}
			if (obj.getProperty("source") == "gas") {
				var gasEffectObject = object.create("4C818E5DF22C429FA73B47F88DBCD7BA", obj, Vector3(0, -1, 0));
				T_Effect_List[obj.getProperty("name")] = gasEffectObject;
				toLevel("B2");
				ui_btn.findToggle("Buttons/Toggle3").isOn = true;
			}
			open_camera_live_feed(obj.getProperty("CCTV1"));
			open_camera_live_feed(obj.getProperty("CCTV2"));
		}, 500);
	}
}
//fly to object
function fly_to_object(obj) {
	var cam_pos = camera.getEyePos();
	if (Vector3.Distance(cam_pos, obj.center) > 50) {
		camera.flyTo({
			"eye": obj.center + Vector3(0.5, 0.5, 0.5),
			"target": obj.center,
			"time": 1,
			"complete": function () {
				camera.lookAt(obj.center);
			}
		});
	}
}
function on_fire_alarm() {
	var fireObj = object.find("F_B1_01");
	if (fireObj != null) {
		fireObj.addProperty("name", "F_B1_01");
		fireObj.addProperty("CCTV1", "B1_CAM_04");
		fireObj.addProperty("CCTV2", "B1_CAM_15");
		fireObj.addProperty("source", "fire");
	}
	show_banner_and_effect(fireObj);
}
function on_fire_recovery() {
	if (T_Banner_List["F_B1_01"] != null) {
		T_Banner_List["F_B1_01"].destroy();
		table.remove(T_Banner_List, "F_B1_01");
	}
	if (T_Effect_List["F_B1_01"] != null) {
		T_Effect_List["F_B1_01"].destroy();
		table.remove(T_Effect_List, "F_B1_01");
	}
}
function on_gas_alarm() {
	var gasObj = object.find("G_B2_01");
	if (gasObj != null) {
		gasObj.addProperty("name", "G_B2_01");
		gasObj.addProperty("CCTV1", "B2_CAM_03");
		gasObj.addProperty("CCTV2", "B2_CAM_01");
		gasObj.addProperty("source", "gas");
	}
	show_banner_and_effect(gasObj);
}
function on_gas_recovery() {
	if (T_Banner_List["G_B2_01"] != null) {
		T_Banner_List["G_B2_01"].destroy();
		table.remove(T_Banner_List, "G_B2_01");
	}
	if (T_Effect_List["G_B2_01"] != null) {
		T_Effect_List["G_B2_01"].destroy();
		table.remove(T_Effect_List, "G_B2_01");
	}
}
gui.createButton("Listen", Rect(42, 620, 60, 30), function () {
	if (LISTENING == false) {
		gui.destroy(objSign);
		objSign = gui.createLabel("<color=green>LISTENING</color>", Rect(42, 585, 120, 30));
		LISTENING = true;
		util.setInterval(function () {
			if (LISTENING) {
				//polling for fire information
				util.download({
					"url": API_URL + "status",
					"type": "text",
					"success": function (rs) {
						rs = string.trim(rs);
						tmpArray = string.split(rs, "|");
						if (tmpArray[0] != F_STAT) {
							if (tmpArray[0] == "fire_alarm") {
								on_fire_alarm();
							} else {
								on_fire_recovery();
							}
							F_STAT = tmpArray[0];
						}
						if (tmpArray[1] != G_STAT) {
							if (tmpArray[1] == "gas_alarm") {
								on_gas_alarm();
							} else {
								on_gas_recovery();
							}
							G_STAT = tmpArray[1];
						}
					},
					"error": function (t) {
						print(t);
					}
				});
			}
		},
			3000);
	}
});

function destoy_elements(T_Object_List) {
	foreach(var item in vpairs(table.keys(T_Object_List))) {
		if (T_Object_List[item] != null) {
			T_Object_List[item].destroy();
		}
	}
}

gui.createButton("Reset", Rect(120, 620, 60, 30), function () {
	util.clearAllTimers();
	selector.ClearSelection();
	destoy_elements(T_Banner_List);
	destoy_elements(T_Effect_List);
	util.download({
		"url": API_URL + "command/reset",
		"type": "text",
		"success": function (rs) {
			camera.flyTo({
				"eye": Vector3(-80, 80, -50),
				"target": Vector3(3, 4, 5),
				"time": 1,
				"complete": function () {
					LISTENING = false;
					util.setTimeout(function () {
						levelManager.EnableFlyCamera = true;
						levelManager.ChangeObjLevel(World.current);
						ui_btn.show(false);
						ui_btn.findToggle("Buttons/Toggle0").isOn = false;
						LISTENING = false;
						table.clear(T_Banner_List);
						table.clear(T_Effect_List);
						F_STAT = "fire_recovery";
						G_STAT = "gas_recovery";
					}, 1000);
				}
			});
			gui.destroy(objSign);
			objSign = gui.createLabel("<color=red>IDLE</color>", Rect(42, 585, 120, 30));
		},
		"error": function (t) {
			print(t);
		}
	});

});
