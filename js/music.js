$(function () {
    let songs=document.querySelector('.song');
    let authors=document.querySelector('.author');
    let audios=document.querySelector('audio');
    let lyrics=document.querySelector('.lyric');
    let songTitle=document.querySelector('.conDown-bottom .center>.centerR>.centerR-up>.title');
    let imgs=document.querySelector('.conDown-bottom .center>.centerL>img');
    let ctime=$('.cur')[0];
    let dtime=$('.dur')[0];
    let xiabiao=0;
    let str='';
    Initialization(database[0]);
    // 对歌词进行初始化
    function Initialization(obj){
        songs.innerText=obj['songs'];
        authors.innerText=obj['name'];
        audios.src=obj['src'];

        obj['lyrics'].forEach(function(value){
            str+=`
                <li>${value.lyric}</li>
            `;
        });
        lyrics.innerText='';
        lyrics.innerHTML=str;

        songTitle.innerText=`${obj.songs} - ${obj.name}`;
        imgs.src=obj.photo;
        ctime.innerText='00:00';
        dtime.innerText=obj.alltime;
    }

    // 播放，暂停
    let spans=document.querySelectorAll('.conDown-bottom .left>span');
    spans[1].onclick=function(){
        if(audios.paused){
            audios.play();
            /*this.classList.remove('icon-bofang1');
            this.classList.add('icon-zanting4');*/
            this.classList.toggle('icon-zanting4');
        }else{
            audios.pause();
            /*this.classList.remove('icon-zanting4');
            this.classList.add('icon-bofang1');*/
            this.classList.toggle('icon-zanting4');
        }
    }

    // 上一首
    spans[0].onclick=function(){
        xiabiao--;
        if(xiabiao<0){
            xiabiao=database.length-1;
        }
        Initialization(database[xiabiao]);
        audios.play();
        n=g=0;
        ss.style.width=0;
        clearInterval(t);
        bodys.style.backgroundImage='url("images/1.jpg")';
        t=setInterval(fn,5000);
    }

    // 下一首
    spans[2].onclick=function(){
        xiabiao++;
        console.log(xiabiao)
        if(xiabiao>=database.length){
            xiabiao=0;
        }
        Initialization(database[xiabiao]);
        audios.play();
        n=g=0;
        ss.style.width=0;
        clearInterval(t);
        bodys.style.backgroundImage='url("images/1.jpg")';
        t=setInterval(fn,5000);
    }


    let ss=document.querySelector('.conDown-bottom .center>.centerR>.centerR-down>span');
    let n=g=0;
    let bili=0;
    // 设置歌词，时间对应
    audios.ontimeupdate=function(){
        // 得到当前播放时间并设置页面文本
        let current=getTime(audios.currentTime);
        ctime.innerHTML=current;
        bili=audios.currentTime/audios.duration*100+'%';
        ss.style.width=bili;
        // 歌词
        database[xiabiao]['lyrics'].forEach(function(value,index){
             // 如果当前播放时间和audio.js中的时间对应，那么就从哪一句歌词开始显示
            if(current==value.time){
                n=g=index;
            }
        })
        // g为选中下标，n为开始加载的位置下标
        if(g<6){
            n=0;
        }else{
            n=g-6;
        }
        //加载前先把页面上的元素删除
        lyrics.innerText='';
        let string='';
        // 从第n句开始加载
        for(let i=n;i<database[xiabiao]['lyrics'].length;i++){
            if(i==g){
                string+=`<li class="hot">${database[xiabiao]['lyrics'][i]['lyric']}</li>`;
            }else{
                string+=`<li>${database[xiabiao]['lyrics'][i]['lyric']}</li>`;
            }

        }
        lyrics.innerHTML=string;
        if(audios.ended){
            xiabiao++;
            if(xiabiao>=database.length){
                xiabiao=0;
            }
            Initialization(database[xiabiao]);
            n=g=0;
            ss.style.width=0;
        }
        clearInterval(t);
        bodys.style.backgroundImage='url("images/1.jpg")';
        t=setInterval(fn,5000);
    }

    function getTime(time){
         // 转化为分，秒
         let fen=Math.floor(time/60)<10?'0'+Math.floor(time/60):Math.floor(time/60);
         let miao=Math.floor(time%60)<10?'0'+Math.floor(time%60):Math.floor(time%60);
         return `${fen}:${miao}`;
    }

    // 设置背景图
    let imgArr=['url("images/2.jpg")','url("images/3.jpg")','url("images/4.jpg")'];
    let bodys=document.querySelector('body');
    let t=setInterval(fn,5000);
    function fn(){
        let num=Math.floor(Math.random()*imgArr.length);
        bodys.style.transition='all ease 0.5s';
        bodys.style.backgroundImage=imgArr[num];
    }

    // 声音
    let voice=document.querySelector('.conDown-bottom .right>.icon-yinliang-copy');
    let vol=document.querySelector('.conDown-bottom .right>.vol');
    voice.onclick=function(){
        if(audios.volume==true){
            this.classList.toggle('icon-jingyin1');
            audios.volume=false;
        }else{
            this.classList.toggle('icon-jingyin1');
            audios.volume=true;
        }
    }
    voice.onmouseenter=function(){
        vol.style.display='block';
    }
    voice.onmouseleave=function(){
        vol.style.display='none';
    }
    vol.onmouseover=function(){
        vol.style.display='block';
    }
    vol.onmouseout=function(){
        vol.style.display='none';
    }
});