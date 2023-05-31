
# ToneZone 


ToneZone is a web application for listening to music and connecting with your peers and audience. I used SoundCloud as my main source of inspiration and built it using React.js, Redux, and Express/Sequelize.

### Splash page (unauthorized user)

![Screenshot 2023-05-30 at 8 36 53 PM](https://github.com/pmelhus/the-tone-zone/assets/97479364/f6772b07-a333-4745-bf3b-7013cdc777dc)

### Home page (authorized user)

![Screenshot 2023-05-30 at 8 39 28 PM](https://github.com/pmelhus/the-tone-zone/assets/97479364/510acc4d-5cda-45b6-8ccc-d5bd2cc4919d)

### Stream page

![Screenshot 2023-05-30 at 8 41 19 PM](https://github.com/pmelhus/the-tone-zone/assets/97479364/9e5e974c-24ba-4d8a-9b1b-ec34ab1fc19c)

### Individual Song Page

![Screenshot 2023-05-30 at 8 42 36 PM](https://github.com/pmelhus/the-tone-zone/assets/97479364/94ba8eed-7f28-46ec-8c21-a993ce15147c)

### Feature list

* Integrated continuous playback using the react-h5-audio-player in conjunction with Wavesurfer.js
* Use of redux allows for data to be rendered correctly in real time and for currently playing song to be saved throughout renders on page
* Sign in/sign up with email/username
* Can upload/play/edit/delete audio tracks posted by other users or your own music
* Images and audio files can be loaded with tracks and will render on the page once uploaded
* Users can create, edit/delete their own tracks
* Users can create comments on tracks and delete them
* Users can search for songs and users
* AWS upload configured
* Discover page displays the most recent tracks uploaded by users


### To-do

* Likes
* Tags
* Shares
* Follows
* Notifications
