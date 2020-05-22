function attempt(avialable, allowed, preferred){
    let answer = [];
    let allowedArr = [];
    //сформуємо масив з елементів массива allowed, які входять до масиву avialable, якщо у масиві allowed є значення 'any', то скопіюємо масив avialable у масив allowedArr 
        if (allowed.indexOf('any') != -1){
        allowedArr = [...avialable];
    } else {
    allowedArr = allowed.filter((function(item) {
            if (avialable.indexOf(item) != -1){
                return true;
            } else {
                return false;
            }
        })); 
    }    
    //якщо масив allowedArr пустий - подальші перевірки не мають сенсу
    if (allowedArr.length == 0) {
        return (allowedArr);
    //если масив не пустій - перевіремо входження значень з масиву preferred в новий масив allowedArr, якщо у масиві preferred є значення 'any', то скопіюємо масив allowedArr у масив answer
    } else {

        if (preferred.indexOf('any') != -1){
            answer = [...allowedArr];
        } else {


            for (let i = 0; i < preferred.length; i++){
            //перебираємо значення масиву preferred і порівнюємо їх зі значенням масиву allowedArr 
                for (let j = 0; j < allowedArr.length; j++){
                    //якщо значення співпадає - дадаємо його у масив answer
                    if (preferred[i] == allowedArr[j]){
                        answer.push(allowedArr[j]);
                    //якщо значення не співпадає - зробимо декілька перевірок    
                    } else if   (allowedArr.indexOf(preferred[i]) == -1 //якщо поточне значення не міститься далі у масиві allowedArr
                                && answer.indexOf(preferred[i]) == -1 //якщо поточне значення не міститься у масиві answer
                                && answer.length < preferred.length //якщо довжина масиву answer менша за довжина масиву preferred
                                && answer.length < allowedArr.length) //якщо довжина масиву answer менша за довжина масиву allowedArr
                                {
                        //знайдемо найближчі білше та менше значення
                        let closestBigger = Math.min(...allowedArr.filter(v => v > preferred[i]));
                        let closestLower = Math.max(...allowedArr.filter(v => v < preferred[i]));
                    
                        //знайдемо абсолютне значення різніці між поточним значенням і найближчими більшим та меншим 
                        let biggerAbs = Math.abs(preferred[i]-closestBigger);
                        let lowerAbs = Math.abs(preferred[i]-closestLower);
                        
                        //в залежності від того, яке із значень ближче - додамо його до масиву answer
                        //якщо значення ближче до більшого або вони рівні
                        if (biggerAbs <= lowerAbs){
                            //та не знаходиться вже у масиві answer - додамо найближче більше до масиву answer
                            if (answer.indexOf(closestBigger) == -1){
                                answer.push(closestBigger);
                            //та якщо найближче більше вже є у масиві, а найближчого меншого немає та воно не дорівнює безкінечності - додамо найближче менше до масиву answer    
                            } else if (answer.indexOf(closestLower) == -1 && closestLower != Infinity){
                                answer.push(closestLower);
                            } 
                        //якщо значення ближче до меншого        
                        } else if (lowerAbs < biggerAbs){
                            //та не знаходиться вже у масиві answer - додамо найближче менше до масиву answer
                            if (answer.indexOf(closestLower) == -1){
                                answer.push(closestLower);
                            //та якщо найближче менше вже є у масиві, а найближчого більшого немає та воно не дорівнює безкінечності - додамо найближче більше до масиву answer    
                            } else if (answer.indexOf(closestBigger) == -1 && closestBigger != Infinity){
                                answer.push(closestBigger);
                            }  
                            
                        }
                    }
                }
            }   
        }
    }
      
    return answer;
};
//перевірка
console.log('avialable:[240, 360, 720], allowed:[360, 720], preffered:[1080], redurned:['+ attempt([240, 360, 720], [360, 720], [1080])+']');
console.log('avialable:[240, 720], allowed:[360, 720], preffered:[1080], redurned:['+ attempt([240, 720], [360, 720], [1080])+']');
console.log('avialable:[240], allowed:[360, 720], preffered:[1080], redurned:['+ attempt([240], [360, 720], [1080])+']');
console.log('avialable:[240, 360, 720], allowed:[240, 360, 720, 1080], preffered:[240,360], redurned:['+ attempt([240, 360, 720], [240, 360, 720, 1080], [240,360])+']');
console.log('avialable:[240, 720], allowed:[240, 360, 720, 1080], preffered:[240,360], redurned:['+ attempt([240, 720], [240, 360, 720, 1080], [240,360])+']');
console.log('avialable:[240, 720], allowed:[240, 360, 1080], preffered:[240,360], redurned:['+ attempt([240, 720], [240, 360, 1080], [240,360])+']');
console.log('avialable:[720], allowed:[240, 360, 1080], preffered:[240,360], redurned:['+ attempt([720], [240, 360, 1080], [240,360])+']');
console.log('avialable:[240, 360], allowed:[240, 360], preffered:[720, 1080], redurned:['+ attempt([240, 360], [240, 360], [720, 1080])+']');
console.log('avialable:[240, 360, 720], allowed:[360, "any"], preffered:[360, 720], redurned:['+ attempt([240, 360, 720], [360, "any"], [360, 720])+']');
console.log('avialable:[240, 360, 720], allowed:[240, 360, 720], preffered:["any", 720], redurned:['+ attempt([240, 360, 720], [240, 360, 720], ["any", 720])+']');
console.log('avialable:[240, 360, 720], allowed:[360, 1080], preffered:["any", 720], redurned:['+ attempt([240, 360, 720], [360, 1080], ["any", 720])+']');
console.log('avialable:[240, 360, 720], allowed:[1080], preffered:["any", 720], redurned:['+ attempt([240, 360, 720], [1080], ["any", 720])+']');
