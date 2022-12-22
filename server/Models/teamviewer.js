// * not really a model, it's serving as a local cache for TV data to mitigate api calls

let TeamViewer = {
  devices: [],
  base_url: "http://webapi.teamviewer.com/api/v1",
  api_key: "",
  async getDevices() {
    try {
      let response = await fetch(`${this.base_url}/devices`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.api_key}`,
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      if (response.status == 200 && response.ok) {
        this.devices = json.devices;
      } else {
        throw json;
      }
    } catch (err) {
      console.log(err);
    }
  },

  async updateDevice(deviceDetails) {
    const { alias, device_id } = deviceDetails;
    try {
      let response = await fetch(`${this.base_url}/devices/${device_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.api_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alias }),
      });
      // ! THERE HAS TO BE A BETTER WAY TO RESPOND (pass api's response back?)
      if (response.status == 204 && response.ok) {
        return true;
      } else {
        throw json;
      }
    } catch (err) {
      console.log(err);
    }
  },

  async removeDevice(deviceDetails) {
    const { device_id } = deviceDetails;
    try {
      let response = await fetch(`${this.base_url}/devices/${device_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.api_key}`,
          "Content-Type": "application/json",
        },
      });
      // ! THERE HAS TO BE A BETTER WAY TO RESPOND (pass api's response back?)
      if (response.status == 204 && response.ok) {
        console.log(this.devices.length);
        //
        // TODO: filter below doesnt seem to be working
        //
        this.devices.filter((device) => {
          device.device_id !== device_id;
        });
        console.log(this.devices.length);
        return true;
      } else {
        throw json;
      }
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = TeamViewer;
