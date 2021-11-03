export function findDay(value) {
    let day;
    switch (value) {
            case 0:
                    day = "niedziela";
                    break;
            case 1:
                    day = "poniedziałek";
                    break;
            case 2:
                    day = "wtorek";
                    break;
            case 3:
                    day = "środa";
                    break;
            case 4:
                    day = "czwartek";
                    break;
            case 5:
                    day = "piątek";
                    break;
            case 6:
                    day = "sobota"
                    break;
            default:
                    day = undefined;
  }
  return day;
}

export function clr(...args) {
    console.log(args);
}