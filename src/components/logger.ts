import store from '@/store';

export class Logger {
    public static info(message: string) {
        store.commit('stage/addLog', {message, level: 'INFO'});
    }

    public static error(message: string) {
        store.commit('stage/addLog', {message, level: 'ERROR'});
    }
}
