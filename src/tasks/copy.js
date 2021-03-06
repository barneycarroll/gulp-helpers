import plumber from 'gulp-plumber';
import cache from 'gulp-cached';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import rename from 'gulp-rename';
import replace from 'gulp-replace-task';
import _ from 'lodash';

class CopyTask {
	setOptions(options) {
		this.options = options;

		if (_.isUndefined(this.options.src)) {
			throw new Error('CopyTask: src is missing from configuration!');
		}

		if (_.isUndefined(this.options.dest)) {
			throw new Error('CopyTask: dest is missing from configuration!');
		}

		return this;
	}

	defineTask(gulp) {
		let options = this.options;
		gulp.task(options.taskName, options.taskDeps, () => {
			let chain = gulp.src(options.src)
				.pipe(cache(options.taskName))
				.pipe(plumber());

			if (options.changed) {
				chain = chain.pipe(changed(options.dest, options.changed));
			}

			if (options.replace) {
				chain = chain.pipe(replace(options.replace));
			}

			if (options.rename) {
				chain = chain.pipe(rename(options.rename));
			}

			chain = chain.pipe(gulp.dest(options.dest))
				.pipe(browserSync.reload({stream: true}));

			return chain;
		});
	}
}

module.exports = CopyTask;
