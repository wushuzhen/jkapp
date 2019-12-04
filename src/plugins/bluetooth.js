"use strict";

import Vue from "vue";
import store from "../store";
import { _ } from "core-js";
import { promised } from "q";

var sportdevice = {
  serviceUUID: "326a9000-85cb-9195-d9dd-464cfbbae75a",
  txCharacteristic: "326a9001-85cb-9195-d9dd-464cfbbae75a", // transmit is from the phone's perspective
  rxCharacteristic: "326a9006-85cb-9195-d9dd-464cfbbae75a" // receive is from the phone's perspective
};

/* global ble */
//封装管理蓝牙接口，只能同时操作一个蓝牙设备，切换设备使用reset
//eventType:
//onScanComplete 参数 deviceList
//onConnect      参数 device
//onDisconnect   参数 device
var _bluetooth = {
  curDevice: null,
  deviceList: [],

  eventListeners: {},

  addEventListener(eventType, fn) {
    if (!this.eventListeners[eventType]) {
      this.eventListeners[eventType] = [];
    }
    this.eventListeners[eventType].push(fn);
  },

  fireEvent(eventType, ...args) {
    let listeners = this.eventListeners[eventType];
    if (listeners) {
      listeners.forEach(listener => {
        listener(...args);
      });
    }
  },

  //复位，如果有连接则断开连接
  reset: function() {
    let p = new Promise(function(resolve, reject) {
      if (this.curDevice) {
        let success = function() {
          this.curDevice = null;
          resolve();
        };
        let failure = function() {
          this.curDevice = null;
          resolve();
        };
        ble.disconnect(this.curDevice.id, success, failure);
      } else {
        resolve();
      }
    });
    return p;
  },

  scan: function() {
    if (!store.state.deviceready) {
      Vue.prototype.$toast("设备没有准备好");
      this.status("bluetooth: device is not ready!");
      return;
    }

    this.status("bluetooth: Scanning for Bluetooth Device");

    /*
    this.reset()
      .then(
        function() {
          function onScan(device) {
            // this is demo code, assume there is only one heart rate monitor
            this.status("bluetooth: Found " + JSON.stringify(device));
            this.deviceList.push(device);
          }

          function scanFailure(reason) {
            this.status("bluetooth: BLE Scan Failed");
          }

          ble.scan([], 5, onScan.bind(this), scanFailure.bind(this));
          setTimeout(this.onScanTimeout.bind(this), 5000);
        }.bind(this)
      )
      .catch(function() {});
    */

    function onScan(device) {
      // this is demo code, assume there is only one heart rate monitor
      this.status("bluetooth: Found " + JSON.stringify(device));
      this.deviceList.push(device);
    }

    function scanFailure(reason) {
      this.status("bluetooth: BLE Scan Failed");
    }

    ble.scan([], 5, onScan.bind(this), scanFailure.bind(this));
    setTimeout(this.onScanTimeout.bind(this), 5000);
  },

  onScanTimeout: function() {
    this.status("bluetooth: onScanTimeout");
    console.log(JSON.stringify(this.deviceList));
    this.fireEvent("onScanComplete", this.deviceList);
  },

  connect: function(device) {
    if (this.curDevice == null) {
      this.curDevice = device;
      ble.connect(
        device.id,
        this.onConnect.bind(this),
        this.onDisconnect.bind(this)
      );
    }
  },

  onConnect: function(device) {
    this.status("bluetooth: Connected to " + device.id);
    /*
    startNotification error:
    12-03 19:42:39.356  3225  3372 D Peripheral: Register Notify 326a9001-85cb-9195-d9dd-464cfbbae75a
    12-03 19:42:39.360  3225  3372 E PluginManager: Uncaught exception from plugin
    12-03 19:42:39.360  3225  3372 E PluginManager: java.lang.NullPointerException: Attempt to invoke virtual method 'java.util.List android.bluetooth.BluetoothGattService.getCharacteristics()' on a null object reference
    12-03 19:42:39.360  3225  3372 E PluginManager:         at com.megster.cordova.ble.central.Peripheral.findNotifyCharacteristic(Peripheral.java:571)
    12-03 19:42:39.360  3225  3372 E PluginManager:         at com.megster.cordova.ble.central.Peripheral.registerNotifyCallback(Peripheral.java:484)
    ble.startNotification(
      device.id,
      sportdevice.serviceUUID,
      sportdevice.txCharacteristic,
      this.onData,
      this.onError
    );
    this.fireEvent("onConnect", device);
    */
  },

  onDisconnect: function(reason) {
    console.log("bluetooth: Disconnected " + reason);
    this.status("bluetooth: Disconnected ") + this.curDevice
      ? this.curDevice.id
      : "";
    this.fireEvent("onDisconnect", this.curDevice);
    this.curDevice = null;
  },

  onData: function(buffer) {
    var data = new Uint8Array(buffer);
    console.log("bluetooth: onData " + data);
  },

  writeData: function(buffer, success, failure) {
    if (!success) {
      success = function() {
        console.log("bluetooth: writeData success");
      };
    }

    if (!failure) {
      failure = this.onError;
    }

    ble.writeCommand(
      this.deviceId,
      sportdevice.serviceUUID,
      sportdevice.txCharacteristic,
      buffer,
      success,
      failure
    );
  },

  onError: function(reason) {
    console.log("bluetooth: There was an error " + reason);
  },

  status: function(message) {
    console.log(message);
  }
};

let bluetooth = {};
bluetooth.install = function(Vue, options) {
  Vue.bluetooth = _bluetooth;
  window.bluetooth = _bluetooth;
  Object.defineProperties(Vue.prototype, {
    bluetooth: {
      get() {
        return _bluetooth;
      }
    },
    $bluetooth: {
      get() {
        return _bluetooth;
      }
    }
  });
};

Vue.use(bluetooth);

export default bluetooth;
