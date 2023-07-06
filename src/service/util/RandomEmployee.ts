import Employee from "../../model/Employee";
import Genders from "../../model/Genders";

const names ={
    "maleNames": ["Vasya", "Josef", "Abraham", "Yakob", "Asaf", "Mosez","Itschak"
    ,"David" ],
    "femaleNames": ["Asya", "Sara", "Rivka", "Olya", "Klara", "Galya"]
};


export function range(min:number, max:number) {
    return Array.from({length: max - min})
    .map((__, index) => index + min)
}

export function getRandomInt(min:number, max:number):number {
    if(min === max) {
        max++;
    } else if (min > max) {
        [min, max] = [max, min]
    }
    return Math.trunc(min + Math.random() * (max - min))

}

export function getRandomElement(array:string[]):string {
    return array[getRandomInt(0, array.length)]
}

export function getRandomGender():Genders {
    const genders:Genders[] = ["male","female"]
    const index = getRandomInt(0, 2)
    return genders[index]
}

export function getRandomEmployee(minSalary:number, maxSalary:number, minYear:number, maxYear:number, departments:string[]):Employee {
    let gender: Genders = getRandomGender();;
    const name:string = getRandomElement(gender === 'female' ? names.femaleNames :
     names.maleNames);
     const birthDate: Date = new Date(getRandomInt(minYear, maxYear + 1),getRandomInt(1, 13),getRandomInt(1, 32));
     const salary = getRandomInt(minSalary, maxSalary) * 1000;
     const department = getRandomElement(departments);
     return {name: name, gender: gender, birthDate:birthDate, department:department, salary:salary};
 }
