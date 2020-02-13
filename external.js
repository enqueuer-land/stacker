export const html = `<div>  <b-button>B-Button</b-button><i class="fas fa-check-circle"></i><input @change="(event) => $parent.huehue({url:event.target.value})" type="text" placeholder="type"></div>`
export const js = {oi: 'oi'};
export const sum = (a, b) => a + b;
export const component = {
    template: `<div><p>Props {{ value }}!</p></div>`,
    props: ['value'],
};
export const template = `<div><p>Widget1 {{ msg }}!</p></div>`;
export const data = () => {
    return {
        msg: "home"
    };
};

