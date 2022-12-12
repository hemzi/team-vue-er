const app = Vue.createApp({
  data() {
    return {
      devices: [],
      deviceCount: 0,
    };
  },
  methods: {
    async getDevices(filterType) {
      const res = await fetch("https://webapi.teamviewer.com/api/v1/devices", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      // format last_seen date
      json.devices.map((device) => {
        if (device.last_seen !== undefined) {
          device.last_seen = new Date(
            Date.parse(device.last_seen)
          ).toLocaleDateString("en-US");
        }
      });

      if (filterType === undefined) {
        console.log("HAM");
        return (this.devices = await json.devices);
      }

      // all offline devices
      if (filterType == "offline") {
        const filtered = await json.devices.filter(
          (device) => device.online_state === "Offline"
        );

        // return (this.devices = filtered);
        return (this.devices = filtered), (this.deviceCount = filtered.length);
      }
      // filter for devices that have been offline for extended time.
      if (filterType == "extended") {
        const filtered = await json.devices.filter(
          (device) =>
            device.online_state === "Offline" && device.last_seen === undefined
        );

        return (this.devices = filtered), (this.deviceCount = filtered.length);
      }
    },
    async removeDevice(id) {
      const res = await fetch(
        `https://webapi.teamviewer.com/api/v1/devices/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 204) {
        this.devices = this.devices.filter((device) => device.device_id !== id);
        console.log(`REMOVEd DEVICE WITH ID: ${id}`);
      }
    },
    async fixName(id, alias) {
      let newName = alias;
      console.log(alias);
      // prune FCC- prefix
      newName = newName.replace("FCC-", "");
      // prune building prefix
      newName = newName.replace(/([A-Z,a-z][0-9]*)+\-/, "");
      // format ###### first last -> ###### (first fast)
      if (newName.match(/^\d{1,6} (\w*) (\w*)$/)) {
        newName = newName.replace(/^(\d{1,6}) (\w*) (\w*)$/, "$1 ($2 $3)");
      }

      console.log(newName);

      const res = await fetch(
        `https://webapi.teamviewer.com/api/v1/devices/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ alias: newName }),
        }
      );
      // update interface if success
      if (res.status === 204) {
        const index = this.devices.findIndex((device) => {
          return device.device_id === id;
        });

        console.log(index);
        if (index !== -1) {
          this.devices[index].alias = newName;
        }
      }
    },
  },
  mounted() {
    this.getDevices();
  },
});

app.mount("#app");
