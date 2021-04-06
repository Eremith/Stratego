//Pas encore servie


//classe pion avec les calculs logiques pour les mouvements et les batailles

class pion{

    constructor(number, x, y, player){  //construction d'une classe pion
        this.player = player;           //Id de joueur
        this.number = number;           //Puissance du pion
        this.alive = true;              //Détermine si le pion est en vie ou non
        if (number == 0 || number == 11) { //Boucles if pour connaitre le mouvement du pion en fonction de la puissance
            this.movement = 0;
        } else{
            if (number == 2) {
                this.movement == 10;
            }
            else{
                this.movement == 1;
            }
        }
        this.x = x; //Positions
        this.y = y; //du pion
    }

    battle(pion){ //Fonction déterminant le victorieux d'un face a face
        if (pion.number == 0) { //Boucles if prenant en compte toutes les particularités des pions
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

    move(tab, dir, nbomov, player){ //Fonction pour déplacer les pions dans un tableau a double entrée + vérification de le légitimité du mouvement
        if (this.player != player) {  //tab le tableau, dir la direction (r)ight (l)eft (f)orward (b)ack, nbomov nombre de cases, player id du player
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

    swap(pion){ //Fonction swap pour la création du plateau
        let tmpX = this.x;
        let tmpY = this.y;
        this.x = pion.x;
        this.y = pion.y;
        pion.x = tmpX;
        pion.y = tmpY;
    }
}