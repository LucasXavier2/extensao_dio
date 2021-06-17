var speedControlButton = `
<button onclick='openSpeedMenu()' class="media-control-button media-control-icon" data-playback-rate-button="">1x</button>
`
var speedOptions = `<li onClick="changeVideoSpeed(0.5)">0.5x</li>  
<li onClick="changeVideoSpeed(1)">1x</li>
<li onClick="changeVideoSpeed(1.25)">1.25x</li>
<li onClick="changeVideoSpeed(1.5)">1.5x</li>
<li onClick="changeVideoSpeed(1.75)">1.75x</li>
<li onClick="changeVideoSpeed(2.0)">2.0x</li>
`

let playerCSS = `
    .speed-control {
        background: rgba(0,0,0,.8) !important;
        display: none;
        border: 0 !important;
        color: #CCCCCC;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
        width: 100px !important;
        text-align: left;
	}
    
    .speed-control li:hover {
        background: rgba(255,255,255,0.06);
    }

    .speed-control li {
        padding: 0 10px !important;
        font-size: 14px !important;
        padding-left: 20px !important;
    }


	.bar-background {
		height: 2px !important;
		width: 98% !important;
	}

	.bar-scrubber-icon {
		top: 7px !important;
		background-color: #fa962a !important;
		box-shadow: 0 0 0 0px rgb(250 150 42) !important;
        width: 9px !important;
        height: 9px !important;
	}

	.bar-scrubber-icon:hover {
		box-shadow: 0 0 0 2px rgb(250 150 42) !important;
	}


	.media-control-background {
		height: 15% !important;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.9)) !important;
	}
`

var scriptsToInject = `
function changeVideoSpeed(newSpeed) {
	var playbackRate = newSpeed;
	var data = {event: 'command', func: 'setPlaybackRate', args: [playbackRate, true]};
	var message = JSON.stringify(data);
	document.getElementsByTagName("iframe")[0].contentWindow.postMessage(message, '*');

    document.getElementsByClassName('speed-control')[0].style.display = 'none'

    document.getElementById('speed-button').innerText = newSpeed + 'x'; //atualiza o valor da velocidade corrente
}

function openSpeedMenu() {
	if (document.getElementsByClassName('speed-control')[0].style.display == 'none') {
		document.getElementsByClassName('speed-control')[0].style.display = 'block';
	} else {
		document.getElementsByClassName('speed-control')[0].style.display = 'none';
	}
}
`

let sidebarCSS = `
.container.learning-container .track-lessons .card .card-header {
    border: 0 !important;
    background: #1d222c;
}

.container.learning-container .row {
    padding-left: 3px;
}

/* cor de fundo do quizz */
.quiz-content.card {
    background: white !important;
}

/* Cor do fundo da página e barra lateral */
.container.learning-container {
    background: rgba(0,0,0,1) !important;
}

.card {
    background-color: rgba(0,0,0,0) !important;
}

.card-header {
	border: 0 !important;
}

.card-body {
	border-bottom: 0 !important;
    margin-bottom: 10px !important;
}


.lesson-title .row {
	align-items: center !important;
}

.container-number {
	display: flex !important;
	justify-content: center !important;
}

.container-icon {
	display: flex !important;
}


ul.timeline.list-group span {
	font-size: 12.6px !important;
	font-family: 'Open Sans', sans-serif !important; 
}


.item-link {
	border-radius: 10px !important;
	margin: 3px !important;
}

i {
	background: rgba(0,0,0,0) !important;
}

.mb-0 {
	backgorund: rgba(0,0,0,0) !important;
}

#track-lessons {
	padding: 20px 20px 20px 20px !important;
	background: rgba(0,0,0,0) !important;
}


.container.lab-container .lesson-content .lesson-text {
    background: #fff !important;
}


/* width */
::-webkit-scrollbar {
  width: 14px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ccc;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;

function injectOpenSansFont() {
    let googleFonts1 = document.createElement('link');
    googleFonts1.setAttribute('rel', 'preconnect');
    googleFonts1.setAttribute('href', 'https://fonts.gstatic.com');
    
    let googleFonts2 = document.createElement('link');
    googleFonts2.setAttribute('rel', 'stylesheet');
    googleFonts2.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    
    document.getElementsByTagName('head')[0].appendChild(googleFonts1);
    document.getElementsByTagName('head')[0].appendChild(googleFonts2);
}

function injectStyle(cssRules) {
    let newStyle = document.createElement('style');
    newStyle.innerHTML = cssRules;
    document.getElementsByTagName('body')[0].appendChild(newStyle);
}

function injectSpeedControl() {
    if (document.getElementsByClassName('playback_rate')[0] == undefined) {

        let controlScripts = document.createElement('script');
        controlScripts.innerHTML = scriptsToInject;
        controlScripts.setAttribute('type', 'text/javascript');
        document.getElementsByTagName('body')[0].appendChild(controlScripts);

        let control = document.createElement('div');
        control.className = 'playback_rate'
        control.setAttribute('data-playback-rate-select', '');
        
        let speedButton = document.createElement('button');
        speedButton.className = 'media-control-button media-control-icon'
        speedButton.setAttribute('onclick', 'openSpeedMenu()');
        speedButton.setAttribute('data-playback-rate-button', '');
        speedButton.setAttribute('id', 'speed-button');
        speedButton.innerText = '1x';

        let speedList = document.createElement('ul');
        speedList.className = 'speed-control';
        speedList.setAttribute('style', 'display:none;');
        speedList.innerHTML = speedOptions;

        control.appendChild(speedButton);
        control.appendChild(speedList);

        document.getElementsByClassName('media-control-right-panel')[0].appendChild(control);
        injectStyle(playerCSS);
        
        //segunda parte do estilo do player
        let playerEstilo2 = document.createElement('style');
        playerEstilo2.className = 'clappr-style'
        playerEstilo2.innerHTML = 'button[data-playback-rate-button]{white-space:nowrap}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select]{float:right;margin-top:5px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] button.media-control-button.media-control-icon{font-family:Roboto,"Open Sans",Arial,sans-serif;-webkit-font-smoothing:antialiased;font-size:12px;cursor:pointer;padding-top:10px;margin-right:10px}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] button.media-control-button.media-control-icon:hover{color:#c9c9c9}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] button.media-control-button.media-control-icon.changing{-webkit-animation:pulse 0.5s infinite alternate}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select]>ul{display:none;list-style-type:none;position:absolute;bottom:25px;border:1px solid black;border-radius:4px;background-color:rgba(0,0,0,0.7)}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li{position:relative;font-size:12px}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li[data-title]{padding:5px}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a{color:#aaa;padding:2px 10px 2px 15px;display:block;text-decoration:none}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a.active{background-color:#000;font-weight:bold;color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a.active:before{content:"\2713";position:absolute;top:2px;left:4px}.media-control[data-media-control] .media-control-layer[data-controls] .playback_rate[data-playback-rate-select] li a:hover{color:#fff;text-decoration:none}@-webkit-keyframes pulse{0%{color:#fff}50%{color:#ff0101}100%{color:#B80000}}';
        document.getElementsByTagName('body')[0].appendChild(playerEstilo2);
    }
}

injectStyle(sidebarCSS);
injectOpenSansFont();


let observer;
let url = location.href;

document.body.addEventListener('click', ()=>{
	requestAnimationFrame(()=>{
        if (url !== location.href && isClassPage()) {
            // console.log('url changed');
            watchForPlayerAndInjectSpeedControl();
            url = location.href;
        }
    })
}, true);


function isClassPage() {
    let route = location.pathname.split('/')[1];
    if (route === 'course' || route === 'lab' || route === 'project') return true;
    return false;
}

function watchForPlayerAndInjectSpeedControl() {
    observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!mutation.addedNodes) return
            
            mutation.addedNodes.forEach(node => {
                if (typeof(node) === 'object' && node.tagName === 'DIV' && node.classList[0] === 'media-control-layer') {
                    observer.disconnect()
                    injectSpeedControl();
                }
            })
        })
    })

    observer.observe(document.body, {
        childList: true, 
        subtree: true, 
        attributes: false,
        characterData: false
    })
}


let firstAccess = true;
if (firstAccess) {
    firstAccess = false;
    if (isClassPage()) {
        watchForPlayerAndInjectSpeedControl();
    }
}