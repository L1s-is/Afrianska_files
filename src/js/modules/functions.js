//Проверка поддержки Webp, добавление класса webp или no-webp для HTML
export function isWebp(){

    function testWebp(callback) {
        let webP = new Image()
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2)
        }
        webP.src = "data:image/webp;base64"
    }
    testWebp(function (support) {
        let className = support === true ? "webp" : "no-webp"
        document.documentElement.classList.add(className)
    })
}
