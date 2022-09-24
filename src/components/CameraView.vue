<template>
  <div>
    <video autoplay id="videoPlayer" ref="videoPlayer" v-show="loaded" class="h-full rounded"></video>
    <div v-show="!loaded">
      <p>Please allow the use of your camera</p>
      <Spinner></Spinner>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import Spinner from "./Spinner.vue";


const videoPlayer = ref<HTMLVideoElement>();
const loaded = ref(false);


let device: MediaStream | null = null;

onMounted(async () => {
  device = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });

  videoPlayer.value!.srcObject = device;

  await new Promise(r => setTimeout(r, 500));
  loaded.value = true;
});

onBeforeUnmount(() => {
  device?.getTracks().forEach(t => t.stop());
  loaded.value = false;
});

</script>

<style scoped>

</style>
