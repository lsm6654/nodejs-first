class SnakesLadders {
    private players: Array<Player> = [];
    private playerTurn: number = 0;
    private playersCount: number;
    private isTerminated: boolean = false;

    constructor(playersCount: number = 2) {
        for (let i=0; i< playersCount; i ++) {
            this.players.push(new Player(i));
        }

        this.playersCount = playersCount;
    }

    play(firstDice: number, secondDice: number): string {
        if (firstDice < 0 || firstDice > 6 || secondDice < 0 || secondDice > 6) {
            throw "illegal dice";
        }

        const playerThisTurn = this.players[this.playerTurn];
        const position = playerThisTurn.move(firstDice + secondDice);
        this.setNextTurnPlayer(firstDice == secondDice);

        if (position == Player.goal) {
            this.isTerminated = true;
            return playerThisTurn.winToString();
        }

        if (this.isTerminated) {
            return `Game over!`;
        }

        return playerThisTurn.positionToString();
    }

    private setNextTurnPlayer(isSameDice: boolean) {
        if (isSameDice) {
            return;
        }

        if (++this.playerTurn >= this.playersCount) {
            this.playerTurn = 0;
        }
    }
}

export class Player {
    private playerNo: number;
    private position: number;

    private ladders: Map<number, number>;
    private snakes: Map<number, number>;
    static goal = 100;

    constructor(playerNo: number) {
        this.playerNo = playerNo + 1;
        this.position = 0;

        this.ladders = Ladder.getInstance().getLadders();
        this.snakes = Snake.getInstance().getSnakes();
    }

    move(sumDice: number):number {
        this.position += sumDice;

        const ladder = this.ladders.get(this.position);
        if (ladder) {
            this.position = ladder;
        }

        const snake = this.snakes.get(this.position);
        if (snake) {
            this.position = snake;
        }

        if (this.position > Player.goal) {
            this.position += Player.goal - this.position;
        }

        return this.position;
    }

    positionToString(): string {
        return `Player ${this.playerNo} is on square ${this.position}`;
    }

    winToString(): string {
        return `Player ${this.playerNo} Wins!`;
    }
}

export class Ladder {
    private static instance: Ladder;
    private ladders = new Map<number, number>();

    static getInstance() {
       if (!Ladder.instance) {
           Ladder.instance = new Ladder();
       }

       return Ladder.instance;
    }

    private constructor() {
        this.initializeLadders();
    }

    private initializeLadders() {
        this.ladders.set(2, 38);
        this.ladders.set(7, 14);
        this.ladders.set(8, 31);
        this.ladders.set(15, 26);
        this.ladders.set(21, 42);
        this.ladders.set(28, 84);
        this.ladders.set(36, 44);
        this.ladders.set(51, 67);
        this.ladders.set(71, 91);
        this.ladders.set(78, 98);
        this.ladders.set(87, 94);
    }

    getLadders() {
        return this.ladders;
    }
}

export class Snake {
    private static instance: Snake;
    private snakes = new Map<number, number>();

    static getInstance() {
        if (!Snake.instance) {
            Snake.instance = new Snake();
        }

        return Snake.instance;
    }

    private constructor() {
        this.initializeSnakes();
    }

    private initializeSnakes() {
        this.snakes.set(16, 6);
        this.snakes.set(46, 25);
        this.snakes.set(49, 11);
        this.snakes.set(62, 19);
        this.snakes.set(64, 60);
        this.snakes.set(74, 53);
        this.snakes.set(89, 68);
        this.snakes.set(92, 88);
        this.snakes.set(95, 75);
        this.snakes.set(99, 80);
    }

    getSnakes() {
        return this.snakes;
    }
}

let game = new SnakesLadders();
console.assert(game.play(1, 1) === "Player 1 is on square 38");
console.assert(game.play(1, 5) === "Player 1 is on square 44");
console.assert(game.play(6, 2) === "Player 2 is on square 31");
console.assert(game.play(1, 1) === "Player 1 is on square 25");