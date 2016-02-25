import hasher from 'hasher';

export const navigate = (route, mode, tail) => {
    if (!mode) {
        return hasher.setHash(route);
    } else if (mode === "add" && tail) {
        if (route === "current") {
            let currentHash = hasher.getHash();
            return hasher.setHash(currentHash + "/" + tail);
        } else {
            return hasher.setHash(route + "/" + tail);
        }
    } else if (mode === "relative") {
        return window.location.hash = route;
    } else if (mode === "absolute") {
        return window.location.href = route;
    } else if (mode === "replace") {
        return hasher.replaceHash(route);
    }
}