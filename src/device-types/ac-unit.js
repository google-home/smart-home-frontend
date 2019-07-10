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

class AcUnit extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['ac unit'],
      roomHint: 'Living Room'
    }, {
      nicknames: ['temperature control system'],
      roomHint: 'Master Bedroom'
    }, {
      nicknames: ['hvac'],
      roomHint: 'Basement'
    }]
  }

  static createDevice() {
    if (!instance) {
      instance = new AcUnit()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.AC_UNIT',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Modes',
        'action.devices.traits.TemperatureSetting',
      ],
      defaultNames: [`Smart AC Unit`],
      name: `Smart AC Unit`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableThermostatModes: 'off,cool',
        temperatureTemperatureUnit: 'C',
        availableModes: [{
          name: 'mode',
          name_values: [{
            name_synonym: ['mode'],
            lang: 'en'
          }],
          settings: [{
            setting_name: 'auto',
            setting_values: [{
              setting_synonym: ['auto'],
              lang: 'en'
            }]
          }, {
            setting_name: 'manual',
            setting_values: [{
              setting_synonym: ['manual'],
              lang: 'en'
            }]
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        thermostatTemperatureSetpoint: 20,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addAcUnit',
  icon: 'places:ac-unit',
  label: 'AC Unit',
  function: (app) => { app._createDevice(AcUnit.createDevice()); }
})
