    var answer, operator, n1r1, n2r1, n1r2, n2r2, right, wrong, remember, oral, typeOfSet;

    var seconds = 0,
        minutes = 0,
        hours = 0,
        myTimer;
    var hourglassid = 0;

    var cookie;
    var audio1 = new Audio('well_done.mp3');
    var audio2 = new Audio('on_click_wrong.mp3');
    var audio3 = new Audio("amazing.mp3");
    // var audio4 = new Audio();
    var canvas;
    var context;
    var img;
    var width = 30;
    var height = 54;
    var target = 50;
    var totalTime = 0;
    var bestTime = -1;
    var best = { "50": bestTime };
    var onlyAudio = 0;
    var texttospeech = "";

    function  setCookie(cname, cvalue) {
        localStorage.setItem(cname, cvalue);
    }

    function  getCookie(cname) {   
        return  localStorage.getItem(cname);
    }

    function setTimer() {
        totalTime++;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        document.getElementById("timer").innerHTML = hours + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        myTimer = setTimeout(setTimer, 1000);
    }

    function clearTimer() {
        clearTimeout(myTimer);
        seconds = 0;
        minutes = 0;
        hours = 0;
        totalTime = 0;
    }

    function play() {
        right = 0;
        wrong = 0;
        cookie = 0;
        max = 100;
        remember = 1;
        oral = 0;
        cookie = Number(getCookie("cookie"));

        if (cookie != 1) {
            max = 100;
            operator = "4";
            n1r1 = 0;
            n2r1 = 99;
            n1r2 = 0;
            n2r2 = 99;

            f1r1 = 0;
            f2r1 = 10;
            f1r2 = 0;
            f2r2 = 10;

            remember = 1;
            oral = 0;
            bestTime = -1;
            onlyAudio = 0;
        } else {
            operator = getCookie("operator");
            n1r1 = Number(getCookie("n1r1"));
            n2r1 = Number(getCookie("n2r1"));
            n1r2 = Number(getCookie("n1r2"));
            n2r2 = Number(getCookie("n2r2"));

            f1r1 = Number(getCookie("f1r1"));
            f2r1 = Number(getCookie("f2r1"));
            f1r2 = Number(getCookie("f1r2"));
            f2r2 = Number(getCookie("f2r2"));
            remember = Number(getCookie("remember"));
            max = Number(getCookie("max"));
            oral = Number(getCookie("oral"));

            target = Number(getCookie("target"));
            best = JSON.parse(getCookie("best"));
            if (best != null) {
                bestTime = best["" + target];
            } else {
                best = { "50": bestTime };
            }
            onlyAudio = Number(getCookie("audio"));
        }
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        img = new Image();
        img.src = 'Hour_Glass.png';
        img.onload = function() {
            context.drawImage(img, (height - width) / 2, 0);
        };

        animateHourGlass();
        clearTimer();
        setTimer();

        show();
    }

    function show() {
        document.getElementById("txtOperator").value = operator;
        document.getElementById("txtN1R1").value = n1r1;
        document.getElementById("txtN2R1").value = n2r1;
        document.getElementById("txtN1R2").value = n1r2;
        document.getElementById("txtN2R2").value = n2r2;

        document.getElementById("txtF1R1").value = f1r1;
        document.getElementById("txtF2R1").value = f2r1;
        document.getElementById("txtF1R2").value = f1r2;
        document.getElementById("txtF2R2").value = f2r2;
        document.getElementById("txtMax").value = max;
        document.getElementById("txtTarget").value = target;
        setBestTime();

        if (remember == 1) {
            document.getElementById("r1").checked = true;
        } else if (remember == 2) {
            document.getElementById("r2").checked = true;
        } else {
            document.getElementById("r3").checked = true;
        }


        if (operator == "2") {
            if (getRandomInt(1, 2) == 1) {
                add();
            } else {
                sub();
            }
        } else if (operator == "3") {
            var rnd = getRandomInt(1, 3);
            if (rnd == 1) {
                add();
            } else if (rnd == 2) {
                sub();
            } else {
                multiple();
            }
        } else if (operator == "4") {
            var rnd = getRandomInt(1, 4);
            if (rnd == 1) {
                add();
            } else if (rnd == 2) {
                sub();
            } else if (rnd == 3) {
                multiple();
            } else {
                divide();
            }
        } else if (operator == "+") {
            add();
        } else if (operator == "-") {
            sub();
        } else if (operator == "x") {
            multiple();
        } else if (operator == ":") {
            divide();
        }

        //alert(oral);
        document.getElementById("oral").checked = (oral == 1);
        document.getElementById('answer').value = "";
        document.getElementById("tts").checked = (onlyAudio == 1);
        if (oral == 1) {
            //alert(oral);
            document.getElementById("toggleInput").style.display = "none";
            document.getElementById("toggleOral").style.display = "block";

        } else {
            //alert(oral);
            document.getElementById("toggleInput").style.display = "block";
            document.getElementById("toggleOral").style.display = "none";
            document.getElementById("answer").focus();
        }
        if (onlyAudio == 1) {
            //alert(oral);
            document.getElementById("toggleOperation").style.display = "none";
            document.getElementById("toggleRepeat").style.display = "block";

        } else {
            //alert(oral);
            document.getElementById("toggleOperationsavea").style.display = "block";
            document.getElementById("toggleRepeat").style.display = "none";

        }

    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function add() {
        var opr, opr1, opr2;
        var value1, value2, value3, value4;
        var rmb = remember;
        if (rmb == 3) {
            rmb = getRandomInt(1, 2);
        }
        opr = getRandomInt(1, 2);

        if (opr == 1) {
            if (rmb == 1) {
                do {
                    opr1 = getRandomInt(n1r1, n2r1);
                    opr2 = getRandomInt(n1r2, n2r2);
                } while ((opr1 % 10 + opr2 % 10) >= 10 || opr1 + opr2 >= max);
            } else {
                do {
                    opr1 = getRandomInt(n1r1, n2r1);
                    opr2 = getRandomInt(n1r2, n2r2);
                } while ((opr1 % 10 + opr2 % 10) < 10 || opr1 + opr2 >= max);
            }
        } else {

            if (rmb == 1) {
                do {
                    opr1 = getRandomInt(n1r2, n2r2);
                    opr2 = getRandomInt(n1r1, n2r1);
                } while ((opr1 % 10 + opr2 % 10) >= 10 || opr1 + opr2 >= max);
            } else {
                do {
                    opr1 = getRandomInt(n1r2, n2r2);
                    opr2 = getRandomInt(n1r1, n2r1);
                } while ((opr1 % 10 + opr2 % 10) < 10 || opr1 + opr2 >= max);
            }
        }

        value = Math.floor(Math.random() * 4) + 1
        if (value == 1) {
            value1 = opr1 + opr2;
            answer = value1;
            value2 = getRandNum(value1, value1 - 10);
            value3 = getRandNum(value1, value1 - 1);
            value4 = getRandNum(value1, value1 + 1);
        } else if (value == 2) {
            value2 = opr1 + opr2;
            answer = value2;
            value1 = getRandNum(value2, value2 - 10);
            value3 = getRandNum(value2, value2 - 1);
            value4 = getRandNum(value2, value2 + 1);
        } else if (value == 3) {
            value3 = opr1 + opr2;
            answer = value3;
            value1 = getRandNum(value3, value3 - 10);
            value2 = getRandNum(value3, value3 - 1);
            value4 = getRandNum(value3, value3 + 1);
        } else {
            value4 = opr1 + opr2;
            answer = value4;
            value1 = getRandNum(value4, value4 - 10);
            value2 = getRandNum(value4, value4 - 1);
            value3 = getRandNum(value4, value4 + 1);
        }

        document.getElementById("operation").innerHTML = opr1 + " + " + opr2 + " =";
        document.getElementById("button1").value = value1;
        document.getElementById("button2").value = value2;
        document.getElementById("button3").value = value3;
        document.getElementById("button4").value = value4;
        texttospeech = "" + opr1 + ' cộng ' + opr2;
        responsiveVoice.speak(texttospeech, "Vietnamese Male");
        // audio4.src ='https://translate.google.com/translate_tts?ie=utf-8&tl=vi-vn&q='+opr1+' cộng '+opr2+'&client=tw-ob';
        // audio4.play();
    }

    function sub() {
        var opr, opr1, opr2;
        var value1, value2, value3, value4;
        var rmb = remember;
        if (rmb == 3) {
            rmb = getRandomInt(1, 2);
        }
        if (rmb == 1) {
            do {
                opr1 = getRandomInt(n1r1, n2r1);
                opr2 = getRandomInt(n1r2, n2r2);
                if (opr1 < opr2) {
                    opr = opr1;
                    opr1 = opr2;
                    opr2 = opr;
                }
            } while ((opr1 % 10 - opr2 % 10) < 0);
        } else {
            do {
                opr1 = getRandomInt(n1r1, n2r1);
                opr2 = getRandomInt(n1r2, n2r2);
                if (opr1 < opr2) {
                    opr = opr1;
                    opr1 = opr2;
                    opr2 = opr;
                }
            } while ((opr1 % 10 - opr2 % 10) >= 0);
        }


        value = Math.floor(Math.random() * 4) + 1
        if (value == 1) {
            value1 = opr1 - opr2;
            answer = value1;
            value2 = getRandNum(value1, value1 - 10);
            value3 = getRandNum(value1, value1 - 1);
            value4 = getRandNum(value1, value1 + 1);
        } else if (value == 2) {
            value2 = opr1 - opr2;
            answer = value2;
            value1 = getRandNum(value2, value2 - 10);
            value3 = getRandNum(value2, value2 - 1);
            value4 = getRandNum(value2, value2 + 1);
        } else if (value == 3) {
            value3 = opr1 - opr2;
            answer = value3;
            value1 = getRandNum(value3, value3 - 10);
            value2 = getRandNum(value3, value3 - 1);
            value4 = getRandNum(value3, value3 + 1);
        } else {
            value4 = opr1 - opr2;
            answer = value4;
            value1 = getRandNum(value4, value4 - 10);
            value2 = getRandNum(value4, value4 - 1);
            value3 = getRandNum(value4, value4 + 1);
        }

        document.getElementById("operation").innerHTML = opr1 + " - " + opr2 + " =";
        document.getElementById("button1").value = value1;
        document.getElementById("button2").value = value2;
        document.getElementById("button3").value = value3;
        document.getElementById("button4").value = value4;
        texttospeech = "" + opr1 + ' trừ ' + opr2;
        responsiveVoice.speak(texttospeech, "Vietnamese Male");
        // audio4.src ='https://translate.google.com/translate_tts?ie=utf-8&tl=vi-vn&q='+opr1+' trừ '+opr2+'&client=tw-ob';
        // audio4.play();
    }

    function multiple() {
        var opr, opr1, opr2;
        var value1, value2, value3, value4;

        opr1 = getRandomInt(f1r1, f2r1);
        opr2 = getRandomInt(f1r2, f2r2);

        value = Math.floor(Math.random() * 4) + 1
        if (value == 1) {
            value1 = opr1 * opr2;
            answer = value1;
            value2 = getRandNum(value1, value1 - 10);
            value3 = getRandNum(value1, value1 - 1);
            value4 = getRandNum(value1, value1 + 1);
        } else if (value == 2) {
            value2 = opr1 * opr2;
            answer = value2;
            value1 = getRandNum(value2, value2 - 10);
            value3 = getRandNum(value2, value2 - 1);
            value4 = getRandNum(value2, value2 + 1);
        } else if (value == 3) {
            value3 = opr1 * opr2;
            answer = value3;
            value1 = getRandNum(value3, value3 - 10);
            value2 = getRandNum(value3, value3 - 1);
            value4 = getRandNum(value3, value3 + 1);
        } else {
            value4 = opr1 * opr2;
            answer = value4;
            value1 = getRandNum(value4, value4 - 10);
            value2 = getRandNum(value4, value4 - 1);
            value3 = getRandNum(value4, value4 + 1);
        }

        document.getElementById("operation").innerHTML = opr1 + " x " + opr2 + " =";
        document.getElementById("button1").value = value1;
        document.getElementById("button2").value = value2;
        document.getElementById("button3").value = value3;
        document.getElementById("button4").value = value4;
        texttospeech = "" + opr1 + ' nhân ' + opr2;
        responsiveVoice.speak(texttospeech, "Vietnamese Male");
        // audio4.src ='https://translate.google.com/translate_tts?ie=utf-8&tl=vi-vn&q='+opr1+' nhân '+opr2+'&client=tw-ob';
        // audio4.play();
    }

    function divide() {
        var opr, opr1, opr2;
        var value1, value2, value3, value4;

        do {
            opr1 = getRandomInt(f1r1, f2r1);
            opr2 = getRandomInt(f1r2, f2r2);
        } while (opr1 == 0 || opr2 == 0);


        value = Math.floor(Math.random() * 4) + 1
        if (value == 1) {
            value1 = opr2;
            answer = value1;
            value2 = getRandNum(value1, value1 - 10);
            value3 = getRandNum(value1, value1 - 1);
            value4 = getRandNum(value1, value1 + 1);
        } else if (value == 2) {
            value2 = opr2;
            answer = value2;
            value1 = getRandNum(value2, value2 - 10);
            value3 = getRandNum(value2, value2 - 1);
            value4 = getRandNum(value2, value2 + 1);
        } else if (value == 3) {
            value3 = opr2;
            answer = value3;
            value1 = getRandNum(value3, value3 - 10);
            value2 = getRandNum(value3, value3 - 1);
            value4 = getRandNum(value3, value3 + 1);
        } else {
            value4 = opr2;
            answer = value4;
            value1 = getRandNum(value4, value4 - 10);
            value2 = getRandNum(value4, value4 - 1);
            value3 = getRandNum(value4, value4 + 1);
        }

        document.getElementById("operation").innerHTML = (opr1 * opr2) + " : " + opr1 + " =";
        document.getElementById("button1").value = value1;
        document.getElementById("button2").value = value2;
        document.getElementById("button3").value = value3;
        document.getElementById("button4").value = value4;
        texttospeech = "" + (opr1 * opr2) + ' chia ' + opr1;
        responsiveVoice.speak(texttospeech, "Vietnamese Male");
        // audio4.src ='https://translate.google.com/translate_tts?ie=utf-8&tl=vi-vn&q='+(opr1 * opr2)+' chia '+opr1+'&client=tw-ob';
        // audio4.play();
    }

    function getRandNum(v1, v2) {
        if (typeOfSet == 1 && v2 < -9) {
            v2 = v1 + 10;
        } else if (typeOfSet == 1 && v2 < 0) {
            v2 = v1 + 9;
        } else if (typeOfSet == 1 && v2 >= max) {
            v2 = v1 - 9;
        }
        return v2;
    }

    function setBestTime() {
        var h, m, s;
        //alert(bestTime);
        if (bestTime == -1 || bestTime == null) {
            document.getElementById("record").innerHTML = "";
        } else {
            h = Math.floor(bestTime / 3600);
            m = Math.floor(bestTime % 3600 / 60);
            s = bestTime % 60;
            document.getElementById("record").innerHTML = h + ":" + (m ? (m > 9 ? m : "0" + m) : "00") + ":" + (s > 9 ? s : "0" + s);
        }
    }

    function check(id) {
        if (document.getElementById(id).value == answer) {
            right += 1;
            document.getElementById("right").innerHTML = right;
            audio1.play();
            if (right == target) {
                clearTimeout(myTimer);

                if (bestTime > totalTime || bestTime == -1) {
                    bestTime = totalTime;
                    //alert(best);
                    best["" + target] = bestTime;
                    //alert(JSON.stringify(best));
                    setCookie("best", JSON.stringify(best));

                    setBestTime();
                }
                audio3.play();
            }

            show();
        } else {
            wrong += 1;
            document.getElementById("wrong").innerHTML = wrong;
            audio2.play();
            document.getElementById('answer').value = "";
        }
    }

    function toggle() {
        var ele = document.getElementById("toggleConfig");
        //var text = document.getElementById("displayConfig");
        //alert(ele.style.display);
        if (ele.style.display == "block") {
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }
    }

    function save() {

        opr = document.getElementById("txtOperator").value;
        v1 = parseInt(document.getElementById("txtN1R1").value);
        v2 = parseInt(document.getElementById("txtN2R1").value);
        v3 = parseInt(document.getElementById("txtN1R2").value);
        v4 = parseInt(document.getElementById("txtN2R2").value);
        v5 = parseInt(document.getElementById("txtF1R1").value);
        v6 = parseInt(document.getElementById("txtF2R1").value);
        v7 = parseInt(document.getElementById("txtF1R2").value);
        v8 = parseInt(document.getElementById("txtF2R2").value);
        max = parseInt(document.getElementById("txtMax").value);
        var ck = document.getElementById("r1").checked;
        if (ck) {
            remember = 1;
        } else if (document.getElementById("r2").checked) {
            remember = 2;
        } else {
            remember = 3;
        }

        oral = document.getElementById("oral").checked ? 1 : 0;
        target = parseInt(document.getElementById("txtTarget").value);
        onlyAudio = document.getElementById("tts").checked ? 1 : 0;

        if (document.getElementById("r4").checked) {
            typeOfSet = 1;
        } else if (document.getElementById("r5").checked) {
            typeOfSet = 2;
        } else {
            typeOfSet = 3;
        }
        if (v1 > v2 || v3 > v4 || v5 > v6 || v7 > v8) {
            alert("Dữ liệu trong ô đến nhỏ hơn trong ô từ");
            return;
        } else if (v1 + v3 >= max) {
            alert("Tổng của 2 ô từ lớn hơn hay bằng " + max);
            return;
        } else if (typeOfSet == 1 && (v1 < 0 || v3 < 0)) {
            alert("Dữ liệu trong ô từ nhỏ hơn 0.");
            return;
        } else {
            operator = opr;
            n1r1 = v1;
            n2r1 = v2;
            n1r2 = v3;
            n2r2 = v4;
            f1r1 = v5;
            f2r1 = v6;
            f1r2 = v7;
            f2r2 = v8;

            setCookie("cookie", 1);
            setCookie("operator", operator);
            setCookie("n1r1", n1r1);
            setCookie("n2r1", n2r1);
            setCookie("n1r2", n1r2);
            setCookie("n2r2", n2r2);
            setCookie("f1r1", f1r1);
            setCookie("f2r1", f2r1);
            setCookie("f1r2", f1r2);
            setCookie("f2r2", f2r2);
            setCookie("remember", remember);
            setCookie("max", max);
            setCookie("oral", oral);
            setCookie("target", target);
            setCookie("audio", onlyAudio);
            setCookie("typeOfSet", typeOfSet);
            toggle();
            show();

        }

    }

    function animateHourGlass() {
        var id = setInterval(changeHourGlass, 100);

    }

    function changeHourGlass() {
        if (hourglassid < 360) {
            context.clearRect(0, 0, height, height);
            context.save();
            hourglassid += 36;


            // now move across and down half the 
            // width and height of the image (which is 128 x 128)
            context.translate(height / 2, height / 2);

            // rotate around this point
            context.rotate(hourglassid * Math.PI / 180);

            // then draw the image back and up
            context.drawImage(img, -width / 2, -height / 2);

            // and restore the co-ordinate system to its default
            // top left origin with no rotation
            context.restore();
        } else if (seconds % 5 == 0) {
            hourglassid = 0;

        }


    }

    function repeat() {
        responsiveVoice.speak(texttospeech, "Vietnamese Male");

    }