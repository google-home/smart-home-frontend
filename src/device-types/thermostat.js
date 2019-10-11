/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DeviceType } from './device-type';

let instance;

class Thermostat extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['wall thermostat'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['upstairs thermostat'],
      roomHint: 'hallway'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Thermostat()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.THERMOSTAT',
      traits: [
        'action.devices.traits.TemperatureSetting',
      ],
      defaultNames: [`Smart Thermostat`],
      name: `Smart Thermostat`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableThermostatModes: 'off,heat,cool,on,heatcool',
        thermostatTemperatureUnit: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        thermostatMode: 'off',
        thermostatTemperatureSetpoint: 23,
        thermostatTemperatureSetpointHigh: 28,
        thermostatTemperatureSetpointLow: 22,
        thermostatTemperatureAmbient: 25.1,
        thermostatHumidityAmbient: 45.3
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addThermostat',
  icon: 'image:brightness-7',
  label: 'Thermostat',
  function: (app) => { app._createDevice(Thermostat.createDevice()); }
})
