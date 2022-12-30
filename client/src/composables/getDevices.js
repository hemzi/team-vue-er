import { ref } from "vue";

const getDevices = () => {
  const devices = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/devices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw Error("There is no data.");
      }
      const json = await res.json();
      console.log(json);

      devices.value = await json;
    } catch (err) {
      error.value = err.message;
      console.error(error.value);
    }
  };

  return { devices, error, load };
};

export default getDevices;
