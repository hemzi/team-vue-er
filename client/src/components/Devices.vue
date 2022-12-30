<template>
  <ul>
    <!-- <li
      v-for="device in devices"
      :key="device.device_id"
    > {{ device.alias }} - {{ device.online_state }} <span v-if="device.last_seen">{{ formatDate(device.last_seen) }}</span>
    </li> -->
    <li
      v-for="device in devices"
      :key="device.device_id"
    >
      <div
        class="device_item online"
        v-if="device.online_state === 'Online'"
      >{{ device.alias }}</div>
      <div
        class="device_item unknown"
        v-if="device.online_state === 'Offline' && !device.last_seen"
      >{{ device.alias }}</div>
      <div
        class="device_item offline"
        v-if="device.last_seen"
      >{{ device.alias }}</div>
      <div
        class="device_item extended"
        v-if="offlineExceeded( device.last_seen)"
      >{{ device.alias }} [{{ formatDate(device.last_seen) }}]</div>
    </li>
  </ul>
</template>

<script>
// composables
import formatDate from "../composables/formatDate";
import getDevices from "../composables/getDevices";

export default {
  setup() {
    const { devices, error, load } = getDevices();
    function offlineExceeded(dateString) {
      const offlineDate = new Date(dateString);
      const now = Date.now();
      const diff = (now - offlineDate) / (1000 * 60 * 60 * 24);
      // const diff = (now - offlineDate) / (1000 * 60 * 60 * 24);
      return diff > 120;
    }

    load();
    return { devices, error, formatDate, offlineExceeded };
  },
};
</script>

<style>
.device_item {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  color: white;
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