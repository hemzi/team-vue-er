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
    console.log(alias, device_id);
    try {
      let response = await fetch(`${this.base_url}/devices/${device_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.api_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alias }),
      });
      // let json = await response.json();
      if (response.status == 204 && response.ok) {
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
