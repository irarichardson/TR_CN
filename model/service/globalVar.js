// Including ngTranslate
angular.module("ngTranslate",["ng"]).config(["$provide",function(t){$TranslateProvider=function(){var t,n={};this.translations=function(t,r){if(!t&&!r)return n;if(t&&!r){if(angular.isString(t))return n[t];n=t}else n[t]=r},this.uses=function(r){if(!r)return t;if(!n[r])throw Error("$translateProvider couldn't find translationTable for langKey: '"+r+"'");t=r},this.$get=["$interpolate","$log",function(r,a){return $translate=function(e,i){var l=t?n[t][e]:n[e];return l?r(l)(i):(a.warn("Translation for "+e+" doesn't exist"),e)},$translate.uses=function(n){return n?(t=n,void 0):t},$translate}]},t.provider("$translate",$TranslateProvider)}]),angular.module("ngTranslate").directive("translate",["$filter","$interpolate",function(t,n){var r=t("translate");return{restrict:"A",scope:!0,link:function(t,a,e){e.$observe("translate",function(r){t.translationId=angular.equals(r,"")?n(a.text())(t.$parent):r}),e.$observe("values",function(n){t.interpolateParams=n}),t.$watch("translationId + interpolateParams",function(){a.html(r(t.translationId,t.interpolateParams))})}}}]),angular.module("ngTranslate").filter("translate",["$parse","$translate",function(t,n){return function(r,a){return angular.isObject(a)||(a=t(a)()),n(r,a)}}]);


var app = angular.module('teachapp', ['ngTranslate']);

app.factory('httpInterceptor', function ($q, $rootScope, $log) {

    var numLoadings = 0;

    return {
        request: function (config) {

            numLoadings++;

            // Show loader
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config)

        },
        response: function (response) {

            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return $q.reject(response);
        }
    };
})

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});


app.config(function ($httpProvider) {
	$httpProvider.defaults.timeout = 99999;
});


//app.config(function($translateProvider) {
 
     //default language
//     $translateProvider.preferredLanguage('en');
     //fallback language if entry is not found in current language
//     $translateProvider.fallbackLanguage('zh_CN');
     //load language entries from files
 //    $translateProvider.useStaticFilesLoader({
  //       prefix: 'language/', //relative path Eg: /languages/
   //      suffix: '.json' //file extension
//     });


//app.config(function($translateProvider) {
//  $translateProvider.translations('en', {
//    I_AM_A_TEACHER: 'I am a Teacher',
//    I_AM_A_STUDENT: 'I am a Student'
//  })
//  .translations('zh_CN', {
//   I_AM_A_TEACHER: '我是学生',
//   I_AM_A_STUDENT: '我是学生'
//  });
//});

app.config(['$translateProvider', function ($translateProvider) {
    
    // Simply register translation table as object hash
    $translateProvider.translations('en', {
        I_AM_A_TEACHER: 'I am a Teacher',
		I_AM_A_STUDENT: 'I am a Student',
        NEW_TO_TEACH_REACH_CLICK_BELOW: 'New to Teach Reach? Click below',
		NOT_REGISTERED: 'Not Registered',
		REGISTER_TEACHER: 'Register Teacher',
		REGISTER_STUDENT: 'Register Student',
		WORRIED_HOW_IT_WORKS: 'Worried, How it works??',
		TAKE_A_VIDEO_TOUR: 'Take a video Tour',
		TAKE_AN_IMAGE_TOUR: 'Take an image Tour',
		ENTER_YOUR_TEACHER_CREDENTIALS: 'Enter your teacher credentials',
		ENTER_YOUR_STUDENT_CREDENTIALS: 'Enter your student credentials',
		EMAIL: 'Email',
		EMAIL_ADDRESS: 'Email（name@university.edu)',
		PASSWORD: 'Password',
		FORGOT_PASSWORD: 'Forgot password',
		LOG_IN: 'Log In',
		NOT_A_MEMBER: 'Not a member',
		REGISTER: 'Register',
		GO_TO_TOP: 'Go to top ^',
		ENTER_YOUR: 'Enter your',
		CREDENTIALS: 'credentials',
		FIRST_NAME: 'First Name',
		LAST_NAME: 'Last Name',
		SCREEN_NAME: 'Screen Name',
		CONFIRM_PASSWORD: 'Confirm Password',
		I_AGREE_TO_THE: 'I agree to the',
		TERMS_OF_SERVICE: 'Terms of Service',
		RECENT_UPDATES: 'Recent Updates',
		CLASS_WALL: 'Class Wall',
		LECTURE_NOTES: 'Lecture Notes',
		AUDIO_LECTURES: 'Audio Lectures',
		VIDEO_LECTURES: 'Video Lectures',
		DOCUMENTS: 'Documents',
		ASSIGNMENTS: 'Assignments',
		SUBMISSIONS: 'Submissions',
		GRADES: 'Grades',
		CALENDAR: 'Calendar',
		CLASS_SETTINGS: 'Class Settings',
		CREATE_CLASS: 'Create Class',
		ADD_CLASS: 'Add Class',
		MY_CLASSES: 'My Classes',
		MY_ACTIVITIES: 'My Activities',
		TEACHER: 'Teacher',
		STUDENT: 'Student',
		SELECT_REGISTER_MODE: 'Select Register Mode',
		CLASS_NUMBER: 'Class Number',
		SESSION: 'Session',
		BROADCAST_MESSSAGE: 'Broadcast Message',
		LECTURE_NOTE: 'Lecture Note',
		AUDIO_LECTURE: 'Audio Lecture',
		VIDEO_LECTURE: 'Video Lecture',
		DOCUMENT: 'Document',
		ASSIGNMENT: 'Assignment',
		SUBMISSION: 'Submission',
		CALENDAR_EVENT: 'Calendar Event',
		REGISTER_AS_A_TEACHER: 'Register as a teacher',
		REGISTER_AS_A_STUDENT: 'Register as a student',
		CLOSE: 'Close',
		ENTER_FIRST_NAME: 'Enter first name',
		ENTER_LAST_NAME: 'Enter last name',
		ENTER_SCREEN_NAME: 'Enter Screen Name',
		ENTER_EMAIL: 'Enter Email',
		TERMS_AND_CONDITIONS: 'Terms and Conditions',
		ALREADY_A_MEMBER: 'Already a member',
		CONFIRM_EMAIL: 'Confirm Email',
		SEND: 'Send',
		CLASS_DETAILS: 'Class Details',
		MY_PROFILE: 'My Profile',
		EDIT: 'Edit',
		UPDATE: 'Update',
		CANCEL: 'Cancel',
		MALE: 'Male',
		FEMALE: 'Female',
		MEMBER_SINCE: 'Member since',
		UNIVERSITY: 'University',
		ADD_YOUR_SESSION: 'Add your session e.g. Class of Arts 2014',
		ADD_YOUR_UNIVERSITY: 'Add your university e.g. UCLA',
		ABOUT_ME: 'About Me',
		ADD_ABOUT_YOURSELF: 'Add about yourself',
		SHOW_EMAIL: 'Show Email',
		WEBSITE: 'Website',
		ADD_YOUR_WEBPAGE_HERE: 'Add your webpage here',
		RECEIVE_NOTIFICATION_FOR_ALL_THE_CLASSES: 'Receive notifications for all the classes',
		ACTIVITIES: 'Activities',
		FOLLOWING: 'Following',
		CHANGE_PASSWORD: 'Change Password',
		LOADING_RECENT_UPDATES: 'Loading Recent Updates',
		TEACH_REACH_ABOUT_CONTENT: 'Teach Reach is an Academic network where students and professors can exchange ideas and information quickly and conveniently.',
		ABOUT: 'About',
		COMPANY: 'Company',
		TEAM: 'Team',
		HOW_IT_WORKS: 'How it works',
		MORE: 'More',
		FAQ: 'FAQ',
		CONTACT: 'Contact',
		CONNECT_WITH_US: 'Connect with us',
		TRACK_COURSES: 'Track courses wherever you go with our mobile app',
		LOADING_ACTIVITIES: 'Loading Activities',
		YOUR_ACTIVITIES_WILL_BE_SHOWN_HERE: 'Your activities will be shown here',
		YOU_HAVE_NOT_POSTED_ANYTHING_YET: 'You have not posted anything yet',
		LOAD_MORE: 'Load more',
		YOU_HAVE_VIEWED_ALL_YOUR_ACTIVITIES: 'Whoa!!! You have viewed all your activities',
		ADD: 'Add',
		SELECT_THE_CLASS_LOGO: 'Select the class logo',
		SELECT_A_COLOR_CODE: 'Select a color code',
		SELECT_COLOR: 'Select Color',
		CREATE: 'Create',
		LOADING_CLASSES: 'Loading Classes',
		LAST_MODIFIED_AT: 'Last modified at',
		PLEASE_ADD_A_CLASS_TO_SEE_UPDATES: 'Please add a class to see updates',
		PLEASE_CREATE_A_CLASS_TO_SEE_UPDATES: 'Please create a class to see updates',
		YOU_HAVE_VIEWED_ALL_THE_RECENT_UPDATES: 'Whoa!!! You have viewed all the recent updates',
		RECENT_UPDATES_WILL_BE_SHOWN_HERE: 'Recent updates will be shown here',
		ENTER_SEARCH_KEYWORD: 'Enter search keyword',
		SEARCH: 'Search',
		ALL: 'All',
		FRIENDS: 'Friends',
		YOUR_COMMENT_HERE: 'Your Comment here',
		SELECT_THE_CHECKBOX_TO_BROADCAST_THE_MESSAGE:'Select the checkbox to broadcast the message',
		SUBMIT: 'Submit',
		LOADING_CLASS_WALL: 'Loading Class Wall',
		NO_COMMENTS_AVAILABLE: 'No comments available',
		COMMENTS: 'Comments',
		CLICK_HERE_TO_VIEW_COMMENT_DETAILS:'Click here to view comment details',
		COMMENT_DETAILS: 'Comment Details',
		COMMENTS: 'Comments',
		LIKE: 'Like',
		EDIT: 'Edit',
		EDIT_COMMENT: 'Edit Comment',
		UPDATE: 'Update',
		DELETE: 'Delete',
		REPORT: 'Report',
		UNREPORT: 'Unreport',
		DELETE_COMMENT: 'Delete Comment',
		ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_COMMENT :'Are you sure you want to delete the comment',
		REPLY: 'Reply',
		EDIT_REPLY: 'Edit Reply',
		DELETE_REPLY: 'Delete Reply',
		ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_REPLY:'Are you sure you want to delete the reply',
		LEAVE_A_REPLY_HERE: 'Leave a reply here',
		YOU_HAVE_VIEWED_ALL_YOUR_COMMENTS :'Whoa!!! You have viewed all your comments',
		ADD_A_LECTURE_NOTE: 'Add a Lecture Note',
		CREATE_WEEK: 'Create Week',
		LOADING_LECTURE_NOTES: 'Loading Lecture Notes',
		YOU_HAVE_NOT_UPLOADED_ANY_LECTURE_NOTE_YET: 'Aha!!! You have not uploaded any Lecture Note yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_LECTURE_NOTE_YET: 'Aha!!! The teacher has not uploaded any Lecture Note yet. Stay tuned for more updates',
		EDIT_WEEK: 'Edit Week',
		WEEK_NAME: 'Week Name',
		CLASS_NAME: 'Class Name',
		CLASS_CODE: 'Class Code',
		CLICK_HERE_TO_VIEW_DAYS_UNDER_THE: 'Click here to view days under the',
		DELETE_WEEK: 'Delete Week',
		ADD_A_DAY: 'Add a day',
		SELECT_A_DAY: 'Select a day',
		SELECT_DAY: 'Select day',
		MONDAY: 'Monday',
		TUESDAY: 'Tuesday',
		WEDNESDAY: 'Wednesday',
		THURSDAY: 'Thursday',
		FRIDAY: 'Friday',
		SATURDAY: 'Saturday',
		SUNDAY: 'Sunday',
		CUSTOM: 'Custom',
		CUSTOM_DAY: 'Custom day',
		EDIT_DAY: 'Edit day',
		DELETE_DAY: 'Delete day',
		ADD_A_FILE: 'Add a file',
		UPLOAD: 'Upload',
		EDIT_FILE: 'Edit file',
		DELETE_FILE: 'Delete file',
		DOWNLOAD_FILE: 'Download file',
		ADD_AN_AUDIO_LECTURE: 'Add an Audio Lecture',
		LOADING_AUDIO_LECTURES: 'Loading Audio Lectures',
		YOU_HAVE_NOT_UPLOADED_ANY_AUDIO_LECTURE: 'Aha!!! You have not uploaded any Audio Lecture yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_AUDIO_LECTURE: 'Aha!!! The teacher has not uploaded any audio lecture yet. Stay tuned for more updates',
		CLICK_HERE_TO_VIEW_FILES_UNDER_THE_DAY: 'Click here to view files under the day',
		LOADING_VIDEO_LECTURES: 'Loading Video Lectures',
		YOU_HAVE_NOT_UPLOADED_ANY_VIDEO_LECTURE :'Aha!!! You have not uploaded any Video Lecture yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_VIDEO_LECTURE :'Aha!!! The teacher has not uploaded any video lecture yet. Stay tuned for more updates',
		ADD_A_DOCUMENT: 'Add a Document',
		OK: 'OK',
		ADD_A_VIDEO_LECTURE: 'Add a Video Lecture',
		ADD_AN_ASSIGNMENT: 'Add an Assignment',
		ADD_ASSIGNMENT: 'Add Assignment',
		ASSIGNMENT_TITLE :'Assignment Title',
		YOU_HAVE_NOT_UPLOADED_ANY_ASSIGNMENT_YET: 'Aha!!! You have not uploaded any Assignment yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_ASSIGNMENT: 'Aha!!! The teacher has not uploaded any Assignment yet. Stay tuned for more updates',
		LOADING_ASSIGNMENTS: 'Loading Assignments',
		EDIT_ASSIGNMENT: 'Edit Assignment',
		LOADING_DOCUMENTS: 'Loading Documents',
		YOU_HAVE_NOT_UPLOADED_ANY_DOCUMENT_YET: 'Aha!!! You have not uploaded any Document yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_DOCUMENT: 'Aha!!! The teacher has not uploaded any Document yet. Stay tuned for more updates',
		ADD_A_SUBMISSION: 'Add a Submission',
		ADD_SUBMISSION: 'Add Submission',
		NO_STUDENT_HAS_UPLOADED_A_SUBMISSION_YET: 'Aha!!! No student has uploaded a Submission yet. Stay tuned for more updates',
		YOU_HAVE_NOT_SUBMITTED_THE_WORK_FOR_ANY_ASSIGNMENT: 'Aha!!! You have not submitted the work for any Assignment. Add one by clicking the button above',
		LOADING_SUBMISSIONS: 'Loading Submissions',
		NONE_OF_THE_STUDENT_HAS_SUBMITTED_THE_ASSIGNMENT: 'Aha!!! None of the student has submitted the assignment',
		ADD_GRADES: 'Add Grades',
		YOU_HAVE_NOT_UPLOADED_GRADES_FOR_THE_COURSE_YET: 'Aha!!! You have not uploaded Grades for the course yet. Add the grades by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_GRADES_FOR_THE_COURSE_YET: 'Aha!!! The teacher has not uploaded grades for the course yet. Stay tuned for more updates',
		LOADING_GRADES: 'Loading Grades',
		CREATE_AN_EVENT: 'Create an event',
		CREATE_EVENT: 'Create Event',
		EVENT_NAME: 'Event Name',
		DATE: 'Date',
		TIME: 'Time',
		DESCRIPTION: 'Description',
		YOU_HAVE_NOT_CREATED_ANY_EVENT_YET: 'Aha!!! You have not created any Event yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_CREATED_ANY_EVENT: 'Aha!!! The teacher has not created any Event yet. Stay tuned for more updates',
		LOADING_CALENDAR_EVENTS: 'Loading Calendar Events',
		EDIT_CLASS_LOGO: 'Edit class logo',
		SHOW: 'Show',
		SESSION: 'Session',
		DELETE_CLASS: 'Delete Class',
		REMOVE_CLASS: 'Remove Class',
		ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_CLASS: 'Are you you sure you want to delete the class',
		ARE_YOU_SURE_YOU_WANT_TO_REMOVE_THE_CLASS: 'Are you you sure you want to remove the class',
		DELETE: 'Delete',
		
		
    });   

    $translateProvider.translations('zh_CN', {
        I_AM_A_TEACHER: '我是学生',
		I_AM_A_STUDENT: '我是学生',
		NEW_TO_TEACH_REACH_CLICK_BELOW: '新 对 Teach Reach? 点击以下',
		NOT_REGISTERED: '没有注册',
		REGISTER_TEACHER: '注册教师',
		REGISTER_STUDENT: '注册学生',
		WORRIED_HOW_IT_WORKS: '担心，它是如何工作的？',
		TAKE_A_VIDEO_TOUR: '拍摄影像之旅',
		TAKE_AN_IMAGE_TOUR: '拍摄影像之旅',
		ENTER_YOUR_TEACHER_CREDENTIALS: '输入您的教师证号',
		ENTER_YOUR_STUDENT_CREDENTIALS: '输入您的学号',
		EMAIL: '邮箱',
		EMAIL_ADDRESS: '邮箱（name@university.edu)',
		PASSWORD: '密码',
		FORGOT_PASSWORD: '忘记密码',
		LOG_IN: '登录',
		NOT_A_MEMBER: '还不是会员',
		REGISTER: '注册',
		GO_TO_TOP: '返回页首^',
		ENTER_YOUR: '请输入您的',
		CREDENTIALS: ' 国书',
		FIRST_NAME: '名',
		LAST_NAME: '姓',
		SCREEN_NAME: '昵称',
		CONFIRM_PASSWORD: '确认密码',
		I_AGREE_TO_THE: '我同意',
		TERMS_OF_SERVICE: '服务条款',
		RECENT_UPDATES: '最近更新',
		CLASS_WALL: '班墙',
		LECTURE_NOTES: '讲义',
		AUDIO_LECTURES: '讲课音频',
		VIDEO_LECTURES: '讲课视频',
		DOCUMENTS: '文档',
		ASSIGNMENTS: '作业',
		SUBMISSIONS: '提交材料',
		GRADES: '成绩',
		CALENDAR: '日程表',
		CLASS_SETTINGS: '课程设置',
		CREATE_CLASS: '创建课程',
		ADD_CLASS: '添加课程',
		MY_CLASSES: '我的课程',
		MY_ACTIVITIES: '我的活动',
		SELECT_REGISTER_MODE: '选择注册模式',
		CLASS_NUMBER: '课程人数',
		SESSION: '年度',
		BROADCAST_MESSSAGE: '广播消息',
		LECTURE_NOTE: '讲义',
		AUDIO_LECTURE: '讲课音频',
		VIDEO_LECTURE: '讲课视频',
		DOCUMENT: '文档',
		ASSIGNMENT: '作业',
		SUBMISSION: '提交',
		CALENDAR_EVENT: '日程表事件',
		REGISTER_AS_A_TEACHER: '注册成为一名教师',
		REGISTER_AS_A_STUDENT: '注册成为学生',
		CLOSE: '近',
		ENTER_FIRST_NAME: '输入名字',
		ENTER_LAST_NAME: '输入姓氏',
		ENTER_SCREEN_NAME: '进入昵称',
		ENTER_EMAIL: '输入电子邮件',
		TERMS_AND_CONDITIONS: '条款和条件',
		ALREADY_A_MEMBER: '已经是会员',
		CONFIRM_EMAIL: '确认电子邮件',
		SEND: '发送',
		CLASS_DETAILS: '课程详细',
		MY_PROFILE: '我的资料',
		EDIT: '编辑',
		UPDATE: '更新',
		CANCEL: '取消',
		MALE: '男',
		FEMALE: '女',
		MEMBER_SINCE: '注册时间',
		UNIVERSITY: '大学',
		ADD_YOUR_SESSION: '添加您的会话 e.g. Class of Arts 2014',
		ADD_YOUR_UNIVERSITY: '添加你的大学 e.g. UCLA',
		ABOUT_ME: '关于我',
		ADD_ABOUT_YOURSELF: '添加对自己的注释',
		SHOW_EMAIL: '显示的电子邮件账号',
		WEBSITE: '网站',
		ADD_YOUR_WEBPAGE_HERE: '添加您的个人网页',
		RECEIVE_NOTIFICATION_FOR_ALL_THE_CLASSES: '接受所有课程的通知',
		ACTIVITIES: '活动',
		FOLLOWING: '正在关注',
		CHANGE_PASSWORD: '更改密码',
		LOADING_RECENT_UPDATES: '加载最新更新',
		TEACH_REACH_ABOUT_CONTENT: 'Teach Reach is an Academic network where students and professors can exchange ideas and information quickly and conveniently.',
		ABOUT: '关于',
		COMPANY: '公司',
		TEAM: '团队',
		MORE: '更多',
		FAQ: '常问问题',
		CONTACT: '联系',
		HOW_IT_WORKS: '它是如何工作的',
		CONNECT_WITH_US: '连接我们',
		TRACK_COURSES: '无论你走到哪里我们的移动应用程序的轨道课程',
		LOADING_ACTIVITIES: '装载活动',
		YOUR_ACTIVITIES_WILL_BE_SHOWN_HERE: '你的活动都会在这里显示出来',
		YOU_HAVE_NOT_POSTED_ANYTHING_YET: '您还没有发布任何内容',
		LOAD_MORE: '加载更多',
		YOU_HAVE_VIEWED_ALL_YOUR_ACTIVITIES: '哇！您已经浏览所有的活动',
		ADD: '添',
		SELECT_THE_CLASS_LOGO: '选择类标志',
		SELECT_A_COLOR_CODE: '选择一种颜色代码',
		SELECT_COLOR: '选择颜色',
		CREATE: '创建',
		LOADING_CLASSES: '加载类',
		LAST_MODIFIED_AT: '最后修改于',
		PLEASE_ADD_A_CLASS_TO_SEE_UPDATES: '请添加一个类来查看更新',
		PLEASE_CREATE_A_CLASS_TO_SEE_UPDATES: '请创建一个类来查看更新',
		YOU_HAVE_VIEWED_ALL_THE_RECENT_UPDATES: '哇！您已经浏览所有最新的更新',
		RECENT_UPDATES_WILL_BE_SHOWN_HERE: '最近的更新将在这里显示出来',
		ENTER_SEARCH_KEYWORD: '输入搜索关键字',
		SEARCH: '搜索',
		ALL: '所有',
		FRIENDS: '朋友',
		TEACHER: '老师',
		YOUR_COMMENT_HERE: '在这里您的评论',
		SELECT_THE_CHECKBOX_TO_BROADCAST_THE_MESSAGE:'选中该复选框以广播消息',
		SUBMIT: '提交',
		LOADING_CLASS_WALL: '加载类墙',
		NO_COMMENTS_AVAILABLE: '无评论',
		COMMENTS: '评论',
		CLICK_HERE_TO_VIEW_COMMENT_DETAILS:'点击这里查看评论详细信息',
		COMMENT_DETAILS: '意见详细',
		COMMENTS: '评论',
		LIKE: '喜欢',
		EDIT: '编辑',
		EDIT_COMMENT: '编辑点评',
		UPDATE: '更新',
		DELETE: '删除',
		REPORT: '报告',
		UNREPORT: 'Unreport_CN',
		DELETE_COMMENT: '删除评论',
		ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_COMMENT: '您确定要删除评论',
		REPLY: '回复',
		EDIT_REPLY: '编辑回复',
		DELETE_REPLY: '删除回复',
		ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_REPLY: '您确定要删除该回复',
		LEAVE_A_REPLY_HERE: '留下一个答复点击这里',
		YOU_HAVE_VIEWED_ALL_YOUR_COMMENTS : '哇！您已经浏览所有的评论',
		ADD_A_LECTURE_NOTE: 'Add a Lecture Note_CN',
		CREATE_WEEK: '创建周',
		LOADING_LECTURE_NOTES: 'Loading Lecture Notes_CN',
		YOU_HAVE_NOT_UPLOADED_ANY_LECTURE_NOTE_YET: 'Aha!!! You have not uploaded any Lecture Note yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_LECTURE_NOTE_YET: 'Aha!!! The teacher has not uploaded any Lecture Note yet. Stay tuned for more updates',
		EDIT_WEEK: '编辑周',
		WEEK_NAME: '星期名称',
		CLASS_NAME: '课程名称',
		CLASS_CODE: '课程代码',
		CLICK_HERE_TO_VIEW_DAYS_UNDER_THE: '点击此处查看下天',
		DELETE_WEEK: '删除周',
		ADD_A_DAY: '添加一天',
		SELECT_A_DAY: '选择一天',
		SELECT_DAY: '选择天',
		MONDAY: '星期一',
		TUESDAY: '星期二',
		WEDNESDAY: '星期三',
		THURSDAY: '星期四',
		FRIDAY: '星期五',
		SATURDAY: '星期六',
		SUNDAY: '星期日',
		CUSTOM: '节日',
		CUSTOM_DAY: 'Custom day_CN',
		EDIT_DAY: 'Edit day_CN',
		DELETE_DAY: 'Delete day_CN',
		ADD_A_FILE: 'Add a file_CN',
		UPLOAD: '上传',
		EDIT_FILE: '编辑文件',
		DELETE_FILE: '删除文件',
		DOWNLOAD_FILE: '下载文件',
		ADD_AN_AUDIO_LECTURE: '添加音频讲座',
		LOADING_AUDIO_LECTURES: '加载音频讲座',
		YOU_HAVE_NOT_UPLOADED_ANY_AUDIO_LECTURE: 'Aha!!! You have not uploaded any Audio Lecture yet. Add one by clicking the button above_CN',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_AUDIO_LECTURE: 'Aha!!! The teacher has not uploaded any audio lecture yet. Stay tuned for more updates_CN',
		CLICK_HERE_TO_VIEW_FILES_UNDER_THE_DAY: 'Click here to view files under the day_CN',
		LOADING_VIDEO_LECTURES: 'Loading Video Lectures_CN',
		YOU_HAVE_NOT_UPLOADED_ANY_VIDEO_LECTURE :'Aha!!! You have not uploaded any Video Lecture yet. Add one by clicking the button above_CN',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_VIDEO_LECTURE :'Aha!!! The teacher has not uploaded any video lecture yet. Stay tuned for more updates_CN',
		ADD_A_DOCUMENT: 'Add a Document_CN',
		OK: 'OK_CN',
		ADD_A_VIDEO_LECTURE: 'Add a Video Lecture_CN',
		ADD_AN_ASSIGNMENT: 'Add an Assignment_CN',
		ADD_ASSIGNMENT: 'Add Assignment_CN',
		ASSIGNMENT_TITLE: 'Assignment Title_CN',
		YOU_HAVE_NOT_UPLOADED_ANY_ASSIGNMENT_YET: 'Aha!!! You have not uploaded any Assignment yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_ASSIGNMENT: '啊哈！您还没有上传任何分配呢。增加一个点击上面的按钮',
		LOADING_ASSIGNMENTS: 'Loading Assignments_CN',
		EDIT_ASSIGNMENT: '编辑分配',
		LOADING_DOCUMENTS: '装入文件',
		YOU_HAVE_NOT_UPLOADED_ANY_DOCUMENT_YET: '啊哈！您还没有上传任何文件呢。增加一个点击上面的按钮',
		THE_TEACHER_HAS_NOT_UPLOADED_ANY_DOCUMENT: '啊哈！老师还没有上传任何文件呢。敬请期待更多的更新',
		ADD_A_SUBMISSION: '添加提交',
		ADD_SUBMISSION: '添加提交',
		NO_STUDENT_HAS_UPLOADED_A_SUBMISSION_YET: '啊哈！没有学生上传了一个提交呢。敬请期待更多的更新',
		YOU_HAVE_NOT_SUBMITTED_THE_WORK_FOR_ANY_ASSIGNMENT: '啊哈！你还没有提交的工作对任何分配。增加一个点击上面的按钮',
		LOADING_SUBMISSIONS: '装载意见书',
		NONE_OF_THE_STUDENT_HAS_SUBMITTED_THE_ASSIGNMENT: '啊哈！没有一个学生提交的作业',
		ADD_GRADES: '添加成绩',
		YOU_HAVE_NOT_UPLOADED_GRADES_FOR_THE_COURSE_YET: '啊哈！您还没有上传年级的课程呢。点击上面的按钮添加成绩',
		THE_TEACHER_HAS_NOT_UPLOADED_GRADES_FOR_THE_COURSE_YET: '啊哈！老师还没有上传成绩的课程呢。敬请期待更多的更新',
		LOADING_GRADES: '加载中成绩',
		CREATE_AN_EVENT: '创建事件',
		CREATE_EVENT: '创建事件',
		EVENT_NAME: '事件名称',
		DATE: '日期',
		TIME: '时间',
		DESCRIPTION: '描述',
		YOU_HAVE_NOT_CREATED_ANY_EVENT_YET: 'Aha!!! You have not created any Event yet. Add one by clicking the button above',
		THE_TEACHER_HAS_NOT_CREATED_ANY_EVENT: 'Aha!!! The teacher has not created any Event yet. Stay tuned for more updates',
		LOADING_CALENDAR_EVENTS: 'Loading Calendar Events',
		EDIT_CLASS_LOGO: '编辑课程图标',
		SHOW: '显示',
		SESSION: '年度',
		DELETE_CLASS: '删除班',
		REMOVE_CLASS: '消除班',
		ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_CLASS: '您确定要删除的类',
		ARE_YOU_SURE_YOU_WANT_TO_REMOVE_THE_CLASS: '您确定要删除类',
		DELETE: '删除',
		
		
    });   
    
    $translateProvider.uses('en');
}]);


app.directive("loader", function ($rootScope) {
    return function ($scope, element, attrs) {
        $scope.$on("loader_show", function () {
            return element.show();
        });
        return $scope.$on("loader_hide", function () {
            return element.hide();
        });
    };
}
)

app.factory('globalvars', function() {
	var classId = '';
	var authToken = '';
	var userObject = {} ;
	var myclasses = [] ;
		
    return {
    	getClassId : function () {
            return classId;
        },
        
    	setClassId : function (id) {
            classId = id;
            return classId;
        },
        
        getUserDetails : function () {
            return userObject;
        },
        setUserDetails : function (userDetail) {
        	userObject.userName = userDetail.userName;
        	userObject.userId = userDetail.userId;
        	userObject.authToken = userDetail.authToken;
			userObject.role = userDetail.role;
        	
            return userObject;
        },
        
        getMyClasses : function () {
            return myclasses;
        },
        
        setMyClasses : function (classes) {
        	myclasses = classes;
            return myclasses;
        }
       
    }   

});