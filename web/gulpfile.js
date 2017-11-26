// 用require()导入模块
var gulp = require('gulp');
var sass = require('gulp-sass');

// 创建一个任务用来编译sass---supplier
gulp.task('supplierSass',function(){
    // 查找文件位置
    gulp.src('./sass/supplier.scss') //得到文件流（文件在内存中的状态）


    .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))  //编译sass文件

    .pipe(gulp.dest('css/')) //输出到硬盘
})





// 创建一个任务用来监听文件
gulp.task('jtSass',function(){
    // 监听home.sass文件，如果有修改则执行compileSass任务
    gulp.watch('./sass/*.scss',['supplierSass'])
})
