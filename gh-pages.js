import { publish } from 'gh-pages';

publish(
	'build',
	{
		branch: 'gh-pages',
		repo: 'https://github.com/nathankim7/nathankim7.github.io.git',
		user: {
			name: 'Nathan Kim',
			email: 'nathan.gyoohyun.kim@gmail.com'
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);
