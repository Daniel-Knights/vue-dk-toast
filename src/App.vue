<template>
    <h1>vue-dk-toast</h1>
    <button @click="toast()">Create Toast</button>
    <div id="duration">
        <label>Duration:</label>
        <input type="range" min="1000" max="10000" step="100" v-model.number="duration" />
        {{ duration }}
    </div>
    <div id="text">
        <label>Text:</label>
        <input type="text" v-model="text" />
    </div>
    <div id="icon">
        <label>Slot:</label>
        <textarea v-model="slot" />
        <small
            >Any valid HTML can go here. Fontawesome and Material Icons are loaded into this demo,
            give it a try:
            <pre @click="copyIcon(0)">&lt;i class="fa fa-thumbs-up"&gt;&lt;/i&gt;</pre>
            <pre @click="copyIcon(1)">&lt;span class="material-icons">thumb_up&lt;/span></pre>
        </small>
    </div>
</template>

<script>
import DKToast from './toast';
import app from './main';

export default {
    name: 'App',

    data() {
        return {
            duration: 1000,
            positionX: 'right',
            positionY: 'bottom',
            styles: '',
            text: '',
            slot: '',
        };
    },

    methods: {
        toast() {
            this.$toast(this.text, {
                duration: this.duration,
                styles: {
                    borderRadius: '25px',
                },
                slot: this.slot,
            });
            this.$toast('test');
        },
        copyIcon(library) {
            this.slot =
                library === 0
                    ? '<i class="fa fa-thumbs-up"></i>'
                    : '<span class="material-icons">thumb_up</span>';
        },
    },

    created() {
        app.use(DKToast, {
            duration: 2000,
            positionX: this.positionX,
            positionY: this.positionY,
            styles: {
                borderRadius: '5px',
            },
        });
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
