/* open-when.html — shared helpers live in js/common.js */

// --- UNIQUE INTERACTIVE SCRIPTS ---
const jokes = [
    "Why did the invisible man turn down the job offer. He could not see himself doing it.",
    "I am reading a book on anti gravity. It is impossible to put down.",
    "Why do skeletons not fight each other. They do not have the guts.",
    "What do you call a fake noodle. An impasta.",
    "Are you a wifi router. Because I am feeling a connection."
];
function getJoke() { document.getElementById('joke-text').innerText = jokes[Math.floor(Math.random() * jokes.length)]; }

const futures = [
    "I see a beautiful house with a purple door 🏡",
    "I see us traveling somewhere with lots of snow ❄️",
    "I see a beautiful woman succeeding in everything she does 📚",
    "I see two people growing old and still gaming together 🎮",
    "I see me saying I do to the prettiest girl in the world 💍"
];
function readFuture() { document.getElementById('future-text').innerText = futures[Math.floor(Math.random() * futures.length)]; }

// Practical Features Scripts
let breathingInterval;
let breathingTimeout1, breathingTimeout2;

function startBreathing() {
    const text = document.getElementById('breathe-instruction');
    const circle = document.getElementById('breathe-circle');
    
    if(breathingInterval) clearInterval(breathingInterval);
    clearTimeout(breathingTimeout1);
    clearTimeout(breathingTimeout2);
    
    circle.style.animation = 'none'; 
    circle.innerText = '';
    
    // Small delay to reset animation
    setTimeout(() => {
        circle.style.animation = 'breatheExercise 19s infinite linear';
        
        const cycle = () => {
            text.innerText = "Breathe in slowly lovey...";
            breathingTimeout1 = setTimeout(() => { text.innerText = "Hold it right there baby..."; }, 4000);
            breathingTimeout2 = setTimeout(() => { text.innerText = "Breathe out gently sweetheart..."; }, 11000);
        };
        
        cycle();
        breathingInterval = setInterval(cycle, 19000);
    }, 50);
}

function checkSick() {
    const checkboxes = document.querySelectorAll('#sick-box input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(c => c.checked);
    if (allChecked) {
        document.getElementById('sick-reward').style.opacity = '1';
        document.getElementById('sick-reward').style.transform = 'translateY(0)';
    } else {
        document.getElementById('sick-reward').style.opacity = '0';
        document.getElementById('sick-reward').style.transform = 'translateY(10px)';
    }
}

function spawnBadThoughts() {
    const container = document.getElementById('bubble-container');
    container.innerHTML = '';
    const thoughts = ['Doubt', 'Stress', 'What ifs', 'Fear'];
    
    thoughts.forEach((t, i) => {
        const bubble = document.createElement('div');
        bubble.className = 'bad-thought-bubble';
        bubble.innerText = t;
        
        // Random positioning within the box
        bubble.style.left = (15 + i * 20) + '%';
        bubble.style.top = (10 + Math.random() * 40) + 'px';
        bubble.style.animationDelay = (i * 0.3) + 's';
        
        bubble.onclick = function() {
            this.style.transform = 'scale(0)';
            this.style.opacity = '0';
            setTimeout(() => this.remove(), 300);
            checkThoughtsLeft();
        };
        container.appendChild(bubble);
    });
}

function checkThoughtsLeft() {
    const container = document.getElementById('bubble-container');
    // If all bubbles are popped
    if (container.children.length === 0) {
        container.innerHTML = '<p style="color:var(--primary-purple); font-weight:bold; margin-top:40px; font-size: 1.1rem; animation: fadeIn 1s ease;">See baby. They are all gone. I am right here for you always.</p>';
    }
}

function updateForgiveness(val) {
    const text = document.getElementById('forgive-text');
    const modalBox = document.getElementById('modal-box');
    if (val == 100) {
        text.innerText = '100% yay I am forgiven 🥺❤️';
        modalBox.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.6)';
    } else {
        text.innerText = val + '%';
        modalBox.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
    }
}

function startRain() {
    const container = document.getElementById('rain-container');
    container.innerHTML = ''; // clear old rain
    for(let i=0; i<30; i++) {
        let drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
        container.appendChild(drop);
    }
}

// --- ENVELOPE CONTENT DATABASE ---
const letters = {
    getthis: `<h2>Welcome to our sanctuary</h2>
              <p>My dearest lovey,</p>
              <p>I built this entire digital place just for you. Think of this as our own little private corner of the internet, completely separated from the noise of the real world. A place where you can come whenever you need a reminder of exactly how much you mean to me.</p>
              <p>Consider this our digital home. I wanted a place to safely keep our memories, to write down our grandest future plans, and most importantly, a place where I can leave my letters to you. I typed every single line of code with you on my mind, hoping it would bring a smile to your beautiful face.</p>
              <p>I love you the most, my princess. Whenever you need me, whenever you miss me, or whenever you just want to feel loved, open one of these letters.</p>
              <div class="interactive-box">
                <button class="feature-btn" onclick="this.innerText='🔓 Sanctuary unlocked'; this.style.backgroundColor='#4ade80';">Tap to unlock my heart 🔒</button>
              </div>`,
    
    sad: `<h2>I am here for you, my love</h2>
          <p>It absolutely shatters my heart to know that you are feeling down right now. I wish more than anything that I could reach straight through this screen, pull you into my arms, and just hold you incredibly tight until the sadness fades away.</p>
          <p>Whatever is weighing so heavily on your mind right now, please remember that your feelings are valid. You are allowed to feel sad, but you never ever have to carry that weight alone. You are the sunshine in my life, but it is perfectly okay if you need to be a little cloudy today. Lean on me. Vent to me. Cry if you need to.</p>
          <p>I am always in your corner, and I will always be your biggest supporter. This sadness is temporary, but my love for you is permanent baby.</p>
          <div class="interactive-box">
            <button class="feature-btn" onclick="this.innerHTML='Hugging you so tight ❤️🤗❤️'; this.style.transform='scale(1.1)';">Receive virtual hug</button>
          </div>`,
    
    sick: `<h2>Rest up, my beautiful girl</h2>
           <p>I hate knowing that you are not feeling well. My instinct is to rush over to you right now. If I could, I would be right there beside your bed, tucking you in, cooking you warm soup, making sure you took your medicine, and gently cuddling you until your fever broke.</p>
           <p>Since I cannot do that physically right now, I need you to promise me you will take care of yourself. Drink plenty of water, actually eat something nutritious, and please get lots of sleep. Put down the college schoolworks for just a little bit, your health is so much more important than any deadline.</p>
           <p>I am thinking about you constantly. Please text me updates when you wake up. I love you, get well soon darling.</p>
           <div class="interactive-box" id="sick-box" style="text-align: left; padding: 25px;">
                <p style="font-weight:bold; color:var(--primary-purple); text-align: center; font-size: 1.1rem; margin-top: 0;">My care checklist for you</p>
                <label style="display:flex; align-items: center; gap:10px; margin-bottom:12px; cursor: pointer; transition: 0.3s;" onclick="this.style.opacity = this.querySelector('input').checked ? '0.5' : '1'">
                    <input type="checkbox" onchange="checkSick()" style="width: 20px; height: 20px; accent-color: var(--primary-purple);"> Drink a glass of warm water 💧
                </label>
                <label style="display:flex; align-items: center; gap:10px; margin-bottom:12px; cursor: pointer; transition: 0.3s;" onclick="this.style.opacity = this.querySelector('input').checked ? '0.5' : '1'">
                    <input type="checkbox" onchange="checkSick()" style="width: 20px; height: 20px; accent-color: var(--primary-purple);"> Take your medicine sweetheart 💊
                </label>
                <label style="display:flex; align-items: center; gap:10px; margin-bottom:12px; cursor: pointer; transition: 0.3s;" onclick="this.style.opacity = this.querySelector('input').checked ? '0.5' : '1'">
                    <input type="checkbox" onchange="checkSick()" style="width: 20px; height: 20px; accent-color: var(--primary-purple);"> Get comfortable under the blankets 🛌
                </label>
                <p id="sick-reward" style="opacity:0; transform: translateY(10px); transition:0.5s ease; color:var(--accent-green); font-weight:bold; text-align: center; margin-top:20px; margin-bottom: 0;">Good girl. I am so proud of you for taking care of yourself baby.</p>
           </div>`,
    
    stressed: `<h2>Breathe, my gorgeous girl</h2>
               <p>I know the weight of college feels incredibly heavy on your shoulders right now. You have so many schoolworks, so many requirements, and so many expectations to meet. I know there are times you just want to drop it all and give up.</p>
               <p>But I also know exactly who you are. You are the same girl who flawlessly took on massive responsibilities and handled them beautifully. You are the smartest, most dedicated, and most hardworking person I know. It is okay to complain, and it is okay to feel overwhelmed, you are just going to vent to me, figure it out, and conquer it anyway, because that is the amazing woman you are.</p>
               <p>I am so endlessly proud of you sweetie. Stop thinking about the stress for just one minute. Focus on the circle below, sync your breathing with it, and remember that I believe in you.</p>
               <div class="interactive-box">
                    <p style="color:var(--text-main); font-size: 0.9rem; font-style: italic; margin-top: 0;">This is a four seven eight breathing exercise designed to calm your nervous system darling.</p>
                    <div class="breathe-circle" id="breathe-circle" onclick="startBreathing()">TAP</div>
                    <p id="breathe-instruction" style="font-weight:bold; color:var(--primary-purple); font-size: 1.1rem; height: 1.5rem; margin-bottom: 0;">Tap the circle to start</p>
               </div>`,
    
    overthinking: `<h2>Quiet your beautiful mind</h2>
                   <p>Stop overthinking, baby. Take a slow, deep breath. Whatever negative thoughts are swirling around in your head right now, I am here to tell you that they are simply not true. Your mind is playing tricks on you.</p>
                   <p>You are more than enough. You are doing great. And most importantly, my feelings for you are absolute and unwavering. You do not need to doubt yourself, and you definitely do not need to doubt us. Every single day, I choose you. I keep choosing you, and I will always choose you.</p>
                   <p>I am not going anywhere. My heart is completely and utterly yours. Let go of the worries, and let me love you.</p>
                   <div class="interactive-box" style="position:relative; height: 160px; overflow: hidden;" id="bubble-container">
                        <button class="feature-btn" onclick="spawnBadThoughts()" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0; width: 200px;">Reveal bad thoughts</button>
                   </div>`,
    
    insecure: `<h2>You are perfectly gorgeous</h2>
               <p>Whenever you feel insecure, I desperately wish you could borrow my eyes for just one second so you could see how truly breathtaking you are. I remember looking at that old ID picture of yours and thinking how much I preferred your natural looks over any edit or filter.</p>
               <p>You do not need filters. You do not need makeup. You are naturally and effortlessly gorgeous. Your smile is my absolute favorite sight in the world, and your eyes hold so much warmth. Never ever doubt your own beauty, inside and out.</p>
               <p>You are the most beautiful girl I have ever laid my eyes on, and I am the luckiest guy to be able to call you mine, my pretty baby.</p>
               <div class="interactive-box">
                    <div id="mirror-surface" style="width:100%; height:120px; background: rgba(255,255,255,0.95); backdrop-filter: blur(15px); border-radius:10px; box-shadow: inset 0 0 20px rgba(255,255,255,0.8); border: 2px solid rgba(255,255,255,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; color: #888; font-style: italic; transition: 1s ease;" onclick="this.style.background='transparent'; this.style.backdropFilter='none'; this.style.boxShadow='none'; this.style.border='2px dashed var(--primary-purple)'; this.innerHTML='<span style=\\'color:var(--primary-purple); font-weight:bold; font-size:1.1rem; font-style: normal;\\'>You are the most beautiful girl in the world princess ✨</span>'">Tap to wipe the foggy mirror 🪞</div>
               </div>`,
    
    nosleep: `<h2>Close your eyes, cutie</h2>
              <p>Cannot sleep. Me neither, probably, because I am usually awake just thinking about you. If you are tossing and turning in bed right now, I want you to clear your mind and think back to a sweet memory, like the night of our JS Prom.</p>
              <p>It was past midnight. I was standing near the exit, feeling so incredibly sleepy, but my heart was racing uncontrollably because of the thought of confessing to you. The adrenaline of liking you kept me wide awake. Now, think about the comfort we share today. Imagine my hand holding yours right now. Imagine my voice gently telling you how much I love you.</p>
              <p>Let those peaceful thoughts comfort you my precious. The world can wait until tomorrow. For now, just drift off to sleep, sweetheart.</p>
              <div class="interactive-box">
                    <button class="feature-btn" onclick="document.getElementById('modal-box').style.background='#110e2c'; document.getElementById('modal-box').style.color='#fff'; this.innerText='Shhh sleep now 🌙';">Turn off the lights 💡</button>
              </div>`,
    
    raining: `<h2>Listen to the rain</h2>
              <p>It is raining outside, and the very first thing I thought of was you. I know how much you absolutely love the rain. I know you are a true pluviophile who finds so much peace in the sound of it, and who secretly loves to go out and just take a shower in the downpour.</p>
              <p>If you decide to go out and play in the rain today, please have the best time ever. Feel the water, laugh, and be carefree. But you have to promise me you will keep yourself warm and dry off immediately afterward so you do not get a cold sweetheart.</p>
              <p>Enjoy the cozy weather, my love. Think of the rain as the sky giving the earth a gentle hug, just like I want to hug you right now.</p>
              <div class="interactive-box">
                    <button class="feature-btn" onclick="document.getElementById('rain-drop').innerText='🌷'; this.innerText='You make flowers grow'; startRain();">Catch a raindrop 💧</button>
                    <div id="rain-drop" style="font-size:3rem; margin-top:10px;"></div>
              </div>`,
    
    bored: `<h2>Let us do something together</h2>
            <p>If you are bored enough that you are reading this letter, you better go to our chat and message me right now. Let us do something fun. Let us play a match of Mobile Legends, and yes, I will fully swallow my pride and let my princess carry me again, because you are amazing at it.</p>
            <p>Or if you do not want to game, let us find a movie to watch at the exact same time, or jump on a call and just talk for hours until our boredom completely disappears. Honestly, you are my favorite person to do absolutely nothing with. Even the most boring moments are fun when I am sharing them with you solace.</p>
            <p>While you wait for me to reply to your text, here is a terribly cheesy dad joke to pass the time.</p>
            <div class="interactive-box">
                <p id="joke-text" style="font-style:italic; min-height: 40px; padding: 0 10px;">Click the button below</p>
                <button class="feature-btn" onclick="getJoke()">Generate dad joke 🎲</button>
            </div>`,
    
    laugh: `<h2>Smile for me</h2>
            <p>I wanted to write you a letter just to make you smile, so I thought I would remind you of one of my most embarrassing moments. Do you remember that time in class when I was caught taking a picture of you.</p>
            <p>I totally panicked. My heart dropped, and I quickly tried to play it off and let everyone think I was taking a picture of someone else just so I would not get caught admiring you. So smooth right.</p>
            <p>The truth is, you were the only one I ever had my eyes on back then, and you are still the only one I have my eyes on today. I love your laugh, and I hope remembering my panic brought a beautiful smile to your face babe.</p>
            <div class="interactive-box">
                <button class="feature-btn" onclick="this.innerText='Hehe I love your smile 🥰'">Tap to reveal a secret</button>
            </div>`,
    
    mad: `<h2>I am so incredibly sorry, my sweetest</h2>
          <p>I know I messed up. If you are reading this envelope, it means you are genuinely upset with me, and I absolutely hate knowing that I am the cause of your frustration or sadness. I can be a bit of a mess sometimes, and I know I make mistakes.</p>
          <p>But please, beneath the anger, remember how much I value us. You are still, and always will be, my favorite person in the entire world. I want to fix this. I want to communicate and make it right.</p>
          <p>Take all the time and space you need to feel your emotions. But when you are ready, please let me know. Can we get something to eat, or jump on a call so I can apologize to you properly darling.</p>
          <div class="interactive-box">
                <p style="font-weight:bold; color:var(--primary-purple); margin-bottom: 5px;">Forgiveness meter</p>
                <input type="range" min="0" max="100" value="0" class="forgive-slider" oninput="updateForgiveness(this.value)">
                <p id="forgive-text" style="font-weight:bold; color:var(--primary-purple); font-size: 1.2rem; margin-top: 5px;">0%</p>
          </div>`,
    
    missme: `<h2>I miss you so much more</h2>
             <p>If you are reading this, I guarantee with absolute certainty that I am wishing I was with you right now too. I miss hearing your voice, I miss your laugh, and I just miss the comfort of having you near me.</p>
             <p>Whenever we are apart, a piece of me feels like it is missing. I cannot wait until the day when we do not have to say goodbye, and we can just go home together.</p>
             <p>Here are a few of my absolute favorite memories of us to look at until I can finally see you again. Your smile in these pictures is what gets me through the days we are apart, my precious.</p>
             <div class="mini-gallery"><img src="assets/images/first.jpg" alt="Memory"><img src="assets/images/artwork.jpg" alt="Memory"></div>`,
    
    hugskisses: `<h2>Incoming affection</h2>
                 <p>Consider this digital envelope a massive, tight, incredibly warm hug and a hundred gentle kisses delivered straight from my heart to you.</p>
                 <p>Wrap your arms around yourself for just a second, close your eyes, and pretend it is me holding you. I love the way you fit perfectly in my arms, and I cannot wait to give you real hugs and real kisses the next time I see you.</p>
                 <p>You deserve all the affection in the world, and I promise to spend my life giving it to you baby.</p>
                 <div class="interactive-box">
                    <button class="feature-btn" onclick="document.getElementById('kiss-box').innerText += '💋 '">Tap for kisses</button>
                    <div id="kiss-box" style="font-size:1.5rem; line-height:1.5; padding: 10px;"></div>
                 </div>`,
    
    happy: `<h2>Keep shining baby</h2>
            <p>Seeing you genuinely happy is legitimately my favorite thing in the entire world. Your happiness is so contagious, when you smile, it lights up my life just as much as it lights up yours.</p>
            <p>Whatever happened today to make you open this envelope and smile, I am so glad it occurred. I hope it happens a million more times. You have such a pure, beautiful soul, and you deserve a lifetime of unbothered, pure joy.</p>
            <p>I plan on providing as much of that joy as humanly possible. Keep glowing, my love.</p>
            <div class="interactive-box">
                <button class="feature-btn" onclick="document.getElementById('confetti-box').innerText += '🎉🎊✨ '">Celebrate 🥳</button>
                <div id="confetti-box" style="font-size:1.5rem; line-height:1.5; padding: 10px;"></div>
            </div>`,
    
    nostalgic: `<h2>Remember when</h2>
                <p>Take a trip down memory lane with me. Do you remember when we were younger and used to switch classrooms for every single subject. Do you remember the chaos and the fun of our overnight science project at your house, staying up late and bonding.</p>
                <p>Most importantly, do you remember the JS Prom. The Rigodon. I remember finally gathering the courage to ask you, and the feeling of holding your hands during the waltz is something I will never ever forget.</p>
                <p>We have come so incredibly far since those early days baby. Now we are navigating college together. Every single memory we have made is etched permanently into my heart. I cherish our past just as much as I look forward to our future, darling.</p>
                <div class="interactive-box">
                    <button class="feature-btn" onclick="this.innerText='Rewinding time ⏳ back to the start'">Time machine 🕰️</button>
                </div>`,
    
    loveletter: `<h2>My favorite person</h2>
                 <p>From the moment you caught my attention back when we were younger, you have completely captured my heart. Every step we take together just makes me fall for you all over again.</p>
                 <p>I love everything about you. I love your hardworking drive that pushes you to excel in your college studies. I love your chatty, carefree personality that makes every conversation effortless. I love the way you carry me in our games, and I am absolutely captivated by your breathtaking, natural smile.</p>
                 <p>You are the woman of my dreams, my gorgeous girl. There is no one else I would rather navigate this life with. I am so lucky to be the man who gets to love you lovey.</p>
                 <div class="interactive-box">
                    <button class="feature-btn" onclick="this.innerText='P.S. You are the best thing that ever happened to me'">Reveal postscript ✍️</button>
                 </div>`,
    
    loveyou: `<h2>More than words</h2>
              <p>I love you more than the thousands of lines of HTML and CSS written to build this sanctuary. I love you more than the late nights we spend staying up talking about our days, our worries, and our dreams.</p>
              <p>The truth is, there are simply not enough words to express how deeply I feel for you. You are my everything. You are my partner, my best friend, my peace in a chaotic world, and my entire future.</p>
              <p>I will spend the rest of my life showing you just how deeply and unconditionally I love you baby.</p>
              <div class="interactive-box">
                <p id="love-meter" style="font-weight:bold; color:var(--primary-purple);">I love you...</p>
                <button class="feature-btn" onclick="document.getElementById('love-meter').innerText += ' and more...'">How much ❤️</button>
              </div>`,
    
    birthday: `<h2>Happy birthday, my pretty baby 🎂</h2>
               <p>Another year older, even more beautiful, and another year I get the absolute privilege of celebrating your life. Do you remember our first dance at the JS Prom when I was so incredibly nervous that I just blurted out that I liked you, happy birthday.</p>
               <p>Looking back, it was silly, but it was honest. Well, I am not that nervous boy anymore. Now, I can stand in front of you and say it clearly, confidently, and proudly, I love you so much, my pretty baby. You are the greatest gift this world has ever given me.</p>
               <p>Let us make today incredibly special. You deserve all the attention, all the love, and definitely all the cake cutie.</p>
               <div class="interactive-box">
                    <div id="candle" style="font-size:4rem; cursor:pointer;" onclick="this.innerText='💨🎂 Yay happy birthday'">🕯️</div>
                    <p>Tap the candle to blow it out</p>
               </div>`,

    anniversary: `<h2>Happy anniversary lovey 🎉</h2>
                  <p>Every single day with you is a blessing, but today is extra special. March 28 is the day my life fundamentally changed for the better. Thank you for choosing me, for staying by my side through the highs and the lows, and for being the absolute best partner I could ever ask for.</p>
                  <p>We have grown so much together since the day we became official. We have tackled school stress, navigated college, shared countless laughs, and built a foundation of trust that I cherish. I cannot wait to see where the next year takes us.</p>
                  <p>Here is to many more years, millions of more memories, and an entire lifetime of love my beautiful princess.</p>
                  <div class="interactive-box">
                    <button class="feature-btn" onclick="this.innerText='🥂 Cheers to us my love'">Pop the champagne 🍾</button>
                  </div>`,
    
    graduated: `<h2>We finally did it 🎓</h2>
                <p>All those seemingly endless college schoolworks, all those late night requirements that kept us awake, all the times you stressed out and wanted to cry but pushed through anyway, it all finally paid off. We made it to the finish line.</p>
                <p>I am so incredibly proud of you, my love. You worked so hard for this moment. Your dedication and intelligence inspire me every day. You deserve every bit of celebration and praise right now.</p>
                <p>I cannot wait to stand beside you as we close this academic chapter and open the next exciting chapter of our lives together darling.</p>
                <div class="interactive-box">
                    <div id="cap" style="font-size:4rem; transition: transform 1s ease-out; cursor:pointer;" onclick="this.style.transform='translateY(-100px) rotate(360deg)'">🎓</div>
                    <p>Tap to toss the cap</p>
                </div>`,
    
    future: `<h2>Thinking of our future 🔮</h2>
             <p>I spend so much of my time just dreaming about our future. I close my eyes and I can already see you succeeding in whatever path you choose. Whether you follow the profession your family envisions for you, or you discover a completely different dream of your own, I am going to be right there cheering you on.</p>
             <p>I also dream about the life we will build when the studying is done. I cannot wait to build a home with you, to travel the world with you, to grow old with you, and to check off every single item on our bucket list.</p>
             <p>The future is so incredibly bright, simply because you are going to be in it with me lovey.</p>
             <div class="interactive-box">
                <button class="feature-btn" onclick="readFuture()">Look into the crystal ball 🔮</button>
                <p id="future-text" style="font-style:italic; color:var(--primary-purple); font-weight:bold; padding: 0 10px; margin-bottom: 0;"></p>
             </div>`,
    
    engaged: `<h2>My beautiful fiancée 💍</h2>
              <p>If you are opening this envelope, it means the day has finally come. I finally put a ring on that finger. We are really going to spend the rest of our lives together.</p>
              <p>I keep thinking about the younger version of me who liked you but was too scared to hand you a confession letter. If he knew that one day he would be engaged to you, he would probably faint from absolute happiness right on the spot.</p>
              <p>I am the luckiest man alive. I cannot wait to plan our wedding, but more importantly, I cannot wait for the day I finally get to call you my wife baby.</p>
              <div class="interactive-box">
                    <button class="feature-btn" onclick="document.getElementById('ring').style.textShadow='0 0 20px gold'; this.innerText='So shiny ✨'">Polish the ring</button>
                    <div id="ring" style="font-size:4rem; margin-top:10px;">💍</div>
              </div>`,
    
    weddingday: `<h2>Today is the day ⛪</h2>
                 <p>Take a deep breath, my beautiful bride. Today, all our dreams finally come true. As you read this, I am waiting for you at the end of the aisle. My heart is racing, but this time it is because I am about to marry my soulmate.</p>
                 <p>I already know you look more gorgeous than you ever have in your entire life. Do not be nervous. We are just a few steps away from forever. Walk toward me, take my hand, and let us start the rest of our lives.</p>
                 <p>I love you, and I am so entirely ready to marry you lovey.</p>
                 <div class="interactive-box">
                    <button class="feature-btn" onclick="this.innerText='🔔 DING DONG 🔔'">Ring the wedding bells</button>
                 </div>`,
    
    married: `<h2>Hello, wife 🥂</h2>
              <p>We did it. We are officially married. The boy who nervously stumbled through his words when we were younger is now your husband. I am crying happy tears just typing this.</p>
              <p>This is my official vow to you, I promise to be the best husband I can possibly be. I promise to protect you, to provide for you, to listen to you, to carry you in our games, and to love you unconditionally for all the days of my life.</p>
              <p>I love you so much, Mrs. Let us go enjoy our honeymoon baby.</p>
              <div class="interactive-box">
                    <button class="feature-btn" onclick="this.innerText='👰‍♀️💋🤵'">You may kiss the bride</button>
              </div>`,
    
    house: `<h2>Welcome home 🏡</h2>
            <p>We finally have our own place. Do you realize what this means. No more just hanging out at milk tea shops, no more having to say goodbye at the end of the night, and no more relying only on this digital sanctuary to feel close.</p>
            <p>We have our very own physical sanctuary in the real world now. I cannot wait to cook in our kitchen together, to decorate the living room with our pictures, and maybe even plant some real purple tulips in the front yard.</p>
            <p>Here is to a lifetime of beautiful memories under our own roof lovey.</p>
            <div class="interactive-box">
                <button class="feature-btn" onclick="document.getElementById('modal-box').style.background='#fef08a'; this.innerText='Welcome home 💛';">Turn on the lights 💡</button>
            </div>`,
    
    travel: `<h2>Adventure awaits ✈️</h2>
             <p>Pack your bags, baby. We are officially checking off travel around the world from our bucket list. I am so incredibly excited to explore new places, eat amazing food, and intentionally get lost in a new city with you by my side.</p>
             <p>Make sure your phone has storage, because I want you to take lots of pictures. I know how much you love the camera, and honestly, I love taking pictures of you enjoying life.</p>
             <p>Let us forget about the stress of back home and enjoy every single second of this trip together lovey.</p>
             <div class="interactive-box">
                <button class="feature-btn" onclick="this.innerHTML='<span style=\\'color:green; border: 2px solid green; padding: 5px;\\'>APPROVED ✈️</span>'">Stamp passport 🎫</button>
             </div>`
};

// --- 2. MODAL LOGIC ---
const modal = document.getElementById('letterModal');
const modalBody = document.getElementById('modal-body');
const modalBox = document.getElementById('modal-box'); 

function openLetter(type) {
    modalBox.style.background = '#fffdf5';
    modalBox.style.color = '#444';
    modalBox.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
    
    // If breathing was active, stop it
    if(breathingInterval) clearInterval(breathingInterval);
    clearTimeout(breathingTimeout1);
    clearTimeout(breathingTimeout2);
    document.getElementById('rain-container').innerHTML = '';

    modalBody.innerHTML = letters[type];
    markOpened(type);
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeLetter(e) {
    if(e) e.stopPropagation();
    modal.classList.remove('active');
    
    if(breathingInterval) clearInterval(breathingInterval);
    clearTimeout(breathingTimeout1);
    clearTimeout(breathingTimeout2);
    document.getElementById('rain-container').innerHTML = '';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// --- 3. SCROLL ANIMATION FOR ENVELOPES ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, (index % 5) * 100); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.envelope-card').forEach(card => {
    observer.observe(card);
});

// --- 4. REMEMBER WHICH LETTERS SHE HAS OPENED (small ✓ on the envelope) ---
function getOpened() {
    try { return JSON.parse(localStorage.getItem('openedLetters')) || []; } catch (e) { return []; }
}
function markOpened(type) {
    const opened = getOpened();
    if (!opened.includes(type)) opened.push(type);
    try { localStorage.setItem('openedLetters', JSON.stringify(opened)); } catch (e) {}
    showOpened();
}
function showOpened() {
    const opened = getOpened();
    document.querySelectorAll('.envelope-card').forEach(card => {
        const type = (card.getAttribute('onclick').match(/'(.+?)'/) || [])[1];
        card.classList.toggle('opened', opened.includes(type));
    });
}
showOpened();

// Keyboard: Enter opens an envelope, Escape closes the letter
document.querySelectorAll('.envelope-card').forEach(card => {
    card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeLetter(e);
});
