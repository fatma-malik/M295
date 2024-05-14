
async function simuliereVerzoegerung(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function addiereNachVerzoegerung(a, b, ms) {
    await simuliereVerzoegerung(ms);
    const summe = a + b;
    console.log('Das Ergebnis ist:', summe);
}

addiereNachVerzoegerung(3, 7, 2000);
