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

const type = 'action.devices.types.PRESSURECOOKER'

class PressureCooker extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Countertop multicooker'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new PressureCooker()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Cook',
        'action.devices.traits.StartStop',
        'action.devices.traits.Timer',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Pressure Cooker`],
      name: `Smart Pressure Cooker`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedCookingModes: [
          'PRESSURE_COOK',
        ],
        foodPresets: [{
          food_preset_name: 'roast',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['roast', 'chuck roast'],
            lang: 'en',
          }],
        }, {
          food_preset_name: 'ribs',
          supportedUnits: ['POUNDS', 'OUNCES'],
          foodSynonyms: [{
            synonym: ['ribs', 'rack of ribs'],
            lang: 'en',
          }],
        }],
        maxTimerLimitSec: 1200,
        pausable: true,
        availableToggles: [{
          name: 'chime',
          values: [{
            nameSynonym: ['chime', 'chime signal'],
            lang: 'en',
          }],
        }],
      },
      willReportState: true,
      states: {
        online: true,
        timerRemainingSec: -1,
        timerPaused: false,
        isRunning: false,
        isPaused: false,
        currentCookingMode: 'NONE',
        currentFoodPreset: 'NONE',
        currentFoodQuantity: 0,
        currentFoodUnit: 'NONE',
        currentToggleSettings: {
          chime: false,
        },
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
  identifier: '_addPressureCooker',
  icon: 'editor:vertical-align-center',
  label: 'Pressure Cooker',
  function: (app) => {
    app._createDevice(PressureCooker.createDevice());
  },
})
