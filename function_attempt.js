function attempt(avialable, allowed, preferred){
    let answer = [];
    let allowedArr = [];
    //сформируем массив из элементов массива allowed, входящих в массив avialable
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
    //если массив пустой, дальнейшие проверки не имеют смысла
    if (allowedArr.length == 0) {
        return (allowedArr);
    //если массив не пустой - проверим вхождения значений из массива preferred в новый массив allowedArr 
    } else {

        if (preferred.indexOf('any') != -1){
            answer = [...allowedArr];
        } else {


            for (let i = 0; i < preferred.length; i++){
            //перебираем значения массива preferred и сравниваем их со значениями нового массива allowedArr
                for (let j = 0; j < allowedArr.length; j++){
                    //если значение совпадает - добавляем его в массив ответа
                    if (preferred[i] == allowedArr[j]){
                        answer.push(allowedArr[j]);
                    } else if   (allowedArr.indexOf(preferred[i]) == -1 //если текущее проверяемое значение не содержится далее в массиве preferred
                                && answer.indexOf(preferred[i]) == -1 //если текущее проверяемое значение не содержится в массиве ответов
                                && answer.length < preferred.length //если длина массива овтетов меньше длины массива preferred
                                && answer.length < allowedArr.length) //если длина массива овтетов меньше длины массива allowedArr
                                {
                        //найдем ближайшее значение 
                        let closestBigger = Math.min(...allowedArr.filter(v => v > preferred[i]));
                        let closestLower = Math.max(...allowedArr.filter(v => v < preferred[i]));
                    
                        //найдем ближайшее значение из большего и меньшего
                        let biggerAbs = Math.abs(preferred[i]-closestBigger);
                        let lowerAbs = Math.abs(preferred[i]-closestLower);
                        
                        //в зависимости от того, какое из значений ближе вставим его в массив ответов
                        if (biggerAbs <= lowerAbs){
                            if (answer.indexOf(closestBigger) == -1){
                                answer.push(closestBigger);
                            } else if (answer.indexOf(closestLower) == -1 && closestLower != Infinity){
                                answer.push(closestLower);
                            }     
                        } else if (lowerAbs < biggerAbs){
                            if (answer.indexOf(closestLower) == -1){
                                answer.push(closestLower);
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
