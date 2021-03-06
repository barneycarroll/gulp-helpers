import gutil from 'gulp-util';
import _ from 'lodash';

class WatchTask {
	setOptions(options) {
		this.options = options;

		if (_.isUndefined(this.options.src)) {
			throw new Error('WatchTask: src is missing from configuration!');
		}

		if (_.isUndefined(this.options.tasks)) {
			throw new Error('WatchTask: Tasks is missing from configuration!');
		}

		return this;
	}

	defineTask(gulp) {
		let options = this.options;
		gulp.task(options.taskName, options.taskDeps, () => {
			let watcher = gulp.watch(options.src, options.tasks);
			watcher.on('change', (event) =>
				gutil.log(gutil.colors.magenta(`File ${event.path} was ${event.type}, running tasks...`))
			);
		});
	}
}

module.exports = WatchTask;
