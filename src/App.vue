<template>
    <button @click="toast()" id="create-toast">Create Toast</button>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            duration: 1000,
            text: '',
            slot: '',
        };
    },

    methods: {
        toast() {
            this.$toast('hello', {
                duration: 1000,
                styles: {},
                slot: '',
            });
        },
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
