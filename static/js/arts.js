/**
 * ASCII ARTS
 */

const starwars = `
     ___       _______   __       _______.     ___       __  ___      _______. __    __  ____    ____      ___      
    /   \\     |       \\ |  |     /       |    /   \\     |  |/  /     /       ||  |  |  | \\   \\  /   /     /   \\ 
   /  ^  \\    |  .--.  ||  |    |   (----'   /  ^  \\    |  '  /     |   (----'|  |__|  |  \\   \\/   /     /  ^  \\    
  /  /_\\  \\   |  |  |  ||  |     \\   \\      /  /_\\  \\   |    <       \\   \\    |   __   |   \\_    _/     /  /_\\  \\   
 /  _____  \\  |  '--'  ||  | .----)   |    /  _____  \\  |  .  \\  .----)   |   |  |  |  |     |  |      /  _____  \\  
/__/     \\__\\ |_______/ |__| |_______/    /__/     \\__\\ |__|\\__\\ |_______/    |__|  |__|     |__|     /__/     \\__\\
`;

const standard = `
           _ _           _        _                 
  __ _  __| (_)___  __ _| | _____| |__  _   _  __ _ 
 / _' |/ _' | / __|/ _' | |/ / __| '_ \\| | | |/ _' |
| (_| | (_| | \\__ \\ (_| |   <\\__ \\ | | | |_| | (_| |
 \\__,_|\\__,_|_|___/\\__,_|_|\\_\\___/_| |_|\\__, |\\__,_|
                                        |___/       
`
const arts = [starwars, standard]

// PRINT RANDOM ASCII ART
console.log(arts[Math.floor(Math.random() * arts.length)] + '\n');