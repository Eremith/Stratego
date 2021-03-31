class pion{

    constructor(number, x, y, player){
        this.player = player;
        this.number = number;
        this.alive = true;
        if (number == 0 || number == 11) {
            this.movement = 0;
        } else{
            if (number == 2) {
                this.movement == 10;
            }
            else{
                this.movement == 1;
            }
        }
        this.x = x;
        this.y = y;
    }

    battle(pion){
        if (pion.number == 0) {
            pion.alive = false;
        }
        if (this.number == 1 && pion.number == 10) {
            pion.alive = false;
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

    move(tab, dir, nbomov, player){
        if (this.player != player) {
            alarm("Alors, on essaye de tricher mon petit bonhomme ?");
            return 0;
        }
        switch (this.movement) {
            case 0:
                alarm("Cette pièce ne bouge pas, petit coquin");
                break;
            
            case 1:
                switch (dir) {

                    case r:
                        if (tab[this.x + 1][this.y] != 0) {
                            this.battle(tab[this.x + 1][this.y]);
                            if (this.alive == false) {
                                this.x = null;
                                this.y = null;
                            } else{
                                this.x++;
                            }
                        }
                        else{
                            this.x++;
                        }
                        break;
                
                    case l:
                        if (tab[this.x - 1][this.y] != 0) {
                            this.battle(tab[this.x - 1][this.y]);
                            if (this.alive == false) {
                                this.x = null;
                                this.y = null;
                            } else{
                                this.x--;
                            }
                        }
                        else{
                            this.x--;
                        }
                        break;
                    
                    case f:
                        if (tab[this.x][this.y + 1] != 0) {
                            this.battle(tab[this.x][this.y + 1]);
                            if (this.alive == false) {
                                this.x = null;
                                this.y = null;
                            } else{
                                this.y++;
                            }
                        }
                        else{
                            this.y++;
                        }
                        break;
                    
                    case b:
                        if (tab[this.x][this.y - 1] != 0) {
                            this.battle(tab[this.x][this.y - 1]);
                            if (this.alive == false) {
                                this.x = null;
                                this.y = null;
                            } else{
                                this.y--;
                            }
                        }
                        else{
                            this.y--;
                        }
                        break;
                        
                    default:
                        break;
                }

            case 10:
                switch(dir){

                    case r:
                        let tmp = x;
                        while (tab[tmp + 1][y] != 0) {
                            tmp++;
                        }
                        if (nbomov > tmp) {
                            alarm("Va moins loin mon chou");
                            break;
                        }
                        if (tab[this.x + nbomov][this.y] != 0) {
                            this.battle(tab[this.x + nbomov][this.y]);
                            if (this.alive == false) {
                                this.x = null;
                                this.y = null;
                            } else{
                                this.x += nbomov;
                            }
                        }
                        break; 
                    
                    case l:
                        let tmp2 = this.x;
                        while (tab[tmp - 1][y] != 0) {
                            tmp--;
                        }
                        if (nbomov > (tmp - this.y)) {
                            alarm("Va moins loin mon chou");
                            break;
                        }
                        if (tab[this.x - nbomov][this.y] != 0) {
                            this.battle(tab[this.x - nbomov][this.y]);
                            if (this.alive == false) {
                                this.x = null;
                                this.y = null;
                            } else{
                                this.x -= nbomov;
                            }
                        }
                        break;
                    
                    case f:
                        let tmp3 = this.y;
                        while (tab[this.x][tmp + 1] != 0) {
                            tmp++;
                        }
                        if (nbomov > (tmp - this.y)) {
                            alarm("Va moins loin mon chou");
                            break;
                        }
                        if (tab[this.x][this.y + nbomov] != 0) {
                            this.battle(tab[this.x][this.y + nbomov]);
                            if (this.alive == false) {
                                this.x = null;
                                this.y = null;
                            } else{
                                this.y += nbomov;
                            }
                        }
                        break; 

                        case b:
                            let tmp4 = this.y;
                            while (tab[this.x][tmp - 1] != 0) {
                                tmp++;
                            }
                            if (nbomov > (this.y - tmp)) {
                                alarm("Va moins loin mon chou");
                                break;
                            }
                            if (tab[this.x][this.y - nbomov] != 0) {
                                this.battle(tab[this.x][this.y - nbomov]);
                                if (this.alive == false) {
                                    this.x = null;
                                    this.y = null;
                                } else{
                                    this.y -= nbomov;
                                }
                            }
                            break; 
                }
            
            default:
                break;
        }
    }

    swap(pion){
        let tmpX = this.x;
        let tmpY = this.y;
        this.x = pion.x;
        this.y = pion.y;
        pion.x = tmpX;
        pion.y = tmpY;
    }
}