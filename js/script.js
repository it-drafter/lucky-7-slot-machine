$(document).ready(function(){

    const 

    reel1Images = $('#reel1 img'), 
    reel2Images = $('#reel2 img'), 
    reel3Images = $('#reel3 img'), 

    btnSpin = $('#btnspin'), 
    
    handleTop = $('#handletop'), 
    handleMiddle = $('#handlemiddle'), 
    handleBottom = $('#handlebottom'), 

    mainDisplay = $('#maindisplay'), 

    popUpInsertMoney = $('#popupinsertmoney'), 
    btnInsertMoney = $('#insertmoney'), 
    btnCloseInsertMoney = $('#popupinsertmoneyx'), 

    popUpPaytable = $('#popuppaytable'), 
    btnPaytable = $('#paytable'), 
    btnClosePaytable = $('#popuppaytablex'), 

    btnOneDollar = $('#onedollar'), 
    btnTwoDollars = $('#twodollars'), 
    btnFiveDollars = $('#fivedollars'), 
    btnTenDollars = $('#tendollars'), 
    btnTwentyDollars = $('#twentydollars'), 
    btnFiftyDollars = $('#fiftydollars'), 
    btnHundredDollars = $('#hundreddollars'), 

    displayTotalMoney = $('#totalmoney'), 
    displayBet = $('#bet'), 
    displayWin = $('#win'), 

    btnOneDollarBet = $('#onebet'), 
    btnTwoDollarBet = $('#twobet'), 
    btnMaxBet = $('#maxbet'), 

    btnCollectMoney = $('#collectmoney'), 

    btnAudio = $('#audiobutton'),
    insertMoneyAudio = new Audio('./audio/insertmoney.ogg'),
    spinAudio = new Audio('./audio/spin.ogg'),
    betAudio = new Audio('./audio/bet.ogg'),
    errorAudio = new Audio('./audio/error.ogg'),
    collectAudio = new Audio('./audio/collect.ogg'),
    damnAudio = new Audio('./audio/damn.ogg'),
    bigWinAudio = new Audio('./audio/bigwin.ogg'),
    winAudio = new Audio('./audio/win.ogg'),
    
    reel1Enumerate = [], 
    reel2Enumerate = [], 
    reel3Enumerate = [], 

    usedImgs1 = [], 
    usedImgs2 = [], 
    usedImgs3 = [], 
    combinationsDuringThisSpin = [];

    let 

    currImg1, 
    currImg2, 
    currImg3, 

    finalImg1, 
    finalImg2, 
    finalImg3, 

    total = 0, 
    bet = 0, 
    win = 0
    
    permitAudio = false;

    function enumerate(){
        reel1Images.each(function(index){
            reel1Enumerate.push(index); //[0, 1, 2, 3, 4, 5, 6, 7]
        });
        reel2Images.each(function(index){
            reel2Enumerate.push(index); //[0, 1, 2, 3, 4, 5, 6, 7]
        });
        reel3Images.each(function(index){
            reel3Enumerate.push(index); //[0, 1, 2, 3, 4, 5, 6, 7]
        });
    }

    function randomize(){
        currImg1 = Math.floor(Math.random() * reel1Enumerate.length);
        currImg2 = Math.floor(Math.random() * reel2Enumerate.length);
        currImg3 = Math.floor(Math.random() * reel3Enumerate.length);
    }

    function buttonTimer(seconds){
        let remaining = seconds;

        const countDownSeconds = setInterval(function(){
        
            if(remaining === 0){
                clearInterval(countDownSeconds);
                btnSpin.html('SPIN');
            } else {
                btnSpin.html(remaining);
            }

            remaining -= 1;

            }, 1000);
    }

    enumerate();
    randomize();
    buttonTimer(2);

    reel2Images.eq(currImg2).animate({'top': '0'}, 500);
    reel1Images.eq(currImg1).delay(80).animate({'top': '0'}, 1000);
    reel3Images.eq(currImg3).delay(120).animate({'top': '0'}, 1500);
    // console.log(currImg1, currImg2, currImg3);

    btnInsertMoney.click(() => {
        popUpInsertMoney.css('display', 'block');
    });
    btnCloseInsertMoney.click(() => {
        popUpInsertMoney.css('display', 'none');
    });
    $(window).on('click', (e) => {
        // console.log(e);
        if (e.target.id === 'popupinsertmoney') {
            popUpInsertMoney.css('display', 'none');
        }
    });

    btnPaytable.click(() => {
        popUpPaytable.css('display', 'block');
    });
    btnClosePaytable.click(() => {
        popUpPaytable.css('display', 'none');
    });
    $(window).on('click', (e) => {
        // console.log(e);
        if (e.target.id === 'popuppaytable') {
            popUpPaytable.css('display', 'none');
        }
    });

    function spin(){

        // ----------------------------------------------------
        // ONLY FOR TESTING - DO NOT FORGET TO COMMENT THIS OUT!!!
        // currImg1 = 8;
        // currImg2 = 8;
        // currImg3 = 7;
        // ----------------------------------------------------

        combinationsDuringThisSpin.push([currImg1, currImg2, currImg3]);
        // console.log(combinationsDuringThisSpin);

        reel2Images.css('top', '-110px');
        reel1Images.css('top', '-110px');
        reel3Images.css('top', '-110px');

        usedImgs1.length === 7 && (usedImgs1.length = 0);
        usedImgs2.length === 7 && (usedImgs2.length = 0);
        usedImgs3.length === 7 && (usedImgs3.length = 0);

        //-------------------------------------------------
        //Spin the reels
        reel2Images.eq(currImg2).animate({top: '110px'}, 550);
        usedImgs2.push(currImg2);
        
        reel1Images.eq(currImg1).delay(80).animate({top: '110px'}, 550);
        usedImgs1.push(currImg1);
        
        reel3Images.eq(currImg3).delay(120).animate({top: '110px'}, 550);
        usedImgs3.push(currImg3);

        // console.log(currImg1, currImg2, currImg3);

        if (usedImgs1.includes(currImg1)){
            (function randomizeAndExclude1(){
                currImg1 = Math.floor(Math.random() * reel1Enumerate.length);
                if(usedImgs1.includes(currImg1)){
                    randomizeAndExclude1();
                }
            })()
        }
        if (usedImgs2.includes(currImg2)){
            (function randomizeAndExclude2(){
                currImg2 = Math.floor(Math.random() * reel2Enumerate.length);
                if(usedImgs2.includes(currImg2)){
                    randomizeAndExclude2();
                }
            })()
        }
        if (usedImgs3.includes(currImg3)){
            (function randomizeAndExclude3(){
                currImg3 = Math.floor(Math.random() * reel3Enumerate.length);
                if(usedImgs3.includes(currImg3)){
                    randomizeAndExclude3();
                }
            })()
        }

        
        // console.log(combinationsDuringThisSpin);
        if (combinationsDuringThisSpin.length > 0){
            finalImg1 = combinationsDuringThisSpin[combinationsDuringThisSpin.length - 1][0];
            finalImg2 = combinationsDuringThisSpin[combinationsDuringThisSpin.length - 1][1];
            finalImg3 = combinationsDuringThisSpin[combinationsDuringThisSpin.length - 1][2];
        }
        // console.log(currImg1, currImg2, currImg3);
        // console.log(usedImgs1, usedImgs2, usedImgs3);
        // console.log(combinationsDuringThisSpin);
        // console.log(finalImg1, finalImg2, finalImg3);
        
        //-------------------------------------------------

        setTimeout(function(){
            reel1Images.stop(true);
            reel2Images.stop(true);
            reel3Images.stop(true);

            reel1Images.eq(finalImg1).animate({top: '0'});
            reel2Images.eq(finalImg2).animate({top: '0'});
            reel3Images.eq(finalImg3).animate({top: '0'});
        }, 2800);
    }

    setTimeout(function(){
        btnSpin.bind('click', spinClickHandler);
        handleTop.bind('click', spinClickHandler);
        handleMiddle.bind('click', spinClickHandler);

        $(document).on('keydown', (e) => {
            // console.log(e.key)
            if (e.key === 'Enter') {
                spinClickHandler();
            }
        });

    }, 3000);

    function spinClickHandler(){

        if (bet > total || bet < 1){
            animateBtnInsertMoney();
            animateMainDisplay('<span style="color: red; font-size: 1rem;">NOT ENOUGH MONEY!</span>');
            if(permitAudio){
                errorAudio.play();
            }
            return false;
        }

        total -= bet;
        displayTotalMoney.html(`<span>TOTAL: $${total}</span>`);
        // console.log(total);

        switch (finalImg1 !== undefined) {
            case true:
                reel2Images.eq(finalImg2).animate({top: '110px'}, 550);
                reel1Images.eq(finalImg1).animate({top: '110px'}, 550);
                reel3Images.eq(finalImg3).animate({top: '110px'}, 550);
                combinationsDuringThisSpin.splice(0, combinationsDuringThisSpin.length - 1);
                break;
        
            default:
                reel2Images.eq(currImg2).animate({top: '110px'}, 550);
                reel1Images.eq(currImg1).animate({top: '110px'}, 550);
                reel3Images.eq(currImg3).animate({top: '110px'}, 550);
                break;
        }

        buttonTimer(6);

        btnSpin.unbind('click', spinClickHandler);
        handleTop.unbind('click', spinClickHandler);
        handleMiddle.unbind('click', spinClickHandler);
        $(document).unbind('keydown');
        btnInsertMoney.off('click').css('opacity', '.5');
        btnCollectMoney.off('click').css('opacity', '.5');
        btnOneDollarBet.off('click').css('opacity', '.5');
        btnTwoDollarBet.off('click').css('opacity', '.5');
        btnMaxBet.off('click').css('opacity', '.5');

        const spinInterval = setInterval(spin, 400);

        displayWin.html('<span>WIN: $0</span>');

        setTimeout(function(){
            clearInterval(spinInterval);

            // console.log('Final images: ', finalImg1, finalImg2, finalImg3);
            mainDisplay.addClass('invisible');

            function doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio){
                displayTotalMoney.html(`<span>TOTAL: $${total}</span>`);
                displayWin.html(displayWinValue);
                animateDisplayTotalMoney();
                animateDisplayWin();
                animateMainDisplay(winLooseMessageToDisplay);
                if(permitAudio){
                    soundAudio.play();
                }
            }

            let winLooseMessageToDisplay;
            let displayWinValue;

            switch (true) {

				case bet === 3 &&
                    ((finalImg1 === 2 && finalImg2 === 3 && finalImg3 === 7) ||
                    (finalImg1 === 2 && finalImg2 === 7 && finalImg3 === 3) ||
                    (finalImg1 === 3 && finalImg2 === 2 && finalImg3 === 7) ||
                    (finalImg1 === 3 && finalImg2 === 7 && finalImg3 === 2) ||
                    (finalImg1 === 7 && finalImg2 === 2 && finalImg3 === 3) ||
                    (finalImg1 === 7 && finalImg2 === 3 && finalImg3 === 2)):
                    //cherry, 10X symbol, 5X symbol - any three mixed

                    total += 100;
                    win = 100;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = bigWinAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case bet === 3 &&
                    ((finalImg1 === 1 && finalImg2 === 3 && finalImg3 === 7) ||
                    (finalImg1 === 1 && finalImg2 === 7 && finalImg3 === 3) ||
                    (finalImg1 === 3 && finalImg2 === 1 && finalImg3 === 7) ||
                    (finalImg1 === 3 && finalImg2 === 7 && finalImg3 === 1) ||
                    (finalImg1 === 7 && finalImg2 === 1 && finalImg3 === 3) ||
                    (finalImg1 === 7 && finalImg2 === 3 && finalImg3 === 1)):
                    //cherry, 10X symbol, 2X symbol - any three mixed

                    total += 40;
                    win = 40;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = winAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case (bet === 3 || bet === 2) &&
                    ((finalImg1 === 1 && finalImg2 === 2 && finalImg3 === 7) ||
                    (finalImg1 === 1 && finalImg2 === 7 && finalImg3 === 2) ||
                    (finalImg1 === 2 && finalImg2 === 1 && finalImg3 === 7) ||
                    (finalImg1 === 2 && finalImg2 === 7 && finalImg3 === 1) ||
                    (finalImg1 === 7 && finalImg2 === 1 && finalImg3 === 2) ||
                    (finalImg1 === 7 && finalImg2 === 2 && finalImg3 === 1)):
                    //cherry, 5X symbol, 2X symbol - any three mixed

                    total += 20;
                    win = 20;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = winAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case bet === 3 && finalImg1 === 3 && finalImg2 === 3 && finalImg3 === 3:
                    //3 10X symbols

                    total += 10000;
                    win = 10000;
                    winLooseMessageToDisplay = `<span style="font-size: 1.2rem;">YOU WON $${win}!</span>`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = bigWinAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case bet === 3 &&
                    ((finalImg1 === 1 && finalImg2 === 2 && finalImg3 === 3) ||
                    (finalImg1 === 1 && finalImg2 === 3 && finalImg3 === 2) ||
                    (finalImg1 === 2 && finalImg2 === 1 && finalImg3 === 3) ||
                    (finalImg1 === 2 && finalImg2 === 3 && finalImg3 === 1) ||
                    (finalImg1 === 3 && finalImg2 === 1 && finalImg3 === 2) ||
                    (finalImg1 === 3 && finalImg2 === 2 && finalImg3 === 1)):
                    //2X symbol, 5X symbol, 10X symbol - any three mixed

                    total += 1000;
                    win = 1000;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = bigWinAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case (bet === 2 || bet === 3) && finalImg1 === 2 && finalImg2 === 2 && finalImg3 === 2:
                    //3 5X symbols

                    total += 2500;
                    win = 2500;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = bigWinAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case (bet === 2 || bet === 3) &&
                    ((finalImg1 === 1 && finalImg2 === 1 && finalImg3 === 2) ||
                    (finalImg1 === 1 && finalImg2 === 2 && finalImg3 === 2) ||
                    (finalImg1 === 1 && finalImg2 === 2 && finalImg3 === 1) ||
                    (finalImg1 === 2 && finalImg2 === 1 && finalImg3 === 1) ||
                    (finalImg1 === 2 && finalImg2 === 1 && finalImg3 === 2) ||
                    (finalImg1 === 2 && finalImg2 === 2 && finalImg3 === 1)):
                    //2X symbol, 5X symbol - any three mixed

                    total += 1000;
                    win = 1000;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = bigWinAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;

                case finalImg1 === 1 && finalImg2 === 1 && finalImg3 === 1:
                    //3 2X symbols

                    total += 1600;
                    win = 1600;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = bigWinAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 0 && finalImg2 === 0 && finalImg3 === 0:
                    //3 seven symbols

                    total += 100;
                    win = 100;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = bigWinAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 6 && finalImg2 === 6 && finalImg3 === 6:
                    //3 barBarBar

                    total += 30;
                    win = 30;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = winAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 5 && finalImg2 === 5 && finalImg3 === 5:
                    //3 barBar

                    total += 20;
                    win = 20;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = winAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 4 && finalImg2 === 4 && finalImg3 === 4:
                    //3 bar

                    total += 10;
                    win = 10;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = winAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case (finalImg1 === 4 && finalImg2 === 5 && finalImg3 === 6) ||
                        (finalImg1 === 4 && finalImg2 === 6 && finalImg3 === 5) ||
                        (finalImg1 === 5 && finalImg2 === 4 && finalImg3 === 6) ||
                        (finalImg1 === 5 && finalImg2 === 6 && finalImg3 === 4) ||
                        (finalImg1 === 6 && finalImg2 === 4 && finalImg3 === 5) ||
                        (finalImg1 === 6 && finalImg2 === 5 && finalImg3 === 4):
                    //bar, barBar and barBarBar - any three mixed

                    total += 5;
                    win = 5;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = winAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 9 && finalImg2 === 9 && finalImg3 === 9:
                    //3 loser symbols

                    total -= 100;

                    total = total < 0 ? 0 : total;
                
                    win = -100;
                    winLooseMessageToDisplay = `<span style="color: red;">YOU LOST $${-win}!</span>`;
                    displayWinValue = `<span style="color: red;">LOSS: $${-win}</span>`;
                    soundAudio = damnAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 7 && finalImg2 === 7 && finalImg3 === 7:
                    //3 cherries

                    total += 10;
                    win = 10;
                    winLooseMessageToDisplay = `YOU WON $${win}!`;
                    displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                    soundAudio = winAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case (finalImg1 === 7 && finalImg2 === 7) || 
                        (finalImg1 === 7 && finalImg3 === 7) ||
                        (finalImg2 === 7 && finalImg3 === 7):
                    //2 cherries

                    if ( bet === 3 && (finalImg1 === 3 || finalImg2 === 3 || finalImg3 === 3) ){
                        //2 cherries and 1 10X symbol

                        total += 50;
                        win = 50;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = bigWinAudio;

                    } else if ( (bet === 2 || bet === 3) && (finalImg1 === 2 || finalImg2 === 2 || finalImg3 === 2) ){
                        //2 cherries and 1 5X symbol

                        total += 25;
                        win = 25;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;

                    } else if (finalImg1 === 1 || finalImg2 === 1 || finalImg3 === 1){
                        //2 cherries and 1 2X symbol

                        total += 10;
                        win = 10;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;

                    } else if(finalImg1 === 9 || finalImg2 === 9 || finalImg3 === 9){
                        //2 cherries and 1 loser symbol

                        // total += 0;
                        // win = 0;
                        winLooseMessageToDisplay = '<span style="color: #deb887; font-size: 1.2rem; letter-spacing: normal;">BETTER LUCK NEXT TIME!</span>';
                        displayWinValue = `<span>WIN: $5 - $5 = $0</span>`;
                        soundAudio = betAudio;

                    } else{
                        //2 cherries
                        total += 5;
                        win = 5;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;
                    }

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 7 || finalImg2 === 7 || finalImg3 === 7:
                    //1 cherry

                    if( bet === 3 && ((finalImg1 === 3 && finalImg2 === 3) ||
                                (finalImg1 === 3 && finalImg3 === 3) ||
                                (finalImg2 === 3 && finalImg3 === 3)) ){
                        //1 cherry and 2 10X symbols

                        total += 200;
                        win = 200;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = bigWinAudio;

                    } else if( (bet === 2 || bet === 3) && ((finalImg1 === 2 && finalImg2 === 2) ||
                                (finalImg1 === 2 && finalImg3 === 2) ||
                                (finalImg2 === 2 && finalImg3 === 2)) ){
                        //1 cherry and 2 5X symbols

                        total += 50;
                        win = 50;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = bigWinAudio;

                    } else if( ((finalImg1 === 1 && finalImg2 === 1) ||
                                (finalImg1 === 1 && finalImg3 === 1) ||
                                (finalImg2 === 1 && finalImg3 === 1)) ){
                        //1 cherry and 2 2X symbols

                        total += 8;
                        win = 8;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;

                    } else if( 
                        bet === 3 &&
                        ((finalImg1 === 3 || finalImg2 === 3 || finalImg3 === 3) &&
                        (finalImg1 === 9 || finalImg2 === 9 || finalImg3 === 9)) ){
                        //1 cherry, 1 10X symbol and 1 looser symbol

                        total += 19;
                        win = 19;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $20 - $1 = $19</span>`;
                        soundAudio = winAudio;

                    } else if( 
                        (bet === 2 || bet === 3) &&
                        ((finalImg1 === 2 || finalImg2 === 2 || finalImg3 === 2) &&
                        (finalImg1 === 9 || finalImg2 === 9 || finalImg3 === 9)) ){
                        //1 cherry, 1 5X symbol and 1 looser symbol

                        total += 9;
                        win = 9;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $10 - $1 = $9</span>`;
                        soundAudio = winAudio;

                    } else if( 
                        (finalImg1 === 1 || finalImg2 === 1 || finalImg3 === 1) &&
                        (finalImg1 === 9 || finalImg2 === 9 || finalImg3 === 9) ){
                        //1 cherry, 1 2X symbol and 1 looser symbol

                        total += 3;
                        win = 3;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $4 - $1 = $3</span>`;
                        soundAudio = winAudio;

                    } else if ( bet === 3 && 
                                ((finalImg1 === 3 || finalImg2 === 3 || finalImg3 === 3) &&
                                (finalImg1 !== 9 || finalImg2 !== 9 || finalImg3 !== 9)) ){
                        //1 cherry and 1 10X symbol
                        //no loser symbol

                        total += 20;
                        win = 20;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;

                    } else if ( (bet === 2 || bet === 3) && 
                                ((finalImg1 === 2 || finalImg2 === 2 || finalImg3 === 2) &&
                                (finalImg1 !== 9 || finalImg2 !== 9 || finalImg3 !== 9)) ){
                        //1 cherry and 1 5X symbol
                        //no loser symbol

                        total += 10;
                        win = 10;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;

                    } else if ( (finalImg1 === 1 || finalImg2 === 1 || finalImg3 === 1) &&
                                (finalImg1 !== 9 || finalImg2 !== 9 || finalImg3 !== 9) ){
                        //1 cherry and 1 2X symbol
                        //no loser symbol

                        total += 4;
                        win = 4;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;

                    } else if( (finalImg1 === 9 && finalImg2 === 9) ||
                                (finalImg1 === 9 && finalImg3 === 9) ||
                                (finalImg2 === 9 && finalImg3 === 9) ){
                        //1 cherry and 2 loser symbols

                        total -= 18;

                        total = total < 0 ? 0 : total;
                        
                        win = -18;
                        winLooseMessageToDisplay = `<span style="color: red;">YOU LOST $${-win}!</span>`;
                        displayWinValue = `<span style="color: red;">LOSS: $${-win}</span>`;
                        soundAudio = damnAudio;

                    } else if( finalImg1 === 9 || finalImg2 === 9 || finalImg3 === 9 ){
                        //1 cherry and 1 loser symbol

                        total -= 3;

                        total = total < 0 ? 0 : total;
                        
                        win = -3;
                        winLooseMessageToDisplay = `<span style="color: red;">YOU LOST $${-win}!</span>`;
                        displayWinValue = `<span style="color: red;">LOSS: $${-win}</span>`;
                        soundAudio = damnAudio;

                    } else{
                        //1 cherry
                        total += 2;
                        win = 2;
                        winLooseMessageToDisplay = `YOU WON $${win}!`;
                        displayWinValue = `<span style="color: #32cd32;">WIN: $${win}</span>`;
                        soundAudio = winAudio;
                    }

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case (finalImg1 === 9 && finalImg2 === 9) || 
                        (finalImg1 === 9 && finalImg3 === 9) ||
                        (finalImg2 === 9 && finalImg3 === 9):
                    //2 loser symbols

                    total -= 20;

                    total = total < 0 ? 0 : total;
                    
                    win = -20;
                    winLooseMessageToDisplay = `<span style="color: red;">YOU LOST $${-win}!</span>`;
                    displayWinValue = `<span style="color: red;">LOSS: $${-win}</span>`;
                    soundAudio = damnAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;


                case finalImg1 === 9 || finalImg2 === 9 || finalImg3 === 9:
                    // loser symbol

                    total -= 5;

                    total = total < 0 ? 0 : total;
                    
                    win = -5;
                    winLooseMessageToDisplay = `<span style="color: red;">YOU LOST $${-win}!</span>`;
                    displayWinValue = `<span style="color: red;">LOSS: $${-win}</span>`;
                    soundAudio = damnAudio;

                    doStuffAfterWinLoose(winLooseMessageToDisplay, displayWinValue, soundAudio);

                    break;

            
                default:
                    animateMainDisplay('<span style="color: #deb887; font-size: 1.2rem; letter-spacing: normal;">BETTER LUCK NEXT TIME!</span>');
                    if(permitAudio){
                        betAudio.play();
                    }
                    // console.log('Big daddy main switch default case.');
                    break;
            }

        }, 3000);

        setTimeout(function(){
            btnSpin.bind('click', spinClickHandler);
            handleTop.bind('click', spinClickHandler);
            handleMiddle.bind('click', spinClickHandler);

            $(document).on('keydown', (e) => {
                if (e.key === 'Enter') {
                    spinClickHandler();
                }
            });

            btnInsertMoney.click(() => {
                popUpInsertMoney.css('display', 'block');
            })
            .css('opacity', '1');

            btnCollectMoney.click(btnCollectMoneyClickHandler).css('opacity', '1');
            btnOneDollarBet.click(btnOneDollarBetClickHandler).css('opacity', '1');
            btnTwoDollarBet.click(btnTwoDollarBetClickHandler).css('opacity', '1');
            btnMaxBet.click(btnMaxBetClickHandler).css('opacity', '1');

        }, 7100);

        animateHandle();
        animateMainDisplay('<img src="./gfx/4-Leaf-Clover.svg" alt="Four Leaf Clover"> GOOD LUCK! <img src="./gfx/4-Leaf-Clover.svg" alt="Four Leaf Clover">');
        if(permitAudio){
            spinAudio.play();
        }

    }

    function animateHandle(){
        handleTop.animate({top: '22px'}, 550);
        handleTop.animate({top: '0px'}, 550);
        handleMiddle.animate({top: '36px', height: '2.5px'}, 550);
        handleMiddle.animate({top: '13.5px', height: '25px'}, 550);
        handleBottom.animate({opacity: '.7'}, 550);
        handleBottom.animate({opacity: '1'}, 550);
    }

    function animateMainDisplay(contentToDisplay){
        mainDisplay.stop(true);
        mainDisplay.removeClass('invisible');
        mainDisplay.html(contentToDisplay);
        mainDisplay.animate({opacity: 0}, 500);
        mainDisplay.animate({opacity: 1}, 500);
        mainDisplay.animate({opacity: 0}, 500);
        mainDisplay.animate({opacity: 1}, 500);
        mainDisplay.animate({opacity: 0}, 500);
        mainDisplay.animate({opacity: 1}, 500);
        mainDisplay.animate({opacity: 0}, 500);
    }

    btnOneDollar.click(function(){
        total += 1;
        doStuffAfterInsertingMoney('$1 INSERTED!');
    });

    btnTwoDollars.click(function(){
        total += 2;
        doStuffAfterInsertingMoney('$2 INSERTED!');
    });

    btnFiveDollars.click(function(){
        total += 5;
        doStuffAfterInsertingMoney('$5 INSERTED!');
    });

    btnTenDollars.click(function(){
        total += 10;
        doStuffAfterInsertingMoney('$10 INSERTED!');
    });

    btnTwentyDollars.click(function(){
        total += 20;
        doStuffAfterInsertingMoney('$20 INSERTED!');
    });

    btnFiftyDollars.click(function(){
        total += 50;
        doStuffAfterInsertingMoney('$50 INSERTED!');
    });

    btnHundredDollars.click(function(){
        total += 100;
        doStuffAfterInsertingMoney('$100 INSERTED!');
    });

    function doStuffAfterInsertingMoney(contentToDisplay){
        popUpInsertMoney.css('display', 'none');
        displayTotalMoney.html(`<span>TOTAL: $${total}</span>`);
        animateDisplayTotalMoney();
        animateMainDisplay(contentToDisplay);
        if(bet === 0){
            bet = 1;
            displayBet.html(`<span>BET: $${bet}</span>`);
            animateDisplayBet();
        }
        if(permitAudio){
            insertMoneyAudio.play();
        }
    }

    function animateDisplayTotalMoney(){
        displayTotalMoney.stop(true);
        displayTotalMoney.animate({opacity: 0.1}, 300);
        displayTotalMoney.animate({opacity: 1}, 300);
        displayTotalMoney.animate({opacity: 0.1}, 300);
        displayTotalMoney.animate({opacity: 1}, 300);
    }

    function animateDisplayBet(){
        displayBet.stop(true);
        displayBet.animate({opacity: 0.1}, 300);
        displayBet.animate({opacity: 1}, 300);
        displayBet.animate({opacity: 0.1}, 300);
        displayBet.animate({opacity: 1}, 300);
    }

    function animateDisplayWin(){
        displayWin.stop(true);
        displayWin.animate({opacity: 0.1}, 300);
        displayWin.animate({opacity: 1}, 300);
        displayWin.animate({opacity: 0.1}, 300);
        displayWin.animate({opacity: 1}, 300);
    }

    function animateBtnInsertMoney(){
        btnInsertMoney.stop(true);
        btnInsertMoney.animate({opacity: 0.1}, 300);
        btnInsertMoney.animate({opacity: 1}, 300);
        btnInsertMoney.animate({opacity: 0.1}, 300);
        btnInsertMoney.animate({opacity: 1}, 300);
    }

    btnOneDollarBet.click(btnOneDollarBetClickHandler);

    function btnOneDollarBetClickHandler(){
        switch (true) {
            case total < 1:
                animateBtnInsertMoney();
                animateMainDisplay('<span style="color: red; font-size: 1rem;">NOT ENOUGH MONEY!</span>');
                if(permitAudio){
                    errorAudio.play();
                }
                break;
        
            default:
                bet = 1;
                displayBet.html(`<span>BET: $${bet}</span>`);
                animateDisplayBet();
                animateMainDisplay('$1 BET PLACED!');
                if(permitAudio){
                    betAudio.play();
                }
                break;
        }
    }

    btnTwoDollarBet.click(btnTwoDollarBetClickHandler);

    function btnTwoDollarBetClickHandler(){
        switch (true) {
            case total < 2:
                animateBtnInsertMoney();
                animateMainDisplay('<span style="color: red; font-size: 1rem;">NOT ENOUGH MONEY!</span>');
                if(permitAudio){
                    errorAudio.play();
                }
                break;
        
            default:
                bet = 2;
                displayBet.html(`<span>BET: $${bet}</span>`);
                animateDisplayBet();
                animateMainDisplay('$2 BET PLACED!');
                if(permitAudio){
                    betAudio.play();
                }
                break;
        }
    }

    btnMaxBet.click(btnMaxBetClickHandler);

    function btnMaxBetClickHandler(){
        switch (true) {
            case total < 3:
                animateBtnInsertMoney();
                animateMainDisplay('<span style="color: red; font-size: 1rem;">NOT ENOUGH MONEY!</span>');
                if(permitAudio){
                    errorAudio.play();
                }
                break;
        
            default:
                bet = 3;
                displayBet.html(`<span>BET: $${bet}</span>`);
                animateDisplayBet();
                animateMainDisplay('$3 BET PLACED!');
                if(permitAudio){
                    betAudio.play();
                }
                break;
        }
    }

    btnCollectMoney.click(btnCollectMoneyClickHandler);

    function btnCollectMoneyClickHandler(){
        bet = 0;
        win = 0;
        displayBet.html(`<span>BET: $${bet}</span>`);
        displayWin.html(`<span>WIN: $${win}</span>`);

        if (total === 0){
            animateDisplayTotalMoney();
            animateMainDisplay('<span style="color: red; letter-spacing: normal;">NOTHING TO COLLECT!</span>');
            if(permitAudio){
                errorAudio.play();
            }
            return false;
        }

        total = 0;

        displayTotalMoney.html(`<span>TOTAL: $${total}</span>`);

        animateMainDisplay('GOODBYE!');
        animateDisplayTotalMoney();
        animateDisplayBet();
        animateDisplayWin();

        if(permitAudio){
            collectAudio.play();
        }
    }

    btnAudio.click(function(){
        if (!permitAudio){
            permitAudio = true;
            btnAudio.attr('src', './gfx/audioon.svg');
        } else{
            permitAudio = false;
            btnAudio.attr('src', './gfx/audiooff.svg');
        }
        // console.log(permitAudio);
    });
    
});