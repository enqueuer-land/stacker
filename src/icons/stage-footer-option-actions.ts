//TODO test it
const stageFooterOptionIcons = (stageFooterOptions: any) => [
    {
        name: 'Decrease log level filter',
        iconClass: 'fas fa-minus',
        action: () => {
            stageFooterOptions.decreaseLogFilterLevel();
        }
    },
    {
        name: 'Increase log level filter',
        iconClass: 'fas fa-plus',
        action: () => {
            stageFooterOptions.increaseLogFilterLevel();
        }
    },
    {
        divider: true
    },
    {
        name: 'Expand log window',
        iconClass: 'fas fa-expand',
        action: () => {
            stageFooterOptions.$emit('expandWindow');
        }
    },
    {
        name: 'Collapse log window',
        iconClass: 'fas fa-compress',
        action: () => {
            stageFooterOptions.$emit('compressWindow');
        }
    },
    {
        divider: true
    },
    {
        name: 'Clear logs',
        iconClass: 'fas fa-ban',
        action: () => {
            stageFooterOptions.clearLogs();
        }
    },
];

export default stageFooterOptionIcons;
