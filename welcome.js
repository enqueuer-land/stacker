export const welcome = {
    template: `
        <p class="welcome" @click="toggleMsg">Welcome {{ msg }}!</p>
    `,
    data() {
        return {
            msg: 'home'
        }
    },
    methods: {
        toggleMsg() {
            return this.msg = this.msg === 'home' ? 'back' : 'home';
        }
    }
}
