class pion{
    constructor(number){
        this.number = number;
        this.alive = true;
    }

    battle(pion){
        if (pion.number == 0) {
            pion.alive = false;
        }
        if (this.number == 1 && pion.getNumber() == 10) {
            pion.alive = false;
        }
        else{
            if (pion.number == 11) {
               this.alive = false;
            } 
            else{
                if (this.number == pion.number) {
                    this.alive = false;
                    pion.alive = false;
                }
                else{
                    if (this.number > pion.number) {
                        pion.alive = false;
                    }
                    else{
                        this.alive = false;
                    }
                }
            }
        }
    }
}