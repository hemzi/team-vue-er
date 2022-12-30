<template>
  <div><input type="text" v-model="searchTerm" />{{ searchTerm }}</div>
  <div>
    <span class="pill online" @click="updateFilter('online')">Online</span>
    <span class="pill offline" @click="updateFilter('offline')"
      >Offline &lsaquo;3 Months</span
    >
    <span class="pill extended" @click="updateFilter('extended')"
      >Offline &rsaquo;3 Months</span
    >
    <span class="pill unknown" @click="updateFilter('unknown')">Offline Unknown</span>
    {{ filterType }}
  </div>
  <ul>
    <li v-for="device in searchedDevices" :key="device.device_id">
      <!-- this logic needs to be cleaned up -->
      <!-- ONLINE -->
      <div class="device_item online" v-if="device.online_state === 'Online'">
        <span>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-sharp fa-solid fa-hammer" al @click="fixName"></i>
          {{ device.alias }}
        </span>
      </div>
      <!-- OFFLINE -->
      <div
        class="device_item offline"
        v-if="device.last_seen && !offlineExceeded(device.last_seen)"
      >
        <span>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-sharp fa-solid fa-hammer" @click="fixName"></i>
          {{ device.alias }}
        </span>
      </div>
      <!-- EXTENDED OFFLINE -->
      <div class="device_item extended" v-if="offlineExceeded(device.last_seen)">
        <span>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-sharp fa-solid fa-hammer" @click="fixName"></i>
          {{ device.alias }} </span
        ><span>
          [{{ formatDate(device.last_seen) }}]
          <i class="fa-solid fa-trash"></i>
        </span>
      </div>
      <!-- UNKNOWN -->
      <div
        class="device_item unknown"
        v-if="device.online_state === 'Offline' && !device.last_seen"
      >
        <span>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-sharp fa-solid fa-hammer" @click="fixName"></i>
          {{ device.alias }}
        </span>
        <i class="fa-solid fa-trash"></i>
      </div>
    </li>
  </ul>
</template>

<script>
// composables
import formatDate from "../composables/formatDate";
import getDevices from "../composables/getDevices";
import { computed, ref } from "vue";

export default {
  setup() {
    const { devices, error, load } = getDevices();

    const searchTerm = ref("");
    const filterType = ref("all");
    const updateFilter = (type) => {
      filterType.value = type;
      console.log(type);
    };
    const filteredDevices = (ftype) => {
      switch (ftype) {
        case "all":
          return devices.value;
          break;
        case "online":
          return devices.value.filter((device) => device.online_state === "Online");
          break;
        case "offline":
          return devices.value.filter(
            (device) =>
              device.online_state === "Offline" &&
              device.last_seen &&
              !offlineExceeded(device.last_seen)
          );
          break;
        case "extended":
          return devices.value.filter(
            (device) =>
              device.online_state === "Offline" && offlineExceeded(device.last_seen)
          );
          break;
        case "unknown":
          return devices.value.filter(
            (device) => device.online_state === "Offline" && !device.last_seen
          );
          break;
      }
    };
    const searchedDevices = computed(() => {
      return filteredDevices(filterType.value).filter((device) =>
        device.alias.toLowerCase().match(searchTerm.value.toLowerCase())
      );
    });

    function offlineExceeded(dateString) {
      const offlineDate = new Date(dateString);
      const now = Date.now();
      const diff = (now - offlineDate) / (1000 * 60 * 60 * 24);
      return diff > 120;
    }

    function fixname() {}
    load();
    return {
      devices,
      error,
      formatDate,
      offlineExceeded,
      searchTerm,
      searchedDevices,
      filterType,
      updateFilter,
      filteredDevices,
    };
  },
};
</script>

<style>
.device_item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  color: white;
  max-width: 500px;
}

.device_item:hover {
  opacity: 0.8;
}

.online {
  background: #0faf87;
}

.offline {
  background: darkgrey;
}

.extended {
  background: crimson;
}

.unknown {
  background: #ff6600;
}
</style>
