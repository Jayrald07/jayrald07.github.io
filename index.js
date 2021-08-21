var view = (function () {
    let h = null;
    return {
        set elem(value) {
            h = value;
        },
        async appendString(value,delayEnd = 1500) {
            let i = 0;
            await new Promise((resolve) => {
                let a = setInterval(() => {
                    if (i < value.length) {
                        h.textContent = h.textContent + value[i];
                        i++;
                    } else {
                        h.textContent = h.textContent + "!"
                        clearInterval(a);
                        resolve(true);
                    }
                }, 80);
            })
            return await new Promise((resolve) => {
                let y = setTimeout(() => {
                    resolve(true);
                }, delayEnd);
            })
        },
        async removeString() {
            return await new Promise((resolve) => {
                let a = setInterval(() => {
                    let val = h.textContent;
                    if (val.length) {
                        let p = val.split("");
                        p.pop();
                        h.textContent = p.join("");
                    } else {
                        clearInterval(a);
                        resolve(true);
                    }
                }, 40);
            });
        }
    }
})();

var controller = (function(VIEW){
    return {
        setElem(elem) {
            VIEW.elem = elem
        },
        async startGreet(values) {
            let i = 0;
            while (true) {
                if (i < values.length) {
                    await VIEW.appendString(values[i]);
                    await VIEW.removeString();
                    i++;
                } else i = 0;
            }
        }
    }
})(view);

