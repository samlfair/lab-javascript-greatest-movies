movies = require ("./data")

/* eslint no-restricted-globals: 'off' */


// Iteration 1: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(array){
    let workingArray = [...array];
    workingArray.sort(function(a,b){
        if(a.year > b.year){
            return 1
        } else if(a.year < b.year){
            return -1
        } else if(a.title > b.title){
            return 1
        } else {
            return -1
        }
    })
    let newArray = [...workingArray];
    return newArray;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct

function howManyMovies(array){
    let newArray = array.filter(function(movie){
        return movie.director === "Steven Spielberg" && movie.genre.includes("Drama");
    })
    return newArray.length;
}

// Iteration 3: Alphabetic Order - Order by title and print the first 20 titles

// function orderAlphabetically(array){
//     let workingArray = [...array];
//     let newArray = [];
//     workingArray.sort(function(a,b){
//         if(a.title > b.title){
//             return 1
//         } else {
//             return -1
//         }
//     })
//     if(workingArray.length > 0){
//         for(i = 0; i < workingArray.length && i < 20; i++){
//             newArray.push(workingArray[i].title);
//         }
//     }
//     return newArray;
// }

function orderAlphabetically(array){
    let newArray = array.map(movie => movie.title);
    newArray.sort((a, b) => a.localeCompare(b));
    newArray.splice(20);
    console.log(newArray);
    return newArray;
}

orderAlphabetically(movies);

/*
function orderAlphabetically(array) {
    let justTitle = array.map(function(theMovie){
        return theMovie.title;
    }
            // theMovie => theMovie.title
        );
    justTitle.sort(function(a,b){
        return a.localeCompare(b)
        }); 
        if (justTitle.length<=20){
        return justTitle;
        }else{ 
        justTitle.splice(20)
        return justTitle
        }
    };
*/ 

// Iteration 4: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(array){
    let total = array.reduce(function(accumulator, currentValue){
        if(!currentValue.rate){
            // in case rate doesn't exist
            return accumulator;
        } else {
            return accumulator + currentValue.rate;
        }
    },
    0)
    avg = total / array.length;
    avg = Math.round(avg * 100) / 100
    if (!avg) {avg = 0};
    return avg;
}

// Iteration 5: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(array){
    let newArray = array.filter(function(movie){
        return movie.genre.includes("Drama");
    })
    // reuse the function from iteration 4
    return ratesAverage(newArray);
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes

/*
I think there is an error with Jasmine on this one. The error I'm getting is:
TypeError: movie.duration.match is not a function
*/

/*
it('Should return a new array, not update the original one', () => {
    expect(turnHoursToMinutes(movies)).not.toEqual(movies);
  });

  it('The duration of the movie should be a number', () => {
    expect(typeof turnHoursToMinutes(movies)[0].duration).toBe('number');
  });
*/

function turnHoursToMinutes(array){
    let newArray;
    newArray = array.map(function(movie){
        let hoursRegex  =  /([\d])h/
        let minsRegex   =  /(\d\d?)min/
        let hours       = movie.duration.match(hoursRegex);
        let mins        = movie.duration.match(minsRegex);
        newDuration     = 0;
        if(hours){
            newDuration += parseInt(hours[1]) * 60;
        }
        if(mins){
            newDuration += parseInt(mins[1])
        }
        movie.duration = newDuration;
        return movie;
    })
    return newArray;
}

console.log(typeof(turnHoursToMinutes([])));



// BONUS Iteration: Best yearly rate average - Best yearly rate average

function bestYearAvg(array){
    let years = {1900: {total: 0, count: 0, avg: 0}};
    for(i = 1900; i < 2021; i++){
        years[i] = {total: 0, count: 0, avg: 0};
    }
    array.forEach(function(movie){
        years[movie.year].total += movie.rate;
        years[movie.year].count ++
        years[movie.year].avg = years[movie.year].total / years[movie.year].count;
    })
    bestYear = 1900;
    for(const year in years){
        if(years[year].avg > years[bestYear].avg){
            bestYear = year;
            console.log(year);
        }
    }
    if(array.length === 0){
        return null
    } else {
        return `The best year was ${bestYear} with an average rate of ${years[bestYear].avg}`
    }
}