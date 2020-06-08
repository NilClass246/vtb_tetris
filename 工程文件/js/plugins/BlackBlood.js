this.addEventListener('message', function (event) {
    switch (String(event.data[0])) {
        case 'start':
            BBx = 0;
            break;
        case 'loop':
            BBx += 1;
            if (BBx >= 1200) {
                BBx = 0;
            }
            postMessage(BBx);
            break;
    }
}, false)