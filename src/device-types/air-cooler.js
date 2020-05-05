/**
 * Copyright 2020, Google, Inc.
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

const type = 'action.devices.types.AIRCOOLER'

class AirCooler extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Bedroom Air Cooler'],
      roomHint: 'Bedroom',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new AirCooler()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.FanSpeed',
        'action.devices.traits.HumiditySetting',
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureSetting',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Air Cooler`],
      name: `Smart Air Cooler`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        humiditySetpointRange: {
          minPercent: 0,
          maxPercent: 50,
        },
        availableFanSpeeds: {
          speeds: [{
            speed_name: '0',
            speed_values: [{
              speed_synonym: ['off', '0'],
              lang: 'en',
            }],
          }, {
            speed_name: '1',
            speed_values: [{
              speed_synonym: ['low', '1'],
              lang: 'en',
            }],
          }, {
            speed_name: '2',
            speed_values: [{
              speed_synonym: ['medium', '2'],
              lang: 'en',
            }],
          }, {
            speed_name: '3',
            speed_values: [{
              speed_synonym: ['high', '3'],
              lang: 'en',
            }],
          }],
          ordered: true,
        },
        reversible: true,
        availableToggles: [{
          name: 'rotation',
          name_values: [{
            name_synonym: ['rotation', 'rotate'],
            lang: 'en',
          }],
        }],
        availableThermostatModes: 'off,cool,on,eco,fan-only',
        thermostatTemperatureUnit: 'C',
      },
      willReportState: true,
      states: {
        online: true,
        currentFanSpeedSetting: '0',
        humidityAmbientPercent: 60,
        humditiySetpointPercent: 40,
        on: false,
        currentToggleSettings: {
          rotation: false,
        },
        thermostatMode: 'off',
        thermostatTemperatureSetpoint: 23,
        thermostatTemperatureSetpointHigh: 28,
        thermostatTemperatureSetpointLow: 22,
        thermostatTemperatureAmbient: 25,
        thermostatHumidityAmbient: 60,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addAirCooler',
  icon: 'image:brightness-5',
  label: 'Air Cooler',
  function: (app) => {
    app._createDevice(AirCooler.createDevice());
  },
})
