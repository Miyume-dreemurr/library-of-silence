// script.js - Story Books: 10 pages per book with individual titles, glowing animations, full reader experience

(function() {
    "use strict";

    // ----- DOM Elements -----
    const modal = document.getElementById('storyModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalCloseFooter = document.getElementById('modalCloseFooter');

    // ========== PAGE VIEWER SYSTEM (10 pages per book) ==========
    // Create page viewer overlay
    const pageViewer = document.createElement('div');
    pageViewer.className = 'page-viewer';
    pageViewer.id = 'pageViewer';
    pageViewer.innerHTML = `
        <button class="close-page-viewer" id="closePageViewer">✕</button>
        <div class="page-container" id="pageContainer">
            <div class="page-header">
                <span class="page-book-title" id="pageBookTitle">Book Title</span>
                <span class="page-book-sub"></span>
            </div>
            <div class="page-nav">
                <button id="prevPageBtn" class="read-btn">◀ PREV</button>
                <span class="page-indicator" id="pageIndicator">Page 1 / 10</span>
                <button id="nextPageBtn" class="read-btn">NEXT ▶</button>
            </div>
            <h2 class="page-title" id="pageTitle">Page Title</h2>
            <div class="page-content" id="pageContent"></div>
            <div class="page-nav" style="margin-top: 1rem;">
                <button id="closePageFooter" class="read-btn">CLOSE BOOK</button>
            </div>
        </div>
    `;
    document.body.appendChild(pageViewer);

    const pageViewerElem = document.getElementById('pageViewer');
    const closePageViewer = document.getElementById('closePageViewer');
    const closePageFooter = document.getElementById('closePageFooter');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    const pageTitle = document.getElementById('pageTitle');
    const pageContent = document.getElementById('pageContent');
    const pageBookTitle = document.getElementById('pageBookTitle');

    // ----- 10 PAGES PER BOOK with individual titles and content -----
    // Book of Feelings - 10 pages
    const feelingsPages = [
        { title: "The begining", content: "I was born in a normal family, which I thought from the beginning was all normal. All I remember right now is how we got to the hospital to take my blood when I was a child; other memories I don't really remember." },
        { title: "The change", content: "A few years later, my father broke up with my mother and left us alone, so I grew up almost all the years with my mother and her parents. With my father's family, I was not talking at all and didn't want to." },
        { title: "First death?", content: "I was around 5 or 6 years old; I don’t really remember my exact age. However, I clearly recall being with my grandmother at someone's funeral. I was told not to cry, and I didn't understand what was happening and why. I vividly remember watching as they buried a deceased woman, who I think was a friend of my grandmother's or something like that." },
        { title: "Memory gap...", content: "My biggest memory gap is kindergarten. I don't really remember anything except pain and a bit of happiness from it... I really want to know what happened during this period of time that makes me feel it when I try to remember it." },
        { title: "The first train to the sea to relax.", content: "The first time we went to the sea in a train... and when I was with my mother, she told me that my cat had died... and she lied to me that he had run away so I wouldn't be sad... I cried a bit because we were on the train and other people might complain if I cried loud enough." },
        { title: "The school", content: "I remember that the first 4 years were kind of easy and enjoyable, but of course there were bad parts and bad times and fights... and bad times as well. Can't life always be perfect? It never will be." },
        { title: "The begging of hell...", content: "By begging off 5th grade, my group got merged with another. And for mostly the whole year I was getting bullied. And that's when I started understanding how cruel this world really is and unfair." },
        { title: "Wellcome to social!", content: "Around 6th grade I got into Discord. It seemed cool; I was making friends, day by day improving my English, but in the end I lost all of them. And yes, my bullying in school kept going, nothing else." },
        { title: "New idenity", content: "During 7th grade I decided to do an experiment; I started acting like a girl in Discord to see how actually hard or easy it is to be a girl. You can't really understand it without getting in the role, and at this moment my English was decent." },
        { title: "The end of hell", content: "After all these years of school suffering, we reached the end, 9th grade, when I graduated and ended school and finally applied to the college, which is in the future. I got accepted. and bought apartments close to it, but by now I'm just hiding all of my pain under fake happiness, and I'm just helping other people or people on Discord in hard times. Why? Because I was kind, and I always am, I don't want anyone else being alone in a hard time; if I save them from suicide or something like it and help, I just become a bit happy." }
    ];

    // Book of Pain - 10 pages
    const painPages = [
        { title: "Introduction", content: "Well, it seems like you're still reading my books; that's an interesting choice... This book is mostly for painful moments; there will be parts from school and my usual life as well. Sooo yeah, if you want to keep reading, it's your choice; it's not like I can stop you from it. if i say annoying in this book, it means deserver/for bullying" },
        { title: "Close call", content: "From birth, I had a lot of allergies and a lot of things. One day I got really sick; it was between 5th and 6th grade, I think, and it was hard for me to breathe, so I started coughing for air. Lucky I survived somehow. Thank you, my mother, that she was there." },
        { title: "Lost of discord friends", content: "As you know from the first book, I tried to make Discord friends but failed. After that, when I started acting like a girl, I tried again and did. After a long time, I found out that they tried to use me, so yeah, I blocked them all... another fail..." },
        { title: "Lost of hope", content: "After failing for the second time, I kept trying to find new friends, having fun with them playing, and suddenly they all blocked me. Well, without telling me anything, I guess they just don't like me. i kept trying to finding another friends but it's ends up always the same, the hate me or hate me for being annoying and talking to much." },
        { title: "Never giving up", content: "After a long search I found a friend, a girl. I thought from the start we were talking and having a nice time, but slowly I started noticing something suspicious. She started talking too horny and sus, which got me thinking and using my mind, especially when I saw her Twitter and found out she's making Roblox NSFW content, and also she asked me to show my face and do a voice recording, which I have never done. There I started thinking very hard; she never talks, sends her face reveal, and is mostly... being weird all the time. And there I connected all the dots; that might be PDF, who got caught using someone else's voice and face to get verified on some server for 18+, so I collected everything I found and got this person reported to the police and blocked her." },
        { title: "Death is here?", content: "It was a rainy... I was on a bicycle going home from school, and when I was driving, it slipped and fell on me. I was so close to hitting my head on the asphalt, but I got lucky and had to deal only with a cut leg that got hurt almost to the bone. Nowadays it's healed, but the scar is still visible." },
        { title: "Close death call...", content: "During the summer we went to the river to swim and relax. There was a structure for jumping in the water, and it was in the water as well. When I was trying to jump from it with speed, I slipped and fell from it, hitting this jumping shit. My back of the hand was cut, my leg as well. Thank you that I didn't hit this shit with my head." },
        { title: "Enough of me.", content: "One classmate was annoying me, and, mhm, let's just say I made him remember that he shouldn't mess with me. So I punched him a lot, even though some people tried to hold me, so I think he deserved it." },
        { title: "Slowly losing mind", content: "It was during some class; another guy was annoying me, so I took my pencil and hit him so hard that it cut his hand a bit. The teacher just signed and did nothing because she saw that he started it." },
        { title: "Alone and always be", content: "When I got accepted to college and moved to apartments close to it, I was enjoying being alone and at peace, but I started slowly going insane; there was no one to talk to... only myself." }
    ];

    // Book of Emptiness - 10 pages
    const emptinessPages = [
        { title: "Hello my friend", content: "Welcome, welcome. I see you're still reading all of that; very impressive, I'd say. Well, this is the last book, probably the most updated one based on current events that happened around me and what I feel towards this world. I hope you don't enjoy it, because I'm surrounded by idiots that don't know life at all and what I passed through." },
        { title: "Part of happiness", content: "When I moved to college and lived alone, my mother got me a cat after a while. I was, for the first time, happy, finally having someone to play with and talk to, and this was only one thing that kept me from going completely insane during this period of time. But we all know happy times end fast… July 7th… Last time I saw him on the next day, he died… got driven over by some bitchass car driver. I hope that driver dies in the most painful death. And here I am again… back to being insane talking to myself and hoping that world just ends soon, or at least meet her…" },
        { title: "%#46^#^&?", content: "There's a thing that I can't tell anyone… If I do, I will feel like living this day over again… like it's already passed and started again… I don't have dreams when I sleep. Just something else that I can't explain. I know what happens most of the time, and I can't stop… Only just watch. I think I'm going insane; even voices in my head are telling me it. I have all the rights to be a villain, but I don't become one; I'd stay human for my mother and for her. I'd rather die knowing that I was saved from people from dying than become a villain who left world affect him." },
        { title: "Death Le Vaar", content: "Death is a friend of mine. If you're reading this, I don't mind that you count yourself or me as twins. Yes, we do have a few things in common, but you're never going to be my copy, which is great, because I don't want anyone to go through the nightmare that I went through in this life. All I want is life to at least become a bit better or at least be together with my gf." },
        { title: "Learned", content: "Well, I'm almost 18, and I still think that I'm alive after all of that… having tons of allergies, such as to flowers, chicken, cats, bread, unnatural food colors, etc. The list is too big, and yet I'm somehow alive and living. College is not that bad, unlike school. There are people who I'm actually talking and playing with sometimes, which is great, I guess I deserved it." },
        { title: "Birthday", content: "Yay, today is my birthday, but I don't want to celebrate it at all… but Mom wants me to at least sit a bit and eat cake. I guess a bit; we celebrate. I don't want to make her sad. After everything, she gave me growth. and tomorrow coming, Grandpa from Moscow from Dad's family… That sucks. Why do I even have to meet them and talk? I hate all of them." },
        { title: "16 August is crazy", content: "Today is a crazy and funny day. The storm is accusing me of being a PDF. Death finds out what Damian did to me in the past and now has his whole bloodline on strings. Um, I'm with Imagine Cooking Storm. A crazy day is needed. What's going to be next? Idk, but I might publish and end writing these books today, hopefully." },
        { title: "The End Of Story", content: "What day it was, I don't really remember, but all I remember is getting tired of Aoi and having beef with her. Her ego is high; even though I apologize, she acts like she's above everything, saying tons of swear and calling herself an adult. That's pathetic indeed. Just going to forget it for my own good."},
        { title: "After story", content: "Life did become better after I let Aoi go from my world; her dogs are still annoying, though, but now mostly happy times… Now a small time skip… 2 furrballs who love each other and are scared to start relationships… I'm trying to get them together, but one is doing most absurd bullshit and saying tonnes of stuff about Jay. I hope Jay dies. I'm already tired of hearing this name, especially when connected to the past with a person who had the same name. I will always hate enyone with that name, bc of one of them i almost got terminated, stoled my fucking whole project and said it his, and i had to do new one."},
        { title: "Back to the beginning", content: "Here we are back again… After all, I'm insane and crazy, yet still alive while having voices in my head… I could kill myself already if not for her… I live for her and my mother only, not for anyone else. I already understand the world more than enough to get it: that humans are spoiled and ungrateful, even though when you helped them a lot in their hard time, they still did something for you or forgot what you did for them. That's why I forgot what life is like, sadly. I'm tired of helping people irl and online; everyone wants something from me - homework, support, making something, setting something up - but nobody asks how I'm really. All I heard in past years were just swears towards me. No kind words at all… retard… clown… idiot and much, much more… Even a soulless vessel can get tired of life after all."},
    ];

    const booksData = {
        feelings: { title: "Book of Feelings", pages: feelingsPages },
        pain: { title: "Book of Pain", pages: painPages },
        emptiness: { title: "Book of Emptiness", pages: emptinessPages }
    };

    let currentBookId = null;
    let currentPageIndex = 0;
    let currentPages = [];

    // Page viewer functions
    function openPageViewer(bookId) {
        const book = booksData[bookId];
        if (!book) return;
        
        currentBookId = bookId;
        currentPages = book.pages;
        currentPageIndex = 0;
        
        pageBookTitle.textContent = book.title;
        updatePageViewer();
        
        pageViewerElem.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('page-open');
    }
    
    function updatePageViewer() {
        const page = currentPages[currentPageIndex];
        if (!page) return;
        
        pageTitle.textContent = page.title;
        pageContent.textContent = page.content;
        pageIndicator.textContent = `Page ${currentPageIndex + 1} / ${currentPages.length}`;
        
        // Apply monospace style for page content
        pageContent.style.whiteSpace = "pre-wrap";
        pageContent.style.fontFamily = "'Courier New', 'Fira Code', monospace";
        pageContent.style.fontSize = "1rem";
        pageContent.style.lineHeight = "1.7";
    }
    
    function closePageViewerFunc() {
        pageViewerElem.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('page-open');
        currentBookId = null;
        currentPages = [];
        currentPageIndex = 0;
    }
    
    function nextPage() {
        if (currentPages && currentPageIndex < currentPages.length - 1) {
            currentPageIndex++;
            updatePageViewer();
            // subtle animation effect on page change
            pageContent.style.animation = 'none';
            pageContent.offsetHeight;
            pageContent.style.animation = 'fadeSlideUp 0.2s ease-out';
        }
    }
    
    function prevPage() {
        if (currentPages && currentPageIndex > 0) {
            currentPageIndex--;
            updatePageViewer();
            pageContent.style.animation = 'none';
            pageContent.offsetHeight;
            pageContent.style.animation = 'fadeSlideUp 0.2s ease-out';
        }
    }

    // ----- Original Modal System (now modified to open page viewer instead) -----
    // Book data kept for reference but modal now redirects to full book reader
    // We keep the modal for any future use but buttons now open page viewer
    
    // Override: "read excerpt" buttons now open the full 10-page book reader
    function bindBookButtons() {
        const feelingsBtn = document.querySelector('[data-modal="feelings"]');
        const painBtn = document.querySelector('[data-modal="pain"]');
        const emptinessBtn = document.querySelector('[data-modal="emptiness"]');
        
        if (feelingsBtn) {
            feelingsBtn.removeEventListener('click', () => openModal('feelings'));
            feelingsBtn.addEventListener('click', () => openPageViewer('feelings'));
        }
        if (painBtn) {
            painBtn.removeEventListener('click', () => openModal('pain'));
            painBtn.addEventListener('click', () => openPageViewer('pain'));
        }
        if (emptinessBtn) {
            emptinessBtn.removeEventListener('click', () => openModal('emptiness'));
            emptinessBtn.addEventListener('click', () => openPageViewer('emptiness'));
        }
    }
    
    // Keep modal functions but they won't be used by main buttons (keeping for any future need)
    function openModal(bookId) {
        // This is kept but not used by main buttons anymore
        // Modal is now secondary, main action opens full reader
        const book = bookContents[bookId];
        if (!book) return;
        modalTitle.textContent = book.title;
        modalText.textContent = book.excerpt;
        modalText.style.whiteSpace = "pre-wrap";
        modalText.style.fontFamily = "'Courier New', 'Fira Code', monospace";
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
    
    function closeModalHandler() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
    
    function initModalControls() {
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalHandler);
        if (modalCloseFooter) modalCloseFooter.addEventListener('click', closeModalHandler);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModalHandler();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                closeModalHandler();
            }
            if (e.key === 'Escape' && pageViewerElem && pageViewerElem.classList.contains('active')) {
                closePageViewerFunc();
            }
        });
    }
    
    // ----- Book data for potential modal (keep for compatibility) -----
    const bookContents = {
        feelings: { title: "Book of Feelings", excerpt: "Open the full book to explore all 10 pages of feelings..." },
        pain: { title: "Book of Pain", excerpt: "Open the full book to read all 10 pages of pain and healing..." },
        emptiness: { title: "Book of Emptiness", excerpt: "Open the full book to journey through all 10 pages of emptiness..." }
    };
    
    // ========== GLOWING & ANIMATION EFFECTS (preserved from original) ==========
    function addGlowAnimations() {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            .book-card {
                position: relative;
                transition: transform 0.25s ease, border-color 0.2s, box-shadow 0.3s;
                will-change: transform;
            }
            .book-card:hover {
                box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.2), 0 0 3px 0 rgba(255,255,255,0.4);
                border-color: rgba(255,255,255,0.7);
            }
            .book-card:not(.coming-card) {
                animation: subtleBreathing 4s infinite ease-in-out;
            }
            @keyframes subtleBreathing {
                0% { box-shadow: 0 0 0px 0 rgba(255, 255, 255, 0); border-color: #2c2c2c; }
                50% { box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.12); border-color: #4a4a4a; }
                100% { box-shadow: 0 0 0px 0 rgba(255, 255, 255, 0); border-color: #2c2c2c; }
            }
            .book-card:not(.coming-card):hover {
                animation: intenseGlowPulse 0.8s infinite alternate, softShake 0.3s ease-in-out 1;
                border-color: #ffffff;
                box-shadow: 0 0 20px 2px rgba(255,255,255,0.3);
            }
            @keyframes intenseGlowPulse {
                0% { box-shadow: 0 0 5px 0 rgba(255,255,255,0.2); border-color: #aaa; }
                100% { box-shadow: 0 0 22px 4px rgba(255,255,255,0.5); border-color: #ffffff; }
            }
            @keyframes softShake {
                0% { transform: translateX(0px); }
                25% { transform: translateX(1px); }
                50% { transform: translateX(-1px); }
                75% { transform: translateX(0.5px); }
                100% { transform: translateX(0px); }
            }
            .read-btn {
                position: relative;
                transition: all 0.2s, box-shadow 0.2s, text-shadow 0.2s;
            }
            .read-btn:hover {
                box-shadow: 0 0 8px 0 rgba(255,255,255,0.6);
                text-shadow: 0 0 3px rgba(0,0,0,0.5);
                background: #ffffff;
                color: #000000;
            }
            .main-title {
                animation: glitchText 5s infinite;
            }
            @keyframes glitchText {
                0%, 100% { text-shadow: none; }
                97% { text-shadow: -1px 0px 1px rgba(255,255,255,0.5), 1px 0px 1px rgba(0,0,0,0.8); }
                98% { text-shadow: 1px 0px 1px rgba(255,255,255,0.4), -1px 0px 1px #000; }
                99% { text-shadow: 0px 0px 3px white; }
            }
            .book-card:hover .book-description {
                color: #f0f0f0;
                text-shadow: 0 0 2px rgba(255,255,255,0.3);
            }
            .page-viewer {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.98);
                backdrop-filter: blur(5px);
                z-index: 2000;
                display: none;
                flex-direction: column;
                overflow-y: auto;
                padding: 1rem;
            }
            .page-viewer.active {
                display: flex;
            }
            .page-container {
                max-width: 800px;
                margin: 2rem auto;
                background: #0a0a0a;
                border: 1px solid #2c2c2c;
                padding: 2rem;
                position: relative;
                animation: fadeSlideUp 0.3s ease-out;
            }
            .close-page-viewer {
                position: fixed;
                top: 1rem;
                right: 1.5rem;
                background: none;
                border: none;
                font-size: 2rem;
                color: white;
                cursor: pointer;
                z-index: 2001;
            }
            .close-page-viewer:hover { color: #aaa; }
            .page-header {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #333;
                padding-bottom: 1rem;
                margin-bottom: 1.5rem;
            }
            .page-book-title { font-size: 1.2rem; color: #aaa; letter-spacing: 2px; }
            .page-nav {
                display: flex;
                gap: 1rem;
                align-items: center;
                justify-content: center;
                margin: 1.5rem 0;
            }
            .page-nav button {
                background: transparent;
                border: 1px solid #555;
                color: white;
                padding: 0.5rem 1.2rem;
                cursor: pointer;
                transition: 0.2s;
            }
            .page-nav button:hover {
                background: white;
                color: black;
                border-color: white;
            }
            .page-indicator { font-size: 0.9rem; color: #bbb; }
            .page-title {
                font-size: 2rem;
                font-weight: 600;
                margin: 1.5rem 0 1rem;
                text-transform: uppercase;
                border-left: 3px solid white;
                padding-left: 1rem;
                color: white;
            }
            .page-content {
                font-size: 1.05rem;
                line-height: 1.7;
                color: #ddd;
                font-family: 'Courier New', monospace;
                margin: 2rem 0;
                white-space: pre-wrap;
            }
            @media (max-width: 700px) {
                .page-container { padding: 1.2rem; margin: 1rem; }
                .page-title { font-size: 1.4rem; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    function enhanceTextStyles() {
        const textEnhance = document.createElement('style');
        textEnhance.textContent = `
            .modal-story-text {
                font-family: 'Menlo', 'Courier New', monospace;
                background: #030303;
                padding: 1rem;
                border-left: 2px solid #3a3a3a;
            }
            .book-title {
                font-weight: 700;
                background: linear-gradient(135deg, #fff 30%, #aaa 80%);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
            }
            .coming-card .book-title {
                background: none;
                color: #777;
            }
        `;
        document.head.appendChild(textEnhance);
    }
    
    function addGlobalAnimationShit() {
        const grainStyle = document.createElement('style');
        grainStyle.textContent = `
            body::before {
                content: "";
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
                background-size: 32px 32px;
                z-index: 9999;
                opacity: 0.2;
            }
            .read-btn:active {
                transform: scale(0.97);
                box-shadow: 0 0 15px white;
            }
        `;
        document.head.appendChild(grainStyle);
    }
    
    // ----- Initialize page viewer controls -----
    function initPageViewerControls() {
        if (closePageViewer) closePageViewer.addEventListener('click', closePageViewerFunc);
        if (closePageFooter) closePageFooter.addEventListener('click', closePageViewerFunc);
        if (prevPageBtn) prevPageBtn.addEventListener('click', prevPage);
        if (nextPageBtn) nextPageBtn.addEventListener('click', nextPage);
    }
    
    // ----- Main initialization -----
    function init() {
        bindBookButtons();
        initModalControls();
        initPageViewerControls();
        addGlowAnimations();
        enhanceTextStyles();
        addGlobalAnimationShit();
        console.log('Story Books — 10 pages per book loaded with full reader & glowing animations');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
