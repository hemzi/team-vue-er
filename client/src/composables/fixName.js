import { ref } from "vue";
const fixName = async (id, alias, devices) => {
  let newName = ref(alias);
  // prune FCC- prefix
  newName.value = newName.value.replace("FCC-", "");
  // prune building prefix
  newName.value = newName.value.replace(/([A-Z,a-z][0-9]*)+\-/, "");
  // format ###### first last -> ###### (first fast)
  if (newName.match(/^\d{1,6} (\w*) (\w*)$/)) {
    newName.value = newName.value.replace(
      /^(\d{1,6}) (\w*) (\w*)$/,
      "$1 ($2 $3)"
    );
  }

  const res = await fetch(`http://localhost:3000/api/v1/devices/${id}`, {
    method: "PUT",
    headers: {
      // Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ alias: newName.value }),
  });
  // update interface if success
  if (res.status === 204) {
    const index = this.devices.findIndex((device) => {
      return device.device_id === id;
    });

    console.log(index);
    if (index !== -1) {
      this.devices[index].alias = newName.value;
    }
  }

  return { newName };
};
