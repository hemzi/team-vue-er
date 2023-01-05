import { ref } from "vue";
const fixName = async (device) => {
  console.log("ping");
  const { id, alias, devices } = device;
  const error = null;
  let newName = alias;
  // prune FCC- prefix
  newName.value = newName.replace("FCC-", "");
  // prune building prefix
  newName = newName.replace(/([A-Z,a-z][0-9]*)+\-/, "");
  // format ###### first last -> ###### (first fast)
  if (newName.match(/^\d{1,6} (\w*) (\w*)$/)) {
    newName = newName.replace(/^(\d{1,6}) (\w*) (\w*)$/, "$1 ($2 $3)");
  }
  try {
    const res = await fetch(`http://localhost:3000/api/v1/devices/${id}`, {
      method: "PUT",
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias: newName }),
    });
    // update interface if success
    // * may need to changes this to check for http 204
    if (!res.ok) {
      throw Error("there was error while fixing name");
    }

    const index = devices.value.findIndex((device) => {
      return device.device_id === id;
    });

    if (index !== -1) {
      devices.value[index].alias = newName;
    }
  } catch (err) {
    error = err.message;
  }

  return { newName, error, devices };
};

export default fixName;
