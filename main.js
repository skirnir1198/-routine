	// 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    var music = new Audio('sound/count.mp3');
    var music2 = new Audio('sound/bird.mp3');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    var player2;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '660',
        width: '1420',
        videoId: 'MDMbpikr8oo',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
         $('#js-play_btn').on('click',function(){
        event.target.playVideo();
        $('#js-play_btn').addClass('hidden');
        $('#player').removeClass("hidden");    	
      })
    }
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 627000);
        done = true;
      }
    }
    function stopVideo() {
        player.stopVideo();
        $('#player').addClass("hidden");
        $('#timer').removeClass("hidden");  
        startTimer();
    }

    var interval = false;
    var timer = null;
    var timer2 = null;
    var timer3 = null;

    function count() {
        var time = $('#time').text();
        $('#time').text(time-1);
        if($('#time').text() == 0) {
          if($('#sets').hasClass('vis')) {
            $('#sets').removeClass('vis');
          }
            if(interval == false) {
                var set = $('#set').text();
                $('#set').text(parseInt(set)+1);
                $('#count').text("ワークアウト");
                $('#time').text(30);
                interval = true;
            } else if ($('#set').text() != 3) {
                $('#count').text("インターバル");
                $('#time').text(20);
                interval = false;
            } else {
              setTimeout(function(){
                clearInterval(timer);
              },1000);
              $('#timer').addClass('hidden');
              $('#meisou').removeClass('hidden');
              meisouTimer();
            }
        }
        if($('#time').text() == 3) {
          music.play();
        }
    }

    function count2() {
      
      var min = $('#min').text();
      var sec = $('#sec').text();
      if(sec == 00) {
        sec = 59;
        min--;
      } else {
        sec = ('00'+ (sec-1)).slice( -2 );
      }
      $('#min').text(min);
      $('#sec').text(sec);
      if($('#min').text() == 0 && $('#sec').text() == 3) {
        music.play();
      }
      if(min == 0 && sec == 00) {
        clearInterval(timer2);
        $('#meisouStart').text("瞑想中");
        $('#min').text(10);
        $('#sec').text('00');
        meisouTimer2();
      }
    }

    function count3() {
      var min = $('#min').text();
      var sec = $('#sec').text();
      if(sec == 00) {
        sec = 59;
        min--;
      } else {
        sec = ('00'+ (sec-1)).slice( -2 );
      }
      $('#min').text(min);
      $('#sec').text(sec);
      if(min == 0 && sec == 00) {
        music2.play();
        clearInterval(timer3);
        alert("お疲れ様でした！");
      }
    }

    function startTimer() {
      timer = setInterval(count, 1000);
    }

    function meisouTimer() {
      timer2 = setInterval(count2, 1000);
    }
    function meisouTimer2() {
      timer3 = setInterval(count3, 1000);
    }


    