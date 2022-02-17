//основной модуль
import gulp from "gulp";

//импорт путей
import {path} from "./gulp/config/path.js";

//импорт общих плагинов
import {plugins} from "./gulp/config/plugins.js";

global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins
}

//импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {otfToTft, ttfToWoff, fontsStyle, CopyWoffAndWoff2} from "./gulp/tasks/fonts.js";
import {svgSprive} from "./gulp/tasks/svgSprive.js";

//наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.js, images)
}

export {svgSprive}

//последовательная обработка шрифтов
const fonts = gulp.series(otfToTft, ttfToWoff, CopyWoffAndWoff2, fontsStyle);

//основные задачи
const  mainTasks = gulp.parallel(fonts, copy, html, scss, js, images);

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)

//экспорт сценариев
export {dev}
export {build}

//выполнение сценария по умолчанию
gulp.task("default", dev);