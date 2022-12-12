const TOKEN = document.querySelector("input#token").value;

const app = Vue.createApp({
  data() {
    return {
      devices: [],
      deviceCount: 0,
    };
  },
  methods: {
    async getDevices() {
      const res = await fetch("https://webapi.teamviewer.com/api/v1/devices", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      // filter for devices that have been offline for extended time.
      const filtered = await json.devices.filter(
        (device) =>
          device.online_state === "Offline" && device.last_seen === undefined
      );

      this.devices = filtered;
      this.deviceCount = filtered.length;
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
  },
  // mounted() {
  //   this.getDevices();
  // },
});

app.mount("#app");
