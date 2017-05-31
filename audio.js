/**
 * Created by lixing on 2017/5/16.
 */
window.onload=function(){
    let audio = document.querySelector('audio');
    let song  = document.querySelector('.song');
    let author = document.querySelector('.author');
    let lyrics = document.querySelector('.lyrics');
    let playBtn = document.querySelector('.play');
    let img = document.querySelector('img');
    let info = document.querySelector('.info');
    let cTime = document.querySelector('.cTime');
    let dTime = document.querySelector('.dTime');
    let index =  0;


    /*
    * [
    * {},
    * {},
    * {}
    * ]
    *
    * id: "0", songs: "阴天", name: "莫文蔚", src: "music/阴天.mp3", alltime:"04:02", photo: "images/mww.jpg", lyrics:
    * */


    //  初始化
    render(database[0]);

    //  暂停 播放
    playBtn.onclick=function(){
        if(audio.paused){
            audio.play();
            playBtn.classList.toggle('icon-pause');
        }else{
            audio.pause();
            playBtn.classList.toggle('icon-pause');
        }
    }

    // 歌词
    let i=x=0;
    audio.ontimeupdate= function(){
        let current = format(audio.currentTime); // 100  02:11
        let duration = format(audio.duration); // 100  02:11
        let string='';
        cTime.innerText = current;
        dTime.innerText = duration;

        lyrics.innerHTML='';
        database[index]['lyrics'].forEach(function(value,index){
            if( value.time == current ){
                x = i = index;
            }
        })

        if(x<2){
           i=0
        }else{
            i = x - 2;
        }
        console.log(i,x);
        for(let j=i;j<database[index]['lyrics'].length;j++){
            if(j==x){
                string+=`
             <li class="hot">
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }else{
                string+=`
             <li >
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }

        }
        lyrics.innerHTML = string;

    }
 ///////////////////////////格式化时间///////////////////////////
    function  format(time){
        let m =  Math.floor(time /60) >=10 ? Math.floor(time /60) :  '0'+Math.floor(time /60);
        let s =  Math.floor(time % 60) >=10 ? Math.floor(time % 60) :  '0'+Math.floor(time % 60);
        return `${m}:${s}`;
    }
    //////////////////////////////////////////////////////////
    function render(obj){
        let string='';
       // song  author   lyrics>li  audio(src)
       song.innerText = obj.songs;
       author.innerText = obj.name;
       audio.src = obj.src;

       //bottom
         info.innerText = `${obj.songs} - ${obj.name} `;
         img.src= obj.photo;
         cTime.innerText = '00:00';
         dTime.innerText = obj.alltime
        //
       obj.lyrics.forEach(function(value,index){
           //   {time: "00:04", lyric: "莫文蔚"},

           string +=`<li>${value.lyric}</li>`

       })
       lyrics.innerHTML= '';
       lyrics.innerHTML=string;
    }
/////////////////////////////////////////////////////////////////

}