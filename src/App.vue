<template>
  <button @click="toast()" id="create-toast">Create Toast</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
// eslint-disable-next-line
import type { Toast } from './lib/toast.d';

export default defineComponent({
  name: 'App',
  setup() {
    const toast = inject<Toast>('$toast');

    if (toast) toast('provide', { positionX: 'left', positionY: 'top' });
  },
  methods: {
    toast(): void {
      // Error
      this.$toast('f', {
        disableClick: true,
        positionY: 'bottom'
      });
      this.$toast('y', {
        disableClick: true,
        positionY: 'top'
      });
      setTimeout(() => {
        this.$toast('text only');
      }, 1000);
      setTimeout(() => {
        this.$toast('text with options', {
          positionY: 'bottom',
          positionX: 'right',
          disableClick: true
        });
      }, 2000);
      setTimeout(() => {
        this.$toast('long text long text long text long text long text long text', {
          positionY: 'bottom',
          positionX: 'left'
        });
      }, 3000);
      setTimeout(() => {
        this.$toast('text + right icon (deprecated)', {
          slot: '<i class="fa fa-thumbs-up"></i>',
          positionY: 'top',
          positionX: 'right',
          styles: { color: 'blue' }
        });
      }, 4000);
      setTimeout(() => {
        this.$toast('text + left icon ', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          positionY: 'top',
          positionX: 'center',
          duration: false
        });
      }, 5000);
      setTimeout(() => {
        this.$toast('text + right + left icon', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<i class="fa fa-thumbs-up"></i>'
        });
      }, 6000);
      setTimeout(() => {
        this.$toast('', {
          slotRight: '<i class="fa fa-thumbs-up"></i>'
        });
      }, 7000);
      setTimeout(() => {
        this.$toast('', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>'
        });
      }, 8000);
      setTimeout(() => {
        this.$toast('', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<i class="fa fa-thumbs-up"></i>'
        });
      }, 9000);
      setTimeout(() => {
        this.$toast('', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<span class="material-icons">thumb_up</span>'
        });
      }, 10000);
      setTimeout(() => {
        this.$toast('mixed icons', {
          slotLeft: '<i class="fa fa-thumbs-up"></i>',
          slotRight: '<span class="material-icons">thumb_up</span>'
        });
      }, 11000);
      setTimeout(() => {
        this.$toast('ERROR: SOMETHING HAPPENED', {
          slotLeft: '<i class="fa fa-exclamation"></i>',
          slotRight: '<i class="fa fa-exclamation"></i>',
          type: 'error'
        });
      }, 12000);
      setTimeout(() => {
        this.$toast('SUCCESS: SOMETHING HAPPENED', {
          slotLeft: '<i class="fa fa-exclamation"></i>',
          slotRight: '<i class="fa fa-exclamation"></i>',
          type: 'success'
        });
      }, 13000);
      setTimeout(() => {
        this.$toast('PASSIVE: SOMETHING HAPPENED', {
          slotLeft: '<i class="fa fa-exclamation"></i>',
          slotRight: '<i class="fa fa-exclamation"></i>',
          type: 'passive',
          class: 'test'
        });
      }, 14000);
    }
  }
});
</script>

<style>
.toast {
  color: purple;
}

body {
  background-color: #7b6df5;
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
input,
textarea {
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 2px;
}
button,
[type='submit'] {
  cursor: pointer;
}
input,
button {
  font: 18px Avenir, Helvetica, Arial, sans-serif;
}
.property {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid;
  border-radius: 5px;
  box-shadow: 0 1px 5px -3px rgba(0, 0, 0, 0.8);
}
label {
  width: 100%;
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
#code-preview {
  position: fixed;
  text-align: left;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  max-width: calc((100vw - 600px) / 2);
  text-overflow: ellipsis;
  overflow: hidden;
}
#code-preview pre {
  margin: 0;
}
#code-preview pre:nth-of-type(2) {
  margin-top: -26px;
}
#preview-styles {
  display: inline-flex;
  flex-direction: column;
}
#preview-slot {
  white-space: pre-line;
  max-width: 180px;
  padding-left: 92px;
}
#duration-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
#duration-slider input {
  cursor: pointer;
  flex: 1;
}
small {
  margin-top: 10px;
}
small pre {
  cursor: pointer;
  margin: 10px auto;
  width: 340px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
small pre:hover {
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
}
#styles [type='submit'] {
  margin: 10px auto;
  width: 150px;
}
#code-styles {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.code-style {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: left;
  width: 50%;
  padding: 2px;
}
.code-style code {
  width: 100%;
}
.code-style i {
  cursor: pointer;
  position: absolute;
  right: 0;
  font-size: 14px;
}
#create-toast {
  margin-bottom: 40px;
  width: 100%;
  max-width: 250px;
  font-size: 20px;
}
.invalid {
  border: 1px solid #ff0000;
}
.valid {
  border: 1px solid #90ee90;
}
</style>
