Router.configure
({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	onWait: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', { name: 'theFight' });
Router.route('/posts/_id:', { name: 'postPage', data: function() { return Posts.findOne(this.params._id); }});
Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() { if(!Meteor.user()) this.render('accessDenied'); else this.next(); }

Router.onBeforeAction('dataNotFound', { only: 'postPage' });
Router.onBeforeAction(requireLogin, { only: 'postSubmit' });

