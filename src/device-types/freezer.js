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

const type = 'action.devices.types.FREEZER'

class Freezer extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Kitchen Freezer'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Freezer()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Modes',
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Freezer`],
      name: `Smart Freezer`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'powerfreeze',
          name_values: [{
            name_synonym: ['power freeze', 'power'],
            lang: 'en',
          }],
        }],
        availableModes: [{
          name: 'currentmode',
          name_values: [{
            name_synonym: ['current mode', 'current', 'mode'],
            lang: 'en',
          }],
          settings: [{
            setting_name: 'freeze',
            setting_values: [{
              setting_synonym: ['Freeze'],
              lang: 'en',
            }],
          }, {
            setting_name: 'cool',
            setting_values: [{
              setting_synonym: ['Cool'],
              lang: 'en',
            }],
          }, {
            setting_name: 'wine',
            setting_values: [{
              setting_synonym: ['Wine'],
              lang: 'en',
            }],
          }, {
            setting_name: 'sabbath',
            setting_values: [{
              setting_synonym: ['Sabbath'],
              lang: 'en',
            }],
          }],
          ordered: false,
        }],
        queryOnlyTemperatureControl: true,
        temperatureUnitForUX: 'C',
      },
      willReportState: true,
      states: {
        online: true,
        currentToggleSettings: {
          powerfreeze: false,
        },
        currentModeSettings: {
          currentmode: 'freeze',
        },
        on: false,
        temperatureSetpointCelsius: -5,
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
  identifier: '_addFreezer',
  icon: 'icons:check-box-outline-blank',
  label: 'Freezer',
  function: (app) => {
    app._createDevice(Freezer.createDevice());
  },
})
