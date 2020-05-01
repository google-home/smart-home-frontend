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

/**
 * Transforms a smart home device to fit in the sample database
 *
 * @param {object} json Smart home device payload
 * @return {object} Data model for device to put into Firestore
 */
function generateDeviceModel(json) {
  return {
    id: json.id,
    type: json.type,
    traits: json.traits,
    attributes: json.attributes,
    defaultNames: json.name.defaultNames,
    name: json.name.name,
    nicknames: json.name.nicknames,
    roomHint: json.roomHint,
    willReportState: json.willReportState || false,
    states: {
      online: true,
    },
    hwVersion: json.deviceInfo ? json.deviceInfo.hwVersion : undefined,
    swVersion: json.deviceInfo ? json.deviceInfo.swVersion : undefined,
    model: json.deviceInfo ? json.deviceInfo.model : undefined,
    manufacturer: json.deviceInfo ? json.deviceInfo.manufacturer : undefined,
    customData: json.customData,
  }
}

window.deviceTypes.push({
  identifier: '_addJson',
  icon: 'icons:settings-ethernet',
  label: 'Import JSON',
  function: (app) => {
    // Open new dialog
    app.$['insert-json'].open()
    app.$['insert-json-message'].innerText = ''
    app.$['insert-json-import'].onclick = () => {
      // Get pasted JSON
      const text = app.$['insert-json-textarea'].value
      app.$['insert-json-message'].innerText = ''

      // Make a few data adjustments before DB insertion
      try {
        const json = JSON.parse(text)
        if ('requestId' in json) {
          // Importing a full SYNC payload rather than just one device
          const deviceList = json.payload.devices
          for (const device of deviceList) {
            app._createDevice(generateDeviceModel(device));
          }
        } else {
          // Just importing a single device
          app._createDevice(generateDeviceModel(json));
        }
        app.$['insert-json'].close()
      } catch (e) {
        app.$['insert-json-message'].innerText = 'Error creating device: ' + e
      }
    }
  },
})
