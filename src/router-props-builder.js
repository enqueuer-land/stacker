let stageBodyPropsBuilder = function (route, state) {
    const splitPath = route.path.split("/");
    const name = splitPath[splitPath.length - 1];
    return {
        eventName: name,
        item: state.selectedItem
    };
};

let stageHeaderPropsBuilder = function (route, state) {
    const splitPath = route.path.split("/");
    const id = splitPath[2];
    return {
        id: id,
        item: state.selectedItem
    };
};

export {
    stageBodyPropsBuilder,
    stageHeaderPropsBuilder
}
