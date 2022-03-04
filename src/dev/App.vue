<template>
  <button @click="toast()" id="create-toast">Create Toast</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { Toast } from '../lib/toast.d';

export default defineComponent({
  name: 'App',
  setup() {
    const toast = inject<Toast>('$toast');

    if (toast) {
      toast('provide - text only');
      toast('provide - with options', {
        positionX: 'left',
        positionY: 'top',
        class: 'class',
      });
      toast('provide - extra class', { class: ['class', 'extra'] });
    }
  },
  methods: {
    toast(): void {
      // Error
      this.$toast('', {
        disableClick: true,
        positionY: 'bottom',
      });
      this.$toast('y', {
        disableClick: true,
        positionY: 'top',
        class: ['this', 'another'],
      });
      setTimeout(() => {
        this.$toast('text only');
      }, 1000);
      setTimeout(() => {
        this.$toast('text with options', {
          positionY: 'bottom',
          positionX: 'right',
          disableClick: true,
          duration: 3000,
        });
      }, 2000);
      setTimeout(() => {
        this.$toast('long text long text long text long text long text long text', {
          positionY: 'bottom',
          positionX: 'left',
        });
      }, 3000);
      setTimeout(() => {
        this.$toast('text + right icon (deprecated)', {
          slot: '<i class="fa fa-thumbs-up"></i>',
          positionY: 'top',
          positionX: 'right',
          styles: { color: 'blue' },
        });
      }, 4000);
      setTimeout(() => {
        this.$toast('text + left icon ', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          positionY: 'top',
          positionX: 'center',
          duration: false,
        });
      }, 5000);
      setTimeout(() => {
        this.$toast('text + right + left icon', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<i class="fa fa-thumbs-up"></i>',
        });
      }, 6000);
      setTimeout(() => {
        this.$toast('', {
          slotRight: '<i class="fa fa-thumbs-up"></i>',
        });
      }, 7000);
      setTimeout(() => {
        this.$toast('', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
        });
      }, 8000);
      setTimeout(() => {
        this.$toast('', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<i class="fa fa-thumbs-up"></i>',
        });
      }, 9000);
      setTimeout(() => {
        this.$toast('', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<span class="material-icons">thumb_up</span>',
        });
      }, 10000);
      setTimeout(() => {
        this.$toast('mixed icons', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<span class="material-icons">thumb_up</span>',
        });
      }, 11000);
      setTimeout(() => {
        this.$toast('ERROR: SOMETHING HAPPENED', {
          slotLeft: '<i class="fa fa-exclamation"></i>',
          slotRight: '<i class="fa fa-exclamation"></i>',
          type: 'error',
          styles: { color: '#fff' },
        });
      }, 12000);
      setTimeout(() => {
        this.$toast('SUCCESS: SOMETHING HAPPENED', {
          slotLeft: '<i class="fa fa-exclamation"></i>',
          slotRight: '<i class="fa fa-exclamation"></i>',
          type: 'success',
        });
      }, 13000);
      setTimeout(() => {
        this.$toast('PASSIVE: SOMETHING HAPPENED', {
          slotLeft: '<i class="fa fa-exclamation"></i>',
          slotRight: '<i class="fa fa-exclamation"></i>',
          type: 'passive',
          class: 'toast',
        });
      }, 14000);
    },
  },
});
</script>

<style>
body {
  background-color: #7b6df5;
}
body .toast {
  color: purple;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  height: 1000vh;
}
button {
  cursor: pointer;
  font: 18px Avenir, Helvetica, Arial, sans-serif;
}
#create-toast {
  margin-bottom: 40px;
  width: 100%;
  max-width: 250px;
  font-size: 20px;
}
</style>
